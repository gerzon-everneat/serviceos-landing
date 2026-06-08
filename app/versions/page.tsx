"use client";

const LIME = "#C8FF00";
const DARK = "#060606";
const SURFACE = "#111111";
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "#555555";
const TEXT = "#FFFFFF";

const VERSIONS = [
  { route: "v2", label: "AI-Forward", theme: "dark", desc: "AI-first pitch vs BookingKoala & Launch27, animated hero" },
  { route: "v3", label: "Sharp & Warm", theme: "dark", desc: "Brand redesign — mesh blobs, booking widget demo, dashboard mock" },
  { route: "v4", label: "Variant 4", theme: "dark", desc: "Landing page variant" },
  { route: "v5", label: "Variant 5", theme: "dark", desc: "Landing page variant" },
  { route: "v6", label: "Variant 6", theme: "dark", desc: "Landing page variant" },
  { route: "v7", label: "Light Theme", theme: "light", desc: "Everneat light theme — current root page" },
  { route: "v8", label: "Variant 8", theme: "dark", desc: "Landing page variant" },
  { route: "v9", label: "Distributional", theme: "dark", desc: "Dark/light alternating — distributional.com aesthetic, real screenshots" },
  { route: "v9-1", label: "v9 · Variant A", theme: "dark", desc: "Pre-launch honest content, no fake social proof" },
  { route: "v9-2", label: "v9 · Variant B", theme: "dark", desc: "Pre-launch honest content, no fake social proof" },
  { route: "v9-3", label: "v9 · Variant C", theme: "dark", desc: "Pre-launch honest content, no fake social proof" },
  { route: "v10", label: "Pre-Launch", theme: "dark", desc: "Honest startup content strategy, pre-launch positioning" },
  { route: "v11", label: "Animated Blobs", theme: "both", desc: "Animated hero blobs, floating booking widget, live notifications, light/dark toggle" },
  { route: "v12", label: "Variant 12", theme: "dark", desc: "Landing page variant — inbox-style lead capture" },
  { route: "v13", label: "Dark Nav", theme: "dark", desc: "Dark-themed with logo nav refinements" },
  { route: "v14", label: "Variant 14", theme: "dark", desc: "Landing page variant — auto-match focus" },
  { route: "v15", label: "Variant 15", theme: "dark", desc: "Landing page variant" },
  { route: "v16", label: "Variant 16", theme: "dark", desc: "Landing page variant" },
  { route: "v17", label: "Waitlist CTA", theme: "dark", desc: "Claim My Spot waitlist — early access positioning" },
  { route: "v18", label: "Variant 18", theme: "dark", desc: "Landing page variant — inbox-style capture" },
  { route: "v19", label: "Animated", theme: "dark", desc: "Comprehensive section animations, scroll-triggered reveals" },
  { route: "v20", label: "Carousel Hero", theme: "dark", desc: "Rotating headline carousel, dynamic value prop cycling" },
  { route: "v21", label: "Dashboard", theme: "dark", desc: "Animated live dashboard preview — operations-focused" },
  { route: "v22", label: "Mobile-First", theme: "dark", desc: "Animated 3D phone mockup showing full app workflow" },
  { route: "v23", label: "Pipeline", theme: "dark", desc: "Auto-cycling pipeline visualization — dark, cinematic" },
  { route: "v24", label: "Timeline", theme: "dark", desc: "Animated automation timeline — shows the job lifecycle" },
  { route: "v25", label: "Empathy", theme: "dark", desc: "Empathy-driven — addresses software failure pain points" },
  { route: "v26", label: "Risk-Reversal", theme: "dark", desc: "Pricing-first hero, risk-reversal positioning, no upfront cost" },
  { route: "v27", label: "vs Competitors", theme: "dark", desc: "Competitive urgency — side-by-side Monday comparison" },
  { route: "v28", label: "Vertical", theme: "dark", desc: "Residential cleaning vertical — live job board demo" },
];

const THEME_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  dark: { label: "dark", color: MUTED, bg: "rgba(255,255,255,0.05)" },
  light: { label: "light", color: "#3A5000", bg: "rgba(200,255,0,0.15)" },
  both: { label: "dark + light", color: "#5A9A00", bg: "rgba(200,255,0,0.1)" },
};

export default function VersionsPage() {
  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: "var(--font-sans, DM Sans, sans-serif)", color: TEXT, padding: "64px 24px 120px" }}>
      <style>{`
        .vcard { transition: border-color 0.18s, transform 0.18s; }
        .vcard:hover { border-color: rgba(200,255,0,0.35) !important; transform: translateY(-2px); }
        .vtag { transition: opacity 0.15s; }
        .vcard:hover .vtag { opacity: 1 !important; }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 960, margin: "0 auto 64px", textAlign: "center" }}>
        <p style={{ color: LIME, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          neatr.ai
        </p>
        <h1 style={{
          fontFamily: "var(--font-cormorant, Cormorant Garamond, serif)",
          fontSize: "clamp(42px, 7vw, 80px)",
          fontWeight: 600,
          fontStyle: "italic",
          lineHeight: 1,
          margin: "0 0 20px",
          color: TEXT,
        }}>
          Landing Page Variants
        </h1>
        <p style={{ color: MUTED, fontSize: 16, margin: 0 }}>
          {VERSIONS.length} experiments · scroll to browse · click to open
        </p>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 16,
      }}>
        {VERSIONS.map((v) => {
          const badge = THEME_BADGE[v.theme] || THEME_BADGE.dark;
          return (
            <a
              key={v.route}
              href={`/${v.route}`}
              className="vcard"
              style={{
                display: "block",
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: "24px 24px 20px",
                textDecoration: "none",
                color: TEXT,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Version number */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{
                  fontFamily: "var(--font-cormorant, Cormorant Garamond, serif)",
                  fontSize: 36,
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: LIME,
                  lineHeight: 1,
                }}>
                  /{v.route}
                </span>
                <span
                  className="vtag"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: badge.color,
                    background: badge.bg,
                    border: `1px solid ${badge.color}33`,
                    borderRadius: 20,
                    padding: "3px 10px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                    marginTop: 6,
                  }}
                >
                  {badge.label}
                </span>
              </div>

              {/* Label */}
              <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 6 }}>
                {v.label}
              </div>

              {/* Desc */}
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, margin: 0 }}>
                {v.desc}
              </p>

              {/* Arrow */}
              <div style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                color: MUTED,
                fontSize: 18,
                opacity: 0.4,
              }}>
                →
              </div>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <p style={{ textAlign: "center", color: MUTED, fontSize: 13, marginTop: 80 }}>
        <a href="/logos" style={{ color: MUTED, textDecoration: "none" }}>→ logo concepts</a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <a href="/" style={{ color: MUTED, textDecoration: "none" }}>→ main site</a>
      </p>
    </div>
  );
}
