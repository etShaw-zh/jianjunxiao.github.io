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
      <p class="homepage-eyebrow">博士研究生 &middot; 北京师范大学教育学部</p>
      <h1>肖建军<span>Jianjun Xiao</span></h1>
      <p class="homepage-hero__lead">关注数字化学习环境中的学习、协作与知识创造，致力于将<strong>学习分析</strong>、<strong>复杂网络建模</strong>与<strong>人机协作人工智能</strong>融入教育实践。</p>

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
        <a class="homepage-icon-btn" href="mailto:et_shaw@126.com" title="电子邮箱" aria-label="电子邮箱">
          <i class="fas fa-envelope" aria-hidden="true"></i>
        </a>
        <a class="homepage-button" href="/assets/pdf/Xiao_Jianjun_Resume_CN.pdf">下载简历</a>
      </div>

      <div class="homepage-metrics">
        <div class="homepage-metrics__primary">
          <p class="homepage-metrics__label">论文总引用 &middot; Google Scholar</p>
          <p class="homepage-metrics__value">{{ total_citations }}</p>
          <p class="homepage-metrics__breakdown">h-index {{ h_index }} &middot; i10-index {{ i10_index }} &middot; 星图收录 {{ paper_count }} 篇论文</p>
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
          <a href="#news">查看最新动态 &darr;</a>
        </div>
      </div>
    </div>

    <div class="homepage-hero__map">
      {% include research-map.html language=page.language %}
    </div>
  </section>

  {% if orcid_peer_reviews and orcid_peer_reviews.journals and orcid_peer_reviews.journals.size > 0 %}
    <aside class="service-ribbon" id="service" aria-label="期刊审稿列表">
      <div class="service-ribbon__label">
        <span class="service-ribbon__title">期刊审稿</span>
        <span class="service-ribbon__count">{{ orcid_peer_reviews.review_count }} 次 &middot; {{ orcid_peer_reviews.journal_count | default: orcid_peer_reviews.journals.size }} 刊</span>
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
        <p class="homepage-eyebrow">02 / 学术动态</p>
        <h2>最新动态</h2>
      </div>
      <a class="homepage-section__link" href="/zh/life/">查看全部 &rarr;</a>
    </div>
    <ul class="news-list">
      {% include news-feed.html language=page.language limit=4 %}
    </ul>
  </section>

  <section class="homepage-section" id="publications">
    <div class="homepage-section__header">
      <div>
        <p class="homepage-eyebrow">03 / 学术论文</p>
        <h2>精选论文</h2>
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
            <span>LAK26 &middot; 挪威卑尔根 &middot; 2026</span>
            <span class="pill-tag">Full Research Paper</span>
            {% if c_lak > 0 %}<span class="pill-tag pill-tag--cite">被引 {{ c_lak }}</span>{% endif %}
          </div>
          <div class="rg-pub-entry__links">
            <a class="rg-pub-entry__link rg-pub-entry__link--muted" href="https://arxiv.org/pdf/2512.13061.pdf" target="_blank" rel="noopener">PDF &#8599;</a>
            <a class="rg-pub-entry__link" href="https://doi.org/10.1145/3785022.3785049" target="_blank" rel="noopener">DOI &#8599;</a>
          </div>
        </div>
        <h3 class="rg-pub-entry__title">基于群体话语的协作问题解决动态过程建模：一种融合协同度模型的文本挖掘方法</h3>
        <p class="rg-pub-entry__authors"><strong>Xiao, J.</strong>, Wang, C., &amp; Zhang, W. &mdash; 融合自动话语编码与协同度建模（SDM），通过置换检验与方差分析验证协作质量差异（<em>p</em> = .023）。</p>

        <div class="rg-figures-wrap" data-rg-strip>
          <div class="rg-figures-bar">
            <span class="rg-figures-bar__label">论文 PDF 图表提取 &middot; 5</span>
            <div class="rg-figures-bar__controls">
              <button type="button" class="rg-figures-nav" data-rg-prev aria-label="向左滚动图表">&#8249;</button>
              <button type="button" class="rg-figures-nav" data-rg-next aria-label="向右滚动图表">&#8250;</button>
            </div>
          </div>
          <div class="rg-figures-grid" aria-label="LAK26 论文 PDF 图表">
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-fig1-pipeline.jpg" data-zoom-caption="LAK26 · Figure 1 — 研究设计与建模流程：数据采集、CPS 行为自动分类、协同度建模与比较分析">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/lak26-fig1-pipeline.jpg" loading="lazy" decoding="async" alt="Figure 1 研究设计与流程">
              </span>
              <span class="rg-figure-tile__cap">Fig. 1 &middot; 研究流程</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-table3-models.jpg" data-zoom-caption="LAK26 · Table 3 — 大模型、神经网络与传统机器学习在 CPS 行为分类任务上的性能对比">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">表</span>
                <img src="/assets/img/photos/2026/figures/lak26-table3-models.jpg" loading="lazy" decoding="async" alt="Table 3 模型分类性能对比">
              </span>
              <span class="rg-figure-tile__cap">Table 3 &middot; 模型对比</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-fig2-permutation.jpg" data-zoom-caption="LAK26 · Figure 2 — 模型编码与人工编码在各子系统序参量及整体协同度上的置换检验分布">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/lak26-fig2-permutation.jpg" loading="lazy" decoding="async" alt="Figure 2 置换检验分布图">
              </span>
              <span class="rg-figure-tile__cap">Fig. 2 &middot; 置换检验</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-table5-synergy.jpg" data-zoom-caption="LAK26 · Table 5 — 不同问题类型（PT）与协作质量等级（CQ）下的序参量与协同度描述统计">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">表</span>
                <img src="/assets/img/photos/2026/figures/lak26-table5-synergy.jpg" loading="lazy" decoding="async" alt="Table 5 序参量与协同度描述统计">
              </span>
              <span class="rg-figure-tile__cap">Table 5 &middot; 协同度统计</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="lak26" data-zoom-img="/assets/img/photos/2026/figures/lak26-table6-anova.jpg" data-zoom-caption="LAK26 · Table 6 — 问题类型与协作质量组间显著差异检验（Kruskal-Wallis 与 Fisher ANOVA）">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">表</span>
                <img src="/assets/img/photos/2026/figures/lak26-table6-anova.jpg" loading="lazy" decoding="async" alt="Table 6 组间显著差异检验">
              </span>
              <span class="rg-figure-tile__cap">Table 6 &middot; 方差分析</span>
            </button>
          </div>
        </div>
      </article>

      <article class="rg-pub-entry">
        <div class="rg-pub-entry__top">
          <div class="rg-pub-entry__meta">
            <span class="rg-pub-entry__num">02</span>
            <span>Interactive Learning Environments &middot; 2026</span>
            <span class="pill-tag">SSCI Q1 &middot; 独立作者</span>
            {% if c_ile26 > 0 %}<span class="pill-tag pill-tag--cite">被引 {{ c_ile26 }}</span>{% endif %}
          </div>
          <div class="rg-pub-entry__links">
            <a class="rg-pub-entry__link" href="https://doi.org/10.1080/10494820.2026.2632766" target="_blank" rel="noopener">DOI &#8599;</a>
          </div>
        </div>
        <h3 class="rg-pub-entry__title">开放学习环境中的交互模式探索：融合网络动态与认知投入</h3>
        <p class="rg-pub-entry__authors"><strong>Xiao, J.<sup>&dagger;</sup></strong> &mdash; 基于 8 轮 cMOOC（1,939 名学习者、39,000+ 条交互事件）的关系事件建模，揭示互惠机制与认知投入的交互效应。</p>

        <div class="rg-figures-wrap" data-rg-strip>
          <div class="rg-figures-bar">
            <span class="rg-figures-bar__label">论文 PDF 图表提取 &middot; 6</span>
            <div class="rg-figures-bar__controls">
              <button type="button" class="rg-figures-nav" data-rg-prev aria-label="向左滚动图表">&#8249;</button>
              <button type="button" class="rg-figures-nav" data-rg-next aria-label="向右滚动图表">&#8250;</button>
            </div>
          </div>
          <div class="rg-figures-grid" aria-label="ILE 2026 论文 PDF 图表">
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig1-framework.jpg" data-zoom-caption="ILE (2026) · Figure 1 — 理论分析框架：融合网络动态（互惠性）与 CIE 联通主义认知投入的关系事件建模">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig1-framework.jpg" loading="lazy" decoding="async" alt="Figure 1 理论分析框架图">
              </span>
              <span class="rg-figure-tile__cap">Fig. 1 &middot; 理论框架</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig2-design.jpg" data-zoom-caption="ILE (2026) · Figure 2 — 研究设计图：NLP 自动 CIE 编码、关系事件建模（REM）与多元元分析">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig2-design.jpg" loading="lazy" decoding="async" alt="Figure 2 研究设计流程图">
              </span>
              <span class="rg-figure-tile__cap">Fig. 2 &middot; 研究设计</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig4-cie.jpg" data-zoom-caption="ILE (2026) · Figure 4 — 8 轮 cMOOC 课程中不同认知投入层级（CIE）发帖占比分布">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig4-cie.jpg" loading="lazy" decoding="async" alt="Figure 4 CIE 认知投入占比分布">
              </span>
              <span class="rg-figure-tile__cap">Fig. 4 &middot; CIE 分布</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-fig5-marginal.jpg" data-zoom-caption="ILE (2026) · Figure 5 — 认知投入层级（CIE）与互惠性对后续交互影响的边际效应图（含局部放大）">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/ile26-fig5-marginal.jpg" loading="lazy" decoding="async" alt="Figure 5 边际效应图">
              </span>
              <span class="rg-figure-tile__cap">Fig. 5 &middot; 边际效应</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-table2-rem.jpg" data-zoom-caption="ILE (2026) · Table 2 — 跨 8 轮课程的 REM 互惠性与 CIE 层级参数估计元分析结果">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">表</span>
                <img src="/assets/img/photos/2026/figures/ile26-table2-rem.jpg" loading="lazy" decoding="async" alt="Table 2 REM 参数估计元分析">
              </span>
              <span class="rg-figure-tile__cap">Table 2 &middot; REM 元分析</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="ile26" data-zoom-img="/assets/img/photos/2026/figures/ile26-table3-interaction.jpg" data-zoom-caption="ILE (2026) · Table 3 — REM 互惠性与认知投入交互效应的跨轮次元分析参数估计">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">表</span>
                <img src="/assets/img/photos/2026/figures/ile26-table3-interaction.jpg" loading="lazy" decoding="async" alt="Table 3 交互效应元分析表">
              </span>
              <span class="rg-figure-tile__cap">Table 3 &middot; 交互元分析</span>
            </button>
          </div>
        </div>
      </article>

      <article class="rg-pub-entry">
        <div class="rg-pub-entry__top">
          <div class="rg-pub-entry__meta">
            <span class="rg-pub-entry__num">03</span>
            <span>arXiv 预印本 &middot; 2026</span>
            <span class="pill-tag">人机协同 &middot; DBR</span>
            {% if c_pca > 0 %}<span class="pill-tag pill-tag--cite">被引 {{ c_pca }}</span>{% endif %}
          </div>
          <div class="rg-pub-entry__links">
            <a class="rg-pub-entry__link rg-pub-entry__link--muted" href="https://arxiv.org/pdf/2603.29285v2.pdf" target="_blank" rel="noopener">PDF &#8599;</a>
            <a class="rg-pub-entry__link" href="https://arxiv.org/abs/2603.29285v2" target="_blank" rel="noopener">arXiv &#8599;</a>
          </div>
        </div>
        <h3 class="rg-pub-entry__title">面向 cMOOC 讨论促进的人机交互设计：协同 AI-in-the-loop 工作流对社会与认知临场感的影响</h3>
        <p class="rg-pub-entry__authors"><strong>Xiao, J.</strong>, &amp; Wang, C. &mdash; 两轮 DBR 构建人机协同促学系统 <em>FaciHub</em>，显著提升真实课程讨论中的社会临场感（<em>n</em> = 178）。</p>

        <div class="rg-figures-wrap" data-rg-strip>
          <div class="rg-figures-bar">
            <span class="rg-figures-bar__label">论文 PDF 图表提取 &middot; 6</span>
            <div class="rg-figures-bar__controls">
              <button type="button" class="rg-figures-nav" data-rg-prev aria-label="向左滚动图表">&#8249;</button>
              <button type="button" class="rg-figures-nav" data-rg-next aria-label="向右滚动图表">&#8250;</button>
            </div>
          </div>
          <div class="rg-figures-grid" aria-label="人机协同 cMOOC 论文 PDF 图表">
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig1-workflow.jpg" data-zoom-caption="arXiv (2026) · Figure 1 — FaciHub 超图选帖、多角色大模型生成与教师审核工作流架构">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig1-workflow.jpg" loading="lazy" decoding="async" alt="Figure 1 FaciHub 工作流架构">
              </span>
              <span class="rg-figure-tile__cap">Fig. 1 &middot; FaciHub 流程</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig2-interface.jpg" data-zoom-caption="arXiv (2026) · Figure 2 — FaciHub 语境检视与教师人工审核智能体回复的系统界面">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig2-interface.jpg" loading="lazy" decoding="async" alt="Figure 2 FaciHub 人工审核界面">
              </span>
              <span class="rg-figure-tile__cap">Fig. 2 &middot; FaciHub 界面</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig3-hypergraph.jpg" data-zoom-caption="arXiv (2026) · Figure 3 — 基于超图结构识别智能体介入焦点帖子的选帖示例">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig3-hypergraph.jpg" loading="lazy" decoding="async" alt="Figure 3 超图目标选帖示例">
              </span>
              <span class="rg-figure-tile__cap">Fig. 3 &middot; 超图选帖</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig4-dbr.jpg" data-zoom-caption="arXiv (2026) · Figure 4 — 遵循 Reeves (2006) 四阶段模型的两轮基于设计的研究（DBR）过程">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig4-dbr.jpg" loading="lazy" decoding="async" alt="Figure 4 DBR 四阶段研究过程">
              </span>
              <span class="rg-figure-tile__cap">Fig. 4 &middot; DBR 迭代</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-fig6-daily.jpg" data-zoom-caption="arXiv (2026) · Figure 6 — 智能体每日生成回复量、教师审核采纳率及教学角色分布变化">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind">图</span>
                <img src="/assets/img/photos/2026/figures/pca26-fig6-daily.jpg" loading="lazy" decoding="async" alt="Figure 6 每日审核结果与角色分布">
              </span>
              <span class="rg-figure-tile__cap">Fig. 6 &middot; 每日结果</span>
            </button>
            <button type="button" class="rg-figure-tile" data-zoom-group="pca26" data-zoom-img="/assets/img/photos/2026/figures/pca26-tables56-results.jpg" data-zoom-caption="arXiv (2026) · Tables 5 & 6 — 有无智能体及直接互动组在社会/认知临场感上的统计检验结果">
              <span class="rg-figure-tile__thumb">
                <span class="rg-figure-tile__kind rg-figure-tile__kind--table">表</span>
                <img src="/assets/img/photos/2026/figures/pca26-tables56-results.jpg" loading="lazy" decoding="async" alt="Tables 5-6 临场感统计结果">
              </span>
              <span class="rg-figure-tile__cap">Tables 5–6 &middot; 临场感检验</span>
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
        <img class="project-card__media" src="/assets/img/photos/2024/08/sparkshopping-cover.jpg" loading="lazy" decoding="async" alt="Spark Shopping 项目封面">
        <div class="project-card__body">
          <div class="project-card__meta">03 &middot; 大模型助手 &middot; 铜奖 &middot; 2023</div>
          <h3>Spark Shopping</h3>
          <p>在讯飞星火训练营完成的大模型购物助手项目，并在通用人工智能创新与应用竞赛获奖。</p>
          <div class="project-card__links">
            <a href="https://mp.weixin.qq.com/s/IGBmPkI9BBRgLGWiW0jFCQ" target="_blank" rel="noopener">获奖报道 &#8599;</a>
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
          <a class="contact-chip" href="mailto:et_shaw@126.com"><span class="contact-chip__k">邮箱</span><span class="contact-chip__v">et_shaw@126.com</span></a>
          <a class="contact-chip" href="https://scholar.google.com/citations?hl=zh-CN&user=FaqCcFoAAAAJ" target="_blank" rel="noopener"><span class="contact-chip__k">Scholar</span><span class="contact-chip__v">被引 {{ total_citations }}</span></a>
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
