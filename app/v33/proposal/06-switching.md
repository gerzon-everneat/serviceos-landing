# 06 — Switching / migration objection-killer

**Placement:** between Pricing and FAQ. Can merge with [04-comparison.md](04-comparison.md) into one "Switching" section if the page gets long.
**Section id:** `#switch`
**Keywords:** switch from spreadsheets · import customer list · move booking system without losing customers

---

## Draft copy

> **Eyebrow:** Switching

### H2
Already running on spreadsheets *and text messages?*

### Intro
Most owners come to neatr from a calendar, a spreadsheet, and a phone that won't stop. Moving over is three steps, and none of them pause your business:

### Steps

**1. Bring your customer list.**
Send us your spreadsheet — names, emails, addresses. We load it so your regulars are already there on day one.

**2. Rebuild your catalog in minutes.**
Services, pricing tiers, arrival windows, branding. The unedited recording above shows a full setup in 1 minute 45 seconds. <!-- internal link to #how — reuses the existing video asset -->

**3. Share one link.**
Your booking page replaces the back-and-forth. New customers book as guests; regulars see their history.

### Closing line
Your old system keeps working while you set up — switch the link when you're ready.

---

## New FAQ entries (add to `FAQ` in `content.ts` — flows into FAQPage schema automatically)

```ts
{
  q: "Can I import my existing customers into neatr?",
  a: "Yes. Send us your customer list as a spreadsheet — names, emails, and addresses — and we'll load it into your account so your regulars are there from day one.",
},
{
  q: "Can I switch to neatr without interrupting my current bookings?",
  a: "Yes. Your existing system keeps working while you set up neatr in parallel. When your catalog and pricing are ready, you switch your booking link — nothing pauses.",
},
```

---

## SEO notes

- Step 2 internally links to the `#how` video section — reuses the strongest existing asset instead of new claims.
- "We load it for you" is a manual founder-led promise — fine at early-access scale; revisit the wording when a self-serve CSV import ships.
- The FAQ additions are the SEO payload here (FAQPage schema + long-tail question queries); the section body is conversion support.
