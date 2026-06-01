# Personal Homepage Redesign Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a clean bilingual homepage foundation with corrected SEO metadata, privacy-safe dependencies, shared navigation and footer, and responsive English and Chinese landing pages.

**Architecture:** Keep the existing Jekyll and GitHub Pages stack. Add a focused custom stylesheet for the redesign, use shared Liquid includes for navigation and footer behavior, and add a shell verification script that checks source-level requirements before rendered QA. Preserve existing content pages until Phase 2.

**Tech Stack:** Jekyll, Liquid, Markdown, HTML, CSS, Bootstrap 4, shell verification, GitHub Pages

---

## File Map

| File | Responsibility |
| --- | --- |
| `scripts/verify-homepage-foundation.sh` | Repeatable source-level verification for Phase 1 requirements |
| `_config.yml` | Canonical HTTPS URL, repository metadata, site description, language navigation data, custom CSS registration |
| `_layouts/base.html` | Global script dependency cleanup |
| `_includes/head.html` | Avoid empty Twitter metadata |
| `_includes/nav.html` | Bilingual editorial navigation and language switch |
| `_includes/footer.html` | Privacy-safe footer markup without geolocation requests |
| `assets/css/homepage-redesign.css` | Visual tokens, homepage components, responsive rules, focus styles |
| `index.md` | English homepage |
| `zh/index.md` | Chinese homepage |
| `index.html` | Remove obsolete duplicate homepage source |

Do not modify `projects.md` in Phase 1. It contains an existing user edit.

### Task 1: Add Foundation Verification

**Files:**
- Create: `scripts/verify-homepage-foundation.sh`

- [ ] **Step 1: Write the failing verification script**

```bash
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
  fi
}

test ! -e index.html || fail "obsolete index.html must be removed"
test -f zh/index.md || fail "zh/index.md must exist"
test -f assets/css/homepage-redesign.css || fail "custom redesign stylesheet must exist"

assert_contains _config.yml 'url: "https://xiaojianjun.cn"'
assert_contains _config.yml 'repository: "etShaw-zh/jianjunxiao.github.io"'
assert_contains _config.yml '  - "/assets/css/homepage-redesign.css"'
assert_not_contains _config.yml "A virtual proof that I'm awesome"
assert_not_contains _includes/footer.html 'ipmap_save_geolocation'
assert_not_contains _includes/footer.html 'gw.alipayobjects.com'
assert_not_contains _layouts/base.html 'jquery-3.2.1.min.js'
assert_not_contains _layouts/base.html 'statics.js'
assert_contains _layouts/base.html 'jquery-3.5.1.slim.min.js'
assert_contains _includes/nav.html 'site.data.navigation'
assert_contains _includes/nav.html 'language-switch'
assert_contains index.md 'homepage-hero'
assert_contains index.md 'Selected Publications'
assert_contains index.md 'Featured Projects'
assert_contains index.md 'Latest News'
assert_contains zh/index.md 'homepage-hero'
assert_contains zh/index.md '精选论文'
assert_contains zh/index.md '代表项目'
assert_contains zh/index.md '最新动态'

printf 'Homepage foundation checks passed.\n'
```

- [ ] **Step 2: Run the script to verify it fails**

Run:

```bash
bash scripts/verify-homepage-foundation.sh
```

Expected: `FAIL: obsolete index.html must be removed`

- [ ] **Step 3: Commit the verification script**

```bash
git add scripts/verify-homepage-foundation.sh
git commit -m "test: add homepage foundation verification"
```

### Task 2: Clean Global Configuration And Dependencies

**Files:**
- Modify: `_config.yml`
- Modify: `_layouts/base.html`
- Modify: `_includes/head.html`
- Modify: `_includes/footer.html`
- Delete: `index.html`

- [ ] **Step 1: Update canonical metadata and custom CSS registration**

In `_config.yml`:

```yaml
title: Jianjun Xiao
description: PhD candidate researching learning analytics, AI in education, and online learning environments.
url: "https://xiaojianjun.cn"
repository: "etShaw-zh/jianjunxiao.github.io"
language: "en"

site-css:
  - "/assets/css/homepage-redesign.css"
```

Disable the stale sample Staticman block by commenting it out. Keep Disqus unchanged in Phase 1 because comment migration is outside this plan.

- [ ] **Step 2: Remove unused global scripts**

In `_layouts/base.html`, keep:

```yaml
common-js:
  - "/assets/js/jquery-3.5.1.slim.min.js"
  - "/assets/js/popper.min.js"
  - "/assets/js/bootstrap.min.js"
  - "/assets/js/beautifuljekyll.js"
```

