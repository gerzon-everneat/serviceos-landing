"use client";

import { useEffect, useRef, useState } from "react";

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const D = {
  bg:      "#060606",
  bg2:     "#0C0C0C",
  bg3:     "#111111",
  border:  "rgba(255,255,255,0.07)",
  border2: "rgba(255,255,255,0.12)",
  text:    "#FFFFFF",
  text2:   "rgba(255,255,255,0.55)",
  text3:   "rgba(255,255,255,0.28)",
  lime:    "#C8FF00",
  lime2:   "#A8D800",
};

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 24 }: {
  children: React.ReactNode; delay?: number; y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px 60px 0px" }
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

/* ─── Animated ops feed ───────────────────────────────────────────────────── */
type FeedEntry = { id: number; icon: string; msg: string; tag: string; tagColor: string; time: string };

function LiveFeed() {
  const STREAM: FeedEntry[] = [
    { id: 1, icon: "📥", msg: "New booking — Sarah M. · Deep clean · $185",  tag: "RECEIVED",  tagColor: D.lime,    time: "just now" },
    { id: 2, icon: "🗓️", msg: "Calendar slot reserved · Thu Jun 12 · 10am",  tag: "SCHEDULED", tagColor: "#3B82F6", time: "0s" },
    { id: 3, icon: "🤖", msg: "AI dispatch — matching crew by location",       tag: "DISPATCH",   tagColor: "#F59E0B", time: "0s" },
    { id: 4, icon: "👤", msg: "Maria L. assigned · 0.8 mi · 4.9★",            tag: "ASSIGNED",   tagColor: "#8B5CF6", time: "0s" },
    { id: 5, icon: "✉️", msg: "Confirmation sent to customer + calendar",      tag: "NOTIFIED",   tagColor: "#EC4899", time: "0s" },
    { id: 6, icon: "💳", msg: "Job complete · Invoice sent automatically",     tag: "INVOICED",   tagColor: D.lime,    time: "0s" },
  ];
  const [log, setLog] = useState<FeedEntry[]>([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STREAM.forEach((ev, i) => {
      timers.push(setTimeout(() => {
        setLog(prev => [{ ...ev, time: i === 0 ? "just now" : "0s" }, ...prev].slice(0, 8));
      }, 600 + i * 900));
    });
    timers.push(setTimeout(() => {
      setLog([]); setCycle(c => c + 1);
    }, 600 + STREAM.length * 900 + 2000));
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  return (
    <div style={{
      background: D.bg2, border: `1px solid ${D.border2}`,
      borderRadius: 12, overflow: "hidden", fontFamily: "monospace",
    }}>
      {/* title bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", borderBottom: `1px solid ${D.border}`,
        background: D.bg3,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        </div>
        <span style={{ fontSize: 10, color: D.text3, letterSpacing: "0.08em" }}>neatr.ai · live ops</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: D.lime, boxShadow: `0 0 6px ${D.lime}` }} />
          <span style={{ fontSize: 10, color: D.lime, letterSpacing: "0.04em" }}>LIVE</span>
        </div>
      </div>

      {/* feed */}
      <div style={{ padding: "12px 0", minHeight: 320, display: "flex", flexDirection: "column", gap: 0 }}>
        {log.length === 0 && (
          <div style={{ padding: "40px 16px", textAlign: "center", color: D.text3, fontSize: 12 }}>
            Waiting for next booking…
          </div>
        )}
        {log.map((e, i) => (
          <div key={e.id} style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            padding: "8px 14px",
            background: i === 0 ? "rgba(200,255,0,0.04)" : "transparent",
            borderLeft: i === 0 ? `2px solid ${D.lime}` : "2px solid transparent",
            animation: i === 0 ? "v12-slidein 0.35s cubic-bezier(0.16,1,0.3,1)" : "none",
          }}>
            <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{e.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                  color: e.tagColor, background: `${e.tagColor}18`,
                  padding: "1px 6px", borderRadius: 3, flexShrink: 0,
                }}>{e.tag}</span>
                <span style={{ fontSize: 10, color: D.text3, flexShrink: 0 }}>{e.time}</span>
              </div>
              <div style={{ fontSize: 11, color: i === 0 ? D.text : D.text2, lineHeight: 1.4 }}>{e.msg}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes v12-slidein {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes v12-pulse {
          0%,100% { opacity: 0.25; } 50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Grain overlay ──────────────────────────────────────────────────────── */
function Grain() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      opacity: 0.025,
    }} />
  );
}

/* ─── Lime glow blob ─────────────────────────────────────────────────────── */
function GlowBlobs() {
  return (
    <>
      <div aria-hidden style={{
        position: "absolute", top: "-20%", right: "-5%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(200,255,0,0.09) 0%, transparent 65%)",
        animation: "v12-blob1 16s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-30%", left: "-8%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 65%)",
        animation: "v12-blob2 20s ease-in-out infinite", pointerEvents: "none",
      }} />
      <style>{`
        @keyframes v12-blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-30px,40px) scale(1.05); }
          70% { transform: translate(20px,-20px) scale(0.97); }
        }
        @keyframes v12-blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-30px) scale(1.06); }
          66% { transform: translate(-20px,25px) scale(0.95); }
        }
      `}</style>
    </>
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
      padding: "14px 22px", borderRadius: 8,
      background: "rgba(200,255,0,0.08)", border: `1px solid rgba(200,255,0,0.3)`,
      fontSize: 14, fontWeight: 600, color: D.lime,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      You&apos;re on the list — we&apos;ll be in touch.
    </div>
  );
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, width: "100%", maxWidth: 440 }}>
      <input
        type="email" required placeholder="work@company.com"
        value={email} onChange={e => setEmail(e.target.value)}
        style={{
          flex: 1, height: 46, padding: "0 16px", borderRadius: 8,
          border: `1px solid ${D.border2}`, background: "rgba(255,255,255,0.05)",
          color: D.text, fontSize: 14, fontFamily: "inherit", minWidth: 0,
          outline: "none", transition: "border-color 0.2s",
        }}
        onFocus={e => (e.target.style.borderColor = D.lime)}
        onBlur={e => (e.target.style.borderColor = D.border2)}
      />
      <button type="submit" disabled={state === "loading"} style={{
        height: 46, padding: "0 22px", borderRadius: 8, border: "none",
        background: D.lime, color: "#0a1a00", fontWeight: 700, fontSize: 14,
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

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function V12() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: D.bg, color: D.text, overflowX: "hidden" }}>
      <Grain />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 56,
        borderBottom: `1px solid ${D.border}`,
        background: "rgba(6,6,6,0.8)", backdropFilter: "blur(16px)",
      }}>
        <a href="/" style={{ color: D.text, textDecoration: "none", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: D.lime, boxShadow: `0 0 8px ${D.lime}` }} />
          neatr.ai
        </a>
        <div style={{ display: "flex", gap: 28, fontSize: 13, color: D.text2 }}>
          {["Features","How it works"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = D.text)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = D.text2)}
            >{l}</a>
          ))}
        </div>
        <a href="#waitlist" style={{
          padding: "7px 16px", background: D.lime, color: "#0a1a00",
          borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none",
          letterSpacing: "-0.01em", transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >Get early access</a>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 80px 80px", overflow: "hidden",
      }}>
        <GlowBlobs />
        {/* subtle grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid rgba(200,255,0,0.3)`, background: "rgba(200,255,0,0.07)",
              borderRadius: 20, padding: "4px 12px", fontSize: 11, color: D.lime,
              marginBottom: 28, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: D.lime, animation: "v12-pulse 1.5s ease-in-out infinite" }} />
              Early access open
            </div>
            <h1 style={{
              fontSize: "clamp(44px,5.5vw,76px)", fontWeight: 800,
              lineHeight: 1.0, letterSpacing: "-0.045em", margin: "0 0 24px",
            }}>
              Bookings in.<br />
              Jobs dispatched.<br />
              <span style={{ color: D.lime }}>You just grow.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: D.text2, margin: "0 0 40px", maxWidth: 460 }}>
              neatr.ai automates your entire booking pipeline — from the first click to the final follow-up. No spreadsheets. No back-and-forth. No chasing payments.
            </p>
            <WaitlistForm />
            <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
              {[
                { n: "500+", l: "on the waitlist" },
                { n: "50K+", l: "bookings queued" },
                { n: "< 5 min", l: "to set up" },
              ].map(({ n, l }) => (
                <div key={n}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: D.lime, letterSpacing: "-0.03em", fontFamily: "monospace" }}>{n}</div>
                  <div style={{ fontSize: 12, color: D.text3, marginTop: 3, letterSpacing: "0.02em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <LiveFeed />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: D.bg2, padding: "100px 80px", borderTop: `1px solid ${D.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: D.text3, marginBottom: 16, textTransform: "uppercase", fontFamily: "monospace" }}>Features</p>
          </Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 64px", maxWidth: 520 }}>
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: D.border }}>
            {[
              { icon: "📥", title: "Online booking, 24/7",       body: "Customers self-book any time. Your calendar fills automatically. Zero back-and-forth." },
              { icon: "🤖", title: "AI team dispatch",            body: "The right team member gets assigned and notified the moment a booking lands." },
              { icon: "💳", title: "Invoicing after each job",      body: "Invoices go out automatically when a job is marked complete. No chasing, no awkward calls." },
              { icon: "🗓️", title: "Smart scheduling",            body: "Real-time calendar with conflict detection. Drag-and-drop rescheduling." },
              { icon: "📊", title: "Business dashboard",          body: "Revenue, booking status, team performance, and retention — all in one view." },
              { icon: "🔔", title: "Automated follow-ups",        body: "Review requests, rebooking nudges, and appointment reminders send themselves." },
            ].map(({ icon, title, body }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div style={{
                  padding: "36px 28px", background: D.bg2,
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = D.bg3)}
                  onMouseLeave={e => (e.currentTarget.style.background = D.bg2)}
                >
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.015em" }}>{title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: D.text2, margin: 0 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: D.bg, padding: "100px 80px", borderTop: `1px solid ${D.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: D.text3, marginBottom: 16, textTransform: "uppercase", fontFamily: "monospace" }}>How it works</p>
          </Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 80px" }}>
              Live in under 5 minutes.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
            {/* connector line */}
            <div aria-hidden style={{
              position: "absolute", top: 20, left: "12.5%", right: "12.5%", height: 1,
              background: `linear-gradient(to right, ${D.lime}40, ${D.lime}40)`,
            }} />
            {[
              { n: "01", title: "Set up your page",    body: "Define services, pricing, availability. Share the link or embed it." },
              { n: "02", title: "Customer books",       body: "They pick a service, choose a slot, and confirm — 24/7, from any device." },
              { n: "03", title: "Team dispatched",      body: "Right person, notified instantly. You see it all on your dashboard." },
              { n: "04", title: "Follows up itself",    body: "Review requests and rebooking reminders send automatically." },
            ].map(({ n, title, body }, i) => (
              <Reveal key={n} delay={i * 80}>
                <div style={{ padding: "0 24px", textAlign: "center" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: `1px solid ${D.lime}40`, background: `${D.lime}10`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", fontSize: 12, fontWeight: 700,
                    color: D.lime, fontFamily: "monospace", letterSpacing: "0.06em",
                    zIndex: 1, position: "relative",
                  }}>{n}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: D.text2, margin: 0 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section id="demo" style={{ background: D.bg2, padding: "100px 80px", borderTop: `1px solid ${D.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: D.lime, marginBottom: 16, textTransform: "uppercase", fontFamily: "monospace", textAlign: "center" }}>Live demo</p>
          </Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 12px", textAlign: "center" }}>
              This is the real booking flow.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontSize: 16, color: D.text2, textAlign: "center", margin: "0 0 48px" }}>
              Try it — pick a service, pick a time.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ border: `1px solid ${D.border2}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
              <div style={{ height: 36, background: D.bg3, borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", gap: 6, padding: "0 14px" }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                <span style={{ marginLeft: 10, height: 18, flex: 1, maxWidth: 200, background: D.border2, borderRadius: 4, fontSize: 10, color: D.text3, display: "flex", alignItems: "center", paddingLeft: 8, fontFamily: "monospace" }}>neatr.ai/booking</span>
              </div>
              <iframe src="/booking" style={{ width: "100%", height: 520, border: "none", background: "#fff", display: "block" }} title="neatr.ai booking flow" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" style={{ background: D.bg2, padding: "120px 80px", borderTop: `1px solid ${D.border}`, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(200,255,0,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.045em", margin: "0 0 20px" }}>
              Be first<br />when we launch.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: 17, color: D.text2, margin: "0 0 48px", lineHeight: 1.65 }}>
              Join 500+ home service businesses on the waitlist. Early members get free access and locked-in pricing.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WaitlistForm />
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 24, fontSize: 12, color: D.text3, fontFamily: "monospace", letterSpacing: "0.02em" }}>
              {["Free early access","No credit card","Cancel anytime"].map(t => (
                <span key={t} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.lime} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: D.bg, borderTop: `1px solid ${D.border}`, padding: "36px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.02em" }}>
            <span style={{ color: D.lime }}>●</span> neatr.ai
          </span>
          <div style={{ display: "flex", gap: 24, fontSize: 12, color: D.text3 }}>
            {["Privacy","Security","Terms"].map(l => (
              <a key={l} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = D.text2)}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = D.text3)}
              >{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 12, color: D.text3, fontFamily: "monospace" }}>© 2026 neatr.ai</span>
        </div>
      </footer>
    </div>
  );
}
