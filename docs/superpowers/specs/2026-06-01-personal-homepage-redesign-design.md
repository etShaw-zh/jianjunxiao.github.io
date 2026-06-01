# Personal Homepage Redesign Design

Date: 2026-06-01

## 1. Purpose

Redesign `xiaojianjun.cn` as a bilingual personal homepage for academic collaboration and professional opportunities. The site should present Jianjun Xiao's research identity first, then show engineering ability through selected software and platform projects.

The redesign keeps the existing Jekyll and GitHub Pages stack. It does not introduce a JavaScript application framework or a new build pipeline.

## 2. Audience And Goals

### Primary audiences

- Academic peers and potential collaborators
- Research groups, conference contacts, and prospective employers
- Visitors evaluating research software and education technology projects

### Visitor questions answered by the homepage

1. Who is Jianjun Xiao?
2. What research topics does he work on?
3. What are his strongest publications and projects?
4. What has he done recently?
5. How can a visitor read more, download a CV, or make contact?

## 3. Design Direction

Use an editorial academic style with restrained modern technology elements.

### Principles

- Establish credibility through typography, hierarchy, and whitespace.
- Use cards selectively for featured projects, not as the default container for every section.
- Keep motion minimal and functional.
- Avoid decorative dashboards, heavy animation, and crowded badge collections.
- Use photographs and project screenshots as supporting evidence, not as the main information architecture.

### Visual tokens

| Token | Value | Use |
| --- | --- | --- |
| Page background | `#FCFCFA` | Main page background |
| Primary text | `#20252B` | Headings and body text |
| Secondary text | `#66727A` | Metadata and supporting copy |
| Accent | `#087F8C` | Links, active navigation, and primary actions |
| Supporting accent | `#2D5B78` | Secondary actions and subtle emphasis |
| Border | `#DDE3E4` | Dividers and project card borders |
| Surface | `#FFFFFF` | Project cards and framed media |

### Typography

- Headings and interface text: a clean sans-serif stack.
- English body copy: a readable serif stack.
- Chinese body copy: system Chinese serif or sans-serif fonts chosen for reliable rendering.
- Keep line lengths moderate and use a clear vertical rhythm.

## 4. Information Architecture

### Primary navigation

| English | Chinese | English path | Chinese path |
| --- | --- | --- | --- |
| Home | 首页 | `/` | `/zh/` |
| Research | 研究 | `/research/` | `/zh/research/` |
| Publications | 论文 | `/publications/` | `/zh/publications/` |
| Projects | 项目 | `/projects/` | `/zh/projects/` |
| News | 动态 | `/news/` | `/zh/news/` |
| About | 关于 | `/about/` | `/zh/about/` |
| CV | 简历 | Existing English PDF | Existing Chinese PDF |

Each rendered page includes an explicit `EN | 中文` language switch. Language variants use separate routes rather than placing two languages in the same content block.

### Content consolidation

- Move the current `Talks` content into `Research` or `News`.
- Remove `Insights` from primary navigation. Keep it as an optional secondary link if retained.
- Present AICodingOfficer as a featured project instead of a primary navigation category.
- Replace the current homepage visitor map with useful research and project content.

## 5. Homepage Design

### Header

- Left: `Jianjun Xiao` and `肖建军`.
- Right: primary navigation, CV entry, and language switch.
- Mobile: collapse navigation into a menu while keeping the language switch easy to reach.

### Hero

- Portrait as a supporting element.
- Name and bilingual role statement:
  - `PhD Candidate · Learning Analytics · AI in Education`
  - `博士研究生 · 学习分析 · 人工智能教育应用`
- One concise English or Chinese introduction according to route.
- Three actions:
  - `Selected Publications`
  - `Download CV`
  - `Contact`

Do not use a hero eyebrow, decorative badge row, visitor count, or animated background.

### Research Focus

Show three focus areas with short descriptions:

1. Learning Analytics
2. AI in Education
3. Connectivist MOOCs and Online Learning Environments

Use an open three-column layout on desktop and a single-column layout on mobile.

### Selected Publications

Show three to five selected items. Each item includes:

- Year
- Title
- Publication venue or status
- DOI or arXiv link when available

Use a compact editorial list. Link to the full Publications page.

### Featured Projects

Show three featured projects:

1. `GCA Analyzer`
2. `cMOOC Platform`
3. `AICO · AI Coding Officer`

