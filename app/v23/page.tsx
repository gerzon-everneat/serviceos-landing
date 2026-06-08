"use client";
import { useEffect, useRef, useState } from "react";

const D = {
  bg: "#060606",
  surface: "#111111",
  border: "rgba(255,255,255,0.08)",
  muted: "#666666",
  text: "#FFFFFF",
  lime: "#C8FF00",
  limeText: "#3A5000",
};

const PIPELINE = [
  { icon: "📥", label: "RECEIVED",  desc: "Customer books online",        color: "#22C55E" },
  { icon: "🗓️", label: "SCHEDULED", desc: "Calendar slot confirmed",       color: "#3B82F6" },
  { icon: "🤖", label: "DISPATCH",  desc: "AI assigns nearest crew",       color: "#F59E0B" },
  { icon: "👤", label: "ASSIGNED",  desc: "Maria L. · 0.8 mi · 4.9★",    color: "#8B5CF6" },
  { icon: "✉️", label: "NOTIFIED",  desc: "Confirmation sent to customer", color: "#EC4899" },
  { icon: "💳", label: "INVOICED",  desc: "Job done · Invoice sent",       color: D.lime },
];

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(6,6,6,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${D.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: D.text }}>neatr.ai</span>
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

function LivePipeline({ loaded }: { loaded: boolean }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!loaded) return;
    const t = setInterval(() => {
      setVisible(v => {
        if (v < PIPELINE.length) {
          setActive(v);
          return v + 1;
        }
        // restart cycle
        setTimeout(() => {
          setActive(0);
          setVisible(1);
        }, 800);
        return v;
      });
    }, 1400);
    return () => clearInterval(t);
  }, [loaded]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {PIPELINE.map((step, i) => {
        const isActive = i === active && i < visible;
        const isPast = i < active && i < visible;
        const shown = i < visible;
        return (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 14px", borderRadius: 10, background: isActive ? "rgba(255,255,255,0.05)" : "transparent", border: `1px solid ${isActive ? step.color + "50" : "transparent"}`, opacity: shown ? (isPast ? 0.35 : 1) : 0, transform: shown ? "none" : "translateX(12px)", transition: "all 0.45s" }}
          >
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: isPast ? "rgba(255,255,255,0.04)" : `${step.color}20`, border: `1.5px solid ${isPast ? "rgba(255,255,255,0.08)" : step.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, transition: "all 0.4s" }}>
              {isPast ? <span style={{ fontSize: 10, color: D.muted }}>✓</span> : step.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: isActive ? step.color : D.muted, marginBottom: 2 }}>{step.label}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: isActive ? "#DDD" : D.muted }}>{step.desc}</div>
            </div>
            {isActive && <div style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, flexShrink: 0, animation: "v23-dot 1.2s ease-in-out infinite" }} />}
          </div>
        );
      })}
    </div>
  );
}

export default function V23() {
  const [loaded, setLoaded] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const t = setInterval(() => setGlowPulse(g => !g), 2000);
    return () => clearInterval(t);
  }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 0ms, transform 0.7s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 160ms, transform 0.7s 160ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 300ms, transform 0.7s 300ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 440ms, transform 0.7s 440ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.text }}>
      <style>{`
        @keyframes v23-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.6)} }
        @keyframes v23-spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes v23-border { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>

      {/* Background layers */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.45, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: -300, right: -200, width: 700, height: 700, borderRadius: "50%", background: D.lime, opacity: glowPulse ? 0.055 : 0.03, filter: "blur(160px)", pointerEvents: "none", transition: "opacity 2s ease" }} />
      <div style={{ position: "fixed", bottom: -200, left: -100, width: 500, height: 500, borderRadius: "50%", background: "#3B82F6", opacity: 0.025, filter: "blur(120px)", pointerEvents: "none" }} />

      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 48px", textAlign: "center" }}>
        <div style={in0}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: D.lime, animation: "v23-dot 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.lime }}>WATCH WHAT HAPPENS</span>
          </div>
        </div>
        <div style={in1}>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 600, lineHeight: 1.05, color: D.text, marginBottom: 24 }}>
            A customer books.<br />
            <em style={{ color: D.lime }}>Everything else<br />is automatic.</em>
          </h1>
        </div>
        <div style={in2}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: D.muted, maxWidth: 520, margin: "0 auto 0", lineHeight: 1.65 }}>
            From booking to dispatch to invoice — neatr.ai handles the entire service workflow.
          </p>
        </div>
      </section>

      {/* Video + pipeline */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ ...in3, display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
          {/* Video */}
          <div style={{ position: "relative", aspectRatio: "16/9", background: D.surface, borderRadius: 20, border: "1px solid rgba(200,255,0,0.15)", overflow: "hidden", boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,255,0,${glowPulse ? "0.12" : "0.06"})`, transition: "box-shadow 2s ease", animation: "v23-border 2s ease-in-out infinite" }}>
            {/* Grid overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

            {/* Content */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <div style={{ position: "relative" }}>
                {/* Spinning ring */}
                <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1.5px solid transparent", borderTopColor: D.lime, borderRightColor: `${D.lime}40`, animation: "v23-spin 2s linear infinite" }} />
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: `1.5px solid rgba(200,255,0,0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 0, height: 0, borderTop: "13px solid transparent", borderBottom: "13px solid transparent", borderLeft: `20px solid ${D.lime}`, marginLeft: 4 }} />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#444", marginBottom: 4 }}>neatr.ai pipeline · Full walkthrough</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#333" }}>Video coming soon — rendering with Remotion</div>
              </div>
            </div>

            {/* Corner overlays */}
            <div style={{ position: "absolute", top: 14, left: 16, fontFamily: "var(--font-cormorant)", fontSize: 18, fontWeight: 600, fontStyle: "italic", color: "rgba(255,255,255,0.2)" }}>neatr.ai</div>
            <div style={{ position: "absolute", top: 14, right: 16, fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: D.muted, background: "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 6 }}>60s · PIPELINE</div>
            <div style={{ position: "absolute", bottom: 14, left: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", animation: "v23-dot 1.8s ease-in-out infinite" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: "#22C55E" }}>LIVE DEMO BELOW</span>
            </div>
          </div>

          {/* Sidebar pipeline */}
          <div style={{ background: D.surface, borderRadius: 20, border: `1px solid ${D.border}`, padding: "18px 14px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: D.muted, marginBottom: 3 }}>LIVE — BOOKING #1284</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#333", marginBottom: 18 }}>Deep clean · Sarah M. · $185</div>
            <LivePipeline loaded={loaded} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ borderTop: `1px solid ${D.border}`, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, textAlign: "center", marginBottom: 40 }}>THE FULL PIPELINE — AUTOMATED</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { icon: "🌐", title: "Online booking", desc: "Customers book 24/7 on your neatr.ai page. No calls, no back-and-forth." },
              { icon: "🤖", title: "AI dispatch", desc: "Right crew, right job, assigned in seconds based on location and availability." },
              { icon: "💳", title: "Auto invoicing", desc: "Invoice sent the moment the job is done. Revenue without the admin." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 100}>
                <DarkCard f={f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ maxWidth: 640, margin: "0 auto", padding: "72px 24px 96px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(34px, 4.5vw, 56px)", fontWeight: 600, lineHeight: 1.12, color: D.text, marginBottom: 16 }}>
            Your business on autopilot.<br /><em style={{ color: D.lime }}>Starting now.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.muted, marginBottom: 36, lineHeight: 1.7 }}>
            Early access open for service businesses. No upfront cost — invoiced after jobs complete.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input placeholder="Your work email" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "13px 18px", borderRadius: 10, border: `1.5px solid ${D.border}`, outline: "none", width: 240, color: D.text, background: "rgba(255,255,255,0.05)" }} />
            <button style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "13px 26px", borderRadius: 10, border: "none", cursor: "pointer" }}>
              Get Early Access
            </button>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#444", marginTop: 14 }}>No upfront payment · Invoice after job completion</p>
        </Reveal>
      </section>
    </main>
  );
}

function DarkCard({ f }: { f: { icon: string; title: string; desc: string } }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "24px 22px", border: `1.5px solid ${hov ? "rgba(200,255,0,0.5)" : D.border}`, borderRadius: 14, background: hov ? "rgba(200,255,0,0.03)" : D.surface, transition: "all 0.25s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? "0 10px 32px rgba(200,255,0,0.06)" : "none" }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: D.text, marginBottom: 8 }}>{f.title}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.muted, lineHeight: 1.65 }}>{f.desc}</div>
    </div>
  );
}
