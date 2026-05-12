"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Scroll Reveal ──────────────────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.01, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const translate = from === "left" ? "translateX(-32px)" : from === "right" ? "translateX(32px)" : "translateY(28px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : translate,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Counter ───────────────────────────────────────────────────── */

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px 80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to]);

  return <span ref={ref}>{prefix}{val >= 1000 ? (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + "K" : val}{suffix}</span>;
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */

const Sparkle = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2Z" />
  </svg>
);
const IconBrain = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-1.14Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-1.14Z" />
  </svg>
);
const IconRoute = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" />
    <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12" />
  </svg>
);
const IconTrend = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconMsg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L4.09 12.26a1 1 0 0 0 .74 1.63H12l-1 8 8.91-10.26a1 1 0 0 0-.74-1.63H12l1-8z" />
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconCard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5l3.5 3.5L11 3" />
  </svg>
);
const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 2l8 8M10 2l-8 8" />
  </svg>
);

/* ─── AI Dispatch Feed ───────────────────────────────────────────────────── */

const SCENARIOS = [
  {
    incoming: "Deep Clean · 9:00 AM · 4bd/3ba",
    thinking: "Matching 14 pros by skill, distance, rating...",
    decision: "Sarah M. assigned (4.9★, 2.1 mi)",
    sub: "Route optimized · 18 min saved",
    accent: { text: "text-emerald-400", bg: "bg-emerald-400/10", glow: "rgba(52,211,153,0.15)" },
  },
  {
    incoming: "Move-out Clean · 11:30 AM · Rush",
    thinking: "Conflict on Mike T. — scanning alternatives...",
    decision: "Alex P. rerouted · conflict auto-cleared",
    sub: "Zero manual input required",
    accent: { text: "text-blue-400", bg: "bg-blue-400/10", glow: "rgba(96,165,250,0.15)" },
  },
  {
    incoming: "Post-Reno · 2:00 PM · Large",
    thinking: "Market rate analysis: $285 (+12% premium)...",
    decision: "$285 suggested · customer accepted",
    sub: "+$35 vs standard rate",
    accent: { text: "text-gold", bg: "bg-gold/10", glow: "rgba(191,146,69,0.15)" },
  },
  {
    incoming: "Follow-up: Job #1042 (no review yet)",
    thinking: "Day 2 — nudge threshold reached...",
    decision: "Automated SMS sent to customer",
    sub: "Review rate lifted 71% → 89%",
    accent: { text: "text-purple-400", bg: "bg-purple-400/10", glow: "rgba(192,132,252,0.15)" },
  },
];

