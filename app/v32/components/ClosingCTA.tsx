"use client";

import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { C, SANS, SERIF } from "../tokens";

export default function ClosingCTA() {
  return (
    <section id="cta" style={{ background: C.dark, color: "#fff", padding: "160px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: SANS, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 24, fontWeight: 600 }}>
            Get started
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(40px, 7vw, 84px)", lineHeight: 1.02, margin: "0 0 40px" }}>
            Your calendar, <span style={{ color: C.lime }}>running itself.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticButton as="a" href="/booking" className="inline-flex">
            <span style={{ background: C.lime, color: "#0A0A0A", borderRadius: 999, padding: "18px 40px", fontSize: 16, fontWeight: 700, display: "inline-block" }}>
              Book a slot, see it work →
            </span>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
