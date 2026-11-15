# 111197.com — 11:11 Plan Lab

"Stop wishing at 11:11. Start a plan that pays." Free Wish → Plan generator, 9 money calculators, plain-English guides, a monthly goal-plan contest (11:11 Wish Grant), lead generation, donations, careers and sponsorships — monetized with Google AdSense.

- Static Jekyll site for **GitHub Pages (free plan)**. Shared header, footer, AdSense code and the sale/partnership top bar live in `_layouts/default.html`; each page holds only its content.
- Styles: `assets/css/style.css` · Script: `assets/js/main.js` (clock, planner, calculators, forms, multi-step lead funnel, countdowns, video facades).
- Forms post via AJAX to a form relay; the destination inbox is encoded in `main.js` and never appears in plain text anywhere. The first submission triggers a one-time activation email to the inbox — click it once.
- `ads.txt`, `robots.txt`, `sitemap.xml`, `CNAME` (111197.com) at the root.

## Publish
1. Settings → Pages → Build and deployment → **Deploy from a branch** → `main` / `/ (root)` → Save.
2. DNS for 111197.com: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `webworksa1.github.io`. Then tick **Enforce HTTPS**.

See `BUILD-PROMPTS.md` for the phase-wise build prompts and `RESEARCH.md` for research and the 29-site benchmark.

Trademark: "111197" is used only as a domain identifier; no exclusive rights are claimed. See `/trademark.html`.
