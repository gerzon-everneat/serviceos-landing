"use client";
import { useEffect, useRef, useState } from "react";

const D = {
  bg: "#FFFFFF",
  dark: "#0F0F0F",
  card: "#111111",
  muted: "#6B7280",
  border: "#E5E7EB",
  lime: "#C8FF00",
  limeText: "#3A5000",
  limeBg: "#F5FFD6",
  surface: "#F9FAFB",
};

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${D.border}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: D.dark }}>neatr.ai</span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Features", "How it works"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, textDecoration: "none" }}>{l}</a>
          ))}
          <a href="#cta" style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, background: D.lime, color: D.limeText, padding: "8px 20px", borderRadius: 8, textDecoration: "none" }}>Get Early Access</a>
        </div>
      </div>
    </nav>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms` }}>
      {children}
    </div>
  );
}

const BOOKINGS = [
  { icon: "🧹", title: "Johnson Residence", sub: "Deep clean · Thu Jun 12 · 10:00 AM", crew: "Maria L.", status: "IN PROGRESS", statusColor: "#3B82F6" },
  { icon: "🔧", title: "Oak Street Office", sub: "Maintenance · Thu Jun 12 · 2:00 PM", crew: "Tom K.", status: "CONFIRMED", statusColor: "#22C55E" },
  { icon: "🌿", title: "Pine Valley HOA", sub: "Landscaping · Fri Jun 13 · 9:00 AM", crew: "Sarah M.", status: "SCHEDULED", statusColor: "#F59E0B" },
  { icon: "❄️", title: "Westview Clinic", sub: "HVAC service · Fri Jun 13 · 11:00 AM", crew: "Auto-assigning…", status: "DISPATCH", statusColor: "#8B5CF6" },
];

const STATS_TARGET = [4, 840, 3];
const STAT_LABELS = ["Bookings today", "Revenue today", "Crew active"];
const STAT_PREFIXES = ["", "$", ""];
const STAT_SUBS = ["+1 new", "2 invoiced", "1 free"];

function CountUp({ target, prefix, duration = 900 }: { target: number; prefix: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return <div ref={ref}>{prefix}{value}</div>;
}

function DashboardCard({ loaded }: { loaded: boolean }) {
  const [activeRow, setActiveRow] = useState(0);
  const [rowVis, setRowVis] = useState(0);

  useEffect(() => {
    if (!loaded) return;
    const t = setInterval(() => setRowVis(r => Math.min(r + 1, BOOKINGS.length)), 500);
    return () => clearInterval(t);
  }, [loaded]);

  useEffect(() => {
    const t = setInterval(() => setActiveRow(r => (r + 1) % BOOKINGS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: D.card, borderRadius: 20, padding: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06)", maxWidth: 520, width: "100%", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px) scale(0.97)", transition: "opacity 0.8s 300ms, transform 0.8s 300ms" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#555", marginBottom: 4 }}>TODAY — JUN 12</div>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, fontWeight: 600, fontStyle: "italic", color: "#FFFFFF" }}>neatr.ai dashboard</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 10px #22C55E", animation: "v21-pulse 2s ease-in-out infinite" }} />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {STATS_TARGET.map((target, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#555", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4 }}>{STAT_LABELS[i].toUpperCase()}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, color: "#FFFFFF", marginBottom: 2 }}>
              <CountUp target={target} prefix={STAT_PREFIXES[i]} />
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: D.lime }}>{STAT_SUBS[i]}</div>
          </div>
        ))}
      </div>

      {/* Booking rows — appear sequentially */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {BOOKINGS.map((b, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: activeRow === i ? "rgba(200,255,0,0.06)" : "rgba(255,255,255,0.025)", border: `1px solid ${activeRow === i ? "rgba(200,255,0,0.22)" : "transparent"}`, opacity: i < rowVis ? 1 : 0, transform: i < rowVis ? "none" : "translateX(16px)", transition: "all 0.4s" }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>{b.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#FFFFFF", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#555" }}>{b.sub} · {b.crew}</div>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: b.statusColor, background: `${b.statusColor}18`, padding: "3px 8px", borderRadius: 6, flexShrink: 0, transition: "background 0.3s" }}>{b.status}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-sans)", fontSize: 11, color: "#444", textAlign: "center" }}>
        All updates are automatic · No manual entry required
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: "🌐", title: "Online booking page", desc: "Customers book directly on your page. Calendar, job type, location — all handled." },
  { icon: "🤖", title: "AI crew dispatch", desc: "The right crew member assigned instantly, based on availability and proximity." },
  { icon: "💳", title: "Auto invoicing", desc: "Job completes → invoice sent. You get paid without lifting a finger." },
  { icon: "📊", title: "Live dashboard", desc: "Every booking, crew member, and payment in one real-time view." },
];

export default function V21() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 0ms, transform 0.65s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 140ms, transform 0.65s 140ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 260ms, transform 0.65s 260ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 380ms, transform 0.65s 380ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.dark }}>
      <style>{`
        @keyframes v21-pulse { 0%,100%{opacity:1;box-shadow:0 0 8px #22C55E} 50%{opacity:0.5;box-shadow:0 0 16px #22C55E} }
      `}</style>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: D.lime, zIndex: 60 }} />
      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={in0}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: D.limeBg, border: "1px solid #BEF264", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.limeText }}>YOUR BUSINESS, AT A GLANCE</span>
              </div>
            </div>
            <div style={in1}>
              <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(38px, 4.5vw, 60px)", fontWeight: 600, lineHeight: 1.1, color: D.dark, marginBottom: 24 }}>
                Everything running.<br />
                <em>Nothing slipping through.</em>
              </h1>
            </div>
            <div style={in2}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: D.muted, lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
                neatr.ai gives your service business a real operating system. Bookings come in, crews get dispatched, invoices go out — all without you in the middle.
              </p>
            </div>
            <div style={in3}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <a href="#cta" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "14px 28px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>Get Early Access</a>
                <a href="#features" style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: D.muted, padding: "14px 20px", borderRadius: 10, textDecoration: "none", border: `1.5px solid ${D.border}`, display: "inline-block" }}>See how it works</a>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#9CA3AF" }}>No upfront payment · Invoice after job completion</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DashboardCard loaded={loaded} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: D.surface, borderTop: `1px solid ${D.border}`, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, textAlign: "center", marginBottom: 12 }}>WHAT'S INCLUDED</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, textAlign: "center", marginBottom: 48 }}>
              Everything your team needs.<br /><em>Nothing they don't.</em>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <FeatureCard f={f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px 96px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, marginBottom: 16 }}>
            Your dashboard is ready.<br /><em>Your team just needs the invite.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.muted, marginBottom: 36, lineHeight: 1.7 }}>
            Early access is open. Be one of the first service teams on neatr.ai.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input placeholder="Your work email" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "13px 18px", borderRadius: 10, border: `1.5px solid ${D.border}`, outline: "none", width: 240, color: D.dark, background: D.bg }} />
            <button style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "13px 26px", borderRadius: 10, border: "none", cursor: "pointer" }}>
              Get Early Access
            </button>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#9CA3AF", marginTop: 14 }}>
            No upfront payment · Invoice after job completion
          </p>
        </Reveal>
      </section>
    </main>
  );
}

function FeatureCard({ f }: { f: typeof FEATURES[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "24px 20px", border: `1.5px solid ${hov ? D.lime : D.border}`, borderRadius: 14, background: D.bg, transition: "all 0.25s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? "0 10px 28px rgba(200,255,0,0.1)" : "none" }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: D.dark, marginBottom: 8 }}>{f.title}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.muted, lineHeight: 1.6 }}>{f.desc}</div>
    </div>
  );
}
