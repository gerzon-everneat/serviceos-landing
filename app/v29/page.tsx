"use client";

import { useEffect, useRef, useState } from "react";

/* ─── bureau.cool homage — oversized type, momentum scroll, 3D background ──────
   Off-white editorial canvas, near-black grotesque set huge with tight tracking,
   Cormorant italic as the refined accent. Lenis-style lerped scroll. One fixed
   3D point-cloud (perspective-projected, rotating, depth-shaded) sits behind
   everything; its palette shifts per section as you scroll. A canvas-coloured
   gradient fades to transparent per section to keep the type readable. */

const C = {
  bg:   "#F1F0EA",
  ink:  "#0B0B0A",
  ink2: "rgba(11,11,10,0.56)",
  ink3: "rgba(11,11,10,0.40)",
  line: "rgba(11,11,10,0.14)",
  lime: "#C8FF00",
};
const SANS  = "var(--font-dm-sans), system-ui, -apple-system, sans-serif";
const SERIF = "var(--font-cormorant), Georgia, serif";

/* Grid mark — site logo, kept static here to suit the calm aesthetic */
function MarkGrid() {
  const pts = [10, 24, 38].flatMap((y) => [10, 24, 38].map((x) => ({ x, y })));
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden>
      {pts.map(({ x, y }, i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 5 : 3.2}
          fill={i === 4 ? C.lime : C.ink} opacity={i === 4 ? 1 : 0.7} />
      ))}
    </svg>
  );
}

/* ─── 3D background — perspective point cloud, palette driven by scroll ──────── */
function Bg3D() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const N = 130;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1,
    }));
    // accent colour per section (hero, live, work, index, studio, access)
    const PAL = [
      [11, 11, 10], [200, 255, 0], [120, 170, 255],
      [11, 11, 10], [200, 255, 0], [255, 170, 120],
    ];
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    let W = 0, H = 0, raf = 0, t = 0, lastY = window.scrollY, vel = 0;
    const resize = () => {
      W = canvas.width = Math.max(1, Math.floor(canvas.offsetWidth * dpr));
      H = canvas.height = Math.max(1, Math.floor(canvas.offsetHeight * dpr));
    };

    const draw = () => {
      const docScroll = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / docScroll)) : 0;
      const fi = prog * (PAL.length - 1);
      const i0 = Math.floor(fi), i1 = Math.min(PAL.length - 1, i0 + 1), k = fi - i0;
      const ac = [
        lerp(PAL[i0][0], PAL[i1][0], k) | 0,
        lerp(PAL[i0][1], PAL[i1][1], k) | 0,
        lerp(PAL[i0][2], PAL[i1][2], k) | 0,
      ];

      ctx.clearRect(0, 0, W, H);
      // rotation speeds up with scroll velocity, decays back to idle when still
      const curY = window.scrollY;
      vel += (Math.abs(curY - lastY) - vel) * 0.2;
      lastY = curY;
      t += reduce ? 0 : 0.0022 + Math.min(vel * 0.0009, 0.018);
      const cy = Math.cos(t), sy = Math.sin(t), cx = Math.cos(t * 0.4), sx = Math.sin(t * 0.4);
      const scale = Math.min(W, H) * 0.54, persp = 2.7, cxp = W / 2, cyp = H / 2;

      const proj = pts.map((p) => {
        const x = p.x * cy - p.z * sy, z = p.x * sy + p.z * cy;       // rotate Y
        const y2 = p.y * cx - z * sx, z2 = p.y * sx + z * cx;          // rotate X
        const d = persp / (persp - z2);
        return { sx: cxp + x * scale * d, sy: cyp + y2 * scale * d, d, z: z2 };
      });

      const lim = scale * 0.34;
      for (let a = 0; a < N; a++) {
        for (let b = a + 1; b < N; b++) {
          const dx = proj[a].sx - proj[b].sx, dy = proj[a].sy - proj[b].sy;
          const dist = Math.hypot(dx, dy);
          if (dist < lim) {
            const al = (1 - dist / lim) * 0.24 * Math.min(proj[a].d, proj[b].d);
            ctx.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${al})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(proj[a].sx, proj[a].sy);
            ctx.lineTo(proj[b].sx, proj[b].sy);
            ctx.stroke();
          }
        }
      }
      for (const p of proj) {
        const r = Math.max(0.6, p.d * 2.1 * dpr);
        const al = Math.min(0.66, 0.26 * p.d + (p.z > 0 ? 0.18 : 0));
        ctx.fillStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${al})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(); }); ro.observe(canvas);
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="bg3d" aria-hidden />;
}

