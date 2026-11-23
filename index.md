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
{% assign review_total = orcid_peer_reviews.review_count | default: 32 %}
{% assign journal_total = orcid_peer_reviews.journal_count | default: 14 %}
{% assign paper_citations = site.data.paper_citations %}
{% assign total_citations = paper_citations.total_citations | default: 171 %}
{% assign paper_count = paper_citations.paper_count | default: 19 %}

<div class="homepage-shell">
  <section class="homepage-hero homepage-hero--map" id="map">
    <div class="homepage-hero__copy">
      <p class="homepage-eyebrow">PhD Candidate &middot; Faculty of Education, BNU</p>
      <h1>Jianjun Xiao<span>肖建军</span></h1>
      <p class="homepage-hero__question">How does online discussion become collaborative knowledge?</p>
      <p class="homepage-hero__lead">Combining <strong>learning analytics</strong> and <strong>complex networks</strong> to model how groups build knowledge together, and designing <strong>human–AI collaborative systems</strong> that support online collaborative learning.</p>

      <div class="homepage-social-bar" aria-label="Academic profiles and contact">
        <a class="homepage-icon-btn" href="https://scholar.google.com/citations?hl=en&user=FaqCcFoAAAAJ" target="_blank" rel="noopener" title="Google Scholar" aria-label="Google Scholar">
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
        <a class="homepage-icon-btn" href="mailto:jianjun.xiao@mail.bnu.edu.cn" title="Email" aria-label="Email">
          <i class="fas fa-envelope" aria-hidden="true"></i>
        </a>
        <a class="homepage-button" href="/assets/pdf/Xiao_Jianjun_Resume_EN.pdf">Download CV</a>
      </div>

      <div class="homepage-metrics">
        <div class="homepage-metrics__primary">
          <p class="homepage-metrics__label">Total Citations &middot; Google Scholar</p> <p class="homepage-metrics__value">{{ total_citations }}</p>
          <p class="homepage-metrics__breakdown">{{ paper_count }} papers mapped</p>
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
          <a href="#publications">Explore selected research &darr;</a>
        </div>
      </div>
    </div>

    <div class="homepage-hero__map">
      {% include research-map.html language=page.language %}
    </div>
  </section>

  <section class="homepage-section" id="publications">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">02 / Publications</p>
        <h2>Selected Publications</h2>
      </div>
      <div class="homepage-section__actions">
        <a class="homepage-section__link" href="https://orcid.org/0000-0003-0000-9630#cy-works" target="_blank" rel="noopener">ORCID &#8599;</a>
        <a class="homepage-section__link" href="https://scholar.google.com/citations?hl=en&user=FaqCcFoAAAAJ" target="_blank" rel="noopener">Google Scholar &#8599;</a>
      </div>
    </div>

    {% include selected-publications.html language=page.language %}

    {% include publications-drawer.html language=page.language %}
  </section>

  {% if orcid_peer_reviews and orcid_peer_reviews.journals and orcid_peer_reviews.journals.size > 0 %}
    <aside class="service-ribbon" id="service" aria-label="Journal peer reviewer list">
      <div class="service-ribbon__label">
        <span class="service-ribbon__title">Peer Reviewer</span>
        <span class="service-ribbon__count">{{ orcid_peer_reviews.review_count }} reviews &middot; {{ orcid_peer_reviews.journal_count | default: orcid_peer_reviews.journals.size }} journals</span>
      </div>
      <ul class="service-ribbon__list">
        {% for journal in orcid_peer_reviews.journals %}
          <li{% if forloop.index > 5 %} class="service-pill--extra"{% endif %}><a class="service-pill" href="{{ journal.url }}" target="_blank" rel="noopener"><span class="service-pill__label">{{ journal.title }}</span><span class="service-pill__count">{{ journal.review_count }}</span></a></li>
        {% endfor %}
          {% if orcid_peer_reviews.journals.size > 5 %}
            <li class="service-more"><button type="button" class="service-more__btn" data-service-more aria-expanded="false">+{{ orcid_peer_reviews.journals.size | minus: 5 }} more</button></li>
          {% endif %}
      </ul>
    </aside>
    <script>
      (function () {
        var ribbon = document.getElementById('service');
        var btn = ribbon && ribbon.querySelector('[data-service-more]');
        if (!btn) return;
        btn.addEventListener('click', function () {
          var open = ribbon.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          btn.textContent = open ? 'Show less' : '+' + (document.querySelectorAll('.service-pill--extra').length) + ' more';
        });
      })();
    </script>
  {% endif %}

  <section class="homepage-section" id="news">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">03 / Updates</p>
        <h2>Latest News</h2>
      </div>
      <a class="homepage-section__link" href="/life/">View all &rarr;</a>
    </div>
    <ul class="news-list">
      {% include news-feed.html language=page.language limit=3 %}
    </ul>
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
        <img class="project-card__media" src="/assets/img/photos/2026/figures/pca26-fig2-interface.jpg" loading="lazy" decoding="async" alt="FaciHub interface screenshot">
        <div class="project-card__body">
          <div class="project-card__meta">03 &middot; Human&ndash;AI Workflow &middot; DBR &middot; 2026</div>
          <h3>FaciHub</h3>
          <p>AI-in-the-loop discussion facilitation workflow for cMOOCs: AI drafts replies, humans review them; tested with 178 participants across two design iterations.</p>
          <div class="project-card__links">
            <a href="https://arxiv.org/abs/2603.29285v2" target="_blank" rel="noopener">Paper (arXiv) &#8599;</a>
            <a href="https://arxiv.org/pdf/2603.29285v2.pdf" target="_blank" rel="noopener">PDF &#8599;</a>
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
          <a class="contact-chip" href="mailto:jianjun.xiao@mail.bnu.edu.cn"><span class="contact-chip__k">Email</span><span class="contact-chip__v">jianjun.xiao@mail.bnu.edu.cn</span></a>
          <a class="contact-chip" href="https://scholar.google.com/citations?hl=en&user=FaqCcFoAAAAJ" target="_blank" rel="noopener"><span class="contact-chip__k">Scholar</span><span class="contact-chip__v">Profile &#8599;</span></a>
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
