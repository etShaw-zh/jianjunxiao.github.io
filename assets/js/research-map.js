(function () {
  var RING_YEARS = [2021, 2022, 2023, 2024, 2025, 2026];
  var CITATION_TIER_LABELS = {
    en: ['20+ cites', '10–19', '1–9', 'New / 0'],
    zh: ['20+ 引', '10–19 引', '1–9 引', '新发 / 0']
  };
  var TILT = -0.24; // ~ -13.7 deg editorial astronomy tilt
  var ELLIPSE_RATIO = 0.62;

  function hashUnit(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 10000) / 10000;
  }

  function getPalette() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) {
      return {
        isDark: true,
        accent: '#e8b84a',
        accentRgb: '232, 184, 74',
        teal: '#4ec0cc',
        tealRgb: '78, 192, 204',
        ink: '#ece8dc',
        inkRgb: '236, 232, 220',
        muted: '#8f8d84',
        nodeFill: '#2a2d27',
        nodeBorder: 'rgba(236, 232, 220, 0.55)',
        ringStroke: 'rgba(236, 232, 220, 0.14)',
        ringStrokeStrong: 'rgba(236, 232, 220, 0.24)',
        axisStroke: 'rgba(236, 232, 220, 0.08)',
        sunCore: '#2a2c27',
        sunRim: '#e8b84a',
        sunRays: 'rgba(232, 184, 74, 0.65)',
        labelBg: 'rgba(17, 18, 16, 0.78)'
      };
    }
    return {
      isDark: false,
      accent: '#996515',
      accentRgb: '153, 101, 21',
      teal: '#0d7480',
      tealRgb: '13, 116, 128',
      ink: '#232620',
      inkRgb: '35, 38, 32',
      muted: '#6f746a',
      nodeFill: '#2f322d',
      nodeBorder: 'rgba(35, 38, 32, 0.42)',
      ringStroke: 'rgba(35, 38, 32, 0.11)',
      ringStrokeStrong: 'rgba(35, 38, 32, 0.22)',
      axisStroke: 'rgba(35, 38, 32, 0.07)',
      sunCore: '#dedbd2',
      sunRim: '#996515',
      sunRays: 'rgba(153, 101, 21, 0.52)',
      labelBg: 'rgba(248, 247, 243, 0.86)'
    };
  }

  function citationTier(cites) {
    if (cites >= 20) return 1;
    if (cites >= 10) return 2;
    if (cites >= 1) return 3;
    return 4;
  }

  function citationRadius(cites) {
    return Math.min(20, 4.2 + Math.log(1 + Math.max(0, cites)) * 3.12);
  }

  function matchesFilter(item, filter) {
    if (filter === 'all') return true;
    return item.theme === filter;
  }

  function initResearchMap(root) {
    var canvas = root.querySelector('[data-map-canvas]');
    var dataEl = root.querySelector('[data-research-map-data]');
    var citeEl = root.querySelector('[data-research-map-citations]');
    if (!canvas || !dataEl) return;

    var items;
    var citationsMap = {};
    try {
      items = JSON.parse(dataEl.textContent || '[]');
    } catch (e) {
      return;
    }
    try {
      if (citeEl && citeEl.textContent.trim()) {
        citationsMap = JSON.parse(citeEl.textContent) || {};
      }
    } catch (e) {
      citationsMap = {};
    }

    items = items.filter(function (item) {
      return item.type !== 'software';
    });
    if (!items.length) return;

    items.forEach(function (item) {
      var entry = citationsMap[item.id];
      item.citations = entry && typeof entry.citations === 'number' ? entry.citations : 0;
      item.citation_source = entry && entry.source ? entry.source : 'none';
    });

    var sortedCites = items
      .map(function (i) { return i.citations; })
      .filter(function (c) { return c > 0; })
      .sort(function (a, b) { return b - a; });
    var labelThreshold = sortedCites.length >= 5 ? Math.max(6, sortedCites[4]) : 6;

    var lang = root.getAttribute('data-lang') === 'zh' ? 'zh' : 'en';
    var avatarSrc = root.getAttribute('data-avatar') || '/assets/img/jianjunxiao-hero.jpg';
    var aboutUrl = root.getAttribute('data-about-url') || (lang === 'zh' ? '/zh/aboutme/' : '/aboutme/');
    var ctx = canvas.getContext('2d');
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var detailEl = root.querySelector('[data-map-detail]');
    var detailClose = root.querySelector('[data-map-detail-close]');
    var detailMeta = root.querySelector('[data-map-detail-meta]');
    var detailTitle = root.querySelector('[data-map-detail-title]');
    var detailAuthors = root.querySelector('[data-map-detail-authors]');
    var detailVenue = root.querySelector('[data-map-detail-venue]');
    var detailActions = root.querySelector('[data-map-detail-actions]');
    var legendEl = root.querySelector('[data-map-legend]');

    var totalCitations = items.reduce(function (sum, item) { return sum + item.citations; }, 0);

    var centerProfile = {
      id: '__profile__',
      year: '2021–2026',
      type: 'profile',
      citations: totalCitations,
      citation_source: 'google_scholar',
      badge: lang === 'zh' ? ('累计被引 ' + totalCitations + ' 次') : (totalCitations + ' total citations'),
      title_en: 'Jianjun Xiao (肖建军)',
      title_zh: '肖建军 (Jianjun Xiao)',
      authors: lang === 'zh'
        ? '北京师范大学教育学部 · 远程教育研究中心（RCDE）'
        : 'Research Centre of Distance Education (RCDE), Faculty of Education, BNU',
      venue_en: items.length + ' papers across Learning Analytics, AI in Education, and Connectivist MOOCs.',
      venue_zh: '共收录 ' + items.length + ' 篇学术论文，聚焦学习分析、人工智能教育与联通主义 MOOC。',
      url: aboutUrl,
      url_label_en: 'About me',
      url_label_zh: '了解更多'
    };

    var avatarImg = new Image();
    var avatarLoaded = false;
    avatarImg.onload = function () {
      avatarLoaded = true;
      draw(0);
    };
    avatarImg.src = avatarSrc;

    var mode = 'rings'; // 'rings' | 'citations'
    var activeFilter = 'all';
    var hoveredId = null;
    var selectedId = null;
    var pinnedDetail = false;
    var hoverHideTimer = null;
    var pointerInside = false;
    var detailHovered = false;
    var speedScale = 1;
    var orbitPhase = 0; // accumulated animated orbit time (seconds)
    var lastFrameTime = null;
    var dashOffset = 0;

    var width = 0;
    var height = 0;
    var dpr = 1;
    var palette = getPalette();

    // Subtle ambient drifting stardust
    var dust = [];
    for (var d = 0; d < 18; d++) {
      dust.push({
        fx: 0.08 + hashUnit('dx' + d) * 0.84,
        fy: 0.08 + hashUnit('dy' + d) * 0.84,
        r: 1.2 + hashUnit('dr' + d) * 2.4,
        phase: hashUnit('dp' + d) * Math.PI * 2,
        speed: 0.4 + hashUnit('ds' + d) * 0.7
      });
    }

    var byYear = {};
    var byTier = { 1: [], 2: [], 3: [], 4: [] };

    items.forEach(function (item) {
      var y = Math.max(2021, Math.min(2026, Number(item.year) || 2024));
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(item);

      var tier = citationTier(item.citations);
      byTier[tier].push(item);
    });

    Object.keys(byYear).forEach(function (y) {
      byYear[y].sort(function (a, b) { return (b.citations - a.citations) || a.id.localeCompare(b.id); });
    });
    Object.keys(byTier).forEach(function (t) {
      byTier[t].sort(function (a, b) { return (b.citations - a.citations) || (b.year - a.year); });
    });

    var nodeStates = items.map(function (item) {
      var y = Math.max(2021, Math.min(2026, Number(item.year) || 2024));
      var yearIdx = RING_YEARS.indexOf(y);
      var yearList = byYear[y] || [];
      var idxInYear = yearList.indexOf(item);
      var countInYear = Math.max(1, yearList.length);
      var ringOffset = yearIdx * 0.92 + 0.35;
      var rawRingAngle = ringOffset + (idxInYear / countInYear) * Math.PI * 2;

      var tier = citationTier(item.citations);
      var tierList = byTier[tier];
      var idxInTier = tierList.indexOf(item);
      var impactAngle = (tier * 0.95) + (idxInTier / Math.max(1, tierList.length)) * Math.PI * 2 + hashUnit(item.id) * 0.08;

      var baseRadius = citationRadius(item.citations);
      // Kepler-like angular velocity (rad/sec): inner rings gently faster, outer rings stately slower
      var ringSpeed = 0.055 - yearIdx * 0.0062;
      var tierSpeed = 0.052 - (tier - 1) * 0.009;

      return {
        item: item,
        yearIndex: yearIdx,
        tier: tier,
        ringAngle: rawRingAngle,
        impactAngle: impactAngle,
        ringSpeed: ringSpeed,
        tierSpeed: tierSpeed,
        baseRadius: baseRadius,
        rx: 100,
        ry: 62,
        angle: rawRingAngle,
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        r: baseRadius,
        tr: baseRadius,
        alpha: 1,
        tAlpha: 1,
        tRx: 100,
        tAngle: rawRingAngle
      };
    });

    function computeGeometry() {
      var cx = width * 0.51;
      var cy = height * 0.5;
      var maxRx = Math.min(width * 0.44, height * 0.64);
      var maxRy = maxRx * ELLIPSE_RATIO;
      var avatarR = Math.max(24, Math.min(35, maxRx * 0.112));
      var minRx = Math.max(avatarR + 36, maxRx * 0.28);
      return { cx: cx, cy: cy, maxRx: maxRx, maxRy: maxRy, minRx: minRx, avatarR: avatarR };
    }

    function ellipsePoint(cx, cy, rx, ry, angle) {
      var lx = Math.cos(angle) * rx;
      var ly = Math.sin(angle) * ry;
      var cosT = Math.cos(TILT);
      var sinT = Math.sin(TILT);
      return {
        x: cx + lx * cosT - ly * sinT,
        y: cy + lx * sinT + ly * cosT
      };
    }

    function updateTargets(snap) {
      var g = computeGeometry();
      var ringCount = RING_YEARS.length;

      nodeStates.forEach(function (n) {
        var matched = matchesFilter(n.item, activeFilter);
        n.tAlpha = matched ? 1 : 0.16;

        if (mode === 'rings') {
          var frac = ringCount > 1 ? (n.yearIndex / (ringCount - 1)) : 1;
          var rx = g.minRx + (g.maxRx - g.minRx) * frac;
          var ang = n.ringAngle + orbitPhase * n.ringSpeed;
          var pt = ellipsePoint(g.cx, g.cy, rx, rx * ELLIPSE_RATIO, ang);
          n.tRx = rx;
          n.tAngle = ang;
          n.tx = pt.x;
          n.ty = pt.y;
          n.tr = n.baseRadius * (width < 520 ? 0.8 : 1);
        } else {
          var tierFrac = (n.tier - 1) / 3;
          var rx2 = g.minRx + (g.maxRx - g.minRx) * tierFrac;
          var ang2 = n.impactAngle + orbitPhase * n.tierSpeed;
          var pt2 = ellipsePoint(g.cx, g.cy, rx2, rx2 * ELLIPSE_RATIO, ang2);
          n.tRx = rx2;
          n.tAngle = ang2;
          n.tx = pt2.x;
          n.ty = pt2.y;
          n.tr = n.baseRadius * (width < 520 ? 0.82 : 1);
        }

        if (snap) {
          n.rx = n.tRx;
          n.ry = n.tRx * ELLIPSE_RATIO;
          n.angle = n.tAngle;
          n.x = n.tx;
          n.y = n.ty;
          n.r = n.tr;
          n.alpha = n.tAlpha;
        }
      });
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateTargets(true);
      draw(0);
    }

    function drawAmbientDust(time) {
      var sec = time * 0.001;
      ctx.save();
      dust.forEach(function (d) {
        var pulse = 0.04 + 0.055 * (0.5 + 0.5 * Math.sin(sec * d.speed + d.phase));
        var x = d.fx * width + Math.cos(sec * 0.15 + d.phase) * 4;
        var y = d.fy * height + Math.sin(sec * 0.18 + d.phase) * 3;
        var grad = ctx.createRadialGradient(x, y, 0, x, y, d.r * 3.5);
        grad.addColorStop(0, 'rgba(' + palette.inkRgb + ', ' + pulse.toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(' + palette.inkRgb + ', 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, d.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    function drawSunRays(cx, cy, radius, time) {
      var rayCount = 48;
      var sec = time * 0.001;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(reducedMotion ? 0 : sec * 0.08);
      ctx.strokeStyle = palette.sunRays;
      ctx.lineWidth = 1;
      for (var i = 0; i < rayCount; i++) {
        var a = (i / rayCount) * Math.PI * 2;
        var breathe = reducedMotion ? 0 : Math.sin(sec * 1.4 + i * 0.45) * 1.6;
        var inner = radius + 4;
        var outer = radius + (i % 2 === 0 ? 15 : 9) + breathe;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
        ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawCenterAvatar(g, time) {
      var cx = g.cx;
      var cy = g.cy;
      var r = g.avatarR;
      var isHovered = hoveredId === '__profile__';
      var isSelected = selectedId === '__profile__';

      drawSunRays(cx, cy, r, time);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r + (isHovered || isSelected ? 5 : 3), 0, Math.PI * 2);
      ctx.strokeStyle = isHovered || isSelected ? palette.teal : palette.sunRim;
      ctx.lineWidth = isHovered || isSelected ? 2 : 1.4;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = palette.sunCore;
      ctx.fill();
      ctx.clip();

      if (avatarLoaded && avatarImg.naturalWidth && avatarImg.naturalHeight) {
        var iw = avatarImg.naturalWidth;
        var ih = avatarImg.naturalHeight;
        var cropSize = Math.min(iw, ih) * 0.56;
        var sx = (iw - cropSize) * 0.5;
        var sy = Math.max(0, ih * 0.015);
        if (sy + cropSize > ih) sy = (ih - cropSize) * 0.5;
        ctx.drawImage(avatarImg, sx, sy, cropSize, cropSize, cx - r, cy - r, r * 2, r * 2);
      }
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = palette.isDark ? 'rgba(236, 232, 220, 0.35)' : 'rgba(35, 38, 32, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    function drawOrbits(g) {
      ctx.save();

      ctx.strokeStyle = palette.axisStroke;
      ctx.lineWidth = 1;
      var p1 = ellipsePoint(g.cx, g.cy, g.maxRx * 1.32, 0, 0);
      var p2 = ellipsePoint(g.cx, g.cy, g.maxRx * 1.32, 0, Math.PI);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      var p3 = ellipsePoint(g.cx, g.cy, 0, g.maxRy * 1.55, Math.PI / 2);
      var p4 = ellipsePoint(g.cx, g.cy, 0, g.maxRy * 1.55, -Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.stroke();

      var count = mode === 'rings' ? RING_YEARS.length : 4;
      for (var i = 0; i < count; i++) {
        var frac = count > 1 ? (i / (count - 1)) : 1;
        var rx = g.minRx + (g.maxRx - g.minRx) * frac;
        var ry = rx * ELLIPSE_RATIO;
        var isOuter = i === count - 1;

        ctx.save();
        ctx.translate(g.cx, g.cy);
        ctx.rotate(TILT);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isOuter ? palette.ringStrokeStrong : palette.ringStroke;
        ctx.lineWidth = isOuter ? 1.1 : 0.9;
        if (!isOuter && i % 2 === 1) {
          ctx.setLineDash([3, 5]);
        }
        ctx.stroke();
        ctx.restore();

        var labelPos = ellipsePoint(g.cx, g.cy, rx, ry, -0.52);
        ctx.font = '500 10px "JetBrains Mono", "PingFang SC", ui-monospace, monospace';
        ctx.fillStyle = palette.muted;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var ringText = mode === 'rings'
          ? String(RING_YEARS[i])
          : CITATION_TIER_LABELS[lang][i];
        ctx.fillText(ringText, labelPos.x, labelPos.y - 6);
      }

      var tickCount = 96;
      ctx.strokeStyle = palette.ringStrokeStrong;
      ctx.lineWidth = 0.85;
      for (var t = 0; t < tickCount; t++) {
        var ang = (t / tickCount) * Math.PI * 2;
        var tickLen = t % 8 === 0 ? 8 : 4;
        var ptIn = ellipsePoint(g.cx, g.cy, g.maxRx + 4, g.maxRy + 4 * ELLIPSE_RATIO, ang);
        var ptOut = ellipsePoint(g.cx, g.cy, g.maxRx + 4 + tickLen, g.maxRy + (4 + tickLen) * ELLIPSE_RATIO, ang);
        ctx.beginPath();
        ctx.moveTo(ptIn.x, ptIn.y);
        ctx.lineTo(ptOut.x, ptOut.y);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawOrbitalTrails(g) {
      ctx.save();
      nodeStates.forEach(function (n) {
        if (n.alpha < 0.25) return;
        var cites = n.item.citations || 0;
        var tailSpan = cites >= 10 ? 0.34 : 0.24;
        var segs = 12;
        var rgb = cites >= 20 ? palette.accentRgb : (activeFilter !== 'all' && matchesFilter(n.item, activeFilter) ? palette.tealRgb : palette.inkRgb);

        for (var s = 0; s < segs; s++) {
          var t0 = s / segs;
          var t1 = (s + 1) / segs;
          var a0 = n.angle - tailSpan * (1 - t0);
          var a1 = n.angle - tailSpan * (1 - t1);
          var p0 = ellipsePoint(g.cx, g.cy, n.rx, n.ry, a0);
          var p1 = ellipsePoint(g.cx, g.cy, n.rx, n.ry, a1);
          var segAlpha = n.alpha * t1 * t1 * (cites >= 20 ? 0.38 : 0.24);
          ctx.strokeStyle = 'rgba(' + rgb + ', ' + segAlpha.toFixed(3) + ')';
          ctx.lineWidth = cites >= 20 ? 1.5 : 1.05;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      });
      ctx.restore();
    }

    function drawConstellationLines() {
      if (activeFilter === 'all') return;
      var matched = nodeStates
        .filter(function (n) { return matchesFilter(n.item, activeFilter); })
        .sort(function (a, b) { return (a.item.year - b.item.year) || (b.item.citations - a.item.citations); });

      if (matched.length < 2) return;

      ctx.save();
      ctx.strokeStyle = 'rgba(' + palette.tealRgb + ', 0.48)';
      ctx.lineWidth = 1.3;
      ctx.setLineDash([5, 5]);
      ctx.lineDashOffset = -dashOffset;
      ctx.beginPath();
      matched.forEach(function (n, idx) {
        if (idx === 0) ctx.moveTo(n.x, n.y);
        else ctx.lineTo(n.x, n.y);
      });
      ctx.stroke();
      ctx.restore();
    }

    function drawNodes(time) {
      var labelsToDraw = [];
      var sec = time * 0.001;

      // Pass 1: draw all star bodies and breathing halos
      nodeStates.forEach(function (n, idx) {
        var isHovered = hoveredId === n.item.id;
        var isSelected = selectedId === n.item.id;
        var matched = matchesFilter(n.item, activeFilter);
        var cites = n.item.citations || 0;
        var isTopCited = cites >= 20;

        ctx.save();
        ctx.globalAlpha = n.alpha;

        // Gentle breathing aura on high-cited stars
        if (isTopCited && !reducedMotion) {
          var pulse = 0.5 + 0.5 * Math.sin(sec * 2.1 + idx);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(' + palette.accentRgb + ', ' + (0.14 + pulse * 0.22).toFixed(3) + ')';
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        if (isHovered || isSelected || (matched && activeFilter !== 'all' && cites >= 6)) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + (isSelected ? 7 : 5), 0, Math.PI * 2);
          ctx.strokeStyle = isTopCited && !isSelected && !isHovered ? palette.accent : palette.teal;
          ctx.lineWidth = isSelected ? 1.8 : 1.2;
          ctx.stroke();
        }

        if (cites >= 10) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
          ctx.strokeStyle = isTopCited ? palette.sunRim : palette.nodeBorder;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        if (isSelected || isHovered) {
          ctx.fillStyle = palette.teal;
        } else if (activeFilter !== 'all' && matched) {
          ctx.fillStyle = isTopCited ? palette.accent : palette.teal;
        } else if (isTopCited) {
          ctx.fillStyle = palette.accent;
        } else {
          ctx.fillStyle = palette.nodeFill;
        }
        ctx.fill();
        ctx.restore();

        var showLabel = isHovered || isSelected || cites >= labelThreshold || (activeFilter !== 'all' && matched && cites >= 1);
        if (showLabel && n.alpha > 0.4) {
          labelsToDraw.push({ n: n, isHovered: isHovered, isSelected: isSelected, isTopCited: isTopCited, cites: cites });
        }
      });

      // Pass 2: draw labels cleanly on top
      labelsToDraw.forEach(function (entry) {
        var n = entry.n;
        var cites = entry.cites;
        ctx.save();
        ctx.globalAlpha = n.alpha;
        var baseLabel = n.item.short_label || n.item.title_en;
        var label = cites > 0 ? (baseLabel + ' (' + cites + ')') : baseLabel;
        ctx.font = (entry.isHovered || entry.isSelected || entry.isTopCited ? '600 ' : '500 ') + '11px "JetBrains Mono", "PingFang SC", monospace';
        var textW = ctx.measureText(label).width;
        var placeLeft = n.x > width * 0.64;
        var lx = placeLeft ? (n.x - n.r - 10) : (n.x + n.r + 10);
        var ly = n.y;
        ctx.textAlign = placeLeft ? 'right' : 'left';
        ctx.textBaseline = 'middle';

        var padX = 5;
        var boxX = placeLeft ? (lx - textW - padX) : (lx - padX);
        ctx.fillStyle = palette.labelBg;
        ctx.fillRect(boxX, ly - 8, textW + padX * 2, 16);

        ctx.fillStyle = entry.isHovered || entry.isSelected ? palette.teal : (entry.isTopCited ? palette.accent : palette.ink);
        ctx.fillText(label, lx, ly);
        ctx.restore();
      });
    }

    function draw(time) {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      var g = computeGeometry();
      drawAmbientDust(time);
      drawOrbits(g);
      drawOrbitalTrails(g);
      drawConstellationLines();
      drawCenterAvatar(g, time);
      drawNodes(time);
    }

    var rafId = null;
    function tick(time) {
      if (lastFrameTime === null) lastFrameTime = time;
      var dt = Math.min(0.05, Math.max(0, (time - lastFrameTime) * 0.001));
      lastFrameTime = time;

      if (!reducedMotion) {
        // Smoothly pause orbital drift when user hovers canvas/card or pins a node
        var targetSpeed = (pointerInside || detailHovered || pinnedDetail) ? 0 : 1;
        speedScale += (targetSpeed - speedScale) * 0.08;
        orbitPhase += dt * speedScale;
        dashOffset += dt * 16;
        updateTargets(false);
      }

      var ease = reducedMotion ? 1 : 0.14;
      nodeStates.forEach(function (n) {
        n.rx += (n.tRx - n.rx) * ease;
        n.ry = n.rx * ELLIPSE_RATIO;
        n.angle += (n.tAngle - n.angle) * ease;
        n.x += (n.tx - n.x) * ease;
        n.y += (n.ty - n.y) * ease;
        n.r += (n.tr - n.r) * ease;
        n.alpha += (n.tAlpha - n.alpha) * ease;
      });

      draw(time);
      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function ensureAnimating() {
      if (rafId == null) {
        lastFrameTime = null;
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function hitTest(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;

      var g = computeGeometry();
      if (Math.hypot(x - g.cx, y - g.cy) <= g.avatarR + 6) {
        return { item: centerProfile };
      }

      var best = null;
      var bestDist = Infinity;

      nodeStates.forEach(function (n) {
        if (n.alpha < 0.25) return;
        var hitR = Math.max(n.r + 9, 16);
        var dist = Math.hypot(x - n.x, y - n.y);
        if (dist <= hitR && dist < bestDist) {
          best = n;
          bestDist = dist;
        }
      });
      return best;
    }

    function cancelHoverHide() {
      if (hoverHideTimer) {
        clearTimeout(hoverHideTimer);
        hoverHideTimer = null;
      }
    }

    function scheduleHoverHide() {
      cancelHoverHide();
      if (pinnedDetail || detailHovered) return;
      hoverHideTimer = setTimeout(function () {
        if (!pinnedDetail && !detailHovered && !hoveredId) {
          closeDetail();
        }
      }, 260);
    }

    function showDetail(item, shouldPin) {
      if (!detailEl) return;
      cancelHoverHide();
      var alreadyShown = selectedId === item.id && !detailEl.hidden;
      selectedId = item.id;
      if (shouldPin) pinnedDetail = true;
      if (alreadyShown) {
        ensureAnimating();
        return;
      }

      var typeMap = {
        en: { journal: 'Journal Article', conference: 'Conference Paper', preprint: 'Preprint', profile: 'Researcher' },
        zh: { journal: '期刊论文', conference: '会议论文', preprint: '预印本', profile: '个人简介' }
      };
      var typeText = (typeMap[lang] && typeMap[lang][item.type]) || item.type;

      var metaParts = [item.year, typeText];
      if (item.type !== 'profile') {
        if (item.citation_source && item.citation_source !== 'none') {
          var srcLabel = item.citation_source === 'google_scholar'
            ? 'Google Scholar'
            : (item.citation_source === 'cnki' ? (lang === 'zh' ? '知网' : 'CNKI') : 'OpenAlex');
          metaParts.push(lang === 'zh'
            ? ('被引 ' + item.citations + ' 次 · ' + srcLabel)
            : (item.citations + ' citations · ' + srcLabel));
        } else {
          metaParts.push(lang === 'zh' ? '暂未收录引用' : 'Not yet indexed');
        }
      }
      if (item.badge) metaParts.push(item.badge);

      detailMeta.textContent = metaParts.join(' · ');
      detailTitle.textContent = lang === 'zh' ? item.title_zh : item.title_en;
      detailAuthors.textContent = item.authors || '';
      detailVenue.textContent = lang === 'zh' ? item.venue_zh : item.venue_en;

      detailActions.innerHTML = '';
      if (item.url) {
        var a = document.createElement('a');
        a.href = item.url;
        if (item.url.indexOf('http') === 0) {
          a.target = '_blank';
          a.rel = 'noopener';
        }
        a.className = 'research-map__detail-link';
        a.textContent = (lang === 'zh' ? (item.url_label_zh || '查看详情') : (item.url_label_en || 'Open link')) + ' ↗';
        detailActions.appendChild(a);
      }

      detailEl.hidden = false;
      ensureAnimating();
    }

    function closeDetail() {
      cancelHoverHide();
      selectedId = null;
      pinnedDetail = false;
      if (detailEl) detailEl.hidden = true;
      ensureAnimating();
    }

    canvas.addEventListener('mouseenter', function () {
      pointerInside = true;
    });

    canvas.addEventListener('mousemove', function (e) {
      pointerInside = true;
      var hit = hitTest(e.clientX, e.clientY);
      hoveredId = hit ? hit.item.id : null;
      canvas.style.cursor = hit ? 'pointer' : 'default';
      if (hit) {
        showDetail(hit.item, false);
      } else if (!pinnedDetail) {
        scheduleHoverHide();
      }
      if (reducedMotion) draw(0);
    });

    canvas.addEventListener('mouseleave', function () {
      pointerInside = false;
      hoveredId = null;
      canvas.style.cursor = 'default';
      if (!pinnedDetail) {
        scheduleHoverHide();
      }
      if (reducedMotion) draw(0);
    });

    if (detailEl) {
      detailEl.addEventListener('mouseenter', function () {
        detailHovered = true;
        cancelHoverHide();
      });
      detailEl.addEventListener('mouseleave', function () {
        detailHovered = false;
        if (!pinnedDetail && !hoveredId) {
          scheduleHoverHide();
        }
      });
    }

    canvas.addEventListener('click', function (e) {
      var hit = hitTest(e.clientX, e.clientY);
      if (hit) {
        showDetail(hit.item, true);
      } else if (selectedId) {
        closeDetail();
      }
    });

    if (detailClose) {
      detailClose.addEventListener('click', closeDetail);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && selectedId) {
        closeDetail();
      }
    });

    root.querySelectorAll('[data-map-mode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nextMode = btn.getAttribute('data-map-mode');
        if (nextMode === mode) return;
        mode = nextMode;
        root.querySelectorAll('[data-map-mode]').forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-checked', String(active));
        });
        if (legendEl) {
          if (lang === 'zh') {
            legendEl.textContent = mode === 'rings'
              ? '越新越靠外，引用越多星越大 · 悬停星点查看详情'
              : '引用越多越靠内环 · 悬停星点查看详情';
          } else {
            legendEl.textContent = mode === 'rings'
              ? 'Newer outward, larger by citations · Hover any star for details'
              : 'Higher-cited papers orbit closer to the center · Hover any star';
          }
        }
        updateTargets(false);
        ensureAnimating();
      });
    });

    root.querySelectorAll('[data-map-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-map-filter') || 'all';
        root.querySelectorAll('[data-map-filter]').forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        updateTargets(false);
        ensureAnimating();
      });
    });

    if (window.MutationObserver) {
      var observer = new MutationObserver(function () {
        palette = getPalette();
        draw(0);
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    window.addEventListener('resize', resize);
    resize();
    ensureAnimating();
  }

  function initPubDrawers() {
    document.querySelectorAll('[data-pub-drawer]').forEach(function (drawer) {
      var tabs = drawer.querySelectorAll('[data-pub-filter]');
      var rows = drawer.querySelectorAll('.pub-archive-row[data-pub-type]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var filter = tab.getAttribute('data-pub-filter');
          tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });
          rows.forEach(function (row) {
            var match = filter === 'all' || row.getAttribute('data-pub-type') === filter;
            row.hidden = !match;
          });
        });
      });
    });
  }

  function initPubShowcase() {
    // ResearchGate-style horizontal figure strips with prev/next buttons
    document.querySelectorAll('[data-rg-strip]').forEach(function (wrap) {
      var track = wrap.querySelector('.rg-figures-grid');
      var prevBtn = wrap.querySelector('[data-rg-prev]');
      var nextBtn = wrap.querySelector('[data-rg-next]');
      var controls = wrap.querySelector('.rg-figures-bar__controls');
      if (!track || !prevBtn || !nextBtn) return;

      function syncStripButtons() {
        var maxScroll = track.scrollWidth - track.clientWidth;
        var hasOverflow = maxScroll > 6;
        if (controls) controls.hidden = !hasOverflow;
        prevBtn.disabled = track.scrollLeft <= 4;
        nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
      }

      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -Math.max(220, Math.round(track.clientWidth * 0.65)), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: Math.max(220, Math.round(track.clientWidth * 0.65)), behavior: 'smooth' });
      });

      track.addEventListener('scroll', syncStripButtons, { passive: true });
      window.addEventListener('resize', syncStripButtons);
      syncStripButtons();
    });

    // ResearchGate-style Gallery Lightbox for paper figures & tables
    var zoomButtons = Array.prototype.slice.call(document.querySelectorAll('[data-zoom-img]'));
    if (!zoomButtons.length) return;

    var overlay = null;
    var activeGroup = [];
    var activeIdx = 0;

    function closeLightbox() {
      if (!overlay) return;
      overlay.hidden = true;
      document.body.style.overflow = '';
    }

    function renderLightboxSlide() {
      if (!overlay || !activeGroup.length) return;
      var item = activeGroup[activeIdx];
      var img = overlay.querySelector('.img-lightbox__img');
      var cap = overlay.querySelector('.img-lightbox__caption');
      var counter = overlay.querySelector('.img-lightbox__counter');
      var prevBtn = overlay.querySelector('.img-lightbox__prev');
      var nextBtn = overlay.querySelector('.img-lightbox__next');
      img.src = item.src;
      img.alt = item.caption || '';
      cap.textContent = item.caption || '';
      counter.textContent = activeGroup.length > 1 ? ((activeIdx + 1) + ' / ' + activeGroup.length) : '';
      prevBtn.hidden = activeGroup.length <= 1;
      nextBtn.hidden = activeGroup.length <= 1;
    }

    function stepLightbox(delta) {
      if (activeGroup.length <= 1) return;
      activeIdx = (activeIdx + delta + activeGroup.length) % activeGroup.length;
      renderLightboxSlide();
    }

    function openLightbox(btn) {
      var groupName = btn.getAttribute('data-zoom-group');
      var groupButtons = groupName
        ? zoomButtons.filter(function (b) { return b.getAttribute('data-zoom-group') === groupName; })
        : [btn];
      activeGroup = groupButtons.map(function (b) {
        return {
          src: b.getAttribute('data-zoom-img'),
          caption: b.getAttribute('data-zoom-caption') || ''
        };
      });
      activeIdx = Math.max(0, groupButtons.indexOf(btn));

      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'img-lightbox';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML =
          '<button type="button" class="img-lightbox__close" aria-label="Close">&times;</button>' +
          '<button type="button" class="img-lightbox__nav img-lightbox__prev" aria-label="Previous figure">&#8249;</button>' +
          '<figure class="img-lightbox__frame">' +
            '<img class="img-lightbox__img" alt="">' +
            '<figcaption class="img-lightbox__meta">' +
              '<span class="img-lightbox__counter"></span>' +
              '<span class="img-lightbox__caption"></span>' +
            '</figcaption>' +
          '</figure>' +
          '<button type="button" class="img-lightbox__nav img-lightbox__next" aria-label="Next figure">&#8250;</button>';

        overlay.addEventListener('click', function (e) {
          if (e.target === overlay || e.target.classList.contains('img-lightbox__close')) {
            closeLightbox();
          } else if (e.target.classList.contains('img-lightbox__prev')) {
            stepLightbox(-1);
          } else if (e.target.classList.contains('img-lightbox__next')) {
            stepLightbox(1);
          }
        });

        document.addEventListener('keydown', function (e) {
          if (!overlay || overlay.hidden) return;
          if (e.key === 'Escape') closeLightbox();
          else if (e.key === 'ArrowLeft') stepLightbox(-1);
          else if (e.key === 'ArrowRight') stepLightbox(1);
        });
        document.body.appendChild(overlay);
      }

      renderLightboxSlide();
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    zoomButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLightbox(btn);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-research-map]').forEach(initResearchMap);
    initPubDrawers();
    initPubShowcase();
  });
})();
