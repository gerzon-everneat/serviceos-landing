# v33 Landing — Proposed Additional Sections (SEO-first)

What the page has today: **Hero → timed-stats strip → How it works (3 videos) → Product feature grid → Pricing (free early access / enterprise) → FAQ → Closing CTA → Footer**, with `SoftwareApplication`, `HowTo`+`VideoObject`, and `FAQPage` JSON-LD already wired in `layout.tsx`.

Below are the sections worth adding, ordered by impact. Each entry: what it is, the keyword target, copy direction, and schema/SEO notes.

---

## 1. Who it's for — Industries strip

**Placement:** right after the hero stats strip, before "How it works".
**Keywords:** *cleaning business software, maid service booking software, carpet cleaning scheduling, junk removal software, lawn care booking, home service scheduling*.

- H2: `Built for cleaning — ready for every home service.`
- A row of 6–8 industry chips/cards (House cleaning · Maid service · Carpet cleaning · Window washing · Junk removal · Lawn care · Pool service · Handyman), each with one line of copy naming a real workflow ("recurring maid visits with frequency discounts", "per-room carpet pricing").
- **SEO note:** each chip is a future internal link to a `/for/[industry]` page — that's the real ranking play. On this page the value is keyword coverage in crawlable text, not just icons. Render the industry names as real text, not images.

## 2. Feature deep-dives (keyword-cluster sections)

**Placement:** expand or follow the current `#product` grid. The 6-card grid is scannable but thin — ~15 words per feature won't rank.
**Keywords (one H3 each):** *online booking page for cleaning business · employee scheduling & dispatch software · automated appointment reminders (SMS + email) · card on file / charge after service*.

- Structure: H2 `Everything between "customer clicks" and "you get paid."`, then 3–4 alternating text+screenshot blocks, each with an H3 that IS the keyword phrase, 60–100 words of concrete copy, and a real product screenshot with descriptive `alt` ("neatr dispatch board showing a booking assigned to a provider").
- **SEO note:** this is where long-tail queries land. Keep the copy specific to shipped behavior (arrival windows, travel buffers, "No payment due today") — uniqueness beats volume.

## 3. Social proof / testimonials

**Placement:** between Product and Pricing (classic pre-pricing trust position).
**Purpose:** conversion + E-E-A-T, more than rankings.

- H2: `Owners who stopped taking bookings by text.`
- 2–3 quotes with real name, business name, city. A logo strip if/when there are recognizable customers.
- **Schema warning:** do NOT add `Review`/`AggregateRating` JSON-LD for testimonials on your own site — Google treats self-serving review markup as spam and ignores or penalizes it. Plain marked-up-as-text quotes only.
- **Honesty rule:** no fabricated quotes. Until real ones exist, ship this as a single founder-story block instead (see §7).

## 4. Comparison teaser — "neatr vs …"

**Keywords:** *BookingKoala alternative, Jobber alternative, Housecall Pro alternative, Launch27 alternative* — highest purchase intent queries in this niche.

- On the landing page: a short H2 section (`Switching from another tool?`) with a 3-row honest comparison (setup time, per-booking flow, price posture) and links out.
- **SEO note:** the rankings come from dedicated `/vs/[competitor]` pages (one H1 each, honest feature tables, screenshots). The landing section exists to internally link to them. Don't stuff all competitor names into this page's copy.

## 5. The provider side — mobile/field app

**Placement:** after feature deep-dives.
**Keywords:** *cleaning employee app, field service app for cleaners, on-my-way texts*.

- H2: `Your team sees today's jobs — not a group chat.`
- Phone-frame screenshots of the provider view: today's schedule, job details, Before/After proof photos, on-my-way. This is a genuinely differentiated asset — screenshot-heavy sections earn image-search traffic with good `alt` text.

## 6. Switching / migration objection-killer

**Placement:** near FAQ.
**Keywords:** *switch from spreadsheets, import customers, migrate from BookingKoala*.

- H2: `Already running on spreadsheets and texts?`
- 3 short steps: bring your customer list, rebuild your catalog in minutes (link the 1:45 setup video — reuses an existing asset), share the new booking link.
- Add 1–2 matching questions to the FAQ array in `content.ts` ("Can I import my existing customers?") — they flow into the `FAQPage` schema automatically.

## 7. Founder note / About

**Placement:** low on page, before closing CTA.
**Purpose:** E-E-A-T (Google rewards identifiable humans behind YMYL-adjacent SaaS), plus conversion warmth for an early-access product with no testimonials yet.

- Short first-person block: who's building neatr, why, photo, signature. Link a real `/about` page.
- **Schema:** add `Organization` JSON-LD (name, url, logo, founder, `contactPoint` with hello@neatr.ai, `sameAs` social profiles) — currently missing and cheap to add in `layout.tsx`.

## 8. Resources / blog teaser

**Placement:** footer-adjacent, 3 cards.
**Purpose:** this is the long-term SEO engine — the landing page alone can't cover informational queries.

- Topics that map to the ICP's actual searches: *how to price house cleaning jobs*, *cleaning business booking form template*, *how to stop no-shows*. Each article internally links back to the relevant landing section.
- Skip the section until ≥3 real articles exist — an empty "Blog" hurts more than it helps.

## 9. Integrations & trust strip

**Placement:** small strip near pricing or footer.

- Only claim what ships: **Stripe** (payments), **Twilio** (SMS), **AWS SES** (email). Logos + one line each.
- Add a trust line under pricing: "Payments processed by Stripe. Card data never touches our servers." — conversion value, near-zero SEO cost.

---

## Page-wide SEO rules (apply to every new section)

1. **One H1 only** (the hero). Every new section = one `H2` containing a keyword variant, sub-blocks = `H3`. Keep the existing `aria-labelledby` pattern.
2. **Real text, not images** — industry names, feature claims, and quotes must be crawlable HTML. Screenshots get descriptive `alt`.
3. **FAQ stays the schema source of truth** — new questions go into `FAQ` in `content.ts` so page + `FAQPage` JSON-LD never drift.
4. **No self-serving Review/Rating schema** (see §3). `Organization` schema is the one worth adding now.
5. **Honest numbers only** — the page's credibility asset is "unedited recordings, timed". Every new claim should keep that standard.
6. **Canonical:** currently `${SITE}/v33`. When v33 is promoted to the root page, update `alternates.canonical`, OG `url`, and the JSON-LD `url` fields together — three spots in `layout.tsx`/`content.ts`.
7. **Internal links compound** — industry pages (§1) and vs-pages (§4) are where this niche is actually won; the landing sections are their link hub.

## Suggested order once everything exists

Hero → Stats strip → Industries (§1) → How it works (videos) → Feature deep-dives (§2) → Provider app (§5) → Social proof (§3) → Pricing → Switching (§6) → FAQ → Founder note (§7) → Resources (§8) → Closing CTA → Footer (+ §9 strip).
