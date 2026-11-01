# Бойлер-Мен – Project Documentation

Marketing site for **Бойлер-Мен**, a mobile boiler-repair service based in **Sofia** that also serves **Pazardzhik**.
Stack: Next.js (App Router, Turbopack), React, Tailwind CSS v4, TypeScript. Language: Bulgarian (`lang="bg"`).

---

## 1. Business facts used on the site

| Item | Value |
|---|---|
| Brand | Бойлер-Мен |
| Type | Mobile (service-area) business, **no registered street address** in either city |
| Base | Sofia (technicians travel to Pazardzhik, ~110 km via АМ „Тракия“) |
| Response time Sofia | до 1 час (до 30 минути около Левски, Орландовци, Суха река, Хаджи Димитър, Гео Милев, Редута) |
| Response time Pazardzhik | до 2 часа при възможност |
| Coverage | All districts of Sofia and Pazardzhik |
| Phone (temporary) | 0885 466 663 – will be replaced by a new number used for both cities |
| Diagnostics | usually from 20-30 евро; final price after on-site inspection |
| Warranty | 6 месеца on the repaired part, with a protocol (document) |
| Saturday | Only by prior arrangement, at a higher price |
| Not repaired | Instant-flow (проточни) and gas boilers |
| Hours | Пон–Съб · 08:00 – 19:00 |
| Planned domain | `boiler-man.net` (not registered yet) |
| Google Business Profile | Not created yet |
| Technician name/photo | Intentionally not shown |

Brands with their own page: Tesy, Eldom, Tedan, Atlantic, Светлю Шишков (Bulgarian water-heater manufacturer), Midea, Diplomat, Ariston.

---

## 2. Running the project

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production origin (default fallback `https://boiler-man.net`). Drives canonicals, sitemap, JSON-LD, OG tags. |
| `GOOGLE_SITE_VERIFICATION` | Optional. Adds the Search Console verification meta tag in `layout.tsx`. |

> Build note: when `node_modules` is a junction/symlink, `next build` can fail (Turbopack and webpack). Building with a regular local `node_modules` works.

---

## 3. Information architecture

One domain, a mixed home hub, two city landing pages, shared service pages and a blog. No city × service “doorway” pages.

| URL | Purpose |
|---|---|
| `/` | Hub for both cities (full hero, services, why, brands, process, reviews, cities, FAQ, blog, CTA) |
| `/remont-na-boileri-sofia/` | Landing page for “ремонт на бойлери София” |
| `/remont-na-boileri-pazardzhik/` | Landing page for “ремонт на бойлери Пазарджик” |
| `/uslugi/` | Services index |
| `/uslugi/[slug]/` | 8 shared service pages (see below) |
| `/marki/` | Brands index |
| `/marki/[slug]/` | 8 brand pages |
| `/blog/` | Blog index |
| `/blog/[slug]/` | 7 articles |
| `/za-nas/` | About the company (no technician name/photo): who we are, principles, scope, cities |
| `/kontakti/` | Contacts: phone, Viber, hours, what to tell us, service area, FAQ |

Total: 31 URLs in the sitemap.

Service slugs: `smyana-na-nagrevatel`, `profilaktika-na-boileri`, `smyana-na-termostat`, `remont-na-techasht-boiler`, `smyana-na-predpazen-klapan`, `montazh-na-boileri`, `remont-na-elektricheska-chast`, `dostavka-i-podmyana-boiler`.

Brand slugs: `tesy`, `eldom`, `tedan`, `atlantic`, `svetlyu-shishkov`, `midea`, `diplomat`, `ariston`.

Deliberately **not** built: `/ceni/` (skipped for now), a page for instant-flow/gas boilers (not repaired), `spesen-remont` and `anodna-zashtita` (removed on request). The site is not live yet, so no redirects from the old slugs were added; if the old URLs were ever indexed, add 301s in `next.config.mjs`.

Blog slugs: `boilerat-tece-kakvo-da-napravite`, `kolko-struva-remont-na-boiler`, `remont-ili-nov-boiler`, `boilerat-izklyuchva-tokovata-zashtita`, `kotlen-kamak-v-boilera`, `nyama-topla-voda-ot-boilera-prichini`, `kak-da-se-podgotvite-za-poseshtenie-na-tehnik`.

All URLs use `trailingSlash: true`. Dynamic routes use `generateStaticParams` with `dynamicParams = false`.

