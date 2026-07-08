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
const BG = "#060606";
const INK = "#0A0A0A";
const WHITE = "#FFFFFF";
const MUTED = "#444444";

function ease(frame: number, start: number, dur: number, from = 0, to = 1): number {
  return interpolate(frame, [start, start + dur], [from, to], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ── 11: Scramble ─────────────────────────────────────────────────────────────
// Characters cycle through random glyphs, snap into place left → right.
const GLYPHS = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz01234567";

export function Logo11Scramble() {
  const frame = useCurrentFrame();
  const chars = ["n", "e", "a", "t", "r", ".", "a", "i"];

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.35 }} />
      <div style={{ fontFamily: serif, fontSize: 108, fontWeight: 600, fontStyle: "italic", letterSpacing: "-2px", lineHeight: 1, display: "flex", alignItems: "baseline" }}>
        {chars.map((c, i) => {
          const settleAt = 12 + i * 9;
          const settled = frame >= settleAt;
          const glyph = GLYPHS[Math.floor(Math.abs(Math.sin(frame * 11.3 + i * 97.7) * 1000)) % GLYPHS.length];
          const isLime = i >= 5;
          const flicker = 0.5 + 0.5 * Math.abs(Math.sin(frame * 8.9 + i * 3.7));
          return (
            <span key={i} style={{
              color: isLime ? LIME : WHITE,
              display: "inline-block",
              opacity: frame < 5 ? 0 : settled ? ease(frame, settleAt, 6, 0.7, 1) : flicker,
              textShadow: !settled && frame >= 5 ? `0 0 8px ${isLime ? LIME : WHITE}55` : "none",
            }}>
              {frame < 5 ? c : settled ? c : glyph}
            </span>
          );
        })}
      </div>
      <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 28, textTransform: "uppercase" as const, opacity: ease(frame, 90, 20) }}>
        Field service, automated.
      </div>
    </AbsoluteFill>
  );
}

// ── 12: NeonFlicker ──────────────────────────────────────────────────────────
// Neon sign warming up: dim → erratic flicker → full glowing stability.
export function Logo12NeonFlicker() {
  const frame = useCurrentFrame();
  let opacity: number;
  let glowPx: number;

  if (frame < 25) {
    opacity = ease(frame, 0, 25, 0.08, 0.45);
    glowPx = 0;
  } else if (frame < 82) {
    const f1 = Math.abs(Math.sin(frame * 37.3));
    const f2 = Math.abs(Math.sin(frame * 13.7 + 0.5));
    opacity = f1 * f2 > 0.25 ? 0.85 + f1 * 0.15 : f1 * f2 * 3.5;
    glowPx = opacity * 28;
  } else {
    opacity = ease(frame, 82, 20, 0.8, 1);
    glowPx = ease(frame, 82, 20, 12, 36);
  }

  const textShadow = glowPx > 0
    ? `0 0 ${glowPx}px ${LIME}, 0 0 ${glowPx * 2}px ${LIME}88, 0 0 ${glowPx * 4}px ${LIME}33`
    : "none";

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(circle, #0F0F0F 1px, transparent 1px)", backgroundSize: "44px 44px", opacity: 0.5 }} />
      <div style={{ fontFamily: serif, fontSize: 108, fontWeight: 600, fontStyle: "italic", letterSpacing: "-2px", lineHeight: 1, color: LIME, opacity, textShadow }}>
        neatr<span style={{ color: `${LIME}CC` }}>.ai</span>
      </div>
      <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 28, textTransform: "uppercase" as const, opacity: ease(frame, 90, 20) }}>
        Field service, automated.
      </div>
    </AbsoluteFill>
  );
}

// ── 13: CinematicReveal ───────────────────────────────────────────────────────
// Letterbox black bars retract; logo crystallises in the revealed frame.
export function Logo13CinematicReveal() {
  const frame = useCurrentFrame();
  const barH = interpolate(ease(frame, 8, 58), [0, 1], [290, 0]);
  const logoOpacity = ease(frame, 42, 32);
  const logoScale = interpolate(frame, [42, 74], [0.96, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)", opacity: 0.5 }} />
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: logoOpacity, transform: `scale(${logoScale})` }}>
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: LIME, marginBottom: 20, boxShadow: `0 0 28px ${LIME}` }} />
        <div style={{ fontFamily: serif, fontSize: 100, fontWeight: 600, fontStyle: "italic", color: WHITE, letterSpacing: "-2px", lineHeight: 1 }}>
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
        <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.22em", color: MUTED, marginTop: 20, textTransform: "uppercase" as const, opacity: ease(frame, 78, 20) }}>
          Booking · Dispatch · Invoicing
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: barH, background: "#000", zIndex: 10 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: barH, background: "#000", zIndex: 10 }} />
    </AbsoluteFill>
  );
}

