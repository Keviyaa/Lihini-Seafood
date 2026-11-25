/* ==========================================================================
   LIHINI SEAFOODS — SITE SCRIPT
   Builds the shared header/footer, the fish library, maps, forms and all the
   scroll animations. Contact details live in config.js, content in data.js.
   ========================================================================== */
(function () {
  'use strict';

  const d = document, root = d.documentElement, body = d.body;
  const C = window.LIHINI || {};
  const page = body.getAttribute('data-page') || '';
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const $ = (s, r) => (r || d).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || d).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const FISH = window.FISH || [], DIVES = window.DIVES || [], CERTS = window.CERTS || [], CATS = window.FISH_CATEGORIES || [];

  /* ------------------------------------------------------------------ icons */
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    external: '<path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    directions: '<path d="M12 3l9 9-9 9-9-9 9-9Z"/><path d="M9 14v-2.5a1 1 0 0 1 1-1h5m0 0-2-2m2 2-2 2"/>',
    fish: '<path d="M2.5 12C5.5 7 10 6 14 8l6-3.5v15L14 16c-4 2-8.5 1-11.5-4Z"/><circle cx="7.5" cy="11" r=".9" fill="currentColor"/>',
    boat: '<path d="M3 15h18l-2.5 4.5h-13L3 15Z"/><path d="M12 3v12M12 4c3 2.2 5 5 5.4 9H12M12 7c-2 1.6-3.4 3.8-3.9 6H12"/>',
    snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
    box: '<path d="M3 8l9-5 9 5v8l-9 5-9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.4 1 2 2 2 0-3-.5-5 1-8Z"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h4l4 3.5V16h-8"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    heart: '<path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20Z"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3Z"/><path d="m8.5 12 2.5 2.5L16 9.5"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
    store: '<path d="M3 9l1.5-5h15L21 9a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z"/><path d="M5 12v8h14v-8"/>',
    wave: '<path d="M2 9c2.5-3 5-3 7.5 0s5 3 7.5 0 3-2 5-1M2 15c2.5-3 5-3 7.5 0s5 3 7.5 0 3-2 5-1"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
    download: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
    send: '<path d="M21 3 10 14M21 3l-6.5 18-3.5-7-7-3.5L21 3Z"/>',
    plate: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".9" fill="currentColor"/>',
    tiktok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.3 2.3 1.9 4 4.5 4.2"/>',
    youtube: '<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor"/>',
    whatsapp: '<path d="M4 20l1.3-4.2A8.5 8.5 0 1 1 8.4 18.8L4 20Z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 8.5Z"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5m0 2c0-1.5 1-2.5 2.3-2.5S16 11 16 12.5V16"/>'
  };
  const ic = (name, cls) => '<svg class="icon icon-' + name + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || P.link) + '</svg>';
  const hydrateIcons = (scope) => $$('[data-ic]', scope).forEach((el) => {
    const t = d.createElement('template');
    t.innerHTML = ic(el.getAttribute('data-ic'), el.className);
    el.replaceWith(t.content.firstChild);
  });

  /* The fin from the logo, redrawn as a vector so it can animate and be tinted */
  const finSvg = (cls) => '<svg class="' + cls + '" viewBox="0 0 1260 780" fill="currentColor" aria-hidden="true"><path d="M7 8C125 8 215 25 305 53Q291 70 291 100V188C205 115 105 55 7 8Z"/><path d="M440 100C495 122 545 148 590 176 645 300 675 420 673 520 672 570 667 610 657 648 595 510 525 410 440 324Z"/><path d="M616 192C875 345 1105 545 1255 776L482 778 667 675C695 580 700 480 680 380 665 300 640 245 616 192Z"/></svg>';

  /* --------------------------------------------------------- illustrations */
  const FA = {
    tuna: '<path class="fb" d="M78 46 L92 18 L112 48Z"/><path class="fb" d="M84 80 L96 106 L114 78Z"/><path class="fa" d="M10 62C36 30 92 26 142 50L178 32 164 62 178 92 142 74C92 98 36 94 10 62Z"/><path class="fb" d="M16 68C56 86 106 86 142 70 106 94 48 94 16 68Z" opacity=".55"/><path class="sc" d="M54 46C62 58 62 68 54 80" stroke-width="3" stroke-linecap="round"/><circle class="fc" cx="34" cy="56" r="5"/><circle fill="#fff" cx="35.6" cy="54.4" r="1.6"/>',
    deep: '<path class="fb" d="M54 34 L78 8 L112 14 L134 40Z"/><path class="fa" d="M8 62C28 22 100 14 142 42L184 22 170 62 184 102 142 82C100 110 28 102 8 62Z"/><path class="fb" d="M62 72Q76 92 94 78 78 70 62 72Z"/><path class="sc" d="M52 40C62 56 62 70 52 86" stroke-width="3" stroke-linecap="round"/><circle class="fc" cx="30" cy="56" r="6"/><circle fill="#fff" cx="32" cy="54" r="2"/>',
    long: '<path class="fb" d="M92 49 L104 32 L124 52Z"/><path class="fa" d="M4 60C28 46 84 44 150 54L188 34 176 60 188 86 150 66C84 76 28 74 4 60Z"/><path class="fb" d="M10 63C60 72 110 72 150 62 110 80 50 78 10 63Z" opacity=".55"/><path class="sc" d="M44 50C50 58 50 62 44 70" stroke-width="3" stroke-linecap="round"/><circle class="fc" cx="26" cy="56" r="4.5"/><circle fill="#fff" cx="27.4" cy="54.6" r="1.4"/>',
    flat: '<path class="fb" d="M96 16 L120 2 L130 26Z"/><path class="fa" d="M10 60Q56 6 104 12 136 18 152 46L186 28 174 60 186 92 152 74Q136 102 104 108 56 114 10 60Z"/><path class="sc" d="M62 34C74 52 74 70 62 88" stroke-width="3" stroke-linecap="round"/><circle class="fc" cx="36" cy="54" r="5"/><circle fill="#fff" cx="37.5" cy="52.5" r="1.6"/>',
    prawn: '<path class="sb" d="M32 40C20 28 12 22 4 8M38 36C34 22 38 14 36 4" stroke-width="2.5" stroke-linecap="round"/><path class="fa" d="M28 46C56 8 150 8 174 54 186 78 164 104 134 100 150 86 146 68 124 58 98 48 72 58 52 70L38 68Z"/><path class="fb" d="M134 100L158 116 122 112 112 96Z"/><path class="sc" d="M78 20C82 36 80 46 74 54M104 18C110 34 108 46 100 52M130 22C138 36 136 46 128 54" stroke-width="3" stroke-linecap="round" opacity=".5"/><path class="sb" d="M56 70L46 88M70 66L64 86M84 62L80 82" stroke-width="3.5" stroke-linecap="round"/><circle class="fc" cx="38" cy="52" r="4"/>',
    crab: '<path class="sb" d="M44 78L18 96M50 88L28 108M156 78L182 96M150 88L172 108M62 96L48 116M138 96L152 116" stroke-width="5" stroke-linecap="round"/><path class="fb" d="M36 60C6 58 2 28 22 18 26 34 38 36 46 44Z"/><path class="fb" d="M164 60C194 58 198 28 178 18 174 34 162 36 154 44Z"/><path class="fa" d="M100 28C150 28 178 52 170 76 162 98 132 104 100 104 68 104 38 98 30 76 22 52 50 28 100 28Z"/><path class="sc" d="M60 54C80 44 120 44 140 54" stroke-width="3" stroke-linecap="round" opacity=".4"/><circle class="fc" cx="86" cy="38" r="5"/><circle class="fc" cx="114" cy="38" r="5"/>',
    squid: '<path class="sb" d="M64 56C50 48 34 52 14 42M64 60C48 60 30 62 8 62M64 64C50 72 34 72 16 82M66 68C54 80 46 92 30 102" stroke-width="6" stroke-linecap="round"/><path class="fb" d="M150 60L190 26 197 60 190 94Z"/><path class="fa" d="M58 60C90 22 150 22 186 60 150 98 90 98 58 60Z"/><path class="sc" d="M112 40C122 54 122 66 112 80" stroke-width="3" stroke-linecap="round" opacity=".35"/><circle class="fc" cx="78" cy="56" r="5.5"/><circle fill="#fff" cx="79.6" cy="54.4" r="1.7"/>',
    shell: '<path class="fa" d="M100 14C152 14 186 54 186 92L14 92C14 54 48 14 100 14Z"/><path class="sb" d="M100 92V20M100 92L58 26M100 92L148 26M100 92L30 44M100 92L172 44M100 92L18 68M100 92L182 68" stroke-width="3" opacity=".55"/><path class="fb" d="M22 92H178L168 106H32Z"/>',
    dried: '<path class="fa" d="M14 60C48 34 112 32 168 54L192 40 184 60 192 80 168 66C112 88 48 86 14 60Z"/><path class="sc" d="M48 44L42 76M64 41L58 79M80 40L75 80M96 40L92 80M112 41L109 79M128 43L126 76" stroke-width="2.5" opacity=".35"/><circle class="fc" cx="30" cy="56" r="3.6"/>'
  };
  const fishSvg = (shape) => '<svg class="art" viewBox="0 0 200 120" aria-hidden="true">' + (FA[shape] || FA.tuna) + '</svg>';
  const crumbs = (pts) => pts.map((p) => '<circle class="fc" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (p[2] || 2.2) + '" opacity=".45"/>').join('');
  const DA = {
    roll: '<g transform="rotate(-14 100 62)"><rect class="fb" x="26" y="40" width="148" height="50" rx="25"/><rect class="fa" x="26" y="34" width="148" height="50" rx="25"/><ellipse class="fd" cx="158" cy="59" rx="12" ry="20"/><ellipse class="fc" cx="158" cy="59" rx="6" ry="11" opacity=".35"/><rect class="fd" x="44" y="42" width="96" height="9" rx="4.5" opacity=".5"/>' + crumbs([[54, 66], [72, 72], [92, 64], [112, 72], [130, 66], [64, 56], [100, 56]]) + '</g>',
    cutlet: '<g transform="rotate(-10 100 60)"><ellipse class="fb" cx="100" cy="70" rx="74" ry="36"/><ellipse class="fa" cx="100" cy="62" rx="74" ry="36"/><ellipse class="fd" cx="80" cy="46" rx="34" ry="9" opacity=".55"/>' + crumbs([[60, 62], [84, 74], [110, 66], [136, 72], [150, 56], [120, 50], [74, 58], [102, 78]]) + '</g>',
    patty: '<path class="fb" d="M18 98A82 66 0 0 1 182 98Z"/><path class="fa" d="M18 90A82 66 0 0 1 182 90Z"/><path class="sc" d="M20 90H180" stroke-width="7" stroke-dasharray="3 8" stroke-linecap="round" opacity=".45"/><path class="sd" d="M42 74A64 50 0 0 1 96 40" stroke-width="6" stroke-linecap="round" opacity=".6"/>' + crumbs([[70, 70], [100, 62], [130, 72], [90, 80], [150, 80], [56, 82]]),
    ball: '<circle class="fb" cx="62" cy="84" r="32"/><circle class="fa" cx="62" cy="78" r="32"/><circle class="fd" cx="50" cy="66" r="9" opacity=".6"/><circle class="fb" cx="134" cy="84" r="32"/><circle class="fa" cx="134" cy="78" r="32"/><circle class="fd" cx="122" cy="66" r="9" opacity=".6"/><circle class="fb" cx="98" cy="46" r="32"/><circle class="fa" cx="98" cy="40" r="32"/><circle class="fd" cx="86" cy="28" r="9" opacity=".6"/>' + crumbs([[56, 86], [70, 90], [128, 88], [142, 84], [92, 50], [106, 46]]),
    finger: '<g transform="rotate(-16 100 62)"><rect class="fb" x="30" y="23" width="140" height="24" rx="12"/><rect class="fa" x="30" y="19" width="140" height="24" rx="12"/><rect class="fb" x="30" y="53" width="140" height="24" rx="12"/><rect class="fa" x="30" y="49" width="140" height="24" rx="12"/><rect class="fb" x="30" y="83" width="140" height="24" rx="12"/><rect class="fa" x="30" y="79" width="140" height="24" rx="12"/>' + crumbs([[60, 31], [100, 35], [140, 29], [70, 61], [120, 65], [90, 91], [140, 95], [52, 95]]) + '</g>',
    samosa: '<path class="fb" d="M100 28L184 106H16Z" style="stroke:var(--art-b)" stroke-width="16" stroke-linejoin="round" transform="translate(0 4)"/><path class="fa" d="M100 24L180 98H20Z" style="stroke:var(--art-a)" stroke-width="16" stroke-linejoin="round"/><path class="sd" d="M100 40L42 94" stroke-width="5" stroke-linecap="round" opacity=".6"/><path class="sc" d="M56 98H150" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round" opacity=".4"/>',
    prawn: '<path class="fb" d="M42 90C32 50 92 24 142 44 172 56 178 90 152 104 142 86 122 72 98 76 76 80 66 102 42 90Z"/><path class="fa" d="M42 84C32 44 92 18 142 38 172 50 178 84 152 98 142 80 122 66 98 70 76 74 66 96 42 84Z"/><path class="fa" d="M152 98L182 112 146 112Z"/><path class="fb" d="M152 98L182 112 146 112Z" opacity=".5"/><path class="sd" d="M56 64C70 44 100 34 126 40" stroke-width="5" stroke-linecap="round" opacity=".6"/>' + crumbs([[70, 66], [96, 52], [124, 56], [146, 70], [96, 74]]),
    burger: '<path class="fb" d="M26 82H174C174 100 154 108 100 108 46 108 26 100 26 82Z"/><path class="fa" d="M26 58C26 14 174 14 174 58Z"/><ellipse class="fd" cx="70" cy="34" rx="5" ry="2.6" transform="rotate(-20 70 34)"/><ellipse class="fd" cx="100" cy="26" rx="5" ry="2.6"/><ellipse class="fd" cx="130" cy="34" rx="5" ry="2.6" transform="rotate(20 130 34)"/><ellipse class="fd" cx="86" cy="44" rx="5" ry="2.6"/><ellipse class="fd" cx="116" cy="44" rx="5" ry="2.6"/><path d="M24 62q10 9 20 0t20 0 20 0 20 0 20 0 20 0 20 0 8 0" fill="none" stroke="#7bc96f" stroke-width="7" stroke-linecap="round"/><rect class="fc" x="22" y="66" width="156" height="16" rx="8"/>'
  };
  const diveSvg = (shape) => '<svg class="art" viewBox="0 0 200 120" aria-hidden="true">' + (DA[shape] || DA.cutlet) + '</svg>';

  /* ----------------------------------------------------------------- helpers */
  const catLabel = (id) => (CATS.find((c) => c.id === id) || { label: '' }).label;
  const CAT_COL = { tuna: ['#102a4a', '#367cbf'], reef: ['#367cbf', '#1fa5df'], small: ['#0fa68e', '#6fe0cc'], crustacean: ['#e2502f', '#ff9a6b'], cephalopod: ['#5b4bc4', '#a58cf0'], dried: ['#c9862b', '#f6c778'] };
  const wa = (text) => 'https://wa.me/' + (C.whatsappNumber || '') + (text ? '?text=' + encodeURIComponent(text) : '');
  const tel = () => 'tel:' + (C.phoneDigits || '');
  const mapsEmbed = (l) => 'https://www.google.com/maps?q=' + encodeURIComponent(l.mapQuery) + '&z=' + (l.zoom || 14) + '&output=embed';
  const mapsDir = (l) => 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(l.mapQuery);
  const outlets = () => (C.locations || []).filter((l) => /^outlet/.test(l.id));

  const NAV = [
    { id: 'home', href: 'index.html', label: 'Home' },
    { id: 'story', href: 'our-story.html', label: 'Our story' },
    { id: 'library', href: 'fish-library.html', label: 'Fish library' },
    { id: 'dives', href: 'dives.html', label: 'Dives' },
    { id: 'aluth', href: 'aluth-maalu.html', label: 'Aluth Maalu' },
    { id: 'certs', href: 'certifications.html', label: 'Certifications' },
    { id: 'contact', href: 'contact.html', label: 'Contact us' }
  ];
  const cur = (id) => (id === page ? ' aria-current="page"' : '');

  const socials = (cls) => {
    const s = C.social || {};
    return '<ul class="socials ' + (cls || '') + '">' + Object.keys(s).map((k) =>
      '<li><a href="' + esc(s[k].url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s[k].label) + '">' + ic(k) + '</a></li>').join('') + '</ul>';
  };

  /* ------------------------------------------------------- header / footer */
  function renderChrome() {
    const h = $('#site-header');
    if (h) {
      const desk = NAV.filter((n) => n.id !== 'home' && n.id !== 'contact').map((n) => '<a href="' + n.href + '"' + cur(n.id) + '>' + n.label + '</a>').join('');
      const menu = NAV.map((n, i) => '<li><a href="' + n.href + '" style="--i:' + i + '"' + cur(n.id) + '><small>0' + (i + 1) + '</small>' + n.label + '</a></li>').join('');
      h.outerHTML =
        '<header class="site-header" id="siteHeader"><div class="bar">' +
        '<a class="brand" href="index.html" aria-label="Lihini Seafoods — home"><img class="brand__dark" src="assets/img/logo-mark.png" width="119" height="46" alt="Lihini Seafoods"><img class="brand__light" src="assets/img/logo-mark-light.png" width="119" height="46" alt="" aria-hidden="true"></a>' +
        '<nav class="nav" aria-label="Primary">' + desk + '<a class="nav__cta" href="contact.html"' + cur('contact') + '>Contact us</a></nav>' +
        '<button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span><span></span><span></span></button>' +
        '</div></header>' +
        '<div class="menu" id="menu" aria-label="Menu"><ul class="menu__list">' + menu + '</ul>' +
        '<div class="menu__foot"><p>' + esc(C.tagline || '') + '</p><a href="' + tel() + '">' + esc(C.phone) + '</a><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>' + socials() + '</div></div>';
    }
    const f = $('#site-footer');
    if (f) {
      const hq = (C.locations || [])[0] || { address: [] };
      f.outerHTML =
        '<footer class="footer wave-top"><div class="container"><div class="footer__grid">' +
        '<div class="footer__brand"><img src="assets/img/logo-full-light.png" width="300" height="154" alt="Lihini Seafoods — ' + esc(C.tagline) + '" loading="lazy"><p>Fresh from the Ceylon coast to your table — Lihini Seafoods, Dives and Aluth Maalu.</p>' + socials() + '</div>' +
        '<div><h4>Explore</h4><ul>' + NAV.map((n) => '<li><a href="' + n.href + '">' + n.label + '</a></li>').join('') + '</ul></div>' +
        '<div><h4>Our brands</h4><ul><li><a href="index.html">Lihini Seafoods</a></li><li><a href="dives.html">Dives</a></li><li><a href="aluth-maalu.html">Aluth Maalu</a></li><li><a href="fish-library.html">Fish library</a></li></ul></div>' +
        '<div><h4>Visit &amp; call</h4><address>' +
        '<a href="contact.html#map">' + ic('pin') + '<span>' + hq.address.map(esc).join('<br>') + '</span></a>' +
        '<a href="' + tel() + '">' + ic('phone') + '<span>' + esc(C.phone) + '</span></a>' +
        '<a href="mailto:' + esc(C.email) + '">' + ic('mail') + '<span>' + esc(C.email) + '</span></a>' +
        '<span style="display:flex;gap:.7rem">' + ic('clock').replace('class="icon', 'style="color:var(--cyan);margin-top:.22em" class="icon') + '<span>' + esc(C.hours) + '</span></span>' +
        '</address></div></div>' +
        '<div class="footer__giant" aria-hidden="true">lihini</div></div>' +
        '<div class="footer__bar"><div class="container" style="display:flex;flex-wrap:wrap;gap:.6rem 2rem;justify-content:space-between;width:min(1240px,100% - 2.5rem)"><span>© ' + new Date().getFullYear() + ' Lihini Seafoods. All rights reserved.</span><span>True flavours of Ceylon seafood</span></div></div></footer>' +
        '<button class="to-top" type="button" aria-label="Back to top">' + ic('arrow') + '</button>';
    }
  }

  /* ------------------------------------------------------------ components */
  function fishCard(f, i, asLink) {
    const art = f.image ? '<img class="fcard__img" src="' + esc(f.image) + '" alt="' + esc(f.name) + '" loading="lazy">' : fishSvg(f.shape) + '<span class="fcard__soon">Photo soon</span>';
    const inner = '<span class="fcard__art">' + art + '</span><span class="fcard__body"><span class="fcard__cat">' + esc(catLabel(f.cat)) + '</span><span class="fcard__name">' + esc(f.name) + '</span><span class="fcard__forms">' + esc((f.forms || []).join(' · ')) + '</span></span><span class="fcard__more">' + ic('arrow') + '</span>';
    const attr = ' class="fcard" data-cat="' + esc(f.cat) + '" style="--i:' + Math.min(i, 18) + '"';
    return asLink
      ? '<a' + attr + ' href="fish-library.html?fish=' + encodeURIComponent(f.name) + '">' + inner + '</a>'
      : '<button' + attr + ' type="button" data-fish="' + esc(f.name) + '" aria-haspopup="dialog">' + inner + '</button>';
  }
  function diveCard(x) {
    const art = x.image ? '<img class="dcard__img" src="' + esc(x.image) + '" alt="' + esc(x.name) + '" loading="lazy">' : diveSvg(x.shape);
    return '<article class="dcard"><div class="dcard__art">' + (x.tag ? '<span class="dcard__tag">' + esc(x.tag) + '</span>' : '') + art + '</div><div class="dcard__body"><h3 class="dcard__name">' + esc(x.name) + '</h3><p class="dcard__desc">' + esc(x.desc) + '</p><span class="dcard__pack">' + esc(x.pack || '') + '</span></div></article>';
  }
  function certCard(c, compact) {
    const seal = c.logo ? '<img src="' + esc(c.logo) + '" alt="" style="width:72%;height:72%;object-fit:contain">' : 'Seal<br>/ logo';
    if (compact) return '<article class="cert"><div class="cert__seal">' + seal + '</div><span class="cert__area">' + esc(c.area) + '</span><h3>' + esc(c.title) + '</h3></article>';
    const btn = c.file ? '<a class="btn btn--ghost" href="' + esc(c.file) + '" target="_blank" rel="noopener">' + ic('download') + 'View certificate</a>' : '<a class="btn btn--ghost" aria-disabled="true" tabindex="-1">Document coming soon</a>';
    return '<article class="cert"><div class="cert__seal">' + seal + '</div><span class="cert__area">' + esc(c.area) + '</span><h3>' + esc(c.title) + '</h3><p>' + esc(c.scope) + '</p><div class="cert__meta"><span>Issued by: ' + esc(c.issuer) + '</span><span>' + esc(c.valid) + '</span></div>' + btn + '</article>';
  }
  function outletCard(l) {
    return '<article class="ocard"><span class="ocard__pin">' + ic('store') + '</span><div><span class="ocard__kind">' + esc(l.kind) + '</span><h3>' + esc(l.name) + '</h3></div><ul>' +
      '<li>' + ic('pin') + '<span>' + l.address.map(esc).join('<br>') + '</span></li><li>' + ic('clock') + '<span>' + esc(l.hours) + '</span></li><li>' + ic('phone') + '<a href="tel:' + esc((l.phone || '').replace(/[^+\d]/g, '')) + '">' + esc(l.phone) + '</a></li></ul>' +
      '<div class="btn-row"><a class="btn btn--primary" href="' + esc(mapsDir(l)) + '" target="_blank" rel="noopener">' + ic('directions') + 'Get directions</a></div></article>';
  }

  /* ---------------------------------------------------------------- mounts */
  const STAT_DEFAULT = [
    { value: 3, label: 'Brands, one family' },
    { value: 2, label: 'Aluth Maalu outlets' },
    { value: 'fish', suffix: '+', label: 'Seafood varieties in our library' },
    { value: 25, suffix: '+', label: 'Years of experience (placeholder)' }
  ];
  const MOUNT = {
    rail(el) {
      const n = parseInt(el.getAttribute('data-limit') || '12', 10);
      const pick = [];
      CATS.forEach((c) => FISH.filter((f) => f.cat === c.id).slice(0, 2).forEach((f) => pick.push(f)));
      el.innerHTML = pick.slice(0, n).map((f, i) => '<div>' + fishCard(f, i, true) + '</div>').join('') +
        '<div><a class="fcard fcard--all" href="fish-library.html"><strong>Explore the whole library</strong><span>' + FISH.length + ' varieties and counting</span><span class="btn btn--primary" style="--btn-fill:var(--navy-900)">Open library ' + ic('arrow', 'icon-arrow') + '</span></a></div>';
    },
    dives(el) {
      const n = parseInt(el.getAttribute('data-limit') || '99', 10);
      el.innerHTML = DIVES.slice(0, n).map((x, i) => '<div data-reveal style="--d:' + (i % 4) * 90 + '">' + diveCard(x) + '</div>').join('');
    },
    certs(el) {
      const n = parseInt(el.getAttribute('data-limit') || '99', 10), compact = el.hasAttribute('data-compact');
      el.innerHTML = CERTS.slice(0, n).map((c, i) => '<div data-reveal style="--d:' + (i % 4) * 90 + '">' + certCard(c, compact) + '</div>').join('');
    },
    outlets(el) { el.innerHTML = outlets().map((l, i) => '<div data-reveal style="--d:' + i * 120 + '">' + outletCard(l) + '</div>').join(''); },
    stats(el) {
      el.innerHTML = (window.STATS || STAT_DEFAULT).map((s, i) => {
        const v = s.value === 'fish' ? FISH.length : s.value;
        return '<div class="stat" data-reveal style="--d:' + i * 100 + '"><strong><span data-count="' + v + '">0</span>' + (s.suffix ? '<sup>' + esc(s.suffix) + '</sup>' : '') + '</strong><span>' + esc(s.label) + '</span></div>';
      }).join('');
    },
    socialtiles(el) {
      const col = { facebook: ['#1877f2', '#0b4fb3'], instagram: ['#f58529', '#8134af'], tiktok: ['#232323', '#ff2d55'], youtube: ['#ff2a2a', '#a50000'], whatsapp: ['#25d366', '#0c8a41'], linkedin: ['#0a66c2', '#073f7a'] };
      const s = C.social || {};
      el.innerHTML = Object.keys(s).map((k, i) => '<a class="stile" data-reveal="zoom" style="--a:' + (col[k] || ['#367cbf', '#153355'])[0] + ';--b:' + (col[k] || ['#367cbf', '#153355'])[1] + ';--d:' + i * 70 + '" href="' + esc(s[k].url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s[k].label) + '">' + ic(k) + '<small>' + esc(s[k].label) + '</small></a>').join('');
    },
    platforms(el) {
      const s = C.social || {};
      el.innerHTML = Object.keys(s).map((k) => '<a href="' + esc(s[k].url) + '" target="_blank" rel="noopener noreferrer"><span class="plat__ic">' + ic(k) + '</span><span style="min-width:0"><strong>' + esc(s[k].label) + '</strong><span>' + esc(s[k].handle || '') + '</span></span></a>').join('');
    },
    contactcards(el) {
      const row = (icn, label, val, href, ext) => (href ? '<a class="ccard" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' : '<div class="ccard">') +
        '<span class="ccard__ic">' + ic(icn) + '</span><span><small>' + label + '</small><strong>' + esc(val) + '</strong></span>' + (href ? '</a>' : '</div>');
      el.innerHTML = row('phone', 'Call us', C.phone, tel()) + row('whatsapp', 'WhatsApp', 'Chat with us', wa('Hello Lihini Seafoods!'), true) + row('mail', 'Email', C.email, 'mailto:' + C.email) + row('clock', 'Opening hours', C.hours);
    },
    marquee(el) {
      const kind = el.getAttribute('data-kind');
      const words = kind === 'brand' ? ['True flavours of Ceylon seafood', 'Lihini Seafoods', 'Dives', 'Aluth Maalu', 'Fresh from the coast']
        : FISH.map((f) => f.name).filter((n, i) => i % 2 === 0).slice(0, 14);
      const group = '<div class="marquee__group">' + words.map((w) => '<span>' + esc(w) + '</span><i></i>').join('') + '</div>';
      el.innerHTML = '<div class="marquee__track">' + group + group.replace('class="marquee__group"', 'class="marquee__group" aria-hidden="true"') + '</div>';
    },
    bubbles(el) {
      const n = parseInt(el.getAttribute('data-n') || '16', 10);
      let h = '';
      for (let i = 0; i < n; i++) h += '<i style="--x:' + rand(2, 98).toFixed(1) + '%;--s:' + rand(8, 34).toFixed(0) + 'px;--t:' + rand(11, 24).toFixed(1) + 's;--dl:' + (-rand(0, 20)).toFixed(1) + 's;--dx:' + rand(-30, 30).toFixed(0) + 'px"></i>';
      el.innerHTML = h;
    },
    school(el) {
      let h = '';
      const cols = ['#ffffff', '#ffffff', '#367cbf', '#1fa5df', '#ffffff'];
      for (let i = 0; i < 11; i++) {
        const r = Math.random() < .45;
        h += '<div class="sfish' + (r ? ' sfish--r' : '') + '" style="--y:' + rand(10, 62).toFixed(0) + '%;--w:' + rand(34, 96).toFixed(0) + 'px;--t:' + rand(26, 52).toFixed(0) + 's;--dl:' + (-rand(0, 40)).toFixed(0) + 's;--o:' + rand(.28, .6).toFixed(2) + ';--c:' + cols[i % cols.length] + '">' + fishSvg(['tuna', 'deep', 'long'][i % 3]) + '</div>';
      }
      el.innerHTML = h;
    },
    fin(el) { el.innerHTML = finSvg(el.getAttribute('data-class') || ''); el.replaceWith(el.firstChild); }
  };
  function mountAll() { $$('[data-mount]').forEach((el) => { const f = MOUNT[el.getAttribute('data-mount')]; if (f) f(el); }); }

  /* ------------------------------------------------------- text splitting */
  function splitEl(el, mode) {
    let idx = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(' ')); return; }
            const w = d.createElement('span');
            if (mode === 'w') {
              w.className = 'w';
              const s = d.createElement('span');
              s.textContent = p; s.style.setProperty('--wi', idx++);
              w.appendChild(s);
            } else { w.className = 'sw'; w.textContent = p; idx++; }
            frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    })(el);
    return idx;
  }

  /* ------------------------------------------------------------ behaviours */
  function initMenu() {
    const b = $('#burger');
    if (!b) return;
    const set = (open) => {
      body.classList.toggle('menu-open', open); body.classList.toggle('no-scroll', open);
      b.setAttribute('aria-expanded', open); b.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    b.addEventListener('click', () => set(!body.classList.contains('menu-open')));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && body.classList.contains('menu-open')) set(false); });
    window.matchMedia('(min-width: 1120px)').addEventListener && matchMedia('(min-width: 1120px)').addEventListener('change', (e) => { if (e.matches) set(false); });
  }

  function initScroll() {
    const hdr = $('#siteHeader'), top = $('.to-top');
    const journey = $('.journey'), steps = $$('.step', journey || d);
    const words = $$('[data-scrollwords]').map((el) => ({ el, ws: $$('.sw', el) }));
    const giants = $$('.footer__giant, .dives__giant');
    let last = 0, tick = false;
    const wide = matchMedia('(min-width: 900px)');
    function frame() {
      tick = false;
      const y = window.scrollY || 0, vh = innerHeight;
      if (hdr) {
        hdr.classList.toggle('is-solid', y > 24);
        const hide = !body.classList.contains('menu-open') && y > 360 && y > last + 4;
        if (hide || y < 360 || y < last - 4) { hdr.classList.toggle('is-hidden', hide); root.classList.toggle('header-hidden', hide); }
      }
      last = y;
      if (top) top.classList.toggle('show', y > 900);
      words.forEach((w) => {
        const r = w.el.getBoundingClientRect();
        const p = clamp((vh * .88 - r.top) / (vh * .55 + r.height * .6), 0, 1), n = w.ws.length;
        w.ws.forEach((s, i) => s.style.setProperty('--o', (0.16 + .84 * clamp(p * (n + 6) - i, 0, 1)).toFixed(2)));
      });
      if (journey) {
        const r = journey.getBoundingClientRect();
        const p = wide.matches ? clamp((vh * .82 - r.top) / (vh * .42), 0, 1) : clamp((vh * .6 - r.top) / r.height, 0, 1);
        journey.style.setProperty('--p', p.toFixed(3));
        steps.forEach((s, i) => s.classList.toggle('on', p >= (i + .4) / steps.length - .02));
      }
      giants.forEach((g) => {
        const r = g.getBoundingClientRect(), p = clamp(1 - r.top / (vh + r.height), 0, 1);
        g.style.transform = g.classList.contains('footer__giant') ? 'translateX(' + ((p - .5) * -9).toFixed(2) + 'vw)' : 'translateY(' + ((p - .5) * 90).toFixed(0) + 'px)';
      });
    }
    const req = () => { if (!tick) { tick = true; requestAnimationFrame(frame); } };
    addEventListener('scroll', req, { passive: true }); addEventListener('resize', req);
    frame();
    if (top) top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  }

  function initReveal() {
    const els = $$('[data-reveal],[data-split]');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(e));
    /* counters */
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, to = parseFloat(el.getAttribute('data-count')) || 0;
      if (reduce) { el.textContent = to; return; }
      const t0 = performance.now(), dur = 1700;
      (function step(t) {
        const k = clamp((t - t0) / dur, 0, 1), v = 1 - Math.pow(1 - k, 4);
        el.textContent = Math.round(to * v);
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    }), { threshold: .6 });
    $$('[data-count]').forEach((e) => cio.observe(e));
  }

  function initRails() {
    $$('.rail-wrap').forEach((w) => {
      const rail = $('.rail', w), prev = $('.prev', w), next = $('.next', w);
      if (!rail) return;
      const by = (dir) => rail.scrollBy({ left: dir * Math.max(280, rail.clientWidth * .6), behavior: 'smooth' });
      prev && prev.addEventListener('click', () => by(-1)); next && next.addEventListener('click', () => by(1));
    });
  }

  function initCanvas() {
    $$('canvas[data-bubbles]').forEach((c) => {
      const ctx = c.getContext('2d'); if (!ctx || reduce) return;
      let W = 0, H = 0, run = false, bs = [];
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const size = () => { const r = c.getBoundingClientRect(); W = r.width; H = r.height; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
      const mk = (init) => ({ x: Math.random() * W, y: init ? Math.random() * H : H + 20, r: rand(2, 11), v: rand(.25, .9), p: rand(0, 6.28), a: rand(.15, .45) });
      size(); for (let i = 0; i < 38; i++) bs.push(mk(true));
      addEventListener('resize', size);
      function loop() {
        if (!run) return;
        ctx.clearRect(0, 0, W, H);
        bs.forEach((b, i) => {
          b.y -= b.v; b.p += .012; b.x += Math.sin(b.p) * .45;
          if (b.y < -20) bs[i] = mk(false);
          ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283);
          ctx.strokeStyle = 'rgba(191,230,248,' + b.a + ')'; ctx.lineWidth = 1.4; ctx.stroke();
          ctx.beginPath(); ctx.arc(b.x - b.r * .35, b.y - b.r * .35, b.r * .22, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,' + b.a + ')'; ctx.fill();
        });
        requestAnimationFrame(loop);
      }
      new IntersectionObserver((es) => { const v = es[0].isIntersecting; if (v && !run) { run = true; loop(); } else if (!v) run = false; }).observe(c);
    });
  }

  /* --------------------------------------------------------- fish library */
  function initLibrary() {
    const grid = $('#fgrid'); if (!grid) return;
    const q = $('#fq'), sort = $('#fsort'), chipsEl = $('#fchips'), count = $('#fcount'), empty = $('#fempty');
    const state = { q: '', cat: 'all', sort: 'az' };
    chipsEl.innerHTML = '<button class="fchip" type="button" data-cat="all" aria-pressed="true">All<b>' + FISH.length + '</b></button>' +
      CATS.map((c) => '<button class="fchip" type="button" data-cat="' + c.id + '" aria-pressed="false">' + esc(c.label) + '<b>' + FISH.filter((f) => f.cat === c.id).length + '</b></button>').join('');
    function render() {
      const t = state.q.trim().toLowerCase();
      let list = FISH.filter((f) => (state.cat === 'all' || f.cat === state.cat) &&
        (!t || [f.name, f.local, (f.forms || []).join(' ')].join(' ').toLowerCase().indexOf(t) > -1));
      list = list.slice().sort((a, b) => state.sort === 'cat' ? (CATS.findIndex((c) => c.id === a.cat) - CATS.findIndex((c) => c.id === b.cat)) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
      grid.innerHTML = list.map((f, i) => fishCard(f, i, false)).join('');
      count.innerHTML = '<strong>' + list.length + '</strong> ' + (list.length === 1 ? 'variety' : 'varieties') + (state.cat !== 'all' ? ' in ' + esc(catLabel(state.cat)) : '');
      empty.classList.toggle('show', !list.length);
    }
    q.addEventListener('input', () => { state.q = q.value; render(); });
    sort.addEventListener('change', () => { state.sort = sort.value; render(); });
    chipsEl.addEventListener('click', (e) => {
      const b = e.target.closest('.fchip'); if (!b) return;
      state.cat = b.getAttribute('data-cat');
      $$('.fchip', chipsEl).forEach((x) => x.setAttribute('aria-pressed', x === b));
      render();
    });
    $('#fclear') && $('#fclear').addEventListener('click', () => { q.value = ''; state.q = ''; state.cat = 'all'; $$('.fchip', chipsEl).forEach((x, i) => x.setAttribute('aria-pressed', i === 0)); render(); });

    /* detail dialog */
    const dlg = d.createElement('dialog');
    dlg.className = 'modal'; dlg.setAttribute('aria-label', 'Fish details');
    d.body.appendChild(dlg);
    const close = () => { dlg.close ? dlg.close() : dlg.removeAttribute('open'); body.classList.remove('no-scroll'); };
    function open(name) {
      const f = FISH.find((x) => x.name === name); if (!f) return;
      const col = CAT_COL[f.cat] || CAT_COL.tuna;
      const fact = (k, v) => v ? '<div><dt>' + k + '</dt><dd>' + esc(v) + '</dd></div>' : '';
      dlg.innerHTML = '<div class="modal__card"><button class="modal__close" type="button" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '<div class="modal__art" style="--g1:' + col[0] + ';--g2:' + col[1] + '">' + (f.image ? '<img src="' + esc(f.image) + '" alt="' + esc(f.name) + '">' : fishSvg(f.shape) + '<span class="modal__soon">Photo coming soon</span>') + '</div>' +
        '<div class="modal__body"><span class="chip">' + esc(catLabel(f.cat)) + '</span><h2>' + esc(f.name) + '</h2>' + (f.local ? '<p class="local">' + esc(f.local) + '</p>' : '') +
        '<dl class="modal__facts">' + fact('Origin', f.origin || 'Details coming soon') + fact('Season', f.season || 'Details coming soon') + '</dl>' +
        '<h3>About</h3><p>' + esc(f.desc || 'A short description of this fish — flavour, texture and what makes it special — will appear here.') + '</p>' +
        '<h3>Available as</h3><div class="modal__tags">' + (f.forms || []).map((x) => '<span class="chip">' + esc(x) + '</span>').join('') + '</div>' +
        '<h3>Cooking ideas</h3><p>' + esc(f.cooking || 'Cooking suggestions will be added soon.') + '</p>' +
        '<div class="btn-row mt-1"><a class="btn btn--primary" href="' + esc(wa('Hello Lihini Seafoods, I would like to enquire about ' + f.name + '.')) + '" target="_blank" rel="noopener">' + ic('whatsapp') + 'Enquire on WhatsApp</a><a class="btn btn--ghost" href="contact.html">Contact us</a></div></div></div>';
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      body.classList.add('no-scroll');
    }
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('.modal__close')) close(); });
    dlg.addEventListener('close', () => body.classList.remove('no-scroll'));
    grid.addEventListener('click', (e) => { const b = e.target.closest('[data-fish]'); if (b) open(b.getAttribute('data-fish')); });
    render();
    const want = new URLSearchParams(location.search).get('fish');
    if (want) setTimeout(() => open(want), 900);
  }

  /* ------------------------------------------------------------------ maps */
  function initMaps() {
    $$('[data-mount="map"]').forEach((box) => {
      const only = box.getAttribute('data-only');
      const locs = (C.locations || []).filter((l) => !only || (only === 'outlets' ? /^outlet/.test(l.id) : l.id === only));
      if (!locs.length) return;
      box.classList.add('mapbox');
      if (box.hasAttribute('data-overlay')) box.classList.add('mapbox--overlay');
      box.innerHTML = (locs.length > 1 ? '<div class="mtabs" role="tablist" aria-label="Choose a location">' + locs.map((l, i) => '<button class="mtab" type="button" role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '">' + ic('pin') + esc(l.name) + '</button>').join('') + '</div>' : '') +
        '<div class="mstage"><iframe title="Map showing our location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><div class="mdetail" aria-live="polite"></div>';
      const frame = $('iframe', box), det = $('.mdetail', box);
      let loaded = false, idx = 0;
      function show(i) {
        idx = i; const l = locs[i];
        $$('.mtab', box).forEach((t, k) => t.setAttribute('aria-selected', k === i));
        det.innerHTML = '<span class="ocard__kind" style="color:var(--blue);font:700 .75rem var(--ff-body);letter-spacing:.16em;text-transform:uppercase">' + esc(l.kind) + '</span><h3>' + esc(l.name) + '</h3><ul><li>' + ic('pin') + '<span>' + l.address.map(esc).join('<br>') + '</span></li><li>' + ic('clock') + '<span>' + esc(l.hours) + '</span></li><li>' + ic('phone') + '<a href="tel:' + esc((l.phone || '').replace(/[^+\d]/g, '')) + '">' + esc(l.phone) + '</a></li></ul><div class="btn-row"><a class="btn btn--primary" href="' + esc(mapsDir(l)) + '" target="_blank" rel="noopener">' + ic('directions') + 'Get directions</a></div>';
        if (loaded) frame.src = mapsEmbed(l);
      }
      $$('.mtab', box).forEach((t) => t.addEventListener('click', () => show(+t.getAttribute('data-i'))));
      show(0);
      const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { loaded = true; frame.src = mapsEmbed(locs[idx]); io.disconnect(); } }, { rootMargin: '300px' });
      io.observe(box);
    });
  }

  /* --------------------------------------------------------------- contact */
  function initForm() {
    const form = $('#contactForm'); if (!form) return;
    const status = $('#formStatus');
    const val = () => {
      const g = (n) => (form.elements[n] ? form.elements[n].value.trim() : '');
      const topic = ($('input[name="topic"]:checked', form) || {}).value || 'General enquiry';
      return { name: g('name'), phone: g('phone'), email: g('email'), topic, message: g('message') };
    };
    const text = (v) => 'Hello Lihini Seafoods,\n\nTopic: ' + v.topic + '\n' + v.message + '\n\nName: ' + v.name + (v.phone ? '\nPhone: ' + v.phone : '') + (v.email ? '\nEmail: ' + v.email : '');
    $('#sendWa').addEventListener('click', () => { if (!form.reportValidity()) return; window.open(wa(text(val())), '_blank', 'noopener'); status.textContent = 'Opening WhatsApp…'; });
    form.addEventListener('submit', (e) => {
      e.preventDefault(); if (!form.reportValidity()) return;
      const v = val();
      if (C.formEndpoint) {
        status.textContent = 'Sending…';
        fetch(C.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) })
          .then((r) => { if (!r.ok) throw 0; form.reset(); status.textContent = 'Thank you — your message has been sent. We will be in touch soon.'; })
          .catch(() => { status.textContent = 'Sorry, something went wrong. Please try WhatsApp or email instead.'; });
      } else {
        location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent('[' + v.topic + '] ' + v.name) + '&body=' + encodeURIComponent(text(v));
        status.textContent = 'Opening your email app…';
      }
    });
  }

  /* --------------------------------------------------- transitions & boot */
  function initTransitions() {
    d.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if ((a.target && a.target !== '_self') || a.hasAttribute('download') || a.getAttribute('aria-disabled') === 'true') return;
      let u; try { u = new URL(a.href, location.href); } catch (_) { return; }
      if (u.protocol !== location.protocol || u.host !== location.host) return;
      if (u.pathname === location.pathname && u.search === location.search) return;
      const ext = (u.pathname.split('/').pop() || '').split('.')[1];
      if (ext && !/^html?$/i.test(ext)) return;
      e.preventDefault();
      if (reduce) { location.href = a.href; return; }
      body.classList.remove('menu-open', 'no-scroll');
      root.classList.add('is-leaving');
      setTimeout(() => { location.href = a.href; }, 560);
    });
    addEventListener('pageshow', (e) => { if (e.persisted) root.classList.remove('is-leaving', 'is-loading', 'is-revealing'); });
  }

  function boot() {
    renderChrome();
    mountAll();
    hydrateIcons();
    $$('[data-year]').forEach((e) => { e.textContent = new Date().getFullYear(); });
    $$('[data-d]').forEach((e) => e.style.setProperty('--d', e.getAttribute('data-d')));
    $$('[data-stagger]').forEach((p) => Array.prototype.forEach.call(p.children, (c, i) => { if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', ''); c.style.setProperty('--d', i * 90); }));
    $$('[data-split]').forEach((e) => { if (e.hasAttribute('data-base')) e.style.setProperty('--base', e.getAttribute('data-base') + 'ms'); splitEl(e, 'w'); });
    $$('[data-scrollwords]').forEach((e) => splitEl(e, 'sw'));
    $$('[data-wa]').forEach((a) => { a.href = wa(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-tel]').forEach((a) => { a.href = tel(); });
    $$('[data-mail]').forEach((a) => { a.href = 'mailto:' + C.email; if (!a.textContent.trim()) a.textContent = C.email; });
    initMenu(); initScroll(); initRails(); initLibrary(); initMaps(); initForm(); initTransitions();

    let done = false;
    const go = () => {
      if (done) return; done = true;
      root.classList.add('is-revealing'); root.classList.remove('is-loading');
      setTimeout(() => root.classList.remove('is-revealing'), 1000);
      initReveal(); initCanvas();
    };
    const ready = () => setTimeout(go, reduce ? 0 : 280);
    d.readyState === 'complete' ? ready() : addEventListener('load', ready);
    setTimeout(go, 3500);
    window.__lihiniReady = true;
  }

  d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', boot) : boot();
})();
