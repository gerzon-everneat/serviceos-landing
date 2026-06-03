"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Tokens ─────────────────────────────────────────────────────────────── */
const C = {
  bg:      "#070B14",
  bgWarm:  "#080C18",
  card:    "#0C1220",
  card2:   "#101828",
  border:  "#1C2640",
  border2: "#243050",
  cyan:    "#00C8FF",
  cyanLo:  "#0088BB",
  blue:    "#1E70FF",
  blueLo:  "#1240AA",
  gold:    "#F0A020",
  goldLo:  "#A06C10",
  purple:  "#8855FF",
  green:   "#10C870",
  red:     "#FF4466",
  ink:     "#E8F0FF",
  ink2:    "#8898CC",
  ink3:    "#4A5880",
  ink4:    "#1E2840",
} as const;

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom", style, onMouseEnter, onMouseLeave }: {
  children: React.ReactNode; delay?: number; className?: string;
  from?: "bottom" | "left" | "right" | "top"; style?: React.CSSProperties;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.01, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const t = from === "left" ? "translateX(-30px)" : from === "right" ? "translateX(30px)" :
    from === "top" ? "translateY(-18px)" : "translateY(24px)";
  return (
    <div ref={ref} className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{ opacity: on ? 1 : 0, transform: on ? "none" : t, transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Booking Grid Canvas ─────────────────────────────────────────────────
   Draws an animated scheduling grid: time columns × technician rows,
   booking blocks sliding in, neural-style dispatch arcs connecting them.
────────────────────────────────────────────────────────────────────────── */
function BookingGridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 12;   // time slots
    const ROWS = 7;    // technicians

    const ACCENT_COLORS = [
      "#00C8FF", "#1E70FF", "#8855FF", "#10C870", "#F0A020", "#FF4466",
    ];

    // Generate booking blocks
    interface Block { col: number; row: number; span: number; color: string; born: number; alpha: number; }
    const blocks: Block[] = [];
    const occupancy: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    for (let i = 0; i < 18; i++) {
      const row  = Math.floor(Math.random() * ROWS);
      const col  = Math.floor(Math.random() * (COLS - 1));
      const span = Math.floor(Math.random() * 2) + 1;
      if (col + span > COLS) continue;
      let ok = true;
      for (let c = col; c < col + span; c++) if (occupancy[row][c]) { ok = false; break; }
      if (!ok) continue;
      for (let c = col; c < col + span; c++) occupancy[row][c] = true;
      blocks.push({ col, row, span, color: ACCENT_COLORS[i % ACCENT_COLORS.length], born: Math.random() * 300, alpha: 0 });
    }

    // Dispatch arcs: pairs of blocks connected by a bezier
    interface Arc { b1: Block; b2: Block; progress: number; speed: number; color: string; }
    const arcs: Arc[] = [];
    for (let i = 0; i < 6; i++) {
      if (blocks.length < 2) break;
      const a = blocks[Math.floor(Math.random() * blocks.length)];
      const b = blocks[Math.floor(Math.random() * blocks.length)];
      if (a === b) continue;
      arcs.push({ b1: a, b2: b, progress: Math.random(), speed: 0.002 + Math.random() * 0.003, color: C.cyan });
    }

    // Floating particles (AI nodes)
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003, vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      t++;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const PAD_X = W * 0.06, PAD_Y = H * 0.12;
      const gridW = W - PAD_X * 2, gridH = H - PAD_Y * 2;
      const cellW  = gridW / COLS, cellH = gridH / ROWS;

      // Grid lines
      ctx.strokeStyle = "rgba(28,38,64,0.7)";
      ctx.lineWidth = 1;
      for (let c = 0; c <= COLS; c++) {
        const x = PAD_X + c * cellW;
        ctx.beginPath(); ctx.moveTo(x, PAD_Y); ctx.lineTo(x, PAD_Y + gridH); ctx.stroke();
      }
      for (let r = 0; r <= ROWS; r++) {
        const y = PAD_Y + r * cellH;
        ctx.beginPath(); ctx.moveTo(PAD_X, y); ctx.lineTo(PAD_X + gridW, y); ctx.stroke();
      }

      // Time column headers (subtle ticks)
      ctx.fillStyle = "rgba(72,88,128,0.5)";
      ctx.font = `${Math.max(9, cellW * 0.28)}px monospace`;
      ctx.textAlign = "center";
      for (let c = 0; c < COLS; c++) {
        const hour = 7 + c;
        const label = `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "pm" : "am"}`;
        ctx.fillText(label, PAD_X + (c + 0.5) * cellW, PAD_Y - 6);
      }

      // Row labels (technician initials)
      const initials = ["JM", "SR", "PK", "AT", "LB", "RH", "DN"];
      ctx.font = `bold ${Math.max(8, cellH * 0.28)}px system-ui`;
      ctx.textAlign = "right";
      for (let r = 0; r < ROWS; r++) {
        ctx.fillStyle = "rgba(72,88,128,0.45)";
        ctx.fillText(initials[r] ?? "T" + r, PAD_X - 8, PAD_Y + (r + 0.6) * cellH);
      }

      // Booking blocks
      for (const blk of blocks) {
        if (t > blk.born) blk.alpha = Math.min(1, blk.alpha + 0.015);
        if (blk.alpha <= 0) continue;
        const x = PAD_X + blk.col * cellW + 2;
        const y = PAD_Y + blk.row * cellH + 2;
        const bw = blk.span * cellW - 4;
        const bh = cellH - 4;
        const r = 4;

        // Slide-in from left
        const slideX = blk.alpha < 1 ? x - (1 - blk.alpha) * cellW * 0.6 : x;

        ctx.save();
        ctx.globalAlpha = blk.alpha * 0.85;
        ctx.beginPath();
        ctx.roundRect(slideX, y, bw, bh, r);
        const grad = ctx.createLinearGradient(slideX, y, slideX + bw, y);
        grad.addColorStop(0, blk.color + "55");
        grad.addColorStop(1, blk.color + "22");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = blk.color + "88";
        ctx.lineWidth = 1;
        ctx.stroke();
        // Glow dot
        ctx.beginPath();
        ctx.arc(slideX + 10, y + bh / 2, 3, 0, Math.PI * 2);
        ctx.fillStyle = blk.color;
        ctx.fill();
        ctx.restore();
      }

      // Dispatch arcs
      for (const arc of arcs) {
        arc.progress += arc.speed;
        if (arc.progress > 1.3) arc.progress = -0.1;
        const p = Math.max(0, Math.min(1, arc.progress));

        const x1 = PAD_X + (arc.b1.col + arc.b1.span * 0.5) * cellW;
        const y1 = PAD_Y + (arc.b1.row + 0.5) * cellH;
        const x2 = PAD_X + (arc.b2.col + arc.b2.span * 0.5) * cellW;
        const y2 = PAD_Y + (arc.b2.row + 0.5) * cellH;
        const cpx = (x1 + x2) / 2, cpy = Math.min(y1, y2) - gridH * 0.15;

        // Draw arc trail
        ctx.save();
        ctx.strokeStyle = C.cyan + "40";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpx, cpy, x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated pulse dot along arc
        const bx = (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * cpx + p * p * x2;
        const by = (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * cpy + p * p * y2;
        const glow = ctx.createRadialGradient(bx, by, 0, bx, by, 8);
        glow.addColorStop(0, C.cyan + "CC");
        glow.addColorStop(1, C.cyan + "00");
        ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF"; ctx.fill();
        ctx.restore();
      }

      // Floating AI particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
        const px = p.x * W, py = p.y * H;
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * 5);
        g.addColorStop(0, C.cyan + "60");
        g.addColorStop(1, C.cyan + "00");
        ctx.beginPath(); ctx.arc(px, py, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }

      // Scan line sweep
      const scanX = PAD_X + (((t * 0.4) % (COLS * 100)) / 100) * cellW;
      if (scanX < PAD_X + gridW) {
        const scanGrad = ctx.createLinearGradient(scanX - 20, 0, scanX + 4, 0);
        scanGrad.addColorStop(0, C.cyan + "00");
        scanGrad.addColorStop(1, C.cyan + "18");
        ctx.fillStyle = scanGrad;
        ctx.fillRect(scanX - 20, PAD_Y, 24, gridH);
        ctx.strokeStyle = C.cyan + "50";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(scanX, PAD_Y); ctx.lineTo(scanX, PAD_Y + gridH); ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none", zIndex: 1 }} />
  );
}

/* ─── Waitlist ───────────────────────────────────────────────────────────── */
function WaitlistForm({ size = "md" }: { size?: "md" | "lg" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!email || status !== "idle") return;
    setStatus("loading"); setTimeout(() => setStatus("done"), 1100);
  };
  if (status === "done") return (
    <p className="font-semibold text-sm" style={{ color: C.cyan }}>You&#39;re on the list — we&#39;ll be in touch.</p>
  );
  const pad = size === "lg" ? "px-5 py-3.5" : "px-4 py-3";
  const sz  = size === "lg" ? "text-base" : "text-sm";
  return (
    <form onSubmit={submit} className="flex gap-2 flex-wrap sm:flex-nowrap w-full">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`flex-1 min-w-0 rounded-xl ${pad} ${sz} outline-none`}
        style={{ background: C.card2, border: `1px solid ${C.border2}`, color: C.ink, caretColor: C.cyan }} />
      <button type="submit" disabled={status === "loading"}
        className={`shrink-0 rounded-xl ${pad} ${sz} font-semibold transition-all`}
        style={{
          background: `linear-gradient(135deg, ${C.blue}, ${C.cyan})`,
          color: "#040810",
          boxShadow: `0 0 24px ${C.cyan}55`,
          opacity: status === "loading" ? 0.7 : 1,
        }}>
        {status === "loading" ? "Joining…" : "Get Early Access"}
      </button>
    </form>
  );
}

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({ img, title, body, accent, delay = 0 }: {
  img: string; title: string; body: string; accent: string; delay?: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay}
      className="flex flex-col rounded-2xl overflow-hidden cursor-default transition-transform duration-300"
      style={{
        background: C.card,
        border: `1px solid ${hover ? accent + "55" : C.border}`,
        boxShadow: hover ? `0 0 30px ${accent}22` : "none",
        transform: hover ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to top, ${C.card} 0%, ${C.card}88 30%, transparent 70%)`
        }} />
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-semibold text-sm" style={{ color: C.ink }}>{title}</h3>
        <p className="text-xs leading-relaxed" style={{ color: C.ink2 }}>{body}</p>
      </div>
    </Reveal>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function V5Page() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(7,11,20,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.cyan})`, color: "#040810", boxShadow: `0 0 16px ${C.cyan}55` }}>E</div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: C.ink }}>neatr.ai</span>
          <span className="text-xs px-1.5 py-0.5 rounded font-mono ml-1"
            style={{ background: C.cyan + "18", color: C.cyan, border: `1px solid ${C.cyan}40` }}>AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm" style={{ color: C.ink2 }}>
          {["Features", "Pricing", "Roadmap"].map(l => (
            <a key={l} href="#" className="hover:opacity-80 transition-opacity">{l}</a>
          ))}
        </div>
        <a href="#waitlist"
          className="rounded-full px-4 py-2 text-xs font-semibold transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.cyan})`, color: "#040810", boxShadow: `0 0 14px ${C.cyan}44` }}>
          Get Early Access
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* AI background image */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{ position: "absolute", inset: "-6%", animation: "kenburns 28s ease-in-out infinite alternate" }}>
            <Image src="/assets/v5-hero-bg.jpg" alt="" fill style={{ objectFit: "cover" }} priority />
          </div>
          <div className="absolute inset-0" style={{
            background: `linear-gradient(180deg, ${C.bg}88 0%, ${C.bg}BB 50%, ${C.bg} 100%)`
          }} />
        </div>

        {/* Booking grid animation overlay */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <BookingGridCanvas />
        </div>

        <div className="relative flex flex-col items-center gap-7 max-w-3xl mx-auto pt-28" style={{ zIndex: 2 }}>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ background: C.cyan + "14", border: `1px solid ${C.cyan}44`, color: C.cyan, animation: "rise 0.6s both" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.cyan }} />
            AI dispatch engine · Private beta
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.04] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: C.ink, animation: "rise 0.7s 100ms both" }}>
            The AI brain behind{" "}
            <span style={{
              background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              your bookings
            </span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ color: C.ink2, animation: "rise 0.7s 200ms both" }}>
            Intelligent dispatch, conflict detection, and pricing — running silently in the background while your team stays in the field.
          </p>

          <div className="w-full max-w-md" style={{ animation: "rise 0.7s 300ms both" }}>
            <WaitlistForm size="lg" />
          </div>

          <p className="text-xs" style={{ color: C.ink3, animation: "rise 0.7s 400ms both" }}>
            No credit card required · 800+ operators on waitlist
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style={{ zIndex: 2 }}>
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, transparent, ${C.cyan})` }} />
        </div>
      </section>

      {/* ── Live stats ──────────────────────────────────────────────────── */}
      <section className="py-4 border-y overflow-hidden" style={{ borderColor: C.border, background: C.bgWarm }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-3">
          {[
            { label: "Jobs dispatched today",   value: "12,847", color: C.cyan },
            { label: "Avg dispatch time",        value: "1.2s",   color: C.green },
            { label: "Conflicts auto-resolved",  value: "340",    color: C.gold },
            { label: "Revenue optimized",        value: "$84K",   color: C.purple },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 text-sm">
              <span className="font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
              <span style={{ color: C.ink3 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature grid ────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: C.cyan }}>Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: C.ink }}>
              AI-native from the ground up
            </h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: C.ink2 }}>
              Not a bolt-on feature — the intelligence is baked into every booking, dispatch, and decision.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard delay={0}   accent={C.cyan}   img="/assets/v5-feat-dispatch.jpg"
              title="Neural Dispatch" body="ML routing engine assigns every job to the optimal tech in under 2 seconds. Learns from your team's patterns daily." />
            <FeatureCard delay={80}  accent={C.purple} img="/assets/v5-feat-conflict.jpg"
              title="Conflict Radar"  body="Detects scheduling collisions, travel time conflicts, and overloads before they happen. Auto-resolves silently." />
            <FeatureCard delay={160} accent={C.gold}   img="/assets/v5-feat-pricing.jpg"
              title="Yield Pricing"   body="Dynamic quotes based on demand signals, tech tier, and market data. Every job priced to maximize margin." />
            <FeatureCard delay={240} accent={C.green}  img="/assets/v5-feat-comms.jpg"
              title="Smart Comms"     body="AI-timed confirmations, reminders, and review requests sent at the exact moment customers are most receptive." />
          </div>
        </div>
      </section>

      {/* ── Dashboard ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: C.bgWarm }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: C.cyan }}>Command Center</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-display)", color: C.ink }}>
              Every job. Every tech. Every second.
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: C.ink2 }}>
              Watch your AI dispatcher work in real time. See jobs route, conflicts resolve, and revenue optimize — all without touching a thing.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                [C.cyan,   "Live dispatch map with real-time technician positions"],
                [C.green,  "Revenue and margin tracking per job and per day"],
                [C.gold,   "Predictive alerts before issues reach your customers"],
                [C.purple, "One-click overrides when you need manual control"],
              ].map(([color, text]) => (
                <li key={text} className="flex items-start gap-3 text-sm" style={{ color: C.ink2 }}>
                  <span className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 text-xs"
                    style={{ background: color + "20", border: `1px solid ${color}50`, color }}>✓</span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" delay={100}>
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.border2}`, boxShadow: `0 0 60px ${C.cyan}18` }}>
              <Image src="/assets/v5-dashboard.jpg" alt="neatr.ai AI dashboard" width={1280} height={800} className="w-full h-auto block" />
              <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${C.cyan}20` }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: C.cyan }}>Setup</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: C.ink }}>
              Live in under two minutes
            </h2>
          </Reveal>
          <div className="relative flex flex-col">
            <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${C.cyan}80, ${C.blue}30, transparent)` }} />
            {[
              { n: "01", title: "Connect your calendar", body: "Google, Outlook, or native. Existing jobs sync in seconds.", color: C.cyan },
              { n: "02", title: "Add your team",         body: "Import techs, set skills and zones. AI starts learning immediately.", color: C.blue },
              { n: "03", title: "Set the rules once",    body: "Travel buffers, job lengths, pricing tiers. Enforced automatically.", color: C.purple },
              { n: "04", title: "Turn the AI loose",     body: "Share your link. The engine dispatches, optimizes, and reports.", color: C.green },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="flex gap-6 pb-10 last:pb-0 pl-2">
                <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ background: s.color + "22", border: `2px solid ${s.color}`, color: s.color }}>
                  {s.n}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold mb-1" style={{ color: C.ink }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.ink2 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: C.bgWarm }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="rounded-3xl p-10 relative overflow-hidden"
              style={{ background: C.card, border: `1px solid ${C.border2}`, boxShadow: `0 0 50px ${C.blue}18` }}>
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10"
                style={{ background: `radial-gradient(circle, ${C.cyan}, transparent)` }} />
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative"
                style={{ fontFamily: "var(--font-display)", color: C.ink }}>
                &ldquo;We cut scheduling time from 3 hours a day to 20 minutes. The AI just knows — it stops asking permission and starts getting it right.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.cyan})`, color: "#040810" }}>M</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: C.ink }}>Marcus R.</p>
                  <p className="text-xs" style={{ color: C.ink3 }}>Owner · 12-tech HVAC company</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[1,2,3,4,5].map(n => <span key={n} style={{ color: C.gold, fontSize: 14 }}>★</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.blue}18 0%, transparent 70%)`
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${C.cyan}10 0%, transparent 70%)`
        }} />
        <Reveal className="relative max-w-xl mx-auto flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: C.cyan }}>Early Access</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: C.ink }}>
            Let the AI take the wheel
          </h2>
          <p style={{ color: C.ink2 }}>
            Join 800+ operators on the waitlist. We&#39;ll reach out before we go live.
          </p>
          <div className="w-full">
            <WaitlistForm size="lg" />
          </div>
          <p className="text-xs" style={{ color: C.ink3 }}>No credit card · No commitment</p>
        </Reveal>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6" style={{ borderTop: `1px solid ${C.border}`, background: C.bgWarm }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.cyan})`, color: "#040810", boxShadow: `0 0 10px ${C.cyan}44` }}>E</div>
            <span className="font-semibold text-sm" style={{ color: C.ink }}>neatr.ai</span>
            <span className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ background: C.cyan + "14", color: C.cyan, border: `1px solid ${C.cyan}30` }}>AI</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: C.ink3 }}>
            {["Features", "Pricing", "Roadmap", "Privacy", "Terms"].map(l => (
              <a key={l} href="#" className="hover:opacity-70 transition-opacity">{l}</a>
            ))}
          </div>
          <p className="text-xs" style={{ color: C.ink4 }}>© {new Date().getFullYear()} neatr.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