// ── 14: SliceReveal ───────────────────────────────────────────────────────────
// Lime strips slide in from alternating sides, then fade to reveal the logo.
export function Logo14SliceReveal() {
  const frame = useCurrentFrame();
  const N = 7;
  const SH = 1080 / N;
  const fadeToLogo = ease(frame, 55, 28);
  const logoOpacity = ease(frame, 62, 26);

  return (
    <AbsoluteFill style={{ background: BG }}>
      {Array.from({ length: N }).map((_, i) => {
        const fromLeft = i % 2 === 0;
        const progress = ease(frame, i * 8, 38);
        const tx = interpolate(progress, [0, 1], [fromLeft ? -1100 : 1100, 0]);
        return (
          <div key={i} style={{
            position: "absolute", top: i * SH, left: 0, right: 0, height: SH,
            background: i % 2 === 0 ? LIME : `${LIME}BB`,
            transform: `translateX(${tx}px)`,
            opacity: 1 - fadeToLogo,
          }} />
        );
      })}
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: logoOpacity }}>
        <div style={{ fontFamily: serif, fontSize: 108, fontWeight: 600, fontStyle: "italic", letterSpacing: "-2px", lineHeight: 1, color: WHITE }}>
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
        <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 28, textTransform: "uppercase" as const }}>
          Field service, automated.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// ── 15: GlitchIn ─────────────────────────────────────────────────────────────
// RGB channel split that decays into a stable, clean wordmark.
export function Logo15GlitchIn() {
  const frame = useCurrentFrame();
  const glitchAmp = ease(frame, 0, 72, 1, 0);
  const logoOpacity = ease(frame, 5, 20);
  const g1x = Math.sin(frame * 23.7) * 30 * glitchAmp;
  const g1y = Math.sin(frame * 11.3 + 1.7) * 9 * glitchAmp;
  const g2x = Math.sin(frame * 19.1 + 3.1) * -24 * glitchAmp;
  const g2y = Math.sin(frame * 8.9 + 2.3) * -7 * glitchAmp;

  const wordStyle: React.CSSProperties = {
    fontFamily: serif,
    fontSize: 108,
    fontWeight: 600,
    fontStyle: "italic",
    letterSpacing: "-2px",
    lineHeight: 1,
  };

  return (
    <AbsoluteFill style={{ background: BG, opacity: logoOpacity }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(circle, #181818 1px, transparent 1px)", backgroundSize: "44px 44px", opacity: 0.4 }} />
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: `translate(${g1x}px, ${g1y}px)`, mixBlendMode: "screen" }}>
        <div style={{ ...wordStyle, color: "#FF4444" }}>neatr<span style={{ color: LIME }}>.ai</span></div>
      </AbsoluteFill>
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: `translate(${g2x}px, ${g2y}px)`, mixBlendMode: "screen" }}>
        <div style={{ ...wordStyle, color: "#4455FF" }}>neatr<span style={{ color: LIME }}>.ai</span></div>
      </AbsoluteFill>
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", mixBlendMode: "screen" }}>
        <div style={{ ...wordStyle, color: WHITE }}>neatr<span style={{ color: LIME }}>.ai</span></div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// ── 16: MorphBloom ────────────────────────────────────────────────────────────
// Lime circle blooms to fill the frame, then contracts; logo emerges from within.
export function Logo16MorphBloom() {
  const frame = useCurrentFrame();
  const orbSize = frame <= 40
    ? interpolate(frame, [0, 40], [0, 2400], { easing: Easing.bezier(0.4, 0, 1, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [40, 70], [2400, 0], { easing: Easing.bezier(0, 0, 0.6, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoOpacity = ease(frame, 60, 28);
  const logoY = interpolate(frame, [60, 88], [16, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: orbSize, height: orbSize, borderRadius: "50%", background: LIME }} />
      <div style={{ position: "absolute", opacity: logoOpacity, transform: `translateY(${logoY}px)`, textAlign: "center" }}>
        <div style={{ fontFamily: serif, fontSize: 100, fontWeight: 600, fontStyle: "italic", color: WHITE, letterSpacing: "-2px", lineHeight: 1 }}>
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
        <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 20, textTransform: "uppercase" as const }}>
          Field service, automated.
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── 17: WaveUp ────────────────────────────────────────────────────────────────
// Characters float in with a sinusoidal wave that gradually settles.
export function Logo17WaveUp() {
  const frame = useCurrentFrame();
  const chars = ["n", "e", "a", "t", "r", ".", "a", "i"];

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)", backgroundSize: "44px 44px", opacity: 0.35 }} />
      <div style={{ fontFamily: serif, fontSize: 108, fontWeight: 600, fontStyle: "italic", letterSpacing: "-2px", lineHeight: 1, display: "flex", alignItems: "baseline" }}>
        {chars.map((c, i) => {
          const opacity = ease(frame, i * 5, 18);
          const settleProgress = ease(frame, 28 + i * 4, 42);
          const waveY = Math.sin(frame * 0.18 + i * 0.75) * 22 * (1 - settleProgress);
          return (
            <span key={i} style={{ color: i >= 5 ? LIME : WHITE, display: "inline-block", opacity, transform: `translateY(${waveY}px)` }}>
              {c}
            </span>
          );
        })}
      </div>
      <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 28, textTransform: "uppercase" as const, opacity: ease(frame, 95, 20) }}>
        Field service, automated.
      </div>
    </AbsoluteFill>
  );
}

