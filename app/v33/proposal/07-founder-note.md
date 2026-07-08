# 07 — Founder note / About

**Placement:** low on page, between FAQ and the closing CTA. **Moves up to the §03 slot** until real testimonials exist.
**Section id:** `#about`
**Purpose:** E-E-A-T (identifiable human behind the product) + trust for an early-access product with no logos yet. Not a keyword section.

---

## Draft copy

> **Eyebrow:** Why neatr exists

### H2
Built from a *working cleaning company.*

### Body (first person, ~80 words)
I'm Gerzon. neatr started inside Everneat, the cleaning business I run — as the software we needed and couldn't buy: a booking page customers actually finish, a dispatch board that checks availability before we promise a time, and payments that don't require chasing anyone. Everything you see in the recordings on this page is the same system our own team dispatches on. If it doesn't survive our Saturdays, it doesn't ship.

*Photo:* founder headshot, real. *Signature line:* Gerzon — founder, neatr · [hello@neatr.ai](mailto:hello@neatr.ai)

<!-- ^ Verify wording with Gerzon before shipping — first-person copy must be his voice, this is a scaffold. -->

---

## Organization JSON-LD (add to `jsonLd` array in `layout.tsx` — currently missing)

```ts
{
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "neatr",
  url: SITE,
  logo: `${SITE}/logo.png`, // confirm asset path
  founder: { "@type": "Person", name: "Gerzon" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@neatr.ai",
    contactType: "sales",
  },
  // sameAs: ["https://twitter.com/...", "https://linkedin.com/company/..."], // add when profiles exist
},
```

---

## SEO notes

- `Organization` schema is the one structured-data addition worth making now — it feeds the knowledge panel and ties the `SoftwareApplication` entity to a real company.
- The "dogfooded at Everneat" story is a genuine differentiator vs every competitor — it's also verifiable, which is what E-E-A-T rewards.
- Link to a fuller `/about` page when one exists; until then the section is self-contained.
