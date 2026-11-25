/* ==========================================================================
   LIHINI SEAFOODS — SITE SETTINGS
   --------------------------------------------------------------------------
   This is the ONE file to edit for contact details, social links and map
   locations. Everything marked "PLACEHOLDER" is sample text for you to replace.
   The header, footer, contact page, outlet cards and maps all read from here.
   ========================================================================== */

window.LIHINI = {
  name: "Lihini Seafoods",
  tagline: "True flavours of Ceylon seafood",
  siteUrl: "https://lihini.pages.dev",

  /* ---------- Main contact (PLACEHOLDER) ---------- */
  phone: "+94 00 000 0000",          // shown on the site
  phoneDigits: "+940000000000",      // used for tap-to-call links (no spaces)
  whatsappNumber: "940000000000",    // international format, digits only, no +
  email: "hello@example.com",
  hours: "Open daily · 7:00 am – 7:00 pm",

  /* ---------- Contact form ----------
     Leave "" and the form opens the visitor's email app / WhatsApp with the message ready.
     Or paste a form-service URL (e.g. a free Formspree endpoint https://formspree.io/f/xxxx)
     and messages will be delivered straight to your inbox. */
  formEndpoint: "",

  /* ---------- Social media (PLACEHOLDER links — paste your real page URLs) ----------
     Remove a line to hide that platform everywhere on the site. */
  social: {
    facebook:  { label: "Facebook",  url: "https://www.facebook.com/",  handle: "@lihiniseafoods" },
    instagram: { label: "Instagram", url: "https://www.instagram.com/", handle: "@lihiniseafoods" },
    tiktok:    { label: "TikTok",    url: "https://www.tiktok.com/",    handle: "@lihiniseafoods" },
    youtube:   { label: "YouTube",   url: "https://www.youtube.com/",   handle: "Lihini Seafoods" },
    whatsapp:  { label: "WhatsApp",  url: "https://wa.me/940000000000", handle: "Chat with us" },
    linkedin:  { label: "LinkedIn",  url: "https://www.linkedin.com/",  handle: "Lihini Seafoods" }
  },

  /* ---------- Locations (PLACEHOLDER) ----------
     mapQuery is what Google Maps searches for. Use the exact business name + town,
     or "latitude,longitude" e.g. "6.9271,79.8612".
     zoom: 5 (country) … 15 (street level). */
  locations: [
    {
      id: "hq",
      kind: "Head office & processing",
      name: "Lihini Seafoods",
      address: ["Street address goes here", "Town, Sri Lanka"],
      phone: "+94 00 000 0000",
      hours: "Mon – Sat · 8:00 am – 5:00 pm",
      mapQuery: "Sri Lanka",
      zoom: 7
    },
    {
      id: "outlet1",
      kind: "Aluth Maalu · Outlet 01",
      name: "Aluth Maalu — First Outlet",
      address: ["Outlet street address goes here", "Town, Sri Lanka"],
      phone: "+94 00 000 0000",
      hours: "Open daily · 6:30 am – 7:30 pm",
      mapQuery: "Sri Lanka",
      zoom: 7
    },
    {
      id: "outlet2",
      kind: "Aluth Maalu · Outlet 02",
      name: "Aluth Maalu — Second Outlet",
      address: ["Outlet street address goes here", "Town, Sri Lanka"],
      phone: "+94 00 000 0000",
      hours: "Open daily · 6:30 am – 7:30 pm",
      mapQuery: "Sri Lanka",
      zoom: 7
    }
  ]
};