/* Scroll-reveal — works inside the transformed scroll wrapper (IO reads rendered rect) */
function Reveal({ children, delay = 0, as = "div", style }: {
  children: React.ReactNode; delay?: number; as?: "div" | "li"; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  const Tag = as as "div";
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} style={{
      opacity: on ? 1 : 0,
      transform: on ? "none" : "translateY(26px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>{children}</Tag>
  );
}

/* Section shell: contrast fade over the 3D background → centred content */
function Section({ id, tag = "section", className = "", children }: {
  id: string; tag?: "section" | "header" | "footer"; className?: string; children: React.ReactNode;
}) {
  const Tag = tag as "section";
  return (
    <Tag id={id} className={`sect ${className}`.trim()}>
      <div className="sect-fade" aria-hidden />
      <div className="wrap">{children}</div>
    </Tag>
  );
}

const WORK = [
  { tag: "Intake",     n: "01", t: "Online booking", d: "A booking page customers finish in under a minute — any service, any device, no back-and-forth." },
  { tag: "Operations", n: "02", t: "Auto-dispatch",  d: "The right crew, matched by skill, location and availability the moment a job lands." },
  { tag: "Schedule",   n: "03", t: "Live calendar",  d: "Every job, every provider, every day — one continuous view that fills itself." },
  { tag: "Revenue",    n: "04", t: "Payments",       d: "Deposits, balances and invoices collected on time, without a single chase." },
  { tag: "Retention",  n: "05", t: "Follow-ups",     d: "Reminders and review requests that send themselves, and rebook the regulars." },
  { tag: "Visibility", n: "06", t: "Dashboard",      d: "Revenue, completion and crew performance, read in real time." },
];

const INDEX = [
  ["Booking page",          "Intake"],
  ["Service & pricing menu","Intake"],
  ["Customer portal",       "Intake"],
  ["Smart scheduling",      "Schedule"],
  ["Conflict resolution",   "Schedule"],
  ["Crew matching",         "Operations"],
  ["SMS & email dispatch",  "Operations"],
  ["Staff mobile app",      "Operations"],
  ["Deposits & balances",   "Revenue"],
  ["Automated invoicing",   "Revenue"],
  ["Reminders",             "Retention"],
  ["Review requests",       "Retention"],
  ["Recurring rebooking",   "Retention"],
  ["Live analytics",        "Visibility"],
];

const SERVICES = [
  "Online booking", "Scheduling & dispatch", "Payments & invoicing",
  "Customer communications", "Customer portal", "Staff mobile app", "Analytics",
];

export default function V29() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [smooth, setSmooth] = useState(false);
  const [docH, setDocH] = useState(0);

  // measure + enable momentum scroll (skips for reduced-motion + touch → native scroll)
  useEffect(() => {
    const content = contentRef.current; if (!content) return;
    const measure = () => setDocH(content.offsetHeight);
    const ro = new ResizeObserver(measure); ro.observe(content); measure();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // one-time mount decision; intentional setState in effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!reduce && desktop) setSmooth(true);
    return () => ro.disconnect();
  }, []);

  // lerp the visual transform behind native scroll position → bureau-style inertia
  useEffect(() => {
    if (!smooth) return;
    const content = contentRef.current; if (!content) return;
    let cur = window.scrollY, raf = 0;
    const tick = () => {
      const target = window.scrollY;
      cur += (target - cur) * 0.085;
      if (Math.abs(target - cur) < 0.06) cur = target;
      content.style.transform = `translate3d(0,${-cur.toFixed(2)}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [smooth]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: smooth ? "auto" : "smooth" });
  };

  const contentStyle: React.CSSProperties = smooth
    ? { position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1, willChange: "transform" }
    : { position: "relative", zIndex: 1 };

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ambient glow + 3D background — fixed behind everything */}
      <div className="bgglow" aria-hidden />
      <Bg3D />

      {/* NAV — minimal, lives outside the transformed wrapper so it stays put */}
      <nav className="v29nav">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); goTo("top"); }}>
          <MarkGrid />
          <span>neatr<span style={{ color: C.ink3 }}>.ai</span></span>
        </a>
        <div className="navlinks">
          {[["Work", "work"], ["Index", "index"], ["Studio", "studio"]].map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); goTo(id); }}>{l}</a>
          ))}
          <a className="navcta" href="#access" onClick={(e) => { e.preventDefault(); goTo("access"); }}>
            Request access
          </a>
        </div>
      </nav>

      {/* SCROLL CONTENT */}
      <div ref={contentRef} style={contentStyle}>

        {/* HERO */}
        <Section id="top" tag="header" className="hero">
          <div className="hero-main">
            <Reveal>
              <p className="eyebrow">Booking system — for service work</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mega">
                Booking,<br />
                <span className="ital">automated.</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="lede">
                neatr.ai develops the booking system home-service businesses actually
                run on — built in close partnership with the cleaning crews, handymen
                and field teams who use it every day. From the first enquiry to the
                final invoice, the work runs itself.
              </p>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="herometa">
              <span className="herometa-tags">
                <b>Cleaning</b><i /><b>Maintenance</b><i /><b>Field service</b>
              </span>
              <span className="scrollcue">
                <span>Scroll</span>
                <svg width="12" height="32" viewBox="0 0 12 34" fill="none" stroke={C.ink3} strokeWidth="1.4">
                  <path d="M6 0v30M1 25l5 6 5-6" />
                </svg>
              </span>
            </div>
          </Reveal>
        </Section>

        {/* LIVE BOOKING ANIMATION */}
        <Section id="live">
          <Reveal><div className="lbl"><span>Live</span><span>booking</span></div></Reveal>
          <div className="livegrid">
            <Reveal delay={60}>
              <h2 className="livehead">The job,<br /><span className="ital">end to end.</span></h2>
              <p className="livep">
                One booking, moving through neatr on its own — enquiry to paid,
                no one touching it.
              </p>
            </Reveal>
            <Reveal delay={140}><BookingFlow /></Reveal>
          </div>
        </Section>

        <Marquee />

        {/* SELECTED WORK */}
        <Section id="work">
          <Reveal><div className="lbl"><span>Selected work</span><span>06</span></div></Reveal>
          <div className="workgrid">
            {WORK.map((w, i) => (
              <Reveal key={w.n} as="div" delay={(i % 2) * 70} style={{ height: "100%" }}>
                <article className="workcard">
                  <div className="wtop">
                    <span className="wtag">{w.tag}</span>
                    <span className="wnum">{w.n}</span>
                  </div>
                  <h3 className="wtitle">{w.t}</h3>
                  <p className="wdesc">{w.d}</p>
                  <span className="warrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* INDEX */}
        <Section id="index">
          <Reveal><div className="lbl"><span>Index</span><span>{String(INDEX.length).padStart(2, "0")}</span></div></Reveal>
          <ul className="indexlist">
            {INDEX.map(([name, cat], i) => (
              <Reveal key={name} as="li" delay={Math.min(i, 8) * 28} style={{ display: "block" }}>
                <a className="indexrow" href="#access" onClick={(e) => { e.preventDefault(); goTo("access"); }}>
                  <span className="ixname">{name}</span>
                  <span className="ixcat">{cat}</span>
                  <span className="ixmark">↗</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* STUDIO / INFORMATION + SERVICES */}
        <Section id="studio" className="studio">
          <div className="studiogrid">
            <div>
              <Reveal><p className="eyebrow">Information</p></Reveal>
              <Reveal delay={80}>
                <p className="bigbody">
                  neatr.ai is a booking system for home-service
                  businesses — <span className="ital">cleaning, maintenance and field teams.</span>
                  &nbsp;It replaces the spreadsheets, the group chats and the
                  chasing with one quiet system that handles the whole job, start
                  to finish.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="meta">
                  Currently in early access. Built wherever the work is.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal><p className="eyebrow">What it runs</p></Reveal>
              <ul className="servlist">
                {SERVICES.map((s, i) => (
                  <Reveal key={s} as="li" delay={i * 40} style={{ display: "block" }}>
                    <span className="servrow"><span className="servidx">{String(i + 1).padStart(2, "0")}</span>{s}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Marquee reverse />

        {/* ACCESS / FOOTER */}
        <Section id="access" tag="footer" className="foot">
          <Reveal>
            <h2 className="mega foothead">
              Request<br /><span className="ital">access.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <AccessForm />
          </Reveal>
          <Reveal delay={180}>
            <div className="footrow">
              <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); goTo("top"); }}>
                <MarkGrid />
                <span>neatr<span style={{ color: C.ink3 }}>.ai</span></span>
              </a>
              <div className="footlinks">
                {["Privacy", "Security", "Contact"].map((l) => (
                  <a key={l} href="#">{l}</a>
                ))}
              </div>
              <span className="footnote">© 2026 neatr.ai — Booking, automated.</span>
            </div>
          </Reveal>
        </Section>
      </div>

      {/* spacer gives the document its scroll height when content is fixed */}
      {smooth && <div aria-hidden style={{ height: docH }} />}

      <div className="grain" aria-hidden />
    </div>
  );
}

const STEPS = [
  { k: "Enquiry",    s: "Sarah M. · Deep clean · 2 bed" },
  { k: "Scheduled",  s: "Thu 10:00 — calendar reserved" },
  { k: "Dispatched", s: "Maria L. · 0.8 mi · notified" },
  { k: "Confirmed",  s: "Customer emailed + invited" },
  { k: "Paid",       s: "$185 — deposit captured" },
];

function BookingFlow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(STEPS.length - 1); return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 1500);
    return () => clearInterval(id);
  }, []);
  const cur = STEPS[step];
  return (
    <div className="bookcard">
      <div className="bookhead">
        <span className="bdots"><i /><i /><i /></span>
        <span className="bmono">neatr.ai · booking</span>
        <span className="blive"><span className="blivedot" />processing</span>
      </div>
      <div className="bookbody">
        <div className="bookticket">
          <span className="bmono" style={{ color: C.ink3 }}>Incoming</span>
          <h3 className="booksvc">Deep clean<span className="ital"> — 2 bed</span></h3>
          <p className="bookcust">Sarah M. · Thursday, 10:00</p>
          <div className="bookstatus">
            <span className="bsk">Status</span>
            <span className="bsv">{cur.k}</span>
          </div>
        </div>
        <ol className="booksteps">
          {STEPS.map((s, i) => {
            const done = i < step, on = i === step;
            return (
              <li key={s.k} className={`bookstep${on ? " on" : ""}${done ? " done" : ""}`}>
                <span className="bookdot">{done ? "✓" : i + 1}</span>
                <span className="booktext">
                  <span className="bookname">{s.k}</span>
                  <span className="booksub">{s.s}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = ["Online booking", "Auto-dispatch", "Live calendar", "Payments", "Reminders", "Customer portal", "Analytics"];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className={`marquee-track${reverse ? " rev" : ""}`}>
        {row.map((it, i) => (
          <span key={i} className="marquee-item">{it}<i className="marquee-dot" /></span>
        ))}
      </div>
    </div>
  );
}

function AccessForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <p className="accessdone">On the list. We&apos;ll be in touch — {email}</p>;
  return (
    <form className="accessform" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
      <input type="email" required placeholder="your work email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Request invite →</button>
    </form>
  );
}

const CSS = `
*{box-sizing:border-box}

.bg3d{position:fixed; inset:0; width:100%; height:100%; z-index:0; pointer-events:none;}
.bgglow{position:fixed; inset:-15%; z-index:0; pointer-events:none; filter:blur(64px);
  background:
    radial-gradient(32% 40% at 24% 28%, rgba(200,255,0,0.18), transparent 70%),
    radial-gradient(38% 44% at 78% 64%, rgba(120,170,255,0.15), transparent 72%),
    radial-gradient(30% 36% at 58% 94%, rgba(255,170,120,0.13), transparent 70%);
  animation:glowdrift 24s ease-in-out infinite alternate;}
@keyframes glowdrift{0%{transform:translate3d(-3%,-2%,0) scale(1.05)}100%{transform:translate3d(4%,3%,0) scale(1.16)}}

.grain{
  position:fixed; inset:0; z-index:5; pointer-events:none; opacity:0.04; mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.v29nav{
  position:fixed; top:0; left:0; right:0; z-index:50;
  display:flex; align-items:center; justify-content:space-between;
  padding:20px clamp(20px,5vw,64px); mix-blend-mode:multiply;
}
.brand{display:inline-flex; align-items:center; gap:9px; text-decoration:none; color:${C.ink};
  font-weight:600; font-size:15px; letter-spacing:-0.02em;}
.navlinks{display:flex; align-items:center; gap:clamp(14px,2.4vw,30px);}
.navlinks a{color:${C.ink2}; text-decoration:none; font-size:14px; letter-spacing:-0.01em; transition:color .25s;}
.navlinks a:hover{color:${C.ink};}
.navcta{border:1px solid ${C.line}; border-radius:100px; padding:7px 15px !important; color:${C.ink} !important;}
.navcta:hover{background:${C.ink}; color:${C.bg} !important;}
@media(max-width:680px){ .navlinks a:not(.navcta){display:none;} }

/* section shell — transparent so the 3D shows through; fade holds contrast.
   Compact (≈half-viewport, content-height) so the page reads as a dense stack. */
.sect{position:relative; padding:clamp(40px,5vw,76px) 0; background:transparent;}
.sect-fade{position:absolute; inset:0; z-index:0; pointer-events:none;
  background:linear-gradient(180deg,
    ${C.bg} 0%,
    rgba(241,240,234,0.40) 16%,
    rgba(241,240,234,0.16) 50%,
    rgba(241,240,234,0.44) 84%,
    ${C.bg} 100%);}
.wrap{position:relative; z-index:1; max-width:1280px; margin:0 auto; padding:0 clamp(20px,5vw,64px);}

.hero{min-height:auto; display:flex; padding-top:clamp(92px,11vw,128px);}
.hero .wrap{display:flex; flex-direction:column; width:100%;}
.hero-main{display:flex; flex-direction:column;}
.herometa{display:flex; align-items:flex-end; justify-content:space-between; gap:24px;
  border-top:1px solid ${C.line}; padding-top:18px; margin-top:28px;
  font-size:13px; color:${C.ink2}; letter-spacing:-0.01em;}
.herometa-tags{display:inline-flex; align-items:center; gap:14px; flex-wrap:wrap;}
.herometa-tags b{font-weight:600; color:${C.ink};}
.herometa-tags i{width:4px; height:4px; border-radius:50%; background:${C.ink3}; display:inline-block;}
.hero .sect-fade{background:linear-gradient(180deg,
    rgba(241,240,234,0.26) 0%, rgba(241,240,234,0.05) 34%,
    rgba(241,240,234,0.05) 62%, ${C.bg} 100%);}

.eyebrow{font-family:${SERIF}; font-style:italic; font-size:clamp(17px,1.6vw,22px);
  color:${C.ink2}; margin:0 0 22px;}
.mega{font-family:${SANS}; font-weight:500; letter-spacing:-0.05em; line-height:0.9;
  margin:0; font-size:clamp(64px,15vw,236px);}
.ital{font-family:${SERIF}; font-style:italic; font-weight:500; letter-spacing:-0.02em;}
.lede{max-width:620px; font-size:clamp(18px,1.9vw,25px); line-height:1.5; letter-spacing:-0.01em;
  color:${C.ink}; margin:38px 0 0;}
.scrollcue{display:inline-flex; flex-direction:column; align-items:center; gap:6px;
  color:${C.ink3}; font-size:11px; letter-spacing:0.18em; text-transform:uppercase;}
.scrollcue svg{animation:bob 2.2s ease-in-out infinite;}
@keyframes bob{0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)}}

.lbl{display:flex; align-items:baseline; justify-content:space-between;
  border-top:1px solid ${C.line}; padding-top:14px; margin-bottom:clamp(22px,3vw,40px);
  font-size:13px; letter-spacing:0.04em; text-transform:uppercase; color:${C.ink2};}
.lbl span:last-child{font-family:${SERIF}; font-style:italic; text-transform:none; font-size:18px;}

.livegrid{display:grid; grid-template-columns:0.8fr 1.2fr; gap:clamp(36px,6vw,90px); align-items:center;}
.livehead{font-size:clamp(40px,6vw,86px); font-weight:500; letter-spacing:-0.04em; line-height:0.92; margin:0;}
.livep{font-size:clamp(16px,1.7vw,21px); color:${C.ink2}; line-height:1.5; margin:26px 0 0; max-width:34ch;}
@media(max-width:860px){ .livegrid{grid-template-columns:1fr;} }

.bookcard{border:1px solid ${C.line}; background:rgba(255,255,255,0.74); backdrop-filter:blur(8px);
  border-radius:16px; overflow:hidden; box-shadow:0 30px 80px rgba(11,11,10,0.08);}
.bookhead{display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding:13px 18px; border-bottom:1px solid ${C.line};}
.bdots{display:flex; gap:6px;}
.bdots i{width:9px; height:9px; border-radius:50%; background:${C.line}; display:block;}
.bmono{font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:${C.ink2};}
.blive{display:inline-flex; align-items:center; gap:6px; font-size:11px; letter-spacing:0.08em;
  text-transform:uppercase; color:${C.ink2};}
.blivedot{width:7px; height:7px; border-radius:50%; background:#11a36b; animation:lpulse 1.6s infinite;}
@keyframes lpulse{0%{box-shadow:0 0 0 0 rgba(17,163,107,0.45)} 70%{box-shadow:0 0 0 7px rgba(17,163,107,0)} 100%{box-shadow:0 0 0 0 rgba(17,163,107,0)}}
.bookbody{display:grid; grid-template-columns:1fr 1fr;}
.bookticket{padding:clamp(22px,3vw,40px); border-right:1px solid ${C.line}; display:flex; flex-direction:column;}
.booksvc{font-size:clamp(26px,3.4vw,44px); font-weight:500; letter-spacing:-0.035em; line-height:1; margin:14px 0 10px;}
.bookcust{font-size:15px; color:${C.ink2}; margin:0;}
.bookstatus{margin-top:auto; padding-top:26px; display:flex; align-items:baseline; gap:12px;}
.bsk{font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:${C.ink3};}
.bsv{font-family:${SERIF}; font-style:italic; font-size:clamp(20px,2.4vw,30px); color:${C.ink};}
.booksteps{list-style:none; margin:0; padding:clamp(16px,2vw,26px); display:flex; flex-direction:column; gap:2px;}
.bookstep{display:flex; gap:14px; align-items:flex-start; padding:11px 10px; border-radius:10px;
  opacity:0.38; transition:opacity .5s, background .5s;}
.bookstep.done{opacity:0.7;}
.bookstep.on{opacity:1; background:rgba(200,255,0,0.16);}
.bookdot{flex-shrink:0; width:26px; height:26px; border-radius:50%; border:1px solid ${C.line};
  display:flex; align-items:center; justify-content:center; font-size:12px; color:${C.ink2}; transition:.4s;}
.bookstep.on .bookdot{background:${C.lime}; border-color:${C.lime}; color:${C.ink};}
.bookstep.done .bookdot{border-color:${C.ink}; color:${C.ink};}
.booktext{display:flex; flex-direction:column; gap:2px;}
.bookname{font-size:16px; font-weight:600; letter-spacing:-0.01em;}
.booksub{font-size:13px; color:${C.ink2};}
@media(max-width:680px){
  .bookbody{grid-template-columns:1fr;}
  .bookticket{border-right:none; border-bottom:1px solid ${C.line};}
}

.marquee{position:relative; z-index:1; overflow:hidden; background:rgba(241,240,234,0.5);
  border-top:1px solid ${C.line}; border-bottom:1px solid ${C.line};
  padding:clamp(16px,2.2vw,28px) 0;}
.marquee-track{display:flex; width:max-content; animation:marq 30s linear infinite;}
.marquee-track.rev{animation-direction:reverse;}
.marquee-item{display:inline-flex; align-items:center; gap:clamp(28px,4vw,56px); padding-right:clamp(28px,4vw,56px);
  font-family:${SERIF}; font-style:italic; font-size:clamp(28px,5vw,68px); letter-spacing:-0.02em;
  color:${C.ink}; white-space:nowrap;}
.marquee-dot{width:9px; height:9px; border-radius:50%; background:${C.lime}; display:inline-block; flex-shrink:0;}
@keyframes marq{to{transform:translateX(-50%)}}

.workgrid{display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:${C.line};
  border:1px solid ${C.line};}
.workcard{position:relative; background:${C.bg}; padding:clamp(28px,3.4vw,52px);
  min-height:300px; display:flex; flex-direction:column; transition:background .4s; height:100%;}
.workcard:hover{background:#EBEAE2;}
.wtop{display:flex; align-items:baseline; justify-content:space-between; margin-bottom:auto;}
.wtag{font-family:${SERIF}; font-style:italic; font-size:20px; color:${C.ink2};}
.wnum{font-size:12px; letter-spacing:0.1em; color:${C.ink3};}
.wtitle{font-size:clamp(30px,3.6vw,52px); font-weight:500; letter-spacing:-0.04em; line-height:1;
  margin:48px 0 14px;}
.wdesc{font-size:15px; line-height:1.55; color:${C.ink2}; margin:0; max-width:30ch;}
.warrow{position:absolute; top:clamp(28px,3.4vw,52px); right:clamp(28px,3.4vw,52px);
  font-size:20px; color:${C.ink3}; opacity:0; transform:translate(-6px,6px); transition:.4s;}
.workcard:hover .warrow{opacity:1; transform:none;}
@media(max-width:760px){ .workgrid{grid-template-columns:1fr;} .workcard{min-height:0;} }

.indexlist{list-style:none; margin:0; padding:0;}
.indexrow{display:grid; grid-template-columns:1fr auto 28px; align-items:center; gap:20px;
  padding:clamp(16px,2vw,26px) 4px; border-top:1px solid ${C.line}; text-decoration:none;
  color:${C.ink}; transition:padding-left .35s, color .35s;}
.indexlist li:last-child .indexrow{border-bottom:1px solid ${C.line};}
.indexrow:hover{padding-left:18px;}
.ixname{font-size:clamp(22px,3.2vw,44px); font-weight:500; letter-spacing:-0.035em; line-height:1;}
.ixcat{font-family:${SERIF}; font-style:italic; font-size:clamp(15px,1.5vw,20px); color:${C.ink2};}
.ixmark{font-size:18px; color:${C.ink3}; opacity:0; transition:opacity .35s; text-align:right;}
.indexrow:hover .ixmark{opacity:1;}

.studio .studiogrid{display:grid; grid-template-columns:1.4fr 1fr; gap:clamp(40px,7vw,120px);}
.bigbody{font-size:clamp(24px,3vw,42px); font-weight:400; line-height:1.28; letter-spacing:-0.025em;
  margin:0;}
.meta{font-family:${SERIF}; font-style:italic; font-size:clamp(17px,1.7vw,22px); color:${C.ink2};
  margin:32px 0 0;}
.servlist{list-style:none; margin:0; padding:0;}
.servrow{display:flex; gap:16px; align-items:baseline; padding:14px 0; border-top:1px solid ${C.line};
  font-size:clamp(17px,1.7vw,21px); letter-spacing:-0.01em;}
.servidx{font-size:12px; color:${C.ink3}; min-width:24px;}
@media(max-width:760px){ .studio .studiogrid{grid-template-columns:1fr;} }

.foot .wrap{display:flex; flex-direction:column; align-items:flex-start; gap:clamp(36px,5vw,64px);}
.foothead{font-size:clamp(60px,13vw,196px);}
.accessform{display:flex; gap:10px; width:100%; max-width:560px; flex-wrap:wrap;}
.accessform input{flex:1; min-width:220px; background:transparent; border:none; border-bottom:1px solid ${C.ink};
  padding:14px 2px; font-size:19px; font-family:${SANS}; color:${C.ink}; outline:none; letter-spacing:-0.01em;}
.accessform input::placeholder{color:${C.ink3}; font-family:${SERIF}; font-style:italic;}
.accessform button{background:${C.ink}; color:${C.bg}; border:none; border-radius:100px;
  padding:14px 26px; font-size:15px; font-weight:600; cursor:pointer; font-family:${SANS}; transition:opacity .2s;}
.accessform button:hover{opacity:0.82;}
.accessdone{font-family:${SERIF}; font-style:italic; font-size:clamp(20px,2.4vw,30px); color:${C.ink}; margin:0;}
.footrow{display:flex; align-items:center; justify-content:space-between; width:100%;
  border-top:1px solid ${C.line}; padding-top:28px; flex-wrap:wrap; gap:18px;}
.footlinks{display:flex; gap:24px;}
.footlinks a{color:${C.ink2}; text-decoration:none; font-size:14px; transition:color .2s;}
.footlinks a:hover{color:${C.ink};}
.footnote{font-size:13px; color:${C.ink3};}

@media(prefers-reduced-motion: reduce){
  .scrollcue svg, .blivedot, .bgglow, .marquee-track{animation:none !important;}
}
`;
