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
import {
  Logo11Scramble,
  Logo12NeonFlicker,
  Logo13CinematicReveal,
  Logo14SliceReveal,
  Logo15GlitchIn,
  Logo16MorphBloom,
  Logo17WaveUp,
  Logo18Rotate3D,
  Logo19BlurZoom,
  Logo20Terminal,
} from "./LogoCompositions2";

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
      {/* ── Logo animations: batch 2 ── */}
      <Composition id="Logo11_Scramble" component={Logo11Scramble} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo12_NeonFlicker" component={Logo12NeonFlicker} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo13_CinematicReveal" component={Logo13CinematicReveal} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo14_SliceReveal" component={Logo14SliceReveal} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo15_GlitchIn" component={Logo15GlitchIn} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo16_MorphBloom" component={Logo16MorphBloom} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo17_WaveUp" component={Logo17WaveUp} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo18_Rotate3D" component={Logo18Rotate3D} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo19_BlurZoom" component={Logo19BlurZoom} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
      <Composition id="Logo20_Terminal" component={Logo20Terminal} durationInFrames={LOGO_FRAMES} fps={LOGO_FPS} width={LOGO_W} height={LOGO_H} />
    </>
  );
};
