#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require 'cgi'
require 'net/http'
require 'time'
require 'uri'
require 'yaml'

ORCID_ID = '0000-0003-0000-9630'
PUBLIC_API_BASE = 'https://pub.orcid.org/v3.0'
TOKEN_ENDPOINT = 'https://pub.orcid.org/oauth/token'
OUTPUT_PATH = File.expand_path('../_data/orcid_peer_reviews.yml', __dir__)

TITLE_OVERRIDES = {
  'issn:1744-5191' => 'Interactive Learning Environments',
  'issn:1468-4462' => 'Information, Communication & Society',
  'issn:2475-9066' => 'the journal of Open Source Software',
  'issn:0360-1315' => 'Computers & Education',
  'issn:1873-782x' => 'Computers & Education',
  'issn:2045-2322' => 'Scientific Reports',
  'issn:1472-6920' => 'BMC Medical Education',
  'issn:2731-5525' => 'Discover Education',
  'issn:2050-7283' => 'BMC Psychology',
  'issn:2662-9992' => 'Humanities & Social Sciences Communications',
  'issn:2504-284X' => 'Frontiers in education'
}.freeze

URL_OVERRIDES = {
  'issn:1744-5191' => 'https://www.tandfonline.com/journals/nile20/about-this-journal#aims-and-scope',
  'issn:1468-4462' => 'https://www.tandfonline.com/journals/rics20/about-this-journal#aims-and-scope',
  'issn:2475-9066' => 'https://joss.theoj.org/about',
  'issn:0360-1315' => 'https://www.sciencedirect.com/journal/computers-and-education/about/insights',
  'issn:1873-782x' => 'https://www.sciencedirect.com/journal/computers-and-education/about/insights',
  'issn:2045-2322' => 'https://www.nature.com/srep/about',
  'issn:1472-6920' => 'https://link.springer.com/journal/12909/aims-and-scope',
  'issn:2731-5525' => 'https://link.springer.com/journal/44217/aims-and-scope',
  'issn:2050-7283' => 'https://link.springer.com/journal/40359/aims-and-scope?utm_medium=affiliate&utm_source=baidu&utm_content=banner&utm_term=null&utm_campaign=MLSR_40359_AWA1_CN_CNPL_HPAUT_OAX',
  'issn:2662-9992' => 'https://www.nature.com/palcomms/journal-information',
  'issn:2504-284X' => 'https://www.frontiersin.org/journals/education/about#about-scope'
}.freeze

FALLBACK_JOURNAL_COUNTS = {
  'Interactive Learning Environments' => 2,
  'Information, Communication & Society' => 1,
  'the journal of Open Source Software' => 1,
  'Computers & Education' => 2,
  'Scientific Reports' => 1,
  'BMC Medical Education' => 1,
  'Discover Education' => 1,
  'BMC Psychology' => 4,
  'Humanities & Social Sciences Communications' => 3,
  'Frontiers in education' => 1
}.freeze

ISSN_TITLE_CACHE = {}

def http_get_json(url, token = nil)
  uri = URI(url)
  request = Net::HTTP::Get.new(uri)
  request['Accept'] = 'application/vnd.orcid+json'
  request['Accept-Encoding'] = 'identity'
  request['Authorization'] = "Bearer #{token}" if token

  response = request_with_redirects(uri, request)

  unless response.is_a?(Net::HTTPSuccess)
    raise "ORCID request failed for #{url}: #{response.code} #{response.message}"
  end

  JSON.parse(response.body)
end

def fetch_access_token
  client_id = ENV['ORCID_CLIENT_ID'].to_s.strip
  client_secret = ENV['ORCID_CLIENT_SECRET'].to_s.strip
  return nil if client_id.empty? || client_secret.empty?

  uri = URI(TOKEN_ENDPOINT)
  request = Net::HTTP::Post.new(uri)
  request['Accept'] = 'application/json'
  request['Content-Type'] = 'application/x-www-form-urlencoded'
  request['Accept-Encoding'] = 'identity'
  request.set_form_data(
    'client_id' => client_id,
    'client_secret' => client_secret,
    'grant_type' => 'client_credentials',
    'scope' => '/read-public'
  )

  response = request_with_redirects(uri, request)

  unless response.is_a?(Net::HTTPSuccess)
    raise "ORCID token request failed: #{response.code} #{response.message}"
  end

  JSON.parse(response.body).fetch('access_token')
