import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";

const { fontFamily: sans } = loadDMSans("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});
const { fontFamily: serif } = loadCormorant("italic", {
  weights: ["600"],
  subsets: ["latin"],
});

const LIME = "#C8FF00";
const GREEN = "#22C55E";
const INK = "#0A0A0A";
const BG = "#060606";
const WHITE = "#FFFFFF";
const MUTED = "#444444";

function ease(frame: number, start: number, dur: number, from = 0, to = 1): number {
  return interpolate(frame, [start, start + dur], [from, to], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ── 01: TypeWriter ──────────────────────────────────────────────────────────────
// Each character of "neatr.ai" appears and slides up; .ai glows lime; cursor blinks.
export function Logo01TypeWriter() {
  const frame = useCurrentFrame();
  const chars = ["n", "e", "a", "t", "r", ".", "a", "i"];
  const CHAR_DELAY = 10;
  const endFrame = (chars.length - 1) * CHAR_DELAY + 20;

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.35,
        }}
      />

      {/* Lime glow behind text */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 200,
          borderRadius: "50%",
          background: LIME,
          opacity: ease(frame, endFrame, 20) * 0.04,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          fontFamily: serif,
          fontSize: 108,
          fontWeight: 600,
          fontStyle: "italic",
          letterSpacing: "-2px",
          lineHeight: 1,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {chars.map((c, i) => {
          const appear = i * CHAR_DELAY;
          const op = interpolate(frame, [appear, appear + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(frame, [appear, appear + 14], [14, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const limeGlow = i >= 5 ? ease(frame, endFrame, 20) : 0;
          return (
            <span
              key={i}
              style={{
                color: i >= 5 ? LIME : WHITE,
                opacity: op,
                display: "inline-block",
                transform: `translateY(${y}px)`,
                textShadow: limeGlow > 0 ? `0 0 ${40 * limeGlow}px ${LIME}` : "none",
              }}
            >
              {c}
            </span>
          );
        })}

        {/* blinking cursor */}
        {frame < endFrame + 40 && (
          <span
            style={{
              color: LIME,
              fontFamily: sans,
              fontWeight: 200,
              fontSize: 90,
              marginLeft: 3,
              lineHeight: 1,
              opacity: Math.floor(frame / 14) % 2 === 0 ? 0.9 : 0,
            }}
          >
            |
          </span>
        )}
      </div>

      <div
        style={{
          fontFamily: sans,
          fontSize: 14,
          letterSpacing: "0.2em",
          color: MUTED,
          marginTop: 28,
          textTransform: "uppercase",
          opacity: ease(frame, endFrame + 10, 20),
        }}
      >
        Field service, automated.
      </div>
    </AbsoluteFill>
  );
}

// ── 02: DrawSpark ───────────────────────────────────────────────────────────────
// The sparkle SVG paths draw themselves in via strokeDashoffset; wordmark rises below.
const SPARKLE_LEN = 140;
const SMALL_LEN = 52;

export function Logo02DrawSpark() {
  const frame = useCurrentFrame();
  const drawBig = ease(frame, 5, 55);
  const drawSmall = ease(frame, 30, 40);
  const wordOpacity = ease(frame, 70, 25);
  const wordY = interpolate(frame, [70, 95], [18, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scaleIn = ease(frame, 0, 20, 0.6, 1);

  return (
    <AbsoluteFill
      style={{
        background: INK,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Sparkle mark drawn in */}
      <div style={{ transform: `scale(${5 * scaleIn})`, transformOrigin: "center" }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M20 8 C21 18.5 21.6 19.2 32 24 C21.6 28.8 21 29.5 20 40 C19 29.5 18.4 28.8 8 24 C18.4 19.2 19 18.5 20 8 Z"
            stroke={GREEN}
            strokeWidth="1.2"
            fill="none"
            strokeDasharray={SPARKLE_LEN}
            strokeDashoffset={interpolate(drawBig, [0, 1], [SPARKLE_LEN, 0])}
            strokeLinecap="round"
          />
          <path
            d="M36 10 C36.5 14.6 36.7 14.9 41 16.5 C36.7 18.1 36.5 18.4 36 23 C35.5 18.4 35.3 18.1 31 16.5 C35.3 14.9 35.5 14.6 36 10 Z"
            stroke={LIME}
            strokeWidth="1.2"
            fill="none"
            strokeDasharray={SMALL_LEN}
            strokeDashoffset={interpolate(drawSmall, [0, 1], [SMALL_LEN, 0])}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <div
        style={{
          opacity: wordOpacity,
          transform: `translateY(${wordY}px)`,
          fontFamily: serif,
          fontSize: 80,
          fontWeight: 600,
          fontStyle: "italic",
          color: WHITE,
          letterSpacing: "-1px",
          lineHeight: 1,
        }}
      >
        neatr<span style={{ color: LIME }}>.ai</span>
      </div>
    </AbsoluteFill>
  );
}

// ── 03: AngledReveal ────────────────────────────────────────────────────────────
// A diagonal lime stripe sweeps left-to-right; logo emerges in its wake.
export function Logo03AngledReveal() {
  const frame = useCurrentFrame();
  const sweep = ease(frame, 0, 55);
  const logoOpacity = ease(frame, 35, 30);
  const logoScale = interpolate(frame, [35, 65], [0.92, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stripe position: moves from far left to far right, tilted
  const stripeX = interpolate(sweep, [0, 1], [-300, 1300]);

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      {/* Logo (appears as stripe passes) */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        {/* Lime dot above */}
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: LIME,
            marginBottom: 20,
            boxShadow: `0 0 30px ${LIME}`,
          }}
        />
        <div
          style={{
            fontFamily: serif,
            fontSize: 100,
            fontWeight: 600,
            fontStyle: "italic",
            color: WHITE,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 13,
            letterSpacing: "0.22em",
            color: MUTED,
            marginTop: 20,
            textTransform: "uppercase",
          }}
        >
          Booking · Dispatch · Invoicing
        </div>
      </AbsoluteFill>

      {/* Diagonal sweep stripe */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: stripeX,
          width: 180,
          height: 1500,
          background: `linear-gradient(to right, transparent, ${LIME}CC, transparent)`,
          transform: "rotate(20deg)",
          transformOrigin: "center",
          opacity: interpolate(sweep, [0, 0.1, 0.85, 1], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
}

// ── 04: StaggerDrop ─────────────────────────────────────────────────────────────
// Letters drop from above with spring physics, staggered by 8 frames each.
export function Logo04StaggerDrop() {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const chars = ["n", "e", "a", "t", "r", ".", "a", "i"];
  const STAGGER = 8;

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(circle, #181818 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.5,
        }}
      />

      <div
        style={{
          fontFamily: serif,
          fontSize: 108,
          fontWeight: 600,
          fontStyle: "italic",
          letterSpacing: "-2px",
          lineHeight: 1,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {chars.map((c, i) => {
          const startFrame = i * STAGGER;
          const s = spring({
            frame: Math.max(frame - startFrame, 0),
            fps,
            config: { damping: 14, stiffness: 200, mass: 1 },
          });
          const y = interpolate(s, [0, 1], [-160, 0]);
          const op = interpolate(Math.max(frame - startFrame, 0), [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{
                color: i >= 5 ? LIME : WHITE,
                display: "inline-block",
                transform: `translateY(${y}px)`,
                opacity: op,
              }}
            >
              {c}
            </span>
          );
        })}
      </div>

      {/* Underline that draws in after last letter */}
      <div
        style={{
          width: interpolate(
            frame,
            [(chars.length - 1) * STAGGER + 25, (chars.length - 1) * STAGGER + 50],
            [0, 480],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          ),
          height: 3,
          background: `linear-gradient(to right, transparent, ${LIME}, transparent)`,
          marginTop: 14,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
}

// ── 05: SplitMerge ──────────────────────────────────────────────────────────────
// "neatr" slides in from the left; ".ai" slides in from the right; they lock together.
export function Logo05SplitMerge() {
  const frame = useCurrentFrame();
  const MEET = 50; // frame where they merge

  const leftX = interpolate(frame, [0, MEET], [-420, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightX = interpolate(frame, [0, MEET], [420, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotScale = ease(frame, MEET, 20);
  const tagOpacity = ease(frame, MEET + 15, 20);

  return (
    <AbsoluteFill
      style={{
        background: INK,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Merge flash */}
      {frame >= MEET - 2 && frame <= MEET + 8 && (
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: LIME,
            opacity: ease(frame, MEET, 8, 0.12, 0),
            filter: "blur(60px)",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          fontFamily: serif,
          fontSize: 108,
          fontWeight: 600,
          fontStyle: "italic",
          letterSpacing: "-2px",
        }}
      >
        <span
          style={{
            color: WHITE,
            display: "inline-block",
            transform: `translateX(${leftX}px)`,
          }}
        >
          neatr
        </span>
        <span
          style={{
            color: LIME,
            display: "inline-block",
            transform: `translateX(${rightX}px)`,
          }}
        >
          .ai
        </span>
      </div>

      {/* Center dot that pops on merge */}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: LIME,
          marginTop: 16,
          transform: `scale(${dotScale})`,
          opacity: dotScale,
          boxShadow: `0 0 ${20 * dotScale}px ${LIME}`,
        }}
      />

      <div
        style={{
          fontFamily: sans,
          fontSize: 14,
          letterSpacing: "0.2em",
          color: MUTED,
          marginTop: 16,
          textTransform: "uppercase",
          opacity: tagOpacity,
        }}
      >
        Bookings on autopilot
      </div>
    </AbsoluteFill>
  );
}

// ── 06: RingBurst ───────────────────────────────────────────────────────────────
// Lime concentric rings expand from center; logo crystallises in the center.
export function Logo06RingBurst() {
  const frame = useCurrentFrame();
  const RINGS = 4;

  const logoOpacity = ease(frame, 45, 30);
  const logoScale = interpolate(frame, [45, 75], [0.85, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Rings */}
      {Array.from({ length: RINGS }).map((_, i) => {
        const delay = i * 12;
        const progress = ease(frame, delay, 70);
        const size = interpolate(progress, [0, 1], [0, 1000]);
        const opacity = interpolate(progress, [0, 0.3, 1], [0.6, 0.3, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `2px solid ${LIME}`,
              opacity,
            }}
          />
        );
      })}

      {/* Center dot -> logo */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: LIME,
            marginBottom: 20,
            boxShadow: `0 0 40px ${LIME}`,
          }}
        />
        <div
          style={{
            fontFamily: serif,
            fontSize: 96,
            fontWeight: 600,
            fontStyle: "italic",
            color: WHITE,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// ── 07: GlowOrb ─────────────────────────────────────────────────────────────────
// A lime orb blooms from a single dot; the logo appears as the orb crests.
export function Logo07GlowOrb() {
  const frame = useCurrentFrame();
  const ORB_PEAK = 40;

  const dotScale = interpolate(frame, [0, ORB_PEAK], [0, 40], {
    easing: Easing.bezier(0.4, 0, 0.6, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbOpacity = interpolate(frame, [0, ORB_PEAK - 10, ORB_PEAK, ORB_PEAK + 20], [0, 0.08, 0.18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoOpacity = ease(frame, ORB_PEAK - 5, 30);
  const logoY = interpolate(frame, [ORB_PEAK - 5, ORB_PEAK + 25], [12, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: INK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Growing orb */}
      <div
        style={{
          position: "absolute",
          width: `${dotScale}px`,
          height: `${dotScale}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${LIME}40, transparent 70%)`,
          opacity: orbOpacity * 5,
          filter: "blur(30px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
        }}
      >
        <svg width="56" height="56" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 20 }}>
          <path
            d="M20 8 C21 18.5 21.6 19.2 32 24 C21.6 28.8 21 29.5 20 40 C19 29.5 18.4 28.8 8 24 C18.4 19.2 19 18.5 20 8 Z"
            fill={GREEN}
          />
          <path
            d="M36 10 C36.5 14.6 36.7 14.9 41 16.5 C36.7 18.1 36.5 18.4 36 23 C35.5 18.4 35.3 18.1 31 16.5 C35.3 14.9 35.5 14.6 36 10 Z"
            fill={LIME}
            opacity={0.9}
          />
        </svg>

        <div
          style={{
            fontFamily: serif,
            fontSize: 96,
            fontWeight: 600,
            fontStyle: "italic",
            color: WHITE,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── 08: CountUp ─────────────────────────────────────────────────────────────────
// Stats count up (bookings handled, hours saved) then the logo assembles.
export function Logo08CountUp() {
  const frame = useCurrentFrame();
  const REVEAL = 80;

  const stat1 = Math.floor(ease(frame, 5, 55) * 2847);
  const stat2 = Math.floor(ease(frame, 20, 55) * 194);
  const stat3 = Math.floor(ease(frame, 35, 55) * 99.4 * 10) / 10;

  const logoOpacity = ease(frame, REVEAL, 30);
  const logoY = interpolate(frame, [REVEAL, REVEAL + 30], [20, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statsOpacity = interpolate(frame, [REVEAL - 10, REVEAL + 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.3,
        }}
      />

      {/* Stats counter */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          gap: 64,
          opacity: statsOpacity,
        }}
      >
        {[
          { val: stat1.toLocaleString(), label: "Bookings handled" },
          { val: stat2 + "h", label: "Hours saved/month" },
          { val: stat3 + "%", label: "On-time rate" },
        ].map(({ val, label }, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: sans,
                fontSize: 52,
                fontWeight: 700,
                color: i === 0 ? WHITE : i === 1 ? GREEN : LIME,
                letterSpacing: "-1px",
                lineHeight: 1,
              }}
            >
              {val}
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 12,
                color: MUTED,
                marginTop: 8,
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Logo reveal */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: serif,
            fontSize: 100,
            fontWeight: 600,
            fontStyle: "italic",
            color: WHITE,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 14,
            letterSpacing: "0.16em",
            color: MUTED,
            marginTop: 18,
            textTransform: "uppercase",
          }}
        >
          These numbers run automatically.
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── 09: LineReveal ──────────────────────────────────────────────────────────────
// A bright horizontal line wipes from center outward; logo is revealed in halves.
export function Logo09LineReveal() {
  const frame = useCurrentFrame();

  const lineWidth = interpolate(frame, [0, 40], [0, 1000], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineOpacity = interpolate(frame, [0, 10, 45, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const topReveal = ease(frame, 15, 35);
  const botReveal = ease(frame, 25, 35);

  return (
    <AbsoluteFill
      style={{
        background: INK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Top half (logo clipped above line) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "50%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: serif,
            fontSize: 100,
            fontWeight: 600,
            fontStyle: "italic",
            color: WHITE,
            letterSpacing: "-2px",
            lineHeight: 0.52,
            transform: `translateY(${interpolate(topReveal, [0, 1], [60, 0])}px)`,
            opacity: topReveal,
          }}
        >
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
      </div>

      {/* Bottom half */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: serif,
            fontSize: 100,
            fontWeight: 600,
            fontStyle: "italic",
            color: WHITE,
            letterSpacing: "-2px",
            lineHeight: 0.52,
            transform: `translateY(${interpolate(botReveal, [0, 1], [-60, 0])}px)`,
            opacity: botReveal,
          }}
        >
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
      </div>

      {/* Reveal line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%)",
          width: lineWidth,
          height: 2,
          background: `linear-gradient(to right, transparent, ${LIME}, transparent)`,
          opacity: lineOpacity,
          boxShadow: `0 0 16px ${LIME}`,
        }}
      />

      {/* Tagline after reveal */}
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          fontFamily: sans,
          fontSize: 14,
          letterSpacing: "0.2em",
          color: MUTED,
          textTransform: "uppercase",
          opacity: ease(frame, 70, 20),
        }}
      >
        Bookings · Dispatch · Invoicing
      </div>
    </AbsoluteFill>
  );
}

// ── 10: SpringBounce ────────────────────────────────────────────────────────────
// The logo scales in from 0 with spring physics — elastic overshoot, then settles.
// The mark icon bounces in first; wordmark second; tagline third.
export function Logo10SpringBounce() {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const markS = spring({ frame, fps, config: { damping: 12, stiffness: 180, mass: 0.9 } });
  const wordS = spring({
    frame: Math.max(frame - 15, 0),
    fps,
    config: { damping: 14, stiffness: 200, mass: 1 },
  });
  const tagS = spring({
    frame: Math.max(frame - 30, 0),
    fps,
    config: { damping: 18, stiffness: 220, mass: 1 },
  });

  const glowOpacity = ease(frame, 0, 30, 0, 0.06);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.4,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: LIME,
          opacity: glowOpacity,
          filter: "blur(100px)",
        }}
      />

      {/* Mark icon */}
      <div style={{ transform: `scale(${markS})`, opacity: markS }}>
        <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
          <rect x="4" y="4" width="40" height="40" rx="11" fill={GREEN} />
          <path
            d="M17 34 V19 M17 23 C19 19 24 18.5 27 21 C29 22.7 29.5 25 29.5 28 V34"
            stroke="#fff"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="33.5" cy="16" r="3" fill="#fff" />
        </svg>
      </div>

      {/* Wordmark */}
      <div
        style={{
          fontFamily: serif,
          fontSize: 96,
          fontWeight: 600,
          fontStyle: "italic",
          color: WHITE,
          letterSpacing: "-2px",
          lineHeight: 1,
          transform: `scale(${wordS})`,
          opacity: wordS,
        }}
      >
        neatr<span style={{ color: LIME }}>.ai</span>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: sans,
          fontSize: 14,
          letterSpacing: "0.2em",
          color: MUTED,
          textTransform: "uppercase",
          transform: `translateY(${interpolate(tagS, [0, 1], [20, 0])}px)`,
          opacity: tagS,
        }}
      >
        Field service, automated.
      </div>
    </AbsoluteFill>
  );
}
