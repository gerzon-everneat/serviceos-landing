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
  red: "#DC2626",
};

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${D.border}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: D.dark }}>neatr.ai</span>
        <a href="#cta" style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, background: D.lime, color: D.limeText, padding: "8px 20px", borderRadius: 8, textDecoration: "none" }}>Get Early Access</a>
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

const FAILURES = [
  {
    tool: "Spreadsheets",
    icon: "📊",
    what: "You built the perfect system. Color-coded, conditional formatting, shared with the crew.",
    broke: "Someone edited the wrong cell. The formula broke. Two jobs were double-booked on a Tuesday.",
  },
  {
    tool: "WhatsApp groups",
    icon: "💬",
    what: "One group for each crew. Job details in the chat. Quick and simple.",
    broke: "Nobody reads back 200 messages. Crew showed up to the wrong address. Customer left a bad review.",
  },
  {
    tool: "Jobber / generic software",
    icon: "💻",
    what: "Signed up for the trial. Set up the account. Watched the onboarding videos.",
    broke: "It was built for a 40-person operation. You have 4 crew. Half the features didn't apply. You went back to the spreadsheet.",
  },
];

const DIFFERENT = [
  { num: "01", title: "Zero setup overhead", desc: "You're running jobs within an hour. No onboarding call. No 47-step tutorial. Connect your calendar, add your crew, share your booking link." },
  { num: "02", title: "Built around how field crews actually work", desc: "Not how a product manager imagined field crews work. Dispatch by location. Invoice on job completion. No timesheets, no project codes, no overhead." },
  { num: "03", title: "You pay nothing until a job is done", desc: "No upfront subscription. No annual contract. The fee comes out after each completed job. If neatr doesn't work, you don't pay. Full stop." },
];

export default function V25() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 0ms, transform 0.65s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 150ms, transform 0.65s 150ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 300ms, transform 0.65s 300ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.dark }}>
      <style>{`
        @keyframes v25-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: D.dark, zIndex: 60 }} />
      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero — editorial, honest */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "96px 24px 80px" }}>
        <div style={in0}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, marginBottom: 20 }}>A NOTE FROM NEATR.AI</p>
        </div>
        <div style={in1}>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(38px, 5.5vw, 64px)", fontWeight: 600, lineHeight: 1.1, color: D.dark, marginBottom: 28 }}>
            We know you've tried<br />
            <em>software before.</em>
          </h1>
        </div>
        <div style={in2}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: D.muted, lineHeight: 1.75, borderLeft: `3px solid ${D.border}`, paddingLeft: 20 }}>
            Probably more than once. And if you're still reading, it probably didn't stick — because most software for field service businesses is built by people who have never dispatched a crew, chased an unpaid invoice, or taken a booking call at 9pm on a Friday.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 680, margin: "0 auto 0", padding: "0 24px" }}>
        <div style={{ height: 1, background: D.border }} />
      </div>

      {/* What usually happens */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 600, lineHeight: 1.2, color: D.dark, marginBottom: 40 }}>
            Here's what usually happens.
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {FAILURES.map((f, i) => (
            <Reveal key={i} delay={i * 100}>
              <FailureCard f={f} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: D.border }} />
      </div>

      {/* What we did differently */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 600, lineHeight: 1.2, color: D.dark, marginBottom: 12 }}>
            Here's what we did differently.
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.muted, lineHeight: 1.7, marginBottom: 40 }}>
            neatr.ai does three things. That's it. No project management. No HR features. No CRM you'll never use.
          </p>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {DIFFERENT.map((d, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ display: "flex", gap: 24, padding: "24px 0", borderBottom: i < DIFFERENT.length - 1 ? `1px solid ${D.border}` : "none" }}>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 40, fontWeight: 600, color: D.lime, flexShrink: 0, lineHeight: 1, marginTop: 4 }}>{d.num}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: D.dark, marginBottom: 8 }}>{d.title}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, lineHeight: 1.7 }}>{d.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ background: D.dark, padding: "72px 24px 96px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.15, color: "#FFFFFF", marginBottom: 16 }}>
              Give us one job.<br />
              <em style={{ color: D.lime }}>We'll earn the rest.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "#666", marginBottom: 36, lineHeight: 1.7 }}>
              No contract. No upfront cost. Early access is open for cleaning, maintenance, landscaping, HVAC, and field service teams.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <input placeholder="Your work email" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "13px 18px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.12)", outline: "none", width: 240, color: "#FFFFFF", background: "rgba(255,255,255,0.05)" }} />
              <button style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "13px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                Get Early Access
              </button>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#444", marginTop: 14 }}>No upfront payment · Invoice after job completion</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function FailureCard({ f }: { f: typeof FAILURES[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? D.surface : D.bg, border: `1px solid ${hov ? "#D1D5DB" : D.border}`, borderRadius: 14, padding: "24px", transition: "all 0.2s" }}
    >
      <div style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "center" }}>
        <span style={{ fontSize: 22 }}>{f.icon}</span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: D.dark }}>{f.tool}</span>
      </div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, marginBottom: 12, lineHeight: 1.65 }}>
        <span style={{ color: D.dark, fontWeight: 500 }}>What you tried:</span> {f.what}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.65, display: "flex", gap: 8 }}>
        <span style={{ color: D.red, fontWeight: 700, flexShrink: 0 }}>What broke:</span>
        <span style={{ color: "#6B7280" }}>{f.broke}</span>
      </p>
    </div>
  );
}
