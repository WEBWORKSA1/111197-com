# 111197.com — Phase-wise Build Prompts

Use these prompts in order with any capable AI coding assistant to rebuild, extend or audit the site. Each phase is self-contained.

---

## Phase 0 — Strategy lock
> Act as a domain-monetization strategist. The domain is **111197.com**, read "1111 97". Research its meanings (11:11 wish minute, 11/11 Armistice/Remembrance/Veterans Day, the 11.11 Singles' Day shopping festival, 1997 as the first Gen Z birth year, 11 Nov 1997) and their relevance to commerce, business, AI, economy and people. Choose the single most profitable, AdSense-approvable website concept that bridges the number's free traffic to a high-RPM niche. Output: concept name, tagline, audience, 5 revenue streams, and a 1-page sitemap. Avoid any trademark use of "111197".

**Locked answer:** "111197 — 11:11 Plan Lab": free Wish → Plan generator + personal-finance calculators + guides for Gen Z / first-jobbers.

## Phase 1 — Benchmark
> Visit at least 25 world-class sites in personal finance, calculators, goal-setting, donations, contests and hiring (NerdWallet, Bankrate, Calculator.net, Omni, Ramsey, YNAB, Penny Hoarder, SmartAsset, BofA Better Money Habits, CFPB, timeanddate, takemeback.to, GoFundMe, Buy Me a Coffee, Patreon, Kiva, stickK, Habitica, Mindvalley, Wealthsimple, Khan Academy donate, Credit Karma, Goalcast, Devpost, Gleam, Wellfound, MoneySense). For each, list sections, tools, forms, CTAs, trust signals and design traits. Produce a feature matrix and pick what to adopt.

## Phase 2 — Design system & layout
> Build a static Jekyll site for GitHub Pages (free plan, `main` branch, root). Create `_config.yml` and one `_layouts/default.html` holding: the AdSense script `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>` in `<head>`; SEO/OG meta; a top bar on every page reading "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership" linked to https://web.works/contact; sticky header with logo "11:11 97 Plan Lab", nav, theme toggle and burger; footer with newsletter form, link columns and a trademark/copyright disclosure; mobile sticky CTA bar; a once-per-session lead nudge; a cookie notice. Design: midnight indigo background, gold (#f5c451) + violet (#8b7bff) accents, Sora + IBM Plex Mono, light/dark themes, cards, reveal-on-scroll, reduced-motion support, print styles.

## Phase 3 — Core interactive tools (vanilla JS, no dependencies)
> In `assets/js/main.js` implement: live local clock with countdown to next 11:11; hero wish box that pre-fills the planner; **Wish → Plan generator** (wish, category, currency, target, saved, deadline, take-home pay → 11 dated steps, per month/week/day, 25/50/75% milestones, realism verdict, print, copy, email-me form); calculators: $11.11-a-day compounding with bar chart, savings goal (with interest), debt payoff (current vs extra payment), 50/30/20 budget, emergency fund (11-month path), rent affordability (30% / 40× / 36% DTI), freedom number, side-hustle hours, date & generation explorer (age, days lived, weekday, generation, next birthday, 11,111-day mark, date number). Shared currency preference in localStorage.

## Phase 4 — Lead generation
> Create `get-plan.html`: a 5-step multi-step form (goal → timeline → numbers → location & intro request → contact) with progress bar, auto-advance on single-choice steps, honeypot, consent + separate partner-sharing consent, trust copy and FAQ. Add secondary capture: email-my-plan form on the planner, footer newsletter ("11th Review"), lead nudge, mobile CTA bar. All forms POST via AJAX to a form-relay service; the destination inbox must be stored only as an encoded array in JS and **never** appear in HTML, text or repo docs. `data-mail` links open a mailto built at click time.

## Phase 5 — Donations, contests, hiring, sponsorship
> `support.html`: one-time/monthly, presets ($11.11, $19.97, $50, $111.97, $1,111, Other), purpose selector (operations, prizes/contests, promotion, hiring), payment-method preference, supporter wall, monthly circles; payment links sent by email (no card fields). `challenge.html`: monthly 11:11 Wish Grant with ET countdown to the 11th at 11:11, judging rubric, themes, entry form; `rules.html`: full official rules (no purchase necessary, 18+, skill-testing question for Canada, prize funding disclosure). `careers.html`: roles + application form. `advertise.html`: sponsorship tiers, partner match program, standards, media-kit form.

## Phase 6 — Content for AdSense approval
> Write original, people-first content: `meaning.html` (full 111197 explainer with key facts, TOC, sources, beliefs labelled as beliefs) and `guides/` — the 11-step plan, $11.11 a day (with computed table), first budget, emergency fund, debt above 11%, salary negotiation, AI side income, 11.11 shopping, psychology of 11:11. Each guide: breadcrumb, key facts box, tables, internal links to tools, disclaimer. Add `videos.html` with verified YouTube IDs as click-to-load facades (youtube-nocookie).

## Phase 7 — Trust & legal
> Add about, contact (form + hidden-email button + web.works link), editorial policy, privacy (Google AdSense cookie disclosure, opt-out links, GDPR/PIPEDA/CCPA/DPDP rights), terms, disclaimer, cookies table, trademark & copyright disclosure (no rights claimed to 111197/11:11/11.11/1997; not affiliated with any festival), custom 404.

## Phase 8 — SEO & technical
> Add `ads.txt` (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), `robots.txt` (allow Mediapartners-Google), `sitemap.xml`, `CNAME` (111197.com), web manifest, SVG favicon and OG image, canonical URLs, JSON-LD WebSite schema, descriptive titles/meta per page.

## Phase 9 — QA
> Validate JS syntax; build with Jekyll; crawl all internal links; confirm the inbox string never appears in the built site or repo; test forms, multi-step flow, calculators and countdowns on mobile and desktop; check contrast in both themes; Lighthouse ≥ 90.

## Phase 10 — Deploy
> Push to GitHub `WEBWORKSA1/111197-com` on `main`. Settings → Pages → Deploy from a branch → `main` / root. DNS: A records 185.199.108.153, .109.153, .110.153, .111.153; CNAME `www` → `webworksa1.github.io`; enable Enforce HTTPS. Submit the first form once to activate the form relay. Apply for AdSense after the domain resolves and the sitemap is submitted to Search Console.

## Phase 11 — Growth (post-launch)
> Publish 2 guides/month; run the Wish Grant monthly; build Shorts from each guide; 11/11 Season campaign every Oct–Nov; add localized currency pages (CA, UK, IN); recruit partners for the match program; A/B test hero CTA and nudge timing.
