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
---

<div class="homepage-shell">
  <div class="homepage-hero">
    <div class="homepage-hero__copy">
      <p class="homepage-hero__role">PhD Candidate @ Faculty of Education, Beijing Normal University</p>
      <h1>Jianjun Xiao<br><span>肖建军</span></h1>
      <p>Researching how people learn, collaborate, and create knowledge in digitally mediated environments.</p>
      <div class="homepage-actions">
        <a class="homepage-button" href="#publications">Selected Publications</a>
        <a class="homepage-button homepage-button--secondary" href="/assets/pdf/jianjun-xiao.pdf">Download CV</a>
        <a class="homepage-button homepage-button--secondary" href="mailto:et_shaw@126.com">Contact</a>
      </div>
    </div>
    <img class="homepage-hero__portrait" src="/assets/img/jianjunxiao-hero.jpg" alt="Portrait of Jianjun Xiao">
  </div>

  <section class="homepage-section" id="research">
    <div class="homepage-section__header">
      <h2>Research Focus</h2>
      <a class="homepage-section__link" href="#publications">See publications</a>
    </div>
    {% assign orcid_work_stats = site.data.orcid_work_stats %}
    {% assign work_total = orcid_work_stats.total | default: 20 %}
    {% assign journal_articles = orcid_work_stats.journal_articles | default: 14 %}
    {% assign conference_outputs = orcid_work_stats.conference_outputs | default: 2 %}
    {% assign software_count = orcid_work_stats.software | default: 2 %}
    {% assign patent_count = orcid_work_stats.patents | default: 2 %}
    <p class="selected-publications__stats"><strong>{{ work_total }} works</strong> · {{ journal_articles }} journal articles · {{ conference_outputs }} conference papers/posters · {{ software_count }} software · {{ patent_count }} patents</p>
    {% if orcid_work_stats and orcid_work_stats.last_synced_at %}
      <p class="selected-publications__updated">Updated {{ orcid_work_stats.last_synced_at | date: "%Y-%m-%d %H:%M UTC" }} from ORCID</p>
    {% endif %}
    <div class="focus-grid">
      <article class="focus-item">
        <h3>Learning Analytics</h3>
        <p>Studying interaction patterns, learner roles, and evidence-driven feedback in digital learning environments.</p>
      </article>
      <article class="focus-item">
        <h3>AI in Education</h3>
        <p>Designing human-AI collaboration workflows that support reflection, facilitation, and educational decision-making.</p>
      </article>
      <article class="focus-item">
        <h3>Connectivist MOOCs</h3>
        <p>Exploring how cMOOCs and online learning communities shape participation, knowledge creation, and collaboration.</p>
      </article>
    </div>
    {% assign orcid_peer_reviews = site.data.orcid_peer_reviews %}
    {% if orcid_peer_reviews and orcid_peer_reviews.journals and orcid_peer_reviews.journals.size > 0 %}
      <div class="research-focus-service">
        <p class="service-intro"><strong>Academic Service.</strong> {{ orcid_peer_reviews.review_count }} reviews across {{ orcid_peer_reviews.journal_count | default: orcid_peer_reviews.journals.size }} journals.</p>
        {% if orcid_peer_reviews and orcid_peer_reviews.last_synced_at %}
          <p class="selected-publications__updated">Updated {{ orcid_peer_reviews.last_synced_at | date: "%Y-%m-%d %H:%M UTC" }} from ORCID</p>
        {% endif %}
        <ul class="service-tags" aria-label="Journal reviewer list">
          {% for journal in orcid_peer_reviews.journals %}
            <li><a href="{{ journal.url }}" target="_blank" rel="noopener"><span class="service-tags__label">{{ journal.title }}</span><span class="service-tags__count">{{ journal.review_count }}</span></a></li>
          {% endfor %}
        </ul>
      </div>
    {% else %}
    <div class="research-focus-service">
      <p class="service-intro"><strong>Academic Service.</strong> Reviewer for 9 journals.</p>
      <ul class="service-tags" aria-label="Journal reviewer list">
        <li><a href="https://www.tandfonline.com/journals/nile20/about-this-journal#aims-and-scope" target="_blank" rel="noopener"><span class="service-tags__label">Interactive Learning Environments</span><span class="service-tags__count">2</span></a></li>
        <li><a href="https://www.tandfonline.com/journals/rics20/about-this-journal#aims-and-scope" target="_blank" rel="noopener"><span class="service-tags__label">Information, Communication &amp; Society</span><span class="service-tags__count">1</span></a></li>
        <li><a href="https://joss.theoj.org/about" target="_blank" rel="noopener"><span class="service-tags__label">the journal of Open Source Software</span><span class="service-tags__count">1</span></a></li>
        <li><a href="https://www.sciencedirect.com/journal/computers-and-education/about/insights" target="_blank" rel="noopener"><span class="service-tags__label">Computers &amp; Education</span><span class="service-tags__count">1</span></a></li>
        <li><a href="https://www.nature.com/srep/about" target="_blank" rel="noopener"><span class="service-tags__label">Scientific Reports</span><span class="service-tags__count">1</span></a></li>
        <li><a href="https://link.springer.com/journal/12909/aims-and-scope" target="_blank" rel="noopener"><span class="service-tags__label">BMC Medical Education</span><span class="service-tags__count">1</span></a></li>
        <li><a href="https://link.springer.com/journal/44217/aims-and-scope" target="_blank" rel="noopener"><span class="service-tags__label">Discover Education</span><span class="service-tags__count">1</span></a></li>
        <li><a href="https://link.springer.com/journal/40359/aims-and-scope?utm_medium=affiliate&utm_source=baidu&utm_content=banner&utm_term=null&utm_campaign=MLSR_40359_AWA1_CN_CNPL_HPAUT_OAX" target="_blank" rel="noopener"><span class="service-tags__label">BMC Psychology</span><span class="service-tags__count">4</span></a></li>
        <li><a href="https://www.nature.com/palcomms/journal-information" target="_blank" rel="noopener"><span class="service-tags__label">Humanities &amp; Social Sciences Communications</span><span class="service-tags__count">3</span></a></li>
      </ul>
    </div>
    {% endif %}
  </section>

  <section class="homepage-section" id="news">
    <div class="homepage-section__header">
      <h2>Latest News</h2>
      <a class="homepage-section__link" href="/life/">View all</a>
    </div>
    <ul class="news-list">
      {% include news-feed.html language=page.language limit=5 %}
    </ul>
  </section>

  <section class="homepage-section homepage-section--featured" id="publications">
    <div class="homepage-section__header">
      <h2>Selected Publications</h2>
      <a class="homepage-section__link" href="https://orcid.org/0000-0003-0000-9630#cy-works" target="_blank" rel="noopener">View all</a>
    </div>
    <div class="selected-paper-grid">
      <article class="selected-paper-card">
        <img class="selected-paper-card__media" src="/assets/img/photos/2026/LAK26.jpg" alt="LAK26 in Bergen">
        <div class="selected-paper-card__body">
          <h3 class="selected-paper-card__title">Modeling collaborative problem solving dynamics from group discourse: A text-mining approach with synergy degree model</h3>
          <p class="selected-paper-card__authors">Xiao, J., Wang, C., Zhang, W. (2026)</p>
          <ul class="selected-paper-card__meta">
            <li>Venue · LAK26 · Bergen, Norway · Full research paper</li>
          </ul>
          <div class="selected-paper-card__links">
            <a href="https://doi.org/10.1145/3785022.3785049" target="_blank" rel="noopener">DOI</a>
          </div>
        </div>
      </article>

      <article class="selected-paper-card">
        <img class="selected-paper-card__media" src="/assets/img/photos/2026/REM_recip_CIE.compressed.jpg" alt="Interaction patterns visualization">
        <div class="selected-paper-card__body">
          <h3 class="selected-paper-card__title">Exploring interaction patterns in open learning environments: integrating network dynamics and cognitive engagement</h3>
          <p class="selected-paper-card__authors">Xiao, J. (2026)</p>
          <ul class="selected-paper-card__meta">
            <li>Journal · Interactive Learning Environments · SSCI Q1 · online first</li>
          </ul>
          <div class="selected-paper-card__links">
            <a href="https://doi.org/10.1080/10494820.2026.2632766" target="_blank" rel="noopener">DOI</a>
          </div>
        </div>
      </article>

      <article class="selected-paper-card">
        <img class="selected-paper-card__media" src="/assets/img/photos/2026/PCA.jpg" alt="Collaborative AI-in-the-loop workflow">
        <div class="selected-paper-card__body">
          <h3 class="selected-paper-card__title">Human-GenAI Interaction for cMOOC Discussion Facilitation</h3>
          <p class="selected-paper-card__authors">Xiao, J., &amp; Wang, C. (2026)</p>
          <ul class="selected-paper-card__meta">
            <li>Preprint · cMOOC discussion facilitation · arXiv</li>
          </ul>
          <div class="selected-paper-card__links">
            <a href="https://arxiv.org/abs/2603.29285v2" target="_blank" rel="noopener">arXiv</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="homepage-section" id="projects">
    <div class="homepage-section__header">
      <h2>Featured Projects</h2>
      <a class="homepage-section__link" href="/projects/">View all</a>
    </div>
    <div class="project-grid">
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/gca_results.jpg" alt="GCA Analyzer results dashboard">
        <div class="project-card__body">
          <h3>GCA Analyzer</h3>
          <div class="project-card__meta">Python package · PyPI · 2024</div>
          <p>Python package for group conversation analysis with NLP-based metrics and interaction diagnostics.</p>
          <div class="project-card__links">
            <a href="https://gca-analyzer.readthedocs.io" target="_blank" rel="noopener">Docs</a>
          </div>
        </div>
      </article>
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/cmooc_platform.jpg" alt="cMOOC platform homepage">
        <div class="project-card__body">
          <h3>cMOOC Platform</h3>
          <div class="project-card__meta">WordPress · 16,712 users · since 2019</div>
          <p>Connectivist MOOC platform design and iteration for collaborative learning communities.</p>
          <div class="project-card__links">
            <a href="https://cmooc.bnu.edu.cn" target="_blank" rel="noopener">Visit</a>
          </div>
        </div>
      </article>
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/2024/08/sparkshopping-cover.jpg" alt="Spark Shopping project cover">
        <div class="project-card__body">
          <h3>Spark Shopping</h3>
          <div class="project-card__meta">Spark Training Camp · Bronze · Hefei · 2023</div>
          <p>Large language model shopping assistant developed during the iFLYTEK Spark Training Camp and later recognized in the General Artificial Intelligence Innovation and Application Competition.</p>
          <div class="project-card__links">
            <a href="https://mp.weixin.qq.com/s/IGBmPkI9BBRgLGWiW0jFCQ" target="_blank" rel="noopener">Award report</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="homepage-section" id="visitors">
    <div class="homepage-section__header">
      <h2>Flag Map</h2>
    </div>
    <div style="text-align: center;">
      <a href="https://info.flagcounter.com/hnzv">
        <img style="width: 100%;" src="https://s01.flagcounter.com/map/hnzv/size_l/txt_000000/border_CCCCCC/pageviews_1/viewers_3/flags_3/" alt="Flag Counter" border="0">
      </a>
    </div>
  </section>
</div>