function AIFeed() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "think" | "done">("in");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "in") t = setTimeout(() => setPhase("think"), 900);
    else if (phase === "think") t = setTimeout(() => setPhase("done"), 1300);
    else t = setTimeout(() => { setPhase("in"); setIdx((i) => (i + 1) % SCENARIOS.length); }, 2800);
    return () => clearTimeout(t);
  }, [phase]);

  const s = SCENARIOS[idx];

  return (
    <div className="w-full max-w-[340px] overflow-hidden rounded-2xl border border-edge-2 bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-edge px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
          <IconBrain />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-ink">AI Dispatch Engine</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "pulse 1.5s infinite" }} />
            <p className="text-[10px] text-emerald-400">Live · processing</p>
          </div>
        </div>
        <span className="font-mono text-[10px] text-ink-4">v2.4</span>
      </div>

      {/* Active scenario */}
      <div className="px-5 py-4">
        <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.2em] text-ink-4">Active job</p>
        <div
          className="rounded-xl border p-4 transition-all duration-500"
          style={{
            borderColor: phase === "done" ? "rgba(191,146,69,0.2)" : "var(--color-edge-2)",
            background: phase === "done" ? `radial-gradient(circle at 100% 0%, ${s.accent.glow}, transparent 60%), var(--color-card-2)` : "var(--color-card-2)",
          }}
        >
          <div className="flex items-start gap-2.5">
            <span
              className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold transition-colors"
              style={{ animation: phase !== "done" ? "pulse 1s infinite" : "none" }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-ink">{s.incoming}</p>

              <div
                style={{
                  maxHeight: phase !== "in" ? "40px" : "0",
                  opacity: phase !== "in" ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                  marginTop: phase !== "in" ? "8px" : "0",
                }}
              >
                <p className="font-mono text-[10px] text-ink-3">{s.thinking}</p>
              </div>

              <div
                style={{
                  maxHeight: phase === "done" ? "60px" : "0",
                  opacity: phase === "done" ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.45s ease",
                  marginTop: phase === "done" ? "8px" : "0",
                }}
              >
                <p className={`text-xs font-semibold ${s.accent.text}`}>→ {s.decision}</p>
                <p className="mt-1 text-[10px] text-ink-3">{s.sub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Queue placeholders */}
        <div className="mt-3 space-y-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2 opacity-20">
              <div className="h-1.5 w-1.5 rounded-full bg-ink-3" />
              <div className="h-2 flex-1 rounded-full bg-ink-4" />
              <div className="h-2 w-14 rounded-full bg-ink-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-edge px-5 py-3 text-[10px] text-ink-4">
        <span>246 dispatched today</span>
        <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-emerald-400">0 conflicts</span>
      </div>
    </div>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        borderBottom: scrolled ? "1px solid var(--color-edge)" : "1px solid transparent",
        background: scrolled ? "rgba(9,8,7,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <a href="/" className="font-display text-2xl font-semibold italic text-ink">ServiceOS</a>
          <span className="hidden items-center gap-1 rounded-full border border-gold/25 bg-gold/[0.07] px-2.5 py-1 text-[10px] text-gold sm:inline-flex">
            <Sparkle /> AI-native
          </span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-ink-3 md:flex">
          {[["Features", "#features"], ["AI", "#ai"], ["Compare", "#compare"], ["Pricing", "#pricing"]].map(([l, h]) => (
            <a key={l} href={h} className="transition-colors hover:text-ink">{l}</a>
          ))}
          <a href="#" className="transition-colors hover:text-ink">Login</a>
        </div>
        <a
          href="#"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-canvas transition-all hover:bg-gold-hi hover:shadow-lg hover:shadow-gold/20"
        >
          Start free →
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* AI-generated Kling video background */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.22 }}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero-video-poster.jpg"
      >
        <source src="/assets/hero-video.webm" type="video/webm" />
        <source src="/assets/hero-video-web.mp4" type="video/mp4" />
      </video>
      {/* Directional overlay: solid left (text area), transparent right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(105deg, var(--color-canvas) 35%, rgba(9,8,7,0.82) 58%, rgba(9,8,7,0.35) 100%)" }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-canvas))" }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2">
        {/* Left */}
        <div>
          <div className="animate-rise mb-7 inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-gold/[0.065] px-4 py-1.5 text-xs text-gold">
            <Sparkle size={10} />
            AI-powered · for service businesses
          </div>

          <h1 className="animate-rise-1 font-display leading-[1.03] tracking-tight text-ink" style={{ fontSize: "clamp(2.8rem,5vw,4.75rem)", fontWeight: 300, fontStyle: "italic" }}>
            The booking platform<br />
            <span className="relative inline-block">
              <span className="font-semibold not-italic">your competitors</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, var(--color-gold) 0%, transparent 80%)" }}
              />
            </span><br />
            <span className="font-semibold not-italic">wish they had.</span>
          </h1>

          <p className="animate-rise-2 mt-7 max-w-lg text-base leading-[1.9] text-ink-2">
            ServiceOS uses AI to dispatch jobs, resolve conflicts, price optimally,
            and follow up with customers — <span className="text-ink font-medium">automatically</span>.
            BookingKoala and Launch27 can&apos;t do any of that.
          </p>

          <div className="animate-rise-3 mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#"
              className="group rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-canvas transition-all hover:bg-gold-hi hover:shadow-xl hover:shadow-gold/25"
            >
              Start free trial →
            </a>
            <a href="#ai" className="flex items-center gap-2.5 text-sm text-ink-2 transition-colors hover:text-ink">
              <span className="h-px w-8 bg-current" />
              See AI in action
            </a>
          </div>

          {/* Switching-from strip */}
          <div className="animate-rise-3 mt-9 flex flex-wrap items-center gap-2.5 text-xs text-ink-3">
            <span className="text-ink-3">Teams switching from</span>
            {["BookingKoala", "Launch27", "Jobber"].map((b) => (
              <span key={b} className="rounded-full border border-edge-2/80 px-2.5 py-1 text-ink-4 line-through decoration-ink-4/70">
                {b}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="animate-rise-3 mt-10 grid grid-cols-3 gap-6 border-t border-edge pt-10">
            {[
              { n: 5200, suffix: "+", label: "Businesses" },
              { n: 1200000, suffix: "", label: "Jobs dispatched" },
              { n: 98, suffix: "%", label: "Auto-resolved" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-[1.75rem] font-semibold leading-none text-gold">
                  <Counter to={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-[11px] text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — AI Feed + floating cards */}
        <div className="hidden lg:flex lg:items-center lg:justify-end">
          <div className="relative">
            <div className="animate-float">
              <AIFeed />
            </div>

            {/* Revenue card */}
            <div className="animate-float2 absolute -left-24 top-8 w-48 rounded-2xl border border-edge-2 bg-card p-4 shadow-xl">
              <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-ink-4">AI pricing uplift</p>
              <p className="font-display text-2xl font-semibold text-gold">+$2,840</p>
              <p className="mt-0.5 text-[10px] text-ink-3">this month</p>
              <div className="mt-3 flex items-end gap-0.5" style={{ height: "28px" }}>
                {[30, 45, 35, 60, 50, 75, 65, 90, 80].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-gold/25 transition-all" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Conflict resolved */}
            <div className="animate-float3 absolute -right-6 bottom-16 w-52 rounded-2xl border border-edge-2 bg-card p-3.5 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm text-emerald-400">✓</div>
                <div>
                  <p className="text-xs font-medium text-ink">Conflict resolved</p>
                  <p className="text-[10px] text-ink-3">AI rerouted · 0 manual steps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-4">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-current" />
        <span className="text-[9px] tracking-[0.35em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

/* ─── Switch bar ─────────────────────────────────────────────────────────── */

function SwitchBar() {
  return (
    <div className="border-y border-edge bg-card-2 py-5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-ink">
            <span className="font-semibold text-gold">247 businesses</span> switched from BookingKoala or Launch27 last month
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-ink-3">
            {["✓ No credit card to start", "✓ Migrate data in minutes", "✓ AI included from day one"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Logos ──────────────────────────────────────────────────────────────── */

function Logos() {
  const names = ["CleanCo", "PureSpace", "NeatPros", "SwiftMaid", "HomeFlow", "BrightTeam"];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-9 text-center text-[9px] tracking-[0.35em] uppercase text-ink-3">
            Trusted by service businesses across the country
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {names.map((n) => (
              <span key={n} className="cursor-default font-display text-xl font-semibold italic text-ink-4 opacity-35 transition-opacity duration-300 hover:opacity-70">
                {n}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── AI Features ────────────────────────────────────────────────────────── */

const AI_FEATS = [
  {
    icon: <IconBrain />,
    img: "/assets/feat-dispatch.png",
    title: "AI Dispatch Engine",
    desc: "The moment a booking lands, AI weighs skills, proximity, availability, and rating — then assigns the best-fit pro without a single click from you.",
    stat: "98% auto-assignment",
    accent: { text: "text-gold", bg: "bg-gold/10", glow: "rgba(191,146,69,0.06)" },
  },
  {
    icon: <IconRoute />,
    img: "/assets/feat-conflict.png",
    title: "Conflict Resolution",
    desc: "Double-booked? Unavailable? ServiceOS detects conflicts the instant they form and reroutes to the next best pro — silently, in seconds.",
    stat: "0 manual reschedules",
    accent: { text: "text-blue-400", bg: "bg-blue-400/10", glow: "rgba(96,165,250,0.06)" },
  },
  {
    icon: <IconTrend />,
    img: "/assets/feat-pricing.png",
    title: "Pricing Intelligence",
    desc: "AI reads demand signals, seasonality, and job complexity to suggest optimal prices. Capture more revenue on premium slots without losing budget customers.",
    stat: "+18% avg revenue",
    accent: { text: "text-emerald-400", bg: "bg-emerald-400/10", glow: "rgba(52,211,153,0.06)" },
  },
  {
    icon: <IconMsg />,
    img: "/assets/feat-comms.png",
    title: "Automated Comms",
    desc: "Review nudges, rebooking reminders, and follow-ups — all drafted and sent automatically. Your customer relationship managed, hands-free.",
    stat: "89% review rate",
    accent: { text: "text-purple-400", bg: "bg-purple-400/10", glow: "rgba(192,132,252,0.06)" },
  },
];

function AIFeatures() {
  return (
    <section id="ai" className="border-y border-edge bg-card py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-gold">
            <Sparkle size={9} /> AI Features
          </p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            The intelligence<br />
            <span className="font-semibold not-italic">BookingKoala doesn&apos;t have</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-2">
            Every other booking tool gives you a scheduler. ServiceOS gives you an AI operations layer
            that runs your business.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {AI_FEATS.map((f, i) => (
            <Reveal key={i} delay={i * 75}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl border border-edge transition-all duration-400 hover:border-edge-2"
                style={{ background: "var(--color-canvas)" }}
              >
                {/* AI-generated image header */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 30%, var(--color-canvas) 100%)" }}
                  />
                  <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium backdrop-blur-sm ${f.accent.bg} ${f.accent.text}`}>
                    {f.stat}
                  </span>
                </div>

                {/* hover scan line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.accent.glow.replace("0.06", "0.5")}, transparent)` }}
                />

                <div className="relative px-8 pb-8 pt-2">
                  <div className={`inline-flex rounded-xl p-2.5 ${f.accent.bg} ${f.accent.text}`}>
                    {f.icon}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold italic text-ink">{f.title}</h3>
                  <p className="mt-3 text-sm leading-[1.85] text-ink-2">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Comparison Table ───────────────────────────────────────────────────── */

type CellVal = boolean | string;

const ROWS: { label: string; us: CellVal; bk: CellVal; l27: CellVal; ai?: boolean }[] = [
  { label: "AI auto-dispatch",           us: true,       bk: false,      l27: false,    ai: true },
  { label: "AI conflict resolution",     us: true,       bk: false,      l27: false,    ai: true },
  { label: "AI pricing intelligence",    us: true,       bk: false,      l27: false,    ai: true },
  { label: "AI customer follow-ups",     us: true,       bk: false,      l27: false,    ai: true },
  { label: "Embeddable booking widget",  us: true,       bk: true,       l27: true },
  { label: "Staff field portal",         us: true,       bk: true,       l27: true },
  { label: "Online payments (Stripe)",   us: true,       bk: true,       l27: true },
  { label: "Customer self-service portal", us: true,     bk: true,       l27: false },
  { label: "Webhooks & API access",      us: true,       bk: false,      l27: false },
  { label: "White-label branding",       us: true,       bk: true,       l27: false },
  { label: "Starting price",             us: "$0/mo",    bk: "$27/mo",   l27: "$49/mo" },
];

function Cell({ val }: { val: CellVal }) {
  if (typeof val === "string") return <span className="text-sm font-semibold text-ink">{val}</span>;
  return val ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold">
      <IconCheck />
    </span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-4/25 text-ink-4">
      <IconX />
    </span>
  );
}

function ComparisonTable() {
  return (
    <section id="compare" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-[9px] tracking-[0.3em] uppercase text-gold">Comparison</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Why teams leave<br />
            <span className="font-semibold not-italic">BookingKoala &amp; Launch27</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-ink-2 leading-relaxed">
            It&apos;s not just price. It&apos;s capability. Every AI feature below is exclusive to ServiceOS.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden rounded-2xl border border-edge">
            {/* Header */}
            <div className="grid grid-cols-4 bg-card">
              <div className="border-b border-r border-edge px-6 py-4 text-xs text-ink-4">Feature</div>
              {[
                { name: "ServiceOS", highlight: true },
                { name: "BookingKoala", highlight: false },
                { name: "Launch27", highlight: false },
              ].map((col, ci) => (
                <div
                  key={col.name}
                  className={`border-b border-edge px-4 py-4 text-center text-sm font-medium last:border-r-0 ${ci < 2 ? "border-r" : ""} ${col.highlight ? "text-gold" : "text-ink-3"}`}
                >
                  {col.name}
                  {col.highlight && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-gold/12 px-1.5 py-0.5 text-[9px] text-gold">
                      <Sparkle size={8} /> AI
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 border-b border-edge last:border-0 transition-colors hover:bg-card ${row.ai ? "bg-gold/[0.022]" : "bg-canvas"}`}
              >
                <div className="flex items-center gap-2 border-r border-edge px-6 py-3.5 text-sm text-ink-2">
                  {row.ai && <span className="flex-shrink-0 text-gold"><Sparkle size={9} /></span>}
                  {row.label}
                </div>
                {([row.us, row.bk, row.l27] as CellVal[]).map((val, j) => (
                  <div key={j} className={`flex items-center justify-center py-3.5 ${j < 2 ? "border-r border-edge" : ""}`}>
                    <Cell val={val} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <a
              href="#"
              className="rounded-full bg-gold px-9 py-4 text-sm font-medium text-canvas transition-all hover:bg-gold-hi hover:shadow-xl hover:shadow-gold/25"
            >
              Switch to ServiceOS — it&apos;s free to start →
            </a>
            <p className="text-sm text-ink-3">No credit card · Import your existing data in minutes</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Platform Features ──────────────────────────────────────────────────── */

const FEATS = [
  { icon: <IconCode />,     title: "Embeddable Booking",   desc: "Paste one snippet. Customers configure, pay, and confirm — without leaving your site.", tag: "Customer-facing" },
  { icon: <IconZap />,      title: "Smart Dispatch",        desc: "AI assigns the right pro instantly. Conflict detection keeps your schedule pristine.", tag: "AI" },
  { icon: <IconPhone />,    title: "Pro Field Portal",      desc: "Clean mobile view for staff. Status updates, before/after photos, and signatures.", tag: "Staff" },
  { icon: <IconUsers />,    title: "Customer Portal",       desc: "Clients self-serve: book, reschedule, track, and review without phone tag.", tag: "Customers" },
  { icon: <IconCard />,     title: "Payments & Payroll",    desc: "Stripe built in. Auto-invoicing, payment tracking, and payroll reports.", tag: "Finance" },
  { icon: <IconCalendar />, title: "Notifications & APIs",  desc: "Email + SMS via SES & Twilio. HMAC-signed webhooks keep your stack in sync.", tag: "Automation" },
];

function PlatformFeatures() {
  return (
    <section id="features" className="border-y border-edge bg-card py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-[9px] tracking-[0.3em] uppercase text-gold">Platform</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Everything you need,<br />
            <span className="font-semibold not-italic">nothing you don&apos;t</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATS.map((f, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="group h-full rounded-2xl border border-edge bg-canvas p-7 transition-all duration-300 hover:border-edge-2 hover:bg-card-2 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-xl bg-gold/10 p-3 text-gold transition-colors group-hover:bg-gold/15">
                    {f.icon}
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] ${f.tag === "AI" ? "border-gold/30 text-gold" : "border-edge-2 text-ink-3"}`}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold italic text-ink">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */

const STEPS = [
  { n: "01", title: "Configure in minutes", desc: "Set your services, pricing, staff, and branding. Connect Stripe and your calendar. Done in under an hour." },
  { n: "02", title: "Embed & go live", desc: "Paste one line on your site. Customers book, pay, and confirm — fully automated from day one." },
  { n: "03", title: "AI runs the rest", desc: "Jobs dispatch themselves. Conflicts clear themselves. Customers follow up themselves. You watch revenue grow." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-[9px] tracking-[0.3em] uppercase text-gold">How it works</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Setup to first booking<br />
            <span className="font-semibold not-italic">in under an hour</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative">
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[calc(100%+1.5rem)] top-10 hidden h-px w-[calc(100%-3rem)] border-t border-dashed border-edge-2 md:block" />
                )}
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-edge-2 text-2xl font-display font-semibold text-ink-3"
                  style={{ background: "var(--color-card)" }}
                >
                  {s.n}
                </div>
                <h3 className="font-display text-2xl font-semibold italic text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────── */

const TESTI = [
  {
    quote: "We switched from BookingKoala. The AI dispatch alone saves us 3 hours a day. We now handle 2× the volume with the same team.",
    name: "Marcus Webb",
    role: "Owner, Webb Cleaning Co.",
    initials: "MW",
    from: "Switched from BookingKoala",
  },
  {
    quote: "Launch27 was fine until we tried ServiceOS. The AI conflict resolution is a game-changer. We haven't had a double-booking since.",
    name: "Priya Anand",
    role: "Operations Manager, NeatPros",
    initials: "PA",
    from: "Switched from Launch27",
  },
  {
    quote: "The AI follow-up system took our review count from 40 to 312 in 3 months. That alone paid for the platform 10× over.",
    name: "Derek Hollis",
    role: "Founder, SwiftMaid",
    initials: "DH",
    from: "Switched from Jobber",
  },
];

function Testimonials() {
  return (
    <section className="border-y border-edge bg-card py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-[9px] tracking-[0.3em] uppercase text-gold">Customer stories</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Why they left &amp;<br />
            <span className="font-semibold not-italic">never looked back</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTI.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group flex h-full flex-col rounded-2xl border border-edge bg-canvas p-8 transition-all duration-300 hover:border-edge-2 hover:-translate-y-1">
                <span className="mb-5 inline-block self-start rounded-full border border-edge-2 px-2.5 py-1 text-[9px] text-ink-4 transition-colors group-hover:border-gold/20 group-hover:text-gold/70">
                  {t.from}
                </span>
                <svg className="mb-5 text-gold/18" width="30" height="24" viewBox="0 0 36 28" fill="currentColor">
                  <path d="M0 28V16.8C0 11.2 1.75 6.65 5.25 3.15 8.75 1.05 12.95 0 17.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H14V28H0zm21 0V16.8c0-5.6 1.75-10.15 5.25-13.65C29.75 1.05 33.95 0 38.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H35V28H21z" />
                </svg>
                <p className="flex-1 text-sm leading-[1.9] text-ink-2">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-3 border-t border-edge pt-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-ink-3">{t.role}</p>
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

/* ─── Pricing ────────────────────────────────────────────────────────────── */

const PLANS = [
  {
    name: "Starter", monthly: 0, annual: 0,
    desc: "For solo operators getting started.",
    features: ["1 staff", "30 bookings/month", "Embeddable widget", "Stripe payments", "Email notifications", "Customer portal"],
    cta: "Get started free", highlight: false,
  },
  {
    name: "Growth", monthly: 49, annual: 39,
    desc: "For growing teams managing real volume.",
    features: ["Up to 10 staff", "Unlimited bookings", "AI dispatch & assignment", "AI conflict resolution", "SMS + email", "Pro field portal", "Analytics", "Webhooks & API", "Priority support"],
    cta: "Start free trial", highlight: true, badge: "Most popular",
  },
  {
    name: "Enterprise", monthly: 149, annual: 119,
    desc: "For multi-location operations at scale.",
    features: ["Unlimited staff", "Unlimited locations", "Everything in Growth", "AI pricing intelligence", "AI customer comms", "White-label", "SSO & SAML", "Dedicated manager", "Custom integrations", "SLA"],
    cta: "Contact sales", highlight: false,
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-[9px] tracking-[0.3em] uppercase text-gold">Pricing</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Simple pricing,<br />
            <span className="font-semibold not-italic">no surprises</span>
          </h2>
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-edge-2 bg-card p-1.5">
            {[{ l: "Monthly", v: false }, { l: "Annual", v: true, badge: "Save 20%" }].map((o) => (
              <button
                key={o.l}
                onClick={() => setAnnual(o.v)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all ${annual === o.v ? "bg-gold font-medium text-canvas" : "text-ink-3 hover:text-ink"}`}
              >
                {o.l}
                {o.badge && <span className={`text-xs ${annual === o.v ? "text-canvas/70" : "text-emerald-500"}`}>{o.badge}</span>}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  plan.highlight
                    ? "border-gold/35 bg-card shadow-2xl shadow-gold/5"
                    : "border-edge bg-canvas hover:border-edge-2 hover:-translate-y-1"
                }`}
              >
                {(plan as typeof plan & { badge?: string }).badge && (
                  <span className="mb-4 inline-block self-start rounded-full bg-gold/15 px-3 py-1 text-xs text-gold">
                    {(plan as typeof plan & { badge?: string }).badge}
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold italic text-ink">{plan.name}</h3>
                <p className="mt-1 text-sm text-ink-3">{plan.desc}</p>
                <div className="my-7">
                  <span className="font-display text-5xl font-semibold text-ink">${annual ? plan.annual : plan.monthly}</span>
                  <span className="ml-2 text-sm text-ink-3">/ month</span>
                  {annual && plan.annual > 0 && <p className="mt-1 text-xs text-ink-3">Billed annually</p>}
                </div>
                <ul className="flex-1 space-y-3 border-t border-edge pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-gold" : "text-ink-3"}`}><IconCheck /></span>
                      <span className="text-sm text-ink-2">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-8 block w-full rounded-full py-3.5 text-center text-sm font-medium transition-all ${
                    plan.highlight
                      ? "bg-gold text-canvas hover:bg-gold-hi hover:shadow-lg hover:shadow-gold/20"
                      : "border border-edge-2 text-ink hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-10 text-center text-sm text-ink-3">
            BookingKoala starts at $27/mo with no AI. Launch27 starts at $49/mo with no AI.{" "}
            <a href="#compare" className="text-gold underline underline-offset-2 hover:text-gold-hi">See comparison →</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="relative overflow-hidden border-y border-edge bg-card py-32">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(191,146,69,0.055) 0%, transparent 60%)", filter: "blur(60px)" }}
        />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }} />
      </div>
      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="mb-5 inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-gold">
          <Sparkle size={9} /> Ready
        </p>
        <h2 className="font-display text-[3.5rem] font-light italic leading-tight text-ink">
          Stop managing jobs manually.<br />
          <span className="font-semibold not-italic">Let AI handle it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-2">
          Join 5,000+ service businesses that have moved off BookingKoala and Launch27.
          Free to start. AI included from day one.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="rounded-full bg-gold px-9 py-4 text-sm font-medium text-canvas transition-all hover:bg-gold-hi hover:shadow-xl hover:shadow-gold/25"
          >
            Start your free trial →
          </a>
          <a
            href="#"
            className="rounded-full border border-edge-2 px-9 py-4 text-sm text-ink-2 transition-colors hover:border-gold/30 hover:text-gold"
          >
            Book a demo
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  const cols: Record<string, string[]> = {
    Product: ["Features", "AI Engine", "Pricing", "Changelog"],
    Compare: ["vs BookingKoala", "vs Launch27", "vs Jobber", "vs HouseCallPro"],
    Solutions: ["Cleaning", "Maintenance", "Field Service", "Multi-location"],
    Company: ["About", "Blog", "Careers", "Contact"],
  };

  return (
    <footer className="border-t border-edge bg-canvas py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-semibold italic text-ink">ServiceOS</p>
            <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-gold"><Sparkle size={9} /> AI-native</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">
              The only booking & dispatch platform built with AI at its core.
            </p>
          </div>
          {Object.entries(cols).map(([cat, items]) => (
            <div key={cat}>
              <p className="mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-ink-3">{cat}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-ink-3 transition-colors hover:text-ink">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 text-xs text-ink-4 md:flex-row">
          <p>© 2025 ServiceOS. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-ink-3">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function V2() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SwitchBar />
        <Logos />
        <AIFeatures />
        <ComparisonTable />
        <PlatformFeatures />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