// ── 18: Rotate3D ─────────────────────────────────────────────────────────────
// Each character flips in on the Y axis with spring physics, staggered.
export function Logo18Rotate3D() {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const chars = ["n", "e", "a", "t", "r", ".", "a", "i"];

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(circle, #181818 1px, transparent 1px)", backgroundSize: "44px 44px", opacity: 0.4 }} />
      <div style={{ fontFamily: serif, fontSize: 108, fontWeight: 600, fontStyle: "italic", letterSpacing: "-2px", lineHeight: 1, display: "flex", alignItems: "baseline" }}>
        {chars.map((c, i) => {
          const s = spring({ frame: Math.max(frame - i * 8, 0), fps, config: { damping: 18, stiffness: 160, mass: 1 } });
          const rotY = interpolate(s, [0, 1], [90, 0]);
          return (
            <span key={i} style={{ color: i >= 5 ? LIME : WHITE, display: "inline-block", transform: `perspective(800px) rotateY(${rotY}deg)`, opacity: s }}>
              {c}
            </span>
          );
        })}
      </div>
      <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 28, textTransform: "uppercase" as const, opacity: ease(frame, 88, 20) }}>
        Field service, automated.
      </div>
    </AbsoluteFill>
  );
}

// ── 19: BlurZoom ─────────────────────────────────────────────────────────────
// Logo starts 3× oversized and blurred, zooms into crisp focus.
export function Logo19BlurZoom() {
  const frame = useCurrentFrame();
  const scale = ease(frame, 0, 65, 3.5, 1);
  const blurAmt = ease(frame, 0, 65, 24, 0);
  const opacity = ease(frame, 0, 30);
  const tagOpacity = ease(frame, 72, 20);

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.35 }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${scale})`, filter: `blur(${blurAmt}px)`, opacity }}>
        <div style={{ fontFamily: serif, fontSize: 100, fontWeight: 600, fontStyle: "italic", color: WHITE, letterSpacing: "-2px", lineHeight: 1 }}>
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
      </div>
      <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 28, textTransform: "uppercase" as const, opacity: tagOpacity }}>
        Field service, automated.
      </div>
    </AbsoluteFill>
  );
}

// ── 20: Terminal ─────────────────────────────────────────────────────────────
// CLI init sequence types out, progress bar completes, logo is revealed.
export function Logo20Terminal() {
  const frame = useCurrentFrame();
  const CMD = "$ neatr --init";
  const cmdChars = CMD.split("");
  const charsShown = Math.min(Math.floor(ease(frame, 5, 35) * cmdChars.length), cmdChars.length);
  const barPct = ease(frame, 44, 24);
  const barDots = ["Connecting...", "Dispatching crew...", "All systems online."];
  const dotIdx = Math.min(Math.floor(barPct * 3), 2);
  const termOpacity = interpolate(frame, [68, 80], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoOpacity = ease(frame, 76, 28);
  const logoY = interpolate(frame, [76, 104], [18, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cursorOn = Math.floor(frame / 10) % 2 === 0;

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3 }} />

      {/* Terminal window */}
      <div style={{ position: "absolute", opacity: termOpacity, width: 560, background: "#111111", border: "1px solid #222", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "#1A1A1A", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
          <span style={{ fontFamily: "monospace", fontSize: 11, color: MUTED, marginLeft: 8, letterSpacing: "0.05em" }}>neatr-terminal</span>
        </div>
        <div style={{ padding: "20px 20px 28px" }}>
          <div style={{ fontFamily: "monospace", fontSize: 18, color: LIME, lineHeight: 1.5 }}>
            {cmdChars.slice(0, charsShown).join("")}
            {charsShown < cmdChars.length && <span style={{ opacity: cursorOn ? 1 : 0 }}>█</span>}
          </div>
          {frame >= 44 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontFamily: "monospace", fontSize: 13, color: "#666", marginBottom: 10 }}>{barDots[dotIdx]}</div>
              <div style={{ height: 3, background: "#222", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${barPct * 100}%`, background: LIME, borderRadius: 2 }} />
              </div>
            </div>
          )}
          {barPct >= 1 && (
            <div style={{ fontFamily: "monospace", fontSize: 13, color: LIME, marginTop: 10, opacity: ease(frame, 68, 8) }}>
              ✓ Ready. Launching neatr.ai...
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div style={{ position: "absolute", opacity: logoOpacity, transform: `translateY(${logoY}px)`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontFamily: serif, fontSize: 100, fontWeight: 600, fontStyle: "italic", color: WHITE, letterSpacing: "-2px", lineHeight: 1 }}>
          neatr<span style={{ color: LIME }}>.ai</span>
        </div>
        <div style={{ fontFamily: sans, fontSize: 14, letterSpacing: "0.2em", color: MUTED, marginTop: 20, textTransform: "uppercase" as const }}>
          Field service, automated.
        </div>
      </div>
    </AbsoluteFill>
  );
}