end

def collect_peer_review_put_codes(node, results = [])
  case node
  when Hash
    if node['path'].to_s.include?('/peer-review/') && node['put-code']
      results << node['put-code'].to_s
    end
    node.each_value { |value| collect_peer_review_put_codes(value, results) }
  when Array
    node.each { |value| collect_peer_review_put_codes(value, results) }
  end
  results
end

def extract_text(value)
  case value
  when String
    value.strip
  when Hash
    value['value'].to_s.strip if value.key?('value')
  end
end

def extract_journal_title(peer_review)
  issn_key = normalize_title(peer_review['review-group-id']).downcase
  override_title = TITLE_OVERRIDES[issn_key]
  return override_title if override_title

  issn_title = fetch_issn_title(issn_key)
  return issn_title if issn_title

  candidates = [
    peer_review.dig('convening-organization', 'name'),
    peer_review.dig('subject-name', 'title'),
    peer_review.dig('review-group', 'group-name'),
    peer_review['review-group-id'],
    peer_review['role']
  ]

  candidates.each do |candidate|
    text = extract_text(candidate)
    return text if text && !text.empty?
  end

  nil
end

def normalize_title(title)
  title.to_s.gsub(/\s+/, ' ').strip
end

def build_url_map
  URL_OVERRIDES.each_with_object({}) do |(issn, url), map|
    map[issn] = url
  end
end

def fallback_journals
  URL_OVERRIDES.keys.map do |issn|
    {
      'issn' => issn.sub(/\Aissn:/, ''),
      'title' => TITLE_OVERRIDES[issn] || fetch_issn_title(issn) || issn.sub(/\Aissn:/, ''),
      'url' => URL_OVERRIDES[issn],
      'review_count' => FALLBACK_JOURNAL_COUNTS[TITLE_OVERRIDES[issn] || fetch_issn_title(issn) || issn.sub(/\Aissn:/, '')] || 0
    }
  end
end