Each card includes a concise description, one supporting image when useful, the technology or impact signal, and focused outbound actions such as documentation, source code, or project site.

### Latest News

Show the three newest updates with dates. Link to the full News page.

### Footer

Include:

- Email
- Google Scholar
- ORCID
- GitHub
- LinkedIn
- Copyright

Remove visitor maps, theme advertising, and implicit geolocation requests.

## 6. Content Page Design

### Research

- Research interests
- Academic projects
- Talks and presentations
- Academic services

### Publications

- Selected publications
- Preprints
- Journal articles grouped by year
- Conference papers grouped by year
- Clear labels for corresponding author and oral presentation markers

Keep entries readable as a bibliography. Do not place every publication inside a card.

### Projects

- Research software
- Platforms
- Applications
- Selected competitions or activities

Use consistent project cards. Reduce badge collections to two or three meaningful signals per project.

### News

- Reverse-chronological timeline
- Responsive images with useful alt text
- Lazy loading for images
- Media only when it adds evidence or context

### About

- Short biography
- Education
- Research interests
- Contact links

### CV

- Keep existing English and Chinese PDF downloads.
- Expose both clearly in the navigation or About page.

## 7. Technical Cleanup

### SEO And HTTPS

- Set the canonical site URL to `https://xiaojianjun.cn`.
- Replace the template description with a research-focused description.
- Correct the repository metadata to `etShaw-zh/jianjunxiao.github.io`.
- Configure the deployment host to redirect HTTP requests to HTTPS.
- Ensure canonical, Open Graph, and Twitter metadata use HTTPS.
- Avoid empty Twitter account metadata when no Twitter handle is configured.

### Privacy And External Dependencies

- Remove the footer request to `aicodingassistant.cn/wp-admin/admin-ajax.php?action=ipmap_save_geolocation`.
- Remove the homepage Flag Counter image.
- Remove unused ClustrMaps code and `assets/js/statics.js` from global loading.
- Retain only intentional analytics and document them.

### Frontend Dependencies

- Load one compatible local jQuery version.
- Keep Bootstrap and Popper only while the existing navigation requires them.
- Remove redundant global script declarations.
- Move custom visual overrides into a dedicated stylesheet.

### Content Hygiene

- Delete the obsolete blank `index.html`; keep `index.md` as the homepage source.
- Replace stale `Postgraduate` copy with the current PhD candidate description.
- Update weak image alt text such as `PCA`, `REM26`, and `TheClimbers202009`.
- Add `preload="none"` to non-critical video elements.
- Keep the user's existing uncommitted `projects.md` edits intact during implementation.

## 8. Responsive And Accessibility Requirements

- Navigation must remain usable at desktop, tablet, and narrow mobile widths.
- Hero content, portrait, publication lists, and project cards must collapse without horizontal overflow.
- All informative images must have meaningful alt text.
- Links and controls must have visible hover and keyboard focus states.
- Text and accent colors must maintain readable contrast.
- Heading order must be semantic.
- Avoid autoplay media.
- Use lazy loading for below-the-fold images where supported.

## 9. Validation Plan

### Build validation

- Build the Jekyll site successfully.
- Check generated canonical and social metadata for HTTPS URLs.
- Confirm only one homepage source generates `/index.html`.

### Rendered validation

- Verify desktop and mobile views.
- Check navigation, language switching, CV downloads, and outbound links.
- Confirm the homepage contains no visitor map or implicit geolocation request.
- Confirm no framework overlay, JavaScript error, layout clipping, or mobile overflow.

### Content validation

- Check bilingual route coverage for all primary pages.
- Verify the selected publication and project links.
- Confirm News items are in reverse chronological order.
- Confirm images use meaningful alternative text.

## 10. Delivery Phases

### Phase 1: Foundation And Homepage

- Technical cleanup
- Shared bilingual navigation and footer
- Shared stylesheet
- English and Chinese homepage prototypes implemented in Jekyll
- Desktop and mobile verification

### Phase 2: Core Content Pages

- Research
- Publications
- Projects
- News
- About
- CV navigation integration

### Phase 3: Content Polish

- Alt text audit
- Image and video optimization
- Link audit
- SEO metadata review
- Final responsive QA

## 11. Out Of Scope

- Migrating away from Jekyll
- Adding a CMS
- Introducing React, Vue, or another JavaScript framework
- Adding a database or server-side application
- Building a complex analytics dashboard
- Rewriting the content of academic publications

