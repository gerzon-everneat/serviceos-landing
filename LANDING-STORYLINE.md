# neatr — Landing Page Storyline, SEO Map & Background-Image Prompts

**Date:** 2026-07-06 · For: the new primary landing page (winner of the v29–v34 bake-off, shipped to `/`).
**Product in one line:** online booking software for cleaning & home-service businesses — customers book themselves, jobs get dispatched, you get paid.
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
- **Tells the visitor:** "This is booking + dispatch + payment for my home-service business, and I can start free today." The whole value prop in 5 seconds.
- **Copy:** H1 keyword-first; brand line as subhead; one primary CTA + one demo CTA.
  - **H1:** `Online booking software for cleaning & home-service businesses`
  - **Subhead:** *Bookings in. Jobs dispatched. You just grow.* Take bookings online, dispatch your team, and get paid — with a booking page customers finish in about a minute.
  - **CTAs:** `Start your free trial` · `Watch a customer book (1:04)`
- **SEO role:** primary keyword in H1; page-level `SoftwareApplication` JSON-LD; the LCP section.
- **Alt:** "Sunlit, freshly cleaned modern living room with a booking tablet on the counter."
- **Prompt:**
  > A bright, freshly cleaned modern living room bathed in soft morning light; warm off-white walls, light oak floor, a few eucalyptus stems in a ceramic vase, subtle sage-green accents; a tablet resting on a clean counter slightly out of focus; airy, calm, in-control atmosphere; large empty negative space in the upper-left for a headline; no people. [STYLE BLOCK]

### §2 — The problem *(full photo)*
- **Tells the visitor:** "You're losing jobs to phone tag, double-bookings and no-shows. Manual scheduling doesn't scale." Name the pain so they feel understood.
- **Copy H2:** `Missed calls and double-bookings are costing you jobs`
  - 3 short pain bullets: phone/text tag after hours · double-booked or forgotten jobs · no-shows with no deposit.
- **SEO role:** captures pain long-tail ("stop missing booking calls", "double-booking scheduling"). H2 + supporting text.
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
- **Alt:** "Light oak desk from above with a laptop and phone showing a soft, blurred booking calendar."
- **Prompt:**
  > Minimal top-down flat-lay on a light oak surface, mostly empty; a laptop and a phone at the edges showing soft, heavily out-of-focus booking-calendar UI (unreadable, just color and shape); a single eucalyptus sprig; very low contrast, high-key, lots of clean empty space across the center for three text columns; no people. [STYLE BLOCK]

### §4 — Features deep-dive *(subtle / near-solid)* — **main ranking section**
- **Tells the visitor:** exactly what the product does, each capability tied to a job it removes.
- **Copy H2:** `Booking, scheduling & dispatch software built for home-service teams` → six H3 feature cards:
  - **Online booking page for your customers** — guests book with no account.
  - **Arrival windows that match real availability** — 2-hour windows based on travel buffers and existing jobs.
  - **Instant quotes & upfront pricing** — customers see the price before they book.
  - **Dispatch software for field teams** — auto-assign and route the day's jobs.
  - **Automated SMS & email reminders** — cut no-shows.
  - **Payments with card on file** — verified at booking, charged after the job ("No payment due today").
- **SEO role:** this is where you rank for feature terms — put the target keyword in each H3, one supporting sentence each. Densest keyword real estate on the page.
- **Alt:** "Soft ivory and sage color-blocked surface, mostly empty, for feature cards."
- **Prompt:**
  > Almost-abstract, very soft-focus background: gently blurred ivory and sage-green color blocking with a hint of light-oak texture in one corner; extremely low contrast, calm, high-key, mostly empty; no discernible objects; designed to sit behind white feature cards; no people. [STYLE BLOCK]

### §5 — Live proof / real recordings *(subtle / cinematic)*
- **Tells the visitor:** "This isn't a mockup. Watch the real, unedited product." Kills skepticism; strongest trust asset.
- **Copy H2:** `See the real product — unedited recordings`
  - Three players: setup **1:42** · form builder **0:49** · a customer books **1:04**. Caption each with what it proves.
- **SEO / E-E-A-T role:** first-hand "Experience" signal (Helpful Content); `VideoObject` JSON-LD per clip (name, description, duration, thumbnail, uploadDate) — real video-search eligibility.
- **Alt:** "Softly lit desk with a glowing screen in a calm, dim room, ready for video thumbnails."
- **Prompt:**
  > A calm, dimly lit workspace at dusk; a single softly glowing monitor slightly out of focus casting warm light on a light-oak desk; moody but clean and premium; darker warm-neutral tones so bright video thumbnails pop against it; open negative space in the center; no readable UI, no people. [STYLE BLOCK] (allow a slightly darker, lower-key grade here)

### §6 — Who it's for / industries *(full photo)*
- **Tells the visitor:** "Built for my trade specifically." Converts by relevance; captures vertical searches.
- **Copy H2:** `Made for cleaning and every home-service trade` → keyword-rich list / chips:
  - house cleaning & maid services · carpet & window cleaning · lawn care & landscaping · handyman · pool service · pest control · and more.
