(function () {
  var STORAGE_KEY = 'site-theme-mode';
  var MODES = ['auto', 'light', 'dark'];
  var LABELS = {
    en: { auto: 'Auto', light: 'Light', dark: 'Dark' },
    zh: { auto: '自动', light: '亮色', dark: '暗色' }
  };
  var ICONS = {
    auto: 'fas fa-circle-half-stroke',
    light: 'fas fa-sun',
    dark: 'fas fa-moon'
  };

  function getStoredMode() {
    try {
      var mode = localStorage.getItem(STORAGE_KEY);
      return MODES.indexOf(mode) !== -1 ? mode : 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  function resolveTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(mode, persist) {
    var resolved = resolveTheme(mode);
    document.documentElement.setAttribute('data-theme-mode', mode);
    document.documentElement.setAttribute('data-theme', resolved);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch (e) {}
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      var lang = button.getAttribute('data-lang') === 'zh' ? 'zh' : 'en';
      var labelEl = button.querySelector('[data-theme-label]');
      var iconEl = button.querySelector('[data-theme-icon]');
      var label = LABELS[lang][mode];
      if (labelEl) labelEl.textContent = label;
      if (iconEl) iconEl.className = ICONS[mode] + ' theme-toggle__icon';
      var nextMode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
      var nextLabel = LABELS[lang][nextMode];
      button.setAttribute(
        'title',
        lang === 'zh'
          ? '外观模式：' + label + '（点击切换至' + nextLabel + '）'
          : 'Appearance: ' + label + ' (click for ' + nextLabel + ')'
      );
      button.setAttribute('aria-pressed', String(mode !== 'auto'));
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var currentMode = getStoredMode();
    applyTheme(currentMode, false);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        var mode = document.documentElement.getAttribute('data-theme-mode') || 'auto';
        var nextIndex = (MODES.indexOf(mode) + 1) % MODES.length;
        applyTheme(MODES[nextIndex], true);
      });
    });

    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () {
        if ((document.documentElement.getAttribute('data-theme-mode') || 'auto') === 'auto') {
          applyTheme('auto', false);
        }
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', onChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(onChange);
      }
    }
  });
})();
