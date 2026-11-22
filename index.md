---
layout: page
title: Jianjun Xiao
subtitle: PhD Candidate @ Beijing Normal University
language: en
alternate-url: /zh/
alternate-label: 中文
full-width: true
hide-page-heading: true
show-avatar: false
js:
  - "/assets/js/research-map.js"
---

{% assign orcid_work_stats = site.data.orcid_work_stats %}
{% assign work_total = orcid_work_stats.total | default: 24 %}
{% assign journal_articles = orcid_work_stats.journal_articles | default: 14 %}
{% assign conference_outputs = orcid_work_stats.conference_outputs | default: 6 %}
{% assign orcid_peer_reviews = site.data.orcid_peer_reviews %}
{% assign review_total = orcid_peer_reviews.review_count | default: 31 %}
{% assign journal_total = orcid_peer_reviews.journal_count | default: 14 %}
{% assign paper_citations = site.data.paper_citations %}
{% assign total_citations = paper_citations.total_citations | default: 171 %}
{% assign h_index = paper_citations.h_index | default: 5 %}
{% assign i10_index = paper_citations.i10_index | default: 3 %}
{% assign paper_count = paper_citations.paper_count | default: 19 %}
{% assign cite_map = paper_citations.papers %}

<div class="homepage-shell">
  <section class="homepage-hero homepage-hero--map" id="map">
    <div class="homepage-hero__copy">
      <p class="homepage-eyebrow">PhD Candidate &middot; Faculty of Education, BNU</p>
      <h1>Jianjun Xiao<span>肖建军</span></h1>
      <p class="homepage-hero__lead">Researching how people learn, collaborate, and create knowledge in digitally mediated environments—bridging <strong>learning analytics</strong>, <strong>complex networks</strong>, and <strong>human–AI collaboration</strong>.</p>

      <div class="homepage-social-bar" aria-label="Academic profiles and contact">
        <a class="homepage-icon-btn" href="https://scholar.google.com/citations?hl=zh-CN&user=FaqCcFoAAAAJ" target="_blank" rel="noopener" title="Google Scholar" aria-label="Google Scholar">
          <i class="fas fa-graduation-cap" aria-hidden="true"></i>
        </a>
        <a class="homepage-icon-btn" href="https://orcid.org/0000-0003-0000-9630" target="_blank" rel="noopener" title="ORCID" aria-label="ORCID">
          <i class="fab fa-orcid" aria-hidden="true"></i>
        </a>
        <a class="homepage-icon-btn" href="https://github.com/etShaw-zh" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
          <i class="fab fa-github" aria-hidden="true"></i>
        </a>
        <a class="homepage-icon-btn" href="https://linkedin.com/in/建军-肖-2947a6380" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in" aria-hidden="true"></i>
        </a>
        <a class="homepage-icon-btn" href="mailto:et_shaw@126.com" title="Email" aria-label="Email">
          <i class="fas fa-envelope" aria-hidden="true"></i>
        </a>
        <a class="homepage-button" href="/assets/pdf/Xiao_Jianjun_Resume_EN.pdf">Download CV</a>
      </div>

      <div class="homepage-metrics">
        <div class="homepage-metrics__primary">
          <p class="homepage-metrics__label">Total Citations &middot; Google Scholar</p>
          <p class="homepage-metrics__value">{{ total_citations }}</p>
          <p class="homepage-metrics__breakdown">h-index {{ h_index }} &middot; i10-index {{ i10_index }} &middot; {{ paper_count }} papers mapped</p>
        </div>
        <dl class="homepage-metrics__secondary">
          <div>
            <dt>ORCID Works</dt>
            <dd>{{ work_total }} <span>{{ journal_articles }} journal &middot; {{ conference_outputs }} conf</span></dd>
          </div>
          <div>
            <dt>Peer Reviews</dt>
            <dd>{{ review_total }} <span>/ {{ journal_total }} journals</span></dd>
          </div>
        </dl>
        <div class="homepage-metrics__footer">
          <a href="#news">Latest updates &darr;</a>
        </div>
      </div>
    </div>

    <div class="homepage-hero__map">
      {% include research-map.html language=page.language %}
    </div>
  </section>

  {% if orcid_peer_reviews and orcid_peer_reviews.journals and orcid_peer_reviews.journals.size > 0 %}
    <aside class="service-ribbon" id="service" aria-label="Journal peer reviewer list">
      <div class="service-ribbon__label">
        <span class="service-ribbon__title">Peer Reviewer</span>
        <span class="service-ribbon__count">{{ orcid_peer_reviews.review_count }} &middot; {{ orcid_peer_reviews.journal_count | default: orcid_peer_reviews.journals.size }} journals</span>
      </div>
      <div class="service-marquee">
        <div class="service-marquee__track">
          <ul class="service-marquee__group">
            {% for journal in orcid_peer_reviews.journals %}
              <li><a class="service-pill" href="{{ journal.url }}" target="_blank" rel="noopener"><span class="service-pill__label">{{ journal.title }}</span><span class="service-pill__count">{{ journal.review_count }}</span></a></li>
            {% endfor %}
          </ul>
          <ul class="service-marquee__group" aria-hidden="true">
            {% for journal in orcid_peer_reviews.journals %}
              <li><a class="service-pill" href="{{ journal.url }}" target="_blank" rel="noopener" tabindex="-1"><span class="service-pill__label">{{ journal.title }}</span><span class="service-pill__count">{{ journal.review_count }}</span></a></li>
            {% endfor %}
          </ul>
        </div>
      </div>
    </aside>
  {% endif %}

  <section class="homepage-section" id="news">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">02 / Updates</p>
        <h2>Latest News</h2>
      </div>
      <a class="homepage-section__link" href="/life/">View all &rarr;</a>
    </div>
    <ul class="news-list">
      {% include news-feed.html language=page.language limit=4 %}
    </ul>
  </section>

  <section class="homepage-section" id="publications">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">03 / Publications</p>
        <h2>Selected Publications</h2>
      </div>
      <div class="homepage-section__actions">
        <a class="homepage-section__link" href="https://orcid.org/0000-0003-0000-9630#cy-works" target="_blank" rel="noopener">ORCID &#8599;</a>
        <a class="homepage-section__link" href="https://scholar.google.com/citations?hl=zh-CN&user=FaqCcFoAAAAJ" target="_blank" rel="noopener">Google Scholar &#8599;</a>
      </div>
    </div>

    {% assign c_lak = cite_map["lak26-synergy-2026"].citations | default: 0 %}
    {% assign c_ile26 = cite_map["network-dynamics-cie-2026"].citations | default: 0 %}
    {% assign c_pca = cite_map["human-genai-cmooc-2026"].citations | default: 0 %}

    <div class="rg-pub-list">
      <article class="rg-pub-entry">
        <div class="rg-pub-entry__top">
          <div class="rg-pub-entry__meta">
            <span class="rg-pub-entry__num">01</span>
            <span>LAK26 &middot; Bergen, Norway &middot; 2026</span>
            <span class="pill-tag">Full Research Paper</span>
            {% if c_lak > 0 %}<span class="pill-tag pill-tag--cite">{{ c_lak }} cites</span>{% endif %}
          </div>
          <div class="rg-pub-entry__links">
            <a class="rg-pub-entry__link rg-pub-entry__link--muted" href="https://arxiv.org/pdf/2512.13061.pdf" target="_blank" rel="noopener">PDF &#8599;</a>
            <a class="rg-pub-entry__link" href="https://doi.org/10.1145/3785022.3785049" target="_blank" rel="noopener">DOI &#8599;</a>
          </div>
        </div>
        <h3 class="rg-pub-entry__title">Modeling collaborative problem solving dynamics from group discourse: A text-mining approach with synergy degree model</h3>
        <p class="rg-pub-entry__authors"><strong>Xiao, J.</strong>, Wang, C., &amp; Zhang, W. &mdash; Automated CPS discourse coding &amp; Synergy Degree Modeling validated via permutation tests and ANOVA (<em>p</em> = .023).</p>

        <div class="rg-figures-wrap" data-rg-strip>
          <div class="rg-figures-bar">
            <span class="rg-figures-bar__label">Extracted Figures &amp; Tables &middot; 5</span>
            <div class="rg-figures-bar__controls">
              <button type="button" class="rg-figures-nav" data-rg-prev aria-label="Scroll figures left">&#8249;</button>
              <button type="button" class="rg-figures-nav" data-rg-next aria-label="Scroll figures right">&#8250;</button>
            </div>
          </div>
          <div class="rg-figures-grid" aria-label="Figures and tables extracted from LAK26 PDF">
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-fig1-pipeline.jpg" data-zoom-caption="LAK26 · Figure 1 — The research design and procedure: data collection, automated CPS classification, Synergy Degree Modeling, and comparative analysis">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/lak26-fig1-pipeline.jpg" loading="lazy" decoding="async" alt="Figure 1 Research design and procedure">
              </span>
              <span class="rg-figure-tile__cap">Fig. 1 &middot; Research Design</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-table3-models.jpg" data-zoom-caption="LAK26 · Table 3 — Mean and standard deviation of model performance (LLMs, Neural Models, Classical ML) on CPS behavior classification">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">TABLE</span>
                <img src="/assets/img/photos/2026/figures/lak26-table3-models.jpg" loading="lazy" decoding="async" alt="Table 3 Model performance comparison">
              </span>
              <span class="rg-figure-tile__cap">Table 3 &middot; Model Perf.</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-fig2-permutation.jpg" data-zoom-caption="LAK26 · Figure 2 — Permutation test of CPS order parameters (O, W, S, C) and synergy degree between Human vs. Model coding">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/lak26-fig2-permutation.jpg" loading="lazy" decoding="async" alt="Figure 2 Permutation test distributions">
              </span>
              <span class="rg-figure-tile__cap">Fig. 2 &middot; Permutation Test</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-table5-synergy.jpg" data-zoom-caption="LAK26 · Table 5 — Descriptive statistics of CPS order parameters and synergy degree across Problem Types (PT) and Collaborative Quality (CQ)">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">TABLE</span>
                <img src="/assets/img/photos/2026/figures/lak26-table5-synergy.jpg" loading="lazy" decoding="async" alt="Table 5 Descriptive statistics of order parameters and synergy">
              </span>
              <span class="rg-figure-tile__cap">Table 5 &middot; Synergy Stats</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-table6-anova.jpg" data-zoom-caption="LAK26 · Table 6 — Significant group differences (Kruskal-Wallis & Fisher ANOVA) across Problem Types and Collaborative Quality">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">TABLE</span>
                <img src="/assets/img/photos/2026/figures/lak26-table6-anova.jpg" loading="lazy" decoding="async" alt="Table 6 Significant group differences ANOVA">
              </span>
              <span class="rg-figure-tile__cap">Table 6 &middot; Group ANOVA</span>
            </button>
          </div>
        </div>
      </article>

      <article class="rg-pub-entry">
        <div class="rg-pub-entry__top">
          <div class="rg-pub-entry__meta">
            <span class="rg-pub-entry__num">02</span>
            <span>Interactive Learning Environments &middot; 2026</span>
            <span class="pill-tag">SSCI Q1 &middot; Solo</span>
            {% if c_ile26 > 0 %}<span class="pill-tag pill-tag--cite">{{ c_ile26 }} cites</span>{% endif %}
          </div>
          <div class="rg-pub-entry__links">
            <a class="rg-pub-entry__link" href="https://doi.org/10.1080/10494820.2026.2632766" target="_blank" rel="noopener">DOI &#8599;</a>
          </div>
        </div>
        <h3 class="rg-pub-entry__title">Exploring interaction patterns in open learning environments: integrating network dynamics and cognitive engagement</h3>
        <p class="rg-pub-entry__authors"><strong>Xiao, J.<sup>&dagger;</sup></strong> &mdash; Relational Event Modeling across 8 cMOOC iterations (1,939 learners, 39,000+ interaction events) revealing reciprocity &times; cognitive engagement effects.</p>

        <div class="rg-figures-wrap" data-rg-strip>
          <div class="rg-figures-bar">
            <span class="rg-figures-bar__label">Extracted Figures &amp; Tables &middot; 6</span>
            <div class="rg-figures-bar__controls">
              <button type="button" class="rg-figures-nav" data-rg-prev aria-label="Scroll figures left">&#8249;</button>
              <button type="button" class="rg-figures-nav" data-rg-next aria-label="Scroll figures right">&#8250;</button>
            </div>
          </div>
          <div class="rg-figures-grid" aria-label="Figures and tables extracted from Interactive Learning Environments 2026 PDF">
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig1-framework.jpg" data-zoom-caption="ILE (2026) · Figure 1 — REMs analysis of reciprocity and interaction levels in cMOOCs (Theoretical Framework)">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig1-framework.jpg" loading="lazy" decoding="async" alt="Figure 1 Theoretical framework of REMs and CIE">
              </span>
              <span class="rg-figure-tile__cap">Fig. 1 &middot; REM Framework</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig2-design.jpg" data-zoom-caption="ILE (2026) · Figure 2 — Diagram of the research design: NLP CIE classification, Relational Event Modeling, and multivariate meta-analysis">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig2-design.jpg" loading="lazy" decoding="async" alt="Figure 2 Diagram of the research design">
              </span>
              <span class="rg-figure-tile__cap">Fig. 2 &middot; Research Design</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig4-cie.jpg" data-zoom-caption="ILE (2026) · Figure 4 — Percentage of discussion posts by CIE cognitive engagement level across 8 cMOOC iterations">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig4-cie.jpg" loading="lazy" decoding="async" alt="Figure 4 Percentage of posts by CIE level">
              </span>
              <span class="rg-figure-tile__cap">Fig. 4 &middot; CIE Distribution</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig5-marginal.jpg" data-zoom-caption="ILE (2026) · Figure 5 — Marginal effects plot for the interaction effect of CIE levels and reciprocity on subsequent interactions">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig5-marginal.jpg" loading="lazy" decoding="async" alt="Figure 5 Marginal effects plot">
              </span>
              <span class="rg-figure-tile__cap">Fig. 5 &middot; Marginal Effects</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-table2-rem.jpg" data-zoom-caption="ILE (2026) · Table 2 — Meta-analysis of parameter estimates for REMs on reciprocate and CIE level across Courses 2–9">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">TABLE</span>
                <img src="/assets/img/photos/2026/figures/ile26-table2-rem.jpg" loading="lazy" decoding="async" alt="Table 2 Meta-analysis of REM parameter estimates">
              </span>
              <span class="rg-figure-tile__cap">Table 2 &middot; REM Meta</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-table3-interaction.jpg" data-zoom-caption="ILE (2026) · Table 3 — Meta-analysis of parameter estimates for REMs on reciprocate with interaction effect on CIE level">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">TABLE</span>
                <img src="/assets/img/photos/2026/figures/ile26-table3-interaction.jpg" loading="lazy" decoding="async" alt="Table 3 REM reciprocity interaction meta-analysis">
              </span>
              <span class="rg-figure-tile__cap">Table 3 &middot; Interaction Meta</span>
            </button>
          </div>
        </div>
      </article>

      <article class="rg-pub-entry">
        <div class="rg-pub-entry__top">
          <div class="rg-pub-entry__meta">
            <span class="rg-pub-entry__num">03</span>
            <span>arXiv Preprint &middot; 2026</span>
            <span class="pill-tag">Human–GenAI &middot; DBR</span>
            {% if c_pca > 0 %}<span class="pill-tag pill-tag--cite">{{ c_pca }} cites</span>{% endif %}
          </div>
          <div class="rg-pub-entry__links">
            <a class="rg-pub-entry__link rg-pub-entry__link--muted" href="https://arxiv.org/pdf/2603.29285v2.pdf" target="_blank" rel="noopener">PDF &#8599;</a>
            <a class="rg-pub-entry__link" href="https://arxiv.org/abs/2603.29285v2" target="_blank" rel="noopener">arXiv &#8599;</a>
          </div>
        </div>
        <h3 class="rg-pub-entry__title">Designing human-GenAI interaction for cMOOC discussion facilitation: Effects of a collaborative AI-in-the-loop workflow on social and cognitive presence</h3>
        <p class="rg-pub-entry__authors"><strong>Xiao, J.</strong>, &amp; Wang, C. &mdash; Two-iteration DBR developing <em>FaciHub</em>, showing significant social presence gains across authentic cMOOC discussions (<em>n</em> = 178).</p>

        <div class="rg-figures-wrap" data-rg-strip>
          <div class="rg-figures-bar">
            <span class="rg-figures-bar__label">Extracted Figures &amp; Tables &middot; 6</span>
            <div class="rg-figures-bar__controls">
              <button type="button" class="rg-figures-nav" data-rg-prev aria-label="Scroll figures left">&#8249;</button>
              <button type="button" class="rg-figures-nav" data-rg-next aria-label="Scroll figures right">&#8250;</button>
            </div>
          </div>
          <div class="rg-figures-grid" aria-label="Figures and tables extracted from Human-GenAI cMOOC PDF">
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig1-workflow.jpg" data-zoom-caption="arXiv (2026) · Figure 1 — Workflow structure for PCA target selection, multi-role response generation, and human review in FaciHub">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig1-workflow.jpg" loading="lazy" decoding="async" alt="Figure 1 FaciHub workflow architecture">
              </span>
              <span class="rg-figure-tile__cap">Fig. 1 &middot; FaciHub Flow</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig2-interface.jpg" data-zoom-caption="arXiv (2026) · Figure 2 — FaciHub interface for contextual inspection and human approval of PCA-generated replies">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig2-interface.jpg" loading="lazy" decoding="async" alt="Figure 2 FaciHub human review interface">
              </span>
              <span class="rg-figure-tile__cap">Fig. 2 &middot; FaciHub UI</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig3-hypergraph.jpg" data-zoom-caption="arXiv (2026) · Figure 3 — Example of hypergraph-based target selection for PCA discussion participation">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig3-hypergraph.jpg" loading="lazy" decoding="async" alt="Figure 3 Hypergraph target selection diagram">
              </span>
              <span class="rg-figure-tile__cap">Fig. 3 &middot; Hypergraph</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig4-dbr.jpg" data-zoom-caption="arXiv (2026) · Figure 4 — Overview of the two-iteration Design-Based Research procedure aligned with Reeves' (2006) four-phase model">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig4-dbr.jpg" loading="lazy" decoding="async" alt="Figure 4 DBR four-phase procedure">
              </span>
              <span class="rg-figure-tile__cap">Fig. 4 &middot; DBR Procedure</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig6-daily.jpg" data-zoom-caption="arXiv (2026) · Figure 6 — Daily distribution of PCA-generated responses, facilitator review outcomes, and role composition">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">FIG</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig6-daily.jpg" loading="lazy" decoding="async" alt="Figure 6 Daily PCA outcomes and role composition">
              </span>
              <span class="rg-figure-tile__cap">Fig. 6 &middot; Daily Outcomes</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-tables56-results.jpg" data-zoom-caption="arXiv (2026) · Tables 5 & 6 — Goal 1 (With-PCA vs. Without-PCA) and Goal 2 (Direct vs. Co-Presence) social & cognitive presence results">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">TABLE</span>
                <img src="/assets/img/photos/2026/figures/pca26-tables56-results.jpg" loading="lazy" decoding="async" alt="Tables 5 and 6 Social and cognitive presence results">
              </span>
              <span class="rg-figure-tile__cap">Tables 5–6 &middot; Presence</span>
            </button>
          </div>
        </div>
      </article>
    </div>

    {% include publications-drawer.html language=page.language %}
  </section>

  <section class="homepage-section" id="projects">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">04 / Built Systems &amp; Tools</p>
        <h2>Featured Projects</h2>
      </div>
      <a class="homepage-section__link" href="/projects/">View all &rarr;</a>
    </div>

    <div class="project-grid">
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/cmooc_platform.jpg" loading="lazy" decoding="async" alt="cMOOC platform homepage">
        <div class="project-card__body">
          <div class="project-card__meta">01 &middot; WordPress &middot; 16,712+ users &middot; since 2019</div>
          <h3>cMOOC Platform</h3>
          <p>Connectivist MOOC platform architecture and iteration supporting collaborative learning communities at BNU.</p>
          <div class="project-card__links">
            <a href="https://cmooc.bnu.edu.cn" target="_blank" rel="noopener">Visit platform &#8599;</a>
          </div>
        </div>
      </article>

      <article class="project-card">
        <img class="project-card__media" src="/assets/img/screenshot_2.jpg" loading="lazy" decoding="async" alt="AICodingOfficer desktop screenshot">
        <div class="project-card__body">
          <div class="project-card__meta">02 &middot; PyQt6 &middot; Open Source &middot; Win / macOS / Linux</div>
          <h3>AICodingOfficer (AICO)</h3>
          <p>Cross-platform AI text-coding assistant with integrated classifiers for qualitative discourse analysis.</p>
          <div class="project-card__links">
            <a href="/aicodingofficer/">Overview &rarr;</a>
            <a href="https://github.com/etShaw-zh/AICodingAssistant-Pro/releases" target="_blank" rel="noopener">Releases &#8599;</a>
          </div>
        </div>
      </article>

      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/2024/08/sparkshopping-cover.jpg" loading="lazy" decoding="async" alt="Spark Shopping project cover">
        <div class="project-card__body">
          <div class="project-card__meta">03 &middot; LLM Agent &middot; Bronze Award &middot; 2023</div>
          <h3>Spark Shopping</h3>
          <p>LLM shopping assistant developed in the iFLYTEK Spark Training Camp and awarded in the General AI Innovation Competition.</p>
          <div class="project-card__links">
            <a href="https://mp.weixin.qq.com/s/IGBmPkI9BBRgLGWiW0jFCQ" target="_blank" rel="noopener">Award report &#8599;</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="homepage-section homepage-contact" id="contact">
    <div class="contact-grid">
      <div class="contact-intro">
        <p class="homepage-eyebrow">05 / Connect</p>
        <h2>Get in Touch</h2>
        <p class="contact-intro__desc">Open to research collaborations, invited talks, and peer review inquiries &middot; RCDE, Beijing Normal University.</p>

        <div class="contact-links">
          <a class="contact-chip" href="mailto:et_shaw@126.com"><span class="contact-chip__k">Email</span><span class="contact-chip__v">et_shaw@126.com</span></a>
          <a class="contact-chip" href="https://scholar.google.com/citations?hl=zh-CN&user=FaqCcFoAAAAJ" target="_blank" rel="noopener"><span class="contact-chip__k">Scholar</span><span class="contact-chip__v">{{ total_citations }} cites</span></a>
          <a class="contact-chip" href="https://orcid.org/0000-0003-0000-9630" target="_blank" rel="noopener"><span class="contact-chip__k">ORCID</span><span class="contact-chip__v">0000-0003-0000-9630</span></a>
          <a class="contact-chip" href="https://github.com/etShaw-zh" target="_blank" rel="noopener"><span class="contact-chip__k">GitHub</span><span class="contact-chip__v">@etShaw-zh</span></a>
          <a class="contact-chip" href="https://linkedin.com/in/建军-肖-2947a6380" target="_blank" rel="noopener"><span class="contact-chip__k">LinkedIn</span><span class="contact-chip__v">Profile &#8599;</span></a>
          <a class="contact-chip" href="https://rcde.bnu.edu.cn/" target="_blank" rel="noopener"><span class="contact-chip__k">Lab</span><span class="contact-chip__v">RCDE &middot; BNU &#8599;</span></a>
        </div>

        <div class="contact-cv-links">
          <a class="homepage-button" href="/assets/pdf/Xiao_Jianjun_Resume_EN.pdf">CV (English)</a>
          <a class="homepage-button homepage-button--secondary" href="/assets/pdf/Xiao_Jianjun_Resume_CN.pdf">CV (中文)</a>
        </div>
      </div>

      <div class="visitor-map-card" id="visitors">
        <div class="visitor-map-card__head">
          <span class="visitor-map-card__label">Visitors &middot; Flag Map</span>
          <a class="visitor-map-card__link" href="https://info.flagcounter.com/hnzv" target="_blank" rel="noopener">Stats &#8599;</a>
        </div>
        <a class="visitor-map-card__frame" href="https://info.flagcounter.com/hnzv" target="_blank" rel="noopener">
          <img src="https://s01.flagcounter.com/map/hnzv/size_l/txt_000000/border_CCCCCC/pageviews_1/viewers_3/flags_3/" loading="lazy" decoding="async" alt="Flag Counter visitor map">
        </a>
      </div>
    </div>
  </section>
</div>
