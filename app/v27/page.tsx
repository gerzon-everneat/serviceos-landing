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
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.65s ${delay}ms, transform 0.65s ${delay}ms` }}>
      {children}
    </div>
  );
}

const THEM = [
  { time: "7:30 AM", text: "A booking came in overnight. Their page handled it.", color: "#22C55E" },
  { time: "7:31 AM", text: "AI assigned the nearest available crew. Automatically.", color: "#3B82F6" },
  { time: "7:32 AM", text: "Customer confirmed. Crew notified. Calendar updated.", color: "#F59E0B" },
  { time: "2:47 PM", text: "Job complete. Invoice sent before they left the driveway.", color: "#C8FF00" },
];

const YOU = [
  { time: "7:30 AM", text: "Phone buzzed. A customer texted 'can u do next tuesday?'", color: "#EF4444" },
  { time: "8:15 AM", text: "You finally replied. They haven't responded yet.", color: "#EF4444" },
  { time: "10:00 AM", text: "Called Maria to check if she's free. Left a voicemail.", color: "#EF4444" },
  { time: "4:30 PM", text: "Remembered to send the invoice from last Thursday.", color: "#EF4444" },
];

const CONTRAST = [
  { label: "Time to confirm a booking", them: "< 2 minutes", you: "4–24 hours", icon: "🕐" },
  { label: "How dispatch happens", them: "AI matches by location", you: "Phone calls + guessing", icon: "🤖" },
  { label: "When invoice gets sent", them: "Instant on job completion", you: "When you remember to", icon: "💳" },
  { label: "Your evenings", them: "Yours", you: "Answering booking texts", icon: "🌙" },
];

export default function V27() {
  const [loaded, setLoaded] = useState(false);
  const [themVis, setThemVis] = useState(0);
  const [youVis, setYouVis] = useState(0);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!loaded) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setThemVis(i);
      setYouVis(i);
      if (i >= THEM.length) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
  }, [loaded]);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 0ms, transform 0.7s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 160ms, transform 0.7s 160ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 300ms, transform 0.7s 300ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 440ms, transform 0.7s 440ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.text }}>
      <style>{`
        @keyframes v27-glow { 0%,100%{opacity:0.04} 50%{opacity:0.09} }
        @keyframes v27-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.6)} }
      `}</style>

      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.45, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: -200, right: -100, width: 600, height: 600, borderRadius: "50%", background: D.lime, opacity: 0.05, filter: "blur(140px)", pointerEvents: "none", animation: "v27-glow 4s ease-in-out infinite" }} />

      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "88px 24px 0", textAlign: "center" }}>
        <div style={in0}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.2)", borderRadius: 20, padding: "5px 16px", marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: D.lime, animation: "v27-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.lime }}>THE OPEN SECRET</span>
          </div>
        </div>
        <div style={in1}>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 600, lineHeight: 1.08, color: D.text, marginBottom: 24 }}>
            The cleaners booking<br />
            <em style={{ color: D.lime }}>while you're quoting.</em>
          </h1>
        </div>
        <div style={in2}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: D.mutedLight, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 16px" }}>
            There's a cleaning business in your market that never takes a booking call. Their crew gets assigned before they finish their coffee. Their invoices send before they leave the driveway.
          </p>
        </div>
        <div style={in3}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: D.muted, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 64px" }}>
            This isn't luck. It's infrastructure. And it's available to you today.
          </p>
        </div>
      </section>

      {/* Side-by-side Monday comparison */}
      <section style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s 400ms" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Their Monday */}
            <div style={{ background: D.surface, border: `1px solid rgba(200,255,0,0.15)`, borderRadius: 20, padding: "28px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: D.lime }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: D.lime }}>THEIR MONDAY</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {THEM.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, opacity: i < themVis ? 1 : 0, transform: i < themVis ? "none" : "translateX(12px)", transition: "all 0.45s" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: D.muted, flexShrink: 0, width: 60, paddingTop: 2 }}>{item.time}</span>
                    <div style={{ flex: 1, padding: "10px 12px", background: `${item.color}10`, borderRadius: 10, borderLeft: `2px solid ${item.color}` }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#CCC", lineHeight: 1.5 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Monday */}
            <div style={{ background: D.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 20, padding: "28px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#EF4444" }}>YOUR MONDAY</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {YOU.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, opacity: i < youVis ? 1 : 0, transform: i < youVis ? "none" : "translateX(-12px)", transition: "all 0.45s" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: D.muted, flexShrink: 0, width: 60, paddingTop: 2 }}>{item.time}</span>
                    <div style={{ flex: 1, padding: "10px 12px", background: "rgba(239,68,68,0.08)", borderRadius: 10, borderLeft: "2px solid rgba(239,68,68,0.4)" }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#AAA", lineHeight: 1.5 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contrast table */}
      <section style={{ borderTop: `1px solid ${D.border}`, padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, textAlign: "center", marginBottom: 40 }}>THE OPERATIONAL DIFFERENCE</p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, paddingBottom: 12, borderBottom: `1px solid ${D.border}`, marginBottom: 4 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: D.muted, letterSpacing: "0.08em" }}></span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: D.lime, letterSpacing: "0.08em", textAlign: "center" }}>WITH NEATR.AI</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", textAlign: "center" }}>WITHOUT</span>
            </div>
            {CONTRAST.map((row, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, padding: "16px 0", borderBottom: `1px solid ${D.border}`, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 16 }}>{row.icon}</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.mutedLight }}>{row.label}</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: D.lime }}>{row.them}</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#444" }}>{row.you}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ maxWidth: 600, margin: "0 auto", padding: "72px 24px 96px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, lineHeight: 1.15, color: D.text, marginBottom: 16 }}>
            Stop watching.<br />
            <em style={{ color: D.lime }}>Start running ahead.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.mutedLight, marginBottom: 36, lineHeight: 1.7 }}>
            Early access is open. No upfront cost — invoiced only after jobs complete.
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