Interlinking: header nav (Услуги, Марки, София, Пазарджик, Блог, За нас, Контакти), footer nav columns (cities, services, brands, more), brand pills on the home page link to brand pages, city ↔ city cross band, service “related” cards, brand “related services”, blog “related services”, CitiesBand on home / services / blog.

Brand pages contain only generic, truthful content (typical fault patterns of electric tank boilers, how we work on that brand). No invented model lists, prices or statistics. The brand-origin statements (Tesy and Eldom – Bulgarian, Atlantic – French, Ariston – Italian, Midea – Chinese, Светлю Шишков – Bulgarian manufacturer) should be verified by the owner.

---

## 4. Project structure

```
app/
  layout.tsx                 Root layout, global metadata, viewport, optional verification
  page.tsx                   Home hub
  remont-na-boileri-sofia/      Sofia landing (renders <CityPage slug="sofia" />)
  remont-na-boileri-pazardzhik/ Pazardzhik landing
  uslugi/page.tsx            Services index
  uslugi/[slug]/page.tsx     Service page template
  marki/page.tsx             Brands index
  marki/[slug]/page.tsx      Brand page template
  za-nas/page.tsx            About page
  kontakti/page.tsx          Contacts page
  blog/page.tsx              Blog index
  blog/[slug]/page.tsx       Article template
  sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
  llms.txt/route.ts          Machine-readable summary for AI/agentic search
  icon.png  apple-icon.png   Generated from the logo
  site-header.tsx  site-footer.tsx  reveal-on-scroll.tsx  icons.tsx
  globals.css                All styling, red decoration system, multi-page additions
  components/
    hero.tsx                 Hero (full) and CompactHero
    city-page.tsx            CityPage + cityMetadata
    sections.tsx             All bands (services, why, brands, process, reviews, cities, coverage, local, intro, examples, FAQ, blog, CTA, cross-city)
    breadcrumbs.tsx  json-ld-scripts.tsx
  lib/
    site.ts                  Business identity, phone, URLs (single source of truth)
    cities.ts                Sofia & Pazardzhik content
    services-data.ts         8 services
    brands.ts                8 brand pages (BRAND_ORDER, brandPath)
    posts.ts                 7 blog posts
    examples.ts              Real repair examples (empty until supplied)
    json-ld.ts               JSON-LD node builders
    seo.ts                   pageMetadata() helper
public/identity/             Logo assets
```

### Where to change things

- **Phone number**: `app/lib/site.ts` (`PHONE_DISPLAY`, `PHONE_HREF`, `PHONE_E164`, `VIBER_HREF`). Everything else derives from it.
- **Domain**: set `NEXT_PUBLIC_SITE_URL` (or change the fallback in `site.ts`).
- **City copy**: `app/lib/cities.ts`.
- **Service copy**: `app/lib/services-data.ts`.
- **Brand copy**: `app/lib/brands.ts`.
- **About / contacts copy**: `app/za-nas/page.tsx`, `app/kontakti/page.tsx`.
- **Articles**: `app/lib/posts.ts`. Bump `CONTENT_UPDATED` in `site.ts` on material content changes (feeds sitemap `lastmod` and schema `dateModified`).

---

## 5. SEO implementation

### Metadata
- `pageMetadata({ path, title, description, type, ... })` in `app/lib/seo.ts` generates absolute title, canonical (always with trailing slash), Open Graph and Twitter tags.
- Every page has a unique `<title>` and meta description (verified: 31 pages / 31 unique titles / 31 unique descriptions).
- `opengraph-image.tsx` generates a branded OG image mentioning both cities.

### Structured data (JSON-LD `@graph` per page)
- `LocalBusiness` (service-area business, **no street address**, `areaServed` = Sofia and Pazardzhik with Wikipedia `sameAs`)
- `WebSite`, `WebPage` / `CollectionPage`, `BreadcrumbList`
- `Service` (home, city and service pages), `FAQPage` (pages with FAQs), `BlogPosting` (articles), `ItemList` (services/blog lists)
- Self-serving `review` markup was deliberately removed (against Google guidelines).

### Crawling and discovery
- `sitemap.ts` (all 31 URLs, `lastmod` from `CONTENT_UPDATED`), `robots.ts`, `manifest.ts`.
- `/llms.txt` route summarising business, services, areas, prices and warranty for AI/agentic search.
- Breadcrumbs on all inner pages.

