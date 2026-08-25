import type { Metadata } from "next";
import Bg3D from "./v33/components/Bg3D";
import LeadForm from "./v33/components/LeadForm";
import ShowcaseVideos from "./v33/components/ShowcaseVideos";
import { FAQ, SITE, UPLOAD_DATE, VIDEOS } from "./v33/content";

/* Base landing page — v33: the conversion landing. Server-rendered for SEO;
   the only client islands are the two video players. Warm paper canvas,
   DM Sans + Cormorant, lime reserved for live-state and one highlight per screen. */

const SANS = "var(--font-dm-sans), system-ui, sans-serif";
const SERIF = "var(--font-cormorant), Georgia, serif";
/* Early access: no self-serve signup for now. Every primary CTA routes to the
   on-page lead form (#get-access); we onboard requesters personally. Existing
   users still log in. */
const GET_ACCESS = "#get-access";
const LOGIN = "https://book.neatr.ai/auth/login";

export const metadata: Metadata = {
  title: "Let customers book instantly while Neatr handles the rest",
  description:
    "Online booking, dispatch, and payments for cleaning and home-service businesses. Join the waiting list — we're onboarding businesses personally and building your booking page with you. No credit card.",
  keywords:
    "online booking software, cleaning business software, home service booking system, service scheduling software, booking page for cleaning company, dispatch software, arrival windows",
  alternates: { canonical: SITE },
  openGraph: {
    title: "neatr — Bookings in. Jobs dispatched. You just grow.",
    description:
      "Real recordings of the live product: set up operations in 1:42, customize your booking form in 49 seconds, and watch a customer book in 1:04.",
    url: SITE,
    siteName: "neatr",
    type: "website",
    locale: "en_US",
    images: [{ url: `https://cdn.neatr.ai/assets/videos/poster-03.jpg`, width: 1600, height: 900, alt: "A customer booking a cleaning on neatr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "neatr — Bookings in. Jobs dispatched. You just grow.",
    description: "Real recordings of the live product — from sign-up to a paid booking.",
    images: [`https://cdn.neatr.ai/assets/videos/poster-03.jpg`],
  },
  robots: { index: true, follow: true },
};

function MarkGrid() {
  const pts = [10, 24, 38].flatMap((y) => [10, 24, 38].map((x) => ({ x, y })));
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden>
      {pts.map(({ x, y }, i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 5 : 3.2} fill={i === 4 ? "#C8FF00" : "#0A0A0A"} opacity={i === 4 ? 1 : 0.75} />
      ))}
    </svg>
  );
}

const FEATURES = [
  { t: "Online booking page for your customers", c: "A booking page customers finish in about a minute — from your website, Google profile, or social links. Guest checkout, no accounts, works on any phone." },
  { t: "Service scheduling with arrival windows", c: "Customers pick a two-hour arrival window — and only windows your team can actually make are offered, based on real availability and travel buffers." },
  { t: "Instant quotes & upfront pricing", c: "Production rates, size tiers, and pricing rules compute the quote while the customer books. No callbacks to “get you a price.”" },
  { t: "Dispatch software for field teams", c: "Every booking lands on a dispatch board. Assign cleaners and technicians with availability already checked, and reassignments handled cleanly." },
  { t: "Automated SMS & email reminders", c: "Booking confirmations, appointment reminders, and on-my-way messages send themselves — over email and SMS." },
  { t: "Payments with card on file", c: "Cards are verified at booking and charged after the job. “No payment due today” for them, no no-show losses for you." },
];

