"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { C, SANS, SERIF } from "../tokens";

const QUOTES = [
  { quote: "I used to spend Sunday nights texting crews their Monday schedule. Now it's already done before I wake up.", name: "Owner", role: "Residential cleaning, 6 crews" },
  { quote: "The booking link alone cut our phone tag in half. Customers just pick a slot and it's on the calendar.", name: "Operations lead", role: "Airbnb turnover service" },
  { quote: "Auto‑dispatch routes jobs by zone without me touching a spreadsheet. That's the part I didn't know I needed.", name: "Founder", role: "Commercial cleaning" },
  { quote: "Payments used to be the awkward part. Now the card's charged the second the job's marked complete.", name: "General manager", role: "Home maintenance" },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);

  useEffect(() => {
    function measure() {
      if (!containerRef.current || !trackRef.current) return;
      const c = containerRef.current.offsetWidth;
      const t = trackRef.current.scrollWidth;
      setConstraint(Math.max(0, t - c));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div id="testimonials" ref={containerRef} style={{ overflow: "hidden", cursor: constraint > 0 ? "grab" : "default" }}>
      <motion.div
        ref={trackRef}
        drag={constraint > 0 ? "x" : false}
        dragConstraints={{ left: -constraint, right: 0 }}
        dragElastic={0.08}
        whileTap={{ cursor: "grabbing" }}
        style={{ display: "flex", gap: 20 }}
      >
        {QUOTES.map((q, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              width: "min(420px, 82vw)",
              padding: 32,
              borderRadius: 16,
              background: C.surface,
              border: `1px solid ${C.line}`,
              userSelect: "none",
            }}
          >
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 21, lineHeight: 1.45, color: C.fg, margin: "0 0 24px" }}>
              "{q.quote}"
            </p>
            <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.fg, margin: 0 }}>{q.name}</p>
            <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink3, margin: "2px 0 0" }}>{q.role}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
