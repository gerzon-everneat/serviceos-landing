"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { C, SANS, SERIF } from "../tokens";

const METRICS = [
  { to: 6, suffix: " min", label: "Average time to go live" },
  { to: 0, suffix: " emails", label: "Back‑and‑forth needed to book" },
  { to: 100, suffix: "%", label: "Jobs auto‑dispatched, zero manual routing" },
  { to: 24, suffix: "/7", label: "Booking link stays open" },
];

function useCountUp(target: number, active: boolean, reduce: boolean, duration = 1.3) {
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!active || reduce) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);
  return n;
}

function Metric({ to, suffix, label, active, reduce }: { to: number; suffix: string; label: string; active: boolean; reduce: boolean }) {
  const n = useCountUp(to, active, reduce);
  return (
    <div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(40px, 5vw, 60px)", color: C.fg, margin: 0, lineHeight: 1 }}>
        {n}
        <span style={{ color: C.limeDeep }}>{suffix}</span>
      </p>
      <p style={{ fontFamily: SANS, fontSize: 14, color: C.ink2, marginTop: 10, maxWidth: 200 }}>{label}</p>
    </div>
  );
}

export default function MetricsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduce = !!useReducedMotion();

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {METRICS.map((m) => (
        <Metric key={m.label} {...m} active={inView} reduce={reduce} />
      ))}
    </div>
  );
}
