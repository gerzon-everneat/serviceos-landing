"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/easings";
import { C, SANS, SERIF } from "../tokens";

/* Setup showcase — the real admin screens, auto-cycling on their own timer
   (not scroll-driven). Click a step to jump; swapping a .png for a .mp4 here
   later is a one-line change per step. */

const DUR = 4200; // ms per step before auto-advance

const STEPS = [
  { key: "categories", label: "Categories", copy: "Start broad. Map every category you serve to the types, services, and spaces underneath it.", src: "/setup/categories.png", alt: "Category setup screen mapping Residential, Airbnb, and Commercial to their Types, Services, and Spaces" },
  { key: "types", label: "Types", copy: "Break each category into what's actually being booked — a house, a room, an office.", src: "/setup/types.png", alt: "Type setup screen mapping House, Room, Apartment, and Office to Categories" },
  { key: "services", label: "Services", copy: "Attach the work itself, mapped to the categories and extras it applies to.", src: "/setup/services.png", alt: "Service setup screen mapping Regular, Deep, and Moving Cleaning to Categories and Extras" },
  { key: "extras", label: "Extras", copy: "Add the upsells — priced and tied to the services they belong on.", src: "/setup/extras.png", alt: "Extras setup screen with add-ons like Oven, Inside refrigerator, and Inside cabinets" },
  { key: "spaces", label: "Spaces", copy: "Define what gets cleaned, room by room, with quantity controls where it scales.", src: "/setup/spaces.png", alt: "Spaces setup screen listing Bedroom, Bathroom, Kitchen, and Hallways with quantity controls" },
  { key: "frequency", label: "Frequency", copy: "Set the cadence. Recurring bookings schedule themselves from here on out.", src: "/setup/frequencies.png", alt: "Recurring frequency setup screen" },
] as const;

export default function SetupShowcase() {
  const [active, setActive] = useState(0);
  const dirRef = useRef(1);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => {
      dirRef.current = 1;
      setActive((a) => (a + 1) % STEPS.length);
    }, DUR);
    return () => clearTimeout(id);
  }, [active, reduce]);

  function jump(i: number) {
    dirRef.current = i > active ? 1 : -1;
    setActive(i);
  }

  const step = STEPS[active];

  return (
    <div id="showcase" style={{ background: C.surface, padding: "96px 0" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        <p style={{ fontFamily: SANS, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: C.ink3, fontWeight: 600, textAlign: "center", marginBottom: 16 }}>
          Setup in minutes
        </p>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(32px, 5vw, 56px)", color: C.fg, textAlign: "center", margin: "0 auto 64px", lineHeight: 1.08, maxWidth: 720 }}>
          Your whole catalog, live before the coffee's done.
        </h2>

        {/* Screenshot — full width */}
        <div style={{ borderRadius: 16, border: `1px solid ${C.line}`, background: C.bg, boxShadow: "0 30px 80px -30px rgba(0,0,0,0.18)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, borderBottom: `1px solid ${C.line}`, background: C.surface, padding: "11px 16px" }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "rgba(10,10,10,0.15)" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "rgba(10,10,10,0.15)" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "rgba(10,10,10,0.15)" }} />
            <span style={{ fontFamily: SANS, fontSize: 12, color: C.ink3, marginLeft: 8 }}>Services / {step.label}</span>
          </div>
          <div style={{ position: "relative", aspectRatio: "16/8", background: "#FAFAFA", overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={dirRef.current} initial={false}>
              <motion.div
                key={step.key}
                custom={dirRef.current}
                initial={{ opacity: 0, x: 36 * dirRef.current }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 * dirRef.current }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image src={step.src} alt={step.alt} fill className="object-cover object-top" sizes="(min-width: 1240px) 1192px, 100vw" priority={active === 0} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Step tabs — flex row, full width */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6 md:flex-nowrap md:gap-x-4">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => jump(i)}
              className="flex-1"
              style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", minWidth: 132 }}
            >
              <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: SANS, fontSize: 12, color: i === active ? C.limeDeep : C.ink3, minWidth: 16 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: 17, color: i === active ? C.fg : C.ink3, transition: "color 0.3s ease" }}>
                  {s.label}
                </span>
              </span>
              <span style={{ display: "block", height: 2, background: C.line, marginTop: 12, borderRadius: 999, overflow: "hidden" }}>
                {i === active && !reduce && (
                  <motion.span
                    key={active}
                    style={{ display: "block", height: "100%", background: C.fg }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DUR / 1000, ease: "linear" }}
                  />
                )}
                {i === active && reduce && <span style={{ display: "block", height: "100%", width: "100%", background: C.fg }} />}
              </span>
            </button>
          ))}
        </div>

        {/* Active step copy */}
        <AnimatePresence mode="wait">
          <motion.p
            key={step.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: SANS, fontSize: 15.5, color: C.ink2, lineHeight: 1.65, margin: "22px auto 0", maxWidth: 560, textAlign: "center" }}
          >
            {step.copy}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
