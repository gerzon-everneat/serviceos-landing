import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import {
  Logo01TypeWriter,
  Logo02DrawSpark,
  Logo03AngledReveal,
  Logo04StaggerDrop,
  Logo05SplitMerge,
  Logo06RingBurst,
  Logo07GlowOrb,
  Logo08CountUp,
  Logo09LineReveal,
  Logo10SpringBounce,
} from "./LogoCompositions";

// Pipeline video: 50 intro + 6 steps × 70 + 30 hold + 90 end card ≈ 20s
const PIPELINE_DURATION = 590;

// Logo animations: 4s at 30fps (square 1080×1080)
const LOGO_FPS = 30;
const LOGO_W = 1080;
const LOGO_H = 1080;
const LOGO_FRAMES = 120; // 4s

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Original pipeline video ── */}
      <Composition
        id="NeatrPipeline"
        component={MyComposition}
        durationInFrames={PIPELINE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ── Logo animations ── */}
      <Composition
        id="Logo01_TypeWriter"
        component={Logo01TypeWriter}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo02_DrawSpark"
        component={Logo02DrawSpark}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo03_AngledReveal"
        component={Logo03AngledReveal}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo04_StaggerDrop"
        component={Logo04StaggerDrop}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo05_SplitMerge"
        component={Logo05SplitMerge}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo06_RingBurst"
        component={Logo06RingBurst}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo07_GlowOrb"
        component={Logo07GlowOrb}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo08_CountUp"
        component={Logo08CountUp}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo09_LineReveal"
        component={Logo09LineReveal}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
      <Composition
        id="Logo10_SpringBounce"
        component={Logo10SpringBounce}
        durationInFrames={LOGO_FRAMES}
        fps={LOGO_FPS}
        width={LOGO_W}
        height={LOGO_H}
      />
    </>
  );
};
