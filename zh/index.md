---
layout: page
title: 肖建军
subtitle: 博士研究生 @ 北京师范大学
language: zh
alternate-url: /
alternate-label: EN
show-avatar: false
full-width: true
hide-page-heading: true
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
      <p class="homepage-eyebrow">博士研究生 &middot; 北京师范大学教育学部</p>
      <h1>肖建军<span>Jianjun Xiao</span></h1>
      <p class="homepage-hero__question">在线讨论如何转化为协作知识？</p>
      <p class="homepage-hero__lead">结合<strong>学习分析</strong>与<strong>复杂网络</strong>刻画群体如何共同建构知识，并设计<strong>人机协同工作流</strong>，支持在线学习中的协作。</p>

      <div class="homepage-social-bar" aria-label="学术主页与联系方式">
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
        <a class="homepage-icon-btn" href="mailto:jianjun.xiao@mail.bnu.edu.cn" title="电子邮箱" aria-label="电子邮箱">
          <i class="fas fa-envelope" aria-hidden="true"></i>
        </a>
        <a class="homepage-button" href="/assets/pdf/Xiao_Jianjun_Resume_CN.pdf">下载简历</a>
      </div>

      <div class="homepage-metrics">
        <div class="homepage-metrics__primary">
          <p class="homepage-metrics__label">论文总引用 &middot; Google Scholar</p> <p class="homepage-metrics__value">{{ total_citations }}</p>
          <p class="homepage-metrics__breakdown">星图收录 {{ paper_count }} 篇论文</p>
        </div>
        <dl class="homepage-metrics__secondary">
          <div>
            <dt>ORCID 成果</dt>
            <dd>{{ work_total }} <span>{{ journal_articles }} 期刊 &middot; {{ conference_outputs }} 会议</span></dd>
          </div>
          <div>
            <dt>国际期刊审稿</dt>
            <dd>{{ review_total }} <span>次 / {{ journal_total }} 刊</span></dd>
          </div>
        </dl>
        <div class="homepage-metrics__footer">
          <a href="#publications">查看代表研究 &darr;</a>
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
        <p class="homepage-eyebrow">02 / 学术论文</p>
        <h2>精选论文</h2>
      </div>
      <div class="homepage-section__actions">
        <a class="homepage-section__link" href="https://orcid.org/0000-0003-0000-9630#cy-works" target="_blank" rel="noopener">ORCID &#8599;</a>
        <a class="homepage-section__link" href="https://scholar.google.com/citations?hl=zh-CN&user=FaqCcFoAAAAJ" target="_blank" rel="noopener">Google Scholar &#8599;</a>
      </div>
    </div>

    {% include selected-publications.html language=page.language %}

    {% include publications-drawer.html language=page.language %}
  </section>

  {% if orcid_peer_reviews and orcid_peer_reviews.journals and orcid_peer_reviews.journals.size > 0 %}
    <aside class="service-ribbon" id="service" aria-label="期刊审稿列表">
      <div class="service-ribbon__label">
        <span class="service-ribbon__title">期刊审稿</span>
        <span class="service-ribbon__count">{{ orcid_peer_reviews.review_count }} 次 &middot; {{ orcid_peer_reviews.journal_count | default: orcid_peer_reviews.journals.size }} 刊</span>
      </div>
      <ul class="service-ribbon__list">
        {% for journal in orcid_peer_reviews.journals %}
          <li{% if forloop.index > 5 %} class="service-pill--extra"{% endif %}><a class="service-pill" href="{{ journal.url }}" target="_blank" rel="noopener"><span class="service-pill__label">{{ journal.title }}</span><span class="service-pill__count">{{ journal.review_count }}</span></a></li>
        {% endfor %}
          {% if orcid_peer_reviews.journals.size > 5 %}
            <li class="service-more"><button type="button" class="service-more__btn" data-service-more aria-expanded="false">另外 {{ orcid_peer_reviews.journals.size | minus: 5 }} 刊</button></li>
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
          btn.textContent = open ? '收起' : '另外 ' + (document.querySelectorAll('.service-pill--extra').length) + ' 刊';
        });
      })();
    </script>
  {% endif %}

  <section class="homepage-section" id="news">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">03 / 学术动态</p>
        <h2>最新动态</h2>
      </div>
      <a class="homepage-section__link" href="/zh/life/">查看全部 &rarr;</a>
    </div>
    <ul class="news-list">
      {% include news-feed.html language=page.language limit=3 %}
    </ul>
  </section>

  <section class="homepage-section" id="projects">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">04 / 系统与工具</p>
        <h2>代表项目</h2>
      </div>
      <a class="homepage-section__link" href="/zh/projects/">查看全部 &rarr;</a>
    </div>

    <div class="project-grid">
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/cmooc_platform.jpg" loading="lazy" decoding="async" alt="cMOOC 平台首页">
        <div class="project-card__body">
          <div class="project-card__meta">01 &middot; WordPress &middot; 16,712+ 用户 &middot; 自 2019</div>
          <h3>cMOOC 平台</h3>
          <p>面向联通主义在线课程的学习平台设计与迭代，支撑大规模协作学习社群实践。</p>
          <div class="project-card__links">
            <a href="https://cmooc.bnu.edu.cn" target="_blank" rel="noopener">在线访问 &#8599;</a>
          </div>
        </div>
      </article>

      <article class="project-card">
        <img class="project-card__media" src="/assets/img/screenshot_2.jpg" loading="lazy" decoding="async" alt="AICodingOfficer 桌面软件截图">
        <div class="project-card__body">
          <div class="project-card__meta">02 &middot; PyQt6 &middot; 开源工具 &middot; Win / macOS / Linux</div>
          <h3>AICodingOfficer (AICO)</h3>
          <p>集成多分类器的跨平台 AI 文本编码助手，提升教育研究内容分析效率。</p>
          <div class="project-card__links">
            <a href="/aicodingofficer/">项目主页 &rarr;</a>
            <a href="https://github.com/etShaw-zh/AICodingAssistant-Pro/releases" target="_blank" rel="noopener">下载版本 &#8599;</a>
          </div>
        </div>
      </article>

      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/2026/figures/pca26-fig2-interface.jpg" loading="lazy" decoding="async" alt="FaciHub 交互界面截图">
        <div class="project-card__body">
          <div class="project-card__meta">03 &middot; 人机协同工作流 &middot; 基于设计的研究 &middot; 2026</div>
          <h3>FaciHub</h3>
          <p>面向 cMOOC 的 AI-in-the-loop 讨论促进工作流：AI 生成回复、人工审核后发布，经两轮设计迭代，在 178 名参与者中验证。</p>
          <div class="project-card__links">
            <a href="https://arxiv.org/abs/2603.29285v2" target="_blank" rel="noopener">论文 (arXiv) &#8599;</a>
            <a href="https://arxiv.org/pdf/2603.29285v2.pdf" target="_blank" rel="noopener">PDF &#8599;</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="homepage-section homepage-contact" id="contact">
    <div class="contact-grid">
      <div class="contact-intro">
        <p class="homepage-eyebrow">05 / 联系</p>
        <h2>与我交流</h2>
        <p class="contact-intro__desc">欢迎就科研合作、学术报告与期刊审稿随时联系 &middot; 北京师范大学远程教育研究中心。</p>

        <div class="contact-links">
          <a class="contact-chip" href="mailto:jianjun.xiao@mail.bnu.edu.cn"><span class="contact-chip__k">邮箱</span><span class="contact-chip__v">jianjun.xiao@mail.bnu.edu.cn</span></a>
          <a class="contact-chip" href="https://scholar.google.com/citations?hl=zh-CN&user=FaqCcFoAAAAJ" target="_blank" rel="noopener"><span class="contact-chip__k">Scholar</span><span class="contact-chip__v">主页 &#8599;</span></a>
          <a class="contact-chip" href="https://orcid.org/0000-0003-0000-9630" target="_blank" rel="noopener"><span class="contact-chip__k">ORCID</span><span class="contact-chip__v">0000-0003-0000-9630</span></a>
          <a class="contact-chip" href="https://github.com/etShaw-zh" target="_blank" rel="noopener"><span class="contact-chip__k">GitHub</span><span class="contact-chip__v">@etShaw-zh</span></a>
          <a class="contact-chip" href="https://linkedin.com/in/建军-肖-2947a6380" target="_blank" rel="noopener"><span class="contact-chip__k">LinkedIn</span><span class="contact-chip__v">主页 &#8599;</span></a>
          <a class="contact-chip" href="https://rcde.bnu.edu.cn/" target="_blank" rel="noopener"><span class="contact-chip__k">机构</span><span class="contact-chip__v">北师大 RCDE &#8599;</span></a>
        </div>

        <div class="contact-cv-links">
          <a class="homepage-button" href="/assets/pdf/Xiao_Jianjun_Resume_CN.pdf">中文简历</a>
          <a class="homepage-button homepage-button--secondary" href="/assets/pdf/Xiao_Jianjun_Resume_EN.pdf">English CV</a>
        </div>
      </div>

      <div class="visitor-map-card" id="visitors">
        <div class="visitor-map-card__head">
          <span class="visitor-map-card__label">访客地图 &middot; Flag Map</span>
          <a class="visitor-map-card__link" href="https://info.flagcounter.com/hnzv" target="_blank" rel="noopener">详情 &#8599;</a>
        </div>
        <a class="visitor-map-card__frame" href="https://info.flagcounter.com/hnzv" target="_blank" rel="noopener">
          <img src="https://s01.flagcounter.com/map/hnzv/size_l/txt_000000/border_CCCCCC/pageviews_1/viewers_3/flags_3/" loading="lazy" decoding="async" alt="Flag Counter 访客地图">
        </a>
      </div>
    </div>
  </section>
</div>
