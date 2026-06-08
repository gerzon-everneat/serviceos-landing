"use client";
import { useEffect, useRef, useState } from "react";

const D = {
  bg: "#060606",
  surface: "#111111",
  border: "rgba(255,255,255,0.08)",
  muted: "#555555",
  mutedLight: "#888888",
  text: "#FFFFFF",
  lime: "#C8FF00",
  limeText: "#3A5000",
};

const TIMELINE = [
  { time: "7:42 AM", icon: "📱", action: "Sarah M. booked a deep clean", sub: "Online. No call. No back-and-forth.", color: "#22C55E" },
  { time: "7:43 AM", icon: "🤖", action: "Maria L. auto-assigned", sub: "0.8 mi away · 4.9★ · Nearest available.", color: "#3B82F6" },
  { time: "7:44 AM", icon: "✉️", action: "Confirmation sent to Sarah", sub: '"Your crew arrives Thursday at 10am."', color: "#F59E0B" },
  { time: "10:00 AM", icon: "🏠", action: "Maria checked in at the job", sub: "Deep clean · 3br/2ba · Johnson Residence", color: "#8B5CF6" },
  { time: "11:58 AM", icon: "✅", action: "Job complete", sub: "Maria marked it done on her phone.", color: "#22C55E" },
  { time: "11:59 AM", icon: "💳", action: "Invoice sent · $185", sub: "Automatic. Sarah received it by email.", color: D.lime },
];

const YOU_WERE = [
  "Making breakfast.",
  "At your kid's game.",
  "On a different job.",
  "Sleeping in.",
  "Living your life.",
];

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(6,6,6,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${D.border}` }}>
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

export default function V24() {
  const [loaded, setLoaded] = useState(false);
  const [youIdx, setYouIdx] = useState(0);
  const [youVis, setYouVis] = useState(true);
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (!loaded) return;
    let i = 0;
    const show = setInterval(() => {
      i++;
      setVisibleItems(i);
      if (i >= TIMELINE.length) clearInterval(show);
    }, 320);
    return () => clearInterval(show);
  }, [loaded]);

  useEffect(() => {
    const t = setInterval(() => {
      setYouVis(false);
      setTimeout(() => { setYouIdx(i => (i + 1) % YOU_WERE.length); setYouVis(true); }, 300);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 0ms, transform 0.7s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 150ms, transform 0.7s 150ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 300ms, transform 0.7s 300ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.text }}>
      <style>{`
        @keyframes v24-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.7)} }
        @keyframes v24-line { from{height:0} to{height:100%} }
        @keyframes v24-glow { 0%,100%{opacity:0.04} 50%{opacity:0.08} }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle, #181818 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.5, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: -200, left: -200, width: 600, height: 600, borderRadius: "50%", background: D.lime, opacity: 0.05, filter: "blur(150px)", pointerEvents: "none", animation: "v24-glow 4s ease-in-out infinite" }} />

      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "88px 24px 0", textAlign: "center" }}>
        <div style={in0}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.2)", borderRadius: 20, padding: "5px 16px", marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: D.lime, animation: "v24-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.lime }}>A REAL TUESDAY</span>
          </div>
        </div>
        <div style={in1}>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 600, lineHeight: 1.05, color: D.text, marginBottom: 24 }}>
            Your business<br />
            <em style={{ color: D.lime }}>ran itself today.</em>
          </h1>
        </div>
        <div style={in2}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: D.mutedLight, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 64px" }}>
            From the first booking to the final invoice — while you were{" "}
            <span style={{ color: D.lime, fontWeight: 600, opacity: youVis ? 1 : 0, transition: "opacity 0.3s", display: "inline-block" }}>
              {YOU_WERE[youIdx]}
            </span>
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s 400ms" }}>
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 20, marginBottom: i < TIMELINE.length - 1 ? 0 : 0, opacity: i < visibleItems ? 1 : 0, transform: i < visibleItems ? "none" : "translateX(-20px)", transition: "opacity 0.45s, transform 0.45s" }}
            >
              {/* Left: time */}
              <div style={{ width: 80, flexShrink: 0, textAlign: "right", paddingTop: 18 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: D.muted, letterSpacing: "0.04em" }}>{item.time}</span>
              </div>

              {/* Center: connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${item.color}18`, border: `1.5px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 10 }}>
                  {item.icon}
                </div>
                {i < TIMELINE.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 32, background: `linear-gradient(${item.color}40, ${TIMELINE[i + 1].color}20)`, marginTop: 4, marginBottom: 4 }} />
                )}
              </div>

              {/* Right: content */}
              <div style={{ paddingTop: 14, paddingBottom: i < TIMELINE.length - 1 ? 24 : 0, flex: 1 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: i === TIMELINE.length - 1 ? D.lime : D.text, marginBottom: 4 }}>{item.action}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.muted, lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            </div>
          ))}

          {/* Closing line */}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${D.border}`, textAlign: "center", opacity: visibleItems >= TIMELINE.length ? 1 : 0, transition: "opacity 0.5s 500ms" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 600, color: D.text, lineHeight: 1.3, marginBottom: 8 }}>
              <em>What were you doing while this happened?</em>
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: D.muted }}>
              Doesn't matter. The business ran anyway.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section style={{ borderTop: `1px solid ${D.border}`, padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "🌐", title: "Booking — automatic", desc: "Customers book on your neatr.ai page. Date, crew type, address. No calls. No texts. No you." },
              { icon: "🤖", title: "Dispatch — automatic", desc: "The moment a booking lands, the nearest available crew is assigned. You're notified, not consulted." },
              { icon: "💳", title: "Invoicing — automatic", desc: "Job done → invoice sent. The money is on its way before you even know the job finished." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <PillarCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ maxWidth: 600, margin: "0 auto", padding: "72px 24px 96px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, lineHeight: 1.15, color: D.text, marginBottom: 16 }}>
            <em style={{ color: D.lime }}>You built this business.</em><br />
            Now let it run.
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.mutedLight, marginBottom: 36, lineHeight: 1.7 }}>
            Early access is open. No upfront cost — you're invoiced only after jobs complete.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input placeholder="Your work email" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "13px 18px", borderRadius: 10, border: `1.5px solid ${D.border}`, outline: "none", width: 240, color: D.text, background: "rgba(255,255,255,0.05)" }} />
            <button style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "13px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>
              Get Early Access
            </button>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: D.muted, marginTop: 14 }}>No upfront payment · Invoice after job completion</p>
        </Reveal>
      </section>
    </main>
  );
}

function PillarCard({ p }: { p: { icon: string; title: string; desc: string } }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "24px 20px", border: `1.5px solid ${hov ? "rgba(200,255,0,0.4)" : D.border}`, borderRadius: 14, background: hov ? "rgba(200,255,0,0.03)" : D.surface, transition: "all 0.25s", transform: hov ? "translateY(-4px)" : "none" }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: D.text, marginBottom: 8 }}>{p.title}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.muted, lineHeight: 1.65 }}>{p.desc}</div>
    </div>
  );
}
