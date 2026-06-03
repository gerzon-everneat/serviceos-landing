"use client";

import { useState } from "react";

/* ─── Design tokens (matches v7) ─────────────────────────────────────────── */
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

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  { id: "regular",  label: "Regular Clean",   desc: "2 hrs · Weekly or bi-weekly maintenance",    price: "$95"  },
  { id: "deep",     label: "Deep Clean",       desc: "3–4 hrs · Full home deep clean",             price: "$180" },
  { id: "moveout",  label: "Move-Out Clean",   desc: "4–5 hrs · End-of-lease clean",              price: "$220" },
  { id: "postreno", label: "Post-Reno Clean",  desc: "5–6 hrs · After construction dust & debris", price: "$280" },
];

const TIMES = ["8:00am","9:00am","10:00am","11:00am","1:00pm","2:00pm","3:00pm","4:00pm"];

const DAY  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MON  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getDates() {
  const out: { label: string; day: string; month: string; iso: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i);
    out.push({ label: DAY[d.getDay()], day: String(d.getDate()), month: MON[d.getMonth()], iso: d.toISOString() });
  }
  return out;
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", color:L.text3, fontSize:13, marginBottom:24, padding:0, display:"flex", alignItems:"center", gap:4 }}>
      ← Back
    </button>
  );
}

