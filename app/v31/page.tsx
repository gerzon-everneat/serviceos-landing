"use client";

import { useEffect, useState } from "react";

/* ─── Attio-style tabbed product demo ─────────────────────────────────────────
   The technique, not a screen recording: the "app" is real DOM rebuilt with the
   site's own tokens, fed fake-but-believable data, driven by CSS transitions.
   Four tabs (Ask / Data model / Workflows / Reporting) auto-cycle with a progress
   bar — click to jump. Each panel is a hand-built recreation of a product screen.
   Lift the <AppDemo/> block into any vXX page; it's self-contained. */

const C = {
  bg:   "#F1F0EA",
  panel:"#FFFFFF",
  ink:  "#0B0B0A",
  ink2: "rgba(11,11,10,0.56)",
  ink3: "rgba(11,11,10,0.40)",
  line: "rgba(11,11,10,0.12)",
  lime: "#C8FF00",
  ok:   "#11a36b",
  warn: "#C98A00",
};
const SANS  = "var(--font-dm-sans), system-ui, -apple-system, sans-serif";
const SERIF = "var(--font-cormorant), Georgia, serif";
const DUR   = 4600; // ms per tab before auto-advance

function MarkGrid() {
  const pts = [10, 24, 38].flatMap((y) => [10, 24, 38].map((x) => ({ x, y })));
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" aria-hidden>
      {pts.map(({ x, y }, i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 5 : 3.2}
          fill={i === 4 ? C.lime : C.ink} opacity={i === 4 ? 1 : 0.7} />
      ))}
    </svg>
  );
}

const TABS = [
  { id: "ask",   nav: "Ask neatr",  label: "Ask neatr",  desc: "Ask in plain English. The agent reads your live ops and answers." },
  { id: "data",  nav: "Records",    label: "Data model", desc: "Every job, customer and crew as structured records — not a spreadsheet." },
  { id: "flows", nav: "Workflows",  label: "Workflows",  desc: "Triggers, conditions and actions that run the operation for you." },
  { id: "report",nav: "Reporting",  label: "Reporting",  desc: "Revenue, jobs and crew utilisation — live, no exports." },
];

export default function V31() {
  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: SANS, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{CSS}</style>

      <nav className="nav">
        <a className="brand" href="/versions">
          <MarkGrid /><span>neatr<span style={{ color: C.ink3 }}>.ai</span></span>
        </a>
        <a className="navback" href="/versions">← all versions</a>
      </nav>

      <header className="hero">
        <p className="eyebrow">The Attio technique, rebuilt</p>
        <h1 className="head">
          The product,<br /><span className="ital">shown live.</span>
        </h1>
        <p className="lede">
          Not a screen recording — the interface below is real markup, the same way
          Attio builds theirs. Tabs auto-cycle; click any one to drive it yourself.
        </p>
      </header>

      <AppDemo />

      <footer className="foot">
        Real DOM · fake data · CSS transitions · zero video. © 2026 neatr.ai
      </footer>
    </div>
  );
}

