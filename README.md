# Lihini Seafoods website

A fast, fully static website (plain HTML, CSS and JavaScript — **no build step**).
It is ready for GitHub → Cloudflare Pages.

## Publish on Cloudflare Pages (lihini.pages.dev)

1. Put every file in this folder at the **root** of your GitHub repository (so `index.html` sits at the top level) and push.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → choose the repo.
3. Project name: `lihini` (this gives you `https://lihini.pages.dev`).
4. Framework preset: **None**. Build command: *leave empty*. Build output directory: `/` (or leave empty).
5. Save and deploy. Every `git push` redeploys automatically.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home (hero, brands, sea-to-table journey, fish library preview, Dives, Aluth Maalu, numbers, certifications, social, call-to-action) |
| `our-story.html` | Company story, values, timeline, the three brands |
| `fish-library.html` | Searchable, filterable fish catalogue with a detail pop-up for each fish |
| `dives.html` | Dives product range (fish rolls, cutlets, patties, fish balls…) |
| `aluth-maalu.html` | The two Aluth Maalu outlets, with map + directions |
| `certifications.html` | Certificates and quality promise |
| `contact.html` | Contact details, message form, map of all locations, social pages, FAQ |
| `404.html` | "Page not found" |

## Where to change things (you rarely need to touch HTML)

* **`assets/js/config.js`** — phone, WhatsApp, email, opening hours, **social media links**, and the **locations used by the maps** (head office + both Aluth Maalu outlets). The header, footer, contact page, outlet cards and Google Maps all update from here.
* **`assets/js/data.js`** — the **fish library**, the **Dives range**, the **certifications** and the home-page numbers. Copy a line to add an item, delete a line to remove one.
* **Photos:** add `image: "assets/img/fish/yellowfin.jpg"` to a fish / Dives item (put the file in that folder). Without an image a coloured illustration is shown. For a certificate add `file: "assets/certs/haccp.pdf"` (and optionally `logo: "assets/img/certs/haccp.png"`).
* **Map location:** in `config.js` set `mapQuery` to the business name + town, or `"latitude,longitude"` (right-click a spot in Google Maps to copy it).
* **Contact form:** works out of the box by opening the visitor's email app or WhatsApp with the message ready. To receive messages directly, create a free form endpoint (e.g. Formspree) and paste its URL in `formEndpoint`.

## Everything that is placeholder (replace when ready)

* Phone, WhatsApp, email, opening hours and **all addresses** (`config.js`)
* Social media URLs (`config.js`)
* Fish names, forms and descriptions; Dives names, descriptions and pack sizes; certificate cards (`data.js`)
* "Years of experience" number (`data.js` → `STATS`)
* Story text, timeline years, "why Dives", "what you will find", quality-promise and FAQ copy — each is marked with an HTML comment `PLACEHOLDER` in the page files.
* Photo placeholders on the story and Dives pages (`.photo-ph` blocks) — swap for `<img src="…">`.
* Dives and Aluth Maalu currently use text names. If they have logos, drop the files in `assets/img/` and tell me / replace the headings.

## Notes

* Logo files are in `assets/img/` (`logo-full.png`, `logo-mark.png`, light versions for dark backgrounds, favicon and social-share image `og-image.jpg`). The flowing fin shape is redrawn as a vector so it can animate.
* Fonts (Bricolage Grotesque, Figtree, Fraunces, Noto Sans Sinhala) load from Google Fonts. The site falls back to system fonts if they are blocked.
* Maps use free Google Maps embeds (no API key needed).
* Animations respect the visitor's "reduce motion" setting.
* `sitemap.xml` and `robots.txt` assume the `lihini.pages.dev` address; update them if you add a custom domain.