### Local SEO caveats
- No Google Business Profile exists yet. Creating one as a **service-area business** (hide address, add Sofia and Pazardzhik service areas) is the single biggest remaining local-ranking lever.
- Do not publish a fake address. Do not mark up reviews of your own business.

---

## 6. Content uniqueness rules (important)

**No text may be duplicated across pages.** This was an explicit requirement. The following mechanisms enforce it:

| Area | Mechanism |
|---|---|
| Hero text, USP list, signal cards | Separate strings for home, Sofia and Pazardzhik |
| “Why” band (heading, lead, 6 problems, note) | Separate per page (`cities.ts`, `page.tsx`) |
| Process band | Home uses defaults; each city has `processHeading/processLead/processSteps`; each service uses its own `steps` and heading `Стъпки при: …` |
| FAQs | Unique questions and answers per page; FAQ note per page (`faqNote`) |
| Service cards | `ServicesBand variant`: `home` → `cardText`, `index` → `indexText`, `sofia`/`pazardzhik` → `cityTexts`, `compact` → title only (related lists) |
| Brand pages | Each brand has its own `intro`, `faultsText`, `modelText`, FAQs, aside note and CTA in `brands.ts`; index cards use `indexText` |
| CTA band | `CtaBand` requires `eyebrow`, `heading`, `text`; each page/service/article has its own |
| Cities band | `CitiesBand variant`: `home`, `services`, `blog`, with `city.teasers[variant]` |
| Blog cards | Index uses `cardTitle` + `excerpt`; home uses `homeTitle` + `homeExcerpt`; the article page uses its own `title` and `answer` |
| Service page headings | `whenHeading`, `includedHeading`, `asideNote`, `cta` per service |
| Footer | Intro paragraph removed |

**Intentionally identical** (UI chrome, not copy): navigation and button labels, small section eyebrow labels (“Процес”, “Въпроси”, “Услуга”…), working hours, copyright, phone, neighbourhood names, the decorative hero status card, and the “Обновено” date on articles.

### When adding or editing content
1. Write new strings from scratch for each page; never reuse sentences from another page.
2. Keep facts consistent (see section 1) but vary wording.
3. After changes, re-run a duplicate scan: fetch every URL in `/sitemap.xml`, strip the header, split into blocks and sentences, and flag any that appear on more than one page (and not on all pages). Expected result: only UI chrome remains.

---

## 7. Design system notes

- Visual design is preserved from the original single-page site (navy / ice / mist bands, red accents, liquid-glass header).
- Red pseudo-element decoration system in `globals.css` (CSS variables `--rd-*`, `--p-*`, `--x-*`; scenes A/B/C):
  - Desktop: dots anchored to content gutters via `calc(50% ± px)` so they never overlap text.
  - ≤ 1040 px: reduced to soft glows and edge rings only; dots, cross and patch layers are hidden to protect readability.
  - ≤ 380 px: extra patch hidden.
  - No streak/line layers (removed on request).
- Reveal-on-scroll animations are handled by `reveal-on-scroll.tsx`; disable them (inject CSS) when taking automated screenshots.
- Multi-page CSS additions: `.hero--compact`, `.breadcrumbs`, `.cities-grid`, `.local-grid`, `.content-layout`, `.aside-card` (sticky), `.prose`, `.answer-box`, `.check-list`, `.dot-list`, `.site-footer__nav`, `.post-card__meta`.

---

## 8. Real repair examples (pending)

`app/lib/examples.ts` is empty. To publish examples:
1. Put photos in `public/img/` (webp/jpg, ideally < 250 kB, ~4:3).
2. Add entries with `id, city, title, brand, fault, fix, date, image, imageAlt` (optional `price`, `area`).
3. The “Реални ремонти” section appears automatically on the matching city page.

Only real jobs with permission to publish. Never invent examples, brands, prices or dates.

---

## 9. Launch checklist

- [ ] Register the domain and set `NEXT_PUBLIC_SITE_URL`.
- [ ] Verify the domain in Google Search Console (optionally set `GOOGLE_SITE_VERIFICATION`) and submit `/sitemap.xml`.
- [ ] Create the Google Business Profile (service-area business, Sofia + Pazardzhik).
- [ ] Replace the temporary phone number in `site.ts` with the final one.
- [ ] Add real repair photos and entries to `examples.ts`.
- [ ] Confirm the Pazardzhik quarter names used in the coverage pills (Център, Изток, Запад, Устрем, Другите квартали).
- [ ] Replace placeholder reviews with real, verifiable ones (reviews are shown visually only; no review markup).
- [ ] Run `npm run typecheck` and `npm run build` before deploying.
- [ ] Re-run the duplicate-text scan after any content change.

