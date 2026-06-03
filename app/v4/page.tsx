"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Tokens ─────────────────────────────────────────────────────────────── */
const T = {
  bg:      "#FDFAF6",
  bgWarm:  "#FAF6F0",
  card:    "#FFFFFF",
  border:  "#EDE8E0",
  border2: "#DDD6CB",
  gold:    "#B07D2E",
  goldHi:  "#C9901A",
  goldLo:  "#8A6020",
  goldBg:  "#FBF4E8",
  ink:     "#1A1410",
  ink2:    "#4A443C",
  ink3:    "#8A847A",
  ink4:    "#C2BAB0",
  orange:  "#D4600A",
  green:   "#1A7A4A",
  blue:    "#1A5FAA",
  purple:  "#6A3AAA",
} as const;

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom", style }: {
  children: React.ReactNode; delay?: number; className?: string;
  from?: "bottom" | "left" | "right" | "top"; style?: React.CSSProperties;
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
  const t = from === "left" ? "translateX(-28px)" : from === "right" ? "translateX(28px)" :
    from === "top" ? "translateY(-16px)" : "translateY(22px)";
  return (
    <div ref={ref} className={className}
      style={{ opacity: on ? 1 : 0, transform: on ? "none" : t, transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Particle Canvas (warm light particles) ─────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 55;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 2 + 1,
    }));
    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(176,125,46,${(1 - d / LINK) * 0.35})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
      for (const p of pts) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, "rgba(201,144,26,0.7)");
        g.addColorStop(1, "rgba(176,125,46,0)");
        ctx.beginPath(); ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none", zIndex: 1 }} />;
}

/* ─── Waitlist ───────────────────────────────────────────────────────────── */
function WaitlistForm({ size = "md" }: { size?: "md" | "lg" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!email || status !== "idle") return;
    setStatus("loading"); setTimeout(() => setStatus("done"), 1100);
  };
  if (status === "done") return (
    <p className="font-semibold text-sm" style={{ color: T.goldHi }}>You&#39;re on the list — we&#39;ll reach out before we launch.</p>
  );
  const pad = size === "lg" ? "px-5 py-3.5" : "px-4 py-3";
  const textSz = size === "lg" ? "text-base" : "text-sm";
  return (
    <form onSubmit={submit} className="flex gap-2 flex-wrap sm:flex-nowrap w-full">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`flex-1 min-w-0 rounded-xl ${pad} ${textSz} outline-none`}
        style={{ background: T.card, border: `1.5px solid ${T.border2}`, color: T.ink, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }} />
      <button type="submit" disabled={status === "loading"}
        className={`shrink-0 rounded-xl ${pad} ${textSz} font-semibold transition-all`}
        style={{ background: `linear-gradient(135deg, ${T.goldHi}, ${T.gold})`, color: "#FFF8EE", boxShadow: "0 2px 12px rgba(176,125,46,0.35)", opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Joining…" : "Get Early Access"}
      </button>
    </form>
  );
}

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, body, accent, delay = 0 }: {
  icon: string; title: string; body: string; accent: string; delay?: number;
}) {
  return (
    <Reveal delay={delay}
      className="flex flex-col gap-4 rounded-2xl p-6"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: "0 2px 16px rgba(26,20,16,0.05)" }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-base mb-1.5" style={{ color: T.ink }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: T.ink2 }}>{body}</p>
      </div>
    </Reveal>
  );
}

