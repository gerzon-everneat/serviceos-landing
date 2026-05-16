"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── v9.2: "Built to scale" — growth & multi-crew angle ──────────────────── */

function Grid({ alpha = 0.038 }: { alpha?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,${alpha}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${alpha}) 1px, transparent 1px)`,
      backgroundSize: "64px 64px",
    }} />
  );
}

function Reveal({ children, delay = 0, className = "", y = 22 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.01, rootMargin: "0px 0px 80px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now(); const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to]);
  return <span ref={ref}>{val >= 1000 ? (val / 1000).toFixed(1) + "K" : val}{suffix}</span>;
}

function Tag({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <span className="block h-[5px] w-[5px] rounded-full flex-shrink-0" style={{ background: dark ? "#C8FF00" : "#B8922A" }} />
      <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 500, color: dark ? "rgba(255,255,255,0.40)" : "#B8922A", fontFamily: "var(--font-dm-sans), monospace" }}>{children}</span>
    </div>
  );
}

const IconBrain   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-1.14Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-1.14Z" /></svg>);
const IconRoute   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" /><path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12" /></svg>);
const IconTrend   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>);
const IconMsg     = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>);
const IconCalendar= () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>);
const IconZap     = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.09 12.26a1 1 0 0 0 .74 1.63H12l-1 8 8.91-10.26a1 1 0 0 0-.74-1.63H12l1-8z" /></svg>);
const IconUsers   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const IconPhone   = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" /></svg>);
const IconCard    = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>);
const IconCode    = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const IconCheck   = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5l3.5 3.5L11 3" /></svg>);
const IconMap     = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></svg>);

/* Hero AI Feed — scale theme: multiple crews, high volume */
const SCENARIOS = [
  { incoming: "Monday 7:00 AM — 18 new bookings", thinking: "Checking availability across all slots...", decision: "All 18 confirmed. Customers notified.", sub: "3 locations. Zero phone calls needed.", accent: { text: "text-emerald-400", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.10)" } },
  { incoming: "Q4 peak week — 40% booking surge", thinking: "Handling concurrent booking sessions...", decision: "All sessions processed. Slots filled.", sub: "No new staff needed. System scaled.", accent: { text: "text-blue-400", bg: "bg-blue-500/10", glow: "rgba(96,165,250,0.10)" } },
  { incoming: "New location launch — widget goes live", thinking: "Surfacing local availability, accepting bookings...", decision: "First 8 bookings in under 3 hours.", sub: "No calls fielded. All self-served.", accent: { text: "text-yellow-400", bg: "bg-yellow-500/10", glow: "rgba(234,179,8,0.10)" } },
  { incoming: "Customer requesting reschedule", thinking: "Finding matching open slots for same service...", decision: "3 alternatives presented instantly.", sub: "Handled without any staff involvement.", accent: { text: "text-purple-400", bg: "bg-purple-500/10", glow: "rgba(192,132,252,0.10)" } },
];

function AIFeed() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "think" | "done">("in");
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "in")    t = setTimeout(() => setPhase("think"), 900);
    else if (phase === "think") t = setTimeout(() => setPhase("done"), 1300);
    else t = setTimeout(() => { setPhase("in"); setIdx((i) => (i + 1) % SCENARIOS.length); }, 2800);
    return () => clearTimeout(t);
  }, [phase]);
  const s = SCENARIOS[idx];
  return (
    <div className="w-full max-w-[340px] overflow-hidden rounded-2xl" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
      <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(184,146,42,0.12)", border: "1px solid rgba(184,146,42,0.20)", color: "#B8922A" }}><IconBrain /></div>
        <div className="flex-1">
          <p className="text-xs font-medium text-white">AI Booking Assistant</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "pulse 1.5s infinite" }} />
            <p className="text-[10px] text-emerald-400">Live · taking bookings</p>
          </div>
        </div>
        <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>live</span>
      </div>
      <div className="px-5 py-4">
        <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.30)" }}>Customer booking</p>
        <div className="rounded-xl border p-4 transition-all duration-500" style={{ borderColor: phase === "done" ? "rgba(184,146,42,0.22)" : "rgba(255,255,255,0.08)", background: phase === "done" ? `radial-gradient(circle at 100% 0%, ${s.accent.glow}, transparent 60%), #161616` : "#161616" }}>
          <div className="flex items-start gap-2.5">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-500" style={{ animation: phase !== "done" ? "pulse 1s infinite" : "none" }} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">{s.incoming}</p>
              <div style={{ maxHeight: phase !== "in" ? "40px" : "0", opacity: phase !== "in" ? 1 : 0, overflow: "hidden", transition: "all 0.4s ease", marginTop: phase !== "in" ? "8px" : "0" }}>
                <p className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>{s.thinking}</p>
              </div>
              <div style={{ maxHeight: phase === "done" ? "60px" : "0", opacity: phase === "done" ? 1 : 0, overflow: "hidden", transition: "all 0.45s ease", marginTop: phase === "done" ? "8px" : "0" }}>
                <p className={`text-xs font-semibold ${s.accent.text}`}>→ {s.decision}</p>
                <p className="mt-1 text-[10px]" style={{ color: "rgba(255,255,255,0.40)" }}>{s.sub}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {[0, 1].map((i) => (<div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2 opacity-10"><div className="h-1.5 w-1.5 rounded-full bg-white" /><div className="h-2 flex-1 rounded-full bg-white/40" /><div className="h-2 w-14 rounded-full bg-white/40" /></div>))}
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-3 text-[10px]" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}>
        <span>342 self-serve bookings today</span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">0 calls fielded</span>
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500" style={{
      background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
    }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" style={{ fontFamily: "var(--font-dm-sans), monospace", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", color: "#ffffff" }}>[ServiceOS]</a>
        <div className="hidden items-center gap-8 text-sm md:flex" style={{ color: "rgba(255,255,255,0.50)" }}>
          {[["Platform", "#ai"], ["Pricing", "#pricing"], ["Docs", "#"]].map(([l, h]) => (
            <a key={l} href={h} className="hover:text-white transition-colors">{l}</a>
          ))}
          <a href="#" className="hover:text-white transition-colors">Login</a>
        </div>
        <a href="#" className="rounded-md px-4 py-2 text-sm font-semibold transition-all hover:opacity-90" style={{ background: "#ffffff", color: "#080808" }}>Start free</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden" style={{ background: "#080808" }}>
      <Grid />
      <div className="pointer-events-none absolute" style={{ width: "900px", height: "700px", top: "-15%", left: "-8%", background: "radial-gradient(ellipse, rgba(184,146,42,0.09) 0%, transparent 60%)", filter: "blur(90px)" }} />
      <div className="pointer-events-none absolute" style={{ width: "500px", height: "450px", bottom: "-5%", right: "-5%", background: "radial-gradient(ellipse, rgba(200,255,0,0.04) 0%, transparent 60%)", filter: "blur(100px)" }} />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-28 lg:grid-cols-[1fr_380px]">
        <div>
          <Reveal>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px]" style={{ borderColor: "rgba(184,146,42,0.30)", background: "rgba(184,146,42,0.06)", color: "#B8922A" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> Built for businesses ready to grow
            </div>
          </Reveal>

          <h1 className="animate-rise-1" style={{
            fontFamily: "var(--font-dm-sans), system-ui",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 0.94,
            color: "#FFFFFF",
            fontSize: "clamp(3.8rem, 9.5vw, 8rem)",
          }}>
            3 crews.<br />
            30 crews.<br />
            <span style={{ color: "#B8922A" }}>One system.</span>
          </h1>

          <Reveal delay={150}>
            <p className="mt-9 max-w-md text-base leading-[1.85]" style={{ color: "rgba(255,255,255,0.50)" }}>
              Most booking software breaks at scale. ServiceOS is built for it — AI dispatch, multi-location routing, and operations that handle themselves whether you&apos;re running 10 jobs or 300.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#" className="rounded-md px-7 py-3.5 text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg" style={{ background: "#ffffff", color: "#080808" }}>Start scaling free →</a>
              <a href="#ai" className="flex items-center gap-2 rounded-md border px-6 py-3.5 text-sm transition-colors hover:border-white/25" style={{ border: "1px solid rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.65)" }}>See AI in action</a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {[{ n: 5200, s: "+", l: "businesses scaled" }, { n: 80, s: "%", l: "bookings without calls" }, { n: 14, s: " hrs", l: "saved per week" }].map(({ n, s, l }) => (
                <div key={l}>
                  <p style={{ fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "#ffffff", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}><Counter to={n} suffix={s} /></p>
                  <p className="mt-1.5 text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.36)" }}>{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="hidden lg:block" y={32}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -m-10 rounded-3xl" style={{ background: "radial-gradient(circle, rgba(184,146,42,0.14) 0%, transparent 65%)", filter: "blur(40px)" }} />
            <div className="animate-float relative">
              <AIFeed />
            </div>
            <div className="animate-float2 absolute -left-20 top-12 shimmer-card rounded-xl p-4 shadow-2xl" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.10)", width: "160px" }}>
              <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.30)" }}>Bookings self-served</p>
              <p className="mt-1 text-2xl font-bold" style={{ letterSpacing: "-0.04em", color: "#B8922A" }}>342 today</p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>0 calls fielded</p>
              <div className="mt-2.5 flex items-end gap-0.5" style={{ height: "22px" }}>
                {[30, 45, 35, 62, 50, 78, 65, 90, 82].map((h, i) => (<div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: "rgba(184,146,42,0.35)" }} />))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(255,255,255,0.18)" }}>
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-current" />
        <span className="text-[9px] tracking-[0.38em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

