#!/usr/bin/env ruby
# frozen_string_literal: true

require 'cgi'
require 'json'
require 'net/http'
require 'open3'
require 'set'
require 'time'
require 'uri'
require 'yaml'

PUBLICATIONS_PATH = File.expand_path('../_data/publications.yml', __dir__)
OUTPUT_PATH = File.expand_path('../_data/paper_citations.yml', __dir__)
CONTACT_EMAIL = 'jianjun.xiao@mail.bnu.edu.cn'
GOOGLE_SCHOLAR_USER = 'FaqCcFoAAAAJ'

def http_get_json(url, limit = 5)
  uri = URI(url)
  request = Net::HTTP::Get.new(uri)
  request['Accept'] = 'application/json'
  request['User-Agent'] = "jianjunxiao.github.io/1.0 (mailto:#{CONTACT_EMAIL})"

  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https', open_timeout: 8, read_timeout: 12) do |http|
    http.request(request)
  end

  if response.is_a?(Net::HTTPRedirection) && limit > 0
    location = response['location']
    return nil if location.to_s.empty?
    return http_get_json(URI.join(url, location).to_s, limit - 1)
  end

  return nil unless response.is_a?(Net::HTTPSuccess)

  JSON.parse(response.body)
rescue StandardError
  nil
end

def fetch_google_scholar_profile
  url = "https://scholar.google.com/citations?hl=en&user=#{GOOGLE_SCHOLAR_USER}&cstart=0&pagesize=100"
  stdout, _stderr, status = Open3.capture3(
    'curl', '-sS', '--max-time', '12',
    '-A', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    '-H', 'Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8',
    url
  )
  return nil unless status.success?

  body = stdout.to_s.force_encoding('UTF-8')
  return nil if body.empty?

  lower = body.downcase
  if lower.include?('captcha') || lower.include?('unusual traffic') || lower.include?('sorry/index')
    warn 'Google Scholar skipped: anti-bot gate encountered'
    return nil
  end

  totals = body.scan(/class="gsc_rsb_std">(\d+)<\/td>/).flatten.map(&:to_i)
  rows = body.scan(/<tr class="gsc_a_tr">(.*?)<\/tr>/m).flatten
  return nil if rows.empty?

  entries = rows.map do |row|
    title = CGI.unescapeHTML(row[/class="gsc_a_at"[^>]*>(.*?)<\/a>/m, 1].to_s.gsub(/<[^>]+>/, '')).strip
    cites_str = row[/class="gsc_a_ac[^"]*"[^>]*>(.*?)<\/a>/m, 1].to_s.gsub(/<[^>]+>/, '').strip
    year_str = row[/class="gsc_a_h gsc_a_hc[^"]*">(.*?)<\/span>/m, 1].to_s.gsub(/<[^>]+>/, '').strip
    {
      'title' => title,
      'citations' => cites_str.empty? ? 0 : cites_str.to_i,
      'year' => year_str.to_i
    }
  end

  {
    'total_citations' => totals[0],
    'h_index' => totals[2],
    'i10_index' => totals[4],
    'entries' => entries
  }
rescue StandardError => e
  warn "Google Scholar fetch skipped: #{e.message}"
  nil
end

