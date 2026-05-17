"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Particle Canvas ─────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const N = 70;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
    }));

    const LINK = 140;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.55;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(191,146,69,${a})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, "rgba(212,168,98,0.9)");
        g.addColorStop(1, "rgba(191,146,69,0)");
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full z-[1]"
      style={{ pointerEvents: "none" }}
    />
  );
}

/* ─── Reveal ──────────────────────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, className = "", from = "bottom", style,
}: {
  children: React.ReactNode; delay?: number; className?: string;
  from?: "bottom" | "left" | "right" | "top";
  style?: React.CSSProperties;
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
  const t = from === "left" ? "translateX(-32px)" : from === "right" ? "translateX(32px)" :
    from === "top" ? "translateY(-20px)" : "translateY(28px)";
  return (
    <div ref={ref} className={className}
      style={{ opacity: on ? 1 : 0, transform: on ? "none" : t, transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Waitlist Form ───────────────────────────────────────────────────────── */
function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!email || status !== "idle") return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1200);
  };
  if (status === "done") return (
    <p className="text-sm font-medium" style={{ color: "var(--color-gold-hi)" }}>
      You&#39;re on the list — we&#39;ll be in touch.
    </p>
  );
  return (
    <form onSubmit={submit} className="flex gap-2 flex-wrap sm:flex-nowrap">
      <input
        type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 min-w-0 rounded-lg px-4 py-3 text-sm outline-none"
        style={{
          background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.1)",
          border: "1px solid rgba(191,146,69,0.25)",
          color: "var(--color-ink)", caretColor: "var(--color-gold-hi)",
        }}
      />
      <button
        type="submit" disabled={status === "loading"}
        className="shrink-0 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity"
        style={{ background: "var(--color-gold)", color: "#0A0806", opacity: status === "loading" ? 0.6 : 1 }}
      >
        {status === "loading" ? "Joining…" : "Get Early Access"}
      </button>
    </form>
  );
}

/* ─── Feature Card ────────────────────────────────────────────────────────── */
function FeatureCard({ img, title, body, delay = 0 }: {
  img: string; title: string; body: string; delay?: number;
}) {
  return (
    <Reveal delay={delay}
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: "var(--color-card)", border: "1px solid var(--color-edge)" }}>
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-card) 0%, transparent 60%)" }} />
      </div>
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-ink)" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>{body}</p>
      </div>
    </Reveal>
  );
}

