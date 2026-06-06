"use client";

import { useEffect, useRef, useState } from "react";

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const E = {
  bg:     "#FFFFFF",
  bg2:    "#F7F5F1",
  bg3:    "#EDEAE4",
  border: "#E2DDD6",
  border2:"#C8C0B4",
  text:   "#0E0C08",
  text2:  "#5A5248",
  text3:  "#98908A",
  lime:   "#C8FF00",
  lime2:  "#A8D800",
  limeText:"#3A5000",
};

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 20 }: {
  children: React.ReactNode; delay?: number; y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.04, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ─── Counter ─────────────────────────────────────────────────────────────── */
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now(); const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ─── Mini ops feed for bento card ──────────────────────────────────────── */
function MiniFeed() {
  const EVENTS = [
    { icon: "📥", text: "New booking · $185", color: "#22C55E" },
    { icon: "⚡", text: "AI dispatch triggered", color: "#3B82F6" },
    { icon: "👤", text: "Maria L. assigned", color: "#8B5CF6" },
    { icon: "✅", text: "Confirmed · calendar synced", color: "#22C55E" },
  ];
  const [log, setLog] = useState<typeof EVENTS>([]);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    EVENTS.forEach((ev, i) => {
      timers.push(setTimeout(() => setLog(prev => [ev, ...prev].slice(0, 4)), 400 + i * 700));
    });
    timers.push(setTimeout(() => { setLog([]); setCycle(c => c + 1); }, 400 + EVENTS.length * 700 + 1800));
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
      {log.length === 0 && <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: E.text3 }}>Waiting…</div>}
      {log.map((e, i) => (
        <div key={`${e.text}-${i}`} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
          borderBottom: i < log.length - 1 ? `1px solid ${E.border}` : "none",
          animation: i === 0 ? "v14-in 0.3s cubic-bezier(0.16,1,0.3,1)" : "none",
        }}>
          <span style={{ fontSize: 14 }}>{e.icon}</span>
          <span style={{ fontSize: 11, color: i === 0 ? E.text : E.text2, flex: 1 }}>{e.text}</span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: e.color, flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );
}

/* ─── Waitlist form ──────────────────────────────────────────────────────── */
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle"|"loading"|"done">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };
  if (state === "done") return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "13px 20px", borderRadius: 8,
      background: "#f0ffe0", border: `1px solid #c8ff0060`,
      fontSize: 14, fontWeight: 600, color: E.limeText,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      You&apos;re on the list — we&apos;ll be in touch.
    </div>
  );
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, width: "100%", maxWidth: 440 }}>
      <input
        type="email" required placeholder="Enter your work email"
        value={email} onChange={e => setEmail(e.target.value)}
        style={{
          flex: 1, height: 48, padding: "0 16px", borderRadius: 8,
          border: `1.5px solid ${E.border2}`, background: E.bg,
          color: E.text, fontSize: 14, fontFamily: "inherit", minWidth: 0,
          outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={e => { e.target.style.borderColor = E.limeText; e.target.style.boxShadow = "0 0 0 3px rgba(200,255,0,0.15)"; }}
        onBlur={e => { e.target.style.borderColor = E.border2; e.target.style.boxShadow = "none"; }}
      />
      <button type="submit" disabled={state === "loading"} style={{
        height: 48, padding: "0 22px", borderRadius: 8, border: "none",
        background: E.text, color: "#fff", fontWeight: 700, fontSize: 14,
        cursor: state === "loading" ? "wait" : "pointer", whiteSpace: "nowrap",
        fontFamily: "inherit", letterSpacing: "-0.01em", flexShrink: 0,
        opacity: state === "loading" ? 0.7 : 1, transition: "opacity 0.2s, transform 0.15s",
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "none")}
      >
        {state === "loading" ? "Joining…" : "Join waitlist →"}
      </button>
    </form>
  );
}

