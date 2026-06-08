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

function Nav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${D.border}` }}>
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
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.65s ${delay}ms, transform 0.65s ${delay}ms` }}>
      {children}
    </div>
  );
}

const STEPS = [
  { num: "01", icon: "🌐", title: "Customer books online", desc: "They use your neatr.ai booking page. Pick a date, service type, and address. Done." },
  { num: "02", icon: "🤖", title: "AI dispatches your crew", desc: "The closest available crew member gets assigned instantly. You're notified. No calls needed." },
  { num: "03", icon: "✅", title: "Job gets done", desc: "Your crew checks in and marks the job complete from their phone." },
  { num: "04", icon: "💳", title: "Invoice goes out automatically", desc: "The moment the job is marked done, an invoice hits your customer's inbox. That's when we charge our fee." },
];

const LOGOS = ["QuickBooks", "Google Maps", "Stripe", "iCal", "Xero"];

export default function V26() {
  const [loaded, setLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 2000);
    return () => clearInterval(t);
  }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 0ms, transform 0.7s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 160ms, transform 0.7s 160ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 310ms, transform 0.7s 310ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.7s 460ms, transform 0.7s 460ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.dark }}>
      <style>{`
        @keyframes v26-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.5)} }
        @keyframes v26-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: D.lime, zIndex: 60 }} />
      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero — ultra minimal, risk-reversal as protagonist */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "100px 24px 80px", textAlign: "center" }}>
        <div style={in0}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: D.limeBg, border: "1px solid #BEF264", borderRadius: 20, padding: "5px 16px", marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: D.limeText, animation: "v26-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.limeText }}>THE WHOLE BUSINESS MODEL</span>
          </div>
        </div>

        <div style={in1}>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 600, lineHeight: 1.05, color: D.dark, marginBottom: 24 }}>
            No contract.<br />
            No upfront.<br />
            <em style={{ color: D.limeText }}>Just results.</em>
          </h1>
        </div>

        <div style={in2}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 19, color: D.muted, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 16px" }}>
            You pay nothing until a job is done. That's it. That's the entire business model.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 48px" }}>
            neatr.ai handles your bookings, dispatches your crew, and sends your invoices automatically. Our fee comes out only after each completed job.
          </p>
        </div>

        <div style={in3}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
            <a href="#cta" style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 700, background: D.lime, color: D.limeText, padding: "16px 36px", borderRadius: 12, textDecoration: "none", display: "inline-block", animation: "v26-float 3s ease-in-out infinite" }}>
              Get Early Access — Free to Start
            </a>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["✓ No contract", "✓ No upfront cost", "✓ Invoiced per job"].map(t => (
              <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: D.limeText }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — animated steps */}
      <section style={{ background: D.dark, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#555", textAlign: "center", marginBottom: 40 }}>HOW IT ACTUALLY WORKS</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ padding: "20px 16px", border: `1.5px solid ${activeStep === i ? "rgba(200,255,0,0.5)" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, background: activeStep === i ? "rgba(200,255,0,0.05)" : "rgba(255,255,255,0.02)", transition: "all 0.35s" }}>
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, fontWeight: 600, color: activeStep === i ? D.lime : "rgba(200,255,0,0.25)", marginBottom: 8, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#666", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.2)", borderRadius: 12, textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.lime, fontWeight: 500 }}>
                Our fee is charged at step 4 only — after your customer receives their invoice. If no job completes, you pay nothing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, textAlign: "center", marginBottom: 20 }}>BUILT FOR</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 48 }}>
            {[
              { icon: "🧹", label: "Cleaning crews" },
              { icon: "🔧", label: "Maintenance teams" },
              { icon: "🌿", label: "Landscaping businesses" },
              { icon: "❄️", label: "HVAC operations" },
              { icon: "🪟", label: "Window cleaners" },
              { icon: "🏢", label: "Field service teams" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, padding: "8px 16px", border: `1px solid ${D.border}`, borderRadius: 99, background: D.bg }}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Credibility logos */}
        <Reveal>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#D1D5DB", textAlign: "center", marginBottom: 20 }}>WORKS WITH TOOLS YOU ALREADY USE</p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {LOGOS.map(logo => (
              <div key={logo} style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#9CA3AF", padding: "6px 16px", border: `1px solid ${D.border}`, borderRadius: 8 }}>{logo}</div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section id="cta" style={{ background: D.limeBg, borderTop: "1px solid #BEF264", padding: "80px 24px" }}>
        <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, marginBottom: 16 }}>
              Nothing to lose.<br />
              <em>Everything to gain.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.muted, marginBottom: 36, lineHeight: 1.7 }}>
              Early access is open. Join with your email and we'll get you set up — jobs dispatched, invoices out, nothing upfront.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <input placeholder="Your work email" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "13px 18px", borderRadius: 10, border: `1.5px solid ${D.border}`, outline: "none", width: 240, color: D.dark, background: D.bg }} />
              <button style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "13px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                Start Free
              </button>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#9CA3AF", marginTop: 14 }}>No contract · No upfront · Invoiced per completed job</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
