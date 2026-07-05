"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import SceneBoundary from "@/components/three/SceneBoundary";
import { EASE_OUT_EXPO } from "@/lib/easings";
import { C, SERIF } from "../tokens";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function Hero() {
  const reduce = useReducedMotion();
  // WebGL contexts don't survive bfcache restore reliably — force a clean
  // remount (fresh canvas + context) whenever the page is thawed from it.
  const [sceneKey, setSceneKey] = useState(0);

  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) setSceneKey((k) => k + 1);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <section id="top" style={{ position: "relative", minHeight: "88svh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", background: C.bg }}>
      <SceneBoundary key={sceneKey}>
        <HeroScene className="absolute inset-0 z-0" />
      </SceneBoundary>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.55) 55%, transparent 88%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "116px 24px 56px", width: "100%", textAlign: "center" }}>
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: C.ink3, marginBottom: 24, fontWeight: 600 }}
        >
          Booking, on autopilot
        </motion.p>

        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "clamp(44px, 8vw, 108px)",
            lineHeight: 0.98,
            letterSpacing: "-0.01em",
            color: C.fg,
            margin: "0 auto",
            maxWidth: 900,
          }}
        >
          <SplitText as="span" text="Run your calendar" delay={0.15} />
          <br />
          <SplitText as="span" text="without running it." delay={0.5} />
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: EASE_OUT_EXPO }}
          style={{ fontSize: 18, color: C.ink2, maxWidth: 520, margin: "28px auto 40px", lineHeight: 1.6 }}
        >
          One link books the job, dispatches the crew, and follows up with the customer. No back‑and‑forth. No spreadsheets.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT_EXPO }}
          style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}
        >
          <MagneticButton as="a" href="/booking" className="inline-flex">
            <span style={{ background: C.fg, color: "#fff", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, display: "inline-block" }}>
              See it in action →
            </span>
          </MagneticButton>
          <a href="#showcase" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", fontSize: 15, fontWeight: 600, color: C.fg, textDecoration: "none", border: `1px solid ${C.line}`, borderRadius: 999 }}>
            How it works
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingBottom: 36 }}
      >
        <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.ink3, fontWeight: 600 }}>Scroll</span>
        <span style={{ width: 1, height: 28, background: C.line, position: "relative", overflow: "hidden" }}>
          {!reduce && (
            <motion.span
              style={{ position: "absolute", top: 0, left: 0, width: 1, height: "50%", background: C.fg }}
              animate={{ y: [-14, 28] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </motion.div>
    </section>
  );
}
