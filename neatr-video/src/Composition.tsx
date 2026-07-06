import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";

// ─── Fonts ─────────────────────────────────────────────────────────────────────
const { fontFamily: sans } = loadDMSans("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});
const { fontFamily: serif } = loadCormorant("italic", {
  weights: ["600"],
  subsets: ["latin"],
});

// ─── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#060606",
  surface: "#111111",
  border: "#222222",
  muted: "#555555",
  text: "#FFFFFF",
  lime: "#C8FF00",
  limeText: "#3A5000",
};

// ─── Pipeline steps ────────────────────────────────────────────────────────────
const STEPS = [
  { icon: "📥", label: "RECEIVED",  desc: "Sarah M. · Deep clean · $185",          color: "#22C55E" },
  { icon: "🗓️", label: "SCHEDULED", desc: "Thu Jun 12 · 10:00 AM · Slot reserved", color: "#3B82F6" },
  { icon: "🤖", label: "DISPATCH",  desc: "AI matching crew by location + rating",  color: "#F59E0B" },
  { icon: "👤", label: "ASSIGNED",  desc: "Maria L. · 0.8 mi · 4.9 ★",            color: "#8B5CF6" },
  { icon: "✉️", label: "NOTIFIED",  desc: "Confirmation sent to customer",          color: "#EC4899" },
  { icon: "💳", label: "INVOICED",  desc: "Job complete · Invoice sent automatically", color: C.lime },
];

// Timing: each step gets 70 frames to fully arrive, 40-frame hold minimum
const STEP_DURATION = 70; // frames between each step appearing
const INTRO_DURATION = 50; // logo + headline appear first

// ─── Ease helper ───────────────────────────────────────────────────────────────
function easeIn(frame: number, start: number, dur: number): number {
  return interpolate(frame, [start, start + dur], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ─── Single pipeline row ────────────────────────────────────────────────────────
function PipelineRow({
  step,
  index,
  totalVisible,
}: {
  step: (typeof STEPS)[number];
  index: number;
  totalVisible: number;
}) {
  const frame = useCurrentFrame();
  const isLast = index === totalVisible - 1;
  const isPast = index < totalVisible - 1;

  // Row slides in from right
  const x = interpolate(frame, [0, 40], [60, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dot pulse on the active step
  const dotScale = isLast
    ? interpolate(
        (frame % 40),
        [0, 20, 40],
        [1, 1.4, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;

  const dotOpacity = isPast ? 0.35 : 1;
  const rowOpacity = isPast ? 0.45 : opacity;
  const dotBg = isPast ? "#2A2A2A" : isLast ? step.color : step.color;
  const borderColor = isLast ? step.color : "transparent";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "18px 24px",
        borderRadius: 16,
        background: isLast ? "rgba(255,255,255,0.04)" : "transparent",
        border: `1.5px solid ${borderColor}`,
        opacity: rowOpacity,
        transform: `translateX(${x}px)`,
        marginBottom: 10,
      }}
    >
      {/* Icon dot */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: dotBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
          opacity: dotOpacity,
          transform: `scale(${dotScale})`,
        }}
      >
        {isPast ? "✓" : step.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: sans,
            fontSize: 13,
            fontWeight: 700,
            color: isLast ? step.color : C.muted,
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          {step.label}
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 16,
            color: isLast ? C.text : C.muted,
            fontWeight: 400,
          }}
        >
          {step.desc}
        </div>
      </div>

      {/* Active indicator */}
      {isLast && (
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: step.color,
            opacity: interpolate(frame % 40, [0, 20, 40], [1, 0.3, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      )}
    </div>
  );
}

// ─── Intro logo + headline ──────────────────────────────────────────────────────
function Intro() {
  const frame = useCurrentFrame();

  const logoOpacity = easeIn(frame, 0, 25);
  const logoY = interpolate(frame, [0, 25], [20, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagOpacity = easeIn(frame, 15, 25);
  const tagY = interpolate(frame, [15, 40], [16, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ marginBottom: 56 }}>
      <div
        style={{
          fontFamily: serif,
          fontSize: 52,
          color: C.text,
          fontWeight: 600,
          fontStyle: "italic",
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
          letterSpacing: "-0.5px",
          marginBottom: 12,
        }}
      >
        neatr.ai
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 14,
          color: C.muted,
          fontWeight: 500,
          letterSpacing: "0.12em",
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
        }}
      >
        WHAT HAPPENS WHEN A CUSTOMER BOOKS
      </div>
    </div>
  );
}

// ─── End card ──────────────────────────────────────────────────────────────────
function EndCard() {
  const frame = useCurrentFrame();
  const op = easeIn(frame, 0, 30);
  const y = interpolate(frame, [0, 30], [24, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: op,
      }}
    >
      <div style={{ transform: `translateY(${y}px)`, textAlign: "center" }}>
        <div
          style={{
            fontFamily: serif,
            fontSize: 88,
            color: C.text,
            fontWeight: 600,
            fontStyle: "italic",
            letterSpacing: "-1px",
            marginBottom: 20,
          }}
        >
          neatr.ai
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 20,
            color: C.muted,
            fontWeight: 400,
            marginBottom: 40,
          }}
        >
          Bookings. Dispatch. Invoicing. On autopilot.
        </div>
        <div
          style={{
            display: "inline-block",
            background: C.lime,
            color: C.limeText,
            fontFamily: sans,
            fontWeight: 700,
            fontSize: 18,
            padding: "14px 36px",
            borderRadius: 12,
          }}
        >
          Get Early Access
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Main Composition ──────────────────────────────────────────────────────────
export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // Total duration: intro + 6 steps + end card hold
  // Each step appears at: INTRO_DURATION + stepIndex * STEP_DURATION
  const pipelineStart = INTRO_DURATION;
  const endCardStart = pipelineStart + STEPS.length * STEP_DURATION + 30;

  // How many steps are currently visible
  const stepsVisible = STEPS.filter(
    (_, i) => frame >= pipelineStart + i * STEP_DURATION
  ).length;

  // Fade out pipeline as end card arrives
  const pipelineFadeOut = interpolate(
    frame,
    [endCardStart - 20, endCardStart],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Subtle grid texture */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />

      {/* Lime glow — top left */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: C.lime,
          opacity: 0.04,
          filter: "blur(120px)",
        }}
      />

      {/* Pipeline panel */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: pipelineFadeOut,
        }}
      >
        <div style={{ width: 760 }}>
          {/* Intro: logo + label */}
          <Sequence durationInFrames={endCardStart} layout="none">
            <Intro />
          </Sequence>

          {/* Pipeline rows — each appears after its start frame */}
          {STEPS.map((step, i) => {
            const stepStart = pipelineStart + i * STEP_DURATION;
            if (frame < stepStart) return null;
            return (
              <Sequence key={i} from={stepStart} layout="none">
                <PipelineRow
                  step={step}
                  index={i}
                  totalVisible={stepsVisible}
                />
              </Sequence>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* End card */}
      {frame >= endCardStart && (
        <Sequence from={endCardStart}>
          <EndCard />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
