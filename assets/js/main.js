/* Lihini Seafoods — tiny, dependency-free enhancements */

/* ------------------------------------------------------------------
   CONTACT DETAILS — fill these in and every contact spot on the site
   (contact section, footer, form buttons, floating WhatsApp button)
   switches on automatically. Leave a field "" to keep it hidden.
------------------------------------------------------------------ */
const CONFIG = {
  phone:     "",   // e.g. "+94 11 234 5678"
  whatsapp:  "",   // digits with country code, e.g. "94771234567"
  email:     "",   // e.g. "info@example.com"
  address:   "",   // e.g. "Colombo, Sri Lanka"
  instagram: "",   // full URL, e.g. "https://instagram.com/yourpage"
  facebook:  ""    // full URL
};

(() => {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const has = k => typeof CONFIG[k] === "string" && CONFIG[k].trim() !== "";
  const digits = s => s.replace(/\D/g, "");

  /* ---------- header: solid after scrolling ---------- */
  const hdr = $(".hdr");
  const onScroll = () => hdr.classList.toggle("solid", scrollY > 12);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const burger = $("#burger"), nav = $("#nav");
  const setMenu = open => {
    burger.setAttribute("aria-expanded", open);
    nav.classList.toggle("open", open);
    hdr.classList.toggle("menu", open);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* ---------- scroll reveal ---------- */
  const reveals = $$(".reveal"), steps = $("#steps");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => io.observe(el));
    if (steps) io.observe(steps);
  } else {
    reveals.forEach(el => el.classList.add("in"));
    if (steps) steps.classList.add("in");
  }

  /* ---------- active nav link ---------- */
  const links = $$(".nav li:not(.cta) a");
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // observe every section (hero + contact have no menu link, so they clear the highlight)
    $$(".hero, main > section[id]").forEach(s => spy.observe(s));
  }

  /* ---------- hero parallax (transform only, throttled with rAF) ---------- */
  const art = $(".art");
  if (art && !reduce) {
    let queued = false;
    addEventListener("scroll", () => {
      if (queued || scrollY > 900) return;
      queued = true;
      requestAnimationFrame(() => {
        art.style.setProperty("--py", (scrollY * .12).toFixed(1) + "px");
        queued = false;
      });
    }, { passive: true });
  }

  /* ---------- product filter ---------- */
  const chips = $$(".chip"), cards = $$(".card");
  chips.forEach(chip => chip.addEventListener("click", () => {
    chips.forEach(c => c.setAttribute("aria-pressed", c === chip));
    const f = chip.dataset.f;
    let n = 0;
    cards.forEach(card => {
      const show = f === "all" || card.dataset.cat === f;
      card.hidden = !show;
      if (show) {
        card.classList.remove("in");
        card.style.setProperty("--d", (n++ * .06).toFixed(2));
        void card.offsetWidth;            // restart the entrance animation
        card.classList.add("in");
      }
    });
  }));

  /* ---------- contact details from CONFIG ---------- */
  const fmt = {
    phone:     v => ["tel:" + v.replace(/[^\d+]/g, ""), v],
    whatsapp:  v => ["https://wa.me/" + digits(v), "+" + digits(v)],
    email:     v => ["mailto:" + v, v],
    instagram: v => [v, v.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")],
    facebook:  v => [v, v.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")],
    address:   v => [null, v]
  };
  $$("[data-k]").forEach(li => {
    const k = li.dataset.k;
    if (!has(k)) return;
    const [href, text] = fmt[k](CONFIG[k].trim());
    const v = $(".v", li);
    v.textContent = text;
    if (href && v.tagName === "A") v.href = href;
    li.hidden = false;
  });
  const anyContact = Object.keys(CONFIG).some(has);
  $$(".soon").forEach(el => { el.hidden = anyContact; });

  /* ---------- enquiry form → WhatsApp / email ---------- */
  const form = $("#cform"), status = $("#cstatus");
  const wa = $('[data-ch="wa"]'), mail = $('[data-ch="mail"]');
  wa.hidden = !has("whatsapp");
  mail.hidden = !has("email");
  if (wa.hidden && mail.hidden) status.textContent = "Online enquiries will be switched on soon.";

  const message = () => {
    const f = new FormData(form);
    return ["Hello Lihini Seafoods,", "",
      "Name: " + f.get("name"),
      "Contact: " + f.get("contact"),
      "Interested in: " + f.get("interest"),
      "", (f.get("message") || "").toString().trim()].join("\n").trim();
  };
  form.addEventListener("submit", e => e.preventDefault());
  wa.addEventListener("click", () => {
    if (!form.reportValidity()) return;
    open("https://wa.me/" + digits(CONFIG.whatsapp) + "?text=" + encodeURIComponent(message()), "_blank", "noopener");
    status.textContent = "Opening WhatsApp…";
  });
  mail.addEventListener("click", () => {
    if (!form.reportValidity()) return;
    location.href = "mailto:" + CONFIG.email.trim() + "?subject=" + encodeURIComponent("Enquiry from the website") + "&body=" + encodeURIComponent(message());
    status.textContent = "Opening your email app…";
  });

  /* ---------- floating WhatsApp button (only if configured) ---------- */
  if (has("whatsapp")) {
    const a = document.createElement("a");
    a.className = "fab";
    a.href = "https://wa.me/" + digits(CONFIG.whatsapp);
    a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "Chat with us on WhatsApp");
    a.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 4h20a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H15l-7 6v-6H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"/></svg>';
    document.body.appendChild(a);
  }

  /* ---------- footer year ---------- */
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
})();
