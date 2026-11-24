# Lihini Seafoods website

Plain HTML + CSS + JS — no build step, no dependencies, no external requests.

## Deploy (Cloudflare Pages → lihini.pages.dev)
Push this folder's contents to the root of your GitHub repo. In Cloudflare Pages use:
- Framework preset: **None**
- Build command: *(leave empty)*
- Build output directory: **/**

## Things you'll want to edit
- **Contact details** — top of `assets/js/main.js` (`CONFIG`). Fill in phone, WhatsApp (digits with country code), email, address, Instagram, Facebook. Each spot on the site (contact section, footer, form buttons, floating WhatsApp button) switches on automatically when its field is filled.
- **Products** — the `.card` blocks inside `#products` in `index.html`. Copy one block to add a product; `data-cat` is `fish`, `shellfish` or `squid`.
- **Wording** — all in `index.html`.
- **Colours** — variables at the top of `assets/css/style.css` (taken from the logo).

## Files
- `assets/img/` — optimized logo, social-share image (`og.jpg`), app icons
- `assets/fonts/` — Fira Sans (Latin subset), self-hosted
- `_headers` — security + caching headers for Cloudflare Pages
- `404.html`, `robots.txt`, `sitemap.xml`, `favicon.*`
