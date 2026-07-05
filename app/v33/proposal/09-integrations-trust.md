# 09 — Integrations & trust strip

**Placement:** two small pieces, not a full section:
1. A one-line trust note directly under the pricing cards.
2. A slim logo strip above the footer.

**Purpose:** conversion trust. Near-zero SEO weight — keep it tiny.

---

## Draft copy

### 1. Trust line under pricing
> Payments processed by **Stripe**. Card data never touches our servers.

### 2. Logo strip above footer

> **Eyebrow:** Runs on

| Logo | Line |
|---|---|
| **Stripe** | Payments and card on file |
| **Twilio** | SMS reminders and on-my-way texts |
| **Amazon SES** | Email confirmations and notifications |

One row, grayscale logos, 12px captions. No heading bigger than the eyebrow — this is furniture, not a feature.

---

## Rules

- **Only what ships:** Stripe, Twilio, AWS SES. No calendar sync, no QuickBooks, no Zapier until they exist — an integrations page full of "coming soon" badges is a trust drain.
- Logos as SVG with `alt` text ("Stripe logo — payment processing for neatr"), but no schema markup; this earns nothing structured.
- Respect each brand's logo usage guidelines (Stripe and Twilio both publish them) — grayscale versions are safe.
- If/when a real integrations directory exists (`/integrations/[tool]` pages), this strip becomes its link hub — same pattern as industries (§01) and comparisons (§04).