function AppDemo() {
  const [active, setActive] = useState(0);

  // auto-advance: fresh timer per tab; pauses for reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % TABS.length), DUR);
    return () => clearTimeout(id);
  }, [active]);

  const cur = TABS[active];

  return (
    <section className="demo">
      {/* app frame */}
      <div className="frame">
        <aside className="side">
          <div className="sidebrand"><MarkGrid /><span>neatr</span></div>
          <nav className="sidenav">
            {TABS.map((t, i) => (
              <button key={t.id} className={`sidelink${i === active ? " on" : ""}`}
                onClick={() => setActive(i)}>
                <span className="sideico" aria-hidden>{["✦", "▦", "⤳", "▤"][i]}</span>
                {t.nav}
              </button>
            ))}
          </nav>
          <div className="sideuser">
            <span className="ava">M</span>
            <span><b>Maria L.</b><br /><i>Operations</i></span>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <span className="crumb">{cur.nav}<span className="ink3"> / overview</span></span>
            <span className="live"><span className="livedot" />live</span>
          </div>
          <div className="view" key={cur.id /* remount → re-runs enter animation */}>
            {cur.id === "ask"    && <AskPanel />}
            {cur.id === "data"   && <DataPanel />}
            {cur.id === "flows"  && <FlowPanel />}
            {cur.id === "report" && <ReportPanel />}
          </div>
        </div>
      </div>

      {/* tab strip — labels + descriptions + progress, like Attio's section nav */}
      <div className="tabs">
        {TABS.map((t, i) => (
          <button key={t.id} className={`tab${i === active ? " on" : ""}`}
            onClick={() => setActive(i)}>
            <span className="tablabel">{t.label}</span>
            <span className="tabdesc">{t.desc}</span>
            <span className="tabbar">
              {i === active && <span className="tabfill" key={active} />}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── Panel 1 · Ask neatr — AI command bar with a streamed answer ───────────── */
function AskPanel() {
  const rows = [
    ["Riverside Deep Clean", "$185", "3 days overdue"],
    ["Oak St. Maintenance",  "$240", "1 day overdue"],
    ["Bayview Move-out",     "$320", "due today"],
  ];
  return (
    <div className="ask">
      <div className="askbar">
        <span className="askico">✦</span>
        <span className="asktype">Which jobs are unpaid this week?<i className="caret" /></span>
        <kbd>⏎</kbd>
      </div>
      <div className="askans">
        <p className="anslead">
          <b>3 jobs</b> are unpaid this week, totalling <b>$745</b>. The oldest is 3 days overdue.
        </p>
        {rows.map(([name, val, when], i) => (
          <div className="ansrow" style={{ animationDelay: `${360 + i * 120}ms` }} key={name}>
            <span className="ansdot" />
            <span className="ansname">{name}</span>
            <span className="ansval">{val}</span>
            <span className="answhen">{when}</span>
          </div>
        ))}
        <button className="ansact" style={{ animationDelay: "760ms" }}>Send 3 payment reminders →</button>
      </div>
    </div>
  );
}

/* ── Panel 2 · Data model — CRM-style record table ─────────────────────────── */
function DataPanel() {
  const head = ["Customer", "Service", "Crew", "Status", "Value"];
  const rows: [string, string, string, "done" | "active" | "queued", string][] = [
    ["Sarah M.",   "Deep clean · 2 bed", "Maria L.",  "active", "$185"],
    ["Liam O.",    "Move-out",           "Dwayne R.", "queued", "$320"],
    ["Acme Offices","Recurring · weekly", "Priya N.",  "done",   "$140"],
    ["Tom B.",     "Carpet + windows",   "Maria L.",  "active", "$210"],
    ["Green Cafe", "End of day",          "—",        "queued", "$95"],
  ];
  const pill = { done: C.ink3, active: C.ok, queued: C.warn };
  return (
    <div className="data">
      <div className="datatools">
        <span className="chip on">All jobs</span>
        <span className="chip">+ Filter</span>
        <span className="chip">↕ Sort</span>
        <span className="datacount">5 records</span>
      </div>
      <div className="table">
        <div className="trow thead">
          {head.map((h) => <span key={h}>{h}</span>)}
        </div>
        {rows.map((r, i) => (
          <div className="trow" style={{ animationDelay: `${i * 80}ms` }} key={r[0]}>
            <span className="tname">{r[0]}</span>
            <span className="ink2">{r[1]}</span>
            <span>{r[2]}</span>
            <span><span className="statpill" style={{ color: pill[r[3]], borderColor: `${pill[r[3]]}40` }}>
              <i style={{ background: pill[r[3]] }} />{r[3]}</span></span>
            <span className="tval">{r[4]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Panel 3 · Workflows — trigger → condition → actions, lighting up ──────── */
function FlowPanel() {
  const [lit, setLit] = useState(0);
  const nodes = [
    { k: "Trigger",   t: "Job marked complete",        ico: "⚡" },
    { k: "Condition", t: "If payment not on file",      ico: "◆" },
    { k: "Action",    t: "Charge saved card",           ico: "✦" },
    { k: "Action",    t: "Text receipt to customer",    ico: "✉" },
  ];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(nodes.length); return; // eslint-disable-line react-hooks/set-state-in-effect
    }
    const id = setInterval(() => setLit((n) => (n >= nodes.length ? 0 : n + 1)), 700);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="flow">
      {nodes.map((n, i) => (
        <div className="flownode" key={n.t}>
          <div className={`fcard${i < lit ? " on" : ""}`}>
            <span className="fico">{n.ico}</span>
            <span className="ftext"><span className="fk">{n.k}</span><span className="ft">{n.t}</span></span>
            <span className="fcheck">{i < lit ? "✓" : ""}</span>
          </div>
          {i < nodes.length - 1 && <span className={`fline${i < lit - 1 ? " on" : ""}`} />}
        </div>
      ))}
    </div>
  );
}

/* ── Panel 4 · Reporting — KPI tiles + animated bar chart ──────────────────── */
function ReportPanel() {
  const bars = [40, 62, 48, 78, 70, 92, 84];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="report">
      <div className="kpis">
        {[["Revenue", "$12,480", "+18%"], ["Jobs done", "146", "+9%"], ["Avg ticket", "$214", "+4%"]].map(
          ([k, v, d]) => (
            <div className="kpi" key={k}>
              <span className="kpik">{k}</span>
              <span className="kpiv">{v}</span>
              <span className="kpid">{d} vs last week</span>
            </div>
          ),
        )}
      </div>
      <div className="chart">
        <div className="charthead"><span>Bookings this week</span><span className="ink3">7-day</span></div>
        <div className="bars">
          {bars.map((h, i) => (
            <div className="barcol" key={i}>
              <span className="bar" style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }} />
              <span className="barlbl">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CSS = `
*{box-sizing:border-box}

.nav{position:sticky; top:0; z-index:20; display:flex; align-items:center; justify-content:space-between;
  padding:16px clamp(20px,5vw,56px); background:${C.bg}cc; backdrop-filter:blur(8px);}
.brand{display:inline-flex; align-items:center; gap:9px; text-decoration:none; color:${C.ink};
  font-weight:600; font-size:15px; letter-spacing:-0.02em;}
.navback{color:${C.ink2}; text-decoration:none; font-size:14px;}
.navback:hover{color:${C.ink};}

.hero{max-width:960px; margin:0 auto; padding:clamp(40px,7vw,84px) clamp(20px,5vw,56px) 0; text-align:center;}
.eyebrow{font-family:${SERIF}; font-style:italic; font-size:clamp(16px,1.6vw,21px); color:${C.ink2}; margin:0 0 16px;}
.head{font-weight:500; letter-spacing:-0.05em; line-height:0.92; margin:0; font-size:clamp(48px,9vw,110px);}
.ital{font-family:${SERIF}; font-style:italic; font-weight:500; letter-spacing:-0.02em;}
.lede{max-width:620px; margin:26px auto 0; font-size:clamp(16px,1.8vw,21px); line-height:1.5; color:${C.ink2};}

.demo{max-width:1180px; margin:clamp(40px,6vw,72px) auto 0; padding:0 clamp(16px,4vw,40px);}

/* app frame */
.frame{display:grid; grid-template-columns:212px 1fr; min-height:440px;
  background:${C.panel}; border:1px solid ${C.line}; border-radius:16px; overflow:hidden;
  box-shadow:0 40px 100px rgba(11,11,10,0.10);}
.side{display:flex; flex-direction:column; gap:6px; padding:16px; background:#FAFAF7; border-right:1px solid ${C.line};}
.sidebrand{display:flex; align-items:center; gap:8px; font-weight:600; font-size:14px; padding:4px 6px 12px;}
.sidenav{display:flex; flex-direction:column; gap:2px;}
.sidelink{display:flex; align-items:center; gap:10px; width:100%; text-align:left; border:none; background:none;
  font-family:${SANS}; font-size:14px; color:${C.ink2}; padding:9px 10px; border-radius:8px; cursor:pointer;
  transition:background .2s, color .2s;}
.sidelink:hover{background:rgba(11,11,10,0.04); color:${C.ink};}
.sidelink.on{background:rgba(200,255,0,0.18); color:${C.ink}; font-weight:600;}
.sideico{font-size:13px; width:16px; text-align:center; opacity:.7;}
.sideuser{margin-top:auto; display:flex; align-items:center; gap:10px; padding:10px 8px 4px;
  border-top:1px solid ${C.line}; font-size:12px; color:${C.ink2}; line-height:1.4;}
.sideuser b{color:${C.ink};} .sideuser i{font-style:normal; color:${C.ink3};}
.ava{width:28px; height:28px; border-radius:50%; background:${C.ink}; color:${C.bg};
  display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600;}

.main{display:flex; flex-direction:column; min-width:0;}
.topbar{display:flex; align-items:center; justify-content:space-between; padding:14px 22px;
  border-bottom:1px solid ${C.line}; font-size:13px;}
.crumb{font-weight:600; letter-spacing:-0.01em;} .ink3{color:${C.ink3}; font-weight:400;} .ink2{color:${C.ink2};}
.live{display:inline-flex; align-items:center; gap:6px; font-size:11px; letter-spacing:0.08em;
  text-transform:uppercase; color:${C.ink2};}
.livedot{width:7px; height:7px; border-radius:50%; background:${C.ok}; animation:pulse 1.6s infinite;}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(17,163,107,0.45)}70%{box-shadow:0 0 0 7px rgba(17,163,107,0)}100%{box-shadow:0 0 0 0 rgba(17,163,107,0)}}
.view{flex:1; padding:clamp(20px,3vw,34px); animation:viewin .5s cubic-bezier(0.16,1,0.3,1);}
@keyframes viewin{from{opacity:0; transform:translateY(10px)}to{opacity:1; transform:none}}

/* tab strip */
.tabs{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-top:18px;
  background:${C.line}; border:1px solid ${C.line}; border-radius:12px; overflow:hidden;}
.tab{position:relative; text-align:left; background:${C.bg}; border:none; cursor:pointer;
  padding:16px 18px 20px; font-family:${SANS}; transition:background .25s;}
.tab:hover{background:#EBEAE2;}
.tab.on{background:${C.panel};}
.tablabel{display:block; font-size:15px; font-weight:600; letter-spacing:-0.01em; color:${C.ink2};}
.tab.on .tablabel{color:${C.ink};}
.tabdesc{display:block; font-size:12.5px; line-height:1.45; color:${C.ink3}; margin-top:5px;}
.tabbar{position:absolute; left:0; bottom:0; height:2px; width:100%; background:rgba(11,11,10,0.06);}
.tabfill{display:block; height:100%; width:0; background:${C.lime};
  animation:fill ${DUR}ms linear forwards;}
@keyframes fill{to{width:100%}}
@media(max-width:760px){
  .frame{grid-template-columns:1fr;} .side{flex-direction:row; align-items:center; overflow-x:auto; border-right:none; border-bottom:1px solid ${C.line};}
  .sidenav{flex-direction:row;} .sideuser{display:none;} .sidebrand{padding:4px 6px;}
  .tabs{grid-template-columns:1fr 1fr;} .tabdesc{display:none;}
}

/* Ask panel */
.ask{max-width:640px;}
.askbar{display:flex; align-items:center; gap:12px; border:1px solid ${C.line}; border-radius:12px;
  padding:14px 16px; font-size:16px; box-shadow:0 2px 0 rgba(11,11,10,0.02);}
.askico{color:${C.ink}; font-size:14px;}
.asktype{flex:1; letter-spacing:-0.01em;}
.caret{display:inline-block; width:1.5px; height:17px; background:${C.ink}; margin-left:2px;
  vertical-align:-3px; animation:blink 1s steps(1) infinite;}
@keyframes blink{50%{opacity:0}}
.askbar kbd{font-family:${SANS}; font-size:11px; color:${C.ink2}; border:1px solid ${C.line};
  border-radius:6px; padding:2px 7px;}
.askans{margin-top:20px;}
.anslead{font-size:16px; line-height:1.5; color:${C.ink}; margin:0 0 14px; animation:rise .5s both;}
.ansrow{display:grid; grid-template-columns:14px 1fr auto auto; align-items:center; gap:12px;
  padding:11px 12px; border:1px solid ${C.line}; border-radius:10px; margin-bottom:6px;
  font-size:14px; animation:rise .5s both;}
.ansdot{width:7px; height:7px; border-radius:50%; background:${C.warn};}
.ansname{font-weight:600; letter-spacing:-0.01em;}
.ansval{color:${C.ink2};} .answhen{font-size:12px; color:${C.ink3};}
.ansact{margin-top:10px; background:${C.ink}; color:${C.bg}; border:none; border-radius:100px;
  padding:11px 20px; font-size:14px; font-weight:600; font-family:${SANS}; cursor:pointer;
  animation:rise .5s both;}
.ansact:hover{opacity:.86;}
@keyframes rise{from{opacity:0; transform:translateY(8px)}to{opacity:1; transform:none}}

/* Data panel */
.datatools{display:flex; align-items:center; gap:8px; margin-bottom:14px;}
.chip{font-size:12.5px; color:${C.ink2}; border:1px solid ${C.line}; border-radius:8px; padding:5px 11px;}
.chip.on{background:${C.ink}; color:${C.bg}; border-color:${C.ink};}
.datacount{margin-left:auto; font-size:12px; color:${C.ink3};}
.table{border:1px solid ${C.line}; border-radius:12px; overflow:hidden;}
.trow{display:grid; grid-template-columns:1.2fr 1.4fr 1fr 1fr 0.7fr; align-items:center; gap:14px;
  padding:13px 16px; border-top:1px solid ${C.line}; font-size:14px; animation:rise .5s both;}
.trow:first-child{border-top:none;}
.thead{background:#FAFAF7; font-size:11px; letter-spacing:0.06em; text-transform:uppercase; color:${C.ink3};
  font-weight:600; animation:none;}
.tname{font-weight:600; letter-spacing:-0.01em;} .tval{font-weight:600; text-align:right;}
.statpill{display:inline-flex; align-items:center; gap:6px; border:1px solid; border-radius:100px;
  padding:3px 10px; font-size:12px; text-transform:capitalize;}
.statpill i{width:6px; height:6px; border-radius:50%;}
@media(max-width:620px){
  .trow{grid-template-columns:1.2fr 1fr 0.7fr;} .trow span:nth-child(2),.trow span:nth-child(3){display:none;}
}

/* Flow panel */
.flow{display:flex; flex-direction:column; align-items:center; padding-top:6px;}
.flownode{display:flex; flex-direction:column; align-items:center; width:100%; max-width:420px;}
.fcard{display:flex; align-items:center; gap:14px; width:100%; padding:15px 18px;
  border:1px solid ${C.line}; border-radius:12px; background:${C.panel}; transition:.4s;}
.fcard.on{border-color:${C.ink}; box-shadow:0 8px 24px rgba(11,11,10,0.08);}
.fico{width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center;
  background:#FAFAF7; font-size:14px; transition:.4s;}
.fcard.on .fico{background:${C.lime};}
.ftext{display:flex; flex-direction:column; gap:1px; flex:1;}
.fk{font-size:11px; letter-spacing:0.07em; text-transform:uppercase; color:${C.ink3};}
.ft{font-size:14.5px; font-weight:600; letter-spacing:-0.01em;}
.fcheck{color:${C.ok}; font-weight:700; width:14px;}
.fline{width:2px; height:20px; background:${C.line}; transition:background .4s;}
.fline.on{background:${C.ink};}

/* Report panel */
.kpis{display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px;}
.kpi{border:1px solid ${C.line}; border-radius:12px; padding:16px 18px; animation:rise .5s both;}
.kpik{font-size:12px; color:${C.ink3};}
.kpiv{display:block; font-size:clamp(24px,3.2vw,34px); font-weight:600; letter-spacing:-0.03em; margin:6px 0 4px;}
.kpid{font-size:12px; color:${C.ok};}
.chart{border:1px solid ${C.line}; border-radius:12px; padding:18px 20px 14px;}
.charthead{display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:16px;}
.bars{display:flex; align-items:flex-end; gap:clamp(8px,2.5vw,22px); height:150px;}
.barcol{flex:1; display:flex; flex-direction:column; align-items:center; gap:8px; height:100%; justify-content:flex-end;}
.bar{width:100%; max-width:34px; background:linear-gradient(${C.ink}, ${C.ink}); border-radius:6px 6px 0 0;
  transform-origin:bottom; animation:grow .7s cubic-bezier(0.16,1,0.3,1) both;}
.barcol:last-child .bar{background:${C.lime};}
.barlbl{font-size:11px; color:${C.ink3};}
@keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@media(max-width:620px){ .kpis{grid-template-columns:1fr;} }

.foot{text-align:center; color:${C.ink3}; font-size:13px; padding:clamp(48px,7vw,90px) 20px 60px;}

@media(prefers-reduced-motion: reduce){
  .tabfill,.caret,.livedot,.view,.ansrow,.anslead,.ansact,.trow,.bar,.kpi{animation:none !important;}
  .tabfill{width:100%;}
}
`;
