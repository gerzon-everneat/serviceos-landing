"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/easings";
import { C, SANS, SERIF } from "../tokens";

/* Demo reel — real screen recordings of the live product (no mockups):
   sign-up → operations setup → a customer booking. Auto-advances when a
   clip ends; the tab underline tracks actual playback progress. */

const CLIPS = [
  {
    key: "signup",
    label: "Sign up",
    time: "0:22",
    src: "https://cdn.neatr.ai/assets/videos/01-tenant-signup.mp4",
    copy: "Email, one code — and a new business lands in its own live dashboard. Under thirty seconds, recorded in real time.",
  },
  {
    key: "setup",
    label: "Set up operations",
    time: "1:45",
    src: "https://cdn.neatr.ai/assets/videos/02-operations-setup.mp4",
    copy: "Categories, spaces, services, pricing tiers, and branding — the whole catalog configured live, saving as you type.",
  },
  {
    key: "booking",
    label: "Customer books",
    time: "1:07",
    src: "https://cdn.neatr.ai/assets/videos/03-customer-booking.mp4",
    copy: "A guest checks their ZIP, picks a service and an arrival window, pays, and walks away with a confirmed booking. No account needed.",
  },
] as const;

export default function DemoReel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const clip = CLIPS[active];

  function jump(i: number) {
    setActive(i);
    setProgress(0);
  }

  useEffect(() => {
    // Autoplay after the src swap; browsers allow it because it's muted.
    if (!reduce) videoRef.current?.play().catch(() => {});
  }, [active, reduce]);

  return (
    <div id="demo" style={{ background: C.dark, padding: "96px 0" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        <p style={{ fontFamily: SANS, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 600, textAlign: "center", marginBottom: 16 }}>
          Not a mockup
        </p>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(32px, 5vw, 56px)", color: "#FFFFFF", textAlign: "center", margin: "0 auto 64px", lineHeight: 1.08, maxWidth: 760 }}>
          From sign-up to a paid booking,
          <br />
          recorded on the live product.
        </h2>

        {/* Video — browser chrome frame */}
        <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: C.darkSurface, boxShadow: "0 40px 100px -30px rgba(0,0,0,0.6)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.1)", background: C.darkSurface, padding: "11px 16px" }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "rgba(255,255,255,0.18)" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "rgba(255,255,255,0.18)" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "rgba(255,255,255,0.18)" }} />
            <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.45)", marginLeft: 8 }}>
              book.neatr.ai — {clip.label}
            </span>
            <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>{clip.time}</span>
          </div>
          <div style={{ position: "relative", aspectRatio: "16/9", background: "#FAFAFA" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.video
                key={clip.key}
                ref={videoRef}
                src={clip.src}
                muted
                playsInline
                autoPlay={!reduce}
                controls={!!reduce}
                preload="metadata"
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.duration) setProgress(v.currentTime / v.duration);
                }}
                onEnded={() => jump((active + 1) % CLIPS.length)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Clip tabs — same rail pattern as the setup showcase */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6 md:flex-nowrap md:gap-x-4">
          {CLIPS.map((c, i) => (
            <button
              key={c.key}
              onClick={() => jump(i)}
              className="flex-1"
              style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", minWidth: 160 }}
            >
              <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: SANS, fontSize: 12, color: i === active ? C.lime : "rgba(255,255,255,0.35)", minWidth: 16 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: 17, color: i === active ? "#FFFFFF" : "rgba(255,255,255,0.4)", transition: "color 0.3s ease" }}>
                  {c.label}
                </span>
              </span>
              <span style={{ display: "block", height: 2, background: "rgba(255,255,255,0.14)", marginTop: 12, borderRadius: 999, overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    background: i === active ? C.lime : "transparent",
                    width: i === active ? `${progress * 100}%` : 0,
                    transition: "width 0.3s linear",
                  }}
                />
              </span>
            </button>
          ))}
        </div>

        {/* Active clip copy */}
        <AnimatePresence mode="wait">
          <motion.p
            key={clip.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: SANS, fontSize: 15.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "22px auto 0", maxWidth: 560, textAlign: "center" }}
          >
            {clip.copy}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
