"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Scroll Reveal ─────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom" }: {
  children: React.ReactNode; delay?: number; className?: string; from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold: 0.01, rootMargin: "0px 0px 80px 0px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const translate = from === "left" ? "translateX(-28px)" : from === "right" ? "translateX(28px)" : "translateY(24px)";
  return (
    <div ref={ref} className={className} style={{ opacity: on ? 1 : 0, transform: on ? "none" : translate, transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Counter ───────────────────────────────────────────────────────────────── */
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
    const start = performance.now(); const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to]);
  return <span ref={ref}>{val >= 1000 ? (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + "K" : val}{suffix}</span>;
}

/* ─── Ripple Dot ────────────────────────────────────────────────────────────── */
function RippleDot({ color }: { color: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-3 w-3 rounded-full" style={{ background: color, opacity: 0.25, animation: "ripple-out 2s ease-out infinite" }} />
      <div className="absolute h-3 w-3 rounded-full" style={{ background: color, opacity: 0.15, animation: "ripple-out 2s 0.6s ease-out infinite" }} />
      <div className="relative h-3 w-3 rounded-full ring-4 ring-canvas" style={{ background: color }} />
    </div>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────────────── */
const Sparkle = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor"><path d="M6 0L6.8 5.2L12 6L6.8 6.8L6 12L5.2 6.8L0 6L5.2 5.2Z" /></svg>
);
const IconBrain = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-1.14Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-1.14Z" /></svg>);
const IconRoute = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" /><path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12" /></svg>);
const IconTrend = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>);
const IconMsg = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></svg>);
const IconCalendar = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>);
const IconZap = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.09 12.26a1 1 0 0 0 .74 1.63H12l-1 8 8.91-10.26a1 1 0 0 0-.74-1.63H12l1-8z" /></svg>);
const IconUsers = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const IconPhone = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" /></svg>);
const IconCode = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const IconCard = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>);
const IconCheck = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5l3.5 3.5L11 3" /></svg>);
const IconX = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 2l8 8M10 2l-8 8" /></svg>);
const IconBroom = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3L5 21" /><path d="M5 21h14" /><path d="M15 3c0 4.5-6 6-6 9" /></svg>);
const IconBox = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></svg>);

/* ─── Mesh Background ───────────────────────────────────────────────────────── */
function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-mesh-1 absolute" style={{ width: "900px", height: "750px", top: "-5%", left: "-8%", background: "radial-gradient(ellipse, rgba(176,125,46,0.11) 0%, rgba(176,125,46,0.04) 45%, transparent 68%)", filter: "blur(90px)", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%" }} />
      <div className="animate-mesh-2 absolute" style={{ width: "700px", height: "650px", top: "25%", right: "-12%", background: "radial-gradient(ellipse, rgba(196,144,64,0.08) 0%, transparent 62%)", filter: "blur(110px)", borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%" }} />
      <div className="animate-mesh-3 absolute" style={{ width: "600px", height: "520px", bottom: "-8%", left: "28%", background: "radial-gradient(ellipse, rgba(122,88,32,0.07) 0%, transparent 70%)", filter: "blur(130px)", borderRadius: "70% 30% 60% 40% / 40% 70% 30% 60%" }} />
    </div>
  );
}

/* ─── AI Dispatch Feed ──────────────────────────────────────────────────────── */
const SCENARIOS = [
  { incoming: "Deep Clean · 9:00 AM · 4bd/3ba", thinking: "Matching 14 pros by skill, distance, rating...", decision: "Sarah M. assigned (4.9★, 2.1 mi)", sub: "Route optimized · 18 min saved", accent: { text: "text-emerald-600", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.12)" } },
  { incoming: "Move-out Clean · 11:30 AM · Rush", thinking: "Conflict on Mike T. — scanning alternatives...", decision: "Alex P. rerouted · conflict auto-cleared", sub: "Zero manual input required", accent: { text: "text-blue-600", bg: "bg-blue-500/10", glow: "rgba(96,165,250,0.12)" } },
  { incoming: "Post-Reno · 2:00 PM · Large", thinking: "Market rate analysis: $285 (+12% premium)...", decision: "$285 suggested · customer accepted", sub: "+$35 vs standard rate", accent: { text: "text-gold", bg: "bg-gold/10", glow: "rgba(176,125,46,0.12)" } },
  { incoming: "Follow-up: Job #1042 (no review yet)", thinking: "Day 2 — nudge threshold reached...", decision: "Automated SMS sent to customer", sub: "Review rate lifted 71% → 89%", accent: { text: "text-purple-600", bg: "bg-purple-500/10", glow: "rgba(192,132,252,0.12)" } },
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
    <div className="w-full max-w-[340px] overflow-hidden rounded-2xl border border-edge-2 bg-canvas shadow-2xl shadow-ink/[0.10]">
      <div className="flex items-center gap-3 border-b border-edge px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold"><IconBrain /></div>
        <div className="flex-1">
          <p className="text-xs font-medium text-ink">AI Dispatch Engine</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" style={{ animation: "pulse 1.5s infinite" }} />
            <p className="text-[10px] text-emerald-600">Live · processing</p>
          </div>
        </div>
        <span className="font-mono text-[10px] text-ink-4">v3.0</span>
      </div>
      <div className="px-5 py-4">
        <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.2em] text-ink-4">Active booking</p>
        <div className="rounded-xl border p-4 transition-all duration-500" style={{ borderColor: phase === "done" ? "rgba(176,125,46,0.2)" : "var(--color-edge-2)", background: phase === "done" ? `radial-gradient(circle at 100% 0%, ${s.accent.glow}, transparent 60%), var(--color-card)` : "var(--color-card)" }}>
          <div className="flex items-start gap-2.5">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold" style={{ animation: phase !== "done" ? "pulse 1s infinite" : "none" }} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-ink">{s.incoming}</p>
              <div style={{ maxHeight: phase !== "in" ? "40px" : "0", opacity: phase !== "in" ? 1 : 0, overflow: "hidden", transition: "all 0.4s ease", marginTop: phase !== "in" ? "8px" : "0" }}>
                <p className="font-mono text-[10px] text-ink-3">{s.thinking}</p>
              </div>
              <div style={{ maxHeight: phase === "done" ? "60px" : "0", opacity: phase === "done" ? 1 : 0, overflow: "hidden", transition: "all 0.45s ease", marginTop: phase === "done" ? "8px" : "0" }}>
                <p className={`text-xs font-semibold ${s.accent.text}`}>→ {s.decision}</p>
                <p className="mt-1 text-[10px] text-ink-3">{s.sub}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">{[0, 1].map((i) => (<div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2 opacity-15"><div className="h-1.5 w-1.5 rounded-full bg-ink-3" /><div className="h-2 flex-1 rounded-full bg-ink-4" /><div className="h-2 w-14 rounded-full bg-ink-4" /></div>))}</div>
      </div>
      <div className="flex items-center justify-between border-t border-edge px-5 py-3 text-[10px] text-ink-3">
        <span>246 dispatched today</span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-600">0 conflicts</span>
      </div>
    </div>
  );
}