def normalize_title(text)
  t = text.to_s.downcase
  t = t.gsub('cm00c', 'cmooc')
  t = t.gsub('examing', 'examining')
  t = t.gsub('behavioural', 'behavioral').gsub('behaviour', 'behavior')
  t = t.gsub(/[—–\-:：,，.。？?！!'"“”‘’()（）\[\]]/, ' ')
  t.gsub(/\s+/, ' ').strip
end

def title_tokens(text)
  norm = normalize_title(text)
  if norm =~ /[\u4e00-\u9fff]/
    # CJK bigrams + alphanumeric tokens
    chars = norm.gsub(/\s+/, '').chars
    grams = Set.new
    chars.each_cons(2) { |a, b| grams << (a + b) }
    norm.scan(/[a-z0-9]+/).each { |w| grams << w }
    grams
  else
    Set.new(norm.split(' ').reject { |w| w.length <= 2 })
  end
end

def match_google_scholar(paper, gs_entries)
  return nil if gs_entries.nil? || gs_entries.empty?

  candidates = [paper['title_en'], paper['title_zh']].compact.map { |t| t.to_s.strip }.reject(&:empty?)
  best_entry = nil
  best_score = 0.0

  gs_entries.each do |entry|
    next if entry['title'].downcase.start_with?('retraction notice')

    gs_norm = normalize_title(entry['title'])
    gs_toks = title_tokens(entry['title'])
    next if gs_toks.empty?

    candidates.each do |cand|
      c_norm = normalize_title(cand)
      if c_norm == gs_norm
        return entry
      end

      c_toks = title_tokens(cand)
      next if c_toks.empty?

      inter = (c_toks & gs_toks).size.to_f
      union = (c_toks | gs_toks).size.to_f
      jaccard = union.positive? ? (inter / union) : 0.0
      contain = inter / [c_toks.size, gs_toks.size].min
      score = (jaccard * 0.6) + (contain * 0.4)

      if score > best_score
        best_score = score
        best_entry = entry
      end
    end
  end

  best_score >= 0.72 ? best_entry : nil
end

def fetch_openalex_or_crossref(paper)
  url = paper['url'].to_s.strip
  doi = url[%r{doi\.org/(.+)$}i, 1]
  arxiv = url[%r{arxiv\.org/abs/([0-9]+\.[0-9]+)}i, 1]

  if doi && !doi.empty?
    oa_url = "https://api.openalex.org/works/https://doi.org/#{URI.encode_www_form_component(doi)}?select=cited_by_count,id&mailto=#{CONTACT_EMAIL}"
    data = http_get_json(oa_url)
    if data && !data['cited_by_count'].nil?
      return { 'citations' => data['cited_by_count'].to_i, 'source' => 'openalex', 'doi' => doi }
    end

    cr_url = "https://api.crossref.org/works/#{URI.encode_www_form_component(doi)}"
    cr_data = http_get_json(cr_url)
    cr_count = cr_data&.dig('message', 'is-referenced-by-count')
    unless cr_count.nil?
      return { 'citations' => cr_count.to_i, 'source' => 'crossref', 'doi' => doi }
    end
  elsif arxiv && !arxiv.empty?
    oa_url = "https://api.openalex.org/works/https://doi.org/10.48550/arXiv.#{URI.encode_www_form_component(arxiv)}?select=cited_by_count,id&mailto=#{CONTACT_EMAIL}"
    data = http_get_json(oa_url)
    if data && !data['cited_by_count'].nil?
      return { 'citations' => data['cited_by_count'].to_i, 'source' => 'openalex', 'arxiv' => arxiv }
    end
  end

  nil
end

def load_existing
  return {} unless File.exist?(OUTPUT_PATH)

  YAML.load_file(OUTPUT_PATH) || {}
rescue StandardError
  {}
end

def main
  pub_data = YAML.load_file(PUBLICATIONS_PATH)
  papers = Array(pub_data['items']).reject { |item| item['type'] == 'software' }
  existing = load_existing
  existing_papers = existing['papers'] || {}

  gs_profile = fetch_google_scholar_profile
  gs_entries = gs_profile ? gs_profile['entries'] : nil

  results = {}
  tracked = 0
  sum_paper_citations = 0

  papers.each do |paper|
    id = paper['id'].to_s
    next if id.empty?

    prev = existing_papers[id] || {}
    gs_match = match_google_scholar(paper, gs_entries)
    oa_match = fetch_openalex_or_crossref(paper)

    gs_cites = gs_match ? gs_match['citations'] : prev['citations_gs']
    oa_cites = oa_match ? oa_match['citations'] : prev['citations_openalex']
    manual_cites = paper['citations_manual'] ? paper['citations_manual'].to_i : nil
    manual_source = paper['citations_manual_source'] || 'cnki'

    # Prefer manual CNKI override if larger, otherwise Google Scholar as primary, OpenAlex as fallback
    chosen_cites = 0
    chosen_source = 'none'

    if !gs_cites.nil?
      chosen_cites = gs_cites.to_i
      chosen_source = 'google_scholar'
    elsif !oa_cites.nil?
      chosen_cites = oa_cites.to_i
      chosen_source = oa_match ? oa_match['source'] : (prev['source'] || 'openalex')
    end

    # If Google Scholar wasn't freshly fetched and OpenAlex grew beyond cached GS, bump cleanly
    if gs_match.nil? && !oa_cites.nil? && oa_cites.to_i > chosen_cites
      chosen_cites = oa_cites.to_i
      chosen_source = oa_match ? oa_match['source'] : 'openalex'
    end

    if !manual_cites.nil? && manual_cites >= chosen_cites
      chosen_cites = manual_cites
      chosen_source = manual_source
    end

    entry = {
      'citations' => chosen_cites,
      'source' => chosen_source
    }
    entry['citations_gs'] = gs_cites.to_i unless gs_cites.nil?
    entry['citations_openalex'] = oa_cites.to_i unless oa_cites.nil?
    entry['citations_manual'] = manual_cites unless manual_cites.nil?
    entry['doi'] = oa_match['doi'] if oa_match && oa_match['doi']
    entry['arxiv'] = oa_match['arxiv'] if oa_match && oa_match['arxiv']

    results[id] = entry
    tracked += 1 if chosen_source != 'none'
    sum_paper_citations += chosen_cites
  end

  gs_total = gs_profile&.dig('total_citations') || existing['google_scholar_total']
  h_index = gs_profile&.dig('h_index') || existing['h_index']
  i10_index = gs_profile&.dig('i10_index') || existing['i10_index']

  payload = {
    'source' => gs_profile ? 'google_scholar+openalex' : (existing['source'] || 'openalex'),
    'google_scholar_user' => GOOGLE_SCHOLAR_USER,
    'last_synced_at' => Time.now.utc.iso8601,
    'google_scholar_synced_at' => gs_profile ? Time.now.utc.iso8601 : existing['google_scholar_synced_at'],
    'paper_count' => papers.length,
    'tracked_papers' => tracked,
    'total_citations' => [sum_paper_citations, gs_total.to_i].max,
    'listed_papers_citations' => sum_paper_citations,
    'google_scholar_total' => gs_total,
    'h_index' => h_index,
    'i10_index' => i10_index,
    'papers' => results
  }

  tmp_path = "#{OUTPUT_PATH}.tmp"
  File.write(tmp_path, YAML.dump(payload))
  File.rename(tmp_path, OUTPUT_PATH)
  warn "Wrote citation stats (profile=#{payload['total_citations']}, listed=#{sum_paper_citations}, tracked=#{tracked}/#{papers.length}, h-index=#{h_index}) to #{OUTPUT_PATH}"
  0
rescue StandardError => e
  warn "Paper citation sync failed, keeping existing data: #{e.message}"
  0
end

main if $PROGRAM_NAME == __FILE__
