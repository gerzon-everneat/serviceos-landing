"use client";

const GREEN = "#22C55E";
const GREEN_DK = "#16A34A";
const LIME = "#C8FF00";
const LIME_DK = "#3A5000";
const INK = "#0A0A0A";

const KEYFRAMES = `
/* Gen 1 – new animated keyframes */
@keyframes g1-01{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.06;transform:scale(0.25)}}
@keyframes g1-02{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes g1-03{0%,68%,100%{opacity:1;transform:scale(1)}80%{opacity:0.03;transform:scale(0.2)}}
@keyframes g1-04a{0%,100%{opacity:0.28}50%{opacity:0.04}}
@keyframes g1-04b{0%,100%{opacity:1}66%{opacity:0.08}}
@keyframes g1-04c{0%,100%{opacity:1}82%{opacity:0.08}}
@keyframes g1-05{0%,100%{transform:translateY(0)}45%{transform:translateY(-7px)}}
@keyframes g1-06{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes g1-07{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.12;transform:scale(0.35)}}
@keyframes g1-08{0%{stroke-dashoffset:70}100%{stroke-dashoffset:0}}
@keyframes g1-09{0%,100%{opacity:0.7;transform:translateY(0)}50%{opacity:0.06;transform:translateY(-4px)}}
@keyframes g1-10a{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}
@keyframes g1-10b{0%,100%{transform:scale(1)}50%{transform:scale(1.8)}}
/* Gen 2 */
@keyframes logo11-wave{0%{transform:translateX(0)}100%{transform:translateX(-12px)}}
@keyframes logo12-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(0.6)}}
@keyframes logo13-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes logo14-flash{0%,35%,100%{opacity:1}48%{opacity:0.15}55%{opacity:0.9}62%{opacity:0.25}72%{opacity:1}}
@keyframes logo15-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.25;transform:scale(0.65)}}
@keyframes logo16-tick{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes logo17-flow{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-48}}
@keyframes logo18-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.25;transform:scale(0.45)}}
@keyframes logo19-orbit{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes logo20-freq{0%{stroke-dashoffset:80}100%{stroke-dashoffset:-80}}
/* Gen 3 */
@keyframes logo21-sweep{0%{transform:rotate(-30deg)}100%{transform:rotate(330deg)}}
@keyframes logo22-trace{0%{stroke-dashoffset:120}100%{stroke-dashoffset:0}}
@keyframes logo23-radar{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes logo23-ping{0%,100%{opacity:0;transform:scale(0.3)}60%{opacity:0.9;transform:scale(1)}}
@keyframes logo24-toggle{0%,40%{transform:translateX(0)}50%,90%{transform:translateX(14px)}100%{transform:translateX(0)}}
@keyframes logo25-arc{0%{stroke-dashoffset:85}70%{stroke-dashoffset:0}100%{stroke-dashoffset:-85}}
@keyframes logo26-rot{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes logo27-coil{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-60}}
@keyframes logo28-gate{0%,20%{transform:scaleX(1)}50%,80%{transform:scaleX(0)}100%{transform:scaleX(1)}}
@keyframes logo29-star{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(45deg) scale(1.18)}100%{transform:rotate(90deg) scale(1)}}
@keyframes logo30-fill{0%{stroke-dashoffset:107}60%{stroke-dashoffset:0}80%{stroke-dashoffset:0}100%{stroke-dashoffset:107}}
/* Gen 4 – new animated keyframes */
@keyframes g4-31{0%,100%{opacity:1}50%{opacity:0.08}}
@keyframes g4-32a{0%,100%{opacity:0.3}25%{opacity:1}}
@keyframes g4-32b{0%,100%{opacity:0.6}55%{opacity:1}}
@keyframes g4-32c{0%,100%{opacity:1}80%{opacity:0.25}}
@keyframes g4-33a{0%,60%,100%{opacity:0.18}15%{opacity:0.85}}
@keyframes g4-33b{0%,70%,100%{opacity:1}15%{opacity:0.25}}
@keyframes g4-34{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes g4-35{0%{stroke-dashoffset:50}100%{stroke-dashoffset:0}}
@keyframes g4-36{0%,100%{transform:scale(1)}50%{transform:scale(0.84)}}
@keyframes g4-37{0%{stroke-dashoffset:28}55%,100%{stroke-dashoffset:0}}
@keyframes g4-38a{0%,100%{opacity:0.12;transform:scale(0.82)}55%{opacity:0.5;transform:scale(1.06)}}
@keyframes g4-38b{0%,100%{transform:scale(1)}50%{transform:scale(0.5)}}
@keyframes g4-39a{0%,100%{opacity:0.22;transform:translateY(4px)}50%{opacity:0.6;transform:translateY(-1px)}}
@keyframes g4-39b{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes g4-40a{0%,100%{opacity:0.2}40%{opacity:0.7}}
@keyframes g4-40b{0%,100%{opacity:1}50%{opacity:0.3}}
/* Gen 5 – brand-rooted */
@keyframes g5-41{0%,100%{transform:translateY(0)}45%{transform:translateY(-8px)}}
@keyframes g5-42{0%,60%,100%{opacity:0.4;transform:scale(0.85)}25%{opacity:1;transform:scale(1)}}
@keyframes g5-43{0%,100%{transform:translateY(0)}45%{transform:translateY(-6px)}}
@keyframes g5-44{0%,100%{stroke-dashoffset:22}50%{stroke-dashoffset:0}}
@keyframes g5-45a{0%,100%{opacity:0.22}35%{opacity:0.7}}
@keyframes g5-45b{0%,100%{opacity:0.38}60%{opacity:0.7}}
@keyframes g5-45c{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(0.96)}}
@keyframes g5-46{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
@keyframes g5-47{0%,100%{transform:translate(0,0)}50%{transform:translate(3px,3px)}}
@keyframes g5-48{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes g5-49{0%,100%{stroke-dashoffset:42}50%{stroke-dashoffset:0}}
@keyframes g5-50{0%,100%{stroke-dashoffset:40}50%{stroke-dashoffset:0}}
`;

// ─── GEN 1: green static marks ───────────────────────────────────────────────