/* ─── Nav ───────────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500" style={{ borderBottom: scrolled ? "1px solid var(--color-edge)" : "1px solid transparent", background: scrolled ? "rgba(255,255,255,0.96)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <a href="/" className="font-display text-2xl font-semibold italic text-ink">ServiceOS</a>
          <span className="hidden items-center gap-1 rounded-full border border-gold/25 bg-gold/[0.07] px-2.5 py-1 text-[10px] text-gold sm:inline-flex"><Sparkle size={9} /> AI-native</span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-ink-3 md:flex">
          {[["Features", "#features"], ["AI Engine", "#ai"], ["Pricing", "#pricing"]].map(([l, h]) => (<a key={l} href={h} className="transition-colors hover:text-ink">{l}</a>))}
          <a href="#" className="transition-colors hover:text-ink">Login</a>
        </div>
        <a href="#" className="shimmer-card rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-gold-hi hover:shadow-lg hover:shadow-gold/25">Start free →</a>
      </div>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <MeshBackground />
      {/* Subtle dot grid overlay */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, var(--color-edge-2) 1px, transparent 1px)`, backgroundSize: "36px 36px", opacity: 0.4 }} />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2">
        <div>
          <div className="animate-rise mb-8 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.065] px-4 py-1.5 text-xs text-gold">
            <Sparkle size={10} /> AI-powered online booking system
          </div>
          <h1 className="animate-rise-1">
            <span className="block leading-[1.0]" style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(2.8rem,5.5vw,4.8rem)", letterSpacing: "-0.03em", color: "var(--color-ink-warm)" }}>Bookings in.</span>
            <span className="block leading-[1.0] mt-1" style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(2.8rem,5.5vw,4.8rem)", letterSpacing: "-0.03em", color: "var(--color-ink-warm)" }}>Jobs dispatched.</span>
            <span className="text-gradient-gold block mt-2 leading-[1.15]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(2.4rem,4.5vw,4.2rem)" }}>You just grow.</span>
          </h1>
          <p className="animate-rise-2 mt-7 max-w-lg text-[15px] leading-[1.9] text-ink-2">
            ServiceOS is the <span className="text-ink font-medium">online booking system</span> for cleaning, maintenance & field service businesses — with AI that dispatches jobs, resolves conflicts, and follows up with customers <span className="text-ink font-medium">automatically</span>.
          </p>
          <div className="animate-rise-3 mt-9 flex flex-wrap items-center gap-5">
            <a href="#" className="shimmer-card rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-gold-hi hover:shadow-xl hover:shadow-gold/25">Start free trial →</a>
            <a href="#ai" className="flex items-center gap-2.5 text-sm text-ink-2 transition-colors hover:text-ink"><span className="h-px w-8 bg-current" />See AI in action</a>
          </div>
          <div className="animate-rise-3 mt-10 grid grid-cols-3 gap-6 border-t border-edge pt-9">
            {[{ n: 5200, suffix: "+", label: "Service businesses" }, { n: 14, suffix: "hrs", label: "Saved per owner / week" }, { n: 98, suffix: "%", label: "Jobs auto-dispatched" }].map((s) => (
              <div key={s.label}>
                <p className="font-display text-[1.75rem] font-semibold leading-none text-gold"><Counter to={s.n} suffix={s.suffix} /></p>
                <p className="mt-1.5 text-[11px] text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — AI Feed with glow halo */}
        <div className="hidden lg:flex lg:items-center lg:justify-end">
          <div className="relative">
            {/* Glow halo behind the widget */}
            <div className="absolute inset-0 -m-8 rounded-3xl" style={{ background: "radial-gradient(circle, rgba(176,125,46,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />
            <div className="animate-float relative">
              <AIFeed />
            </div>
            <div className="animate-float2 absolute -left-24 top-8 w-48 shimmer-card rounded-2xl border border-edge-2 bg-card p-4 shadow-xl shadow-ink/[0.06]">
              <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-ink-4">AI pricing uplift</p>
              <p className="font-display text-2xl font-semibold text-gold">+$2,840</p>
              <p className="mt-0.5 text-[10px] text-ink-3">this month</p>
              <div className="mt-3 flex items-end gap-0.5" style={{ height: "28px" }}>
                {[30, 45, 35, 60, 50, 75, 65, 90, 80].map((h, i) => (<div key={i} className="flex-1 rounded-sm bg-gold/30" style={{ height: `${h}%` }} />))}
              </div>
            </div>
            <div className="animate-float3 absolute -right-6 bottom-16 w-52 shimmer-card rounded-2xl border border-edge-2 bg-card p-3.5 shadow-xl shadow-ink/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm text-emerald-600">✓</div>
                <div><p className="text-xs font-medium text-ink">Booking confirmed</p><p className="text-[10px] text-ink-3">AI dispatched · 0 manual steps</p></div>
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

/* ─── Quote Ticker ──────────────────────────────────────────────────────────── */
const TICKER_QUOTES = [
  '"Saved 14 hours last week alone." — Marcus, Webb Cleaning',
  '"AI dispatch is unreal. Zero conflicts in 3 months." — Priya, NeatPros',
  '"Review count went from 40 to 312 in 90 days." — Derek, SwiftMaid',
  '"Live in 45 minutes. No developer needed." — Jen, HomeSpark',
  '"Our team stopped calling me about scheduling." — Tom, CleanCo',
  '"Best ROI of any software we run." — Vanessa, PureSpace',
  '"I check my phone in the morning and everything\'s already done." — Ray, BrightTeam',
];
function QuoteTicker() {
  return (
    <div className="relative overflow-hidden border-y border-edge bg-gold/[0.035] py-[14px]">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24" style={{ background: "linear-gradient(90deg, var(--color-canvas-warm), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24" style={{ background: "linear-gradient(270deg, var(--color-canvas-warm), transparent)" }} />
      <div className="flex animate-marquee gap-14 whitespace-nowrap">
        {[...TICKER_QUOTES, ...TICKER_QUOTES].map((q, i) => (
          <span key={i} className="inline-flex flex-shrink-0 items-center gap-2.5 text-[13px] text-ink-2">
            <span className="text-gold/70"><Sparkle size={8} /></span>{q}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Honest Statement ──────────────────────────────────────────────────────── */
function HonestStatement() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="mb-5 text-[9px] uppercase tracking-[0.35em] text-gold">The honest version</p>
          <blockquote className="font-display leading-tight text-ink" style={{ fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 300, fontStyle: "italic" }}>
            &ldquo;Most booking software gives you a calendar.<br />
            <span className="font-semibold not-italic" style={{ color: "var(--color-ink-warm)" }}>ServiceOS gives you an operations engine.&rdquo;</span>
          </blockquote>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-ink-3">
            The difference isn&apos;t a feature list. It&apos;s that ServiceOS does the actual work — dispatching, rerouting, repricing, following up — so you stop managing your own software.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Booking Widget Demo ───────────────────────────────────────────────────── */
const WIDGET_SERVICES = [
  { id: 0, label: "Deep Clean", icon: <IconBroom />, desc: "Top-to-bottom, every room" },
  { id: 1, label: "Standard Clean", icon: <Sparkle size={18} />, desc: "Regular maintenance clean" },
  { id: 2, label: "Move-out Clean", icon: <IconBox />, desc: "Full property, end of lease" },
];
const WIDGET_TIMES = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"];
const WIDGET_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BookingWidgetDemo() {
  const [phase, setPhase] = useState(0); // 0=service, 1=time, 2=confirmed
  const [selService, setSelService] = useState(-1);
  const [selDay, setSelDay] = useState(-1);
  const [selTime, setSelTime] = useState(-1);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 0) {
      t = setTimeout(() => setSelService(0), 800);
      const t2 = setTimeout(() => setPhase(1), 2200);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
    if (phase === 1) {
      t = setTimeout(() => setSelDay(2), 700);
      const t2 = setTimeout(() => setSelTime(0), 1400);
      const t3 = setTimeout(() => setPhase(2), 2600);
      return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3); };
    }
    if (phase === 2) {
      t = setTimeout(() => { setPhase(0); setSelService(-1); setSelDay(-1); setSelTime(-1); }, 3500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <section className="border-y border-edge bg-card-2 py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <Reveal>
            <p className="mb-4 text-[9px] uppercase tracking-[0.35em] text-gold">Embeddable booking widget</p>
            <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
              Customers book on your site.<br />
              <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "var(--color-gold)", fontSize: "clamp(1.7rem,3.4vw,2.9rem)" }}>AI handles everything after.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
              One line of code on your website. Customers choose a service, pick a time, and pay — without ever calling you. ServiceOS confirms, dispatches, and follows up automatically.
            </p>
            <ul className="mt-8 space-y-3">
              {["Fully white-labelled — your brand, your colors", "Mobile-first, works on any device or site builder", "Stripe payments built in — no extra setup"].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-2">
                  <span className="mt-0.5 flex-shrink-0 text-gold"><IconCheck /></span>{item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: animated widget */}
          <Reveal delay={120} from="right">
            <div className="relative mx-auto w-full max-w-[380px]">
              {/* Glow behind widget */}
              <div className="absolute inset-0 -m-6 rounded-3xl" style={{ background: "radial-gradient(ellipse, rgba(176,125,46,0.14) 0%, transparent 65%)", filter: "blur(40px)" }} />

              {/* Widget frame */}
              <div className="relative overflow-hidden rounded-2xl border border-edge-2 bg-canvas shadow-2xl shadow-ink/[0.10]">
                {/* Widget header */}
                <div className="flex items-center justify-between border-b border-edge bg-card px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-gold/15 flex items-center justify-center"><span className="text-[10px] text-gold font-bold">S</span></div>
                    <span className="text-xs font-semibold text-ink">Book a service</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full transition-all duration-500" style={{ background: i <= phase ? "var(--color-gold)" : "var(--color-edge-2)" }} />
                    ))}
                  </div>
                </div>

                {/* Phase content */}
                <div className="min-h-[280px] px-5 py-5">
                  {/* Phase 0: Service selection */}
                  <div style={{ opacity: phase === 0 ? 1 : 0, height: phase === 0 ? "auto" : 0, overflow: "hidden", transition: "opacity 0.4s ease" }}>
                    <p className="mb-4 text-sm font-medium text-ink">What do you need?</p>
                    <div className="space-y-2.5">
                      {WIDGET_SERVICES.map((svc) => (
                        <div key={svc.id} className="flex items-center gap-3 rounded-xl border p-3.5 transition-all duration-400 cursor-pointer"
                          style={{ borderColor: selService === svc.id ? "var(--color-gold)" : "var(--color-edge)", background: selService === svc.id ? "rgba(176,125,46,0.05)" : "transparent", transform: selService === svc.id ? "scale(1.01)" : "scale(1)" }}>
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: selService === svc.id ? "rgba(176,125,46,0.12)" : "var(--color-card)", color: selService === svc.id ? "var(--color-gold)" : "var(--color-ink-3)" }}>{svc.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-ink">{svc.label}</p>
                            <p className="text-[11px] text-ink-3">{svc.desc}</p>
                          </div>
                          {selService === svc.id && <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold text-white"><IconCheck /></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phase 1: Date & time */}
                  <div style={{ opacity: phase === 1 ? 1 : 0, height: phase === 1 ? "auto" : 0, overflow: "hidden", transition: "opacity 0.4s ease" }}>
                    <p className="mb-4 text-sm font-medium text-ink">Pick a day</p>
                    <div className="mb-5 grid grid-cols-7 gap-1.5">
                      {WIDGET_DAYS.map((d, i) => (
                        <button key={d} className="flex flex-col items-center rounded-lg py-2 transition-all duration-300"
                          style={{ background: selDay === i ? "var(--color-gold)" : "var(--color-card)", color: selDay === i ? "white" : "var(--color-ink-3)" }}>
                          <span className="text-[9px] mb-0.5">{d}</span>
                          <span className="text-xs font-semibold">{i + 15}</span>
                        </button>
                      ))}
                    </div>
                    <p className="mb-3 text-sm font-medium text-ink">Available times</p>
                    <div className="grid grid-cols-2 gap-2">
                      {WIDGET_TIMES.map((t, i) => (
                        <button key={t} className="rounded-xl border py-2.5 text-sm transition-all duration-300"
                          style={{ borderColor: selTime === i ? "var(--color-gold)" : "var(--color-edge)", background: selTime === i ? "rgba(176,125,46,0.08)" : "transparent", color: selTime === i ? "var(--color-gold)" : "var(--color-ink-2)", fontWeight: selTime === i ? 600 : 400 }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Phase 2: Confirmed */}
                  <div style={{ opacity: phase === 2 ? 1 : 0, height: phase === 2 ? "auto" : 0, overflow: "hidden", transition: "opacity 0.5s ease" }}>
                    <div className="flex flex-col items-center py-4 text-center">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12" style={{ animation: phase === 2 ? "ripple-out 1.5s ease-out" : "none" }}>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-600">✓</div>
                      </div>
                      <p className="text-base font-semibold text-ink">You&apos;re all set!</p>
                      <p className="mt-1 text-[13px] text-ink-3">Deep Clean · Wed 9:00 AM</p>
                      <div className="mt-5 w-full rounded-xl border border-edge bg-card p-4 text-left">
                        <div className="flex items-center gap-2.5 border-b border-edge pb-3 mb-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">SM</div>
                          <div><p className="text-xs font-medium text-ink">Sarah M. assigned</p><p className="text-[10px] text-emerald-600">4.9★ · On her way</p></div>
                        </div>
                        <div className="flex justify-between text-[11px]"><span className="text-ink-3">Confirmation</span><span className="font-medium text-ink">#BK-7291</span></div>
                        <div className="mt-1.5 flex justify-between text-[11px]"><span className="text-ink-3">Payment</span><span className="text-emerald-600">Collected ✓</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step label */}
                <div className="border-t border-edge px-5 py-3 text-center">
                  <p className="text-[10px] text-ink-4">{["Choose a service", "Pick a time", "Confirmed!"][phase]}</p>
                </div>
              </div>

              {/* Floating snippet badge */}
              <div className="animate-float3 absolute -right-4 -top-4 rounded-xl border border-edge-2 bg-canvas px-3 py-2 shadow-lg shadow-ink/[0.06]">
                <p className="font-mono text-[10px] text-ink-3">{"<ServiceOS widget />"}</p>
                <p className="mt-0.5 text-[9px] text-gold">one line of code</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── AI Features ───────────────────────────────────────────────────────────── */
const AI_FEATS = [
  { icon: <IconBrain />, title: "AI Dispatch Engine", desc: "The moment a booking lands, AI weighs skills, proximity, availability, and rating — then assigns the best-fit pro without a single click from you.", stat: "98% auto-assignment", accent: { text: "text-gold", bg: "bg-gold/10", glow: "rgba(176,125,46,0.06)" } },
  { icon: <IconRoute />, title: "Conflict Resolution", desc: "Double-booked? Unavailable? ServiceOS detects scheduling conflicts the instant they form and reroutes to the next best pro — silently, in seconds.", stat: "0 manual reschedules", accent: { text: "text-blue-600", bg: "bg-blue-500/10", glow: "rgba(96,165,250,0.06)" } },
  { icon: <IconTrend />, title: "Pricing Intelligence", desc: "AI reads demand signals, seasonality, and job complexity to suggest optimal booking prices. Capture more revenue on premium slots without guesswork.", stat: "+18% avg revenue", accent: { text: "text-emerald-600", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.06)" } },
  { icon: <IconMsg />, title: "Automated Comms", desc: "Review nudges, rebooking reminders, and follow-ups — all drafted and sent automatically. Your customer relationships, hands-free.", stat: "89% review rate", accent: { text: "text-purple-600", bg: "bg-purple-500/10", glow: "rgba(192,132,252,0.06)" } },
];

function AIFeatures() {
  return (
    <section id="ai" className="border-y border-edge bg-card py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-gold"><Sparkle size={9} /> AI Engine</p>
            <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(2rem,4vw,3.5rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
              Here&rsquo;s what your AI ops layer<br /><span className="text-gold">does all day.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">While you&rsquo;re running the business, ServiceOS is running the software.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {AI_FEATS.map((f, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="shimmer-card glow-card group relative h-full overflow-hidden rounded-2xl border border-edge p-8 transition-all duration-300 hover:border-edge-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/[0.05]" style={{ background: "var(--color-canvas)" }}>
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(ellipse at 20% 20%, ${f.accent.glow}, transparent 55%)` }} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`inline-flex rounded-xl p-3 ${f.accent.bg} ${f.accent.text}`}>{f.icon}</div>
                    <span className={`mt-1 rounded-full px-3 py-1 text-[10px] font-medium ${f.accent.bg} ${f.accent.text}`}>{f.stat}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold italic text-ink">{f.title}</h3>
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