def fetch_issn_title(issn_key)
  cached_title = ISSN_TITLE_CACHE[issn_key]
  return cached_title if ISSN_TITLE_CACHE.key?(issn_key)

  issn = issn_key.sub(/\Aissn:/, '')
  return nil if issn.empty?

  uri = URI("https://portal.issn.org/resource/ISSN/#{issn}")
  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
    request = Net::HTTP::Get.new(uri)
    request['Accept'] = 'text/html,application/xhtml+xml'
    request['Accept-Encoding'] = 'identity'
    http.request(request)
  end

  return nil unless response.is_a?(Net::HTTPSuccess)

  html = response.body
  title = html[/<title>\s*ISSN\s+#{Regexp.escape(issn)}\s*-\s*(.*?)\s*<\/title>/i, 1]
  return nil if title.to_s.empty?

  ISSN_TITLE_CACHE[issn_key] = CGI.unescapeHTML(title).strip
end

def pick_journals(peer_review_items)
  url_map = build_url_map
  seen = {}
  journals = []

  peer_review_items.each do |item|
    title = normalize_title(extract_journal_title(item))
    next if title.empty?
    next if seen[title]

    issn_key = normalize_title(item['review-group-id']).downcase
    seen[title] = true
    journals << {
      'issn' => issn_key.sub(/\Aissn:/, ''),
      'title' => title,
      'url' => url_map[issn_key] || "https://portal.issn.org/resource/ISSN/#{issn_key.sub(/\Aissn:/, '')}"
    }
  end

  ordered = URL_OVERRIDES.keys.map do |issn|
    normalize_title(TITLE_OVERRIDES[issn] || fetch_issn_title(issn) || issn.sub(/\Aissn:/, ''))
  end
  journals.sort_by do |journal|
    index = ordered.index(normalize_title(journal['title']))
    [index || ordered.length, journal['title'].downcase]
  end
end

def peer_review_counts(record)
  groups = record.dig('activities-summary', 'peer-reviews', 'group')
  return {} unless groups.is_a?(Array)

  groups.each_with_object(Hash.new(0)) do |group, counts|
    review_group_id = normalize_title(group.dig('external-ids', 'external-id', 0, 'external-id-value')).downcase
    next unless review_group_id.start_with?('issn:')

    peer_review_groups = group.dig('peer-review-group')
    next unless peer_review_groups.is_a?(Array)

    count = peer_review_groups.sum do |peer_review_group|
      summaries = peer_review_group.dig('peer-review-summary')
      summaries.is_a?(Array) ? summaries.length : 0
    end

    counts[review_group_id] += count
  end
end

def count_reviews(record)
  groups = record.dig('activities-summary', 'peer-reviews', 'group')
  return 0 unless groups.is_a?(Array)

  groups.sum do |group|
    peer_review_groups = group.dig('peer-review-group')
    next 0 unless peer_review_groups.is_a?(Array)

    peer_review_groups.sum do |peer_review_group|
      summaries = peer_review_group.dig('peer-review-summary')
      summaries.is_a?(Array) ? summaries.length : 0
    end
  end
end

def write_output(payload)
  File.write(OUTPUT_PATH, YAML.dump(payload))
end

def request_with_redirects(uri, request, limit = 5)
  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
    http.request(request)
  end

  return response unless response.is_a?(Net::HTTPRedirection)
  raise 'Too many ORCID redirects' if limit <= 0

  location = response['location']
  raise 'ORCID redirect response missing location header' if location.to_s.empty?

  redirected_uri = URI.join(uri.to_s, location)
  redirected_request = request.class.new(redirected_uri)
  request.each_header do |key, value|
    next if key.downcase == 'host'
    redirected_request[key] = value
  end
  if request.body
    redirected_request.body = request.body
  end

  request_with_redirects(redirected_uri, redirected_request, limit - 1)
end

def main
  token = fetch_access_token
  record = http_get_json("#{PUBLIC_API_BASE}/#{ORCID_ID}/record", token)

  peer_review_put_codes = collect_peer_review_put_codes(record).uniq
  peer_review_items = peer_review_put_codes.map do |put_code|
    http_get_json("#{PUBLIC_API_BASE}/#{ORCID_ID}/peer-review/#{put_code}", token)
  end

  journals = pick_journals(peer_review_items)
  raise 'No peer review journals found in ORCID record' if journals.empty?
  review_count = count_reviews(record)
  review_count = journals.length if review_count <= 0
  counts_by_issn = peer_review_counts(record)

  journals.each do |journal|
    journal['review_count'] = counts_by_issn["issn:#{journal['issn']}"] || 0
  end

  payload = {
    'orcid_id' => ORCID_ID,
    'source' => 'orcid',
    'source_url' => "https://orcid.org/#{ORCID_ID}",
    'last_synced_at' => Time.now.utc.iso8601,
    'review_count' => review_count,
    'journal_count' => journals.length,
    'journals' => journals
  }

  write_output(payload)
  warn "Wrote #{journals.length} ORCID journals to #{OUTPUT_PATH}"
rescue StandardError => e
  payload = {
    'orcid_id' => ORCID_ID,
    'source' => 'fallback',
    'source_url' => "https://orcid.org/#{ORCID_ID}",
    'last_synced_at' => Time.now.utc.iso8601,
    'review_count' => FALLBACK_JOURNALS.length,
    'journal_count' => FALLBACK_JOURNALS.length,
    'journals' => fallback_journals
  }

  write_output(payload)
  warn "ORCID sync failed, wrote fallback data instead: #{e.message}"
end

main if $PROGRAM_NAME == __FILE__
