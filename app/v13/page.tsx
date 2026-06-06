"use client";

import { useEffect, useRef, useState } from "react";

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const W = {
  bg:     "#F9F7F3",
  bg2:    "#FFFFFF",
  bg3:    "#F0EDE7",
  border: "#E5E0D8",
  border2:"#D0C9BF",
  text:   "#1A1610",
  text2:  "#5C5448",
  text3:  "#9A9088",
  green:  "#22C55E",
  green2: "#16A34A",
  greenBg:"rgba(34,197,94,0.08)",
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
      { threshold: 0.05, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ─── Floating notification cards ────────────────────────────────────────── */
type Notif = { icon: string; title: string; sub: string; color: string; delay: number; top: string; right: string };

const NOTIFS: Notif[] = [
  { icon: "📥", title: "New booking!",        sub: "Sarah M. · Deep clean · $185",  color: W.green, delay: 0.4,  top: "8%",  right: "-10%" },
  { icon: "⚡", title: "Team dispatched",     sub: "Maria L. assigned · 0.8 mi",    color: "#3B82F6", delay: 2.2, top: "36%", right: "-6%"  },
  { icon: "✅", title: "Job complete!",        sub: "Follow-up sent automatically",  color: W.green, delay: 4.0,  top: "64%", right: "-12%" },
];

function FloatingNotif({ icon, title, sub, color, delay, top, right }: Notif) {
  return (
    <div style={{
      position: "absolute", top, right,
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px", borderRadius: 12,
      background: W.bg2, border: `1px solid ${W.border}`,
      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      fontSize: 12, whiteSpace: "nowrap",
      animation: `v13-notif-float 4s ${delay}s ease-in-out infinite`,
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 700, color: W.text, marginBottom: 1 }}>{title}</div>
        <div style={{ color: W.text2, fontSize: 11 }}>{sub}</div>
      </div>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
    </div>
  );
}

/* ─── App preview card ───────────────────────────────────────────────────── */
function AppCard() {
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(8);

  useEffect(() => {
    const t1 = setTimeout(() => { setPhase(1); setCount(9); }, 1200);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => setPhase(3), 3600);
    const t4 = setTimeout(() => { setPhase(0); setCount(8); }, 5600);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [phase === 0 ? count : -1]);

  return (
    <div style={{
      background: W.bg2, borderRadius: 20, border: `1px solid ${W.border}`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.10)", overflow: "hidden",
    }}>
      {/* top bar */}
      <div style={{ height: 44, background: W.bg, borderBottom: `1px solid ${W.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        </div>
        <span style={{ fontSize: 11, color: W.text3, fontWeight: 500 }}>neatr.ai · dashboard</span>
        <div style={{ width: 9 }} />
      </div>

      <div style={{ padding: "16px" }}>
        {/* stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { label: "Jobs today", value: String(count), color: W.green },
            { label: "Revenue", value: "$2,840", color: "#3B82F6" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ padding: "12px", borderRadius: 10, background: W.bg, border: `1px solid ${W.border}` }}>
              <div style={{ fontSize: 10, color: W.text3, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color, letterSpacing: "-0.03em", transition: "color 0.3s" }}>{value}</div>
            </div>
          ))}
        </div>

        {/* jobs list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { name: "Maria L.", job: "Deep clean · 2 bed", status: phase >= 1 ? "on job" : "available", color: W.green },
            { name: "Jake R.", job: "Move-out clean · 3 bed", status: "assigned", color: "#F59E0B" },
            { name: "Ana C.", job: "Available from 2pm", status: "available", color: W.green },
          ].map(({ name, job, status, color }) => (
            <div key={name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 10px", borderRadius: 8,
              background: W.bg, border: `1px solid ${W.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color }}>{name[0]}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: W.text }}>{name}</div>
                  <div style={{ fontSize: 10, color: W.text3 }}>{job}</div>
                </div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color, background: `${color}15`, padding: "3px 8px", borderRadius: 6, transition: "all 0.4s" }}>{status}</span>
            </div>
          ))}
        </div>

        {/* pipeline bar */}
        <div style={{ marginTop: 12, padding: "10px", borderRadius: 8, background: W.bg, border: `1px solid ${W.border}` }}>
          <div style={{ fontSize: 10, color: W.text3, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Pipeline</div>
          <div style={{ display: "flex", gap: 4 }}>
            {["Received","Scheduled","Dispatched","Done","Invoiced"].map((s, i) => (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 4, borderRadius: 2, background: phase > i ? W.green : W.bg3, transition: "background 0.5s" }} />
                <div style={{ fontSize: 8, color: phase > i ? W.text2 : W.text3, marginTop: 3, textAlign: "center" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Counter ────────────────────────────────────────────────────────────── */
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

/* ─── Waitlist form ──────────────────────────────────────────────────────── */
function WaitlistForm({ dark = false }: { dark?: boolean }) {
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
      padding: "14px 20px", borderRadius: 100,
      background: dark ? "rgba(34,197,94,0.15)" : W.greenBg,
      border: `1px solid rgba(34,197,94,0.3)`,
      fontSize: 14, fontWeight: 600, color: W.green,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      You&apos;re on the list! We&apos;ll be in touch.
    </div>
  );
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, width: "100%", maxWidth: 440 }}>
      <input
        type="email" required placeholder="Enter your work email"
        value={email} onChange={e => setEmail(e.target.value)}
        style={{
          flex: 1, height: 50, padding: "0 18px", borderRadius: 100,
          border: `1.5px solid ${dark ? "rgba(255,255,255,0.2)" : W.border2}`,
          background: dark ? "rgba(255,255,255,0.1)" : W.bg2,
          color: dark ? "#fff" : W.text, fontSize: 15, fontFamily: "inherit", minWidth: 0,
          outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={e => { e.target.style.borderColor = W.green; e.target.style.boxShadow = `0 0 0 3px rgba(34,197,94,0.12)`; }}
        onBlur={e => { e.target.style.borderColor = dark ? "rgba(255,255,255,0.2)" : W.border2; e.target.style.boxShadow = "none"; }}
      />
      <button type="submit" disabled={state === "loading"} style={{
        height: 50, padding: "0 24px", borderRadius: 100, border: "none",
        background: W.green, color: "#fff", fontWeight: 700, fontSize: 15,
        cursor: state === "loading" ? "wait" : "pointer", whiteSpace: "nowrap",
        fontFamily: "inherit", letterSpacing: "-0.01em", flexShrink: 0,
        opacity: state === "loading" ? 0.7 : 1, transition: "background 0.2s, transform 0.15s",
        boxShadow: "0 4px 14px rgba(34,197,94,0.3)",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = W.green2; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = W.green; e.currentTarget.style.transform = "none"; }}
      >
        {state === "loading" ? "Joining…" : "Join waitlist →"}
      </button>
    </form>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function V13() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: W.bg, color: W.text, overflowX: "hidden" }}>
      <style>{`
        @keyframes v13-notif-float {
          0%,100% { transform: translateY(0px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
          50%      { transform: translateY(-8px); box-shadow: 0 14px 40px rgba(0,0,0,0.12); }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 60,
        background: "rgba(249,247,243,0.88)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${W.border}`,
      }}>
        <a href="/" style={{ color: W.text, textDecoration: "none", fontWeight: 800, fontSize: 16, letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ display: "inline-block", width: 22, height: 22, borderRadius: 6, background: W.green, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          neatr.ai
        </a>
        <div style={{ display: "flex", gap: 28, fontSize: 13, color: W.text2 }}>
          {["Features","How it works"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = W.text)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = W.text2)}
            >{l}</a>
          ))}
        </div>
        <a href="#waitlist" style={{
          padding: "9px 20px", background: W.green, color: "#fff",
          borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: "none",
          boxShadow: "0 4px 12px rgba(34,197,94,0.25)", transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = W.green2)}
          onMouseLeave={e => (e.currentTarget.style.background = W.green)}
        >Get early access</a>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 80px 80px", overflow: "hidden",
      }}>
        {/* warm radial bg */}
        <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", background: "radial-gradient(ellipse at 80% 30%, rgba(34,197,94,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: "60%", background: "radial-gradient(ellipse at 20% 80%, rgba(251,191,36,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid rgba(34,197,94,0.3)`, background: "rgba(34,197,94,0.07)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: W.green,
              marginBottom: 32, letterSpacing: "0.03em", fontWeight: 600,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: W.green }} />
              Now accepting early signups
            </div>
            <h1 style={{
              fontSize: "clamp(40px,5vw,68px)", fontWeight: 800,
              lineHeight: 1.08, letterSpacing: "-0.04em", margin: "0 0 24px",
            }}>
              The easiest way<br />to run your<br />
              <span style={{
                background: `linear-gradient(135deg, ${W.green}, #16A34A)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>service business.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: W.text2, margin: "0 0 40px", maxWidth: 460 }}>
              Online booking, automatic dispatch, and customer follow-ups — all in one simple platform. Built for cleaning and field service teams.
            </p>
            <WaitlistForm />
            <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
              {["No credit card required","Free to start","Cancel anytime"].map(t => (
                <div key={t} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: W.text3 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={W.green} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: floating app card + notif bubbles */}
          <div style={{ position: "relative", paddingRight: 60 }}>
            <div style={{ animation: "v13-card-float 6s ease-in-out infinite" }}>
              <AppCard />
            </div>
            {NOTIFS.map(n => <FloatingNotif key={n.title} {...n} />)}
            <style>{`
              @keyframes v13-card-float {
                0%,100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ background: W.bg2, borderTop: `1px solid ${W.border}`, borderBottom: `1px solid ${W.border}`, padding: "40px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          {[
            { icon: "⚡", title: "Live in minutes",       body: "Add your services and go. No technical setup, no developer needed." },
            { icon: "📱", title: "Any device, anytime",   body: "Customers book from phone, tablet, or desktop — wherever they are." },
            { icon: "🔄", title: "No long-term contracts", body: "Month to month. Cancel anytime. No questions, no lock-ins." },
            { icon: "🛠️", title: "Built for service teams", body: "Designed specifically for cleaning, maintenance, and field service." },
          ].map(({ icon, title, body }) => (
            <Reveal key={title}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: W.text, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: W.text3, lineHeight: 1.5 }}>{body}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: W.bg, padding: "100px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: W.text3, marginBottom: 16, textTransform: "uppercase" }}>Features</p></Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 64px", maxWidth: 520 }}>
              One platform.<br />Your whole business.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { icon: "📅", title: "Online booking 24/7",       body: "Customers self-book from any device. Your calendar fills automatically — no calls, no texts." },
              { icon: "🤖", title: "AI-powered dispatch",        body: "The moment a booking lands, the right team member gets assigned and notified automatically." },
              { icon: "💳", title: "Post-job invoicing",           body: "Invoices go out automatically after each completed job. No chasing, no awkward calls — payments arrive on their own." },
              { icon: "🗓️", title: "Smart scheduling",           body: "Real-time team calendar with conflict detection, drag-and-drop rescheduling, and availability rules." },
              { icon: "📊", title: "Business analytics",         body: "Revenue, bookings, completion rates, and team performance — all in one clean dashboard." },
              { icon: "🔔", title: "Automated follow-ups",       body: "Review requests, rebooking nudges, and reminders send automatically after every job." },
            ].map(({ icon, title, body }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div style={{
                  padding: "28px", borderRadius: 16,
                  background: W.bg2, border: `1px solid ${W.border}`,
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = W.border; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: W.text2, margin: 0 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section style={{ background: W.bg3, padding: "100px 80px", borderTop: `1px solid ${W.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: W.green, marginBottom: 16, textTransform: "uppercase", textAlign: "center" }}>Live demo</p></Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 12px", textAlign: "center" }}>
              See it in action.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontSize: 16, color: W.text2, textAlign: "center", margin: "0 0 48px" }}>This is the real booking flow — try booking a service.</p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ border: `1px solid ${W.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 60px rgba(0,0,0,0.08)" }}>
              <div style={{ height: 36, background: W.bg2, borderBottom: `1px solid ${W.border}`, display: "flex", alignItems: "center", gap: 6, padding: "0 14px" }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                <span style={{ marginLeft: 8, height: 18, flex: 1, maxWidth: 220, background: W.border, borderRadius: 4, fontSize: 10, color: W.text3, display: "flex", alignItems: "center", paddingLeft: 8 }}>neatr.ai/booking</span>
              </div>
              <iframe src="/booking" style={{ width: "100%", height: 520, border: "none", background: "#fff", display: "block" }} title="neatr.ai booking flow" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: W.bg2, padding: "100px 80px", borderTop: `1px solid ${W.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: W.text3, marginBottom: 16, textTransform: "uppercase" }}>How it works</p></Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 64px", maxWidth: 500 }}>
              From setup to first booking<br />in under 5 minutes.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
            {[
              { n: "1", title: "Set up your page",    body: "Add your services, pricing, and availability. Your booking page is live and shareable instantly." },
              { n: "2", title: "Customers book",       body: "They pick a service and choose a slot — 24/7, from any device, no back-and-forth." },
              { n: "3", title: "Team dispatched",      body: "The right person gets notified immediately. No manual assignment, no missed bookings." },
              { n: "4", title: "Runs itself",          body: "Follow-up emails, review requests, and rebooking reminders go out automatically after each job." },
            ].map(({ n, title, body }, i) => (
              <Reveal key={n} delay={i * 80}>
                <div>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `rgba(34,197,94,0.10)`, border: `1px solid rgba(34,197,94,0.25)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 800, color: W.green, marginBottom: 20,
                  }}>{n}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: W.text2, margin: 0 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" style={{ background: W.green, padding: "120px 80px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 20px" }}>
              Ready to stop doing everything manually?
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", margin: "0 0 48px", lineHeight: 1.65 }}>
              Join 500+ service businesses on the waitlist. Early members get free access and locked-in pricing.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WaitlistForm dark />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: W.bg3, borderTop: `1px solid ${W.border}`, padding: "36px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ color: W.text, textDecoration: "none", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-flex", width: 18, height: 18, borderRadius: 5, background: W.green, alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            neatr.ai
          </a>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: W.text3 }}>
            {["Privacy","Security","Terms"].map(l => (
              <a key={l} href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 12, color: W.text3 }}>© 2026 neatr.ai</span>
        </div>
      </footer>
    </div>
  );
}
