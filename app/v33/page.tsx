import Bg3D from "./components/Bg3D";
import HeroPlayer from "./components/HeroPlayer";
import StepVideos from "./components/StepVideos";
import { FAQ } from "./content";

/* v33 — the conversion landing. Server-rendered for SEO; the only client
   islands are the two video players. Warm paper canvas, DM Sans + Cormorant,
   lime reserved for live-state and one highlight per screen. */

const SANS = "var(--font-dm-sans), system-ui, sans-serif";
const SERIF = "var(--font-cormorant), Georgia, serif";
const SIGNUP = "https://book.neatr.ai/auth/signup";

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
  { t: "Arrival windows", c: "Customers pick a two-hour window — and only windows your team can actually make are offered, based on real availability and travel buffers." },
  { t: "Pricing matrix", c: "Production rates, size tiers, and dynamic rules compute the quote while the customer books. No callbacks to “get you a price.”" },
  { t: "Dispatch & assignment", c: "Every booking lands on a board. Assign providers with availability already checked, and reassignments handled cleanly." },
  { t: "Card on file", c: "Cards are verified at booking and charged after the job. “No payment due today” for them, no no-show losses for you." },
  { t: "Three portals", c: "Owner admin, provider app, customer portal. Everyone sees exactly their slice of the same booking." },
  { t: "Automated notifications", c: "Confirmations, reminders, and on-my-way messages go out by themselves, over email and SMS." },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    per: "to start",
    tag: null as string | null,
    items: ["Your booking page, live today", "Catalog + pricing setup", "Guest checkout for customers", "One provider"],
    cta: "Start free",
  },
  {
    name: "Business",
    price: "$149",
    per: "per month",
    tag: "Most popular",
    items: ["Unlimited providers", "Dispatch board + auto-assign", "Automated email & SMS notifications", "Payments with card on file", "Your branding on everything"],
    cta: "Start with Business",
  },
];

export default function V33Page() {
  return (
    <div style={{ fontFamily: SANS, background: "#FBFBF9", color: "#0A0A0A" }} className="min-h-screen">
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
          <a
            href={SIGNUP}
            className="ml-auto rounded-full bg-[#0A0A0A] px-4 py-2 text-[13px] font-semibold text-white no-underline transition-opacity hover:opacity-85 md:ml-0"
          >
            Start free
          </a>
        </nav>
      </header>

      <main id="main" className="relative z-[1]">
        {/* ─── Hero ─── */}
        <section aria-labelledby="hero-h" className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[1fr_1.05fr] md:gap-14 md:px-8 md:pb-28 md:pt-40">
          <div>
            <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">
              Online booking software for home-service businesses
            </p>
            <h1 id="hero-h" className="m-0 text-[clamp(38px,7vw,64px)] font-bold leading-[1.02] tracking-[-0.02em]">
              Bookings in.
              <br />
              Jobs dispatched.
              <br />
              <em style={{ fontFamily: SERIF, fontWeight: 600 }}>You just grow.</em>
            </h1>
            <p className="mt-6 max-w-[46ch] text-[16.5px] leading-relaxed text-[#0A0A0A]/62">
              neatr gives your cleaning or home-service business a booking page customers finish in about a minute — and runs the
              dispatch, notifications, and payments behind it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={SIGNUP}
                className="rounded-full bg-[#0A0A0A] px-6 py-3.5 text-[14.5px] font-semibold text-white no-underline transition-opacity hover:opacity-85"
              >
                Start free
              </a>
              <a
                href="#how"
                className="rounded-full border border-[#0A0A0A]/20 px-6 py-3.5 text-[14.5px] font-semibold text-[#0A0A0A] no-underline transition-colors hover:border-[#0A0A0A]/45"
              >
                Watch the demos
              </a>
            </div>
            <p className="mt-5 text-[13px] text-[#0A0A0A]/45">Free to start · No credit card · Your customers never need an account</p>
          </div>
          <HeroPlayer />
        </section>

        {/* ─── Timing strip — the numbers are the recordings' real durations ─── */}
        <section aria-label="How fast it is" className="border-y border-[#E7E6E1] bg-white">
          <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 py-10 sm:grid-cols-3 md:px-8">
            {[
              ["0:22", "sign-up to live dashboard"],
              ["1:45", "empty account to configured business"],
              ["1:07", "customer visit to confirmed booking"],
            ].map(([n, l]) => (
              <div key={l} className="text-center sm:text-left">
                <p className="m-0 text-[34px] font-bold tracking-tight" style={{ fontFamily: SANS }}>
                  {n}
                </p>
                <p className="m-0 mt-1 text-[13.5px] text-[#0A0A0A]/55">{l}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto -mt-4 max-w-[1200px] px-5 pb-6 text-[12px] text-[#0A0A0A]/40 md:px-8">
            Timed on the unedited recordings below — not marketing math.
          </p>
        </section>

        {/* ─── How it works ─── */}
        <section id="how" aria-labelledby="how-h" className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">How it works</p>
          <h2 id="how-h" className="m-0 max-w-[24ch] text-[clamp(28px,4.5vw,44px)] font-bold leading-tight tracking-[-0.015em]">
            Watch the whole thing,{" "}
            <em style={{ fontFamily: SERIF, fontWeight: 600 }}>start to finish.</em>
          </h2>
          <p className="mb-10 mt-4 max-w-[58ch] text-[15.5px] leading-relaxed text-[#0A0A0A]/60">
            Three screen recordings of the live product — no mockups, no cuts. This is exactly what you and your customers get.
          </p>
          <StepVideos />
        </section>

        {/* ─── Features ─── */}
        <section id="product" aria-labelledby="product-h" className="scroll-mt-20 border-t border-[#E7E6E1] bg-white">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/45">Product</p>
            <h2 id="product-h" className="m-0 max-w-[26ch] text-[clamp(28px,4.5vw,44px)] font-bold leading-tight tracking-[-0.015em]">
              Everything between {"“"}booking request{"”"} and <em style={{ fontFamily: SERIF, fontWeight: 600 }}>paid.</em>
            </h2>
            <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.t}>
                  <dt className="flex items-center gap-2.5 text-[15.5px] font-semibold">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8FF00] ring-1 ring-[#3A5000]/30" aria-hidden />
                    {f.t}
                  </dt>
                  <dd className="m-0 mt-2.5 text-[14.5px] leading-relaxed text-[#0A0A0A]/60">{f.c}</dd>
                </div>
              ))}
            </dl>
          </div>
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
                  href={SIGNUP}
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

        {/* ─── Closing CTA ─── */}
        <section aria-labelledby="cta-h" className="bg-[#0A0A0A]">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-24 text-center md:px-8 md:py-32">
            <h2 id="cta-h" className="mx-auto m-0 max-w-[20ch] text-[clamp(32px,5.5vw,56px)] font-semibold leading-[1.05] text-white" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
              Watch it once — then run it yourself.
            </h2>
            <p className="mx-auto mt-5 max-w-[44ch] text-[15px] leading-relaxed text-white/55">
              Your booking page can be live before the coffee{"’"}s done. Free to start, and your customers never need an account.
            </p>
            <a
              href={SIGNUP}
              className="mt-9 inline-block rounded-full bg-[#C8FF00] px-8 py-4 text-[15px] font-bold text-[#0A0A0A] no-underline transition-opacity hover:opacity-85"
            >
              Start free
            </a>
            <p className="mt-4 text-[12.5px] text-white/35">book.neatr.ai</p>
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
