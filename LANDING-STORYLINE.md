# neatr — Landing Page Storyline, SEO Map & Background-Image Prompts

**Date:** 2026-07-06 · For: the new primary landing page (winner of the v29–v34 bake-off, shipped to `/`).
**Product in one line:** online booking software for cleaning businesses — customers book themselves, jobs get suggested to your team, you get paid. *(Narrowed from "cleaning & home-service" — verified against the booking-fe codebase: pricing model, seed data, and PRD scope are cleaning-only. No other vertical is built, tested, or supported today.)*
**Companion skills:** `/seo` and `/aeo`.

---

## How many sections

**9 story sections** (+ sticky nav and footer, which are chrome, not story). The arc follows StoryBrand — the *business owner* is the hero, neatr is the guide with a plan:

> Promise → Pain → Plan → Product → Proof → Fit → Why-us → Price → Answers/Close

If you must trim for build/asset load, cut in this order: **§7 (comparison)** → **§2 (problem)**. Minimum viable = 7 sections. Don't cut Hero, How-it-works, Features, Proof, Pricing, or FAQ/CTA.

**One H1 total** (Hero). Every section = one `<h2>`; sub-items = `<h3>`. That hierarchy *is* the SEO skeleton.

---

## Background-image art direction (read once, applies to every prompt)

Full-bleed **photo** backgrounds only on the emotional beats — **§1, §2, §6, §9**. The data-dense sections (**§3, §4, §5, §7, §8**) get **near-solid, low-contrast, product-forward** backgrounds so text/cards stay legible and fast. This is deliberate: photos behind feature lists, tables and pricing kill readability and LCP.

**Append this STYLE BLOCK to every prompt** (keeps the set visually coherent — use the *same seed* across all 9):

```
— Style: bright editorial photograph, soft diffused natural morning light, calm and airy,
premium-but-approachable home-service aesthetic (Kinfolk / Cereal magazine feel).
Palette: warm off-white & ivory base, soft eucalyptus/sage-green accents, light oak wood,
muted greige stone. Low saturation, high-key, shallow depth of field, medium-format look,
subtle film grain, muted editorial color grade. Generous clean negative space for text overlay.
No text, no logos, no watermarks, no clutter. Photorealistic. 16:9.
```

**Production notes (ties to the `/seo` skill):**
- Generate 16:9 (desktop, ≥2400×1350) **and** a 4:5 crop (mobile). Export **AVIF/WebP**, target <200 KB each.
- Add a CSS gradient **scrim** over each image (e.g. `linear-gradient` ivory→transparent on the text side) for contrast — don't bake it into the image.
- **Preload the Hero image; lazy-load the rest.** Hero is your LCP element — keep it light.
- Per memory: generate via Kling / Wavespeed / Kie.ai. Every image needs **alt text** (given below) — it's an SEO + a11y requirement.

---

## The 9 sections

### §1 — Hero *(full photo)*
- **Tells the visitor:** "This is booking + dispatch + payment for my cleaning business, and I can start a free trial today." The whole value prop in 5 seconds.
- **Copy:** H1 keyword-first; brand line as subhead; one primary CTA + one demo CTA.
  - **H1:** `Online booking software for cleaning businesses`
  - **Subhead:** *Bookings in. Jobs dispatched. You just grow.* Take bookings online, dispatch your team, and get paid — with a booking page customers finish in about a minute.
  - **CTAs:** `Start your free trial` · `Watch a customer book (1:04)`
- **SEO role:** primary keyword in H1; page-level `SoftwareApplication` JSON-LD; the LCP section.
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Sunlit, freshly cleaned modern living room with a booking tablet on the counter."
- **Prompt:**
  > A bright, freshly cleaned modern living room bathed in soft morning light; warm off-white walls, light oak floor, a few eucalyptus stems in a ceramic vase, subtle sage-green accents; a tablet resting on a clean counter slightly out of focus; airy, calm, in-control atmosphere; large empty negative space in the upper-left for a headline; no people. [STYLE BLOCK]