---

## 10. The SEO plan (as agreed) and its status

Goal: rank as high as possible in Google and in agentic/AI search for both cities, following Google best practices, without changing the visual design. Note: no one can guarantee position 1; the plan removes technical blockers, gives every query its own strong page and builds trust signals.

### 10.1 Constraints and reality checks
- **Design stays as it is.** All new pages reuse existing classes (`.hero`, `.band`, `.service-card`, `.faq-item`, `.review-card`, `.brand-pill`, red accents). Only new UI: breadcrumbs and simple blog list/article layouts using the same tokens.
- **Service-area business, no street address.** A second Google Business Profile for Pazardzhik is not allowed without a staffed local address. Plan: **one profile based in Sofia, address hidden, both cities as service areas**. In Pazardzhik the landing page and content carry most of the organic weight.
- **Pazardzhik speed claim must be honest.** Pazardzhik is ~110 km from Sofia, so “до 1 час” would be misleading. Decision: **до 2 часа при възможност**; the 30-minute claim is limited to nearby Sofia districts.
- **No invented content.** Repair examples and reviews must be real and published with permission (fabricated ones are treated as spam).

### 10.2 Site architecture (all on one domain)
- `/` – mixed hub: brand, combined (“София и Пазарджик”) and general queries; links to both cities and all services.
- `/remont-na-boileri-sofia/` – full landing page for “ремонт на бойлери София”.
- `/remont-na-boileri-pazardzhik/` – full landing page for “ремонт на бойлери Пазарджик”, with services, local coverage, FAQ and a real-examples section (needs real data).
- `/uslugi/` + 8 shared service pages (updated structure, see section 3), each naming both cities naturally and linking to both landing pages.
- `/marki/` + 8 brand pages, `/za-nas/`, `/kontakti/` (added in the structure update, section 11).
- `/blog/` + 7 answer-first articles.
- **No city × service pages** (e.g. “смяна на нагревател Пазарджик”) – that is the doorway-page pattern Google penalises.
- **Avoiding cannibalisation:** each page has one job (hub = brand/combined, city pages = own city query, service/blog = non-city and informational queries); every page is self-canonical; link anchors are varied and descriptive.

### 10.3 Content system
- One typed data layer (`cities.ts`, `services-data.ts`, `posts.ts`, `site.ts`) feeds visible copy, metadata, schema and sitemap, so the phone, ETAs and prices live in one place (the future phone change is a one-line edit).
- City pages: city keyword in the H1, services, local coverage, how a visit works (honest Sofia → Pazardzhik logistics), warranty, local FAQ, city-specific map, cross-link to the other city.
- Service pages: symptoms, what is included, process, short FAQ, related services and both city links.
- Blog: answer-first articles with dates, linking to the relevant service and both cities.

### 10.4 On-page and technical SEO
- Unique title (~60 chars) and description (~150) per page, self-canonical, Open Graph, Twitter.
- Dropped obsolete signals: `keywords` meta, `geo.*` meta, and `new Date()` as sitemap `lastmod` (now a fixed `CONTENT_UPDATED`).
- Sitemap with every URL; robots allows everything and points to the sitemap (AI search bots allowed; training-bot policy is the owner’s decision).
- Everything statically generated (`generateStaticParams`), HTML-first, real `<a>` links in header/footer/breadcrumbs.
- Header nav (current): Услуги, Марки, София, Пазарджик, Блог, За нас, Контакти. Footer has link blocks for cities, services, brands and more.
- Visible breadcrumbs matching `BreadcrumbList` schema.
- Single language `bg`; no hreflang needed (the cities are not language variants).
- Core Web Vitals to audit on mobile (risk areas: `backdrop-filter` layers and the Google Maps iframe; consider click-to-load for the iframe).

### 10.5 Structured data
One connected `@graph` per page using stable `@id`s: a single `LocalBusiness` (service-area, phone in `+359…` format, hours, `areaServed` = both cities with Wikipedia `sameAs`, no fake address), `WebSite`, `WebPage`/`CollectionPage`, `BreadcrumbList`, `Service` (per service and city page, `provider` by `@id`), `BlogPosting`, `ItemList`, and `FAQPage` (kept for machine readability, not relied on for rich results). The self-serving `review` array was removed. Validate with the Rich Results Test and the Schema.org validator.