/* ─── Dashboard Mock ────────────────────────────────────────────────────────── */
const DASH_JOBS = [
  { id: "1038", service: "Deep Clean", client: "Jennifer M.", time: "9:00 AM", staff: "Sarah M.", status: "done", color: "#10b981" },
  { id: "1039", service: "Standard Clean", client: "Robert H.", time: "10:30 AM", staff: "Mike T.", status: "active", color: "var(--color-gold)" },
  { id: "1040", service: "Move-out Clean", client: "Chloe B.", time: "2:00 PM", staff: "Alex P.", status: "pending", color: "#3b82f6" },
  { id: "1041", service: "Deep Clean", client: "David K.", time: "4:00 PM", staff: "(dispatching…)", status: "ai", color: "#a855f7" },
];
const STATUS_LABELS: Record<string, string> = { done: "Complete", active: "In progress", pending: "Confirmed", ai: "AI assigning" };

function DashboardMock() {
  const [scanPos, setScanPos] = useState(0);
  const [tickRevenue, setTickRevenue] = useState(3840);
  useEffect(() => {
    const t = setInterval(() => setTickRevenue((v) => v + Math.floor(Math.random() * 80 + 20)), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-[9px] uppercase tracking-[0.35em] text-gold">The operations view</p>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
            This is your dispatch board.<br />
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "var(--color-ink-3)", fontSize: "clamp(1.7rem,3.4vw,2.8rem)" }}>
              It runs itself.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-2">
            Real-time view of every job, every staff member, every booking — all managed automatically by AI.
          </p>
        </Reveal>

        <Reveal delay={100}>
          {/* Browser chrome */}
          <div className="overflow-hidden rounded-2xl border border-edge-2 shadow-2xl shadow-ink/[0.10]">
            {/* Browser top bar */}
            <div className="flex items-center gap-3 border-b border-edge bg-card-2 px-4 py-3">
              <div className="flex gap-1.5">
                {["#f87171", "#fbbf24", "#34d399"].map((c) => (<div key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />))}
              </div>
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 rounded-md border border-edge bg-canvas px-3 py-1 text-[11px] text-ink-3 max-w-xs mx-auto">
                  <span className="text-emerald-500">●</span> app.serviceos.io/dispatch
                </div>
              </div>
              <div className="text-[10px] text-ink-4">Live</div>
            </div>

            {/* App content */}
            <div className="grid grid-cols-[200px_1fr] bg-canvas min-h-[500px]">
              {/* Sidebar */}
              <div className="border-r border-edge bg-card p-4 flex flex-col gap-1">
                <div className="mb-4 flex items-center gap-2 px-2">
                  <div className="h-7 w-7 rounded-lg bg-gold/15 flex items-center justify-center"><span className="text-xs font-bold text-gold">S</span></div>
                  <span className="text-sm font-semibold text-ink">ServiceOS</span>
                </div>
                {[
                  { label: "Dashboard", active: false },
                  { label: "Dispatch", active: true },
                  { label: "Schedule", active: false },
                  { label: "Staff", active: false },
                  { label: "Revenue", active: false },
                  { label: "Reviews", active: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors" style={{ background: item.active ? "rgba(176,125,46,0.10)" : "transparent", color: item.active ? "var(--color-gold)" : "var(--color-ink-3)", fontWeight: item.active ? 600 : 400 }}>
                    <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: item.active ? "var(--color-gold)" : "transparent" }} />
                    {item.label}
                  </div>
                ))}
                {/* Revenue widget in sidebar */}
                <div className="mt-auto rounded-xl border border-edge bg-canvas p-3">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-ink-4 mb-1.5">Today&apos;s revenue</p>
                  <p className="font-display text-xl font-semibold text-gold">${tickRevenue.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">↑ 14% vs last Tue</p>
                  <div className="mt-2.5 flex items-end gap-0.5" style={{ height: "22px" }}>
                    {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (<div key={i} className="flex-1 rounded-sm bg-gold/25" style={{ height: `${h}%` }} />))}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="p-6 relative overflow-hidden">
                {/* Scan line */}
                <div className="pointer-events-none absolute inset-x-0 h-px animate-scan" style={{ background: "linear-gradient(90deg, transparent, rgba(176,125,46,0.25), transparent)", zIndex: 1 }} />

                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">Today · Wednesday · May 14</h3>
                    <p className="text-[11px] text-ink-3 mt-0.5">14 jobs booked · 1 pending dispatch</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" style={{ animation: "pulse 1.5s infinite" }} />
                    <span className="text-[11px] font-medium text-emerald-700">AI Active</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mb-5 grid grid-cols-4 gap-3">
                  {[
                    { label: "Booked", val: "14", color: "var(--color-ink)" },
                    { label: "In progress", val: "1", color: "var(--color-gold)" },
                    { label: "Completed", val: "8", color: "#10b981" },
                    { label: "Conflicts", val: "0", color: "#3b82f6" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-edge bg-card p-3 text-center">
                      <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.val}</p>
                      <p className="text-[10px] text-ink-3">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Job cards */}
                <div className="space-y-2.5">
                  {DASH_JOBS.map((job, i) => (
                    <div key={job.id} className="flex items-center gap-3 rounded-xl border border-edge bg-canvas px-4 py-3 transition-all hover:border-edge-2 hover:shadow-sm"
                      style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="flex-shrink-0 font-mono text-[10px] text-ink-4">#{job.id}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-ink truncate">{job.service} — {job.client}</p>
                        <p className="text-[10px] text-ink-3">{job.time} · {job.staff}</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: `${job.color}15` }}>
                        {job.status === "ai" && <span className="h-1.5 w-1.5 rounded-full" style={{ background: job.color, animation: "pulse 1s infinite" }} />}
                        <span className="text-[10px] font-medium" style={{ color: job.color }}>{STATUS_LABELS[job.status]}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI dispatch note */}
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-gold/20 bg-gold/[0.04] px-4 py-3">
                  <span className="text-gold"><Sparkle size={10} /></span>
                  <p className="text-[11px] text-ink-2">AI is matching Job #1041 — scanning 11 available pros by skill, location & rating</p>
                  <span className="ml-auto flex-shrink-0 font-mono text-[10px] text-ink-4">0.3s</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Day In Life ───────────────────────────────────────────────────────────── */
const TIMELINE = [
  { time: "7:43 AM", event: "New booking arrives", detail: "Deep Clean · 4bd/3ba · Thursday 9 AM", outcome: "Sarah M. assigned (4.9★, 2.1 mi)", sub: "AI matched by skill, distance & rating in 0.3s. Auto-confirmed.", dot: "#10b981" },
  { time: "9:02 AM", event: "Schedule conflict detected", detail: "Mike T. double-booked — move-out vs. recurring client", outcome: "Alex P. rerouted automatically", sub: "No call made. No spreadsheet touched. Customer never knew.", dot: "#3b82f6" },
  { time: "2:17 PM", event: "Job #1042 marked complete", detail: "Sarah M. updated status via the field portal", outcome: "Invoice sent. Payment collected.", sub: "Review request queued to send tomorrow morning.", dot: "var(--color-gold)" },
  { time: "8:30 AM", event: "You wake up", detail: "Make coffee. Check your phone.", outcome: "3 new 5★ reviews. 2 new bookings.", sub: "Everything happened while you slept. That's the point.", dot: "#a855f7" },
];

function DayInLife() {
  return (
    <section className="border-y border-edge bg-card py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mb-16">
          <p className="mb-4 text-[9px] uppercase tracking-[0.35em] text-gold">A day on ServiceOS</p>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
            Tuesday. Business as usual.<br />
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "var(--color-ink-3)", fontSize: "clamp(1.7rem,3.4vw,2.8rem)" }}>For everyone but you.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-2">A real day on ServiceOS. Nothing manual. No firefighting. Just outcomes.</p>
        </Reveal>

        <div className="relative pl-0 md:pl-[176px]">
          <div className="absolute hidden md:block" style={{ left: "155px", top: "24px", bottom: "24px", width: "1px", background: "linear-gradient(to bottom, transparent, var(--color-edge-2) 8%, var(--color-edge-2) 92%, transparent)" }} />
          <div className="space-y-6">
            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="relative flex items-start">
                  <div className="absolute right-full mr-6 hidden w-[120px] flex-shrink-0 text-right md:block">
                    <span className="font-mono text-[11px] text-ink-3 mt-5 block">{item.time}</span>
                  </div>
                  <div className="absolute -left-[21px] hidden md:flex items-center justify-center mt-5 z-10">
                    <RippleDot color={item.dot} />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-edge bg-canvas transition-all hover:border-edge-2 hover:shadow-md hover:shadow-ink/[0.04] shimmer-card">
                    <div className="p-6">
                      <p className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium text-ink-3 border border-edge">{item.time}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink-4">{item.event}</p>
                      <p className="mt-2 text-[14px] text-ink-2 leading-relaxed">{item.detail}</p>
                    </div>
                    <div className="border-t border-edge md:border-t-0 md:border-l p-6" style={{ background: "var(--color-card)" }}>
                      <p className="text-[14px] font-semibold text-ink leading-snug">→ {item.outcome}</p>
                      <p className="mt-2 text-[13px] text-ink-3 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2.5 text-sm text-ink-2 transition-colors hover:text-gold">
            <span className="h-px w-8 bg-current" />Start your free trial — no credit card
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Platform Features ─────────────────────────────────────────────────────── */
const FEATS = [
  { icon: <IconCode />,     title: "Embeddable Booking Widget",  desc: "Paste one snippet on your site. Customers pick services, pay, and confirm — without leaving your page.",     tag: "Customer-facing" },
  { icon: <IconZap />,      title: "Smart Dispatch",             desc: "AI assigns the right pro instantly. Conflict detection keeps your schedule clean without manual work.",         tag: "AI" },
  { icon: <IconPhone />,    title: "Pro Field Portal",           desc: "Clean mobile view for your crew. Status updates, before/after photos, and signatures from any device.",         tag: "Staff" },
  { icon: <IconUsers />,    title: "Customer Portal",            desc: "Clients self-serve: book, reschedule, track job status, leave reviews — no phone calls needed.",               tag: "Customers" },
  { icon: <IconCard />,     title: "Payments & Payroll",         desc: "Stripe built in. Automatic invoicing, payment tracking, and payroll reports so your finances stay tidy.",       tag: "Finance" },
  { icon: <IconCalendar />, title: "Notifications & APIs",       desc: "Automated email + SMS reminders. Webhooks keep ServiceOS in sync with every other tool you run.",              tag: "Automation" },
];

function PlatformFeatures() {
  return (
    <section id="features" className="border-y border-edge bg-card-2 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16">
          <div className="max-w-2xl">
            <p className="mb-4 text-[9px] tracking-[0.3em] uppercase text-gold">Booking System Features</p>
            <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
              Everything your booking system<br />
              <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "var(--color-ink-3)", fontSize: "clamp(1.7rem,3.4vw,2.9rem)" }}>needs to grow.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATS.map((f, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="shimmer-card group h-full rounded-2xl border border-edge bg-canvas p-7 transition-all duration-300 hover:border-edge-2 hover:bg-card hover:-translate-y-1 hover:shadow-md hover:shadow-ink/[0.05]">
                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-xl bg-gold/10 p-3 text-gold transition-colors group-hover:bg-gold/18">{f.icon}</div>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] ${f.tag === "AI" ? "border-gold/30 text-gold" : "border-edge-2 text-ink-3"}`}>{f.tag}</span>
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

/* ─── How It Works ──────────────────────────────────────────────────────────── */
const STEPS = [
  { n: "01", title: "Set up in minutes", desc: "Add your services, staff, and pricing. Connect Stripe. Your booking system is live in under an hour — no developer needed." },
  { n: "02", title: "Embed & go live",   desc: "Paste one line of code on your site. Customers book, pay, and get confirmed. Fully automated from day one." },
  { n: "03", title: "AI runs the rest",  desc: "Jobs dispatch themselves. Conflicts clear themselves. Customers get followed up automatically. You just watch revenue grow." },
];
function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-edge py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="mb-4 text-[9px] tracking-[0.3em] uppercase text-gold">How it works</p>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
            Running a service business just got<br /><span className="text-gold">a lot less complicated.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative">
                {i < STEPS.length - 1 && <div className="absolute left-[calc(100%+1.5rem)] top-9 hidden h-px w-[calc(100%-3rem)] border-t border-dashed border-edge-2 md:block" />}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-edge bg-canvas font-display text-2xl font-semibold text-ink-3">{s.n}</div>
                <h3 className="font-display text-2xl font-semibold italic text-ink">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Feature Comparison ────────────────────────────────────────────────────── */
type CellVal = boolean | string;
const FEATURE_ROWS: { label: string; standard: CellVal; us: CellVal; ai?: boolean }[] = [
  { label: "AI auto-dispatch",              standard: false,       us: true,     ai: true },
  { label: "AI conflict resolution",        standard: false,       us: true,     ai: true },
  { label: "AI pricing intelligence",       standard: false,       us: true,     ai: true },
  { label: "AI customer follow-ups",        standard: false,       us: true,     ai: true },
  { label: "Embeddable booking widget",     standard: true,        us: true },
  { label: "Staff field portal",            standard: true,        us: true },
  { label: "Online payments (Stripe)",      standard: true,        us: true },
  { label: "Customer self-service portal",  standard: false,       us: true },
  { label: "Webhooks & API access",         standard: false,       us: true },
  { label: "White-label branding",          standard: false,       us: true },
  { label: "Starting price",                standard: "$27–49/mo", us: "$0/mo" },
];
function Cell({ val, highlight }: { val: CellVal; highlight?: boolean }) {
  if (typeof val === "string") return <span className={`text-sm font-semibold ${highlight ? "text-gold" : "text-ink-2"}`}>{val}</span>;
  return val ? (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${highlight ? "bg-gold/15 text-gold" : "bg-ink-3/15 text-ink-3"}`}><IconCheck /></span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-4/20 text-ink-4"><IconX /></span>
  );
}
function FeatureChecklist() {
  return (
    <section id="compare" className="py-28 bg-card">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mb-14">
          <div className="max-w-xl">
            <p className="mb-4 text-[9px] tracking-[0.3em] uppercase text-gold">Full feature set</p>
            <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
              The old way vs.<br /><span className="text-gold">the ServiceOS way.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">Every capability a modern service business needs — no add-ons, no surprises.</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="overflow-hidden rounded-2xl border border-edge">
            <div className="grid grid-cols-3 bg-card">
              <div className="border-b border-r border-edge px-6 py-4 text-xs text-ink-4">Capability</div>
              <div className="border-b border-r border-edge px-4 py-4 text-center text-sm font-medium text-ink-3">Typical booking software</div>
              <div className="border-b border-edge px-4 py-4 text-center text-sm font-medium text-gold">ServiceOS <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-gold/12 px-1.5 py-0.5 text-[9px] text-gold"><Sparkle size={8} /> AI</span></div>
            </div>
            {FEATURE_ROWS.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-edge last:border-0 transition-colors hover:bg-card-2 ${row.ai ? "bg-gold/[0.02]" : "bg-canvas"}`}>
                <div className="flex items-center gap-2 border-r border-edge px-6 py-3.5 text-sm text-ink-2">{row.ai && <span className="flex-shrink-0 text-gold"><Sparkle size={9} /></span>}{row.label}</div>
                <div className="flex items-center justify-center border-r border-edge py-3.5"><Cell val={row.standard} /></div>
                <div className="flex items-center justify-center py-3.5"><Cell val={row.us} highlight /></div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <a href="#" className="shimmer-card rounded-full bg-gold px-9 py-4 text-sm font-medium text-white transition-all hover:bg-gold-hi hover:shadow-xl hover:shadow-gold/25">Start your booking system — free →</a>
            <p className="text-sm text-ink-3">No credit card · Live in under an hour</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────────────────────────── */
const TESTI = [
  { quote: "We went from managing everything in spreadsheets to a fully automated booking system in a week. The AI dispatch alone saves my team 10+ hours every single week. I genuinely cannot imagine going back.", name: "Marcus Webb", role: "Owner, Webb Cleaning Co.", initials: "MW", tag: "Cleaning business" },
  { quote: "The AI conflict resolution is a game-changer. Our booking system handles double-bookings automatically — we haven't had a manual reschedule in months.", name: "Priya Anand", role: "Operations Manager, NeatPros", initials: "PA", tag: "Home services" },
  { quote: "The AI follow-up system took our review count from 40 to 312 in 3 months. That alone paid for the platform 10× over.", name: "Derek Hollis", role: "Founder, SwiftMaid", initials: "DH", tag: "Field services" },
];
function Testimonials() {
  return (
    <section className="border-y border-edge py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14">
          <div className="max-w-xl">
            <p className="mb-4 text-[9px] tracking-[0.3em] uppercase text-gold">Real owners. Real numbers.</p>
            <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
              They were running their business<br />
              <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "var(--color-ink-3)", fontSize: "clamp(1.7rem,3.4vw,2.8rem)" }}>on spreadsheets and phone calls.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Reveal className="md:row-span-2" delay={0}>
            <div className="shimmer-card group flex h-full flex-col rounded-2xl border border-edge bg-canvas p-9 transition-all duration-300 hover:border-edge-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/[0.04]">
              <span className="mb-5 inline-block self-start rounded-full border border-gold/20 bg-gold/[0.06] px-2.5 py-1 text-[9px] text-gold">{TESTI[0].tag}</span>
              <svg className="mb-6 text-gold/25" width="36" height="28" viewBox="0 0 36 28" fill="currentColor"><path d="M0 28V16.8C0 11.2 1.75 6.65 5.25 3.15 8.75 1.05 12.95 0 17.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H14V28H0zm21 0V16.8c0-5.6 1.75-10.15 5.25-13.65C29.75 1.05 33.95 0 38.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H35V28H21z" /></svg>
              <p className="flex-1 text-[15px] leading-[1.9] text-ink-2">&ldquo;{TESTI[0].quote}&rdquo;</p>
              <div className="mt-8 flex items-center gap-3 border-t border-edge pt-6">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-sm font-semibold text-gold">{TESTI[0].initials}</div>
                <div><p className="text-sm font-medium text-ink">{TESTI[0].name}</p><p className="text-xs text-ink-3">{TESTI[0].role}</p></div>
              </div>
            </div>
          </Reveal>
          {TESTI.slice(1).map((t, i) => (
            <Reveal key={i} delay={(i + 1) * 80}>
              <div className="shimmer-card group flex h-full flex-col rounded-2xl border border-edge bg-canvas p-8 transition-all duration-300 hover:border-edge-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-ink/[0.04]">
                <span className="mb-5 inline-block self-start rounded-full border border-edge-2 px-2.5 py-1 text-[9px] text-ink-4 transition-colors group-hover:border-gold/20 group-hover:text-gold/70">{t.tag}</span>
                <svg className="mb-5 text-gold/20" width="28" height="22" viewBox="0 0 36 28" fill="currentColor"><path d="M0 28V16.8C0 11.2 1.75 6.65 5.25 3.15 8.75 1.05 12.95 0 17.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H14V28H0zm21 0V16.8c0-5.6 1.75-10.15 5.25-13.65C29.75 1.05 33.95 0 38.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H35V28H21z" /></svg>
                <p className="flex-1 text-[14px] leading-[1.85] text-ink-2">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-7 flex items-center gap-3 border-t border-edge pt-5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold/12 text-xs font-semibold text-gold">{t.initials}</div>
                  <div><p className="text-sm font-medium text-ink">{t.name}</p><p className="text-xs text-ink-3">{t.role}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ───────────────────────────────────────────────────────────────── */
const PLANS = [
  { name: "Starter", monthly: 0, annual: 0, desc: "For solo operators getting started.", features: ["1 staff member", "30 bookings/month", "Embeddable booking widget", "Stripe payments", "Email notifications", "Customer portal"], cta: "Get started free", highlight: false },
  { name: "Growth", monthly: 49, annual: 39, desc: "For growing teams managing real volume.", features: ["Up to 10 staff", "Unlimited bookings", "AI dispatch & assignment", "AI conflict resolution", "SMS + email notifications", "Pro field portal", "Analytics dashboard", "Webhooks & API access", "Priority support"], cta: "Start free trial", highlight: true, badge: "Most popular" },
  { name: "Enterprise", monthly: 149, annual: 119, desc: "For multi-location operations at scale.", features: ["Unlimited staff", "Unlimited locations", "Everything in Growth", "AI pricing intelligence", "AI customer comms", "White-label branding", "SSO & SAML", "Dedicated account manager", "Custom integrations", "SLA guarantee"], cta: "Contact sales", highlight: false },
];
function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 text-[9px] tracking-[0.3em] uppercase text-gold">Pricing</p>
          <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(1.9rem,3.8vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-ink-warm)" }}>
            No surprises. No gotchas.<br />
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", color: "var(--color-gold)", fontSize: "clamp(1.7rem,3.4vw,2.8rem)" }}>Just what it costs.</span>
          </h2>
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-edge-2 bg-canvas p-1.5">
            {[{ l: "Monthly", v: false }, { l: "Annual", v: true, badge: "Save 20%" }].map((o) => (
              <button key={o.l} onClick={() => setAnnual(o.v)} className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all ${annual === o.v ? "bg-gold font-medium text-white" : "text-ink-3 hover:text-ink"}`}>
                {o.l}{o.badge && <span className={`text-xs ${annual === o.v ? "text-white/70" : "text-emerald-600"}`}>{o.badge}</span>}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`shimmer-card flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 ${plan.highlight ? "border-gold/35 bg-canvas shadow-2xl shadow-gold/8" : "border-edge bg-canvas hover:border-edge-2 hover:-translate-y-1"}`}>
                {(plan as typeof plan & { badge?: string }).badge && <span className="mb-4 inline-block self-start rounded-full bg-gold/15 px-3 py-1 text-xs text-gold">{(plan as typeof plan & { badge?: string }).badge}</span>}
                <h3 className="font-display text-2xl font-semibold italic text-ink">{plan.name}</h3>
                <p className="mt-1 text-sm text-ink-3">{plan.desc}</p>
                <div className="my-7">
                  <span className="font-display text-5xl font-semibold text-ink">${annual ? plan.annual : plan.monthly}</span>
                  <span className="ml-2 text-sm text-ink-3">/ month</span>
                  {annual && plan.annual > 0 && <p className="mt-1 text-xs text-ink-3">Billed annually</p>}
                </div>
                <ul className="flex-1 space-y-3 border-t border-edge pt-6">
                  {plan.features.map((f) => (<li key={f} className="flex items-start gap-2.5"><span className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-gold" : "text-ink-3"}`}><IconCheck /></span><span className="text-sm text-ink-2">{f}</span></li>))}
                </ul>
                <a href="#" className={`mt-8 block w-full rounded-full py-3.5 text-center text-sm font-medium transition-all ${plan.highlight ? "bg-gold text-white hover:bg-gold-hi hover:shadow-lg hover:shadow-gold/20" : "border border-edge-2 text-ink hover:border-gold/30 hover:text-gold"}`}>{plan.cta}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section className="relative overflow-hidden border-t border-edge py-36">
      <MeshBackground />
      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, var(--color-edge) 1px, transparent 1px)`, backgroundSize: "36px 36px", opacity: 0.5 }} />
      {/* Expanding rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute rounded-full border border-gold/15" style={{ width: `${(i + 1) * 220}px`, height: `${(i + 1) * 220}px`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", animation: `ring-expand ${3 + i * 1.2}s ${i * 0.8}s ease-out infinite` }} />
        ))}
      </div>

      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="mb-5 inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-gold"><Sparkle size={9} /> Get started</p>
        <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui", fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3.75rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--color-ink-warm)" }}>
          You didn&rsquo;t start this business<br />to manage scheduling software.
        </h2>
        <p className="mx-auto mt-5 block" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.4rem,2.8vw,2.2rem)", color: "var(--color-ink-3)", lineHeight: 1.4 }}>
          Let ServiceOS handle the ops. You handle the growth.
        </p>
        <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-ink-3">
          Join 5,000+ service businesses already using ServiceOS to accept online bookings, dispatch jobs, and get paid — automatically. No credit card required.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="shimmer-card rounded-full bg-gold px-9 py-4 text-sm font-medium text-white transition-all hover:bg-gold-hi hover:shadow-xl hover:shadow-gold/30">Start your free trial →</a>
          <a href="#" className="rounded-full border border-edge-2 px-9 py-4 text-sm text-ink-2 transition-colors hover:border-gold/30 hover:text-gold">Book a demo</a>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────────── */
function Footer() {
  const cols: Record<string, string[]> = {
    Product: ["Features", "AI Engine", "Pricing", "Changelog"],
    Solutions: ["Cleaning Services", "Maintenance", "Field Service", "Multi-location"],
    Resources: ["API Docs", "Embed Guide", "Webhooks", "Status"],
    Company: ["About", "Blog", "Careers", "Contact"],
  };
  return (
    <footer className="border-t border-edge bg-card-2 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-semibold italic text-ink">ServiceOS</p>
            <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-gold"><Sparkle size={9} /> AI-native</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">The online booking system for cleaning, maintenance & field service businesses.</p>
          </div>
          {Object.entries(cols).map(([cat, items]) => (
            <div key={cat}>
              <p className="mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-ink-3">{cat}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (<li key={item}><a href="#" className="text-sm text-ink-3 transition-colors hover:text-ink">{item}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 text-xs text-ink-4 md:flex-row">
          <p>© 2026 ServiceOS. All rights reserved.</p>
          <div className="flex gap-6">{["Privacy", "Terms", "Security"].map((l) => (<a key={l} href="#" className="transition-colors hover:text-ink-3">{l}</a>))}</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <QuoteTicker />
        <HonestStatement />
        <BookingWidgetDemo />
        <AIFeatures />
        <DashboardMock />
        <DayInLife />
        <PlatformFeatures />
        <HowItWorks />
        <FeatureChecklist />
        <Testimonials />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