/* ─── Stat ───────────────────────────────────────────────────────────────── */
function Stat({ value, label, accent }: { value: string; label: string; accent?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center px-6 py-5 rounded-2xl"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: "0 2px 12px rgba(26,20,16,0.04)" }}>
      <span className="text-3xl font-bold tracking-tight" style={{ color: accent ?? T.goldHi, fontFamily: "var(--font-display)" }}>
        {value}
      </span>
      <span className="text-xs" style={{ color: T.ink3 }}>{label}</span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function V4Page() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: "var(--font-sans)" }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300"
        style={{
          background: scrolled ? "rgba(253,250,246,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(26,20,16,0.06)" : "none",
        }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: `linear-gradient(135deg, ${T.goldHi}, ${T.gold})`, color: "#FFF8EE", boxShadow: "0 2px 8px rgba(176,125,46,0.4)" }}>E</div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: T.ink }}>neatr.ai</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm items-center" style={{ color: T.ink2 }}>
          {["Features", "Pricing", "Roadmap"].map(l => (
            <a key={l} href="#" className="hover:opacity-80 transition-opacity">{l}</a>
          ))}
        </div>
        <a href="#waitlist"
          className="rounded-full px-4 py-2 text-xs font-semibold transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${T.goldHi}, ${T.gold})`, color: "#FFF8EE", boxShadow: "0 2px 8px rgba(176,125,46,0.3)" }}>
          Get Early Access
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden pt-24 pb-16">
        {/* BG image with Ken Burns */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{ position: "absolute", inset: "-6%", animation: "kenburns 26s ease-in-out infinite alternate" }}>
            <Image src="/assets/v4-hero-bg.jpg" alt="" fill style={{ objectFit: "cover" }} priority />
          </div>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, rgba(253,250,246,0.25) 0%, rgba(253,250,246,0.65) 50%, rgba(253,250,246,1) 100%)"
          }} />
        </div>

        {/* warm particle canvas */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <ParticleCanvas />
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" style={{ zIndex: 2 }}>

          {/* Left — text + CTA */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold w-fit"
              style={{ background: T.goldBg, border: `1px solid ${T.gold}50`, color: T.gold, animation: "rise 0.6s both" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.goldHi, animation: "pulse 2s infinite" }} />
              Now in private beta
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-[1.04] tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: T.ink, animation: "rise 0.7s 80ms both" }}>
              Booking that{" "}
              <span style={{ color: T.goldHi }}>runs itself</span>
            </h1>

            <p className="text-lg leading-relaxed max-w-lg"
              style={{ color: T.ink2, animation: "rise 0.7s 160ms both" }}>
              AI-powered dispatch, scheduling, and pricing intelligence for service businesses that want to grow without the chaos.
            </p>

            <div className="w-full max-w-md" style={{ animation: "rise 0.7s 240ms both" }}>
              <WaitlistForm size="lg" />
            </div>

            <p className="text-xs" style={{ color: T.ink3, animation: "rise 0.7s 320ms both" }}>
              No credit card. No commitment. 800+ operators on the waitlist.
            </p>
          </div>

          {/* Right — product screenshot */}
          <div style={{ animation: "rise 0.85s 200ms both" }}>
            {/* Browser chrome frame */}
            <div className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 24px 80px rgba(26,20,16,0.18), 0 4px 20px rgba(176,125,46,0.12)",
                border: `1px solid ${T.border2}`,
                transform: "perspective(1200px) rotateY(-4deg) rotateX(2deg)",
                transformOrigin: "left center",
              }}>
              {/* browser top bar */}
              <div className="flex items-center gap-2 px-4 py-2.5"
                style={{ background: "#F0EBE3", borderBottom: `1px solid ${T.border2}` }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F87171" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FBBF24" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#34D399" }} />
                <div className="flex-1 mx-3 rounded-md px-3 py-1 text-xs text-center"
                  style={{ background: T.card, color: T.ink3, border: `1px solid ${T.border}` }}>
                  app.neatr.ai/dashboard
                </div>
              </div>
              <Image
                src="/assets/v6-overview.png"
                alt="neatr.ai booking dashboard"
                width={1536}
                height={768}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Social proof strip ──────────────────────────────────────────── */}
      <section className="py-6 border-y overflow-hidden" style={{ borderColor: T.border, background: T.bgWarm }}>
        <div className="flex items-center justify-center gap-4 px-6 flex-wrap">
          <span className="text-xs font-medium" style={{ color: T.ink3 }}>Trusted by operators at</span>
          {["ServiceTitan users", "Jobber users", "Housecall Pro users", "Independent operators"].map(b => (
            <span key={b} className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: T.border, color: T.ink2 }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="3×" label="faster scheduling" accent={T.goldHi} />
          <Stat value="94%" label="fewer conflicts" accent={T.orange} />
          <Stat value="22%" label="revenue lift" accent={T.green} />
          <Stat value="&lt;2 min" label="to go live" accent={T.blue} />
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: T.bgWarm }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: T.gold }}>Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: T.ink }}>
              Everything in one place
            </h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: T.ink2 }}>
              From first booking to final invoice — one platform handles it all, automatically.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard delay={0}   icon="⚡" accent={T.goldHi} title="Smart Dispatch"
              body="AI assigns every job to the right technician at the right time. No manual scheduling, no guesswork." />
            <FeatureCard delay={80}  icon="🗓" accent={T.orange} title="Conflict Resolution"
              body="Double-bookings and travel conflicts caught before they happen. Auto-routed in seconds." />
            <FeatureCard delay={160} icon="📈" accent={T.green} title="Dynamic Pricing"
              body="Seasonal demand, technician tiers, and market signals combine to optimize every quote." />
            <FeatureCard delay={240} icon="💬" accent={T.blue} title="Automated Comms"
              body="Confirmations, reminders, follow-ups, and review asks — sent at exactly the right moment." />
          </div>

          {/* second row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <FeatureCard delay={0}   icon="🗺" accent={T.purple} title="Live Job Map"
              body="See every technician in real time. Know who's closest, who's available, who's running late." />
            <FeatureCard delay={80}  icon="🔁" accent={T.goldHi} title="Smart Re-routing"
              body="When plans change, AI instantly recalculates the optimal schedule for your entire team." />
            <FeatureCard delay={160} icon="⭐" accent={T.orange} title="Review Automation"
              body="Capture more 5-star reviews automatically, sent at the moment customers are happiest." />
          </div>
        </div>
      </section>

      {/* ── Dashboard ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: T.gold }}>Dashboard</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-display)", color: T.ink }}>
              Your entire operation, at a glance
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: T.ink2 }}>
              Every job, technician, and revenue metric in one clean view. Live updates as your field team moves — no refresh needed.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                ["⚡", "Live job map with real-time technician tracking"],
                ["📊", "Revenue forecasting and daily trend analysis"],
                ["🔔", "Smart alerts for conflicts or delays"],
                ["🔁", "One-click rescheduling with conflict detection"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-start gap-3 text-sm" style={{ color: T.ink2 }}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-sm"
                    style={{ background: T.goldBg, border: `1px solid ${T.gold}30` }}>{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" delay={100}>
            <div className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${T.border}`, boxShadow: "0 8px 40px rgba(26,20,16,0.1)" }}>
              <Image src="/assets/v4-dashboard.jpg" alt="neatr.ai dashboard" width={1280} height={800} className="w-full h-auto block" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: T.bgWarm }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: T.gold }}>Setup</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: T.ink }}>
              Live in under two minutes
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { n: "01", icon: "📅", title: "Connect your calendar", body: "Google Calendar, Outlook, or our native calendar. Existing bookings sync instantly." },
              { n: "02", icon: "👥", title: "Add your team", body: "Import technicians, set skills and service areas. AI learns their patterns automatically." },
              { n: "03", icon: "⚙️", title: "Set your rules", body: "Travel buffers, job durations, pricing tiers. Set once, enforced always." },
              { n: "04", icon: "🚀", title: "Go live", body: "Share your booking link. Customers book, AI dispatches, you watch it run." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}
                className="flex gap-4 p-6 rounded-2xl"
                style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: "0 2px 12px rgba(26,20,16,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                  style={{ background: T.goldBg, border: `1px solid ${T.gold}30` }}>{s.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: T.gold }}>{s.n}</span>
                    <h3 className="font-semibold text-sm" style={{ color: T.ink }}>{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: T.ink2 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="rounded-3xl p-10 text-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${T.goldBg} 0%, #FFF8EE 50%, ${T.bgWarm} 100%)`, border: `1px solid ${T.gold}30`, boxShadow: "0 4px 30px rgba(176,125,46,0.1)" }}>
              <div className="text-5xl mb-6" style={{ color: T.gold, opacity: 0.5 }}>&ldquo;</div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-display)", color: T.ink }}>
                We cut our scheduling time from 3 hours a day to under 20 minutes. The AI just handles it.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${T.goldHi}, ${T.gold})`, color: "#FFF8EE" }}>M</div>
                <div className="text-left">
                  <p className="text-sm font-semibold" style={{ color: T.ink }}>Marcus R.</p>
                  <p className="text-xs" style={{ color: T.ink3 }}>Owner, 12-tech HVAC company</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-32 px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${T.goldBg} 0%, #FFF7E8 40%, ${T.bgWarm} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,144,26,0.12) 0%, transparent 60%)"
        }} />
        <Reveal className="relative max-w-xl mx-auto flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: T.gold }}>Early Access</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: T.ink }}>
            Be first when we launch
          </h2>
          <p style={{ color: T.ink2 }}>
            Drop your email and we&#39;ll reach out before we go live. No spam, just a heads-up.
          </p>
          <div className="w-full">
            <WaitlistForm size="lg" />
          </div>
        </Reveal>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ borderTop: `1px solid ${T.border}`, background: T.bgWarm }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${T.goldHi}, ${T.gold})`, color: "#FFF8EE" }}>E</div>
            <span className="font-semibold text-sm" style={{ color: T.ink }}>neatr.ai</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: T.ink3 }}>
            {["Features", "Pricing", "Roadmap", "Privacy", "Terms"].map(l => (
              <a key={l} href="#" className="hover:opacity-70 transition-opacity">{l}</a>
            ))}
          </div>
          <p className="text-xs" style={{ color: T.ink4 }}>© {new Date().getFullYear()} neatr.ai. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
