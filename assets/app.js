(function () {
  "use strict";

  var D = window.SITE_DATA;
  if (!D) return;

  /* ---------- Interface strings ---------- */
  var UI = {
    skip: { en: "Skip to content", ru: "К содержимому" },
    tagline: { en: "Pentest, AI/ML security, DFIR", ru: "Пентест, безопасность AI/ML, DFIR" },
    tabAbout: { en: "About / Skills", ru: "Обо мне / Навыки" },
    tabWriteups: { en: "Writeups", ru: "Райтапы" },
    tabUtilities: { en: "Utilities", ru: "Утилиты" },
    tabCerts: { en: "Certificates", ru: "Сертификаты" },
    navLabel: { en: "Sections", ru: "Разделы" },
    themeToLight: { en: "Light", ru: "Светлая" },
    themeToDark: { en: "Dark", ru: "Тёмная" },
    langAria: { en: "Switch language to Russian", ru: "Переключить язык на английский" },
    themeAria: { en: "Switch theme", ru: "Сменить тему" },

    heroLine: { en: "Web and API pentesting, security of AI and ML systems, incident analysis.", ru: "Пентест web и API, безопасность AI и ML-систем, разбор инцидентов." },
    termTitle: { en: "terminal", ru: "terminal" },

    ledgerTitle: { en: "disclosure.log", ru: "disclosure.log" },
    ledgerSub: { en: "Real systems, reported responsibly", ru: "Реальные системы, ответственное раскрытие" },

    skillsTitle: { en: "Toolbox", ru: "Инструменты" },
    techTitle: { en: "Writeups by technique", ru: "Райтапы по технике" },
    techNote: { en: "A machine can use several techniques.", ru: "В одной машине может быть несколько техник." },
    caseTitle: { en: "Case: an ML server left open", ru: "Случай: открытый ML-сервер" },

    wTitle: { en: "Writeups", ru: "Райтапы" },
    wIntro: {
      en: "Walkthroughs of TryHackMe machines, from recon to privilege escalation. The write-ups themselves are in Russian.",
      ru: "Разборы машин TryHackMe: от разведки до повышения привилегий."
    },
    fDiff: { en: "Difficulty", ru: "Сложность" },
    fTech: { en: "Technique", ru: "Техника" },
    fAll: { en: "All", ru: "Все" },
    fEasy: { en: "Easy", ru: "Лёгкие" },
    fMedium: { en: "Medium", ru: "Средние" },
    easy: { en: "Easy", ru: "Лёгкая" },
    medium: { en: "Medium", ru: "Средняя" },
    wShown: { en: "Showing", ru: "Показано" },
    wOf: { en: "of", ru: "из" },
    wRepo: { en: "All writeups on GitHub", ru: "Все райтапы на GitHub" },
    wEmpty: {
      en: "No machine matches both filters. Choose All in one group to see more.",
      ru: "Ни одна машина не подходит под оба фильтра. Выберите «Все» в одной из групп."
    },

    uTitle: { en: "Utilities", ru: "Утилиты" },
    uIntro: {
      en: "Small security tools and one forensic investigation. Each has its own repository.",
      ru: "Небольшие инструменты для безопасности и одно криминалистическое расследование. У каждого свой репозиторий."
    },
    uOpen: { en: "Open on GitHub", ru: "Открыть на GitHub" },

    cTitle: { en: "Certificates", ru: "Сертификаты" },
    cIntro: {
      en: "Paths, exams, a course and CTF events completed in 2026.",
      ru: "Курсы, экзамены, обучающие пути и CTF, пройденные в 2026 году."
    },
    exam: { en: "Exam", ru: "Экзамен" },
    path: { en: "Learning path", ru: "Обучающий путь" },
    course: { en: "Course", ru: "Курс" },
    ctf: { en: "CTF event", ru: "Соревнование" },

    pageTitle: { en: "sksiiiwei", ru: "sksiiiwei" }
  };

  var LINK_LABELS = [
    ["github", "GitHub", "github.com/sksiiiwei"],
    ["telegram", "Telegram", "@sksiiiwei"],
    ["tryhackme", "TryHackMe", "top 1%"],
    ["email", "Email", "mayakovskaya2021@mail.ru"]
  ];

  var TABS = ["about", "writeups", "utilities", "certificates"];
  var TAB_TITLES = { about: "tabAbout", writeups: "tabWriteups", utilities: "tabUtilities", certificates: "tabCerts" };
  var CAT_ORDER = ["web", "privesc", "network", "ad", "containers"];

  /* ---------- State ---------- */
  var lang = "en";
  var fDiff = "all";
  var fCat = "all";
  var current = null;

  try {
    var savedLang = localStorage.getItem("lang");
    if (savedLang === "ru" || savedLang === "en") lang = savedLang;
    else if ((navigator.language || "").toLowerCase().indexOf("ru") === 0) lang = "ru";
  } catch (e) {}

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ui(key) { return UI[key][lang]; }
  function tr(obj) { return obj[lang]; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function repoUrl(name) { return "https://github.com/" + D.github + "/" + name; }
  function writeupUrl(file) { return repoUrl("tryhackme") + "/blob/main/" + encodeURIComponent(file); }

  function catCount(cat) {
    return D.writeups.filter(function (w) { return w.cats.indexOf(cat) >= 0; }).length;
  }

  /* ---------- Panels ---------- */
  function renderTerminal() {
    var lines = [
      ["cmd", "whoami"],
      ["out", "sksiiiwei"],
      ["cmd", "cat focus.txt"],
      ["out", "web and API pentesting"],
      ["out", "AI/ML infrastructure security"],
      ["out", "DFIR and incident analysis"],
      ["cmd", "ls writeups | wc -l"],
      ["out", String(D.writeups.length)],
      ["cmd", "ls findings"],
      ["out", "messenger  logistics  medical-ml  bank"]
    ];
    var body = lines.map(function (l, i) {
      var inner = l[0] === "cmd" ? '<span class="ps">$</span> ' + esc(l[1]) : '<span class="o">' + esc(l[1]) + '</span>';
      return '<span class="ln" style="--i:' + i + '">' + inner + '</span>';
    }).join("");
    return '<figure class="term" aria-label="' + esc(ui("termTitle")) + '">' +
      '<figcaption>~/sksiiiwei</figcaption>' +
      '<pre aria-hidden="false">' + body + '<span class="ln" style="--i:' + lines.length + '"><span class="ps">$</span> <span class="cursor"></span></span></pre>' +
      '</figure>';
  }

  function renderBars() {
    var max = Math.max.apply(null, CAT_ORDER.map(catCount));
    return CAT_ORDER.map(function (c) {
      var n = catCount(c);
      return '<li><span class="bar-label">' + esc(tr(D.categories[c])) + '</span>' +
        '<span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:' + Math.round((n / max) * 100) + '%"></span></span>' +
        '<span class="bar-n">' + n + '</span></li>';
    }).join("");
  }

  function renderAbout() {
    var findings = D.findings.map(function (f, i) {
      return '<li class="ledger-row" style="--i:' + i + '">' +
        '<span class="ledger-target">' + esc(tr(f.target)) + '</span>' +
        '<span class="ledger-issue">' + esc(tr(f.issue)) + '</span>' +
        '<span class="ledger-status' + (f.tone === "ok" ? " is-ok" : "") + '">' + esc(tr(f.status)) + '</span>' +
        '</li>';
    }).join("");

    var steps = D.caseSteps.map(function (s) { return "<li><span>" + esc(tr(s)) + "</span></li>"; }).join("");

    var skills = D.skills.map(function (g) {
      return "<div><dt>" + esc(tr(g.group)) + "</dt><dd>" + esc(g.items.join(", ")) + "</dd></div>";
    }).join("");

    return '' +
      '<div class="hero">' +
        '<div class="hero-text">' +
          '<h1 class="hero-name" id="title-about" tabindex="-1">sksiiiwei</h1>' +
          '<p class="hero-line">' + esc(ui("heroLine")) + '</p>' +
        '</div>' +
        renderTerminal() +
      '</div>' +

      '<figure class="ledger" aria-label="' + esc(ui("ledgerSub")) + '">' +
        '<figcaption class="ledger-head"><span class="ledger-title">' + esc(ui("ledgerTitle")) + '</span><span class="ledger-sub">' + esc(ui("ledgerSub")) + '</span></figcaption>' +
        '<ul>' + findings + '</ul>' +
      '</figure>' +

      '<div class="duo">' +
        '<section><h2 class="sub">' + esc(ui("skillsTitle")) + '</h2><dl class="skills">' + skills + '</dl></section>' +
        '<section><h2 class="sub">' + esc(ui("techTitle")) + '</h2><ul class="bars">' + renderBars() + '</ul><p class="note">' + esc(ui("techNote")) + '</p></section>' +
      '</div>' +

      '<h2 class="sub">' + esc(ui("caseTitle")) + '</h2>' +
      '<ol class="case">' + steps + '</ol>';
  }

  function renderWriteups() {
    var items = D.writeups.filter(function (w) {
      return (fDiff === "all" || w.diff === fDiff) && (fCat === "all" || w.cats.indexOf(fCat) >= 0);
    });

    var rows = items.map(function (w) {
      return '<li><a href="' + writeupUrl(w.file) + '" target="_blank" rel="noopener">' +
        '<span class="row-main"><span class="row-name">' + esc(w.name) + '</span>' +
        '<span class="diff is-' + w.diff + '">' + esc(ui(w.diff)) + '</span></span>' +
        '<span class="row-tech">' + esc(w.tech.join(", ")) + '</span>' +
        '</a></li>';
    }).join("");

    function btn(group, key, label, extra) {
      var on = (group === "diff" ? fDiff : fCat) === key;
      return '<button type="button" data-group="' + group + '" data-filter="' + key + '" aria-pressed="' + on + '">' + esc(label) +
        (extra !== undefined ? ' <span class="n">' + extra + '</span>' : '') + '</button>';
    }

    var diffBtns = btn("diff", "all", ui("fAll")) + btn("diff", "easy", ui("fEasy")) + btn("diff", "medium", ui("fMedium"));
    var catBtns = btn("cat", "all", ui("fAll")) + CAT_ORDER.map(function (c) {
      return btn("cat", c, tr(D.categories[c]), catCount(c));
    }).join("");

    return '' +
      '<h1 class="panel-title" id="title-writeups" tabindex="-1">' + esc(ui("wTitle")) + '</h1>' +
      '<p class="panel-intro">' + esc(ui("wIntro")) + '</p>' +
      '<div class="filters">' +
        '<div class="filter" role="group" aria-label="' + esc(ui("fDiff")) + '"><span class="filter-label">' + esc(ui("fDiff")) + '</span>' + diffBtns + '</div>' +
        '<div class="filter" role="group" aria-label="' + esc(ui("fTech")) + '"><span class="filter-label">' + esc(ui("fTech")) + '</span>' + catBtns + '</div>' +
      '</div>' +
      '<p class="shown">' + esc(ui("wShown")) + " " + items.length + " " + esc(ui("wOf")) + " " + D.writeups.length + '</p>' +
      (items.length ? '<ul class="rows">' + rows + '</ul>' : '<p class="empty">' + esc(ui("wEmpty")) + '</p>') +
      '<p class="tool-link"><a href="' + repoUrl("tryhackme") + '" target="_blank" rel="noopener">' + esc(ui("wRepo")) + '</a></p>';
  }

  function renderUtilities() {
    var tools = D.utilities.map(function (t) {
      var pts = t.points.map(function (p) { return "<li>" + esc(tr(p)) + "</li>"; }).join("");
      return '<article class="tool">' +
        '<div class="tool-main">' +
          '<div class="tool-head"><h2 class="tool-name">' + esc(t.repo) + '</h2><span class="tool-kind">' + esc(tr(t.kind)) + '</span></div>' +
          '<p class="tool-summary">' + esc(tr(t.summary)) + '</p>' +
          '<ul class="tool-points">' + pts + '</ul>' +
        '</div>' +
        '<div class="tool-side">' +
          (t.usage ? '<pre class="code"><code>' + esc(t.usage) + '</code></pre>' : '') +
          '<a class="tool-link" href="' + repoUrl(t.repo) + '" target="_blank" rel="noopener">' + esc(ui("uOpen")) + '</a>' +
        '</div>' +
        '</article>';
    }).join("");

    return '' +
      '<h1 class="panel-title" id="title-utilities" tabindex="-1">' + esc(ui("uTitle")) + '</h1>' +
      '<p class="panel-intro">' + esc(ui("uIntro")) + '</p>' +
      '<div class="tools">' + tools + '</div>';
  }

  function renderCertificates() {
    var groups = D.certificates.map(function (g) {
      var list = g.items.map(function (c) {
        var title = c.url
          ? '<a href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.title) + '</a>'
          : esc(c.title);
        return '<li><span class="cert-title">' + title + '</span><span class="cert-meta">' + esc(ui(c.kind)) + ", " + esc(c.year) + '</span></li>';
      }).join("");
      return '<section class="cert-group"><h2>' + esc(g.issuer) + '</h2><ul class="cert-list">' + list + '</ul></section>';
    }).join("");

    return '' +
      '<h1 class="panel-title" id="title-certificates" tabindex="-1">' + esc(ui("cTitle")) + '</h1>' +
      '<p class="panel-intro">' + esc(ui("cIntro")) + '</p>' +
      '<div class="certs">' + groups + '</div>';
  }

  var RENDER = {
    about: renderAbout,
    writeups: renderWriteups,
    utilities: renderUtilities,
    certificates: renderCertificates
  };

  /* ---------- Chrome (sidebar, links, controls) ---------- */
  function renderChrome() {
    document.documentElement.lang = lang;
    document.title = ui("pageTitle");

    $all("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key === "themeBtn") return;
      if (UI[key]) el.textContent = ui(key);
    });

    $("#tabs").setAttribute("aria-label", ui("navLabel"));

    var counts = {
      writeups: D.writeups.length,
      utilities: D.utilities.length,
      certificates: D.certificates.reduce(function (n, g) { return n + g.items.length; }, 0)
    };
    Object.keys(counts).forEach(function (k) { $("#count-" + k).textContent = counts[k]; });

    $("#links").innerHTML = LINK_LABELS.map(function (l) {
      var external = l[0] !== "email";
      return '<li><a href="' + esc(D.links[l[0]]) + '"' + (external ? ' target="_blank" rel="noopener"' : "") + '>' +
        esc(l[1]) + ' <span class="muted">' + esc(l[2]) + '</span></a></li>';
    }).join("");

    var langBtn = $("#lang-btn");
    langBtn.textContent = lang === "en" ? "RU" : "EN";
    langBtn.setAttribute("aria-label", ui("langAria"));

    var themeBtn = $("#theme-btn");
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeBtn.textContent = isDark ? ui("themeToLight") : ui("themeToDark");
    themeBtn.setAttribute("aria-label", ui("themeAria"));
  }

  /* ---------- Routing ---------- */
  function tabFromHash() {
    var h = (location.hash || "").replace("#", "");
    return TABS.indexOf(h) >= 0 ? h : "about";
  }

  function renderPanel(tab) {
    $("#panel-" + tab).innerHTML = RENDER[tab]();
  }

  function show(tab, moveFocus, keepScroll) {
    current = tab;
    TABS.forEach(function (t) {
      var panel = $("#panel-" + t);
      var isCurrent = t === tab;
      panel.hidden = !isCurrent;
      if (isCurrent) renderPanel(t);
      else panel.innerHTML = "";
    });
    $all("#tabs a").forEach(function (a) {
      if (a.getAttribute("data-tab") === tab) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    document.title = tab === "about" ? ui("pageTitle") : ui(TAB_TITLES[tab]) + ", " + ui("pageTitle");
    if (!keepScroll) window.scrollTo(0, 0);
    if (moveFocus) {
      var h = $("#title-" + tab);
      if (h) h.focus({ preventScroll: true });
    }
  }

  /* ---------- Events ---------- */
  window.addEventListener("hashchange", function () { show(tabFromHash(), true); });

  document.addEventListener("click", function (e) {
    var f = e.target.closest && e.target.closest("[data-filter]");
    if (!f) return;
    var group = f.getAttribute("data-group");
    var key = f.getAttribute("data-filter");
    if (group === "diff") fDiff = key; else fCat = key;
    renderPanel("writeups");
    var again = $('[data-group="' + group + '"][data-filter="' + key + '"]');
    if (again) again.focus();
  });

  $("#lang-btn").addEventListener("click", function () {
    lang = lang === "en" ? "ru" : "en";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    renderChrome();
    show(current, false, true);
  });

  $("#theme-btn").addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#1F2230" : "#EEECF2");
    renderChrome();
  });

  /* ---------- Init ---------- */
  renderChrome();
  show(tabFromHash(), false);
})();