function ContinueBtn({ label = "Continue →", disabled, onClick }: { label?: string; disabled?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:"100%", padding:"15px 24px", borderRadius:12, border:"none",
      cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? L.border : L.green,
      color:"#fff", fontWeight:700, fontSize:15, marginTop:28,
      transition:"background 0.2s", fontFamily:"inherit",
    }}>{label}</button>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function BookingPage() {
  const [step, setStep]       = useState(0);
  const [service, setService] = useState("");
  const [date, setDate]       = useState("");
  const [time, setTime]       = useState("");
  const [form, setForm]       = useState({ name:"", email:"", phone:"", address:"", notes:"" });

  const dates   = getDates();
  const sel     = SERVICES.find(s => s.id === service);
  const selDate = dates.find(d => d.iso === date);

  const STEPS = ["Service", "Date & Time", "Details"];
  const ready2 = date && time;
  const ready3 = form.name && form.email && form.address;

  return (
    <div style={{ minHeight:"100vh", background:L.bg, fontFamily:"var(--font-dm-sans), system-ui, sans-serif" }}>

      {/* ── Nav ── */}
      <nav style={{ borderBottom:`1px solid ${L.border}`, padding:"0 24px" }}>
        <div style={{ maxWidth:720, margin:"0 auto", height:56, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="/" style={{ fontWeight:700, fontSize:15, letterSpacing:"-0.01em", color:L.text, textDecoration:"none" }}>[NEATR.AI]</a>
          <span style={{ fontSize:13, color:L.text3 }}>Book a service</span>
        </div>
      </nav>

      {/* ── Body ── */}
      <div style={{ maxWidth:620, margin:"0 auto", padding:"52px 24px 120px" }}>

        {/* Progress bar */}
        {step < 3 && (
          <div style={{ display:"flex", gap:8, marginBottom:44 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ flex:1 }}>
                <div style={{ height:3, borderRadius:2, marginBottom:6, background: i <= step ? L.green : L.border, transition:"background 0.4s" }} />
                <span style={{ fontSize:11, fontWeight: i === step ? 600 : 400, color: i <= step ? L.green : L.text3, transition:"color 0.4s" }}>{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Step 0: Service ── */}
        {step === 0 && (
          <div>
            <h1 style={{ fontSize:"clamp(26px,4vw,38px)", fontWeight:700, letterSpacing:"-0.03em", color:L.text, marginBottom:8, lineHeight:1.15 }}>
              What do you need done?
            </h1>
            <p style={{ color:L.text2, marginBottom:32, fontSize:15 }}>Pick a service to get started. No commitment.</p>

            <div style={{ display:"grid", gap:10 }}>
              {SERVICES.map(s => (
                <button key={s.id} onClick={() => { setService(s.id); setStep(1); }} style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"18px 20px", borderRadius:12, cursor:"pointer", textAlign:"left",
                  border:`1.5px solid ${service === s.id ? L.green : L.border}`,
                  background: service === s.id ? "rgba(34,197,94,0.06)" : L.bg,
                  transition:"all 0.15s", fontFamily:"inherit",
                }}>
                  <div>
                    <p style={{ fontWeight:600, fontSize:15, color:L.text, marginBottom:3 }}>{s.label}</p>
                    <p style={{ fontSize:13, color:L.text2 }}>{s.desc}</p>
                  </div>
                  <span style={{ fontWeight:700, fontSize:16, color:L.green, marginLeft:20, flexShrink:0 }}>{s.price}</span>
                </button>
              ))}
            </div>

            <p style={{ marginTop:28, fontSize:12, color:L.text3, textAlign:"center" }}>
              Not sure? <a href="/" style={{ color:L.green2, textDecoration:"none" }}>Talk to us first →</a>
            </p>
          </div>
        )}

        {/* ── Step 1: Date & Time ── */}
        {step === 1 && (
          <div>
            <BackBtn onClick={() => setStep(0)} />
            <h1 style={{ fontSize:"clamp(26px,4vw,38px)", fontWeight:700, letterSpacing:"-0.03em", color:L.text, marginBottom:8, lineHeight:1.15 }}>
              When works for you?
            </h1>
            <p style={{ color:L.text2, marginBottom:32, fontSize:15 }}>
              {sel?.label} · <span style={{ color:L.green, fontWeight:600 }}>{sel?.price}</span>
            </p>

            {/* Date row */}
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", color:L.text3, marginBottom:10 }}>Choose a date</p>
            <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, marginBottom:28, scrollbarWidth:"none" }}>
              {dates.map(d => (
                <button key={d.iso} onClick={() => { setDate(d.iso); setTime(""); }} style={{
                  flexShrink:0, padding:"10px 14px", borderRadius:10, cursor:"pointer", textAlign:"center",
                  border:`1.5px solid ${date === d.iso ? L.green : L.border}`,
                  background: date === d.iso ? "rgba(34,197,94,0.08)" : L.bg,
                  display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                  transition:"all 0.15s", fontFamily:"inherit",
                }}>
                  <span style={{ fontSize:10, fontWeight:600, color: date === d.iso ? L.green : L.text3 }}>{d.label}</span>
                  <span style={{ fontSize:15, fontWeight:700, color: date === d.iso ? L.green : L.text }}>{d.day}</span>
                  <span style={{ fontSize:10, color: date === d.iso ? L.green2 : L.text3 }}>{d.month}</span>
                </button>
              ))}
            </div>

            {/* Time grid */}
            {date && (
              <>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", color:L.text3, marginBottom:10 }}>Available times</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(108px, 1fr))", gap:8, marginBottom:8 }}>
                  {TIMES.map(t => (
                    <button key={t} onClick={() => setTime(t)} style={{
                      padding:"13px 8px", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:500,
                      border:`1.5px solid ${time === t ? L.green : L.border}`,
                      background: time === t ? "rgba(34,197,94,0.08)" : L.bg,
                      color: time === t ? L.green2 : L.text,
                      transition:"all 0.15s", fontFamily:"inherit",
                    }}>{t}</button>
                  ))}
                </div>
              </>
            )}

            <ContinueBtn disabled={!ready2} onClick={() => setStep(2)} />
          </div>
        )}

        {/* ── Step 2: Details ── */}
        {step === 2 && (
          <div>
            <BackBtn onClick={() => setStep(1)} />
            <h1 style={{ fontSize:"clamp(26px,4vw,38px)", fontWeight:700, letterSpacing:"-0.03em", color:L.text, marginBottom:8, lineHeight:1.15 }}>
              A few details
            </h1>
            <p style={{ color:L.text2, marginBottom:24, fontSize:15 }}>Confirmation goes straight to your inbox.</p>

            {/* Booking summary */}
            <div style={{ background:L.bg2, borderRadius:12, padding:"14px 18px", marginBottom:28, display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ fontSize:13, fontWeight:600, color:L.text }}>{sel?.label}</span>
              <span style={{ color:L.border2 }}>·</span>
              <span style={{ fontSize:13, color:L.text2 }}>{selDate?.label} {selDate?.day} {selDate?.month}</span>
              <span style={{ color:L.border2 }}>·</span>
              <span style={{ fontSize:13, color:L.text2 }}>{time}</span>
              <span style={{ color:L.border2 }}>·</span>
              <span style={{ fontSize:13, fontWeight:700, color:L.green }}>{sel?.price}</span>
            </div>

            <div style={{ display:"grid", gap:16 }}>
              {([
                { key:"name",    label:"Full name",       placeholder:"Jane Smith",             type:"text"  },
                { key:"email",   label:"Email",           placeholder:"jane@email.com",         type:"email" },
                { key:"phone",   label:"Phone (optional)",placeholder:"+1 (555) 000-0000",      type:"tel"   },
                { key:"address", label:"Service address", placeholder:"123 Main St, City, State",type:"text" },
              ] as const).map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:11, fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", color:L.text3, display:"block", marginBottom:7 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type} placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width:"100%", padding:"13px 14px", borderRadius:10, fontSize:14,
                      border:`1.5px solid ${L.border}`, background:L.bg, color:L.text,
                      outline:"none", boxSizing:"border-box", fontFamily:"inherit",
                      transition:"border-color 0.15s",
                    }}
                    onFocus={e => (e.target.style.borderColor = L.green)}
                    onBlur={e => (e.target.style.borderColor = L.border)}
                  />
                </div>
              ))}

              {/* Notes */}
              <div>
                <label style={{ fontSize:11, fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", color:L.text3, display:"block", marginBottom:7 }}>
                  Special instructions (optional)
                </label>
                <textarea
                  placeholder="e.g. key code, pets, specific areas to focus on…"
                  value={form.notes}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  rows={3}
                  style={{
                    width:"100%", padding:"13px 14px", borderRadius:10, fontSize:14, resize:"vertical",
                    border:`1.5px solid ${L.border}`, background:L.bg, color:L.text,
                    outline:"none", boxSizing:"border-box", fontFamily:"inherit",
                    transition:"border-color 0.15s",
                  }}
                  onFocus={e => (e.target.style.borderColor = L.green)}
                  onBlur={e => (e.target.style.borderColor = L.border)}
                />
              </div>
            </div>

            <ContinueBtn
              label="Confirm booking →"
              disabled={!ready3}
              onClick={() => { if (ready3) setStep(3); }}
            />
            <p style={{ textAlign:"center", fontSize:12, color:L.text3, marginTop:14 }}>No payment required now · Free cancellation 24hrs before</p>
          </div>
        )}

        {/* ── Step 3: Confirmed ── */}
        {step === 3 && (
          <div style={{ textAlign:"center" }}>
            {/* Check circle */}
            <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(34,197,94,0.12)", border:`2px solid rgba(34,197,94,0.3)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", fontSize:30, color:L.green }}>
              ✓
            </div>

            <h1 style={{ fontSize:"clamp(26px,4vw,38px)", fontWeight:700, letterSpacing:"-0.03em", color:L.text, marginBottom:10, lineHeight:1.15 }}>
              You&apos;re booked!
            </h1>
            <p style={{ color:L.text2, fontSize:15, marginBottom:36, maxWidth:380, margin:"0 auto 36px" }}>
              Confirmation sent to <strong>{form.email}</strong>. We&apos;ll be there right on time.
            </p>

            {/* Summary card */}
            <div style={{ background:L.bg2, borderRadius:16, padding:"24px 28px", maxWidth:380, margin:"0 auto 36px", textAlign:"left" }}>
              {([
                { label:"Service", value: sel?.label },
                { label:"Date",    value: `${selDate?.label} ${selDate?.day} ${selDate?.month}` },
                { label:"Time",    value: time },
                { label:"Address", value: form.address },
                { label:"Name",    value: form.name },
              ] as const).map((r, i) => (
                <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"10px 0", borderBottom: i < 4 ? `1px solid ${L.border}` : "none" }}>
                  <span style={{ fontSize:13, color:L.text3 }}>{r.label}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:L.text, textAlign:"right", maxWidth:200 }}>{r.value}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", paddingTop:14, marginTop:4 }}>
                <span style={{ fontSize:14, fontWeight:600, color:L.text }}>Total</span>
                <span style={{ fontSize:16, fontWeight:700, color:L.green }}>{sel?.price}</span>
              </div>
            </div>

            {/* What's next */}
            <div style={{ maxWidth:380, margin:"0 auto 36px", textAlign:"left" }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", color:L.text3, marginBottom:14 }}>What happens next</p>
              {[
                "You'll receive a booking confirmation email shortly.",
                "We'll assign your team and send their details 24 hrs before.",
                "They arrive, get to work — you just lock up when done.",
              ].map((s, i) => (
                <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"flex-start" }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:L.green, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", marginTop:1 }}>
                    <span style={{ color:"#fff", fontSize:11, fontWeight:700 }}>{i+1}</span>
                  </div>
                  <p style={{ fontSize:14, color:L.text2, lineHeight:1.5 }}>{s}</p>
                </div>
              ))}
            </div>

            <a href="/" style={{ display:"inline-block", padding:"13px 28px", borderRadius:10, background:L.bg2, color:L.text, textDecoration:"none", fontWeight:600, fontSize:14, border:`1px solid ${L.border}` }}>
              ← Back to neatr.ai
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
