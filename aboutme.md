---
layout: page
title: About me
subtitle: Ph.D. Candidate @ Beijing Normal University
language: en
alternate-url: /zh/aboutme/
alternate-label: 中文
full-width: true
hide-page-heading: true
show-avatar: false
---

{% assign orcid_peer_reviews = site.data.orcid_peer_reviews %}

<div class="homepage-shell about-page">
  <section class="about-hero">
    <div>
      <p class="homepage-eyebrow">About &middot; Research Centre of Distance Education</p>
      <h1 class="about-hero__title">Jianjun Xiao <span>肖建军</span></h1>
      <p class="about-hero__bio">
        I am a Ph.D. candidate in Internet Education at the <a href="https://rcde.bnu.edu.cn/" target="_blank" rel="noopener">Research Centre of Distance Education (RCDE)</a>, <strong>Beijing Normal University</strong>, advised by <a href="https://fe.bnu.edu.cn/pc/cms1info/resume/51/94" target="_blank" rel="noopener">Prof. Li Chen</a>. My research investigates how learners interact, collaborate, and co-construct knowledge in open online learning environments and human&ndash;AI collaborative settings.
      </p>
      <p class="about-hero__bio">
        Since 2019, I have designed and iterated China&rsquo;s first <a href="https://cmooc.bnu.edu.cn" target="_blank" rel="noopener">cMOOC platform</a> across nine course runs serving <strong>16,712+ learners</strong> and recording over <strong>1.2 million</strong> standardized learning behaviors. Methodologically, I integrate <strong>complex network modeling</strong>, <strong>natural language processing (NLP)</strong>, <strong>explainable AI</strong>, and <strong>design-based research (DBR)</strong>.
      </p>

      <ul class="about-tags" aria-label="Research interests">
        <li>Connectivism &amp; cMOOCs</li>
        <li>Learning Analytics</li>
        <li>Complex Networks</li>
        <li>Human&ndash;AI Collaboration</li>
        <li>Explainable AI</li>
        <li>Design-Based Research</li>
      </ul>

      <div class="about-actions">
        <a class="homepage-button" href="/assets/pdf/Xiao_Jianjun_Resume_EN.pdf">CV (English)</a>
        <a class="homepage-button homepage-button--secondary" href="/assets/pdf/Xiao_Jianjun_Resume_CN.pdf">CV (中文)</a>
      </div>
    </div>

    <aside class="about-aside">
      <figure class="about-portrait">
        <img src="/assets/img/jianjunxiao-hero.jpg" alt="Portrait of Jianjun Xiao">
      </figure>
      <dl class="about-facts">
        <div class="about-facts__row">
          <dt>Location</dt>
          <dd>Beijing, China</dd>
        </div>
        <div class="about-facts__row">
          <dt>Affiliation</dt>
          <dd>RCDE &middot; BNU</dd>
        </div>
        <div class="about-facts__row">
          <dt>Advisor</dt>
          <dd>Prof. Li Chen</dd>
        </div>
        <div class="about-facts__row">
          <dt>Expected Ph.D.</dt>
          <dd>Jun 2027</dd>
        </div>
      </dl>
    </aside>
  </section>

  <section class="about-section" id="background">
    <div class="about-two-col">
      <div>
        <h2 class="about-col__title">Education</h2>
        <ol class="about-timeline">
          <li>
            <span class="about-timeline__period">Sep 2023 &ndash; Jun 2027 (Expected)</span>
            <p class="about-timeline__role">Ph.D. Candidate in Internet Education</p>
            <p class="about-timeline__org">Beijing Normal University &middot; Faculty of Education (RCDE), Beijing</p>
          </li>
          <li>
            <span class="about-timeline__period">Sep 2020 &ndash; Jun 2023</span>
            <p class="about-timeline__role">M.S. in Educational Technology</p>
            <p class="about-timeline__org">Beijing Normal University &middot; Beijing</p>
          </li>
          <li>
            <span class="about-timeline__period">Sep 2014 &ndash; Jun 2018</span>
            <p class="about-timeline__role">B.Ed. in Educational Technology</p>
            <p class="about-timeline__org">Linyi University &middot; Shandong</p>
          </li>
        </ol>
      </div>

      <div>
        <h2 class="about-col__title">Experience &amp; Teaching</h2>
        <ol class="about-timeline">
          <li>
            <span class="about-timeline__period">Jan 2019 &ndash; Present</span>
            <p class="about-timeline__role">Lead Platform Architect &amp; R&amp;D Engineer</p>
            <p class="about-timeline__org">Research Centre of Distance Education, BNU &middot; Designed and iterated China&rsquo;s first cMOOC platform across 9 course runs (16,712+ learners).</p>
          </li>
          <li>
            <span class="about-timeline__period">Aug 2023</span>
            <p class="about-timeline__role">Team Lead &middot; iFLYTEK Spark Training Camp</p>
            <p class="about-timeline__org">Led a 6-member team in evaluating Spark LLM 2.5 and developing the Spark Shopping plugin (Bronze Award).</p>
          </li>
          <li>
            <span class="about-timeline__period">Sep 2021 &ndash; Jan 2022</span>
            <p class="about-timeline__role">Teaching Assistant &middot; Data Management and Analysis</p>
            <p class="about-timeline__org">Undergraduate Public Restricted Course (35 students), Beijing Normal University.</p>
          </li>
        </ol>
      </div>
    </div>
  </section>

  <section class="about-section" id="service">
    <div class="about-two-col">
      <div>
        <h2 class="about-col__title">Academic Service &amp; Honors</h2>
        <div class="about-service-block">
          <p class="about-service-block__label">Community &amp; Editorial</p>
          <p class="about-service-block__text">
            Nominee, SoLAR Executive Committee Student Member (2026) &middot; Editorial Board Member, <a href="https://ojs.bonfuturepress.com/index.php/CETR/editorial_board#:~:text=Xiao%20Jianjun" target="_blank" rel="noopener">Contemporary Education and Teaching Research</a> (2025).
          </p>
        </div>
        <div class="about-service-block">
          <p class="about-service-block__label">Selected Recognition</p>
          <p class="about-service-block__text">
            Young Scholar Award at Wolfson College, University of Cambridge (2026) &middot; LAK26 Doctoral Consortium Participant (2026) &middot; First Prize, AI-Empowered Online Teaching Innovation Competition (2025) &middot; Best Paper, CAHE Learning Sciences Annual Conference (2025) &middot; Young Scholar Award, ASSRT at Kansai University (2024).
          </p>
        </div>
      </div>

      {% if orcid_peer_reviews and orcid_peer_reviews.journals and orcid_peer_reviews.journals.size > 0 %}
      <div>
        <h2 class="about-col__title">Peer Review ({{ orcid_peer_reviews.review_count }} Reviews &middot; {{ orcid_peer_reviews.journal_count | default: orcid_peer_reviews.journals.size }} Journals)</h2>
        <ul class="about-review-pills">
          {% for journal in orcid_peer_reviews.journals %}
            <li>
              <a class="service-pill" href="{{ journal.url }}" target="_blank" rel="noopener">
                <span class="service-pill__label">{{ journal.title }}</span>
                <span class="service-pill__count">{{ journal.review_count }}</span>
              </a>
            </li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}
    </div>
  </section>

  <section class="about-section about-section--climbers" id="climbers">
    <figure class="about-climbers">
      <div class="about-climbers__mat">
        <img src="/assets/img/photos/TheClimbers-202009.jpg" loading="lazy" decoding="async" alt="The Climbers illustration at Beijing Normal University, September 2020">
      </div>
      <figcaption class="about-climbers__caption">
        <div class="about-climbers__heading">
          <span class="about-climbers__eyebrow">Community</span>
          <h2 class="about-climbers__title">The Climbers</h2>
        </div>
        <span class="about-climbers__meta">Beijing Normal University &middot; September 2020</span>
      </figcaption>
    </figure>
  </section>
</div>
