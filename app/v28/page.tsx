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
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: D.dark }}>neatr.ai</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.muted, padding: "4px 12px", border: `1px solid ${D.border}`, borderRadius: 20 }}>🧹 For cleaning businesses</span>
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

function CountUp({ target, suffix = "", prefix = "", duration = 1200 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
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
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

const JOBS = [
  { icon: "🧹", type: "Standard clean", rooms: "2br/1ba", price: "$120", crew: "Maria L.", status: "COMPLETE", statusColor: "#22C55E" },
  { icon: "🏠", type: "Deep clean", rooms: "3br/2ba", price: "$185", crew: "Sarah M.", status: "IN PROGRESS", statusColor: "#3B82F6" },
  { icon: "🏢", type: "Move-out clean", rooms: "4br/3ba", price: "$260", crew: "Tom K.", status: "SCHEDULED", statusColor: "#F59E0B" },
  { icon: "✨", type: "Recurring — bi-weekly", rooms: "2br/2ba", price: "$95", crew: "Maria L.", status: "CONFIRMED", statusColor: "#8B5CF6" },
];

const FEATURES = [
  { icon: "📅", title: "Recurring job scheduling", desc: "Set it once. Weekly, bi-weekly, monthly — customers get reminders, crews get scheduled automatically." },
  { icon: "📍", title: "Route-based dispatch", desc: "Crew assigned by neighborhood to maximize jobs per day and minimize drive time between cleans." },
  { icon: "💬", title: "Customer SMS updates", desc: "'Your crew is on the way.' 'Your home is ready.' Sent automatically, without you typing a word." },
  { icon: "💳", title: "Invoice on completion", desc: "As soon as the cleaner marks the job done, the invoice goes out. No memory, no spreadsheet, no delay." },
  { icon: "🔁", title: "Rebooking prompts", desc: "After every job, customers get a rebooking prompt automatically. Retention without lifting a finger." },
  { icon: "📊", title: "Revenue dashboard", desc: "Today's jobs, this week's revenue, outstanding invoices. Everything in one view — no manual tracking." },
];

export default function V28() {
  const [loaded, setLoaded] = useState(false);
  const [activeJob, setActiveJob] = useState(0);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveJob(j => (j + 1) % JOBS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const in0 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 0ms, transform 0.65s 0ms" };
  const in1 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 140ms, transform 0.65s 140ms" };
  const in2 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 280ms, transform 0.65s 280ms" };
  const in3 = { opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "opacity 0.65s 420ms, transform 0.65s 420ms" };

  return (
    <main style={{ background: D.bg, minHeight: "100vh", color: D.dark }}>
      <style>{`
        @keyframes v28-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.6)} }
      `}</style>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: D.lime, zIndex: 60 }} />
      <Nav />
      <div style={{ paddingTop: 64 }} />

      {/* Hero */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={in0}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: D.limeBg, border: "1px solid #BEF264", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
                <span style={{ fontSize: 14 }}>🧹</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: D.limeText }}>BUILT FOR CLEANING BUSINESSES</span>
              </div>
            </div>
            <div style={in1}>
              <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 600, lineHeight: 1.1, color: D.dark, marginBottom: 24 }}>
                From booking call<br />to invoice sent —<br />
                <em>without a single spreadsheet.</em>
              </h1>
            </div>
            <div style={in2}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: D.muted, lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
                neatr.ai is built specifically for residential cleaning businesses. Recurring clients, crew routing by neighbourhood, automatic invoicing after every clean.
              </p>
            </div>
            <div style={in3}>
              <a href="#cta" style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "14px 32px", borderRadius: 10, textDecoration: "none", marginBottom: 14 }}>
                Get Early Access
              </a>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#9CA3AF" }}>No upfront payment · Invoice after job completion</p>
            </div>
          </div>

          {/* Right — live job board */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px) scale(0.97)", transition: "opacity 0.8s 300ms, transform 0.8s 300ms" }}>
            <div style={{ background: D.dark, borderRadius: 20, padding: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#444", marginBottom: 4 }}>TODAY — 4 CLEANS</div>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontWeight: 600, fontStyle: "italic", color: "#FFFFFF" }}>Job board</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "v28-pulse 2s ease-in-out infinite" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#444", fontWeight: 600 }}>LIVE</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {JOBS.map((job, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: activeJob === i ? "rgba(200,255,0,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${activeJob === i ? "rgba(200,255,0,0.2)" : "transparent"}`, transition: "all 0.35s" }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{job.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "#FFFFFF", marginBottom: 2 }}>{job.type} · {job.rooms}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#555" }}>{job.crew} · {job.price}</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", color: job.statusColor, background: `${job.statusColor}18`, padding: "3px 8px", borderRadius: 6, flexShrink: 0 }}>{job.status}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>$660</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#444", marginTop: 2 }}>TODAY'S REVENUE</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: D.lime }}>3/4</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#444", marginTop: 2 }}>INVOICES SENT</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>0</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#444", marginTop: 2 }}>CALLS TAKEN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: D.dark, padding: "56px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, textAlign: "center" }}>
          {[
            { value: 4, suffix: " min", label: "Avg. invoice sent after job completion", prefix: "< " },
            { value: 90, suffix: "s", label: "Avg. crew dispatch time", prefix: "< " },
            { value: 0, suffix: "", label: "Booking calls you need to take", prefix: "" },
            { value: 24, suffix: "/7", label: "Your booking page is open", prefix: "" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "16px", borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : "none" }}>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 48, fontWeight: 600, color: D.lime, lineHeight: 1, marginBottom: 8 }}>
                  {s.prefix}<CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#555", lineHeight: 1.5 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px" }}>
        <Reveal>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.muted, textAlign: "center", marginBottom: 12 }}>EVERYTHING A CLEANING BUSINESS NEEDS</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, textAlign: "center", marginBottom: 48 }}>
            Built around how cleaning<br /><em>businesses actually work.</em>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={i * 70}>
              <FeatureCard f={f} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Use case vignette */}
      <section style={{ background: D.limeBg, borderTop: "1px solid #BEF264", borderBottom: "1px solid #BEF264", padding: "64px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: D.limeText, marginBottom: 20 }}>A DAY WITH NEATR.AI</p>
            <blockquote style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 600, lineHeight: 1.4, color: D.dark, borderLeft: `4px solid ${D.lime}`, paddingLeft: 28, marginBottom: 20 }}>
              "A cleaning crew of 6. Thursday: 8 jobs scheduled across 3 neighbourhoods. Every booking came in online. Every crew member knew exactly where to be. Every invoice was sent before they got back in the van."
            </blockquote>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: D.muted, paddingLeft: 28 }}>What this looks like with neatr.ai — no calls, no spreadsheets, no chasing.</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px 96px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 600, lineHeight: 1.15, color: D.dark, marginBottom: 16 }}>
            Ready to run your cleaning<br />
            <em>business on autopilot?</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: D.muted, marginBottom: 36, lineHeight: 1.7 }}>
            Early access is open for residential cleaning businesses. No upfront cost — invoiced only after each job completes.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input placeholder="Your work email" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "13px 18px", borderRadius: 10, border: `1.5px solid ${D.border}`, outline: "none", width: 240, color: D.dark, background: D.bg }} />
            <button style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, background: D.lime, color: D.limeText, padding: "13px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>
              Get Early Access
            </button>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#9CA3AF", marginTop: 14 }}>No upfront payment · Invoice after job completion</p>
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
      <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: D.dark, marginBottom: 7 }}>{f.title}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: D.muted, lineHeight: 1.65 }}>{f.desc}</div>
    </div>
  );
}