/* ─── Bento card wrapper ─────────────────────────────────────────────────── */
function BCard({ children, style = {}, accent = false }: {
  children: React.ReactNode; style?: React.CSSProperties; accent?: boolean;
}) {
  return (
    <div style={{
      borderRadius: 16, border: `1px solid ${accent ? "rgba(200,255,0,0.5)" : E.border}`,
      background: accent ? E.lime : E.bg,
      padding: 24, overflow: "hidden", position: "relative",
      transition: "box-shadow 0.2s, transform 0.2s",
      ...style,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >{children}</div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function V14() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: E.bg, color: E.text, overflowX: "hidden" }}>
      <style>{`
        @keyframes v14-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes v14-ping {
          0%  { transform: scale(1); opacity: 0.7; }
          100%{ transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 56,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${E.border}`,
      }}>
        <a href="/" style={{ color: E.text, textDecoration: "none", fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em" }}>
          neatr<span style={{ color: E.limeText }}>.ai</span>
        </a>
        <div style={{ display: "flex", gap: 28, fontSize: 13, color: E.text2 }}>
          {["Features","How it works"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = E.text)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = E.text2)}
            >{l}</a>
          ))}
        </div>
        <a href="#waitlist" style={{
          padding: "8px 18px", border: `1.5px solid ${E.text}`,
          color: E.text, borderRadius: 8, fontSize: 13, fontWeight: 700,
          textDecoration: "none", transition: "background 0.15s, color 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = E.text; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = E.text; }}
        >Get early access</a>
      </nav>

      {/* HERO */}
      <section style={{ padding: "120px 80px 0", position: "relative", overflow: "hidden" }}>
        {/* subtle dot grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle, ${E.border} 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px", opacity: 0.6,
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          {/* headline */}
          <div style={{ maxWidth: 800, marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: E.lime, color: E.limeText,
              borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700,
              marginBottom: 28, letterSpacing: "0.04em",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: E.limeText, position: "relative" }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: E.limeText, animation: "v14-ping 1.4s ease-out infinite" }} />
              </span>
              Early access — now open
            </div>
            <h1 style={{
              fontSize: "clamp(52px,6.5vw,96px)", fontWeight: 700,
              lineHeight: 1.0, letterSpacing: "-0.045em", margin: "0 0 24px",
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)",
              fontStyle: "italic",
            }}>
              Your business.<br />On autopilot.
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: E.text2, maxWidth: 520 }}>
              neatr.ai handles your entire booking pipeline — online booking, team dispatch, payments, and follow-ups — so you can focus on growing.
            </p>
          </div>

          {/* BENTO GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "200px 200px", gap: 12, marginBottom: 80 }}>

            {/* Big card: live ops feed */}
            <BCard style={{ gridRow: "1 / 3", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: E.text3, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Live ops feed</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Booking pipeline</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#22C55E", background: "rgba(34,197,94,0.08)", padding: "4px 10px", borderRadius: 20 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                  LIVE
                </div>
              </div>
              <MiniFeed />
            </BCard>

            {/* Top mid: bookings counter */}
            <BCard accent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: E.limeText, letterSpacing: "0.06em", textTransform: "uppercase" }}>Waitlist</div>
              <div>
                <div style={{ fontSize: 52, fontWeight: 800, color: E.limeText, letterSpacing: "-0.05em", lineHeight: 1 }}>
                  <Counter to={500} suffix="+" />
                </div>
                <div style={{ fontSize: 13, color: E.limeText, opacity: 0.7, marginTop: 4 }}>businesses signed up</div>
              </div>
            </BCard>

            {/* Top right: setup time */}
            <BCard style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: E.text }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Setup time</div>
              <div>
                <div style={{ fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>{"< 5"}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>minutes to go live</div>
              </div>
            </BCard>

            {/* Bottom mid: AI dispatch */}
            <BCard style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: E.text3, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>AI dispatch</div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>Right person,<br />right time.</div>
              </div>
              <div style={{ display: "flex", gap: -8 }}>
                {["M","J","A","K"].map((l, i) => (
                  <div key={l} style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: ["#22C55E","#3B82F6","#F59E0B","#8B5CF6"][i],
                    border: `2px solid ${E.bg}`, marginLeft: i > 0 ? -8 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "#fff",
                  }}>{l}</div>
                ))}
                <div style={{ marginLeft: 8, fontSize: 12, color: E.text2, display: "flex", alignItems: "center" }}>Auto-matched</div>
              </div>
            </BCard>

            {/* Bottom right: automation */}
            <BCard style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: E.text3, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Automations</div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>Runs itself,<br />24/7.</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Confirm booking","Dispatch team","Send follow-up"].map((a, i) => (
                  <div key={a} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: E.text2 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: E.lime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={E.limeText} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {a}
                    <span style={{ marginLeft: "auto", fontSize: 10, color: E.text3, fontStyle: "italic" }}>auto</span>
                  </div>
                ))}
              </div>
            </BCard>
          </div>

          {/* CTA below bento */}
          <div style={{ paddingBottom: 100 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <WaitlistForm />
              <a href="#demo" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "0 20px", height: 48, borderRadius: 8,
                border: `1.5px solid ${E.border2}`, color: E.text2,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = E.text; e.currentTarget.style.color = E.text; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = E.border2; e.currentTarget.style.color = E.text2; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                See it live
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: E.bg2, borderTop: `1px solid ${E.border}`, padding: "100px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: E.text3, marginBottom: 16, textTransform: "uppercase" }}>Features</p></Reveal>
          <Reveal delay={40}>
            <h2 style={{
              fontSize: "clamp(32px,3.5vw,56px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 80px",
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)",
              fontStyle: "italic",
            }}>
              Everything a service<br />business needs.
            </h2>
          </Reveal>

          {/* Feature rows */}
          {[
            {
              label: "Booking",
              title: "One form. Fully automated.",
              body: "Customers book from any device, any time. Your calendar fills automatically, confirmations go out instantly — invoices follow after the job.",
              items: ["Self-service booking widget","24/7 availability","Post-job invoicing","Instant confirmations"],
              flip: false,
            },
            {
              label: "Dispatch",
              title: "AI assigns the right person.",
              body: "Define your rules once. The moment a booking lands, neatr.ai matches the right team member by availability, location, and skill — and notifies them automatically.",
              items: ["AI availability matching","Location-based routing","Instant SMS/email notifications","Real-time dashboard view"],
              flip: true,
            },
            {
              label: "Follow-up",
              title: "Retention on autopilot.",
              body: "After every job, review requests go out, rebooking nudges fire at the right interval, and your best customers stay engaged — without you lifting a finger.",
              items: ["Automated review requests","Smart rebooking reminders","Customer portal access","Recurring booking management"],
              flip: false,
            },
          ].map(({ label, title, body, items, flip }, idx) => (
            <Reveal key={label} delay={idx * 80}>
              <div style={{
                display: "grid", gridTemplateColumns: flip ? "1fr 1.3fr" : "1.3fr 1fr",
                gap: 80, alignItems: "center",
                marginBottom: idx < 2 ? 80 : 0,
                paddingBottom: idx < 2 ? 80 : 0,
                borderBottom: idx < 2 ? `1px solid ${E.border}` : "none",
              }}>
                {flip && (
                  <div style={{
                    borderRadius: 16, border: `1px solid ${E.border}`,
                    background: E.bg, height: 280, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, color: E.text3,
                    order: flip ? -1 : 1,
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
                      <div>Auto-dispatch active</div>
                    </div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: E.text3, marginBottom: 16, textTransform: "uppercase" }}>{label}</div>
                  <h3 style={{
                    fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 700, lineHeight: 1.1,
                    letterSpacing: "-0.03em", margin: "0 0 16px",
                  }}>{title}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: E.text2, margin: "0 0 28px" }}>{body}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {items.map(it => (
                      <div key={it} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 5, background: E.lime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={E.limeText} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize: 14, color: E.text2 }}>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {!flip && (
                  <div style={{
                    borderRadius: 16, border: `1px solid ${E.border}`,
                    background: E.bg, height: 280, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ textAlign: "center", color: E.text3 }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>{idx === 0 ? "📅" : "🔔"}</div>
                      <div style={{ fontSize: 13 }}>{idx === 0 ? "Booking flow" : "Follow-up automation"}</div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="demo" style={{ background: E.bg3, borderTop: `1px solid ${E.border}`, padding: "100px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: E.text3, marginBottom: 16, textTransform: "uppercase", textAlign: "center" }}>Demo</p>
          </Reveal>
          <Reveal delay={40}>
            <h2 style={{
              fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 700, lineHeight: 1.1,
              letterSpacing: "-0.04em", margin: "0 0 12px", textAlign: "center",
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)",
              fontStyle: "italic",
            }}>
              The real booking flow — try it.
            </h2>
          </Reveal>
          <Reveal delay={80}><p style={{ fontSize: 16, color: E.text2, textAlign: "center", margin: "0 0 48px" }}>Pick a service, choose a slot. This is what your customers see.</p></Reveal>
          <Reveal delay={120}>
            <div style={{ border: `1px solid ${E.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 60px rgba(0,0,0,0.07)" }}>
              <div style={{ height: 36, background: E.bg2, borderBottom: `1px solid ${E.border}`, display: "flex", alignItems: "center", gap: 6, padding: "0 14px" }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                <span style={{ marginLeft: 8, height: 18, flex: 1, maxWidth: 200, background: E.border, borderRadius: 4, fontSize: 10, color: E.text3, display: "flex", alignItems: "center", paddingLeft: 8 }}>neatr.ai/booking</span>
              </div>
              <iframe src="/booking" style={{ width: "100%", height: 520, border: "none", background: "#fff", display: "block" }} title="neatr.ai booking flow" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" style={{ background: E.text, padding: "120px 80px", position: "relative", overflow: "hidden" }}>
        {/* lime accent splash */}
        <div aria-hidden style={{
          position: "absolute", top: -200, right: -200,
          width: 500, height: 500, borderRadius: "50%",
          background: E.lime, opacity: 0.12,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <h2 style={{
              fontSize: "clamp(36px,5vw,72px)", fontWeight: 700, lineHeight: 1.0,
              letterSpacing: "-0.045em", color: "#fff", margin: "0 0 24px",
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond', Georgia, serif)",
              fontStyle: "italic",
            }}>
              Be first<br />when we launch.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", margin: "0 0 48px", lineHeight: 1.65 }}>
              Join 500+ service businesses on the waitlist. Early members get free access and locked-in pricing.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <form onSubmit={e => { e.preventDefault(); }} style={{ display: "flex", gap: 8, width: "100%", maxWidth: 440 }}>
                <input
                  type="email" required placeholder="Enter your work email"
                  style={{
                    flex: 1, height: 50, padding: "0 18px", borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)",
                    color: "#fff", fontSize: 15, fontFamily: "inherit", minWidth: 0,
                    outline: "none",
                  }}
                  onFocus={e => { e.target.style.borderColor = E.lime; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; }}
                />
                <button type="submit" style={{
                  height: 50, padding: "0 22px", borderRadius: 8, border: "none",
                  background: E.lime, color: E.limeText, fontWeight: 700, fontSize: 15,
                  cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
                }}>Join waitlist →</button>
              </form>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
              {["Free early access","No credit card","Be first to launch"].map(t => (
                <span key={t} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={E.lime} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: E.bg2, borderTop: `1px solid ${E.border}`, padding: "36px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ color: E.text, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            neatr<span style={{ color: E.limeText }}>.ai</span>
          </a>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: E.text3 }}>
            {["Privacy","Security","Terms"].map(l => (
              <a key={l} href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 12, color: E.text3 }}>© 2026 neatr.ai</span>
        </div>
      </footer>
    </div>
  );
}
