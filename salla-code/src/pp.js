/* Panorama Print · Salla Raed customization · KQ */
(function () {
  'use strict';
  if (window.__ppLoaded) return;
  window.__ppLoaded = true;

  /* ===================== CONFIG — عدّل هنا فقط ===================== */
  var STORE = 'https://salla.sa/panoramaprint/';
  var WA = '966509050013';
  var CFG = {
    A: '__ASSETS__',
    // روابط الأقسام في المتجر
    c: {
      print: STORE + 'المطبوعات-الورقية-والكروت/c399976297',
      stickers: STORE + 'الإستيكرات-والملصقات/c1598858101',
      pack: STORE + 'الأكياس-والبوكسات/c690602614',
      gifts: STORE + 'الهدايا-الدعائية-والدروع/c1738803320',
      flags: STORE + 'الأعلام/c366995839'
    },
    // منتجات بعينها
    p: {
      bizcards: STORE + 'كروت-أعمال-ورق-350-جرام/p228938866'
    },
    u: {
      shop: '#pp-cats',
      offers: STORE + 'offers'
    },
    wa: {
      chat: wa('السلام عليكم، عندي استفسار عن منتجات بانوراما برينت'),
      quote: wa('السلام عليكم، أبغى عرض سعر لمشروع'),
      design: wa('السلام عليكم، أبغى أطلب تصميم'),
      q_signs: wa('السلام عليكم، أبغى عرض سعر للوحات والواجهات'),
      q_events: wa('السلام عليكم، أبغى عرض سعر للمعارض والفعاليات'),
      q_vehicles: wa('السلام عليكم، أبغى عرض سعر للبنرات وستيكرات السيارات'),
      q_identity: wa('السلام عليكم، أبغى عرض سعر لتصميم هوية بصرية')
    },
    // «الأكثر طلبًا»: أرقام المنتجات بالترتيب، وأزرار الفلترة
    best: {
      all: [228938866, 285921821, 906362107, 1484285216, 1494199982, 1989135050, 1316732122, 877722010],
      chips: [
        { label: 'المطبوعات والكروت', cat: 399976297 },
        { label: 'الاستيكرات', cat: 1598858101 },
        { label: 'الأعلام', cat: 366995839 }
      ]
    },
    // «قسم الشهر»
    feat: {
      cat: 1598858101,
      title: 'الاستيكرات والملصقات',
      text: 'ستيكرات ورقية وشفافة وفينيل للسيارات والواجهات وذهبي ميتاليك، بقص دقيق وسعر واضح لكل كمية',
      img: '__ASSETS__/hero-stickers.webp',
      url: STORE + 'الإستيكرات-والملصقات/c1598858101',
      chips: [
        { label: 'ستيكر ورقي', href: STORE + 'ستيكر-ورقي-لاصق-طباعة-ملونة/p285921821' },
        { label: 'ستيكر شفاف', href: STORE + 'ستيكر-شفاف-مقاسات-مختارة/p906362107' },
        { label: 'فينيل للسيارات', href: STORE + 'ستيكر-فينيل-للسيارات-والواجهات/p1447937959' },
        { label: 'ذهبي ميتاليك', href: STORE + 'ستيكر-ذهبي-ومرايا-ميتاليك/p1316732122' }
      ]
    },
    // شريط «الأكثر طلبًا» أعلى صفحة القسم: يظهر لو القسم فيه min منتج أو أكثر
    top5: { title: 'الأكثر طلبًا في القسم', sub: 'حسب عدد الطلبات', limit: 5, min: 8 },
    // أيقونة كل قسم في قائمة «كل الأقسام» حسب كلمة في اسمه
    icons: [
      ['ستيكر', 'c-stickers'], ['استيكر', 'c-stickers'], ['ملصق', 'c-stickers'],
      ['مطبوع', 'c-print'], ['كروت', 'c-print'], ['فواتير', 'c-print'], ['بروش', 'c-print'],
      ['أكياس', 'c-pack'], ['بوكس', 'c-pack'], ['تغليف', 'c-pack'], ['علب', 'c-pack'],
      ['هدايا', 'c-gifts'], ['دروع', 'c-gifts'], ['توزيعات', 'c-gifts'],
      ['لوحات', 'c-signs'], ['ستاند', 'c-events'], ['أعلام', 'c-events'], ['الأعلام', 'c-events'],
      ['سيار', 'c-vehicles'], ['هوية', 'c-identity'], ['الوطني', 'c-identity'], ['المدارس', 'c-print'], ['خصومات', 'i-tag']
    ]
  };
  function wa(t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); }
  /* ================================================================ */

  var TPL_HOME = '__HOME__';
  var SPRITE = '__SPRITE__';

  var doc = document, body = null;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fill(html) {
    return html.replace(/\{\{([\w.]+)\}\}/g, function (m, key) {
      if (key === 'feat.chips') {
        return CFG.feat.chips.map(function (c) { return '<a href="' + c.href + '" class="fchip">' + c.label + '</a>'; }).join('');
      }
      var v = key.split('.').reduce(function (o, k) { return o && o[k]; }, CFG);
      return v == null ? '' : String(v);
    });
  }
  function el(html) { var d = doc.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }
  function ic(id, cls) { return '<svg class="ic ' + (cls || '') + '"><use href="#' + id + '"/></svg>'; }

  function sprite() {
    if ($('#pp-sprite')) return;
    var s = el(SPRITE);
    s.id = 'pp-sprite';
    body.insertBefore(s, body.firstChild);
  }

  function tracks(root) {
    $$('.track', root).forEach(function (t) {
      if (t.dataset.ppCloned) return;
      t.dataset.ppCloned = '1';
      var r = $('.trow', t);
      for (var i = 0; i < 2; i++) { var c = r.cloneNode(true); c.setAttribute('aria-hidden', 'true'); t.appendChild(c); }
    });
  }

  function productsList(src, val, limit, sort) {
    var l = doc.createElement('salla-products-list');
    l.setAttribute('source', src);
    if (val != null) l.setAttribute('source-value', JSON.stringify(val));
    if (limit) l.setAttribute('limit', String(limit));
    if (sort) l.setAttribute('sort-by', sort);
    return l;
  }

  /* ---------- category page: top 5 best sellers strip */
  function top5() {
    if (!body.classList.contains('product-index')) return;
    var list = $('salla-products-list[source="product.index"]');
    var id = list && +list.getAttribute('source-value');
    if (!id || $('.pp-top5')) return;
    var row = list.parentElement;
    var sec = el('<section class="pp pp-top5" hidden aria-label="الأكثر طلبًا في القسم"><div class="pp-top5-head"><h2>' + CFG.top5.title + '</h2><span>' + CFG.top5.sub + '</span></div><div class="pp-top5-grid"></div></section>');
    row.parentNode.insertBefore(sec, row);
    $('.pp-top5-grid', sec).appendChild(productsList('categories', [id], CFG.top5.limit, 'bestSell'));
    var tries = 0;
    var check = setInterval(function () {
      tries++;
      var n = $$('custom-salla-product-card', list).length;
      var m = $$('custom-salla-product-card', sec).length;
      if ((n >= CFG.top5.min && m >= 3) || tries > 20) {
        clearInterval(check);
        if (n >= CFG.top5.min && m >= 3) sec.hidden = false; else sec.remove();
      }
    }, 500);
  }

  /* ---------- hero press sheet */
  function hero(root) {
    var tabs = $$('.sheet-tabs button', root);
    if (!tabs.length) return;
    var si = 0;
    var go = function (i) {
      si = (i + 3) % 3;
      $$('#copies > *, #banners > *, .stk', root).forEach(function (e) {
        var on = +e.dataset.slide === si;
        e.classList.toggle('is-on', on);
        if (e.classList.contains('copy-slide')) {
          e.setAttribute('aria-hidden', String(!on));
          $$('a', e).forEach(function (a) { on ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1'); });
        }
      });
      tabs.forEach(function (t, k) {
        t.setAttribute('aria-selected', String(k === si));
        var bar = $('.bar i', t); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
      });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { go(i); });
      $('.bar i', t).addEventListener('animationend', function () { if (+t.dataset.go === si) go(si + 1); });
    });
    go(0);
  }

  /* ---------- best sellers with chips */
  function best(root) {
    var box = $('#ppBest', root), chips = $('#homeChips', root), more = $('#ppBestMore', root);
    if (!box || !chips) return;
    chips.innerHTML = '<button class="fchip" aria-pressed="true" data-cat="all">الكل</button>' +
      CFG.best.chips.map(function (c) { return '<button class="fchip" aria-pressed="false" data-cat="' + c.cat + '">' + c.label + '</button>'; }).join('');
    var render = function (cat) {
      box.innerHTML = '';
      box.appendChild(cat === 'all' ? productsList('selected', CFG.best.all) : productsList('categories', [+cat], 8));
      if (more) {
        var url = '#pp-cats';
        if (cat !== 'all') { for (var k in CFG.c) { if (CFG.c[k].indexOf('/c' + cat) > -1) url = CFG.c[k]; } }
        more.setAttribute('href', url);
      }
    };
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      $$('button', chips).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      render(b.dataset.cat);
    });
    render('all');
  }

  /* ---------- mega menu «كل الأقسام» */
  var megaOpen = function () {};
  function iconFor(title) {
    for (var i = 0; i < CFG.icons.length; i++) if (title.indexOf(CFG.icons[i][0]) > -1) return CFG.icons[i][1];
    return 'i-grid';
  }
  function mega() {
    var nav = $('#mainnav'), wrap = nav && $('#mainnav .container > div');
    if (!wrap || $('#pp-allcats')) return;
    var btn = el('<button type="button" class="pp pp-allcats" id="pp-allcats" aria-expanded="false" aria-controls="pp-mega">' + ic('i-grid') + '<span>كل الأقسام</span></button>');
    var menu = $('custom-main-menu', wrap);
    var brandBox = menu ? menu.parentElement : wrap.firstElementChild;
    brandBox.insertBefore(btn, menu || null);
    var quote = el('<a class="pp pp-quote-top" href="' + CFG.wa.quote + '" target="_blank" rel="noopener">اطلب عرض سعر</a>');
    var right = wrap.lastElementChild;
    if (right && right !== brandBox) {
      right.insertBefore(quote, right.firstChild);
      // spacer so Raed's «المزيد» overflow math counts our button
      wrap.insertBefore(el('<span class="pp-nav-spacer" aria-hidden="true"></span>'), right);
    }
    var kick = function () { try { window.dispatchEvent(new Event('resize')); } catch (e) {} };
    setTimeout(kick, 600); setTimeout(kick, 2000);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(kick);

    var panel = el('<div class="pp pp-mega" id="pp-mega" role="region" aria-label="كل الأقسام"><div class="pp-mega-in"><div class="pp-mega-grid"></div><div class="ppm-foot"><span>ما لقيت قسمك؟ اطلب عرض سعر لأي منتج مطبوع</span><a href="' + CFG.wa.quote + '" target="_blank" rel="noopener">اطلب عرض سعر' + ic('i-arrow', 'sm') + '</a></div></div></div>');
    nav.appendChild(panel);
    var grid = $('.pp-mega-grid', panel);

    var setOpen = function (o) { panel.classList.toggle('open', o); btn.setAttribute('aria-expanded', String(o)); };
    megaOpen = function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); setTimeout(function () { setOpen(true); }, reduce ? 0 : 250); };
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!panel.classList.contains('open')); });
    doc.addEventListener('click', function (e) { if (!panel.contains(e.target) && e.target !== btn) setOpen(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    var build = function (menus) {
      grid.innerHTML = (menus || []).map(function (m) {
        var kids = (m.children || []).map(function (c) { return '<a href="' + c.url + '">' + c.title + '</a>'; }).join('');
        return '<div class="ppm-col"><a class="ppm-h" href="' + m.url + '"><i>' + '<svg><use href="#' + iconFor(m.title) + '"/></svg>' + '</i><span>' + m.title + '</span></a>' +
          (kids ? '<div class="ppm-k">' + kids + '</div>' : '<a class="ppm-all" href="' + m.url + '">تسوّق القسم' + ic('i-arrow', 'sm') + '</a>') + '</div>';
      }).join('');
    };
    try {
      salla.onReady().then(function () { return salla.api.component.getMenus(); }).then(function (r) { build(r && r.data); });
    } catch (e) { /* salla not ready */ }
  }

  /* ---------- tape break above footer (all pages) */
  function tapeBreak() {
    var f = $('footer.store-footer');
    if (!f || $('.pp-tapebreak')) return;
    var words = ['الطباعة الرقمية', 'الاستيكرات والملصقات', 'التغليف والعلب', 'الهدايا والدروع', 'اللوحات والواجهات', 'المعارض والفعاليات', 'البنرات والسيارات', 'الهوية البصرية'];
    var row = function (cls) {
      return '<div class="tape ' + cls + '" aria-hidden="true"><div class="track"><div class="trow">' +
        words.map(function (w) { return '<span>' + w + '</span><svg class="star4"><use href="#i-star4"/></svg>'; }).join('') + '</div></div></div>';
    };
    var tb = el('<div class="pp pp-tapebreak"><div class="tapebreak">' + row('tb-org') + row('tb-grad') + '</div></div>');
    f.parentNode.insertBefore(tb, f);
    tracks(tb);
  }

  /* ---------- home */
  function home() {
    if (!body.classList.contains('index')) return;
    var main = $('main#main-content');
    if (!main || $('#pp-home')) return;
    var root = el('<div class="pp pp-home" id="pp-home">' + fill(TPL_HOME) + '</div>');
    main.insertBefore(root, main.firstChild);
    tracks(root);
    hero(root);
    best(root);
    var feat = $('#ppFeat', root);
    if (feat) feat.appendChild(productsList('categories', [CFG.feat.cat], 2));
    $$('[data-pp-allcats]', root).forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.innerWidth >= 1024 && $('#pp-mega')) megaOpen();
        else { var b = $('.mburger'); if (b) b.click(); }
      });
    });
    $$('a[href^="#pp-"]', root).forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = $(a.getAttribute('href')); if (!t) return;
        e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });
    body.classList.add('pp-home-on');
  }

  function fonts() {
    if ($('link[data-pp-font]')) return;
    var l = doc.createElement('link');
    l.rel = 'stylesheet'; l.setAttribute('data-pp-font', '1');
    l.href = 'https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800;900&display=swap';
    doc.head.appendChild(l);
  }

  function init() {
    body = doc.body;
    try { fonts(); } catch (e) {}
    try { sprite(); } catch (e) { console.warn('pp sprite', e); }
    try { home(); } catch (e) { console.warn('pp home', e); body.classList.remove('pp-home-on'); }
    try { mega(); } catch (e) { console.warn('pp mega', e); }
    try { tapeBreak(); } catch (e) { console.warn('pp tape', e); }
    try { top5(); } catch (e) { console.warn('pp top5', e); }
    body.classList.add('pp-ready');
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})();
