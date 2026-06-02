#!/usr/bin/env bash
set -euo pipefail

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

assert_contains() {
  local file="$1"
  local pattern="$2"
  rg -q --fixed-strings "$pattern" "$file" || fail "$file must contain: $pattern"
}

assert_not_contains() {
  local file="$1"
  local pattern="$2"
  if rg -q --fixed-strings "$pattern" "$file"; then
    fail "$file must not contain: $pattern"
  else
    local status=$?
    if (( status > 1 )); then
      fail "rg failed while checking $file for forbidden pattern: $pattern (exit $status)"
    fi
  fi
}

test ! -e index.html || fail "obsolete index.html must be removed"
test -f zh/index.md || fail "zh/index.md must exist"
test -f assets/css/homepage-redesign.css || fail "custom redesign stylesheet must exist"
test -f _data/orcid_peer_reviews.yml || fail "orcid peer review data file must exist"
test -f _data/orcid_work_stats.yml || fail "orcid work stats data file must exist"
test -f _data/news.yml || fail "news data file must exist"

assert_contains _config.yml 'url: "https://xiaojianjun.cn"'
assert_contains _config.yml 'repository: "etShaw-zh/jianjunxiao.github.io"'
assert_contains _config.yml '  - "/assets/css/homepage-redesign.css"'
assert_not_contains _config.yml "A virtual proof that I'm awesome"
assert_not_contains _config.yml 'google_analytics:'
assert_not_contains _includes/head.html 'hm.baidu.com'
assert_not_contains _includes/footer.html 'ipmap_save_geolocation'
assert_not_contains _includes/footer.html 'gw.alipayobjects.com'
assert_not_contains visitors.md 'ipmap_save_geolocation'
assert_not_contains visitors.md 'gw.alipayobjects.com'
assert_not_contains visitors.md 'aicodingassistant.cn'
assert_not_contains _layouts/base.html 'jquery-3.2.1.min.js'
assert_not_contains _layouts/base.html 'statics.js'
assert_contains _layouts/base.html 'jquery-3.5.1.slim.min.js'
assert_contains _includes/nav.html 'site.data.navigation'
assert_contains _includes/nav.html 'language-switch'
assert_contains index.md 'homepage-hero'
assert_contains index.md 'full-width: true'
assert_contains index.md 'Selected Publications'
assert_contains index.md 'Featured Projects'
assert_contains index.md 'Latest News'
assert_contains index.md 'site.data.orcid_peer_reviews'
assert_contains index.md 'site.data.orcid_work_stats'
assert_contains index.md 'news-feed.html'
assert_contains zh/index.md 'homepage-hero'
assert_contains zh/index.md 'full-width: true'
assert_contains zh/index.md '精选论文'
assert_contains zh/index.md '代表项目'
assert_contains zh/index.md '最新动态'
assert_contains zh/index.md 'site.data.orcid_peer_reviews'
assert_contains zh/index.md 'site.data.orcid_work_stats'
assert_contains zh/index.md 'news-feed.html'
assert_contains life.md 'news-feed.html'
assert_contains life.md 'mode="archive"'

printf 'Homepage foundation checks passed.\n'
