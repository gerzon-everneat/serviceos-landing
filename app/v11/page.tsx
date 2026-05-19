"use client";

import { useState, useRef, useEffect } from "react";

type Theme = "light" | "dark";

/* ─── Scroll reveal ──────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", y = 22 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.01, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Counter ────────────────────────────────────────────────────────────────── */
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
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Theme toggle icons ─────────────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ─── Hero background ────────────────────────────────────────────────────────── */
function HeroBg({ theme }: { theme: Theme }) {
  const dk = theme === "dark";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(${dk ? "rgba(255,255,255,0.12)" : "#CBD5E1"} 1.5px, transparent 1.5px)`,
        backgroundSize: "28px 28px",
        opacity: dk ? 0.35 : 0.55,
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", top: "-18%", right: "-10%",
        width: 680, height: 680, borderRadius: "50%",
        background: `radial-gradient(circle, ${dk ? "rgba(59,130,246,0.20)" : "rgba(37,99,235,0.15)"} 0%, transparent 68%)`,
        animation: "blob1 9s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-28%", left: "-14%",
        width: 580, height: 580, borderRadius: "50%",
        background: `radial-gradient(circle, ${dk ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.10)"} 0%, transparent 68%)`,
        animation: "blob2 11s ease-in-out infinite",
      }} />
    </div>
  );
}

/* ─── Live booking notifications ─────────────────────────────────────────────── */
const NOTIFS = [
  { name: "Sarah M.", detail: "Deep clean · Thu 22 May · 9:00am" },
  { name: "James K.", detail: "Regular clean · Fri 23 May · 2:00pm" },
  { name: "Priya L.", detail: "Move-out clean · Mon 26 May · 9:00am" },
  { name: "Tom W.", detail: "Post-reno clean · Sat 24 May · 10:00am" },
];