### 10.6 Interlinking
Hub → both cities, services index, top posts. City pages ↔ each other, all services, relevant posts. Service pages → both cities, related services, posts. Blog posts → a relevant service and both cities. Breadcrumbs + footer keep everything within two clicks.

### 10.7 Agentic / AI search extras
- Entity consistency: same name, phone and service-area facts in schema, on-page, in Google Business Profile and in citations.
- Answer-first writing: short direct answers, explicit prices and ETAs in plain HTML, clear question headings.
- `/llms.txt` summary (low-cost, not an official Google signal).
- Optional: IndexNow + Bing Webmaster Tools (Bing feeds several AI assistants).
- Keep `max-snippet:-1` and `max-image-preview:large` so pages stay eligible for rich snippets and AI features.
- Off-site: one GBP as a service-area business covering Sofia and Pazardzhik; real reviews mentioning both cities; citations in Bulgarian directories; Search Console domain property with sitemap submitted; call/Viber click tracking per city.

### 10.8 Owner’s answers to the plan’s open questions
| Question | Answer |
|---|---|
| Phone | Use 0885 466 663 for now; a new number will replace it for both cities |
| Presence | Technicians are from Sofia and travel to Pazardzhik quickly; no registered address in either city |
| URL structure | One domain, mixed homepage, two landing pages, service pages, blog, heavy interlinking |
| Scope | Fully optimised Sofia and Pazardzhik pages; Pazardzhik with detailed services, coverage, FAQ and real examples; shared service pages |
| Pazardzhik ETA / prices | до 2 часа при възможност |
| Pazardzhik districts | All districts |
| Repair examples | Photos to be provided in `public/img/` (folder not created yet) |
| Technician name/photo | Not needed |
| GBP / social | No business profile yet |
| Domain | Not created yet; most likely `boiler-man.net` |

### 10.9 Build phases and status
| Phase | Status |
|---|---|
| 1. Foundation: data layer, templates, nav/footer links, breadcrumbs, schema, sitemap/robots fixes, removal of self-serving reviews and obsolete meta | Done |
| 2. Landing pages (Sofia, Pazardzhik) and reworked hub, design unchanged | Done |
| 3. Service pages and services index | Done |
| 4. Blog with first articles | Done (7 articles) |
| 5. Verification: typecheck, build, link/duplicate-title crawl, schema validation, Lighthouse, 320–2560 px visual check | Typecheck, build, unique titles/descriptions and duplicate-text scans done; Lighthouse and schema validator runs still recommended |
| Duplicate-content cleanup (added requirement) | Done – see section 6 |
| Real repair examples | Waiting for photos/data |
| GBP, domain, Search Console, final phone | Owner tasks (see section 9) |

---

## 11. History of major changes

1. **Decorations**: scattered red pseudo-element ornaments across the site, responsive at all widths.
2. **Readability fix**: dots no longer interfere with text on mobile/tablet; line streaks removed.
3. **Multi-city update**: architecture above, full SEO scaffolding (metadata, JSON-LD, sitemap, robots, manifest, llms.txt, OG image, icons).
4. **Duplicate-content cleanup**: every repeated block and sentence rewritten (hero paragraphs, USPs, signal cards, why band, process steps, FAQs, FAQ notes, service/blog cards, CTAs, cities band, aside cards, headings, footer paragraph); verified with block-level and sentence-level scans.
5. **Structure update** (owner-approved tree):
   - City URLs renamed to `/remont-na-boileri-sofia/` and `/remont-na-boileri-pazardzhik/`.
   - Services reworked to 8: removed `spesen-remont` and `anodna-zashtita`, the general “ремонт на бойлери” page was dropped, renamed slugs, added `smyana-na-predpazen-klapan` and `remont-na-elektricheska-chast`, kept `dostavka-i-podmyana-boiler`.
   - Added `/marki/` with 8 brand pages, `/za-nas/` and `/kontakti/`; skipped `/ceni/`.
   - Header gets 7 nav items (tightened CSS for 1025–1240 px so nothing collides), footer gets a “Марки” column.
   - Stiebel Eltron and Bosch are no longer mentioned (no brand page for them).
   - Re-verified: 31 URLs return 200, 31 unique titles/descriptions, 0 duplicated sentences; only UI chrome and the “Обновено” date repeat; removed URLs return 404; `tsc --noEmit` passes.
