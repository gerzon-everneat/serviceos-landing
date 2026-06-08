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
  surface: "#F9FAFB",
};

const HEADLINES = [
  "Your phone rings at 7pm. Again.",
  "You have 3 unread WhatsApp groups.",
  "The spreadsheet is already out of date.",
  "Another invoice you forgot to send.",
];

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
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: `opacity 0.65s ${delay}ms, transform 0.65s ${delay}ms` }}>
      {children}
    </div>
  );
}

const PAINS = [
  {
    icon: "📱",
    headline: "Your phone rings at 7pm.",
    body: "A customer wants to book a cleaning. You're at dinner. You take the call, open the spreadsheet, check availability, call Maria, call back the customer.",
    tag: "Every. Single. Day.",
  },
  {
    icon: "💬",
    headline: "Three WhatsApp groups, zero clarity.",
    body: "One for cleaning crew. One for maintenance. One for emergencies. No one knows who's on what job. You're the only one with the full picture — in your head.",
    tag: "In your head. Always.",
  },
  {
    icon: "📊",
    headline: "The spreadsheet that runs your life.",
    body: "Color-coded rows, conditional formatting, someone always updating it wrong. It works — until Monday, when everything changes and the sheet is already stale.",
    tag: "One wrong edit away from chaos.",
  },
  {
    icon: "💸",
    headline: "The invoice you forgot to send.",
    body: "Job was done four days ago. You meant to send it. You haven't. The money's just not coming in — because you had three more jobs to manage by the time you got back to it.",
    tag: "Revenue you're leaving behind.",
  },
];

const STEPS = [
  { num: "01", title: "Customer books online", desc: "Clients book on your neatr.ai page. Calendar, job type, location — automatic." },
  { num: "02", title: "AI dispatches your crew", desc: "Right crew member assigned by location and availability. No calls, no guesswork." },
  { num: "03", title: "Job runs. Invoice sends.", desc: "Job complete → invoice out. You get paid without lifting a finger." },
];

function PainCard({ pain, index }: { pain: typeof PAINS[number]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "28px 24px", border: `1.5px solid ${hov ? "#D1D5DB" : D.border}`, borderRadius: 16, background: hov ? D.surface : D.bg, transition: "all 0.25s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? "0 12px 32px rgba(0,0,0,0.06)" : "none", cursor: "default" }}
    >
      <div style={{ fontSize: 28, marginBottom: 16 }}>{pain.icon}</div>
      <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: 26, fontWeight: 600, color: D.dark, marginBottom: 12, lineHeight: 1.2 }}>{pain.headline}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, lineHeight: 1.65, marginBottom: 16 }}>{pain.body}</p>
      <div style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "#9CA3AF", fontStyle: "italic", background: "#F3F4F6", padding: "4px 10px", borderRadius: 6 }}>{pain.tag}</div>
    </div>
  );
}

export default function V20() {
  const [loaded, setLoaded] = useState(false);
  const [hlIndex, setHlIndex] = useState(0);
  const [hlVisible, setHlVisible] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setHlVisible(false);
      setTimeout(() => {
        setHlIndex(i => (i + 1) % HEADLINES.length);
        setHlVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 0ms, transform 0.65s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 140ms, transform 0.65s 140ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 280ms, transform 0.65s 280ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 400ms, transform 0.65s 400ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.dark }}>
      <style>{`
        @keyframes v20-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: D.lime, zIndex: 60 }} />
      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Opening hook */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "96px 24px 72px", textAlign: "center" }}>
        <div style={in0}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FEF9C3", border: "1px solid #FDE047", borderRadius: 20, padding: "5px 14px", marginBottom: 32 }}>
            <span style={{ fontSize: 14 }}>👋</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#854D0E" }}>SOUND FAMILIAR?</span>
          </div>
        </div>

        {/* Rotating headline */}
        <div style={in1}>
          <div style={{ minHeight: "clamp(88px, 14vw, 164px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 600, lineHeight: 1.1, color: D.dark, opacity: hlVisible ? 1 : 0, transform: hlVisible ? "none" : "translateY(12px)", transition: "opacity 0.4s, transform 0.4s" }}>
              <em>{HEADLINES[hlIndex]}</em>
              <span style={{ display: "inline-block", width: 3, height: "0.85em", background: D.lime, marginLeft: 4, verticalAlign: "middle", animation: "v20-cursor 1s step-end infinite" }} />
            </h1>
          </div>
        </div>

        <div style={in2}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: D.muted, lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
            Managing a service business is a second full-time job. You built the business. The admin wasn't supposed to follow you home.
          </p>
        </div>

        {/* Dot indicators */}
        <div style={{ ...in3, display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }}>
          {HEADLINES.map((_, i) => (
            <div key={i} style={{ width: i === hlIndex ? 20 : 6, height: 6, borderRadius: 99, background: i === hlIndex ? D.limeText : D.border, transition: "all 0.35s" }} />
          ))}
        </div>
      </section>

      {/* Pain cards */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {PAINS.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <PainCard pain={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pivot */}
      <section style={{ background: D.dark, padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: D.lime, marginBottom: 20 }}>THERE'S A BETTER WAY</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 600, lineHeight: 1.1, color: "#FFFFFF", marginBottom: 20 }}>
              What if bookings,<br />dispatch, and invoicing<br />
              <em style={{ color: D.lime }}>just… happened?</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "#9CA3AF", lineHeight: 1.7 }}>
              neatr.ai is the operating system for field service businesses. Bookings. Dispatch. Invoicing — with zero manual work from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 24px" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, marginBottom: 12, textAlign: "center" }}>HOW IT WORKS</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, textAlign: "center", marginBottom: 56 }}>
            Three steps. <em>Fully automated.</em>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <StepCard s={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ background: D.limeBg, borderTop: "1px solid #BEF264", padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, marginBottom: 16 }}>
              Stop managing your business.<br />
              <em>Let it run itself.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.muted, marginBottom: 36, lineHeight: 1.7 }}>
              Early access open for cleaning, maintenance, landscaping, HVAC, and field service teams.
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
        </div>
      </section>
    </main>
  );
}

function StepCard({ s }: { s: typeof STEPS[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: "28px 24px", border: `1.5px solid ${hov ? D.lime : D.border}`, borderRadius: 16, background: D.bg, transition: "all 0.25s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? "0 10px 28px rgba(200,255,0,0.1)" : "none" }}
    >
      <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 52, fontWeight: 600, color: D.lime, marginBottom: 12, lineHeight: 1 }}>{s.num}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: D.dark, marginBottom: 10 }}>{s.title}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, lineHeight: 1.65 }}>{s.desc}</div>
    </div>
  );
}
