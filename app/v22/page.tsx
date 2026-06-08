"use client";
import { useEffect, useRef, useState } from "react";

const D = {
  bg: "#FFFFFF",
  dark: "#0F0F0F",
  muted: "#6B7280",
  border: "#E5E7EB",
  lime: "#C8FF00",
  limeText: "#3A5000",
  limeBg: "#F5FFD6",
  phone: "#111111",
  surface: "#F9FAFB",
};

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${D.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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

const SCREENS = [
  {
    tag: "📥 NEW BOOKING",
    tagColor: "#22C55E",
    content: [
      { label: "Customer", value: "Sarah M." },
      { label: "Service", value: "Deep clean · 3br/2ba" },
      { label: "Date", value: "Thu Jun 12 · 10:00 AM" },
      { label: "Status", value: "✓ Confirmed", valueColor: "#22C55E" },
    ],
  },
  {
    tag: "🤖 AI DISPATCH",
    tagColor: "#F59E0B",
    content: [
      { label: "Matching", value: "By location + rating" },
      { label: "Crew found", value: "Maria L. · 4.9★" },
      { label: "Distance", value: "0.8 mi away" },
      { label: "Status", value: "✓ Assigned", valueColor: "#8B5CF6" },
    ],
  },
  {
    tag: "💳 JOB COMPLETE",
    tagColor: D.lime,
    content: [
      { label: "Job", value: "Deep clean · Johnson" },
      { label: "Completed", value: "Thu Jun 12 · 12:40 PM" },
      { label: "Invoice", value: "$185.00 sent" },
      { label: "Status", value: "✓ Invoiced", valueColor: D.lime },
    ],
  },
];

function PhoneMockup({ loaded }: { loaded: boolean }) {
  const [screen, setScreen] = useState(0);
  const [screenVis, setScreenVis] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setScreenVis(false);
      setTimeout(() => { setScreen(s => (s + 1) % SCREENS.length); setScreenVis(true); }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const s = SCREENS[screen];

  return (
    <div style={{ position: "relative", display: "inline-block", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s 200ms, transform 0.8s 200ms" }}>
      <style>{`
        @keyframes v22-float { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(-1deg)} }
        @keyframes v22-glow { 0%,100%{opacity:0.12} 50%{opacity:0.2} }
        @keyframes v22-bar { 0%{width:15%} 60%{width:90%} 100%{width:15%} }
        @keyframes v22-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>

      {/* Glow blob */}
      <div style={{ position: "absolute", inset: -60, background: "radial-gradient(ellipse, rgba(200,255,0,0.18) 0%, transparent 70%)", borderRadius: "50%", animation: "v22-glow 3s ease-in-out infinite", pointerEvents: "none" }} />

      {/* Phone */}
      <div style={{ width: 270, height: 540, borderRadius: 42, background: D.phone, border: "2px solid rgba(255,255,255,0.14)", position: "relative", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)", animation: "v22-float 4.5s ease-in-out infinite" }}>

        {/* Notch */}
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 76, height: 22, background: "#060606", borderRadius: 20, zIndex: 2 }} />

        {/* Status bar */}
        <div style={{ position: "absolute", top: 14, left: 20, right: 20, display: "flex", justifyContent: "space-between", zIndex: 3 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>9:41</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>●●●</span>
        </div>

        {/* Screen content */}
        <div style={{ position: "absolute", inset: 0, padding: "50px 16px 24px", display: "flex", flexDirection: "column" }}>
          {/* App bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 17, fontWeight: 600, fontStyle: "italic", color: "#FFFFFF" }}>neatr.ai</span>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "v22-dot 2s ease-in-out infinite" }} />
          </div>

          {/* Screen card */}
          <div style={{ flex: 1, opacity: screenVis ? 1 : 0, transform: screenVis ? "none" : "translateY(12px)", transition: "opacity 0.35s, transform 0.35s" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "14px", marginBottom: 12 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: s.tagColor, marginBottom: 12 }}>{s.tag}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.content.map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#555" }}>{row.label}</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: (row as any).valueColor || "#FFFFFF" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar for dispatch */}
            {screen === 1 && (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#555", marginBottom: 6 }}>Matching in progress…</div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: `linear-gradient(90deg, #F59E0B, #FCD34D)`, borderRadius: 99, animation: "v22-bar 2s ease-in-out infinite" }} />
                </div>
              </div>
            )}
          </div>

          {/* Screen dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 12 }}>
            {SCREENS.map((_, i) => (
              <div key={i} style={{ width: i === screen ? 18 : 5, height: 5, borderRadius: 99, background: i === screen ? D.lime : "rgba(255,255,255,0.2)", transition: "all 0.35s" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PROPS = [
  { icon: "📥", title: "Customers book 24/7", desc: "Online booking page, no calls needed." },
  { icon: "🤖", title: "Crew auto-assigned", desc: "Right person, right job, right location." },
  { icon: "💳", title: "Invoice on completion", desc: "Automatic. No chasing, no forgetting." },
  { icon: "📊", title: "Real-time dashboard", desc: "Every job and crew member, live." },
];

export default function V22() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 0ms, transform 0.65s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 140ms, transform 0.65s 140ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 260ms, transform 0.65s 260ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 380ms, transform 0.65s 380ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.dark }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: D.lime, zIndex: 60 }} />
      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={in0}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: D.limeBg, border: "1px solid #BEF264", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.limeText }}>BOOKINGS · DISPATCH · INVOICING</span>
              </div>
            </div>
            <div style={in1}>
              <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(38px, 4.5vw, 62px)", fontWeight: 600, lineHeight: 1.1, color: D.dark, marginBottom: 24 }}>
                Your service business,<br /><em>fully on autopilot.</em>
              </h1>
            </div>
            <div style={in2}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: D.muted, lineHeight: 1.7, marginBottom: 36, maxWidth: 420 }}>
                Customers book online. Your crew gets dispatched automatically. Invoices go out when the job is done. You just run the business.
              </p>
            </div>
            <div style={in3}>
              <a href="#cta" style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "14px 32px", borderRadius: 10, textDecoration: "none", marginBottom: 14 }}>
                Get Early Access
              </a>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#9CA3AF" }}>No upfront payment · Invoice after job completion</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneMockup loaded={loaded} />
          </div>
        </div>
      </section>

      {/* Props */}
      <section style={{ background: D.surface, borderTop: `1px solid ${D.border}`, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {PROPS.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <PropCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business types */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, textAlign: "center", marginBottom: 16 }}>BUILT FOR</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {["🧹 Cleaning", "🔧 Maintenance", "🌿 Landscaping", "❄️ HVAC", "🪟 Window Cleaning", "🏢 Field Service"].map((tag, i) => (
              <span key={tag} style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, padding: "8px 18px", border: `1px solid ${D.border}`, borderRadius: 99, background: D.bg, opacity: 0, animation: `none`, transition: "opacity 0.4s", animationFillMode: "forwards" }}>
                <Pill tag={tag} delay={i * 60} />
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section id="cta" style={{ background: D.dark, padding: "80px 24px" }}>
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 600, lineHeight: 1.15, color: "#FFFFFF", marginBottom: 16 }}>
              Ready to hand off the admin?
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "#9CA3AF", marginBottom: 36, lineHeight: 1.7 }}>
              Be one of the first service teams on neatr.ai.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <input placeholder="Your work email" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "13px 18px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.12)", outline: "none", width: 240, color: "#FFFFFF", background: "rgba(255,255,255,0.05)" }} />
              <button style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "13px 26px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                Get Early Access
              </button>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#555", marginTop: 14 }}>No upfront payment · Invoice after job completion</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Pill({ tag, delay }: { tag: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <span ref={ref} style={{ fontFamily: "var(--font-sans)", fontSize: 14, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(8px)", transition: "opacity 0.4s, transform 0.4s", display: "inline-block" }}>{tag}</span>
  );
}

function PropCard({ p }: { p: typeof PROPS[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "24px 20px", border: `1.5px solid ${hov ? D.lime : D.border}`, borderRadius: 14, background: D.bg, transition: "all 0.25s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? "0 10px 28px rgba(200,255,0,0.1)" : "none" }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: D.dark, marginBottom: 6 }}>{p.title}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.muted, lineHeight: 1.55 }}>{p.desc}</div>
    </div>
  );
}