- **SEO role:** vertical long-tail ("booking software for maid service", "scheduling for lawn care"). Each vertical is an H3 or a linked chip → future dedicated pages.
- **Alt:** "Bright, tidy modern home exterior and interior in warm daylight suggesting spotless service."
- **Prompt:**
  > A beautiful, bright modern home in warm midday light, part exterior and part glimpsed interior through open glass doors: spotless clean windows, a tidy trimmed lawn edge, an immaculate kitchen just visible inside; aspirational, calm, cared-for; wide clean sky/wall negative space at the top for a headline; no people. [STYLE BLOCK]

### §7 — Why neatr / comparison *(subtle)* — trimmable
- **Tells the visitor:** "Why neatr beats spreadsheets, phone-and-text, or clunky legacy tools." Differentiation for buyers comparing options.
- **Copy H2:** `Why home-service owners switch to neatr` → a simple 3-column table: **Phone & spreadsheets / Legacy tools / neatr**, rows = guest booking, arrival windows on real availability, card-on-file with no upfront charge, owner+team+customer portals.
- **SEO role:** comparison / "alternative" and "best booking software for cleaning" intent. Keep the table as real HTML text (crawlable + AEO-quotable).
- **Alt:** "Two tasteful still-life halves — scattered vs. neatly ordered — suggesting order restored."
- **Prompt:**
  > A calm minimalist still life split left-to-right: left side a few loosely scattered paper notes on light oak, right side the same surface neatly ordered with a single phone and a sage sprig; tasteful, muted, low contrast; the composition reads as "chaos → order"; wide clean space for a comparison table overlay; no people. [STYLE BLOCK]

### §8 — Pricing *(subtle / very clean)*
- **Tells the visitor:** "Try it free, then we'll tailor a plan to your team." There is **no self-serve free tier** — pricing is custom/enterprise, so this section's job is to start a *trial* or a *conversation*, not to display a price.
- **Copy H2:** `Start with a free trial — then a plan that fits your team`
  - A free trial to launch your booking page and run real jobs — no charge to start.
  - Plans are tailored to team size, volume and portals — **custom / enterprise pricing, by quote**.
  - CTAs: `Start your free trial` · `Talk to us for a quote` (`hello@neatr.ai`).
- **SEO / Schema:** target *"…pricing"*, *"book a demo"*, *"free trial"* intent — **not** "free software". **Do not hardcode a `price: 0` Offer** (misleading + risks a price/merchant mismatch) — either omit `offers` or use an `Offer` whose `url` points to the contact/quote page with no false zero. Being upfront that pricing is custom still reads as trust.
- **Alt:** "Very bright, near-empty ivory scene with a single soft sage element."
- **Prompt:**
  > An extremely clean, bright, near-empty scene: a smooth warm-ivory surface and wall in soft even light, a single small sage-green plant sprig in one corner as the only object; maximum calm negative space for pricing cards; high-key, minimal, premium; no people. [STYLE BLOCK]

### §9 — FAQ + final CTA *(full photo)*
- **Tells the visitor:** answers the last objections, then asks for the click. Warm, forward-looking close.
- **Copy H2 (FAQ):** `Questions home-service owners ask` — reuse your 6 FAQs (what is neatr, setup time, guest booking, arrival windows, charging customers, cost). **H2 (CTA):** `Start your free trial` + `Talk to us for a quote` + `hello@neatr.ai`.
- **SEO / AEO role:** question-shaped H3s with self-contained answers = prime AI-answer citation fodder (FAQ rich results are gone, but the *text* wins in AI Overviews/Perplexity). Footer carries `Organization` JSON-LD (`sameAs` to all profiles) + internal links.
- **Alt:** "Sunlit front porch of a welcoming home at golden hour, calm and forward-looking."
- **Prompt:**
  > The sunlit front doorway and porch of a warm, welcoming modern home at golden hour; soft long light, a clean swept step, a potted eucalyptus by the door; optimistic, calm, "new beginning" mood; open negative space in the center for a closing headline and button; no people. [STYLE BLOCK]

---

## Section-to-SEO cheat sheet

| # | Section | H-tag | Primary keyword focus | Structured data |
|---|---------|-------|----------------------|-----------------|
| 1 | Hero | H1 | online booking software for cleaning/home-service | SoftwareApplication |
| 2 | Problem | H2 | missed calls, double-booking, no-shows | — |
| 3 | How it works | H2+H3×3 | how online booking works, setup | VideoObject (clips) |
| 4 | Features | H2+H3×6 | booking page, arrival windows, dispatch, reminders, card on file | (feature terms) |
| 5 | Live proof | H2 | real product demo / recordings | VideoObject ×3 |
| 6 | Industries | H2+H3 | maid service / carpet / lawn / handyman booking | — |
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