function LiveNotif({ theme }: { theme: Theme }) {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const dk = theme === "dark";
  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % NOTIFS.length);
      setAnimKey(k => k + 1);
    }, 3200);
    return () => clearInterval(t);
  }, []);
  const n = NOTIFS[idx];
  return (
    <div key={animKey} style={{
      display: "flex", alignItems: "center", gap: 10,
      background: dk ? "#1E2433" : "#FFFFFF",
      border: `1px solid ${dk ? "#2E3650" : "#E5E7EB"}`,
      borderRadius: 14, padding: "10px 14px",
      boxShadow: dk ? "0 8px 32px rgba(0,0,0,0.40)" : "0 8px 32px rgba(0,0,0,0.10)",
      width: 290,
      animation: "notifIn 0.45s cubic-bezier(0.16,1,0.3,1) both",
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: "#10B981", flexShrink: 0,
        animation: "glow 2s ease-in-out infinite",
        boxShadow: "0 0 6px rgba(16,185,129,0.6)",
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: dk ? "#F1F5F9" : "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          New booking — {n.name}
        </p>
        <p style={{ fontSize: 11, color: dk ? "#94A3B8" : "#6B7280", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.detail}</p>
      </div>
      <p style={{ fontSize: 10, color: dk ? "#64748B" : "#9CA3AF", flexShrink: 0 }}>just now</p>
    </div>
  );
}

/* ─── Booking widget demo ────────────────────────────────────────────────────── */
function BookingWidget({ theme = "light" }: { theme?: Theme }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  const dk = theme === "dark";
  const c = {
    bg:             dk ? "#1E2433" : "#FFFFFF",
    border:         dk ? "#2E3650" : "#E5E7EB",
    headerBorder:   dk ? "#2E3650" : "#F3F4F6",
    titleText:      dk ? "#F1F5F9" : "#111827",
    mutedText:      dk ? "#94A3B8" : "#9CA3AF",
    labelText:      dk ? "#64748B" : "#9CA3AF",
    bodyText:       dk ? "#CBD5E1" : "#374151",
    btnBg:          dk ? "#2A3347" : "#F9FAFB",
    btnBorder:      dk ? "#3B4A6B" : "#E5E7EB",
    selectedBg:     dk ? "rgba(59,130,246,0.18)" : "#EFF6FF",
    selectedBorder: "#3B82F6",
    trackBg:        dk ? "#2A3347" : "#E5E7EB",
    fieldBg:        dk ? "#151C2E" : "#F9FAFB",
    fieldBorder:    dk ? "#2E3650" : "#E5E7EB",
    fieldText:      dk ? "#64748B" : "#9CA3AF",
    successBg:      dk ? "rgba(16,185,129,0.15)" : "#D1FAE5",
    openTagBg:      dk ? "rgba(16,185,129,0.15)" : "#D1FAE5",
    openTagText:    "#10B981",
  };

  const services = ["Deep clean (3–4 hrs)", "Regular clean (2 hrs)", "Post-reno clean (5–6 hrs)", "Move-out clean (4 hrs)"];
  const slots = ["Wed 21 May — 9:00am", "Wed 21 May — 2:00pm", "Thu 22 May — 9:00am", "Fri 23 May — 10:00am"];

  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl" style={{ background: c.bg, border: `1px solid ${c.border}`, width: "360px", maxWidth: "100%", transition: "background 0.3s, border-color 0.3s" }}>
      {/* Widget header */}
      <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: c.headerBorder }}>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: "#2563EB" }}>S</div>
        <div>
          <p className="text-sm font-semibold" style={{ color: c.titleText }}>Book a service</p>
          <p className="text-[11px]" style={{ color: c.mutedText }}>Powered by neaterops</p>
        </div>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-1 px-5 pb-0 pt-3">
        {["Service", "Time", "Details", "Done"].map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1">
            <div className="h-1 flex-1 rounded-full transition-all duration-500" style={{ background: i <= step ? "#3B82F6" : c.trackBg }} />
            <span className="text-[9px] transition-colors" style={{ color: i <= step ? "#3B82F6" : c.labelText }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="px-5 pb-6 pt-4">
        {step === 0 && (
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: c.labelText }}>What do you need?</p>
            <div className="space-y-2">
              {services.map(s => (
                <button key={s} onClick={() => { setService(s); setStep(1); }}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm transition-all"
                  style={{ border: `1px solid ${service === s ? c.selectedBorder : c.btnBorder}`, background: service === s ? c.selectedBg : c.btnBg, color: c.bodyText }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: c.labelText }}>Pick a time</p>
            <div className="space-y-2">
              {slots.map(d => (
                <button key={d} onClick={() => { setDate(d); setStep(2); }}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all"
                  style={{ border: `1px solid ${date === d ? c.selectedBorder : c.btnBorder}`, background: date === d ? c.selectedBg : c.btnBg }}>
                  <span style={{ color: c.bodyText }}>{d}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: c.openTagBg, color: c.openTagText }}>Open</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: c.labelText }}>Your details</p>
            <div className="space-y-2">
              {[["Name", "Alex Johnson"], ["Email", "alex@example.com"], ["Address", "14 Maple St, Brunswick"]].map(([label, placeholder]) => (
                <div key={label}>
                  <p className="mb-0.5 text-[10px]" style={{ color: c.labelText }}>{label}</p>
                  <div className="w-full rounded-lg px-3 py-2.5 text-sm" style={{ border: `1px solid ${c.fieldBorder}`, background: c.fieldBg, color: c.fieldText }}>{placeholder}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(3)} className="mt-4 w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "#2563EB" }}>
              Confirm booking
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: c.successBg }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="font-semibold" style={{ color: c.titleText }}>Booking confirmed</p>
            <p className="mt-1 text-sm" style={{ color: c.mutedText }}>{service}</p>
            <p className="text-sm" style={{ color: c.mutedText }}>{date}</p>
            <p className="mt-4 text-[11px]" style={{ color: c.labelText }}>Confirmation sent to alex@example.com</p>
            <button onClick={() => { setStep(0); setService(""); setDate(""); }}
              className="mt-4 text-xs underline" style={{ color: c.labelText }}>Try again</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────────── */
function Nav({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const dk = theme === "dark";
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-300" style={{
      background: scrolled
        ? (dk ? "rgba(15,20,30,0.96)" : "rgba(255,255,255,0.96)")
        : "rgba(255,255,255,0)",
      borderBottom: scrolled
        ? `1px solid ${dk ? "rgba(255,255,255,0.08)" : "#E5E7EB"}`
        : "1px solid transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
    }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", color: dk ? "#F9FAFB" : "#111827" }}>[neaterops]</a>
        <div className="hidden items-center gap-7 text-sm md:flex" style={{ color: dk ? "rgba(255,255,255,0.60)" : "#6B7280" }}>
          {[["How it works", "#how"], ["Features", "#features"], ["Pricing", "#pricing"]].map(([l, h]) => (
            <a key={l} href={h} className="transition-colors" style={{ color: "inherit" }}>{l}</a>
          ))}
          <a href="#" style={{ color: "inherit" }} className="transition-colors">Log in</a>
        </div>
        <div className="flex items-center gap-3">
          {/* Light / dark toggle */}
          <button
            onClick={onToggle}
            aria-label={dk ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center rounded-lg p-2 transition-all hover:opacity-80"
            style={{
              background: dk ? "rgba(255,255,255,0.10)" : "#F3F4F6",
              color: dk ? "#CBD5E1" : "#374151",
              border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "#E5E7EB"}`,
            }}
          >
            {dk ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#early" className="rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:opacity-90" style={{ background: "#2563EB", color: "#FFFFFF" }}>Get early access</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────────── */
function Hero({ theme }: { theme: Theme }) {
  const [on, setOn] = useState(false);
  const dk = theme === "dark";
  useEffect(() => { const t = setTimeout(() => setOn(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-24" style={{ background: dk ? "#0F131A" : "#FFFFFF", transition: "background 0.3s" }}>
      <HeroBg theme={theme} />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium" style={{ borderColor: dk ? "rgba(59,130,246,0.35)" : "#BFDBFE", background: dk ? "rgba(59,130,246,0.10)" : "#EFF6FF", color: "#3B82F6" }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> Now open for early access
              </div>
            </div>

            <h1 style={{
              fontFamily: "system-ui",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: dk ? "#F9FAFB" : "#111827",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              opacity: on ? 1 : 0,
              transform: on ? "none" : "translateY(20px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 80ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) 80ms, color 0.3s",
            }}>
              Stop answering<br />your own phone.
            </h1>

            <Reveal delay={180}>
              <p className="mt-7 max-w-md text-lg leading-[1.8]" style={{ color: dk ? "rgba(255,255,255,0.55)" : "#6B7280" }}>
                neaterops puts a self-booking assistant on your website. Customers pick their own slot, AI answers their questions, and the booking lands in your dashboard — without a single call.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#early" className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "#2563EB" }}>Get early access →</a>
                <a href="#how" className="flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-medium transition-colors" style={{ borderColor: dk ? "rgba(255,255,255,0.15)" : "#E5E7EB", color: dk ? "rgba(255,255,255,0.70)" : "#374151", background: "transparent" }}>See how it works</a>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t pt-9" style={{ borderColor: dk ? "rgba(255,255,255,0.08)" : "#F3F4F6" }}>
                {[
                  { n: 3, s: " min", l: "avg booking time" },
                  { n: 0, s: " calls", l: "to confirm a slot" },
                  { n: 24, s: "/7", l: "always available" },
                ].map(({ n, s, l }) => (
                  <div key={l}>
                    <p style={{ fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: dk ? "#F9FAFB" : "#111827", fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}><Counter to={n} suffix={s} /></p>
                    <p className="mt-1.5 text-xs" style={{ color: dk ? "rgba(255,255,255,0.38)" : "#9CA3AF" }}>{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — interactive booking widget demo */}
          <Reveal delay={200} className="flex flex-col items-center gap-4 lg:items-end" y={28}>
            <div className="relative">
              <div style={{
                position: "absolute", inset: -24,
                borderRadius: 32,
                background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
                animation: "glow 3s ease-in-out infinite",
                pointerEvents: "none",
              }} />
              <div style={{ animation: "widgetFloat 5s ease-in-out infinite" }}>
                <BookingWidget theme={theme} />
              </div>
            </div>
            <LiveNotif theme={theme} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Before / After ─────────────────────────────────────────────────────────── */
function Pain() {
  return (
    <section id="how" className="py-28" style={{ background: "#F9FAFB" }}>
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold" style={{ color: "#2563EB" }}>Before neaterops</p>
          <h2 style={{ fontFamily: "system-ui", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#111827", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Every new booking costs you time.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-base" style={{ color: "#6B7280" }}>Here&apos;s the sequence every service business knows by heart — and how neaterops replaces it.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { step: "01", before: "Customer calls to ask about availability", after: "Customer opens your site and books themselves" },
            { step: "02", before: "You stop what you're doing to check the calendar", after: "AI shows live availability — no interruption to you" },
            { step: "03", before: "You call back. Maybe they pick up. Maybe not.", after: "Slot confirmed in under 3 minutes" },
            { step: "04", before: "You manually add it to the schedule", after: "Booking appears in your dashboard automatically" },
          ].map(({ step, before, after }, i) => (
            <Reveal key={step} delay={i * 60}>
              <div className="h-full rounded-2xl p-6" style={{ border: "1px solid #E5E7EB", background: "#FFFFFF" }}>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#D1D5DB" }}>Step {step}</p>
                <div className="flex items-start gap-3 mb-4">
                  <span className="mt-0.5 flex-shrink-0 text-base">✗</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#EF4444" }}>{before}</p>
                </div>
                <div className="border-t my-3" style={{ borderColor: "#F3F4F6" }} />
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-base">✓</span>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "#059669" }}>{after}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ───────────────────────────────────────────────────────────────── */
const FEATS = [
  { icon: "🗓", title: "Live availability", desc: "Customers see your actual open slots — not a 'call to check' prompt. Real calendar, real data, no back-and-forth." },
  { icon: "🤖", title: "AI booking assistant", desc: "Customer asks about service type, size, access, prep. AI answers their questions and guides them straight to booking." },
  { icon: "⚡", title: "Instant confirmation", desc: "Booking submitted → confirmation sent → job in your dashboard. No approval step, no delay, no missed messages." },
  { icon: "📋", title: "Jobs dashboard", desc: "Every booking in one place — service details, customer info, date, time, notes. Your team always knows what's next." },
  { icon: "🔄", title: "Self-reschedule", desc: "Customers find a new time on their own. No calls to shift a slot. Your calendar updates automatically." },
  { icon: "🔗", title: "One line of code", desc: "Paste one snippet onto your existing site. Your booking widget is live — on any website builder, in minutes." },
];

function Features() {
  return (
    <section id="features" className="py-28" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14">
          <p className="mb-3 text-sm font-semibold" style={{ color: "#2563EB" }}>What&apos;s built</p>
          <h2 style={{ fontFamily: "system-ui", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#111827", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Everything to stop<br />the booking calls.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATS.map((f, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="h-full rounded-2xl p-7" style={{ border: "1px solid #E5E7EB", background: "#FFFFFF" }}>
                <p className="mb-4 text-2xl">{f.icon}</p>
                <h3 className="mb-2 text-base font-semibold" style={{ color: "#111827" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ────────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Free",
    price: 0,
    desc: "Get your first bookings online.",
    features: ["Booking widget on your site", "Live availability calendar", "Instant confirmation emails", "Basic jobs dashboard", "Up to 20 bookings / month"],
    cta: "Start free",
    hi: false,
  },
  {
    name: "Growth",
    price: 49,
    desc: "Replace your booking calls completely.",
    features: ["Everything in Free", "Unlimited bookings", "AI booking assistant", "Customer self-reschedule", "SMS notifications", "Priority support"],
    cta: "Start free trial",
    hi: true,
  },
  {
    name: "Pro",
    price: 99,
    desc: "Multi-service or multi-location teams.",
    features: ["Everything in Growth", "Multiple locations", "Team & staff management", "Custom branding", "API access", "Dedicated onboarding"],
    cta: "Start free trial",
    hi: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-28" style={{ background: "#F9FAFB" }}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold" style={{ color: "#2563EB" }}>Pricing</p>
          <h2 style={{ fontFamily: "system-ui", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#111827", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Simple. No surprises.
          </h2>
          <p className="mt-3 text-base" style={{ color: "#6B7280" }}>Start free. Upgrade when you&apos;re ready.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={i} delay={i * 65}>
              <div className="flex h-full flex-col rounded-2xl p-8" style={{
                border: p.hi ? "2px solid #2563EB" : "1px solid #E5E7EB",
                background: p.hi ? "#EFF6FF" : "#FFFFFF",
              }}>
                {p.hi && (
                  <p className="mb-4 w-fit rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: "#2563EB" }}>Most popular</p>
                )}
                <h3 className="text-lg font-bold" style={{ color: "#111827" }}>{p.name}</h3>
                <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>{p.desc}</p>
                <p className="mt-6" style={{ color: "#111827" }}>
                  <span style={{ fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.04em", lineHeight: 1 }}>${p.price}</span>
                  <span className="ml-1 text-sm" style={{ color: "#9CA3AF" }}>/mo</span>
                </p>
                <ul className="mt-7 flex-1 space-y-2.5">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                      <svg className="mt-0.5 flex-shrink-0" width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" stroke={p.hi ? "#2563EB" : "#059669"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#early" className="mt-8 block rounded-xl py-3 text-center text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: p.hi ? "#2563EB" : "#111827" }}>
                  {p.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Early access ───────────────────────────────────────────────────────────── */
function EarlyAccess() {
  return (
    <section id="early" className="py-28" style={{ background: "#111827" }}>
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-sm font-semibold" style={{ color: "#60A5FA" }}>We&apos;re at the start</p>
          <h2 style={{ fontFamily: "system-ui", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#FFFFFF", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Be one of our first customers.
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base leading-[1.8]" style={{ color: "rgba(255,255,255,0.50)" }}>
            neaterops is new. We&apos;re looking for cleaning and home services businesses who are tired of booking calls — and willing to work closely with us.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-base leading-[1.8]" style={{ color: "rgba(255,255,255,0.50)" }}>
            Early customers get hands-on setup support and direct access to our team. You&apos;re not a ticket — you&apos;re a partner.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="#" className="rounded-xl px-8 py-4 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "#2563EB" }}>
              Apply for early access →
            </a>
            <a href="mailto:hello@neaterops.com" className="rounded-xl border px-8 py-4 text-sm font-medium transition-colors" style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.55)" }}>
              Email us directly
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t py-10" style={{ background: "#FFFFFF", borderColor: "#F3F4F6" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "14px", letterSpacing: "-0.01em", color: "#111827" }}>[neaterops]</p>
        <p className="text-xs" style={{ color: "#9CA3AF" }}>Self-booking for service businesses. Early access.</p>
        <div className="flex gap-5 text-xs" style={{ color: "#9CA3AF" }}>
          {[["Privacy", "#"], ["Terms", "#"], ["hello@neaterops.com", "mailto:hello@neaterops.com"]].map(([l, h]) => (
            <a key={l} href={h} className="transition-colors hover:text-gray-600">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function V11Page() {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  return (
    <main>
      <Nav theme={theme} onToggle={toggleTheme} />
      <Hero theme={theme} />
      <Pain />
      <Features />
      <Pricing />
      <EarlyAccess />
      <Footer />
    </main>
  );
}