Remove the commented ClustrMaps script examples from the body.

- [ ] **Step 3: Remove implicit geolocation tracking**

In `_includes/footer.html`, delete the external jQuery script and the `$.ajax` call to `aicodingassistant.cn`.

Also replace the theme advertisement condition with:

```liquid
{% unless site.remove-ads %}
  <p class="theme-by text-muted">
    Built with <a href="https://beautifuljekyll.com">Beautiful Jekyll</a>
  </p>
{% endunless %}
```

Set this in `_config.yml`:

```yaml
remove-ads: true
```

- [ ] **Step 4: Avoid empty Twitter metadata**

Wrap the Twitter account tags in `_includes/head.html`:

```liquid
{% if site.social-network-links.twitter %}
  <meta name="twitter:site" content="@{{ site.social-network-links.twitter }}">
  <meta name="twitter:creator" content="@{{ site.social-network-links.twitter }}">
{% endif %}
```

- [ ] **Step 5: Delete the obsolete homepage source**

Delete `index.html`. Keep `index.md` as the only English homepage source.

- [ ] **Step 6: Run verification and confirm the next expected failure**

Run:

```bash
bash scripts/verify-homepage-foundation.sh
```

Expected: `FAIL: zh/index.md must exist`

- [ ] **Step 7: Commit the cleanup**

```bash
git add _config.yml _layouts/base.html _includes/head.html _includes/footer.html index.html
git commit -m "fix: clean homepage metadata and global dependencies"
```

### Task 3: Add Shared Navigation Data And Bilingual Navigation

**Files:**
- Create: `_data/navigation.yml`
- Modify: `_includes/nav.html`

- [ ] **Step 1: Add bilingual navigation data**

Create `_data/navigation.yml`:

```yaml
en:
  - label: Research
    url: /research/
  - label: Publications
    url: /publications/
  - label: Projects
    url: /projects/
  - label: News
    url: /life/
  - label: About
    url: /aboutme/
zh:
  - label: 研究
    url: /zh/research/
  - label: 论文
    url: /zh/publications/
  - label: 项目
    url: /zh/projects/
  - label: 动态
    url: /zh/news/
  - label: 关于
    url: /zh/about/
```

- [ ] **Step 2: Replace navigation rendering**

Use `page.language | default: site.language | default: "en"` to select `site.data.navigation[active_language]`. Render the site title, the selected navigation list, a CV dropdown with English and Chinese PDFs, and a language switch:

```liquid
{% assign active_language = page.language | default: site.language | default: "en" %}
{% assign navigation_links = site.data.navigation[active_language] %}
{% assign alternate_url = page.alternate-url | default: "/zh/" %}
{% assign alternate_label = page.alternate-label | default: "中文" %}
```

Add `class="language-switch"` to the alternate-language link and preserve the Bootstrap mobile collapse button.

- [ ] **Step 3: Run verification and confirm the next expected failure**

Run:

```bash
bash scripts/verify-homepage-foundation.sh
```

Expected: `FAIL: zh/index.md must exist`

- [ ] **Step 4: Commit shared navigation**

```bash
git add _data/navigation.yml _includes/nav.html
git commit -m "feat: add bilingual site navigation"
```

### Task 4: Add Editorial Homepage Styles

**Files:**
- Create: `assets/css/homepage-redesign.css`

- [ ] **Step 1: Add visual tokens and shared homepage styles**

Create CSS variables and component rules for:

```css
:root {
  --page-bg: #fcfcfa;
  --surface: #ffffff;
  --text: #20252b;
  --muted: #66727a;
  --accent: #087f8c;
  --accent-deep: #2d5b78;
  --border: #dde3e4;
  --shadow: 0 18px 45px rgba(32, 37, 43, 0.08);
}
```

Add focused rules for:

- `.homepage-shell`
- `.homepage-hero`
- `.homepage-hero__portrait`
- `.homepage-actions`
- `.homepage-button`
- `.homepage-section`
- `.homepage-section__header`
- `.focus-grid`
- `.focus-item`
- `.publication-list`
- `.publication-item`
- `.project-grid`
- `.project-card`
- `.news-list`
- `.language-switch`
- keyboard focus states
- responsive rules below `768px`

Do not override content-page typography more broadly than needed in Phase 1.

- [ ] **Step 2: Run verification and confirm the next expected failure**

Run:

```bash
bash scripts/verify-homepage-foundation.sh
```

Expected: `FAIL: zh/index.md must exist`

- [ ] **Step 3: Commit stylesheet**

