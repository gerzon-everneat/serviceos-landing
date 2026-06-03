"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const L = {
  bg:      "#FFFFFF",
  bg2:     "#F5F5F3",
  bg3:     "#EEEEEB",
  border:  "#E5E7EB",
  border2: "#D1D5DB",
  text:    "#0A0A0A",
  text2:   "rgba(0,0,0,0.55)",
  text3:   "rgba(0,0,0,0.38)",
  green:   "#22C55E",
  green2:  "#16A34A",
};

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom", style }: {
  children: React.ReactNode; delay?: number; className?: string;
  from?: "bottom" | "left" | "right"; style?: React.CSSProperties;
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
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0, transform: on ? "none" : t,
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ─── Hero canvas — light version ────────────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let animId: number, W = 0, H = 0;
    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    const init = () => { nodes = Array.from({ length: 50 }, () => ({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3, r: Math.random()*1.2+0.4 })); };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        for (let j = i+1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x-b.x, dy = a.y-b.y, d = Math.sqrt(dx*dx+dy*dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,197,94,${(1-d/150)*0.18})`;
            ctx.lineWidth = 0.7; ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(34,197,94,0.45)`; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    const ro = new ResizeObserver(() => { resize(); init(); }); ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />;
}

/* ─── Grid bg — light version ────────────────────────────────────────────── */
function GridBg({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0,
      backgroundImage: `linear-gradient(to right,rgba(0,0,0,${opacity}) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,${opacity}) 1px,transparent 1px)`,
      backgroundSize: "80px 80px", pointerEvents: "none",
    }} />
  );
}

/* ─── Ops matrix — light version ─────────────────────────────────────────── */
type LogEntry = { id: number; icon: string; color: string; text: string; sub: string; ts: string };