function MarkBracket({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M19 9 H12 a3 3 0 0 0 -3 3 V36 a3 3 0 0 0 3 3 H19" stroke={ink} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M29 9 H36 a3 3 0 0 1 3 3 V36 a3 3 0 0 1 -3 3 H29" stroke={GREEN} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3.4" fill={GREEN}
        style={animated ? { animation: "g1-01 2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
    </svg>
  );
}

function MarkShine({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { transformOrigin: "20px 24px", animation: "g1-02 6s linear infinite" } : {}}>
        <path d="M20 8 C21 18.5 21.6 19.2 32 24 C21.6 28.8 21 29.5 20 40 C19 29.5 18.4 28.8 8 24 C18.4 19.2 19 18.5 20 8 Z" fill={GREEN} />
      </g>
      <path d="M36 10 C36.5 14.6 36.7 14.9 41 16.5 C36.7 18.1 36.5 18.4 36 23 C35.5 18.4 35.3 18.1 31 16.5 C35.3 14.9 35.5 14.6 36 10 Z" fill={ink} />
    </svg>
  );
}

function MarkSpark({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="11" fill={GREEN} />
      <path d="M17 34 V19 M17 23 C19 19 24 18.5 27 21 C29 22.7 29.5 25 29.5 28 V34"
        stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="33.5" cy="16" r="3" fill="#fff"
        style={animated ? { animation: "g1-03 2.8s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
    </svg>
  );
}

function MarkSnap({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="9" y="10" width="13" height="7" rx="2.2" fill={ink} transform="rotate(-9 15.5 13.5)"
        style={animated ? { animation: "g1-04a 2.4s ease-in-out infinite" } : { opacity: 0.28 }} />
      <rect x="10" y="21" width="20" height="7" rx="2.2" fill={ink}
        style={animated ? { animation: "g1-04b 2.4s ease-in-out 0.6s infinite" } : {}} />
      <rect x="10" y="32" width="28" height="7" rx="2.2" fill={GREEN}
        style={animated ? { animation: "g1-04c 2.4s ease-in-out 1.2s infinite" } : {}} />
    </svg>
  );
}

function MarkPinN({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { animation: "g1-05 2s ease-in-out infinite", transformOrigin: "24px 24px" } : {}}>
        <path d="M24 5 C15.4 5 8.5 11.6 8.5 20 C8.5 30.6 24 43 24 43 C24 43 39.5 30.6 39.5 20 C39.5 11.6 32.6 5 24 5 Z" fill={GREEN} />
        <path d="M18.5 28 V15.5 M18.5 19.5 C19 15.4 24 13.8 27.5 16.6 C29.4 18.1 30 20.4 30 23.4 V28"
          stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function MarkLoop({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { animation: "g1-06 3s linear infinite", transformOrigin: "24px 24px" } : {}}>
        <path d="M37 24 A13 13 0 1 1 31 12.8" stroke={GREEN} strokeWidth="3.4" strokeLinecap="round" fill="none" />
        <path d="M31.5 7.5 L33 13.5 L26.8 14.2 Z" fill={GREEN} />
      </g>
      <circle cx="24" cy="24" r="3.4" fill={ink} />
    </svg>
  );
}

function MarkCalendar({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="11" width="32" height="29" rx="6" stroke={ink} strokeWidth="3" fill="none" />
      <path d="M8 19 H40" stroke={ink} strokeWidth="3" />
      <path d="M16 7 V13 M32 7 V13" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <rect x="21.5" y="24" width="11" height="9" rx="2.2" fill={GREEN}
        style={animated ? { animation: "g1-07 2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
    </svg>
  );
}

function MarkRoute({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M11 35 C23 35 17 19 30 17" stroke={ink} strokeWidth="3.2" strokeLinecap="round" fill="none"
        strokeDasharray={animated ? "8 62" : "0.1 7"}
        style={animated ? { animation: "g1-08 2s ease-in-out infinite" } : {}} />
      <circle cx="11" cy="35" r="3.6" fill={ink} />
      <circle cx="33" cy="15" r="6" stroke={GREEN} strokeWidth="3.2" fill="none" />
      <circle cx="33" cy="15" r="2" fill={GREEN} />
    </svg>
  );
}

function MarkStack({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 7 L41 16 L24 25 L7 16 Z" fill={GREEN} />
      <path d="M8 23 L24 31.5 L40 23" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "g1-09 3s ease-in-out 0.5s infinite" } : {}} />
      <path d="M8 30 L24 38.5 L40 30" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "g1-09 3s ease-in-out 1.2s infinite" } : {}} />
    </svg>
  );
}

function MarkPulse({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M7 26 H16 L20 15 L27 33 L31 24 H41" stroke={ink} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        strokeDasharray={animated ? "60" : undefined}
        style={animated ? { animation: "g1-10a 2s ease-in-out infinite" } : {}} />
      <circle cx="27" cy="33" r="3.4" fill={GREEN}
        style={animated ? { animation: "g1-10b 2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
    </svg>
  );
}

// ─── GEN 2: lime animated marks ──────────────────────────────────────────────

function MarkWave({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { animation: "logo11-wave 2s linear infinite" } : {}}>
        <path d="M-12 24 C-8 12 -4 36 0 24 C4 12 8 36 12 24 C16 12 20 36 24 24 C28 12 32 36 36 24 C40 12 44 36 48 24 C52 12 56 36 60 24 C64 12 68 36 72 24"
          stroke={LIME} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      </g>
      <circle cx="42" cy="24" r="3.5" fill={ink} />
    </svg>
  );
}

function MarkShield({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 5 L39 11 V25 C39 34 33 41 24 43 C15 41 9 34 9 25 V11 Z"
        stroke={ink} strokeWidth="3" fill="none" strokeLinejoin="round" />
      <circle cx="24" cy="23" r="6.5" fill={LIME}
        style={animated ? { animation: "logo12-pulse 2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
    </svg>
  );
}

function MarkCrosshair({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="15" stroke={ink} strokeWidth="2" strokeDasharray="5 3" fill="none"
        style={animated ? { animation: "logo13-spin 5s linear infinite", transformOrigin: "24px 24px" } : {}} />
      <line x1="24" y1="5" x2="24" y2="13" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="35" x2="24" y2="43" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="5" y1="24" x2="13" y2="24" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="24" x2="43" y2="24" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill={LIME} />
    </svg>
  );
}

function MarkBolt({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M29 6 L17 27 H25 L19 42 L31 21 H23 Z" fill={LIME}
        style={animated ? { animation: "logo14-flash 2.8s ease-in-out infinite" } : {}} />
      <path d="M29 6 L17 27 H25 L19 42 L31 21 H23 Z" stroke={ink} strokeWidth="0.8" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "logo14-flash 2.8s ease-in-out infinite" } : {}} />
    </svg>
  );
}

function MarkGrid({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  const dots = [
    { cx: 10, cy: 10 }, { cx: 24, cy: 10 }, { cx: 38, cy: 10 },
    { cx: 10, cy: 24 }, { cx: 24, cy: 24 }, { cx: 38, cy: 24 },
    { cx: 10, cy: 38 }, { cx: 24, cy: 38 }, { cx: 38, cy: 38 },
  ];
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {dots.map(({ cx, cy }, i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 4 ? 4.5 : 2.8}
          fill={i === 4 ? LIME : ink}
          style={animated ? {
            animation: `logo15-dot ${1.2 + (i % 3) * 0.2}s ease-in-out ${(i * 0.13).toFixed(2)}s infinite`,
            transformBox: "fill-box",
            transformOrigin: "center",
          } : { opacity: i === 4 ? 1 : 0.6 }} />
      ))}
    </svg>
  );
}

function MarkClock({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke={ink} strokeWidth="3" fill="none" />
      <line x1="24" y1="24" x2="18" y2="12" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <g style={animated ? { animation: "logo16-tick 4s linear infinite", transformOrigin: "24px 24px" } : {}}>
        <line x1="24" y1="24" x2="24" y2="10" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="24" cy="24" r="2.5" fill={ink} />
    </svg>
  );
}

function MarkFlow({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  const PATH = "M8 36 C14 36 14 12 24 12 C34 12 34 36 40 36";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d={PATH} stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.25" />
      <path d={PATH} stroke={LIME} strokeWidth="3" strokeLinecap="round" fill="none"
        strokeDasharray="10 40"
        style={animated ? { animation: "logo17-flow 1.8s linear infinite" } : { strokeDasharray: undefined }} />
      <circle cx="40" cy="36" r="3.5" fill={LIME} />
    </svg>
  );
}

function MarkHex({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 5 L40 14.5 L40 33.5 L24 43 L8 33.5 L8 14.5 Z"
        stroke={ink} strokeWidth="3" fill="none" strokeLinejoin="round" />
      <path d="M24 14 L34 19.5 L34 30.5 L24 36 L14 30.5 L14 19.5 Z"
        fill={LIME}
        style={animated ? { animation: "logo18-pulse 2.2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
    </svg>
  );
}

function MarkOrbit({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="15" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="24" cy="24" r="4" fill={ink} />
      <g style={animated ? { animation: "logo19-orbit 3s linear infinite", transformOrigin: "24px 24px" } : {}}>
        <circle cx="39" cy="24" r="4.5" fill={LIME} />
      </g>
    </svg>
  );
}

function MarkFreq({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  const PATH = "M4 24 H14 L18 13 L22 35 L26 24 L30 19 L34 29 L38 24 H44";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d={PATH} stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.2" />
      <path d={PATH} stroke={LIME} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        strokeDasharray="80 80"
        style={animated ? { animation: "logo20-freq 2s ease-in-out infinite" } : { strokeDasharray: undefined }} />
    </svg>
  );
}

// ─── GEN 3: structural animated marks ────────────────────────────────────────

function MarkPrism({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 6 L42 39 L6 39 Z" stroke={ink} strokeWidth="2.8" strokeLinejoin="round" fill="none" />
      <line x1="24" y1="6" x2="24" y2="39" stroke={ink} strokeWidth="1" opacity="0.2" />
      <g style={animated ? { transformOrigin: "24px 39px", animation: "logo21-sweep 3s ease-in-out infinite" } : {}}>
        <line x1="24" y1="39" x2="24" y2="6" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      </g>
      <circle cx="24" cy="39" r="2.8" fill={LIME} />
    </svg>
  );
}

function MarkCircuit({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  const PATH = "M10 24 H20 V14 H30 V34 H38";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d={PATH} stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.2" />
      <path d={PATH} stroke={LIME} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
        strokeDasharray={animated ? "20 100" : undefined}
        style={animated ? { animation: "logo22-trace 2.2s linear infinite" } : {}} />
      <circle cx="10" cy="24" r="3" fill={ink} />
      <circle cx="38" cy="24" r="3" fill={LIME} />
    </svg>
  );
}

function MarkRadar({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.2" />
      <circle cx="24" cy="24" r="11" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.2" />
      <circle cx="24" cy="24" r="4" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.3" />
      <g style={animated ? { transformOrigin: "24px 24px", animation: "logo23-radar 2.8s linear infinite" } : {}}>
        <path d="M24 24 L24 6" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M24 24 L24 6" stroke={LIME} strokeWidth="12" strokeLinecap="round" opacity="0.08" />
      </g>
      {animated && (
        <circle cx="33" cy="13" r="3.2" fill={LIME} opacity="0"
          style={{ animation: "logo23-ping 2.8s linear 0.5s infinite", transformBox: "fill-box", transformOrigin: "center" }} />
      )}
      {!animated && <circle cx="33" cy="13" r="2.5" fill={LIME} opacity="0.4" />}
      <circle cx="24" cy="24" r="2.5" fill={ink} />
    </svg>
  );
}

function MarkToggle({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="17" width="32" height="14" rx="7" fill={LIME} opacity="0.18" stroke={LIME} strokeWidth="2.2" />
      <g style={animated ? { animation: "logo24-toggle 3.5s ease-in-out infinite" } : {}}>
        <circle cx="16" cy="24" r="6" fill={LIME} />
      </g>
    </svg>
  );
}

function MarkSignal({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M7 37 A22 22 0 0 1 41 37" stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.18"
        strokeDasharray={animated ? "85" : undefined}
        style={animated ? { animation: "logo25-arc 2.5s ease-in-out 0.6s infinite" } : {}} />
      <path d="M12 37 A17 17 0 0 1 36 37" stroke={LIME} strokeWidth="2.8" strokeLinecap="round" fill="none"
        strokeDasharray={animated ? "85" : undefined}
        style={animated ? { animation: "logo25-arc 2.5s ease-in-out 0.3s infinite" } : {}} />
      <path d="M17 37 A12 12 0 0 1 31 37" stroke={LIME} strokeWidth="3" strokeLinecap="round" fill="none"
        strokeDasharray={animated ? "85" : undefined}
        style={animated ? { animation: "logo25-arc 2.5s ease-in-out infinite" } : {}} />
      <circle cx="24" cy="37" r="3.5" fill={ink} />
    </svg>
  );
}

function MarkDiamond({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { transformOrigin: "24px 24px", animation: "logo26-rot 6s linear infinite" } : {}}>
        <path d="M24 6 L42 24 L24 42 L6 24 Z" stroke={ink} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <path d="M24 12 L36 24 L24 36 L12 24 Z" fill={LIME} opacity="0.9" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function MarkCoil({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  const PATH = "M8 32 C12 28 16 20 20 24 C24 28 28 20 32 24 C36 28 40 20 44 24";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d={PATH} stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d={PATH} stroke={LIME} strokeWidth="3" strokeLinecap="round" fill="none"
        strokeDasharray={animated ? "15 45" : undefined}
        style={animated ? { animation: "logo27-coil 2s linear infinite" } : {}} />
      <path d="M8 16 C12 12 16 20 20 16 C24 12 28 20 32 16 C36 12 40 20 44 16"
        stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.12" />
    </svg>
  );
}

function MarkGate({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { transformOrigin: "17px 24px", animation: "logo28-gate 3s ease-in-out infinite" } : {}}>
        <rect x="8" y="10" width="9" height="28" rx="3" fill={ink} />
      </g>
      <g style={animated ? { transformOrigin: "31px 24px", animation: "logo28-gate 3s ease-in-out infinite" } : {}}>
        <rect x="31" y="10" width="9" height="28" rx="3" fill={ink} />
      </g>
      <circle cx="24" cy="24" r="5" fill={LIME}
        style={animated ? { animation: "logo12-pulse 3s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
    </svg>
  );
}

function MarkStarMark({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { transformOrigin: "24px 24px", animation: "logo29-star 4s ease-in-out infinite" } : {}}>
        <path d="M24 7 L26.6 21.4 L41 24 L26.6 26.6 L24 41 L21.4 26.6 L7 24 L21.4 21.4 Z"
          fill={LIME} strokeLinejoin="round" />
      </g>
      <circle cx="24" cy="24" r="3" fill={ink} />
    </svg>
  );
}

function MarkArc({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  const R = 17;
  const circ = Math.round(2 * Math.PI * R);
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r={R} stroke={ink} strokeWidth="3" fill="none" opacity="0.15" />
      <circle cx="24" cy="24" r={R} stroke={LIME} strokeWidth="3.5" fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circ}`}
        strokeDashoffset={animated ? `${circ}` : `${Math.round(circ * 0.28)}`}
        transform="rotate(-90 24 24)"
        style={animated ? { animation: "logo30-fill 2.4s ease-in-out infinite" } : {}} />
      <circle cx="24" cy="7" r="3.5" fill={LIME}
        style={animated ? { animation: "logo29-star 4s ease-in-out infinite", transformOrigin: "24px 24px" } : {}} />
    </svg>
  );
}

// ─── GEN 4: lime static marks ────────────────────────────────────────────────

function Mark4NMark({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M10 38 V10 L24 32 L38 10 V38" stroke={ink} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M10 10 L24 32" stroke={LIME} strokeWidth="3.6" strokeLinecap="round"
        style={animated ? { animation: "g4-31 2.2s ease-in-out infinite" } : {}} />
    </svg>
  );
}

function Mark4Chevrons({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M8 34 L18 24 L8 14" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "g4-32a 2.4s ease-in-out infinite" } : { opacity: 0.3 }} />
      <path d="M18 34 L28 24 L18 14" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "g4-32b 2.4s ease-in-out 0.4s infinite" } : { opacity: 0.6 }} />
      <path d="M28 34 L40 24 L28 14" stroke={LIME} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "g4-32c 2.4s ease-in-out 0.8s infinite" } : {}} />
    </svg>
  );
}

function Mark4Tiles({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="7" y="7" width="14" height="14" rx="3.5" fill={ink}
        style={animated ? { animation: "g4-33a 3s ease-in-out infinite" } : { opacity: 0.18 }} />
      <rect x="27" y="7" width="14" height="14" rx="3.5" fill={ink}
        style={animated ? { animation: "g4-33a 3s ease-in-out 0.6s infinite" } : { opacity: 0.18 }} />
      <rect x="7" y="27" width="14" height="14" rx="3.5" fill={ink}
        style={animated ? { animation: "g4-33a 3s ease-in-out 1.2s infinite" } : { opacity: 0.18 }} />
      <rect x="27" y="27" width="14" height="14" rx="3.5" fill={LIME}
        style={animated ? { animation: "g4-33b 3s ease-in-out 1.8s infinite" } : {}} />
    </svg>
  );
}

function Mark4Wedge({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 24 L42 24 A18 18 0 0 1 6 24 Z" fill={ink} style={{ opacity: 0.12 }} />
      <g style={animated ? { transformOrigin: "24px 24px", animation: "g4-34 4s linear infinite" } : {}}>
        <path d="M24 24 L24 6 A18 18 0 0 1 42 24 Z" fill={LIME} />
      </g>
      <circle cx="24" cy="24" r="4" fill={ink} />
    </svg>
  );
}

function Mark4Knot({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  const PATH = "M8 24 C8 14 18 14 24 20 C30 26 40 26 40 24";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M8 24 C8 14 18 14 24 20 C30 26 40 26 40 24 C40 22 30 22 24 28 C18 34 8 34 8 24 Z"
        stroke={ink} strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.25" />
      <path d={PATH} stroke={LIME} strokeWidth="3.2" strokeLinecap="round" fill="none"
        strokeDasharray={animated ? "50" : undefined}
        style={animated ? { animation: "g4-35 2s ease-in-out infinite alternate" } : {}} />
    </svg>
  );
}

function Mark4Leaf({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M12 38 C12 18 28 8 40 8 C40 28 24 40 12 38 Z" fill={LIME}
        style={animated ? { animation: "g4-36 3s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
      <path d="M12 38 L28 22" stroke={ink} strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function Mark4Badge({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 5 L32 9 L40 9 L40 17 L44 24 L40 31 L40 39 L32 39 L24 43 L16 39 L8 39 L8 31 L4 24 L8 17 L8 9 L16 9 Z"
        stroke={ink} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <path d="M17 24 L22 29 L31 19" stroke={LIME} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={animated ? "28" : undefined}
        style={animated ? { animation: "g4-37 2s ease-in-out infinite" } : {}} />
    </svg>
  );
}

function Mark4Target({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="19" stroke={ink} strokeWidth="2" fill="none"
        style={animated ? { animation: "g4-38a 2.4s ease-in-out 0.8s infinite", transformBox: "fill-box", transformOrigin: "center" } : { opacity: 0.15 }} />
      <circle cx="24" cy="24" r="12" stroke={ink} strokeWidth="2" fill="none"
        style={animated ? { animation: "g4-38a 2.4s ease-in-out 0.4s infinite", transformBox: "fill-box", transformOrigin: "center" } : { opacity: 0.3 }} />
      <circle cx="24" cy="24" r="6" fill={LIME}
        style={animated ? { animation: "g4-38b 2.4s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}} />
      <line x1="24" y1="5" x2="24" y2="18" stroke={ink} strokeWidth="1.5" opacity="0.35" />
      <line x1="24" y1="30" x2="24" y2="43" stroke={ink} strokeWidth="1.5" opacity="0.35" />
      <line x1="5" y1="24" x2="18" y2="24" stroke={ink} strokeWidth="1.5" opacity="0.35" />
      <line x1="30" y1="24" x2="43" y2="24" stroke={ink} strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}

function Mark4Caret({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M8 32 L24 14 L40 32" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "g4-39a 2.5s ease-in-out 0.4s infinite" } : { opacity: 0.22 }} />
      <path d="M12 38 L24 20 L36 38" stroke={LIME} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={animated ? { animation: "g4-39b 2.5s ease-in-out infinite" } : {}} />
    </svg>
  );
}

function Mark4Brick({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="7" y="11" width="23" height="9" rx="2.5" fill={ink}
        style={animated ? { animation: "g4-40a 3s ease-in-out 1s infinite" } : { opacity: 0.18 }} />
      <rect x="32" y="11" width="9" height="9" rx="2.5" fill={ink}
        style={animated ? { animation: "g4-40a 3s ease-in-out 1.4s infinite" } : { opacity: 0.18 }} />
      <rect x="7" y="22" width="16" height="9" rx="2.5" fill={ink}
        style={animated ? { animation: "g4-40a 3s ease-in-out 0.5s infinite" } : { opacity: 0.35 }} />
      <rect x="25" y="22" width="16" height="9" rx="2.5" fill={ink}
        style={animated ? { animation: "g4-40a 3s ease-in-out 0.8s infinite" } : { opacity: 0.35 }} />
      <rect x="7" y="33" width="34" height="9" rx="2.5" fill={LIME}
        style={animated ? { animation: "g4-40b 3s ease-in-out infinite" } : {}} />
    </svg>
  );
}

// ─── GEN 5: brand-rooted marks ───────────────────────────────────────────────

function Mark5Bench({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <line x1="8" y1="36" x2="40" y2="36" stroke={ink} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="15" cy="27" r="4" fill={ink} style={{ opacity: 0.45 }}/>
      <circle cx="24" cy="27" r="4" fill={ink} style={{ opacity: 0.45 }}/>
      <circle cx="36" cy="16" r="5.2" fill={LIME}
        style={animated ? { animation: "g5-41 1.8s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}}/>
    </svg>
  );
}

function Mark5Dispatch({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="4.5" fill={LIME}/>
      <line x1="24" y1="24" x2="10" y2="11" stroke={ink} strokeWidth="1.8" opacity="0.35"/>
      <line x1="24" y1="24" x2="40" y2="19" stroke={ink} strokeWidth="1.8" opacity="0.35"/>
      <line x1="24" y1="24" x2="14" y2="38" stroke={ink} strokeWidth="1.8" opacity="0.35"/>
      <circle cx="10" cy="11" r="3.8" fill={ink}
        style={animated ? { animation: "g5-42 2.4s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : { opacity: 0.5 }}/>
      <circle cx="40" cy="19" r="3.8" fill={ink}
        style={animated ? { animation: "g5-42 2.4s ease-in-out 0.7s infinite", transformBox: "fill-box", transformOrigin: "center" } : { opacity: 0.5 }}/>
      <circle cx="14" cy="38" r="3.8" fill={ink}
        style={animated ? { animation: "g5-42 2.4s ease-in-out 1.4s infinite", transformBox: "fill-box", transformOrigin: "center" } : { opacity: 0.5 }}/>
    </svg>
  );
}

function Mark5CheckIn({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { animation: "g5-43 2s ease-in-out infinite", transformOrigin: "24px 38px" } : {}}>
        <path d="M24 38 C24 38 13 28 13 19 C13 12.9 18 8 24 8 C30 8 35 12.9 35 19 C35 28 24 38 24 38Z"
          stroke={LIME} strokeWidth="2.5" fill="none"/>
        <path d="M19 19 L22.5 23 L30 15" stroke={ink} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

function Mark5Split({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <line x1="24" y1="8" x2="24" y2="22" stroke={ink} strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M24 22 L12 38" stroke={ink} strokeWidth="2.2" strokeLinecap="round"
        strokeDasharray="4 3" style={{ opacity: 0.28 }}/>
      <path d="M24 22 L36 38" stroke={LIME} strokeWidth="2.8" strokeLinecap="round"
        strokeDasharray={animated ? "22" : undefined}
        style={animated ? { animation: "g5-44 1.6s ease-in-out infinite" } : {}}/>
      <circle cx="36" cy="38" r="3.5" fill={LIME}/>
    </svg>
  );
}

function Mark5Roster({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="11" cy="13" r="3.2" fill={ink}
        style={animated ? { animation: "g5-45a 2.4s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : { opacity: 0.2 }}/>
      <rect x="17" y="10" width="22" height="7" rx="3" fill={ink}
        style={animated ? { animation: "g5-45a 2.4s ease-in-out infinite" } : { opacity: 0.2 }}/>
      <circle cx="11" cy="25" r="3.2" fill={ink}
        style={animated ? { animation: "g5-45b 2.4s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : { opacity: 0.38 }}/>
      <rect x="17" y="22" width="22" height="7" rx="3" fill={ink}
        style={animated ? { animation: "g5-45b 2.4s ease-in-out infinite" } : { opacity: 0.38 }}/>
      <circle cx="11" cy="37" r="4" fill={LIME}
        style={animated ? { animation: "g5-45c 2.4s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" } : {}}/>
      <rect x="17" y="34" width="24" height="8" rx="3.5" fill={LIME}
        style={animated ? { animation: "g5-45c 2.4s ease-in-out infinite" } : { opacity: 0.75 }}/>
    </svg>
  );
}

function Mark5Anchor({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { animation: "g5-46 2.5s ease-in-out infinite", transformOrigin: "24px 24px" } : {}}>
        <circle cx="24" cy="11" r="4.5" stroke={ink} strokeWidth="2.5" fill="none"/>
        <line x1="24" y1="15.5" x2="24" y2="38" stroke={ink} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="13" y1="20" x2="35" y2="20" stroke={LIME} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M13 34 C13 41 20 43 24 38 C28 43 35 41 35 34" stroke={ink} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function Mark5Magnifier({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g style={animated ? { animation: "g5-47 1.8s ease-in-out infinite", transformOrigin: "24px 24px" } : {}}>
        <circle cx="20" cy="20" r="12" stroke={LIME} strokeWidth="2.8" fill="none"/>
        <circle cx="20" cy="16" r="3.2" fill={ink}/>
        <path d="M14 24 C14 19.5 26 19.5 26 24" fill={ink}/>
        <line x1="28.5" y1="28.5" x2="38" y2="38" stroke={ink} strokeWidth="2.8" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function Mark5Compass({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="15" stroke={ink} strokeWidth="2.2" fill="none"/>
      <line x1="24" y1="9" x2="24" y2="13" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="35" x2="24" y2="39" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <line x1="9" y1="24" x2="13" y2="24" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <line x1="35" y1="24" x2="39" y2="24" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <polygon points="24,10 26.5,24 24,29 21.5,24" fill={LIME}
        style={animated ? { animation: "g5-48 4s linear infinite", transformBox: "fill-box", transformOrigin: "center" } : {}}/>
      <circle cx="24" cy="24" r="2.5" fill={ink}/>
    </svg>
  );
}

function Mark5Swoosh({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <line x1="12" y1="38" x2="12" y2="10" stroke={ink} strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="36" y1="38" x2="36" y2="10" stroke={ink} strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M12 10 C19 20 29 26 36 38" stroke={LIME} strokeWidth="3.2" strokeLinecap="round" fill="none"
        strokeDasharray={animated ? "42" : undefined}
        style={animated ? { animation: "g5-49 2s ease-in-out infinite" } : {}}/>
    </svg>
  );
}

function Mark5Handshake({ ink = INK, animated = false }: { ink?: string; animated?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M8 34 C8 18 18 10 24 24" stroke={ink} strokeWidth="2.8" fill="none" strokeLinecap="round"
        strokeDasharray={animated ? "40" : undefined}
        style={animated ? { animation: "g5-50 2.2s ease-in-out infinite" } : {}}/>
      <path d="M40 34 C40 18 30 10 24 24" stroke={ink} strokeWidth="2.8" fill="none" strokeLinecap="round"
        strokeDasharray={animated ? "40" : undefined}
        style={animated ? { animation: "g5-50 2.2s ease-in-out 0.4s infinite" } : {}}/>
      <circle cx="24" cy="24" r="5" fill={LIME}/>
    </svg>
  );
}

// ─── Concept arrays ───────────────────────────────────────────────────────────

type MC = React.ComponentType<{ ink?: string; animated?: boolean }>;

const CONCEPTS1: { id: number; name: string; Mark: MC; blurb: string }[] = [
  { id: 1,  name: "The Bracket",     Mark: MarkBracket,  blurb: "Two brackets — one ink, one green — hold a core dot. 'A system that contains the chaos.'" },
  { id: 2,  name: "The Shine",       Mark: MarkShine,    blurb: "Sparkle paired with a smaller spark. Double meaning: 'sparkling clean' + the AI magic mark." },
  { id: 3,  name: "The Spark",       Mark: MarkSpark,    blurb: "Monogram 'n' in a rounded green tile, dotted with an AI spark. Works as a favicon at any size." },
  { id: 4,  name: "The Snap",        Mark: MarkSnap,     blurb: "Scattered bars snapping into alignment — jobs, bookings, and dispatch falling into place." },
  { id: 5,  name: "The Pin Monogram",Mark: MarkPinN,     blurb: "A field-service pin carrying the brand 'n' in negative space. Owns the letter and the dispatch story." },
  { id: 6,  name: "The Loop",        Mark: MarkLoop,     blurb: "Circular arrow around a core. 'Automation that runs itself' — recurring jobs on a loop." },
  { id: 7,  name: "The Calendar",    Mark: MarkCalendar, blurb: "A calendar tile with one slot booked in green. Names the core action without a word." },
  { id: 8,  name: "The Route",       Mark: MarkRoute,    blurb: "A dotted path from start to destination. Field-service routing and dispatch, in motion." },
  { id: 9,  name: "The Stack",       Mark: MarkStack,    blurb: "Overlapping layers — one platform holding booking, scheduling, dispatch, and invoicing together." },
  { id: 10, name: "The Pulse",       Mark: MarkPulse,    blurb: "A live activity line with a peak node. Real-time operations: jobs flowing as they happen." },
];

const CONCEPTS2: { id: number; name: string; Mark: MC; blurb: string }[] = [
  { id: 11, name: "The Wave",      Mark: MarkWave,      blurb: "A scrolling sine wave — continuous, automated operations. The wave never stops." },
  { id: 12, name: "The Shield",    Mark: MarkShield,    blurb: "Protection and trust at the core. A pulsing lime heartbeat — reliability that runs 24/7." },
  { id: 13, name: "The Crosshair", Mark: MarkCrosshair, blurb: "Precision dispatch. Rotating outer ring — the nearest crew, locked on automatically." },
  { id: 14, name: "The Bolt",      Mark: MarkBolt,      blurb: "Instant. Zero-delay dispatch — booking to crew assignment in under 90 seconds." },
  { id: 15, name: "The Grid",      Mark: MarkGrid,      blurb: "Order from chaos. A 3×3 dot grid with a glowing centre — intelligence at the heart of the system." },
  { id: 16, name: "The Clock",     Mark: MarkClock,     blurb: "Time is the product. Hours saved every week, running while you aren't." },
  { id: 17, name: "The Flow",      Mark: MarkFlow,      blurb: "The booking pipeline, animated. A marker moves from intake to destination." },
  { id: 18, name: "The Hex",       Mark: MarkHex,       blurb: "Structured geometry for a structured system. A hexagon within a hexagon — outer structure, inner intelligence." },
  { id: 19, name: "The Orbit",     Mark: MarkOrbit,     blurb: "Crew in motion around a fixed centre. The lime satellite orbits the core node — dispatch that never rests." },
  { id: 20, name: "The Frequency", Mark: MarkFreq,      blurb: "Live operations at a glance. An EKG-style line traces jobs as they flow in real time." },
];

const CONCEPTS3: { id: number; name: string; Mark: MC; blurb: string }[] = [
  { id: 21, name: "The Prism",   Mark: MarkPrism,    blurb: "A scanning beam sweeps a triangle — precision across every job." },
  { id: 22, name: "The Circuit", Mark: MarkCircuit,  blurb: "A signal pulses through a PCB trace — booking, dispatch, invoice without friction." },
  { id: 23, name: "The Radar",   Mark: MarkRadar,    blurb: "A rotating sweep locates the nearest crew automatically. Lock on, assign, done." },
  { id: 24, name: "The Toggle",  Mark: MarkToggle,   blurb: "On/off, always on. A toggle that flips itself — automation that activates so you don't have to." },
  { id: 25, name: "The Signal",  Mark: MarkSignal,   blurb: "Concentric arcs broadcasting outward — booking confirmation, dispatcher alert, crew notification." },
  { id: 26, name: "The Diamond", Mark: MarkDiamond,  blurb: "Slowly rotating geometry — precision in perpetual motion. Premium in a plain-Jane market." },
  { id: 27, name: "The Coil",    Mark: MarkCoil,     blurb: "A pulse races through a coil — energy always running. Recurring jobs, zero manual triggers." },
  { id: 28, name: "The Gate",    Mark: MarkGate,     blurb: "Two pillars part to reveal what's inside. The platform opens; operations flow through." },
  { id: 29, name: "The Star",    Mark: MarkStarMark, blurb: "A 4-point star slowly rotates — a north star for field operations." },
  { id: 30, name: "The Arc",     Mark: MarkArc,      blurb: "A progress ring fills and resets — every job cycle, completed, then ready again." },
];

const CONCEPTS4: { id: number; name: string; Mark: MC; blurb: string }[] = [
  { id: 31, name: "The N-Mark",   Mark: Mark4NMark,    blurb: "Bold N letterform with a lime diagonal — clean, ownable, reads at any size." },
  { id: 32, name: "The Chevrons", Mark: Mark4Chevrons, blurb: "Three converging chevrons — momentum, direction, dispatch. Leading edge arrives last and sharpest." },
  { id: 33, name: "The Tiles",    Mark: Mark4Tiles,    blurb: "Four tiles, one lit lime — one job, one crew, one moment completed." },
  { id: 34, name: "The Wedge",    Mark: Mark4Wedge,    blurb: "A geometric sector from a pivot point — the instant a booking arrives and the engine spins up." },
  { id: 35, name: "The Knot",     Mark: Mark4Knot,     blurb: "An S-curve that crosses itself — the booking loop: request → assign → complete → repeat." },
  { id: 36, name: "The Leaf",     Mark: Mark4Leaf,     blurb: "Organic, clean, and directional. A leaf growing corner to corner — for cleaning businesses." },
  { id: 37, name: "The Badge",    Mark: Mark4Badge,    blurb: "A service badge with a check — certified, trusted, done." },
  { id: 38, name: "The Target",   Mark: Mark4Target,   blurb: "Concentric rings around a lime core — dispatch locked on the nearest crew, always." },
  { id: 39, name: "The Caret",    Mark: Mark4Caret,    blurb: "A stacked double caret pointing up — reaching higher, always improving." },
  { id: 40, name: "The Brick",    Mark: Mark4Brick,    blurb: "Stacked building blocks with a lime foundation — the platform everything else is built on." },
];

const CONCEPTS5: { id: number; name: string; Mark: MC; blurb: string }[] = [
  { id: 41, name: "The Bench",      Mark: Mark5Bench,      blurb: "A backup crew member raised above the bar — Neatlist's staffed bench, always ready to fill a no-show." },
  { id: 42, name: "The Dispatch",   Mark: Mark5Dispatch,   blurb: "A lime hub radiates to three crew dots. Instant assignment: one tap, job covered in under 90 seconds." },
  { id: 43, name: "The Check-In",   Mark: Mark5CheckIn,    blurb: "Location pin with a checkmark inside — job confirmed, crew on-site, customer notified." },
  { id: 44, name: "The Split",      Mark: Mark5Split,      blurb: "Primary branch drops out (dashed); fallback branch fires in lime. The no-show replacement path, visualised." },
  { id: 45, name: "The Roster",     Mark: Mark5Roster,     blurb: "Three staffed rows — two standing by, one active in lime. Your whole team in one platform." },
  { id: 46, name: "The Anchor",     Mark: Mark5Anchor,     blurb: "A weighted anchor with a lime crossbar — the platform that keeps field operations from drifting." },
  { id: 47, name: "The Magnifier",  Mark: Mark5Magnifier,  blurb: "A search lens framing a person silhouette — finding the right crew member, every time." },
  { id: 48, name: "The Compass",    Mark: Mark5Compass,    blurb: "Compass circle with a lime needle pointing north — precision dispatch, always pointing toward the job." },
  { id: 49, name: "The Swoosh",     Mark: Mark5Swoosh,     blurb: "Bold N letterform with a curved lime diagonal — fluid, modern, ownable at any size." },
  { id: 50, name: "The Handshake",  Mark: Mark5Handshake,  blurb: "Two arcs meeting at a lime dot — operator and crew, connected at the point of trust." },
];

// ─── Wordmark components ──────────────────────────────────────────────────────

function Wordmark({ mark, dark = false }: { mark: React.ReactNode; dark?: boolean }) {
  const ink = dark ? "#fff" : INK;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {mark}
      <span style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.03em", color: ink, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        neatr<span style={{ color: dark ? GREEN : GREEN_DK }}>.ai</span>
      </span>
    </div>
  );
}

function Wordmark2({ mark, dark = false }: { mark: React.ReactNode; dark?: boolean }) {
  const ink = dark ? "#fff" : INK;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {mark}
      <span style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.03em", color: ink, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        neatr<span style={{ color: dark ? LIME : LIME_DK }}>.ai</span>
      </span>
    </div>
  );
}

// ─── Shared card component ────────────────────────────────────────────────────

const PANEL_LABEL: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
  marginBottom: 16, display: "block",
};

function LogoCard({ id, name, blurb, Mark, Wm, accentColor }: {
  id: number; name: string; blurb: string;
  Mark: MC;
  Wm: typeof Wordmark;
  accentColor: string;
}) {
  const borderColor = accentColor === GREEN ? "#E5E7EB" : `${LIME}44`;
  const sep = accentColor === GREEN ? "#F0F0F0" : "#F5FFD6";
  return (
    <section style={{ border: `1px solid ${borderColor}`, borderRadius: 16, overflow: "hidden", background: "#fff" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "18px 24px 12px", borderBottom: `1px solid ${sep}` }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: accentColor, fontVariantNumeric: "tabular-nums" }}>{String(id).padStart(2, "0")}</span>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}>{name}</span>
        <span style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", marginLeft: 4 }}>{blurb}</span>
      </div>
      {/* 4 panels: steady-light | steady-dark | animated-light | animated-dark */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        {/* steady label row */}
        <div style={{ gridColumn: "1/3", padding: "10px 20px 0", borderRight: `2px solid ${sep}` }}>
          <span style={{ ...PANEL_LABEL, color: "rgba(0,0,0,0.35)" }}>steady</span>
        </div>
        <div style={{ gridColumn: "3/5", padding: "10px 20px 0" }}>
          <span style={{ ...PANEL_LABEL, color: accentColor === GREEN ? GREEN_DK : LIME_DK }}>animated</span>
        </div>
        {/* panel 1: steady on white */}
        <div style={{ padding: "0 20px 24px", background: "#fff", borderRight: `1px solid ${sep}` }}>
          <Wm mark={<Mark animated={false} />} />
        </div>
        {/* panel 2: steady on dark */}
        <div style={{ padding: "0 20px 24px", background: INK, borderRight: `2px solid ${sep}`, display: "flex", alignItems: "flex-start" }}>
          <Wm mark={<Mark animated={false} ink="#fff" />} dark />
        </div>
        {/* panel 3: animated on white */}
        <div style={{ padding: "0 20px 24px", background: "#fff", borderRight: `1px solid ${sep}` }}>
          <Wm mark={<Mark animated />} />
        </div>
        {/* panel 4: animated on dark */}
        <div style={{ padding: "0 20px 24px", background: INK, display: "flex", alignItems: "flex-start" }}>
          <Wm mark={<Mark animated ink="#fff" />} dark />
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LogosPage() {
  const sectionLabel = (text: string): React.CSSProperties => ({
    fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(0,0,0,0.3)",
    textTransform: "uppercase", marginBottom: 16, marginTop: 0, display: "block",
  });

  return (
    <>
      <style>{KEYFRAMES}</style>
      <main style={{ minHeight: "100vh", background: "#fff", color: INK, fontFamily: "ui-sans-serif, system-ui, sans-serif", padding: "56px 24px 96px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* Header */}
          <header style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: 10 }}>neatr.ai — brand exploration</div>
            <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 12px" }}>50 logo concepts</h1>
            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.5)", margin: 0, lineHeight: 1.6 }}>
              Each mark shows <strong>steady</strong> + <strong>animated</strong> variants on light and dark.<br />
              Gen 1 (01–10) green · Gen 2 (11–20) lime animated · Gen 3 (21–30) structural · Gen 4 (31–40) lime static · Gen 5 (41–50) brand-rooted
            </p>
          </header>

          {/* Gen 1 */}
          <span style={sectionLabel("")}>Generation 1 — green</span>
          <div style={{ display: "grid", gap: 12, marginBottom: 52 }}>
            {CONCEPTS1.map(({ id, name, Mark, blurb }) => (
              <LogoCard key={id} id={id} name={name} blurb={blurb} Mark={Mark} Wm={Wordmark} accentColor={GREEN_DK} />
            ))}
          </div>

          {/* Gen 2 */}
          <span style={sectionLabel("")}>Generation 2 — lime animated</span>
          <div style={{ display: "grid", gap: 12, marginBottom: 52 }}>
            {CONCEPTS2.map(({ id, name, Mark, blurb }) => (
              <LogoCard key={id} id={id} name={name} blurb={blurb} Mark={Mark} Wm={Wordmark2} accentColor={LIME_DK} />
            ))}
          </div>

          {/* Gen 3 */}
          <span style={sectionLabel("")}>Generation 3 — structural</span>
          <div style={{ display: "grid", gap: 12, marginBottom: 52 }}>
            {CONCEPTS3.map(({ id, name, Mark, blurb }) => (
              <LogoCard key={id} id={id} name={name} blurb={blurb} Mark={Mark} Wm={Wordmark2} accentColor={LIME_DK} />
            ))}
          </div>

          {/* Gen 4 — grid */}
          <span style={sectionLabel("")}>Generation 4 — lime static · grid</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 52 }}>
            {CONCEPTS4.map(({ id, name, Mark, blurb }) => (
              <div key={id} style={{ border: "1px solid #E8E8E8", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
                {/* dark swatches — steady | animated */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ background: INK, padding: "20px 0 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, borderRight: "1px solid #222" }}>
                    <span style={{ fontSize: 8, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>steady</span>
                    <Mark ink="#fff" animated={false} />
                  </div>
                  <div style={{ background: INK, padding: "20px 0 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 8, color: LIME, letterSpacing: "0.1em", textTransform: "uppercase" }}>animated</span>
                    <Mark ink="#fff" animated />
                  </div>
                </div>
                {/* light swatches */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #eee" }}>
                  <div style={{ padding: "14px 0", display: "flex", justifyContent: "center", borderRight: "1px solid #eee" }}>
                    <Mark animated={false} />
                  </div>
                  <div style={{ padding: "14px 0", display: "flex", justifyContent: "center" }}>
                    <Mark animated />
                  </div>
                </div>
                {/* info */}
                <div style={{ padding: "12px 14px 16px", borderTop: "1px solid #eee" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: LIME_DK }}>{String(id).padStart(2, "0")}</span>
                  </div>
                  <p style={{ fontSize: 11.5, lineHeight: 1.5, color: "rgba(0,0,0,0.48)", margin: 0 }}>{blurb}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gen 5 — brand-rooted */}
          <span style={sectionLabel("")}>Generation 5 — brand-rooted</span>
          <div style={{ display: "grid", gap: 12, marginBottom: 52 }}>
            {CONCEPTS5.map(({ id, name, Mark, blurb }) => (
              <LogoCard key={id} id={id} name={name} blurb={blurb} Mark={Mark} Wm={Wordmark2} accentColor={LIME_DK} />
            ))}
          </div>

          <footer style={{ marginTop: 40, fontSize: 13, color: "rgba(0,0,0,0.38)" }}>
            All animations use CSS keyframes — live in browser.
            Remotion compositions (Logo01–Logo20) available in <code style={{ background: "#F5F5F5", padding: "2px 6px", borderRadius: 4 }}>neatr-video/</code>.
            &nbsp;·&nbsp;<a href="/versions" style={{ color: "rgba(0,0,0,0.38)" }}>→ landing versions</a>
          </footer>
        </div>
      </main>
    </>
  );
}