```bash
git add assets/css/homepage-redesign.css
git commit -m "feat: add editorial homepage styles"
```

### Task 5: Build English And Chinese Homepages

**Files:**
- Modify: `index.md`
- Create: `zh/index.md`

- [ ] **Step 1: Replace the English homepage**

Set front matter:

```yaml
---
layout: page
title: Jianjun Xiao
subtitle: PhD Candidate · Learning Analytics · AI in Education
language: en
alternate-url: /zh/
alternate-label: 中文
show-avatar: false
---
```

Build a `.homepage-shell` containing:

- Hero with portrait, bilingual name, role, concise introduction, and three actions
- Research Focus with Learning Analytics, AI in Education, and Connectivist MOOCs
- Selected Publications with three current publications or preprints already listed in `publications.md`
- Featured Projects with GCA Analyzer, cMOOC Platform, and AICO
- Latest News with the three latest entries from `life.md`
- No visitor map and no hidden timeline SVG

- [ ] **Step 2: Add the Chinese homepage**

Create `zh/index.md` with:

```yaml
---
layout: page
title: 肖建军
subtitle: 博士研究生 · 学习分析 · 人工智能教育应用
language: zh
alternate-url: /
alternate-label: EN
show-avatar: false
---
```

Mirror the English homepage structure with concise Chinese copy. Reuse the same project images and outbound links.

- [ ] **Step 3: Run verification**

Run:

```bash
bash scripts/verify-homepage-foundation.sh
```

Expected: `Homepage foundation checks passed.`

- [ ] **Step 4: Commit bilingual homepages**

```bash
git add index.md zh/index.md
git commit -m "feat: add bilingual editorial homepages"
```

### Task 6: Build And Rendered QA

**Files:**
- Modify only if QA reveals a defect: `assets/css/homepage-redesign.css`, `_includes/nav.html`, `index.md`, `zh/index.md`

- [ ] **Step 1: Run source verification**

Run:

```bash
bash scripts/verify-homepage-foundation.sh
git diff --check
```

Expected: both commands exit `0`.

- [ ] **Step 2: Build the Jekyll site**

Run:

```bash
bundle exec jekyll build --future
```

Expected: build exits `0`.

If local gems are missing, use the repository's Docker workflow:

```bash
docker run --rm \
  -v "$PWD":/srv/jekyll \
  -v "$PWD/_site":/srv/jekyll/_site \
  jekyll/builder:latest \
  /bin/bash -c "chmod 777 /srv/jekyll && jekyll build --future"
```

- [ ] **Step 3: Inspect generated HTML**

Run:

```bash
rg -n 'http://xiaojianjun.cn|ipmap_save_geolocation|flagcounter|statics.js|twitter:site\" content=\"@\"' _site
rg -n 'canonical|og:url|homepage-hero|language-switch' _site/index.html _site/zh/index.html
```

Expected: the first command prints no matches. The second command shows HTTPS canonical metadata and homepage structure in both variants.

- [ ] **Step 4: Run rendered QA**

Serve `_site` locally:

```bash
ruby -run -e httpd _site -p 4000
```

Verify:

- Desktop homepage at `http://localhost:4000/`
- Mobile homepage at `http://localhost:4000/`
- Desktop Chinese homepage at `http://localhost:4000/zh/`
- Mobile Chinese homepage at `http://localhost:4000/zh/`
- Mobile menu opens and closes
- `EN | 中文` switches route correctly
- CV download links target both existing PDFs
- No console errors, clipping, horizontal overflow, or visitor map

Use the Browser plugin when its runtime is available. If it remains unavailable, record that blocker and use a Playwright screenshot fallback only with user approval.

- [ ] **Step 5: Fix QA defects and rerun verification**

After any fix:

```bash
bash scripts/verify-homepage-foundation.sh
git diff --check
bundle exec jekyll build --future
```

Use the Docker build fallback when local gems remain unavailable.

- [ ] **Step 6: Commit QA fixes**

```bash
git add assets/css/homepage-redesign.css _includes/nav.html index.md zh/index.md
git commit -m "fix: polish responsive bilingual homepage"
```

Only create this commit when QA required changes.

## Phase 1 Completion Criteria

- Source verification passes.
- Jekyll build passes.
- Generated metadata uses HTTPS.
- English and Chinese homepages render without overflow.
- Shared navigation exposes language switching and both CV downloads.
- Footer contains no implicit geolocation request.
- Homepage contains no Flag Counter or ClustrMaps dependency.
- Existing `projects.md` user edit remains intact and uncommitted.