function HeroAppMock() {
  const [phase, setPhase] = useState(0);
  const [revenue, setRevenue] = useState(3420);
  const [jobs, setJobs] = useState(8);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [calSlots, setCalSlots] = useState([false,false,false,false,false,false]);

  const EVENTS: LogEntry[] = [
    { id:1, icon:"📥", color:"#22C55E", text:"New booking received",   sub:"Sarah M. · Deep clean · $185",     ts:"just now" },
    { id:2, icon:"⚡", color:"#3B82F6", text:"Dispatch triggered",       sub:"Matching availability + location",  ts:"0s ago"   },
    { id:3, icon:"🗓️", color:"#8B5CF6", text:"Calendar slot reserved",  sub:"Thu Jun 12 · 10:00 AM · 2 bed",    ts:"0s ago"   },
    { id:4, icon:"⚡", color:"#F59E0B", text:"AI dispatch triggered",    sub:"Matching availability + location",  ts:"0s ago"   },
    { id:5, icon:"👤", color:"#22C55E", text:"Maria assigned",           sub:"0.8 mi · 4.9★ · notified via SMS", ts:"0s ago"   },
    { id:6, icon:"✉️", color:"#EC4899", text:"Confirmation sent",        sub:"Customer email + calendar invite",  ts:"0s ago"   },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    EVENTS.forEach((ev, i) => {
      timers.push(setTimeout(() => {
        setLog(prev => [{ ...ev, ts:"just now" }, ...prev].slice(0,6));
        if (i===0) { setRevenue(r=>r+185); setJobs(j=>j+1); setPhase(1); }
        if (i===1) setPhase(2);
        if (i===2) setCalSlots(s=>{ const n=[...s]; n[2]=true; return n; });
        if (i===3) setPhase(3);
        if (i===4) { setCalSlots(s=>{ const n=[...s]; n[2]=true; n[3]=true; return n; }); setPhase(4); }
        if (i===5) setPhase(5);
      }, 900 + i*1100));
    });
    timers.push(setTimeout(() => {
      setPhase(0); setRevenue(3420); setJobs(8);
      setLog([]); setCalSlots([false,false,false,false,false,false]);
    }, 900 + EVENTS.length*1100 + 2000));
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase===0 && log.length===0 ? 0 : -1]);

  useEffect(() => {
    if (phase!==0 || log.length!==0) return;
    const t = setTimeout(()=>setPhase(-1),100); return ()=>clearTimeout(t);
  }, [phase, log.length]);

  const DAYS  = ["Mon","Tue","Wed","Thu","Fri"];
  const HOURS = ["9am","10am","11am","1pm","2pm","3pm"];
  const statusColor = ["#aaa","#22C55E","#3B82F6","#F59E0B","#8B5CF6","#EC4899"];
  const statusLabel = ["Idle","Booking in","Payment","Calendar","Dispatch","Confirmed"];

  return (
    <div style={{ position:"relative", height:490, userSelect:"none" }}>
      <div style={{
        position:"absolute", inset:0, right:16,
        background:"#fff", borderRadius:14,
        border:`1px solid ${L.border}`,
        boxShadow:"0 24px 60px rgba(0,0,0,0.1)",
        overflow:"hidden", display:"flex", flexDirection:"column",
      }}>
        {/* top bar */}
        <div style={{ height:36, background:"#F5F5F5", borderBottom:`1px solid ${L.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 14px", flexShrink:0 }}>
          <div style={{ display:"flex", gap:6 }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c=><span key={c} style={{ width:9, height:9, borderRadius:"50%", background:c }} />)}
          </div>
          <span style={{ fontSize:10, color:L.text3, fontFamily:"monospace" }}>neatr.ai · ops matrix</span>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:phase>0?"#22C55E":"#ccc", transition:"background 0.4s" }} />
            <span style={{ fontSize:10, color:phase>0?"#22C55E":L.text3, fontFamily:"monospace", transition:"color 0.4s" }}>{statusLabel[Math.max(0,phase)]}</span>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, overflow:"hidden" }}>

          {/* LEFT */}
          <div style={{ borderRight:`1px solid ${L.border}`, display:"flex", flexDirection:"column" }}>
            {/* stat cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, borderBottom:`1px solid ${L.border}`, background:L.border }}>
              {[
                { label:"Revenue today", value:`$${revenue.toLocaleString()}`, color:"#22C55E", glow:phase>=2 },
                { label:"Jobs today",    value:String(jobs),                   color:"#3B82F6", glow:phase>=1 },
                { label:"Completion",    value:"94%",                          color:"#F59E0B", glow:false },
                { label:"Active pros",   value:"3",                            color:"#8B5CF6", glow:phase>=4 },
              ].map(({ label, value, color, glow }) => (
                <div key={label} style={{ padding:"10px 12px", background:"#fff" }}>
                  <div style={{ fontSize:9, color:L.text3, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:18, fontWeight:700, color:glow?color:L.text, letterSpacing:"-0.03em", transition:"color 0.4s" }}>{value}</div>
                </div>
              ))}
            </div>

            {/* calendar */}
            <div style={{ padding:"10px 12px", flex:1 }}>
              <div style={{ fontSize:9, color:L.text3, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Schedule · May</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:3, marginBottom:6 }}>
                {DAYS.map(d=><div key={d} style={{ fontSize:7, color:L.text3, textAlign:"center" }}>{d}</div>)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:3 }}>
                {HOURS.map((h,i)=>(
                  <div key={h} style={{
                    height:28, borderRadius:4,
                    background:calSlots[i]?"rgba(34,197,94,0.12)":"rgba(0,0,0,0.04)",
                    border:calSlots[i]?"1px solid rgba(34,197,94,0.4)":"1px solid transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:8, color:calSlots[i]?"#22C55E":L.text3,
                    transition:"all 0.4s",
                  }}>
                    {calSlots[i]?"●":h}
                  </div>
                ))}
              </div>

              {/* providers */}
              <div style={{ marginTop:12, borderTop:`1px solid ${L.border}`, paddingTop:10 }}>
                <div style={{ fontSize:9, color:L.text3, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Providers</div>
                {[
                  { name:"Maria L.", status:phase>=4?"assigned":"available", color:"#22C55E" },
                  { name:"Jake R.",  status:"on job",    color:"#F59E0B" },
                  { name:"Ana C.",   status:"available", color:"#22C55E" },
                ].map(({ name, status, color })=>(
                  <div key={name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(0,0,0,0.07)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:L.text, fontWeight:700 }}>{name[0]}</div>
                      <span style={{ fontSize:10, color:L.text2 }}>{name}</span>
                    </div>
                    <span style={{ fontSize:9, color, background:`${color}15`, padding:"2px 6px", borderRadius:4, fontWeight:600 }}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — log */}
          <div style={{ display:"flex", flexDirection:"column", padding:"10px 0" }}>
            <div style={{ fontSize:9, color:L.text3, textTransform:"uppercase", letterSpacing:"0.06em", padding:"0 12px", marginBottom:8 }}>Live activity</div>
            <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column", gap:1 }}>
              {log.length===0 && (
                <div style={{ padding:"16px 12px", textAlign:"center" }}>
                  <div style={{ fontSize:10, color:L.text3, lineHeight:1.6 }}>Waiting for<br />next booking…</div>
                  <div style={{ marginTop:8, display:"flex", justifyContent:"center", gap:3 }}>
                    {[0,1,2].map(i=>(
                      <span key={i} style={{ width:4, height:4, borderRadius:"50%", background:"rgba(0,0,0,0.15)", animation:`pulse7 1.2s ease-in-out ${i*0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              {log.map((entry,i)=>(
                <div key={entry.id} style={{
                  padding:"8px 12px",
                  background:i===0?"rgba(0,0,0,0.025)":"transparent",
                  borderLeft:i===0?`2px solid ${entry.color}`:"2px solid transparent",
                  transition:"all 0.4s",
                  animation:i===0?"slideIn7 0.4s cubic-bezier(0.16,1,0.3,1)":"none",
                }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:2 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                      <span style={{ fontSize:11 }}>{entry.icon}</span>
                      <span style={{ fontSize:11, fontWeight:600, color:i===0?entry.color:L.text2 }}>{entry.text}</span>
                    </div>
                    <span style={{ fontSize:9, color:L.text3, fontFamily:"monospace" }}>{entry.ts}</span>
                  </div>
                  <div style={{ fontSize:10, color:L.text3, paddingLeft:16 }}>{entry.sub}</div>
                </div>
              ))}
            </div>

            {/* pipeline */}
            <div style={{ padding:"10px 12px", borderTop:`1px solid ${L.border}`, marginTop:"auto" }}>
              <div style={{ fontSize:9, color:L.text3, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Pipeline</div>
              <div style={{ display:"flex", gap:3 }}>
                {["Received","Paid","Scheduled","Matched","Sent"].map((s,i)=>(
                  <div key={s} style={{ flex:1 }}>
                    <div style={{ height:3, borderRadius:2, background:phase>i?statusColor[i+1]:"rgba(0,0,0,0.1)", transition:"background 0.5s" }} />
                    <div style={{ fontSize:8, color:phase>i?L.text2:L.text3, marginTop:4, textAlign:"center" }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {phase===1 && (
        <div style={{ position:"absolute", top:12, right:12, width:8, height:8, borderRadius:"50%", background:"#22C55E", boxShadow:"0 0 0 4px rgba(34,197,94,0.25)" }} />
      )}

      <style>{`
        @keyframes slideIn7 { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
        @keyframes pulse7 { 0%,100%{opacity:0.3} 50%{opacity:1} }
      `}</style>
    </div>
  );
}

/* ─── Browser frame (light) ──────────────────────────────────────────────── */
function AppFrameLight({ src, alt, height=420, url="book.neatr.ai" }: { src:string; alt:string; height?:number; url?:string }) {
  return (
    <div style={{ border:`1px solid ${L.border}`, borderRadius:12, overflow:"hidden", background:"#fff", boxShadow:"0 16px 60px rgba(0,0,0,0.1)" }}>
      <div style={{ height:32, background:"#F5F5F5", borderBottom:`1px solid ${L.border}`, display:"flex", alignItems:"center", gap:6, padding:"0 12px" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><span key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
        <span style={{ marginLeft:8, height:18, flex:1, maxWidth:240, background:L.border, borderRadius:4, fontSize:10, color:"#999", display:"flex", alignItems:"center", paddingLeft:8 }}>{url}</span>
      </div>
      <div style={{ height, position:"relative", overflow:"hidden" }}>
        <Image src={src} alt={alt} fill style={{ objectFit:"cover", objectPosition:"top" }} />
      </div>
    </div>
  );
}

/* ─── Booking demo iframe ────────────────────────────────────────────────── */
function BookingDemo() {
  return (
    <div style={{ border:`1px solid ${L.border}`, borderRadius:12, overflow:"hidden", boxShadow:"0 16px 50px rgba(0,0,0,0.1)" }}>
      <div style={{ height:32, background:"#F5F5F5", borderBottom:`1px solid ${L.border}`, display:"flex", alignItems:"center", gap:6, padding:"0 12px" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c=><span key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
        <span style={{ marginLeft:8, height:18, flex:1, maxWidth:240, background:L.border, borderRadius:4, fontSize:10, color:"#999", display:"flex", alignItems:"center", paddingLeft:8 }}>book.neatr.ai/booking</span>
      </div>
      <iframe src="http://localhost:4100/booking" style={{ width:"100%", height:520, border:"none", background:"#fff" }} title="neatr.ai booking flow" />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function V7() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:L.bg, color:L.text, overflowX:"hidden" }}>

      {/* NAV */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 32px", height:56,
        borderBottom:`1px solid ${L.border}`,
        background:"rgba(255,255,255,0.88)", backdropFilter:"blur(12px)",
      }}>
        <a href="/" style={{ color:L.text, textDecoration:"none", fontWeight:700, fontSize:15, letterSpacing:"-0.01em" }}>[NEATR.AI]</a>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          <div style={{ display:"flex", gap:28, fontSize:13, color:L.text2 }}>
            {["Features","How it works","Pricing"].map(l=>(
              <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
                style={{ color:"inherit", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e=>((e.target as HTMLElement).style.color=L.text)}
                onMouseLeave={e=>((e.target as HTMLElement).style.color=L.text2)}
              >{l}</a>
            ))}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <a href="http://localhost:4100/auth/login" target="_blank" rel="noreferrer" style={{
              padding:"6px 14px", border:`1px solid ${L.border2}`, borderRadius:6,
              fontSize:13, color:L.text2, textDecoration:"none", transition:"border-color 0.2s,color 0.2s",
            }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor="#9CA3AF"; (e.currentTarget as HTMLElement).style.color=L.text; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=L.border2; (e.currentTarget as HTMLElement).style.color=L.text2; }}
            >Sign in</a>
            <a href="#waitlist" style={{
              padding:"6px 14px", background:L.text, color:"#fff", borderRadius:6,
              fontSize:13, fontWeight:600, textDecoration:"none", transition:"opacity 0.2s",
            }}
              onMouseEnter={e=>((e.currentTarget as HTMLElement).style.opacity="0.8")}
              onMouseLeave={e=>((e.currentTarget as HTMLElement).style.opacity="1")}
            >Get early access</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"120px 80px 80px", overflow:"hidden", background:L.bg }}>
        <HeroCanvas />
        <GridBg opacity={0.04} />
        <div aria-hidden style={{ position:"absolute", top:"30%", right:"10%", width:600, height:600, background:"radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <Reveal>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(34,197,94,0.35)", background:"rgba(34,197,94,0.07)", borderRadius:20, padding:"4px 12px", fontSize:12, color:L.green, marginBottom:32, letterSpacing:"0.04em" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:L.green }} />
                Early access — now accepting signups
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1 style={{ fontSize:"clamp(42px,5vw,72px)", fontWeight:700, lineHeight:1.05, letterSpacing:"-0.04em", margin:"0 0 24px", color:L.text }}>
                Your booking<br />system,<br /><span style={{ color:L.green }}>automated.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontSize:18, lineHeight:1.65, color:L.text2, margin:"0 0 40px", maxWidth:460 }}>
                From online booking to automated team dispatch — neatr.ai gives cleaning businesses a complete system that runs itself.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
                <a href="#waitlist" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px", background:L.green, color:"#fff", borderRadius:8, fontSize:15, fontWeight:700, textDecoration:"none", transition:"transform 0.15s,background 0.2s" }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background=L.green2; (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background=L.green; (e.currentTarget as HTMLElement).style.transform="none"; }}
                >
                  Join the waitlist
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#booking-demo" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px", border:`1px solid ${L.border2}`, color:L.text2, borderRadius:8, fontSize:15, fontWeight:500, textDecoration:"none", transition:"border-color 0.2s,color 0.2s" }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor="#9CA3AF"; (e.currentTarget as HTMLElement).style.color=L.text; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=L.border2; (e.currentTarget as HTMLElement).style.color=L.text2; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  See it live
                </a>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display:"flex", gap:24, marginTop:40 }}>
                {[{ n:"500+",l:"on the waitlist" },{ n:"50K+",l:"bookings to process" },{ n:"4.9★",l:"beta rating" }].map(({ n,l })=>(
                  <div key={n}>
                    <div style={{ fontSize:22, fontWeight:700, color:L.text, letterSpacing:"-0.03em" }}>{n}</div>
                    <div style={{ fontSize:12, color:L.text3, marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal from="right" delay={200}><HeroAppMock /></Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ background:L.bg2, color:L.text, padding:"100px 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal><p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:L.text3, marginBottom:24, textTransform:"uppercase" }}>The problem</p></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
            <Reveal delay={60}>
              <h2 style={{ fontSize:"clamp(32px,3.5vw,52px)", fontWeight:700, lineHeight:1.1, letterSpacing:"-0.035em", margin:0 }}>
                The booking<br />feedback loop<br />is broken.
              </h2>
            </Reveal>
            <div>
              <Reveal delay={100}>
                <p style={{ fontSize:17, lineHeight:1.7, color:L.text2, margin:"0 0 32px" }}>
                  Most home service businesses run on a patchwork of Google Sheets, text messages, and manual bank transfers. Every booking takes 20 minutes of back-and-forth. Every payment is chased manually.
                </p>
              </Reveal>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[
                  "Customers text to book, you reply to confirm, then forget",
                  "Spreadsheets don't tell you who's showing up tomorrow",
                  "Chasing payments after every job kills your time",
                  "No system for recurring customers — they just drift away",
                ].map((t,i)=>(
                  <Reveal key={t} delay={140+i*40}>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <span style={{ width:20, height:20, borderRadius:"50%", background:"#FFE4E4", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </span>
                      <span style={{ fontSize:15, color:L.text2, lineHeight:1.55 }}>{t}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION / BOOKING DEMO */}
      <section id="booking-demo" style={{ background:L.bg, padding:"100px 80px", position:"relative", overflow:"hidden" }}>
        <GridBg opacity={0.035} />
        <div aria-hidden style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, background:"radial-gradient(circle,rgba(34,197,94,0.05) 0%,transparent 65%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:80, alignItems:"center" }}>
            <div>
              <Reveal><p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:L.green, marginBottom:24, textTransform:"uppercase" }}>Fix the loop</p></Reveal>
              <Reveal delay={60}>
                <h2 style={{ fontSize:"clamp(30px,3vw,48px)", fontWeight:700, lineHeight:1.1, letterSpacing:"-0.035em", margin:"0 0 24px", color:L.text }}>
                  One booking form.<br />Everything else<br /><span style={{ color:L.green }}>runs itself.</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p style={{ fontSize:16, lineHeight:1.7, color:L.text2, margin:"0 0 36px" }}>
                  Customers book from any device, pick their service, and confirm in seconds. Your calendar fills automatically. The right team member gets dispatched. You see everything in real time.
                </p>
              </Reveal>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[
                  { label:"Customer books online",      desc:"24/7, from any device, no back-and-forth" },
                  { label:"Booking confirmed instantly", desc:"Automatic confirmation, zero manual work" },
                  { label:"Team auto-dispatched",        desc:"Right person, right time, right location" },
                  { label:"Follow-ups send themselves",  desc:"Reminders and review requests automated" },
                ].map(({ label,desc },i)=>(
                  <Reveal key={label} delay={140+i*40}>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <span style={{ width:20, height:20, borderRadius:"50%", background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, color:L.text, marginBottom:2 }}>{label}</div>
                        <div style={{ fontSize:13, color:L.text3 }}>{desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal from="right" delay={160}>
              <BookingDemo />
              <p style={{ textAlign:"center", fontSize:12, color:L.text3, marginTop:12 }}>↑ This is the real booking flow — try it</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <section id="features" style={{ background:L.bg2, color:L.text, padding:"100px 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:80, alignItems:"center" }}>
            <Reveal from="left" delay={80}>
              <AppFrameLight src="/assets/v6-calendar.png" alt="neatr.ai schedule calendar" height={420} url="book.neatr.ai/schedule" />
            </Reveal>
            <div>
              <Reveal><p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:L.text3, marginBottom:24, textTransform:"uppercase" }}>Smart scheduling</p></Reveal>
              <Reveal delay={60}>
                <h2 style={{ fontSize:"clamp(28px,2.8vw,44px)", fontWeight:700, lineHeight:1.1, letterSpacing:"-0.035em", margin:"0 0 24px" }}>
                  AI scheduling<br />that actually<br />works.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p style={{ fontSize:16, lineHeight:1.7, color:L.text2, margin:"0 0 32px" }}>
                  Your calendar auto-populates as bookings come in. AI scheduling routes jobs to the right team member based on availability, location, and skills.
                </p>
              </Reveal>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[
                  { icon:"📅", title:"Real-time calendar",        body:"See every booking, every provider, every day — at a glance." },
                  { icon:"🤖", title:"AI auto-assign",            body:"Define rules once. The system handles dispatch automatically." },
                  { icon:"🔔", title:"Provider notifications",    body:"Team gets SMS/email the moment they're assigned to a job." },
                ].map(({ icon,title,body },i)=>(
                  <Reveal key={title} delay={140+i*40}>
                    <div style={{ display:"flex", gap:14, padding:"16px", border:`1px solid ${L.border}`, borderRadius:10, background:L.bg }}>
                      <span style={{ fontSize:20, flexShrink:0 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, marginBottom:4, color:L.text }}>{title}</div>
                        <div style={{ fontSize:13, color:L.text2, lineHeight:1.5 }}>{body}</div>
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
      <section style={{ background:L.bg, padding:"100px 80px", position:"relative", overflow:"hidden" }}>
        <GridBg opacity={0.035} />
        <div aria-hidden style={{ position:"absolute", bottom:0, left:"20%", width:600, height:400, background:"radial-gradient(ellipse at bottom,rgba(34,197,94,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:80, alignItems:"center" }}>
            <div>
              <Reveal><p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:L.green, marginBottom:24, textTransform:"uppercase" }}>Full visibility</p></Reveal>
              <Reveal delay={60}>
                <h2 style={{ fontSize:"clamp(28px,2.8vw,44px)", fontWeight:700, lineHeight:1.1, letterSpacing:"-0.035em", margin:"0 0 24px", color:L.text }}>
                  Production<br />analytics for<br />your business.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p style={{ fontSize:16, lineHeight:1.7, color:L.text2, margin:"0 0 36px" }}>
                  Revenue trends, booking status breakdown, team performance, and customer retention — all in one dashboard.
                </p>
              </Reveal>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[
                  { label:"Total Bookings",   color:"#22C55E" },
                  { label:"Revenue",          color:"#3B82F6" },
                  { label:"Completion Rate",  color:"#F59E0B" },
                  { label:"Active Customers", color:"#8B5CF6" },
                ].map(({ label,color },i)=>(
                  <Reveal key={label} delay={140+i*40}>
                    <div style={{ padding:"16px", border:`1px solid ${color}33`, borderRadius:10, background:`${color}07` }}>
                      <div style={{ fontSize:11, color, fontWeight:700, letterSpacing:"0.05em", marginBottom:8, textTransform:"uppercase" }}>{label}</div>
                      <div style={{ fontSize:24, fontWeight:700, color:L.text, letterSpacing:"-0.04em" }}>—</div>
                      <div style={{ fontSize:11, color:L.text3, marginTop:4 }}>Live from your account</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal from="right" delay={160}>
              <AppFrameLight src="/assets/v6-overview.png" alt="neatr.ai overview dashboard" height={460} url="book.neatr.ai/dashboard" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background:L.bg2, color:L.text, padding:"100px 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal><p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:L.text3, marginBottom:16, textTransform:"uppercase" }}>How it works</p></Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize:"clamp(28px,3vw,48px)", fontWeight:700, lineHeight:1.1, letterSpacing:"-0.035em", margin:"0 0 64px", maxWidth:480 }}>
              Free, open, and<br />scalable — running<br />in minutes.
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:40 }}>
            {[
              { n:"01", title:"Set up your booking page",      body:"Create your service menu, pricing, and availability. Your booking page is live and shareable instantly.",            tag:"5 min setup"    },
              { n:"02", title:"Customers book themselves",      body:"Share a link or embed the widget. Customers pick their service, date, and time — zero friction.",            tag:"24/7 bookings"   },
              { n:"03", title:"Team auto-dispatched",           body:"The right team member gets notified and confirmed. You see everything on your dashboard in real time.",             tag:"Fully automated" },
              { n:"04", title:"Job done, follow-up sent",        body:"Once complete, review requests go out and the next recurring booking is already queued.",                    tag:"Runs itself"     },
            ].map(({ n,title,body,tag },i)=>(
              <Reveal key={n} delay={i*80}>
                <div style={{ position:"relative" }}>
                  <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", color:L.text3, marginBottom:20 }}>{n}</div>
                  <div style={{ position:"absolute", top:0, left:0, width:1, height:"calc(100% + 24px)", background:L.border }} />
                  <div style={{ paddingLeft:20 }}>
                    <h3 style={{ fontSize:16, fontWeight:700, margin:"0 0 10px", letterSpacing:"-0.01em", color:L.text }}>{title}</h3>
                    <p style={{ fontSize:14, lineHeight:1.65, color:L.text2, margin:"0 0 16px" }}>{body}</p>
                    <span style={{ display:"inline-block", fontSize:11, fontWeight:600, padding:"3px 10px", background:L.text, color:"#fff", borderRadius:20, letterSpacing:"0.02em" }}>{tag}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background:L.bg, padding:"100px 80px", position:"relative", overflow:"hidden" }}>
        <GridBg opacity={0.035} />
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal><p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:L.green, marginBottom:16, textTransform:"uppercase" }}>Pricing</p></Reveal>
          <Reveal delay={40}><h2 style={{ fontSize:"clamp(28px,3vw,48px)", fontWeight:700, letterSpacing:"-0.035em", margin:"0 0 16px", color:L.text }}>Simple, honest pricing.</h2></Reveal>
          <Reveal delay={80}><p style={{ fontSize:17, color:L.text2, margin:"0 0 64px" }}>Lock in early access pricing before we launch.</p></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, maxWidth:700 }}>
            {[
              { name:"Starter",  price:"Free", sub:"For new businesses",    features:["Up to 20 bookings/month","Online booking page","Customer portal","Basic analytics"],                                              highlight:false },
              { name:"Business", price:"$49",  sub:"/mo · most popular",    features:["Unlimited bookings","Smart team dispatch","Automated scheduling","Custom branding","Priority support","Advanced analytics"],    highlight:true  },
            ].map(({ name,price,sub,features,highlight },i)=>(
              <Reveal key={name} delay={120+i*60}>
                <div style={{ padding:"32px", border:highlight?`1px solid rgba(34,197,94,0.5)`:`1px solid ${L.border}`, borderRadius:12, background:highlight?"rgba(34,197,94,0.04)":L.bg2, position:"relative" }}>
                  {highlight && <div style={{ position:"absolute", top:-12, left:24, background:L.green, color:"#fff", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, letterSpacing:"0.04em" }}>MOST POPULAR</div>}
                  <div style={{ fontSize:13, fontWeight:600, color:L.text2, marginBottom:12 }}>{name}</div>
                  <div style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.04em", color:L.text, marginBottom:4 }}>{price}</div>
                  <div style={{ fontSize:13, color:L.text3, marginBottom:28 }}>{sub}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:32 }}>
                    {features.map(f=>(
                      <div key={f} style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={highlight?"#22C55E":"#9CA3AF"} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize:14, color:L.text2 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#waitlist" style={{
                    display:"block", textAlign:"center", padding:"11px 24px",
                    background:highlight?L.green:"transparent",
                    border:highlight?"none":`1px solid ${L.border2}`,
                    color:highlight?"#fff":L.text2,
                    borderRadius:8, fontSize:14, fontWeight:600, textDecoration:"none", transition:"opacity 0.2s",
                  }}
                    onMouseEnter={e=>((e.currentTarget as HTMLElement).style.opacity="0.8")}
                    onMouseLeave={e=>((e.currentTarget as HTMLElement).style.opacity="1")}
                  >Join the waitlist</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ background:L.bg2, color:L.text, padding:"100px 80px" }}>
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"center", gap:4, marginBottom:32 }}>
              {[...Array(5)].map((_,i)=><svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <blockquote style={{ fontSize:"clamp(20px,2.5vw,28px)", fontWeight:500, lineHeight:1.45, letterSpacing:"-0.02em", margin:"0 0 36px", color:L.text }}>
              "We went from managing bookings in a Google Sheet to having 40+ recurring customers managed automatically. neatr.ai paid for itself in the first week."
            </blockquote>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display:"flex", alignItems:"center", gap:12, justifyContent:"center" }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:L.text, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:15 }}>J</div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:14, fontWeight:600, color:L.text }}>Jamie Rodriguez</div>
                <div style={{ fontSize:13, color:L.text2 }}>Owner, Sparkle Clean NYC · Beta tester</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" style={{ background:L.green, padding:"100px 80px", position:"relative", overflow:"hidden" }}>
        <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(to right,rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.05) 1px,transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }} />
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <Reveal><p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", color:"rgba(0,0,0,0.45)", marginBottom:20, textTransform:"uppercase" }}>Limited early access</p></Reveal>
          <Reveal delay={40}>
            <h2 style={{ fontSize:"clamp(32px,4vw,60px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.04em", color:"#000", margin:"0 0 20px" }}>
              Understand your<br />booking business.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontSize:17, color:"rgba(0,0,0,0.6)", margin:"0 0 40px", lineHeight:1.65 }}>
              Join 500+ home service businesses on the waitlist. Early members get free access and locked-in pricing.
            </p>
          </Reveal>
          <Reveal delay={120}>
            {submitted ? (
              <div style={{ padding:"16px 24px", background:"rgba(0,0,0,0.1)", borderRadius:10, fontSize:15, fontWeight:600, color:"#000" }}>
                ✓ You're on the list! We'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={e=>{ e.preventDefault(); if(email) setSubmitted(true); }} style={{ display:"flex", gap:8 }}>
                <input type="email" required placeholder="Enter your work email" value={email} onChange={e=>setEmail(e.target.value)}
                  style={{ flex:1, padding:"14px 18px", borderRadius:8, border:"none", fontSize:15, outline:"none", background:"rgba(255,255,255,0.55)", color:"#000" }} />
                <button type="submit" style={{ padding:"14px 24px", background:"#000", color:"#fff", borderRadius:8, border:"none", fontSize:15, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", transition:"opacity 0.2s" }}
                  onMouseEnter={e=>((e.currentTarget as HTMLElement).style.opacity="0.8")}
                  onMouseLeave={e=>((e.currentTarget as HTMLElement).style.opacity="1")}
                >Join waitlist →</button>
              </form>
            )}
          </Reveal>
          <Reveal delay={160}>
            <div style={{ display:"flex", justifyContent:"center", gap:28, marginTop:24 }}>
              {["Free early access","No credit card","Be first to launch"].map(t=>(
                <div key={t} style={{ display:"flex", gap:6, alignItems:"center", fontSize:13, color:"rgba(0,0,0,0.55)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:L.bg3, borderTop:`1px solid ${L.border}`, padding:"40px 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="/" style={{ color:L.text, textDecoration:"none", fontWeight:700, fontSize:14 }}>[NEATR.AI]</a>
          <div style={{ display:"flex", gap:24, fontSize:13, color:L.text3 }}>
            {["Privacy Policy","Security","Sub-processors"].map(l=>(
              <a key={l} href="#" style={{ color:"inherit", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e=>((e.target as HTMLElement).style.color=L.text2)}
                onMouseLeave={e=>((e.target as HTMLElement).style.color=L.text3)}
              >{l}</a>
            ))}
          </div>
          <span style={{ fontSize:12, color:L.text3 }}>© 2026 neatr.ai. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
