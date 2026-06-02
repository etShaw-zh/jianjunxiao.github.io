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
---

<div class="homepage-shell">
  <div class="homepage-hero">
    <div class="homepage-hero__copy">
      <p class="homepage-hero__role">博士研究生 @ 北京师范大学 · 教育学部</p>
      <h1>肖建军<br><span>Jianjun Xiao</span></h1>
      <p>关注数字化学习环境中的学习、协作与知识创造，研究如何通过数据与人工智能支持教育实践。</p>
      <div class="homepage-actions">
        <a class="homepage-button" href="#publications">精选论文</a>
        <a class="homepage-button homepage-button--secondary" href="/assets/pdf/jianjun-xiao-in-chinese.pdf">下载简历</a>
        <a class="homepage-button homepage-button--secondary" href="mailto:et_shaw@126.com">联系我</a>
      </div>
    </div>
    <img class="homepage-hero__portrait" src="/assets/img/jianjunxiao-hero.jpg" alt="肖建军头像">
  </div>

  <section class="homepage-section" id="research">
    <div class="homepage-section__header">
      <h2>研究方向</h2>
      <a class="homepage-section__link" href="#publications">查看论文</a>
    </div>
    {% assign orcid_work_stats = site.data.orcid_work_stats %}
    {% assign work_total = orcid_work_stats.total | default: 20 %}
    {% assign journal_articles = orcid_work_stats.journal_articles | default: 14 %}
    {% assign conference_outputs = orcid_work_stats.conference_outputs | default: 2 %}
    {% assign software_count = orcid_work_stats.software | default: 2 %}
    {% assign patent_count = orcid_work_stats.patents | default: 2 %}
    <p class="selected-publications__stats"><strong>共 {{ work_total }} 项成果</strong> · {{ journal_articles }} 篇期刊论文 · {{ conference_outputs }} 篇会议论文/海报 · {{ software_count }} 项软件 · {{ patent_count }} 项专利</p>
    {% if orcid_work_stats and orcid_work_stats.last_synced_at %}
      <p class="selected-publications__updated">更新时间 {{ orcid_work_stats.last_synced_at | date: "%Y-%m-%d %H:%M UTC" }}，数据来自 ORCID</p>
    {% endif %}
    <div class="focus-grid">
      <article class="focus-item">
        <h3>学习分析</h3>
        <p>研究数字学习环境中的交互模式、学习角色与数据驱动反馈机制。</p>
      </article>
      <article class="focus-item">
        <h3>人工智能教育</h3>
        <p>设计人机协作流程，支持反思、促学与教育决策。</p>
      </article>
      <article class="focus-item">
        <h3>联通主义 MOOC</h3>
        <p>探索 cMOOC 与在线学习社群如何影响参与、协作与知识创造。</p>
      </article>
    </div>
    {% assign orcid_peer_reviews = site.data.orcid_peer_reviews %}
    {% if orcid_peer_reviews and orcid_peer_reviews.journals and orcid_peer_reviews.journals.size > 0 %}
      <div class="research-focus-service">
        <p class="service-intro"><strong>学术服务。</strong> 共 {{ orcid_peer_reviews.review_count }} 次审稿，覆盖 {{ orcid_peer_reviews.journal_count | default: orcid_peer_reviews.journals.size }} 本期刊。</p>
        {% if orcid_peer_reviews and orcid_peer_reviews.last_synced_at %}
          <p class="selected-publications__updated">更新时间 {{ orcid_peer_reviews.last_synced_at | date: "%Y-%m-%d %H:%M UTC" }}，数据来自 ORCID</p>
        {% endif %}
        <ul class="service-tags" aria-label="期刊审稿列表">
          {% for journal in orcid_peer_reviews.journals %}
            <li><a href="{{ journal.url }}" target="_blank" rel="noopener"><span class="service-tags__label">{{ journal.title }}</span><span class="service-tags__count">{{ journal.review_count }}</span></a></li>
          {% endfor %}
        </ul>
      </div>
    {% else %}
    <div class="research-focus-service">
      <p class="service-intro"><strong>学术服务。</strong> 目前为 9 本期刊审稿。</p>
      <ul class="service-tags" aria-label="期刊审稿列表">
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
      <h2>最新动态</h2>
      <a class="homepage-section__link" href="/life/">查看全部</a>
    </div>
    <ul class="news-list">
      <li class="news-item">
        <div class="news-item__date">2026-04</div>
        <div class="news-item__content">
          <div>我在挪威卑尔根参加 LAK2026，并在 Doctoral Consortium 与海报环节分享研究工作。</div>
          <div class="publication-item__meta"><a href="https://www.linkedin.com/posts/neginm_lak26-learninganalytics-ai-activity-7455279252138053633-dazm" target="_blank" rel="noopener">LinkedIn 动态</a></div>
        </div>
        <img class="news-item__thumb" src="/assets/img/photos/2026/LAK26-bergen.jpg" alt="LAK26 卑尔根缩略图">
      </li>
      <li class="news-item">
        <div class="news-item__date">2026-01</div>
        <div class="news-item__content">
          <div>我很荣幸被提名为 SoLAR Executive Committee Student Member 候选人。</div>
          <div class="publication-item__meta"><a href="https://www.solaresearch.org/2026/01/2026-solar-executive-committee-nominees/" target="_blank" rel="noopener">提名公告</a></div>
        </div>
        <img class="news-item__thumb" src="/assets/img/photos/2026/SoLAR_Executive_Committee_Nominees.jpg" alt="SoLAR 候选人缩略图">
      </li>
      <li class="news-item">
        <div class="news-item__date">2025-11</div>
        <div class="news-item__content">
          <div>围绕 AI for Learning 与 cMOOC 平台的项目在全国创新竞赛与公开传播中获得认可。</div>
          <div class="publication-item__meta"><a href="https://diidea.pku.edu.cn/competition2025/learning.html" target="_blank" rel="noopener">赛事报道</a></div>
        </div>
        <img class="news-item__thumb" src="/assets/img/photos/2025/AI4Learning.jpg" alt="AI for Learning 缩略图">
      </li>
      <li class="news-item">
        <div class="news-item__date">2025-11</div>
        <div class="news-item__content">
          <div>我代表团队参加 AI 赋能在线教学创新大赛，项目“cMOOC——第三代在线学习平台”获一等奖。颁奖典礼在国家会议中心Ⅱ举行，决赛精彩片段也在中国教育电视台（CETV）播出。</div>
          <div class="publication-item__meta">
            <a href="https://www.caet.org.cn/site/content/1031.html" target="_blank" rel="noopener">获奖报道</a>
            &nbsp;·&nbsp;
            <a href="https://m.cetv.cn/p/568090.html" target="_blank" rel="noopener">CETV 报道</a>
          </div>
        </div>
        <img class="news-item__thumb" src="/assets/img/photos/2025/cmooc_platform.jpg" alt="cMOOC 平台缩略图">
      </li>
      <li class="news-item">
        <div class="news-item__date">2025-09</div>
        <div class="news-item__content">
          <div>我受广东医科大学教务处邀请，作题为“AI Agent 技术及其教学应用”的教师发展专题报告。</div>
          <div class="publication-item__meta"><a href="https://www.gdmu.edu.cn/info/1488/58832.htm" target="_blank" rel="noopener">报告通知</a></div>
        </div>
        <img class="news-item__thumb" src="/assets/img/photos/2025/wechat_2025-09-18_171135_438.jpg" alt="教师发展报告缩略图">
      </li>
    </ul>
  </section>

  <section class="homepage-section homepage-section--featured" id="publications">
    <div class="homepage-section__header">
      <h2>精选论文</h2>
      <a class="homepage-section__link" href="https://orcid.org/0000-0003-0000-9630#cy-works" target="_blank" rel="noopener">查看全部</a>
    </div>
    <div class="selected-paper-grid">
      <article class="selected-paper-card">
        <img class="selected-paper-card__media" src="/assets/img/photos/2026/LAK26.jpg" alt="LAK26 会议现场">
        <div class="selected-paper-card__body">
          <h3 class="selected-paper-card__title">群体话语中的协作问题解决动态</h3>
          <p class="selected-paper-card__authors">Xiao, J., Wang, C., Zhang, W. (2026)</p>
          <ul class="selected-paper-card__meta">
            <li>会议 · LAK26 · Bergen, Norway · Full research paper</li>
          </ul>
          <div class="selected-paper-card__links">
            <a href="https://doi.org/10.1145/3785022.3785049" target="_blank" rel="noopener">DOI</a>
          </div>
        </div>
      </article>

      <article class="selected-paper-card">
        <img class="selected-paper-card__media" src="/assets/img/photos/2026/REM26.jpg" alt="互动模式研究图">
        <div class="selected-paper-card__body">
          <h3 class="selected-paper-card__title">开放学习环境中的交互模式</h3>
          <p class="selected-paper-card__authors">Xiao, J. (2026)</p>
          <ul class="selected-paper-card__meta">
            <li>期刊 · Interactive Learning Environments · SSCI Q1 · online first</li>
          </ul>
          <div class="selected-paper-card__links">
            <a href="https://doi.org/10.1080/10494820.2026.2632766" target="_blank" rel="noopener">DOI</a>
          </div>
        </div>
      </article>

      <article class="selected-paper-card">
        <img class="selected-paper-card__media" src="/assets/img/photos/2026/PCA.jpg" alt="协同 AI-in-the-loop 工作流">
        <div class="selected-paper-card__body">
          <h3 class="selected-paper-card__title">面向 cMOOC 讨论促进的人机交互设计</h3>
          <p class="selected-paper-card__authors">Xiao, J., &amp; Wang, C. (2026)</p>
          <ul class="selected-paper-card__meta">
            <li>预印本 · cMOOC 讨论促进 · arXiv</li>
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
      <h2>代表项目</h2>
      <a class="homepage-section__link" href="/projects/">查看全部</a>
    </div>
    <div class="project-grid">
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/gca_results.jpg" alt="GCA Analyzer 结果界面">
        <div class="project-card__body">
          <h3>GCA Analyzer</h3>
          <div class="project-card__meta">Python 工具包 · PyPI · 2024</div>
          <p>面向群体对话分析的 Python 工具包，提供基于 NLP 的交互指标与分析能力。</p>
          <div class="project-card__links">
            <a href="https://gca-analyzer.readthedocs.io" target="_blank" rel="noopener">在线文档</a>
          </div>
        </div>
      </article>
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/cmooc_platform.jpg" alt="cMOOC 平台首页">
        <div class="project-card__body">
          <h3>cMOOC 平台</h3>
          <div class="project-card__meta">WordPress · 16,712 用户 · 自 2019 年起</div>
          <p>面向联通主义在线课程的学习平台设计与迭代，支持协作学习社群。</p>
          <div class="project-card__links">
            <a href="https://cmooc.bnu.edu.cn" target="_blank" rel="noopener">在线访问</a>
          </div>
        </div>
      </article>
      <article class="project-card">
        <img class="project-card__media" src="/assets/img/photos/2024/08/sparkshopping-cover.jpg" alt="Spark Shopping 项目封面">
        <div class="project-card__body">
          <h3>Spark Shopping</h3>
          <div class="project-card__meta">星火训练营 · 铜奖 · 合肥 · 2023</div>
          <p>在讯飞星火训练营完成的大模型购物助手项目，并在后续通用人工智能创新与应用竞赛中获奖。</p>
          <div class="project-card__links">
            <a href="https://mp.weixin.qq.com/s/IGBmPkI9BBRgLGWiW0jFCQ" target="_blank" rel="noopener">获奖报道</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="homepage-section" id="visitors">
    <div class="homepage-section__header">
      <h2>访客地图</h2>
    </div>  
    <div style="text-align: center;">
      <a href="https://info.flagcounter.com/hnzv">
        <img style="width: 100%;" src="https://s01.flagcounter.com/map/hnzv/size_l/txt_000000/border_CCCCCC/pageviews_1/viewers_3/flags_3/" alt="Flag Counter" border="0">
      </a>
    </div>
  </section>
</div>