const PLANS = [
  {
    name: "Early access",
    price: "Free trial",
    per: "while we finalize pricing",
    tag: null as string | null,
    items: ["Your booking page, set up for you", "Catalog + pricing setup", "Guest checkout for customers", "Dispatch, notifications & payments"],
    cta: "Request access",
    href: GET_ACCESS,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "tailored to your operation",
    tag: "Talk to us",
    items: ["Unlimited providers", "Dispatch board + auto-assign", "Automated email & SMS notifications", "Payments with card on file", "Your branding on everything"],
    cta: "Contact us",
    href: "mailto:hello@neatr.ai",
  },
];

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "neatr",
      url: SITE,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Online booking software for cleaning and home-service businesses: booking page, dispatch, notifications, and payments.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    // Organization grounds the brand entity for search + AI answer engines.
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "neatr",
      url: SITE,
      email: "hello@neatr.ai",
      description: "neatr is online booking software for cleaning and home-service businesses.",
      sameAs: ["https://book.neatr.ai"],
    },
    // HowTo rich results were deprecated by Google (2023) — mark the videos
    // directly as VideoObject, which still earns video rich results.
    ...VIDEOS.map((v) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.name,
      description: v.description,
      contentUrl: v.src,
      thumbnailUrl: v.poster,
      duration: v.duration,
      uploadDate: UPLOAD_DATE,
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div style={{ fontFamily: SANS, background: "#FBFBF9", color: "#0A0A0A" }} className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Bg3D />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm">
        Skip to content
      </a>

      {/* ─── Nav ─── */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#E7E6E1] bg-[#FBFBF9]/85 backdrop-blur-md">
        <nav aria-label="Main" className="mx-auto flex h-14 w-full max-w-[1200px] items-center gap-7 px-5 md:px-8">
          <a href="#main" className="flex items-center gap-2.5 no-underline">
            <MarkGrid />
            <span className="text-[15px] font-bold tracking-tight text-[#0A0A0A]">neatr</span>
          </a>
          <div className="ml-auto hidden items-center gap-7 md:flex">
            {[["#how", "How it works"], ["#product", "Product"], ["#pricing", "Pricing"], ["#faq", "FAQ"]].map(([href, label]) => (
              <a key={href} href={href} className="text-[13.5px] font-medium text-[#0A0A0A]/60 no-underline transition-colors hover:text-[#0A0A0A]">
                {label}
              </a>
            ))}
          </div>
          <a href={LOGIN} className="ml-auto text-[13.5px] font-medium text-[#0A0A0A]/60 no-underline transition-colors hover:text-[#0A0A0A] md:ml-0">
            Log in
          </a>
          <a
            href={GET_ACCESS}
            className="rounded-full bg-[#0A0A0A] px-4 py-2 text-[13px] font-semibold text-white no-underline transition-opacity hover:opacity-85"
          >
            Join waiting list
          </a>
        </nav>
      </header>

      <main id="main" className="relative z-[1]">
        {/* ─── Hero — Attio-style: centered copy, then the product stage ─── */}
        <section aria-labelledby="hero-h" className="w-full px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32">
          <div className="mx-auto w-full max-w-[880px] text-center">
            <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">
              Online booking software for home-service businesses
            </p>
            <h1 id="hero-h" className="m-0 text-[clamp(42px,7vw,68px)] font-bold leading-[1.02] tracking-[-0.025em]">
              Customers book instantly.
              <br />
              Neatr handles the rest.
            </h1>
            <p className="mx-auto mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-[#0A0A0A]/62">
              neatr gives your cleaning or home-service business a booking page customers finish in about a minute — and runs the
              dispatch, notifications, and payments behind it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={GET_ACCESS}
                className="rounded-full bg-[#0A0A0A] px-6 py-3.5 text-[14.5px] font-semibold text-white no-underline transition-opacity hover:opacity-85"
              >
                Join the waiting list
              </a>
              <a
                href="#how"
                className="rounded-full border border-[#0A0A0A]/20 px-6 py-3.5 text-[14.5px] font-semibold text-[#0A0A0A] no-underline transition-colors hover:border-[#0A0A0A]/45"
              >
                Watch the demos
              </a>
            </div>
            <p className="mt-5 text-[13px] text-[#0A0A0A]/45">Free trial · No credit card · We set you up personally</p>
          </div>
          {/* The product IS the hero — recordings on one big stage, Attio-style */}
          <div id="how" className="mx-auto mt-14 w-full max-w-[1400px] scroll-mt-24 md:mt-16">
            <ShowcaseVideos />
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="product" aria-labelledby="product-h" className="scroll-mt-20 border-t border-[#E7E6E1] bg-white">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">Product</p>
            <h2 id="product-h" className="m-0 max-w-[34ch] text-[clamp(28px,4.5vw,44px)] font-bold leading-tight tracking-[-0.015em]">
              Booking, scheduling & dispatch software for <em style={{ fontFamily: SERIF, fontWeight: 600 }}>cleaning and home-service businesses.</em>
            </h2>
            <p className="m-0 mt-5 max-w-[62ch] text-[15.5px] leading-relaxed text-[#0A0A0A]/60">
              neatr is cleaning business software and a home-service booking system in one: an online booking form for your
              customers, service scheduling and dispatch for your team, and automated notifications and payments behind it all.
            </p>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.t}>
                  <h3 className="m-0 flex items-center gap-2.5 text-[15.5px] font-semibold">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8FF00] ring-1 ring-[#3A5000]/30" aria-hidden />
                    {f.t}
                  </h3>
                  <p className="m-0 mt-2.5 text-[14.5px] leading-relaxed text-[#0A0A0A]/60">{f.c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Getting started — question-shaped, self-contained for AI answer engines ─── */}
        <section id="get-started" aria-labelledby="start-h" className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">Getting started</p>
          <h2 id="start-h" className="m-0 max-w-[30ch] text-[clamp(28px,4.5vw,44px)] font-bold leading-tight tracking-[-0.015em]">
            How do I start taking bookings with <em style={{ fontFamily: SERIF, fontWeight: 600 }}>neatr?</em>
          </h2>
          <p className="m-0 mt-5 max-w-[68ch] text-[15.5px] leading-relaxed text-[#0A0A0A]/60">
            Join the waiting list with your email, and we&rsquo;ll set you up personally — name your business, and your
            booking page goes live at your own address, no credit card. The core setup takes about two minutes; the full
            recordings on this page show it unedited.
          </p>
          <ol className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Create your account", c: "Enter your email and confirm a one-time code — no password to invent, no credit card." },
              { t: "Name your business", c: "Your business name becomes your booking address, like sparkle-cleaning.neatr.ai — availability checked as you type." },
              { t: "Set services & pricing", c: "Categories, services, sizes, and rates. The unedited recording above does it in 1 minute 42 seconds." },
              { t: "Share your booking page", c: "Put the link on your website, Google profile, or socials. Customers book as guests in about a minute." },
            ].map((s, i) => (
              <li key={s.t}>
                <p className="m-0 flex items-center gap-2.5 text-[15.5px] font-semibold">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C8FF00] text-[12px] font-bold text-[#0A0A0A]">{i + 1}</span>
                  {s.t}
                </p>
                <p className="m-0 mt-2.5 text-[14.5px] leading-relaxed text-[#0A0A0A]/60">{s.c}</p>
              </li>
            ))}
          </ol>
          <a
            href={GET_ACCESS}
            className="mt-10 inline-block rounded-full bg-[#0A0A0A] px-6 py-3.5 text-[14.5px] font-semibold text-white no-underline transition-opacity hover:opacity-85"
          >
            Join the waiting list
          </a>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" aria-labelledby="pricing-h" className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">Pricing</p>
          <h2 id="pricing-h" className="m-0 text-[clamp(28px,4.5vw,44px)] font-bold leading-tight tracking-[-0.015em]">
            Starts at <em style={{ fontFamily: SERIF, fontWeight: 600 }}>zero.</em>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col rounded-2xl border p-7 md:p-9 ${p.tag ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-[#E7E6E1] bg-white"}`}
              >
                <div className="flex items-center gap-3">
                  <h3 className="m-0 text-[17px] font-semibold">{p.name}</h3>
                  {p.tag && (
                    <span className="rounded-full bg-[#C8FF00] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#0A0A0A]">{p.tag}</span>
                  )}
                </div>
                <p className="m-0 mt-4">
                  <span className="text-[40px] font-bold tracking-tight">{p.price}</span>{" "}
                  <span className={`text-[13.5px] ${p.tag ? "text-white/55" : "text-[#0A0A0A]/50"}`}>{p.per}</span>
                </p>
                <ul className={`m-0 mt-6 flex list-none flex-col gap-3 p-0 text-[14.5px] ${p.tag ? "text-white/80" : "text-[#0A0A0A]/70"}`}>
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <svg className="mt-1 shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6.2L4.8 9L10 3.4" stroke={p.tag ? "#C8FF00" : "#3A5000"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  className={`mt-8 rounded-full px-6 py-3 text-center text-[14px] font-semibold no-underline transition-opacity hover:opacity-85 ${
                    p.tag ? "bg-[#C8FF00] text-[#0A0A0A]" : "bg-[#0A0A0A] text-white"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" aria-labelledby="faq-h" className="scroll-mt-20 border-t border-[#E7E6E1] bg-white">
          <div className="mx-auto w-full max-w-[840px] px-5 py-20 md:px-8 md:py-28">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">FAQ</p>
            <h2 id="faq-h" className="m-0 text-[clamp(28px,4.5vw,40px)] font-bold leading-tight tracking-[-0.015em]">
              Questions owners <em style={{ fontFamily: SERIF, fontWeight: 600 }}>actually ask.</em>
            </h2>
            <div className="mt-10 divide-y divide-[#E7E6E1] border-y border-[#E7E6E1]">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg className="shrink-0 transition-transform duration-200 group-open:rotate-45" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M7 1v12M1 7h12" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="m-0 mt-3 max-w-[64ch] text-[14.5px] leading-relaxed text-[#0A0A0A]/62">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Closing CTA — early-access lead capture ─── */}
        <section id="get-access" aria-labelledby="cta-h" className="scroll-mt-20 bg-[#0A0A0A]">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-24 text-center md:px-8 md:py-32">
            <h2 id="cta-h" className="mx-auto m-0 max-w-[20ch] text-[clamp(32px,5.5vw,56px)] font-semibold leading-[1.05] text-white" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
              Watch it once — then get on the list.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/55">
              We{"’"}re onboarding a few businesses at a time. Leave your email and a bit about your business — we{"’"}ll set
              you up personally.
            </p>
            <LeadForm />
            <p className="mt-4 text-[12.5px] text-white/35">or email hello@neatr.ai</p>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative z-[1] border-t border-[#E7E6E1] bg-[#FBFBF9]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-8 text-[13px] text-[#0A0A0A]/50 sm:flex-row md:px-8">
          <p className="m-0 flex items-center gap-2">
            <MarkGrid /> <span className="font-semibold text-[#0A0A0A]">neatr</span> · © 2026
          </p>
          <nav aria-label="Footer" className="flex items-center gap-6">
            <a href="https://book.neatr.ai" className="text-[#0A0A0A]/50 no-underline hover:text-[#0A0A0A]">Live product</a>
            <a href="#how" className="text-[#0A0A0A]/50 no-underline hover:text-[#0A0A0A]">Demo videos</a>
            <a href="#faq" className="text-[#0A0A0A]/50 no-underline hover:text-[#0A0A0A]">FAQ</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
