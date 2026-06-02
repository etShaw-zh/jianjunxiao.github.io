#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require 'net/http'
require 'time'
require 'uri'
require 'yaml'

ORCID_ID = '0000-0003-0000-9630'
PUBLIC_API_BASE = 'https://pub.orcid.org/v3.0'
TOKEN_ENDPOINT = 'https://pub.orcid.org/oauth/token'
OUTPUT_PATH = File.expand_path('../_data/orcid_work_stats.yml', __dir__)

TYPE_TO_KEY = {
  'journal-article' => 'journal_articles',
  'conference-paper' => 'conference_outputs',
  'conference-poster' => 'conference_outputs',
  'software' => 'software',
  'patent' => 'patents'
}.freeze

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
  redirected_request.body = request.body if request.body

  request_with_redirects(redirected_uri, redirected_request, limit - 1)
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
  return nil unless response.is_a?(Net::HTTPSuccess)

  JSON.parse(response.body).fetch('access_token')
end

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

def preferred_summary(work_summaries)
  work_summaries.max_by do |summary|
    [summary['display-index'].to_i, summary.dig('created-date', 'value').to_i, summary['put-code'].to_i]
  end
end

def count_works(works_record)
  counts = Hash.new(0)
  total = 0

  works_record.fetch('group', []).each do |group|
    summaries = group['work-summary']
    next unless summaries.is_a?(Array) && !summaries.empty?

    summary = preferred_summary(summaries)
    next unless summary

    type = summary['type'].to_s.strip
    key = TYPE_TO_KEY[type] || 'other_works'
    counts[key] += 1
    total += 1
  end

  {
    'total' => total,
    'journal_articles' => counts['journal_articles'],
    'conference_outputs' => counts['conference_outputs'],
    'software' => counts['software'],
    'patents' => counts['patents'],
    'other_works' => counts['other_works']
  }
end

def write_output(payload)
  tmp_path = "#{OUTPUT_PATH}.tmp"
  File.write(tmp_path, YAML.dump(payload))
  File.rename(tmp_path, OUTPUT_PATH)
end

def main
  token = fetch_access_token
  unless token
    warn 'ORCID work stats sync skipped: missing credentials'
    return 0
  end

  works_record = http_get_json("#{PUBLIC_API_BASE}/#{ORCID_ID}/works", token)
  stats = count_works(works_record)

  payload = {
    'orcid_id' => ORCID_ID,
    'source' => 'orcid',
    'source_url' => "https://orcid.org/#{ORCID_ID}",
    'last_synced_at' => Time.now.utc.iso8601
  }.merge(stats)

  write_output(payload)
  warn "Wrote ORCID work stats to #{OUTPUT_PATH}"
  0
rescue StandardError => e
  warn "ORCID work stats sync failed, keeping existing data: #{e.message}"
  0
end

main if $PROGRAM_NAME == __FILE__