/* ─── Stat ────────────────────────────────────────────────────────────────── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-4xl font-bold tracking-tight" style={{ color: "var(--color-gold-hi)", fontFamily: "var(--font-display)" }}>
        {value}
      </span>
      <span className="text-sm" style={{ color: "var(--color-ink-2)" }}>{label}</span>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function V3Page() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "var(--color-canvas)", color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}>

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300"
        style={{ background: scrolled ? "rgba(9,8,7,0.85)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid var(--color-edge)" : "1px solid transparent" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--color-gold)", color: "#08060A" }}>E</div>
          <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-ink)" }}>Everneat</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--color-ink-2)" }}>
          {["Features", "Pricing", "Roadmap"].map(item => (
            <a key={item} href="#" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.7 }}>{item}</a>
          ))}
        </div>
        <a href="#waitlist"
          className="rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
          style={{ background: "var(--color-gold)", color: "#08060A" }}>
          Get Early Access
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* bg image — Ken Burns slow zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div style={{ position: "absolute", inset: "-5%", animation: "kenburns 24s ease-in-out infinite alternate" }}>
            <Image src="/assets/hero-bg.jpg" alt="" fill style={{ objectFit: "cover" }} priority />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(9,8,7,0.5) 0%, rgba(9,8,7,0.8) 65%, rgba(9,8,7,1) 100%)" }} />
        </div>

        {/* animated particle network */}
        <ParticleCanvas />

        {/* content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6 pt-24">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{ background: "rgba(191,146,69,0.12)", border: "1px solid rgba(191,146,69,0.3)", color: "var(--color-gold-hi)", animation: "rise 0.6s both" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-gold-hi)" }} />
            Now in private beta
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", animation: "rise 0.7s 100ms both" }}>
            Booking that runs{" "}
            <span style={{ color: "var(--color-gold-hi)" }}>itself</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ color: "var(--color-ink-2)", animation: "rise 0.7s 200ms both" }}>
            AI-powered dispatch, scheduling, and pricing intelligence for service businesses that want to scale without the overhead.
          </p>

          <div className="w-full max-w-md" style={{ animation: "rise 0.7s 300ms both" }}>
            <WaitlistForm />
          </div>

          <p className="text-xs" style={{ color: "var(--color-ink-3)", animation: "rise 0.7s 400ms both" }}>
            No credit card. No commitment. Join 800+ operators on the waitlist.
          </p>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
          style={{ animation: "rise 1s 800ms both" }}>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, var(--color-gold))" }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-ink-3)" }}>Scroll</span>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-y" style={{ borderColor: "var(--color-edge)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="3×" label="faster scheduling" />
          <Stat value="94%" label="fewer booking conflicts" />
          <Stat value="22%" label="average revenue lift" />
          <Stat value="< 2 min" label="average setup time" />
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-gold)" }}>Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
              Everything your team needs
            </h2>
            <p className="text-base mt-4 max-w-lg mx-auto" style={{ color: "var(--color-ink-2)" }}>
              From the first booking to the final invoice — one platform handles it all.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              img="/assets/feat-dispatch.jpg"
              title="Smart Dispatch"
              body="AI assigns every job to the right tech at the right time. No manual scheduling, no guesswork."
              delay={0}
            />
            <FeatureCard
              img="/assets/feat-conflict.jpg"
              title="Conflict Resolution"
              body="Detect double-bookings and travel conflicts before they happen. Automatically re-route in seconds."
              delay={80}
            />
            <FeatureCard
              img="/assets/feat-pricing.jpg"
              title="Dynamic Pricing"
              body="Seasonal demand, technician tiers, and market data combine to optimize every quote automatically."
              delay={160}
            />
            <FeatureCard
              img="/assets/feat-comms.jpg"
              title="Automated Comms"
              body="Confirmation, reminders, follow-ups, and review requests — all sent at exactly the right moment."
              delay={240}
            />
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview ────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "var(--color-canvas-warm)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-gold)" }}>Dashboard</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
              Command center for your whole operation
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-ink-2)" }}>
              See every job, technician, and revenue number in one view. Drill into any day, any customer, any technician — with live updates as your field team moves.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Live job map with real-time technician location",
                "Revenue forecasting and trend analysis",
                "Customer retention and review score tracking",
                "One-click rescheduling with conflict detection",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-ink-2)" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                    style={{ background: "rgba(191,146,69,0.15)", color: "var(--color-gold-hi)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal from="right" delay={100}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid var(--color-edge)" }}>
              <Image
                src="/assets/dashboard-mock.jpg"
                alt="Everneat dashboard"
                width={1280} height={800}
                className="w-full h-auto"
                style={{ display: "block" }}
              />
              <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 0 0 1px rgba(191,146,69,0.1)" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-gold)" }}>Setup</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
              Live in under two minutes
            </h2>
          </Reveal>

          <div className="flex flex-col gap-0">
            {[
              { n: "01", title: "Connect your calendar", body: "Google Calendar, Outlook, or our native calendar. Your existing bookings sync instantly." },
              { n: "02", title: "Add your team", body: "Import your technicians, set their skills and service areas. AI learns their patterns automatically." },
              { n: "03", title: "Set your rules", body: "Travel time buffers, job duration defaults, pricing tiers. Set once, enforced always." },
              { n: "04", title: "Go live", body: "Share your booking link. Customers book, AI dispatches, you just watch it run." },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 80} className="flex gap-8 py-8 border-b" style={{ borderColor: "var(--color-edge)" }}>
                <span className="text-4xl font-bold shrink-0 mt-1 w-14" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink-4)" }}>{step.n}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--color-ink)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-2)" }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-32 px-6 relative overflow-hidden"
        style={{ background: "var(--color-card)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(191,146,69,0.08) 0%, transparent 70%)"
        }} />
        <Reveal className="relative max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-gold)" }}>Early Access</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}>
            Be first when we launch
          </h2>
          <p className="text-base" style={{ color: "var(--color-ink-2)" }}>
            Drop your email and we&#39;ll reach out before we go live. No spam, just a heads-up.
          </p>
          <div className="w-full">
            <WaitlistForm dark />
          </div>
        </Reveal>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "var(--color-edge)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--color-gold)", color: "#08060A" }}>E</div>
            <span className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>Everneat</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: "var(--color-ink-3)" }}>
            {["Features", "Pricing", "Roadmap", "Privacy", "Terms"].map(item => (
              <a key={item} href="#" className="hover:opacity-80 transition-opacity">{item}</a>
            ))}
          </div>
          <p className="text-xs" style={{ color: "var(--color-ink-4)" }}>
            © {new Date().getFullYear()} Everneat. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
