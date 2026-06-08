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
  red: "#DC2626",
  redBg: "#FEF2F2",
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
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: `opacity 0.65s ${delay}ms, transform 0.65s ${delay}ms` }}>
      {children}
    </div>
  );
}

const BEFORE = [
  { icon: "📱", label: "Booking by phone call", desc: "Customers call during dinner. You scramble to check availability." },
  { icon: "💬", label: "WhatsApp group chaos", desc: "3 crew groups, nobody sure who's on what job." },
  { icon: "📊", label: "Spreadsheet scheduling", desc: "Updated manually, out of date by Monday morning." },
  { icon: "❓", label: "Where's my crew?", desc: "Customer calls. You have no idea. You start calling around." },
  { icon: "📝", label: "Invoice sent... days later", desc: "When you finally find time to type it up and send." },
];

const AFTER = [
  { icon: "🌐", label: "Customer books online", desc: "On your booking page. 2 minutes. No phone call needed." },
  { icon: "🤖", label: "AI dispatches instantly", desc: "Nearest available crew assigned — automatically." },
  { icon: "🗓️", label: "Live schedule for everyone", desc: "Crew, you, and the customer see the same calendar." },
  { icon: "✉️", label: "Customer gets notified", desc: "'Your crew arrives Thursday at 10am.' Sent automatically." },
  { icon: "💳", label: "Invoice sent on completion", desc: "Job done → invoice sent. No memory, no chasing." },
];

function AnimatedItem({ item, index, color, labelColor, isLast }: { item: typeof BEFORE[0]; index: number; color: string; labelColor: string; isLast: boolean }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 400 + index * 130);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <div style={{ display: "flex", gap: 12, padding: "12px 14px", background: `${color}06`, borderRadius: 12, marginBottom: isLast ? 0 : 8, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(16px)", transition: "opacity 0.5s, transform 0.5s" }}>
      <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.5 }}>{item.icon}</span>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: labelColor, marginBottom: 3 }}>{item.label}</div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: D.muted, lineHeight: 1.5 }}>{item.desc}</div>
      </div>
    </div>
  );
}

export default function V19() {
  const [loaded, setLoaded] = useState(false);
  const [sideFocus, setSideFocus] = useState<"before" | "after" | null>(null);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 0ms, transform 0.65s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 120ms, transform 0.65s 120ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 240ms, transform 0.65s 240ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 360ms, transform 0.65s 360ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.dark }}>
      <style>{`
        @keyframes v19-shimmer { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes v19-arrow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: D.lime, zIndex: 60 }} />
      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 48px", textAlign: "center" }}>
        <div style={in0}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: D.limeBg, border: "1px solid #BEF264", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.limeText }}>BEFORE vs. AFTER</span>
          </div>
        </div>
        <div style={in1}>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 600, lineHeight: 1.1, color: D.dark, marginBottom: 20 }}>
            Running a service business<br />
            <em>doesn't have to feel like this.</em>
          </h1>
        </div>
        <div style={in2}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: D.muted, maxWidth: 520, margin: "0 auto 20px", lineHeight: 1.65 }}>
            See exactly what changes when neatr.ai handles your bookings, dispatch, and invoicing.
          </p>
        </div>
        <div style={in3}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 56 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#9CA3AF" }}>No upfront payment</span>
            <span style={{ color: D.border }}>·</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#9CA3AF" }}>Invoice after job completion</span>
          </div>
        </div>

        {/* Comparison panels */}
        <div style={{ ...in3, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, textAlign: "left", alignItems: "start" }}>
          {/* Before */}
          <div
            onMouseEnter={() => setSideFocus("before")}
            onMouseLeave={() => setSideFocus(null)}
            style={{ background: D.redBg, border: `1.5px solid ${sideFocus === "before" ? "#FCA5A5" : "#FEE2E2"}`, borderRadius: "20px 0 0 20px", padding: "28px 24px", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: sideFocus === "before" ? "0 8px 40px rgba(220,38,38,0.1)" : "none" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: D.red, animation: "v19-shimmer 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: D.red }}>WITHOUT NEATR.AI</span>
            </div>
            {BEFORE.map((item, i) => (
              <AnimatedItem key={i} item={item} index={i} color="#DC2626" labelColor="#991B1B" isLast={i === BEFORE.length - 1} />
            ))}
          </div>

          {/* Middle divider */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 0", background: D.dark, width: 48, alignSelf: "stretch" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, animation: "v19-arrow 1.8s ease-in-out infinite" }}>→</div>
          </div>

          {/* After */}
          <div
            onMouseEnter={() => setSideFocus("after")}
            onMouseLeave={() => setSideFocus(null)}
            style={{ background: D.limeBg, border: `1.5px solid ${sideFocus === "after" ? D.lime : "#D9F99D"}`, borderRadius: "0 20px 20px 0", padding: "28px 24px", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: sideFocus === "after" ? "0 8px 40px rgba(200,255,0,0.14)" : "none" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: D.limeText, animation: "v19-shimmer 2s ease-in-out infinite 0.5s" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: D.limeText }}>WITH NEATR.AI</span>
            </div>
            {AFTER.map((item, i) => (
              <AnimatedItem key={i} item={{ ...item }} index={i} color="#3A5000" labelColor={D.limeText} isLast={i === AFTER.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ maxWidth: 640, margin: "0 auto", padding: "72px 24px 96px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, marginBottom: 16 }}>
            Ready for the <em style={{ color: D.limeText }}>after</em>?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.muted, marginBottom: 36, lineHeight: 1.7 }}>
            neatr.ai is in early access. Join service teams switching from chaos to clarity.
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
