"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const LIGHT = {
  bg:      "#FFFFFF",  bg2: "#F5F5F3",  bg3: "#EEEEEB",
  border:  "#E5E7EB",  border2: "#D1D5DB",
  text:    "#0A0A0A",  text2: "rgba(0,0,0,0.55)",  text3: "rgba(0,0,0,0.38)",
  green:   "#22C55E",  green2: "#16A34A",
};
const DARK = {
  bg:      "#0A0A0A",  bg2: "#111111",  bg3: "#161616",
  border:  "rgba(255,255,255,0.08)",  border2: "rgba(255,255,255,0.14)",
  text:    "#FFFFFF",  text2: "rgba(255,255,255,0.55)",  text3: "rgba(255,255,255,0.32)",
  green:   "#22C55E",  green2: "#16A34A",
};
type Tok = typeof LIGHT;

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, from = "bottom", style }: {
  children: React.ReactNode; delay?: number; from?: "bottom" | "left" | "right"; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const t = from === "left" ? "translateX(-24px)" : from === "right" ? "translateX(24px)" : "translateY(20px)";
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0, transform: on ? "none" : t,
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ─── Grid bg ────────────────────────────────────────────────────────────── */
function GridBg({ opacity = 0.06, dark = false }: { opacity?: number; dark?: boolean }) {
  const ch = dark ? "255,255,255" : "0,0,0";
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(to right,rgba(${ch},${opacity}) 1px,transparent 1px),linear-gradient(to bottom,rgba(${ch},${opacity}) 1px,transparent 1px)`,
      backgroundSize: "80px 80px",
    }} />
  );
}

/* ─── Live activity feed ─────────────────────────────────────────────────── */
function HeroViz({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef   = useRef(dark);
  useEffect(() => { darkRef.current = dark; }, [dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, W = 0, H = 0, frame = 0;

    type Ev = { color: string; sym: string; title: string; detail: string; addedAt: number };

    const NAMES = ["Sarah K.", "Tom R.", "Liu M.", "Maya P.", "Ben C."];
    const SVCS  = ["Deep Clean", "Move-out", "Handyman", "Regular Clean"];
    const PROVS = ["Alex M.", "Sam L.", "Pat D."];
    const AMTS  = ["$180", "$320", "$95", "$210"];
    const SLOTS = ["Mon 10am", "Tue 2pm", "Thu 3pm", "Fri 11am"];

    const TEMPLATES = [
      () => { const n=NAMES[Math.random()*5|0],s=SVCS[Math.random()*4|0],t=SLOTS[Math.random()*4|0]; return { color:"#22C55E", sym:"✓", title:"Booking confirmed",   detail:`${n} · ${s} · ${t}` }; },
      () => { const p=PROVS[Math.random()*3|0]; return { color:"#3B82F6", sym:"→", title:"Job dispatched",      detail:`${p} · en route` }; },
      () => { const p=PROVS[Math.random()*3|0]; return { color:"#F59E0B", sym:"→", title:"Provider assigned",   detail:`${p} notified via app` }; },
      () => { const n=NAMES[Math.random()*5|0]; return { color:"#8B5CF6", sym:"◷", title:"Reminder sent",       detail:`${n} · 24h notice · SMS` }; },
      () => { const s=SVCS[Math.random()*4|0]; return { color:"#22C55E", sym:"✓", title:"Job completed",        detail:`${s} · rated 5 stars` }; },
    ];

    const events: Ev[] = [];
    let nextSpawn = 30;
    let tplIdx = 0;

    const spawn = () => {
      const tpl = TEMPLATES[tplIdx % TEMPLATES.length]();
      tplIdx++;
      events.unshift({ ...tpl, addedAt: frame });
      if (events.length > 7) events.length = 7;
      nextSpawn = frame + 175;
    };

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      const TEXT  = "#F0F0F0";
      const TEXT2 = "rgba(255,255,255,0.40)";
      const SEP   = "rgba(255,255,255,0.07)";
      const HDR_H = 46;
      const ROW_H = 70;
      const PX    = 20;

      if (frame >= nextSpawn) spawn();

      /* Header */
      ctx.font = "600 13px 'DM Sans',system-ui,sans-serif";
      ctx.fillStyle = TEXT; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillText("Activity", PX, HDR_H / 2);

      const blink = (frame % 80) < 42;
      if (blink) {
        const g = ctx.createRadialGradient(W - PX, HDR_H / 2, 0, W - PX, HDR_H / 2, 9);
        g.addColorStop(0, "rgba(34,197,94,0.4)"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(W - PX, HDR_H / 2, 9, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = "#22C55E"; ctx.beginPath(); ctx.arc(W - PX, HDR_H / 2, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.font = "10px 'DM Mono','Courier New',monospace";
      ctx.fillStyle = "#22C55E"; ctx.textAlign = "right"; ctx.textBaseline = "middle";
      ctx.fillText("LIVE", W - PX - 9, HDR_H / 2);

      ctx.beginPath(); ctx.moveTo(0, HDR_H); ctx.lineTo(W, HDR_H);
      ctx.strokeStyle = SEP; ctx.lineWidth = 1; ctx.stroke();

      /* Rows */
      events.forEach((ev, i) => {
        const age = frame - ev.addedAt;
        const enterA = Math.min(1, age / 14);
        const rowA   = i < 6 ? enterA : Math.max(0, enterA - (age - 20) / 16);
        if (rowA <= 0) return;

        const slide = 1 - Math.max(0, 1 - age / 14);
        const rowY  = HDR_H + i * ROW_H - (1 - slide) * ROW_H * 0.35;

        ctx.save(); ctx.globalAlpha = rowA;

        /* Separator */
        if (i > 0) {
          ctx.beginPath(); ctx.moveTo(PX + 42, rowY); ctx.lineTo(W - PX, rowY);
          ctx.strokeStyle = SEP; ctx.lineWidth = 0.5; ctx.stroke();
        }

        /* Left color strip */
        ctx.fillStyle = ev.color;
        ctx.fillRect(0, rowY, 3, ROW_H);

        /* Icon circle */
        const cx = PX + 16, cy = rowY + ROW_H / 2;
        ctx.fillStyle = ev.color + "20";
        ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fill();
        ctx.font = "bold 11px system-ui,sans-serif";
        ctx.fillStyle = ev.color; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(ev.sym, cx, cy + 1);

        /* Title + detail */
        const tx = PX + 40;
        ctx.font = "600 13px 'DM Sans',system-ui,sans-serif";
        ctx.fillStyle = TEXT; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
        ctx.fillText(ev.title, tx, rowY + ROW_H / 2 - 5);
        ctx.font = "12px 'DM Sans',system-ui,sans-serif";
        ctx.fillStyle = TEXT2;
        ctx.fillText(ev.detail, tx, rowY + ROW_H / 2 + 12);

        /* Timestamp */
        const secs = Math.floor((frame - ev.addedAt) / 60);
        const ts = secs < 1 ? "just now" : `${secs}s ago`;
        ctx.font = "10px 'DM Mono','Courier New',monospace";
        ctx.fillStyle = TEXT2; ctx.textAlign = "right"; ctx.textBaseline = "middle";
        ctx.fillText(ts, W - PX, rowY + ROW_H / 2 - 4);

        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    resize(); draw();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div style={{
      position: "relative", height: 500, borderRadius: 20, overflow: "hidden",
      background: "#0D0D0D",
      border: "1px solid rgba(34,197,94,0.14)",
      boxShadow: "0 0 0 1px rgba(34,197,94,0.06), 0 0 80px rgba(34,197,94,0.12), 0 40px 100px rgba(0,0,0,0.7)",
    }}>
      <canvas ref={canvasRef} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
    </div>
  );
}

/* ─── Browser frame ──────────────────────────────────────────────────────── */
function AppFrame({ src, alt, height = 420, url = "book.everneat.co", T }: { src: string; alt: string; height?: number; url?: string; T: Tok }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", background: T.bg2, boxShadow: "0 16px 60px rgba(0,0,0,0.12)" }}>
      <div style={{ height: 32, background: T.bg3, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 6, padding: "0 12px" }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <span style={{ marginLeft: 8, height: 18, flex: 1, maxWidth: 240, background: T.border, borderRadius: 4, fontSize: 10, color: T.text3, display: "flex", alignItems: "center", paddingLeft: 8 }}>{url}</span>
      </div>
      <div style={{ height, position: "relative", overflow: "hidden" }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

/* ─── Booking demo iframe ────────────────────────────────────────────────── */
function BookingDemo({ T }: { T: Tok }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 50px rgba(0,0,0,0.12)" }}>
      <div style={{ height: 32, background: T.bg3, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 6, padding: "0 12px" }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <span style={{ marginLeft: 8, height: 18, flex: 1, maxWidth: 240, background: T.border, borderRadius: 4, fontSize: 10, color: T.text3, display: "flex", alignItems: "center", paddingLeft: 8 }}>book.everneat.co/booking</span>
      </div>
      <iframe src="http://localhost:4100/booking" style={{ width: "100%", height: 520, border: "none", background: "#fff" }} title="Everneat booking flow" />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function V8() {
  const [dark, setDark]           = useState(false);
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const T = dark ? DARK : LIGHT;

  return (
    <div id="v8-root" style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, color: T.text, overflowX: "hidden" }}>
      <style>{`#v8-root *:not(canvas) { transition: background-color 0.28s, color 0.28s, border-color 0.28s, box-shadow 0.28s; }`}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 56,
        borderBottom: `1px solid ${T.border}`,
        background: "rgba(6,6,6,0.85)",
        backdropFilter: "blur(12px)",
      }}>
        <a href="/" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>[EVERNEAT]</a>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", gap: 28, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            {["Features", "How it works", "Pricing"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ color: "inherit", textDecoration: "none" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#fff")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setDark(d => !d)} aria-label={dark ? "Light mode" : "Dark mode"}
              style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 6, cursor: "pointer", color: "rgba(255,255,255,0.5)" }}
            >{dark ? <SunIcon /> : <MoonIcon />}</button>
            <a href="http://localhost:4100/auth/login" target="_blank" rel="noreferrer"
              style={{ padding: "6px 14px", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 6, fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
            >Sign in</a>
            <a href="#waitlist"
              style={{ padding: "6px 14px", background: T.text, color: T.bg, borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >Get early access</a>
          </div>
        </div>
      </nav>

      {/* HERO — always dark for visual impact */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 64px 80px", overflow: "hidden", background: "#060606" }}>
        <GridBg opacity={0.055} dark={true} />
        {/* Left glow — behind headline */}
        <div aria-hidden style={{ position: "absolute", top: "20%", left: "-5%", width: 700, height: 700, background: "radial-gradient(circle,rgba(34,197,94,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />
        {/* Right glow — behind panel */}
        <div aria-hidden style={{ position: "absolute", top: "15%", right: "0%", width: 900, height: 900, background: "radial-gradient(circle,rgba(34,197,94,0.09) 0%,transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1240, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "5fr 6fr", gap: 72, alignItems: "center" }}>
          <div>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.09)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#22C55E", marginBottom: 32, letterSpacing: "0.04em" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                Early access — now accepting signups
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1 style={{ fontSize: "clamp(42px,5vw,72px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 24px", color: "#FFFFFF" }}>
                Your booking<br />system,<br /><span style={{ color: "#22C55E" }}>automated.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "0 0 40px", maxWidth: 440 }}>
                From online booking to automated team dispatch — Everneat gives cleaning businesses a complete system that runs itself.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <a href="#waitlist"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#22C55E", color: "#fff", borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#16A34A"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#22C55E"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  Join the waitlist
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <a href="#booking-demo"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.6)", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                  See it live
                </a>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {[{ n: "500+", l: "on the waitlist" }, { n: "50K+", l: "bookings to process" }, { n: "4.9★", l: "beta rating" }].map(({ n, l }) => (
                  <div key={n}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.03em" }}>{n}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal from="right" delay={200}><HeroViz dark={dark} /></Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ background: T.bg2, color: T.text, padding: "100px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: T.text3, marginBottom: 24, textTransform: "uppercase" }}>The problem</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal delay={60}><h2 style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: 0, color: T.text }}>The booking<br />feedback loop<br />is broken.</h2></Reveal>
            <div>
              <Reveal delay={100}><p style={{ fontSize: 17, lineHeight: 1.7, color: T.text2, margin: "0 0 32px" }}>Most home service businesses run on a patchwork of Google Sheets, text messages, and manual bank transfers. Every booking takes 20 minutes of back-and-forth. Every payment is chased manually.</p></Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Customers text to book, you reply to confirm, then forget","Spreadsheets don't tell you who's showing up tomorrow","Chasing payments after every job kills your time","No system for recurring customers — they just drift away"].map((t, i) => (
                  <Reveal key={t} delay={140 + i * 40}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: dark ? "rgba(239,68,68,0.15)" : "#FFE4E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </span>
                      <span style={{ fontSize: 15, color: T.text2, lineHeight: 1.55 }}>{t}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="booking-demo" style={{ background: T.bg, padding: "100px 80px", position: "relative", overflow: "hidden" }}>
        <GridBg opacity={0.035} dark={dark} />
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle,rgba(34,197,94,0.05) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "center" }}>
            <div>
              <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: T.green, marginBottom: 24, textTransform: "uppercase" }}>Fix the loop</p></Reveal>
              <Reveal delay={60}><h2 style={{ fontSize: "clamp(30px,3vw,48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 24px", color: T.text }}>One booking form.<br />Everything else<br /><span style={{ color: T.green }}>runs itself.</span></h2></Reveal>
              <Reveal delay={100}><p style={{ fontSize: 16, lineHeight: 1.7, color: T.text2, margin: "0 0 36px" }}>Customers book from any device, pick their service, and confirm in seconds. Your calendar fills automatically. The right team member gets dispatched. You see everything in real time.</p></Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Customer books online",      desc: "24/7, from any device, no back-and-forth" },
                  { label: "Booking confirmed instantly", desc: "Automatic confirmation, zero manual work" },
                  { label: "Team auto-dispatched",        desc: "Right person, right time, right location" },
                  { label: "Follow-ups send themselves",  desc: "Reminders and review requests automated" },
                ].map(({ label, desc }, i) => (
                  <Reveal key={label} delay={140 + i * 40}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 13, color: T.text3 }}>{desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal from="right" delay={160}>
              <BookingDemo T={T} />
              <p style={{ textAlign: "center", fontSize: 12, color: T.text3, marginTop: 12 }}>↑ This is the real booking flow — try it</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section id="features" style={{ background: T.bg2, color: T.text, padding: "100px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "center" }}>
            <Reveal from="left" delay={80}><AppFrame src="/assets/v6-calendar.png" alt="Everneat schedule calendar" height={420} url="book.everneat.co/schedule" T={T} /></Reveal>
            <div>
              <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: T.text3, marginBottom: 24, textTransform: "uppercase" }}>Smart scheduling</p></Reveal>
              <Reveal delay={60}><h2 style={{ fontSize: "clamp(28px,2.8vw,44px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 24px", color: T.text }}>AI scheduling<br />that actually<br />works.</h2></Reveal>
              <Reveal delay={100}><p style={{ fontSize: 16, lineHeight: 1.7, color: T.text2, margin: "0 0 32px" }}>Your calendar auto-populates as bookings come in. AI scheduling routes jobs to the right team member based on availability, location, and skills.</p></Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "📅", title: "Real-time calendar",     body: "See every booking, every provider, every day — at a glance." },
                  { icon: "🤖", title: "AI auto-assign",         body: "Define rules once. The system handles dispatch automatically." },
                  { icon: "🔔", title: "Provider notifications", body: "Team gets SMS/email the moment they're assigned to a job." },
                ].map(({ icon, title, body }, i) => (
                  <Reveal key={title} delay={140 + i * 40}>
                    <div style={{ display: "flex", gap: 14, padding: "16px", border: `1px solid ${T.border}`, borderRadius: 10, background: T.bg }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: T.text }}>{title}</div>
                        <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5 }}>{body}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section style={{ background: T.bg, padding: "100px 80px", position: "relative", overflow: "hidden" }}>
        <GridBg opacity={0.035} dark={dark} />
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: "20%", width: 600, height: 400, background: "radial-gradient(ellipse at bottom,rgba(34,197,94,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "center" }}>
            <div>
              <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: T.green, marginBottom: 24, textTransform: "uppercase" }}>Full visibility</p></Reveal>
              <Reveal delay={60}><h2 style={{ fontSize: "clamp(28px,2.8vw,44px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 24px", color: T.text }}>Production<br />analytics for<br />your business.</h2></Reveal>
              <Reveal delay={100}><p style={{ fontSize: 16, lineHeight: 1.7, color: T.text2, margin: "0 0 36px" }}>Revenue trends, booking status breakdown, team performance, and customer retention — all in one dashboard.</p></Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ label: "Total Bookings", color: "#22C55E" },{ label: "Revenue", color: "#3B82F6" },{ label: "Completion Rate", color: "#F59E0B" },{ label: "Active Customers", color: "#8B5CF6" }].map(({ label, color }, i) => (
                  <Reveal key={label} delay={140 + i * 40}>
                    <div style={{ padding: "16px", border: `1px solid ${color}33`, borderRadius: 10, background: `${color}0A` }}>
                      <div style={{ fontSize: 11, color, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8, textTransform: "uppercase" }}>{label}</div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: T.text, letterSpacing: "-0.04em" }}>—</div>
                      <div style={{ fontSize: 11, color: T.text3, marginTop: 4 }}>Live from your account</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal from="right" delay={160}><AppFrame src="/assets/v6-overview.png" alt="Everneat overview dashboard" height={460} url="book.everneat.co/dashboard" T={T} /></Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: T.bg2, color: T.text, padding: "100px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: T.text3, marginBottom: 16, textTransform: "uppercase" }}>How it works</p></Reveal>
          <Reveal delay={40}><h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 64px", maxWidth: 480, color: T.text }}>Free, open, and<br />scalable — running<br />in minutes.</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
            {[
              { n:"01", title:"Set up your booking page",   body:"Create your service menu, pricing, and availability. Your booking page is live and shareable instantly.", tag:"5 min setup" },
              { n:"02", title:"Customers book themselves",   body:"Share a link or embed the widget. Customers pick their service, date, and time — zero friction.",          tag:"24/7 bookings" },
              { n:"03", title:"Team auto-dispatched",        body:"The right team member gets notified and confirmed. You see everything on your dashboard in real time.",   tag:"Fully automated" },
              { n:"04", title:"Job done, follow-up sent",     body:"Once complete, review requests go out and the next recurring booking is already queued.", tag:"Runs itself" },
            ].map(({ n, title, body, tag }, i) => (
              <Reveal key={n} delay={i * 80}>
                <div style={{ position: "relative" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: T.text3, marginBottom: 20 }}>{n}</div>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: "calc(100% + 24px)", background: T.border }} />
                  <div style={{ paddingLeft: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em", color: T.text }}>{title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: T.text2, margin: "0 0 16px" }}>{body}</p>
                    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", background: T.text, color: T.bg, borderRadius: 20, letterSpacing: "0.02em" }}>{tag}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: T.bg, padding: "100px 80px", position: "relative", overflow: "hidden" }}>
        <GridBg opacity={0.035} dark={dark} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: T.green, marginBottom: 16, textTransform: "uppercase" }}>Pricing</p></Reveal>
          <Reveal delay={40}><h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 700, letterSpacing: "-0.035em", margin: "0 0 16px", color: T.text }}>Simple, honest pricing.</h2></Reveal>
          <Reveal delay={80}><p style={{ fontSize: 17, color: T.text2, margin: "0 0 64px" }}>Lock in early access pricing before we launch.</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 700 }}>
            {[
              { name:"Starter",  price:"Free", sub:"For new businesses",  features:["Up to 20 bookings/month","Online booking page","Customer portal","Basic analytics"],                                         highlight:false },
              { name:"Business", price:"$49",  sub:"/mo · most popular",  features:["Unlimited bookings","Smart team dispatch","Automated scheduling","Custom branding","Priority support","Advanced analytics"], highlight:true  },
            ].map(({ name, price, sub, features, highlight }, i) => (
              <Reveal key={name} delay={120 + i * 60}>
                <div style={{ padding: "32px", border: highlight ? `1px solid rgba(34,197,94,0.5)` : `1px solid ${T.border}`, borderRadius: 12, background: highlight ? (dark ? "rgba(34,197,94,0.06)" : "rgba(34,197,94,0.04)") : T.bg2, position: "relative" }}>
                  {highlight && <div style={{ position: "absolute", top: -12, left: 24, background: T.green, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em" }}>MOST POPULAR</div>}
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text2, marginBottom: 12 }}>{name}</div>
                  <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em", color: T.text, marginBottom: 4 }}>{price}</div>
                  <div style={{ fontSize: 13, color: T.text3, marginBottom: 28 }}>{sub}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                    {features.map(f => (
                      <div key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={highlight ? "#22C55E" : T.text3} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: 14, color: T.text2 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#waitlist" style={{ display: "block", textAlign: "center", padding: "11px 24px", background: highlight ? T.green : "transparent", border: highlight ? "none" : `1px solid ${T.border2}`, color: highlight ? "#fff" : T.text2, borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >Join the waitlist</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ background: T.bg2, color: T.text, padding: "100px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Reveal><div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 32 }}>{[...Array(5)].map((_, i) => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div></Reveal>
          <Reveal delay={60}><blockquote style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 500, lineHeight: 1.45, letterSpacing: "-0.02em", margin: "0 0 36px", color: T.text }}>"We went from managing bookings in a Google Sheet to having 40+ recurring customers managed automatically. Everneat paid for itself in the first week."</blockquote></Reveal>
          <Reveal delay={100}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.text, color: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15 }}>J</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>Jamie Rodriguez</div>
                <div style={{ fontSize: 13, color: T.text2 }}>Owner, Sparkle Clean NYC · Beta tester</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" style={{ background: T.green, padding: "100px 80px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.06) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal><p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(0,0,0,0.45)", marginBottom: 20, textTransform: "uppercase" }}>Limited early access</p></Reveal>
          <Reveal delay={40}><h2 style={{ fontSize: "clamp(32px,4vw,60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#000", margin: "0 0 20px" }}>Understand your<br />booking business.</h2></Reveal>
          <Reveal delay={80}><p style={{ fontSize: 17, color: "rgba(0,0,0,0.6)", margin: "0 0 40px", lineHeight: 1.65 }}>Join 500+ home service businesses on the waitlist. Early members get free access and locked-in pricing.</p></Reveal>
          <Reveal delay={120}>
            {submitted ? (
              <div style={{ padding: "16px 24px", background: "rgba(0,0,0,0.1)", borderRadius: 10, fontSize: 15, fontWeight: 600, color: "#000" }}>✓ You&apos;re on the list! We&apos;ll be in touch soon.</div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }} style={{ display: "flex", gap: 8 }}>
                <input type="email" required placeholder="Enter your work email" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ flex: 1, padding: "14px 18px", borderRadius: 8, border: "none", fontSize: 15, outline: "none", background: "rgba(255,255,255,0.55)", color: "#000" }} />
                <button type="submit" style={{ padding: "14px 24px", background: "#000", color: "#fff", borderRadius: 8, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >Join waitlist →</button>
              </form>
            )}
          </Reveal>
          <Reveal delay={160}>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 24 }}>
              {["Free early access", "No credit card", "Be first to launch"].map(t => (
                <div key={t} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: T.bg3, borderTop: `1px solid ${T.border}`, padding: "40px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ color: T.text, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>[EVERNEAT]</a>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: T.text3 }}>
            {["Privacy Policy", "Security", "Sub-processors"].map(l => (
              <a key={l} href="#" style={{ color: "inherit", textDecoration: "none" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = T.text2)}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = T.text3)}
              >{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 12, color: T.text3 }}>© 2026 Everneat. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