- **Video-background option (recommended):** replace the static photo with a short, silent, looping clip of the real product — e.g. a softly blurred/desaturated crop of the customer-booking recording (§5's 1:04 clip) behind a scrim, so the hero shows actual product motion instead of a lifestyle stand-in. Requirements: muted, `autoplay loop playsInline`, ≤8s loop, ≤2 MB compressed (H.264 MP4 + WebM), a static poster frame as the real LCP element (the video itself must not block LCP), and a `prefers-reduced-motion` fallback to the static photo prompt above. Keep the photo prompt as the no-video fallback either way.

### §2 — The problem *(full photo)*
- **Tells the visitor:** "You're losing jobs to phone tag, double-bookings and no-shows. Manual scheduling doesn't scale." Name the pain so they feel understood.
- **Copy H2:** `Missed calls and double-bookings are costing you jobs`
  - 3 short pain bullets: phone/text tag after hours · double-booked or forgotten jobs · no-shows with no deposit.
- **SEO role:** captures pain long-tail ("stop missing booking calls", "double-booking scheduling"). H2 + supporting text.
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Smartphone on a desk lit with missed calls and messages beside scattered sticky notes."
- **Prompt:**
  > Overhead view of a warm light-oak desk in early-morning light; a smartphone glowing with many missed-call and message notifications; a few handwritten paper sticky notes and a coffee cup scattered nearby; a quietly tense, overwhelmed morning mood, still tasteful and muted; clean negative space on the right; no people. [STYLE BLOCK]

### §3 — How it works (3 steps) *(subtle / product-forward)*
- **Tells the visitor:** "Three steps: set up your services in minutes, share your booking page, customers book and your team is dispatched." The guide's simple plan — removes fear of complexity. Maps to your 3 real recordings (1:42 setup · 0:49 form · 1:04 booking).
- **Copy H2:** `How online booking works with neatr` → three H3 steps:
  - **1. Set up your operations in minutes** (categories, services, pricing, branding)
  - **2. Share your booking page** (a link customers can use immediately)
  - **3. Customers book — your team gets dispatched** (arrival windows, auto-assigned)
- **SEO role:** step keywords; keep `VideoObject` on the clips (HowTo rich results are dead — don't rely on HowTo schema, plain steps are fine).
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Light oak desk from above with a laptop and phone showing a soft, blurred booking calendar."
- **Prompt:**
  > Minimal top-down flat-lay on a light oak surface, mostly empty; a laptop and a phone at the edges showing soft, heavily out-of-focus booking-calendar UI (unreadable, just color and shape); a single eucalyptus sprig; very low contrast, high-key, lots of clean empty space across the center for three text columns; no people. [STYLE BLOCK]

### §4 — Features deep-dive *(subtle / near-solid)* — **main ranking section**
- **Tells the visitor:** exactly what the product does, each capability tied to a job it removes.
- **Copy H2:** `Booking, scheduling & dispatch software built for cleaning businesses` → eight H3 feature cards:
  - **Online booking page for your customers** — guests book with no account.
  - **Arrival windows that match real availability** — 2-hour windows based on travel buffers and existing jobs.
  - **Instant quotes & upfront pricing** — customers see the price before they book.
  - **Smart dispatch suggestions for field teams** — every job gets a skill- and availability-matched provider suggested; assign with one click.
  - **Automated SMS & email reminders** — cut no-shows.
  - **Card on file, one-click charge** — card verified via Stripe at booking, no payment due that day; charge it with one click once the job's done.
  - **Set up by chatting, not clicking through forms** — an AI setup assistant configures your services, pricing rules, and categories from a conversation.
  - **Embed on your site, or connect it to yours** — a drop-in booking widget plus a public API and webhooks for `booking.created` / `assigned` / `completed`.
- **SEO role:** this is where you rank for feature terms — put the target keyword in each H3, one supporting sentence each. Densest keyword real estate on the page. *(The AI-setup and embed/API cards are real, differentiated capabilities competitors don't talk about — don't undersell them to filler length.)*
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Soft ivory and sage color-blocked surface, mostly empty, for feature cards."
- **Prompt:**
  > Almost-abstract, very soft-focus background: gently blurred ivory and sage-green color blocking with a hint of light-oak texture in one corner; extremely low contrast, calm, high-key, mostly empty; no discernible objects; designed to sit behind white feature cards; no people. [STYLE BLOCK]

### §5 — Live proof / real recordings *(subtle / cinematic)*
- **Tells the visitor:** "This isn't a mockup. Watch the real, unedited product." Kills skepticism; strongest trust asset.
- **Copy H2:** `See the real product — unedited recordings`
  - Three players: setup **1:42** · form builder **0:49** · a customer books **1:04**. Caption each with what it proves.
- **SEO / E-E-A-T role:** first-hand "Experience" signal (Helpful Content); `VideoObject` JSON-LD per clip (name, description, duration, thumbnail, uploadDate) — real video-search eligibility.
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Softly lit desk with a glowing screen in a calm, dim room, ready for video thumbnails."
- **Prompt:**
  > A calm, dimly lit workspace at dusk; a single softly glowing monitor slightly out of focus casting warm light on a light-oak desk; moody but clean and premium; darker warm-neutral tones so bright video thumbnails pop against it; open negative space in the center; no readable UI, no people. [STYLE BLOCK] (allow a slightly darker, lower-key grade here)

### §6 — Who it's for / industries *(full photo)*
- **Tells the visitor:** "Built for my trade specifically — cleaning, not a generic scheduler." Converts by relevance; captures vertical searches.
- **Copy H2:** `Made for house cleaning & maid service businesses` → keyword-rich list / chips scoped to real cleaning sub-segments:
  - residential cleaning · commercial/office cleaning · maid services · carpet & window cleaning · move-in/move-out cleaning.
  - *Optional small-print line, not a chip:* "More home-service trades on the roadmap." **Do not** list lawn care, handyman, pool, or pest control as supported — per the product's own PRD ("Pro (Cleaner)") and pricing model (bed/bath/sqft), those trades aren't built, tested, or fit today. Ship this section cleaning-only; widen it only after the product actually supports another trade.
- **SEO role:** cleaning-vertical long-tail ("booking software for maid service", "commercial cleaning scheduling software"). Each sub-segment is an H3 or a linked chip → future dedicated pages.
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Bright, tidy modern home interior in warm daylight suggesting spotless cleaning service."
- **Prompt:**
  > A beautiful, bright modern home interior in warm midday light, glimpsed through open glass doors: spotless clean windows, gleaming floors, an immaculate kitchen just visible inside; aspirational, calm, cared-for; wide clean sky/wall negative space at the top for a headline; no people. [STYLE BLOCK]

### §7 — Why neatr / comparison *(subtle)* — trimmable
- **Tells the visitor:** "Why neatr beats spreadsheets, phone-and-text, or clunky legacy tools." Differentiation for buyers comparing options.
- **Copy H2:** `Why home-service owners switch to neatr` → a simple 3-column table: **Phone & spreadsheets / Legacy tools / neatr**, rows = guest booking, arrival windows on real availability, card-on-file with no upfront charge, owner+team+customer portals.
- **SEO role:** comparison / "alternative" and "best booking software for cleaning" intent. Keep the table as real HTML text (crawlable + AEO-quotable).
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Two tasteful still-life halves — scattered vs. neatly ordered — suggesting order restored."
- **Prompt:**
  > A calm minimalist still life split left-to-right: left side a few loosely scattered paper notes on light oak, right side the same surface neatly ordered with a single phone and a sage sprig; tasteful, muted, low contrast; the composition reads as "chaos → order"; wide clean space for a comparison table overlay; no people. [STYLE BLOCK]

### §8 — Pricing *(subtle / very clean)*
- **Tells the visitor:** "Try it with a free trial, then we'll tailor a plan to your team." There is **no self-serve free tier** — pricing is custom/enterprise, so this section's job is to start a *trial* or a *conversation*, not to display a price.
- **Copy H2:** `Start with a free trial — then a plan that fits your team`
  - A free trial to launch your booking page and run real jobs — no charge to start.
  - Plans are tailored to team size, volume and portals — **custom / enterprise pricing, by quote**.
  - CTAs: `Start your free trial` · `Talk to us for a quote` (`hello@neatr.ai`).
- **SEO / Schema:** target *"…pricing"*, *"book a demo"*, *"free trial"* intent — **not** "free software". **Do not hardcode a `price: 0` Offer** (misleading + risks a price/merchant mismatch) — either omit `offers` or use an `Offer` whose `url` points to the contact/quote page with no false zero. Being upfront that pricing is custom still reads as trust.
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Very bright, near-empty ivory scene with a single soft sage element."
- **Prompt:**
  > An extremely clean, bright, near-empty scene: a smooth warm-ivory surface and wall in soft even light, a single small sage-green plant sprig in one corner as the only object; maximum calm negative space for pricing cards; high-key, minimal, premium; no people. [STYLE BLOCK]

### §9 — FAQ + final CTA *(full photo)*
- **Tells the visitor:** answers the last objections, then asks for the click. Warm, forward-looking close.
- **Copy H2 (FAQ):** `Questions home-service owners ask` — reuse your 6 FAQs (what is neatr, setup time, guest booking, arrival windows, charging customers, cost). **H2 (CTA):** `Start your free trial` + `Talk to us for a quote` + `hello@neatr.ai`.
- **SEO / AEO role:** question-shaped H3s with self-contained answers = prime AI-answer citation fodder (FAQ rich results are gone, but the *text* wins in AI Overviews/Perplexity). Footer carries `Organization` JSON-LD (`sameAs` to all profiles) + internal links.
- **Ratio:** 16:9 desktop (≥2400×1350) · 4:5 mobile crop.
- **Alt:** "Sunlit front porch of a welcoming home at golden hour, calm and forward-looking."
- **Prompt:**
  > The sunlit front doorway and porch of a warm, welcoming modern home at golden hour; soft long light, a clean swept step, a potted eucalyptus by the door; optimistic, calm, "new beginning" mood; open negative space in the center for a closing headline and button; no people. [STYLE BLOCK]

---

## Section-to-SEO cheat sheet

| # | Section | H-tag | Primary keyword focus | Structured data |
|---|---------|-------|----------------------|-----------------|
| 1 | Hero | H1 | online booking software for cleaning businesses | SoftwareApplication |
| 2 | Problem | H2 | missed calls, double-booking, no-shows | — |
| 3 | How it works | H2+H3×3 | how online booking works, setup | VideoObject (clips) |
| 4 | Features | H2+H3×8 | booking page, arrival windows, dispatch suggestions, reminders, card on file, AI setup, embed/API | (feature terms) |
| 5 | Live proof | H2 | real product demo / recordings | VideoObject ×3 |
| 6 | Industries | H2+H3 | maid service / commercial cleaning / move-out cleaning | — |
| 7 | Comparison | H2 | booking software alternative / best for cleaning | — |
| 8 | Pricing | H2 | booking software pricing / free trial / book a demo | Offer (no price=0) or omit |
| 9 | FAQ + CTA | H2+H3 | long-tail questions (AEO) | Organization; FAQ text |

**Reminder:** all of this is on-page (rung 7). It only pays off once the page is indexed, on a real slug at `/`, linked, and in a sitemap — see the SEO audit and the `/seo` skill.

---

## Asset checklist
- [ ] 9 desktop 16:9 images + 9 mobile 4:5 crops (same seed, STYLE BLOCK appended)
- [ ] Photo backgrounds only on §1, §2, §6, §9; near-solid/subtle on §3, §4, §5, §7, §8
- [ ] Exported AVIF/WebP <200 KB; CSS scrim per section
- [ ] Hero preloaded; rest lazy-loaded
- [ ] Alt text set on every image (copy from each section above)

---

## Adversarial review

> Red-team pass on the storyline above. Ranked Critical → Nit. Each finding quotes the claim, states the flaw, gives the fix. *(Codex handoff hung mid-run — this pass was done directly.)*

### 🔴 Critical

1. **"start free today" (§1) contradicts "no self-serve free tier" (§8).** §1's *Tells-the-visitor* promises *"I can start free today"* and the Hero copy leads with `Start your free trial`, but §8 states *"There is **no self-serve free tier** — pricing is custom/enterprise."* A visitor who reads "start free today" and then hits "custom/enterprise pricing, by quote" feels bait-and-switched — the single most trust-corrosive move on a pricing page. **Fix:** make the trial's boundary explicit everywhere it's promised: "Start a free trial — no card to begin" and never imply the *product* is free. Align §1, §8, §9 on one sentence.

2. **Hidden/custom pricing is a conversion killer for this exact segment.** Home-service SMB owners (house cleaners, lawn care, handyman) are price-sensitive, low-ACV, and expect a transparent $/month. "Custom / enterprise pricing, by quote" reads as "expensive and sales-heavy" to a solo operator — they bounce to a competitor showing "$29/mo." The doc treats hiding price as neutral ("being upfront that pricing is custom still reads as trust"); for this ICP it's the opposite. **Fix:** show a real anchor price or a "from $X/mo" band even if final pricing is tailored, OR reposition entirely away from self-serve SMB toward multi-location/enterprise (in which case the whole StoryBrand SMB framing in §1–§6 is wrong). Pick one; the current doc straddles both and will convert neither well.

3. **The whole asset package is built for a bake-off page that may be discarded.** 9 desktop + 9 mobile hero-quality AI images, per-section scrims, AVIF pipeline, alt text — a large production spend on the *winner of an unfinished v29–v34 bake-off* shipped to `/`. If a different variant wins, most of this is thrown away. **Fix:** don't commission all 18 images until the winner is locked. Ship the winner with 3–4 photo sections real, the rest on the "near-solid/subtle" backgrounds (which need no photography) — the doc already says 5 of 9 sections don't need photos, so this is nearly free.

### 🟠 High

4. **Robotic keyword-first H1 hurts conversion.** `Online booking software for cleaning & home-service businesses` is written for a crawler, not a human — it reads like a directory listing and wastes the highest-attention line on the page. Modern Google ranks on relevance/quality, not exact-match H1s. **Fix:** lead with the outcome (`Your customers book themselves. Your team gets dispatched. You get paid.`) and carry the keyword in the subhead/title tag. You lose ~nothing in SEO and gain the hook.

5. **Split CTA everywhere = decision paralysis.** Hero, §8, and §9 each present *two* co-equal CTAs (`Start your free trial` **and** `Talk to us for a quote`). Two primary actions is no primary action. **Fix:** one dominant CTA (trial), demote "Talk to us" to a text link. Never two buttons of equal weight on the same decision.

6. **`SoftwareApplication` may be the wrong primary schema.** The business sells booking software *to* service firms, but the JSON-LD choice signals what Google thinks the entity *is*. If the brand also wants local/service visibility, `Organization` + `Service` (or `Product`) is often a better fit, and `SoftwareApplication` with any `Offer` invites exactly the `price:0` merchant-mismatch the doc warns about. **Fix:** confirm the entity model before hardcoding `SoftwareApplication`; at minimum keep `Organization` as the page-level anchor.

### 🟡 Medium

7. **"Same seed across all 9" misunderstands diffusion seeds.** A fixed seed only yields coherent output for the *same or near-same prompt*; across 9 very different scene prompts it does little for visual coherence (that comes from the STYLE BLOCK, palette, and grade — which the doc already has). **Fix:** drop the "same seed" instruction as a coherence lever; rely on the style block. Keep seed-locking only for regenerating a single image you liked.

8. **Hero: "premium editorial photo" vs. "<200 KB AVIF LCP" is in tension.** A full-bleed, shallow-DoF, film-grain hero is exactly the kind of image that resists compression; forcing it under 200 KB at ≥2400×1350 will visibly degrade it, and it's the LCP element. **Fix:** accept a higher hero budget (or smaller rendered dimensions with `srcset`), and reserve the <200 KB target for the non-hero images.

9. **"One H1 … that hierarchy *is* the SEO skeleton" is overstated.** Heading structure is a minor, mostly-a11y signal in 2026 Google, not a ranking skeleton. Stating it as the SEO backbone risks over-investing in heading tuning over the things that move rankings (indexing, links, content quality, Core Web Vitals — which the doc's own footer reminder gets right). **Fix:** soften to "good for accessibility and extractability," not a ranking mechanism.

10. **9 long sections invites scroll fatigue.** The doc argues for 9 but never weighs it against a tighter page; for a low-consideration SMB tool, a shorter page often out-converts a full StoryBrand epic. **Fix:** treat §2 (problem) and §7 (comparison) as genuinely optional (the doc already flags them trimmable) and A/B the 7-section cut against the full 9.

### ⚪ Nit

11. **FAQ rich results aren't 100% "gone."** The doc says FAQ/HowTo rich results are dead — largely true, but Google still shows FAQ rich results for a small set of authoritative gov/health domains. Immaterial here, just don't state it as absolute.

12. **§6 industry chips promise "future dedicated pages" that don't exist yet.** Linking chips to nonexistent vertical pages creates dead ends / soft-404s at launch. Ship them as anchors or unlinked chips until the pages exist.

### The one argument that kills it

**The page can't decide who it's for.** §1–§6 are a textbook *self-serve SMB* StoryBrand ("start free today," "finish in about a minute," maid/lawn/handyman verticals), while §8 is *enterprise sales* ("custom/enterprise pricing, by quote," "talk to us"). Those are two different funnels with different buyers, different proof, and different CTAs. Until pricing strategy and ICP are reconciled, every section is optimized for a visitor the pricing section then turns away — no amount of copy or imagery polish fixes a page fighting its own business model.

---

## Adversarial review (Codex)

> Second red-team pass, run live through the Codex CLI runtime (verified: real thread, read the doc via an actual `Get-Content` call, cross-checked the structured-data claims against current Google Search Central docs). Ranked Critical → Low. Each finding quotes the claim, states the flaw, gives the fix.

### Critical

1. **"I can start free today" / "Start your free trial"** vs. **"There is no self-serve free tier — pricing is custom/enterprise, by quote."** Sales-motion contradiction: the page sells instant SMB self-serve, then reveals enterprise/custom pricing. **Fix:** choose one motion. If self-serve, state trial terms and show pricing. If sales-led, change CTAs to "Request trial access" / "Book a demo" and drop "start today" language.

2. **"Made for cleaning and every home-service trade."** ICP dilution — cleaning, lawn care, handyman, pest control, pool service, "and more" imply broad vertical support the page doesn't prove. **Fix:** make the homepage cleaning-first unless the product has real workflow proof for each trade; push other verticals to dedicated pages later.

3. **"no-shows with no deposit"** (§2) vs. **"Payments with card on file — verified at booking, charged after the job ('No payment due today')"** (§4). The named pain isn't actually solved — card-on-file without a deposit or preauth reduces friction but doesn't protect against no-shows. **Fix:** say exactly what happens: deposit, authorization hold, cancellation fee, no-show fee, or plainly "secure a card before dispatch." Don't imply deposit-level protection without it.

### High

4. **"Online booking software for cleaning & home-service businesses"** (H1). Crawler-first and emotionally flat — states the category, not why the owner should care. **Fix:** outcome-led H1, e.g. "Let customers book themselves while your team gets dispatched." Keep the exact keyword in the title tag, subhead, and early body copy.

5. **`SoftwareApplication` JSON-LD / "Offer (no price=0) or omit."** Internally conflicted: Google's SoftwareApplication rich result requires `name`, `offers.price`, and either `aggregateRating` or `review` — omitting `offers` may be valid schema.org markup but isn't eligible for that rich result. **Fix:** use `Organization` + `WebSite` + `WebPage` as the safe baseline; add `SoftwareApplication` only with truthful price and review/rating data. ([Google Software App docs](https://developers.google.com/search/docs/appearance/structured-data/software-app))

6. **"`VideoObject` JSON-LD per clip … real video-search eligibility."** Overstated — Google requires `name`, `thumbnailUrl`, `uploadDate`, recommends `contentUrl`/`embedUrl`; valid markup still doesn't guarantee display. **Fix:** add visible embedded videos, unique thumbnails, transcripts, `contentUrl`/`embedUrl`; don't imply rich-result certainty. ([Google Video docs](https://developers.google.com/search/docs/appearance/structured-data/video))

7. **"customers finish in about a minute" / "2-hour windows based on travel buffers and existing jobs" / "auto-assign and route the day's jobs."** Specific operational claims without proof. **Fix:** back each with demo footage, screenshots, or customer data — or soften to "designed for fast booking," "availability-aware arrival windows," "dispatch tools for assigning jobs."

8. **Hero image: "freshly cleaned modern living room … a tablet resting on a clean counter slightly out of focus."** Sells cleaning-service ambience, not SaaS capability — the product is literally out of focus. **Fix:** show the real booking/dispatch workflow above the fold; use lifestyle photography only as secondary atmosphere.

### Medium

9. **"put the target keyword in each H3."** Keyword-stuffed component architecture reads mechanical and can erode buyer trust. **Fix:** natural feature headings first; keywords in supporting copy where they fit.

10. **"question-shaped H3s with self-contained answers = prime AI-answer citation fodder."** AEO formula thinking — clear Q&A helps extraction but isn't a citation guarantee. **Fix:** prioritize answers with real product substance (setup limits, integrations, billing rules, deposits, dispatch logic, cancellation handling) over heading shape.

11. **"Every image needs alt text … it's an SEO + a11y requirement."** Decorative background images shouldn't all get descriptive alt text — it adds noise for screen-reader users. **Fix:** empty `alt=""` or CSS backgrounds for decorative ambience; descriptive alt text reserved for meaningful product screenshots, video thumbnails, diagrams.

12. **"Photo backgrounds only on the emotional beats — §1, §2, §6, §9."** Over-indexes on generic home-service mood over product proof; four large emotional images plus five subtle backgrounds can feel polished but unverifiable. **Fix:** replace at least one emotional background with a real product screenshot or annotated workflow — proof beats ambience for SaaS conversion.

### Low

13. **"FAQ rich results are gone."** Broadly right, but shouldn't be the core rationale either way — Google removed the FAQ rich-result documentation after the feature stopped appearing in Search as of May 7, 2026. **Fix:** keep FAQ for buyer objections and answer clarity, not rich-result expectation. ([Google Search Central updates](https://developers.google.com/search/updates#removing-faq-rich-result))

14. **"same seed across all 9."** Weak image-generation control — a shared seed across different prompts doesn't guarantee coherent art direction. **Fix:** lock palette, lens, lighting, crop rules, and post-grade; reuse seed only when iterating a single image.

15. **"9 desktop 16:9 images + 9 mobile 4:5 crops."** High asset burden before message-market fit is proven. **Fix:** ship fewer assets first — one strong hero/product composite, real videos/screenshots, lightweight backgrounds elsewhere.

### Strongest objection

The plan can't decide whether neatr.ai is a self-serve SMB tool or a sales-led custom/enterprise product. The copy, industries, CTAs, and "start free today" promise attract price-sensitive small operators, but the pricing section asks them to enter a quote-led enterprise motion. That mismatch is more damaging than any SEO, schema, or visual issue — it breaks trust exactly at conversion. Same root cause the first review's "one argument that kills it" identified, now independently confirmed twice over.