const TICKER_QUOTES = [
  '"Went from 2 crews to 8 in 6 months. The system just scaled with us." — Marcus, Webb Cleaning',
  '"Opened a second location in another city. Same ops team. No new hires." — Priya, NeatPros',
  '"Managing 300 jobs a week. Zero extra admin overhead vs when we did 50." — Derek, SwiftMaid',
  '"We franchise now. ServiceOS is what makes it possible to replicate the model." — Jen, HomeSpark',
  '"Growth used to mean chaos. Not anymore." — Tom, CleanCo',
  '"Added 3 service lines in a year. ServiceOS handled all of them." — Vanessa, PureSpace',
];

function QuoteTicker() {
  return (
    <div className="relative overflow-hidden py-[13px]" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20" style={{ background: "linear-gradient(90deg, #0A0A0A, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20" style={{ background: "linear-gradient(270deg, #0A0A0A, transparent)" }} />
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {[...TICKER_QUOTES, ...TICKER_QUOTES].map((q, i) => (
          <span key={i} className="inline-flex flex-shrink-0 items-center gap-3 text-[12px]" style={{ color: "rgba(255,255,255,0.28)" }}>
            <span style={{ color: "#B8922A", fontSize: "10px" }}>✦</span> {q}
          </span>
        ))}
      </div>
    </div>
  );
}

function Statement() {
  return (
    <section className="py-28 text-center" style={{ background: "#F7F5F1" }}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Tag dark={false}>The honest version</Tag>
          <blockquote style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(2rem, 4.8vw, 4rem)", lineHeight: 1.2, color: "#141210" }}>
            &ldquo;A phone number doesn&apos;t scale.<br />
            <span style={{ fontWeight: 600, fontStyle: "normal", color: "#141210" }}>A self-booking system does.&rdquo;</span>
          </blockquote>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed" style={{ color: "#787068" }}>
            Every service business hits the same wall: more bookings means more calls. ServiceOS takes bookings off the phone entirely — customers book themselves, at any volume, across any number of locations, without adding staff.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const AI_CARDS = [
  {
    icon: <IconBrain />,
    title: "AI Books for You",
    stat: "3 min", statLabel: "avg booking time",
    desc: "AI guides customers through every question — service, size, date, details — across 3 locations or 30. Same quality, any volume.",
    color: "#B8922A", bg: "rgba(184,146,42,0.07)", border: "rgba(184,146,42,0.18)",
  },
  {
    icon: <IconCalendar />,
    title: "Live Availability at Scale",
    stat: "0", statLabel: "overbookings",
    desc: "Every location's real-time calendar, live. Customers see actual open slots — no matter how many crews or cities you run.",
    color: "#3B82F6", bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.18)",
  },
  {
    icon: <IconZap />,
    title: "Instant at Any Volume",
    stat: "< 1s", statLabel: "booking to confirmed",
    desc: "18 bookings or 180 — every confirmation fires instantly. Your staff sees the job. The customer gets the confirmation. Zero bottleneck.",
    color: "#C8FF00", bg: "rgba(200,255,0,0.06)", border: "rgba(200,255,0,0.15)",
  },
  {
    icon: <IconMap />,
    title: "Multi-location Ready",
    stat: "∞", statLabel: "locations supported",
    desc: "Add a city, a new service line, a new widget — the booking system extends without extra setup. Same experience everywhere.",
    color: "#A855F7", bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.18)",
  },
];

function AIEngine() {
  return (
    <section id="ai" className="relative overflow-hidden py-32" style={{ background: "#0A0A0A" }}>
      <Grid />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 max-w-2xl">
          <Tag>Built for growth</Tag>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#FFFFFF", fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}>
            Booking volume that<br /><span style={{ color: "#B8922A" }}>never hits a ceiling.</span>
          </h2>
          <p className="mt-6 text-base" style={{ color: "rgba(255,255,255,0.48)" }}>
            Customers self-book at any volume. The widget scales. You don&apos;t need more staff to take more bookings.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {AI_CARDS.map((c, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="shimmer-card h-full rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${c.color}18`, color: c.color }}>{c.icon}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.025em", color: "#FFFFFF" }}>{c.title}</h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.04em", color: c.color, lineHeight: 1 }}>{c.stat}</p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)", marginTop: "3px" }}>{c.statLabel}</p>
                  </div>
                </div>
                <p style={{ fontSize: "14px", lineHeight: "1.85", color: "rgba(255,255,255,0.56)" }}>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppFrame({ src, alt, url = "book.everneat.co" }: { src: string; alt: string; url?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/15" style={{ border: "1px solid #E5E0D8" }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#F2EFEA", borderBottom: "1px solid #E5E0D8" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map((c) => (<div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />))}
        <div className="flex items-center gap-1.5 mx-auto rounded px-3 py-0.5 text-[11px]" style={{ background: "#FFFFFF", border: "1px solid #E5E0D8", color: "#787068" }}>
          <span className="text-emerald-500 text-[8px]">●</span>{url}
        </div>
      </div>
      <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <section className="overflow-hidden py-32" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <Tag dark={false}>The platform</Tag>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#141210", fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}>
            Every location.<br />
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "#B8922A", fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}>One command center.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed" style={{ color: "#787068" }}>
            Run multiple locations, dozens of crews, and hundreds of jobs — all visible in one real-time dashboard.
          </p>
        </Reveal>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal delay={60}>
            <AppFrame src="/assets/v6-overview.png" alt="Everneat multi-location operations dashboard" url="book.everneat.co/dashboard" />
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-6">
              <div>
                <h3 style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em", color: "#141210", lineHeight: 1.1 }}>
                  All locations.<br />
                  <span style={{ color: "#B8922A" }}>One view.</span>
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#787068" }}>
                  No toggling between accounts, no emailing managers for updates. Every location&apos;s bookings, revenue, and team performance in a single dashboard.
                </p>
              </div>
              {[
                { label: "Cross-location visibility", desc: "See all your operations — any city, any crew — at a glance." },
                { label: "Unified provider management", desc: "Staff, capacity, and performance tracked across every team." },
                { label: "Consolidated revenue view", desc: "Total revenue across all locations, broken down by any dimension." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#B8922A" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#141210" }}>{item.label}</p>
                    <p className="text-[13px] mt-0.5" style={{ color: "#787068" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mt-24 grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal delay={60} className="order-2 lg:order-1">
            <div className="space-y-6">
              <div>
                <h3 style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em", color: "#141210", lineHeight: 1.1 }}>
                  Routing logic<br />
                  <span style={{ color: "#B8922A" }}>that multiplies.</span>
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#787068" }}>
                  Define your dispatch rules once. Add a crew, add a location — the AI applies the same logic instantly. No setup, no retraining.
                </p>
              </div>
              {[
                { label: "Zone-based routing", desc: "Crews stay efficient. Jobs route to the nearest qualified pro." },
                { label: "Load balancing", desc: "AI distributes volume evenly — no crew overloaded, none idle." },
                { label: "Instant location launch", desc: "New city? Live in 48 hours with the same operational quality." },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#B8922A" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#141210" }}>{item.label}</p>
                    <p className="text-[13px] mt-0.5" style={{ color: "#787068" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <AppFrame src="/assets/v6-calendar.png" alt="Everneat multi-crew scheduling calendar" url="book.everneat.co/schedule" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="relative overflow-hidden py-32" style={{ background: "#080808" }}>
      <Grid alpha={0.032} />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 text-center">
          <Tag>Scale metrics</Tag>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#FFFFFF", fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            Bigger operations.<br /><span style={{ color: "#B8922A" }}>Same control.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { n: 5200, s: "+",   l: "Service businesses\nalready at scale" },
            { n: 80,   s: "%",   l: "Bookings self-served\nat any volume" },
            { n: 14,   s: " hrs", l: "Saved per owner\nevery single week" },
          ].map(({ n, s, l }, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="px-10 py-16 text-center" style={{ background: "#0E0E0E" }}>
                <p style={{ fontWeight: 700, letterSpacing: "-0.055em", lineHeight: 1, color: "#FFFFFF", fontSize: "clamp(3.5rem, 9vw, 6.5rem)" }}>
                  <Counter to={n} suffix={s} />
                </p>
                <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.38)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTI = [
  { q: "We went from 2 crews to 8 in 6 months. I never changed a single thing in ServiceOS — it just handled more. That's the system I needed.", name: "Marcus Webb", biz: "Webb Cleaning Co.", tag: "Cleaning" },
  { q: "I opened a second location in another city with the same ops team. ServiceOS handled everything. No new hires, no new processes, same quality.", name: "Priya Anand", biz: "NeatPros", tag: "Home services" },
  { q: "We run 300+ jobs a week across 3 locations. It's the same amount of admin work as when we ran 50. That's a different kind of business.", name: "Derek Hollis", biz: "SwiftMaid", tag: "Field services" },
];

function Testimonials() {
  return (
    <section className="relative overflow-hidden py-32" style={{ background: "#080808" }}>
      <Grid alpha={0.028} />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-16">
          <Tag>Real owners</Tag>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#FFFFFF", fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}>
            They scaled without<br />
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "#B8922A", fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}>the chaos.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTI.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="shimmer-card flex h-full flex-col rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (<span key={j} style={{ color: "#B8922A", fontSize: "11px" }}>★</span>))}
                </div>
                <blockquote className="flex-1 text-[15px] font-medium leading-[1.8]" style={{ color: "rgba(255,255,255,0.80)" }}>&ldquo;{t.q}&rdquo;</blockquote>
                <div className="mt-7 flex items-center gap-3 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ background: "rgba(184,146,42,0.14)", color: "#B8922A" }}>{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{t.biz} · {t.tag}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: <IconCode />,      title: "Booking Widget",          desc: "Drop one embed on your site. It handles unlimited bookings across every location, zero changes needed.", tag: "Customer" },
  { icon: <IconZap />,       title: "Smart Auto-Dispatch",     desc: "AI scales with your volume — route 10 or 10,000 jobs with the same zero-touch accuracy.",               tag: "AI" },
  { icon: <IconMap />,       title: "Multi-location Ops",      desc: "Every location under one roof. Routing, staffing, and revenue — managed from a single dashboard.",       tag: "Scale" },
  { icon: <IconUsers />,     title: "Unlimited Staff",         desc: "Add crews without adding admin. Each new team member plugs into the same automated system.",             tag: "Staff" },
  { icon: <IconCard />,      title: "Payments & Payroll",      desc: "Stripe built in. Invoicing, payroll reports, and revenue tracking scale automatically as you grow.",      tag: "Finance" },
  { icon: <IconCalendar />,  title: "Webhooks & Open API",     desc: "Connect ServiceOS to any tool in your stack. Zapier, custom integrations, or direct API — your call.",   tag: "Automation" },
];

function Features() {
  return (
    <section id="features" className="py-32" style={{ background: "#F7F5F1" }}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14">
          <Tag dark={false}>Platform features</Tag>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#141210", fontSize: "clamp(2.8rem, 6.5vw, 5rem)" }}>
            Everything that<br /><span style={{ color: "#B8922A" }}>scales with you.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="shimmer-card group h-full rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-black/[0.05]" style={{ background: "#FFFFFF", borderColor: "#E5E0D8" }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex rounded-xl p-3" style={{ background: "rgba(184,146,42,0.09)", color: "#B8922A" }}>{f.icon}</div>
                  <span className="rounded-full border px-2.5 py-1 text-[10px]" style={{ borderColor: f.tag === "AI" || f.tag === "Scale" ? "rgba(184,146,42,0.30)" : "#E5E0D8", color: f.tag === "AI" || f.tag === "Scale" ? "#B8922A" : "#787068" }}>{f.tag}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px", fontWeight: 600, fontStyle: "italic", color: "#141210", lineHeight: 1.2 }}>{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "#4A443C" }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  { name: "Starter", monthly: 0,   annual: 0,   desc: "For solo operators getting started.",         features: ["1 staff member", "30 bookings/month", "Booking widget", "Stripe payments", "Email notifications", "Customer portal"],                                                                  cta: "Get started free",  hi: false },
  { name: "Growth",  monthly: 49,  annual: 39,  desc: "For growing teams managing real volume.",      features: ["Up to 10 staff", "Unlimited bookings", "AI dispatch & assignment", "AI conflict resolution", "SMS + email", "Pro field portal", "Analytics dashboard", "Webhooks & API"],           cta: "Start free trial",  hi: true, badge: "Most popular" },
  { name: "Enterprise", monthly: 149, annual: 119, desc: "For multi-location operations at scale.",   features: ["Unlimited staff & locations", "Everything in Growth", "AI pricing intelligence", "AI customer comms", "White-label branding", "SSO & SAML", "Dedicated account manager"],            cta: "Contact sales",     hi: false },
];

function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="py-32" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <Tag dark={false}>Pricing</Tag>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#141210", fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            Grows with you.<br /><span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "#B8922A", fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>Not against you.</span>
          </h2>
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border p-1.5" style={{ background: "#F7F5F1", borderColor: "#E5E0D8" }}>
            {[{ l: "Monthly", v: false }, { l: "Annual", v: true, badge: "Save 20%" }].map((o) => (
              <button key={o.l} onClick={() => setAnnual(o.v)} className="flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all" style={{ background: annual === o.v ? "#B8922A" : "transparent", color: annual === o.v ? "#ffffff" : "#787068", fontWeight: annual === o.v ? 600 : 400 }}>
                {o.l}{o.badge && <span className="text-xs" style={{ color: annual === o.v ? "rgba(255,255,255,0.70)" : "#10b981" }}>{o.badge}</span>}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="shimmer-card flex h-full flex-col rounded-2xl p-8 transition-all duration-300" style={{ background: "#FFFFFF", border: plan.hi ? "1px solid rgba(184,146,42,0.35)" : "1px solid #E5E0D8", boxShadow: plan.hi ? "0 8px 40px rgba(184,146,42,0.08)" : "none" }}>
                {plan.hi && <span className="mb-4 inline-block self-start rounded-full px-3 py-1 text-xs" style={{ background: "rgba(184,146,42,0.10)", color: "#B8922A" }}>Most popular</span>}
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "26px", fontWeight: 600, fontStyle: "italic", color: "#141210" }}>{plan.name}</h3>
                <p className="mt-1 text-sm" style={{ color: "#787068" }}>{plan.desc}</p>
                <div className="my-7">
                  <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "3.2rem", fontWeight: 600, letterSpacing: "-0.03em", color: "#141210" }}>${annual ? plan.annual : plan.monthly}</span>
                  <span className="ml-2 text-sm" style={{ color: "#787068" }}>/ month</span>
                </div>
                <ul className="flex-1 space-y-3 border-t pt-6" style={{ borderColor: "#E5E0D8" }}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: plan.hi ? "#B8922A" : "#787068" }}><IconCheck /></span>
                      <span className="text-sm" style={{ color: "#4A443C" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="mt-8 block w-full rounded-xl py-3.5 text-center text-sm font-medium transition-all" style={{ background: plan.hi ? "#B8922A" : "transparent", color: plan.hi ? "#ffffff" : "#141210", border: plan.hi ? "none" : "1px solid #E5E0D8" }}>{plan.cta}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="relative overflow-hidden py-32" style={{ background: "#C8FF00" }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: "rgba(8,8,8,0.50)" }}>Start growing</p>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.0, color: "#080808", fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
            Build the operation<br />your growth demands.<br /><span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "rgba(8,8,8,0.65)", fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)" }}>Without the overhead.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-base" style={{ color: "rgba(8,8,8,0.58)" }}>
            Join 5,000+ businesses already scaling on ServiceOS. Start free, go live in under an hour, add locations when you&apos;re ready.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="rounded-md px-9 py-4 text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg" style={{ background: "#080808", color: "#ffffff" }}>Start scaling free →</a>
            <a href="#" className="rounded-md border px-8 py-4 text-sm font-medium transition-colors" style={{ borderColor: "rgba(8,8,8,0.25)", color: "rgba(8,8,8,0.70)" }}>Book a demo</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols: Record<string, string[]> = {
    Product:   ["Features", "AI Engine", "Pricing", "Changelog"],
    Solutions: ["Cleaning", "Maintenance", "Field Service", "Multi-location"],
    Resources: ["API Docs", "Embed Guide", "Webhooks", "Status"],
    Company:   ["About", "Blog", "Careers", "Contact"],
  };
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <a href="/" style={{ fontFamily: "var(--font-dm-sans), monospace", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", color: "#ffffff" }}>[ServiceOS]</a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>AI-powered booking system for cleaning, maintenance & field service businesses.</p>
          </div>
          {Object.entries(cols).map(([cat, items]) => (
            <div key={cat}>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.30)" }}>{cat}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (<li key={item}><a href="#" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.52)" }}>{item}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs md:flex-row" style={{ borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.28)" }}>
          <p>© 2026 ServiceOS. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((l) => (<a key={l} href="#" className="transition-colors hover:text-white/60">{l}</a>))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <QuoteTicker />
        <Statement />
        <AIEngine />
        <Dashboard />
        <Numbers />
        <Testimonials />
        <Features />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
