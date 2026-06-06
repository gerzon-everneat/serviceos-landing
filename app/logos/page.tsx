"use client";

/**
 * neatr.ai — Logo concept gallery
 * 5 distinct marks, each shown on light + dark, scalable SVG.
 * Brand: green #22C55E primary, near-black #0A0A0A ink, white theme.
 * View at /logos
 */

const GREEN = "#22C55E";
const GREEN_DK = "#16A34A";
const INK = "#0A0A0A";

/* ------------------------------------------------------------------ */
/* 1. THE BRACKET — refines the existing [neatr.ai] system motif.      */
/*    Brackets = a container, a system that holds everything together. */
/* ------------------------------------------------------------------ */
function MarkBracket({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr bracket mark">
      <path d="M19 9 H12 a3 3 0 0 0 -3 3 V36 a3 3 0 0 0 3 3 H19" stroke={ink} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M29 9 H36 a3 3 0 0 1 3 3 V36 a3 3 0 0 1 -3 3 H29" stroke={GREEN} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3.4" fill={GREEN} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. THE SHINE — a sparkle (4-point star) paired with a smaller spark. */
/*    Double meaning: "sparkling clean" + the AI "magic" mark.          */
/*    No letterform → reads instantly at favicon size, highly ownable.  */
/* ------------------------------------------------------------------ */
function MarkShine({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr shine mark">
      {/* main sparkle */}
      <path d="M20 8 C21 18.5 21.6 19.2 32 24 C21.6 28.8 21 29.5 20 40 C19 29.5 18.4 28.8 8 24 C18.4 19.2 19 18.5 20 8 Z"
        fill={GREEN} />
      {/* secondary spark — ink, to anchor the mark and echo brand contrast */}
      <path d="M36 10 C36.5 14.6 36.7 14.9 41 16.5 C36.7 18.1 36.5 18.4 36 23 C35.5 18.4 35.3 18.1 31 16.5 C35.3 14.9 35.5 14.6 36 10 Z"
        fill={ink} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. THE SPARK — a monogram "n" inside a rounded tile, dotted with an  */
/*    AI spark. Reads as an app icon. Confident, product-forward.      */
/* ------------------------------------------------------------------ */
function MarkSpark({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr spark mark">
      <rect x="4" y="4" width="40" height="40" rx="11" fill={GREEN} />
      <path d="M17 34 V19 M17 23 C19 19 24 18.5 27 21 C29 22.7 29.5 25 29.5 28 V34"
        stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="33.5" cy="16" r="3" fill="#fff" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. THE SNAP — scattered squares aligning into a column. Order from   */
/*    chaos: scheduling, dispatch, jobs falling into place.            */
/* ------------------------------------------------------------------ */
function MarkSnap({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr snap mark">
      <rect x="9"  y="10" width="13" height="7" rx="2.2" fill={ink} opacity="0.28" transform="rotate(-9 15.5 13.5)" />
      <rect x="10" y="21" width="20" height="7" rx="2.2" fill={ink} />
      <rect x="10" y="32" width="28" height="7" rx="2.2" fill={GREEN} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. THE PIN MONOGRAM — a field-service location pin carrying the brand */
/*    "n" in negative space. Owns the letter + the dispatch story; far   */
/*    more distinctive than the common check-in-a-pin (TM-crowded).      */
/* ------------------------------------------------------------------ */
function MarkPinN({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr pin monogram mark">
      <path d="M24 5 C15.4 5 8.5 11.6 8.5 20 C8.5 30.6 24 43 24 43 C24 43 39.5 30.6 39.5 20 C39.5 11.6 32.6 5 24 5 Z"
        fill={GREEN} />
      {/* negative-space n inside the pin head */}
      <path d="M18.5 28 V15.5 M18.5 19.5 C19 15.4 24 13.8 27.5 16.6 C29.4 18.1 30 20.4 30 23.4 V28"
        stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. THE LOOP — a circular arrow around a core. "Automation that runs   */
/*    itself": recurring jobs, dispatch, follow-ups on a loop.          */
/* ------------------------------------------------------------------ */
function MarkLoop({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr loop mark">
      <path d="M37 24 A13 13 0 1 1 31 12.8" stroke={GREEN} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M31.5 7.5 L33 13.5 L26.8 14.2 Z" fill={GREEN} />
      <circle cx="24" cy="24" r="3.4" fill={ink} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. THE CALENDAR — a calendar tile with one slot booked in green.     */
/*    Booking-native, instantly legible, plays to the core action.     */
/* ------------------------------------------------------------------ */
function MarkCalendar({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr calendar mark">
      <rect x="8" y="11" width="32" height="29" rx="6" stroke={ink} strokeWidth="3" fill="none" />
      <path d="M8 19 H40" stroke={ink} strokeWidth="3" />
      <path d="M16 7 V13 M32 7 V13" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <rect x="21.5" y="24" width="11" height="9" rx="2.2" fill={GREEN} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8. THE ROUTE — a path from a start node to a destination marker.     */
/*    Field-service routing & dispatch, in motion.                     */
/* ------------------------------------------------------------------ */
function MarkRoute({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr route mark">
      <path d="M11 35 C23 35 17 19 30 17" stroke={ink} strokeWidth="3.2" strokeLinecap="round" strokeDasharray="0.1 7" fill="none" />
      <circle cx="11" cy="35" r="3.6" fill={ink} />
      <circle cx="33" cy="15" r="6" stroke={GREEN} strokeWidth="3.2" fill="none" />
      <circle cx="33" cy="15" r="2" fill={GREEN} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 9. THE STACK — overlapping layers. One platform that holds booking,  */
/*    scheduling, dispatch, and invoicing together.                    */
/* ------------------------------------------------------------------ */
function MarkStack({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr stack mark">
      <path d="M24 7 L41 16 L24 25 L7 16 Z" fill={GREEN} />
      <path d="M8 23 L24 31.5 L40 23" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M8 30 L24 38.5 L40 30" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 10. THE PULSE — a live activity line with a peak node. Real-time     */
/*     operations: jobs flowing through the system as they happen.      */
/* ------------------------------------------------------------------ */
function MarkPulse({ ink = INK }: { ink?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="neatr pulse mark">
      <path d="M7 26 H16 L20 15 L27 33 L31 24 H41" stroke={ink} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="27" cy="33" r="3.4" fill={GREEN} />
    </svg>
  );
}

function Wordmark({ mark, dark = false, brackets = false }: { mark: React.ReactNode; dark?: boolean; brackets?: boolean }) {
  const ink = dark ? "#fff" : INK;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {mark}
      <span style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.03em", color: ink, fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
        {brackets && <span style={{ color: dark ? "#22C55E" : GREEN_DK, fontWeight: 600 }}>[</span>}
        neatr<span style={{ color: dark ? "#22C55E" : GREEN_DK }}>.ai</span>
        {brackets && <span style={{ color: dark ? "#22C55E" : GREEN_DK, fontWeight: 600 }}>]</span>}
      </span>
    </div>
  );
}

const CONCEPTS = [
  { id: 1, name: "The Bracket", Mark: MarkBracket, brackets: false,
    blurb: "Refines your current [neatr.ai] motif. Two brackets — one ink, one green — hold a core dot. A 'system that contains the chaos.'" },
  { id: 2, name: "The Shine", Mark: MarkShine, brackets: false,
    blurb: "A sparkle paired with a smaller spark. Double meaning: 'sparkling clean' + the AI 'magic' mark. No letterform, so it reads instantly at favicon size and is highly ownable." },
  { id: 3, name: "The Spark (app icon)", Mark: MarkSpark, brackets: false,
    blurb: "Monogram 'n' in a rounded green tile, dotted with an AI spark. Product-forward, works as a favicon / app icon at any size." },
  { id: 4, name: "The Snap", Mark: MarkSnap, brackets: false,
    blurb: "Scattered bars snapping into alignment — jobs, bookings, and dispatch falling into place. Order from chaos." },
  { id: 5, name: "The Pin Monogram", Mark: MarkPinN, brackets: false,
    blurb: "A field-service location pin carrying the brand 'n' in negative space. Owns the letter and the dispatch story — far more distinctive than the common (and trademark-crowded) check-in-a-pin." },
  { id: 6, name: "The Loop", Mark: MarkLoop, brackets: false,
    blurb: "A circular arrow around a core. 'Automation that runs itself' — recurring jobs, dispatch, and follow-ups on a loop." },
  { id: 7, name: "The Calendar", Mark: MarkCalendar, brackets: false,
    blurb: "A calendar tile with one slot booked in green. Booking-native and instantly legible — it names the core action without a word." },
  { id: 8, name: "The Route", Mark: MarkRoute, brackets: false,
    blurb: "A dotted path from a start node to a destination marker. Field-service routing and dispatch, in motion." },
  { id: 9, name: "The Stack", Mark: MarkStack, brackets: false,
    blurb: "Overlapping layers — one platform holding booking, scheduling, dispatch, and invoicing together. 'The complete system.'" },
  { id: 10, name: "The Pulse", Mark: MarkPulse, brackets: false,
    blurb: "A live activity line with a peak node. Real-time operations: jobs flowing through the system as they happen." },
];

export default function LogosPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#fff", color: INK, fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif", padding: "56px 24px 96px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <header style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 10 }}>
            neatr.ai — brand exploration
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>10 logo options</h1>
          <p style={{ fontSize: 16, color: "rgba(0,0,0,0.55)", maxWidth: 620, marginTop: 12, lineHeight: 1.55 }}>
            Each mark is scalable SVG, built on the green&nbsp;<span style={{ color: GREEN_DK, fontWeight: 600 }}>#22C55E</span> brand.
            Shown small (favicon scale), as a full lockup, and reversed on dark. Tell me which direction to push.
          </p>
        </header>

        <div style={{ display: "grid", gap: 20 }}>
          {CONCEPTS.map(({ id, name, Mark, brackets, blurb }) => (
            <section key={id} style={{ border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
              {/* header row */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "18px 24px", borderBottom: "1px solid #F0F0F0" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: GREEN_DK }}>{String(id).padStart(2, "0")}</span>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}>{name}</span>
              </div>

              {/* body */}
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", alignItems: "stretch" }}>
                {/* light panel */}
                <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: 24, justifyContent: "center", borderRight: "1px solid #F0F0F0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                    {/* small / favicon scale */}
                    <div style={{ transform: "scale(0.5)", transformOrigin: "left center", width: 24, height: 24 }}>
                      <Mark />
                    </div>
                    <Wordmark mark={<Mark />} brackets={brackets} />
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(0,0,0,0.6)", margin: 0 }}>{blurb}</p>
                </div>

                {/* dark panel */}
                <div style={{ padding: "32px 24px", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wordmark mark={<Mark ink="#fff" />} dark brackets={brackets} />
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer style={{ marginTop: 40, fontSize: 13, color: "rgba(0,0,0,0.4)" }}>
          Run the dev server and open <code style={{ background: "#F5F5F5", padding: "2px 6px", borderRadius: 4 }}>/logos</code>. Each mark is editable SVG in <code style={{ background: "#F5F5F5", padding: "2px 6px", borderRadius: 4 }}>app/logos/page.tsx</code>.
        </footer>
      </div>
    </main>
  );
}
