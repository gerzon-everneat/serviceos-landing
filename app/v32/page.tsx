"use client";

import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBand from "./components/TrustBand";
import ValuePillars from "./components/ValuePillars";
import SetupShowcase from "./components/SetupShowcase";
import DemoReel from "./components/DemoReel";
import BookingPreview from "./components/BookingPreview";
import MetricsBand from "./components/MetricsBand";
import Testimonials from "./components/Testimonials";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import { C, SANS, SERIF } from "./tokens";

export default function V32Page() {
  return (
    <SmoothScrollProvider>
      <div style={{ background: C.bg }}>
        <Header />
        <Hero />

        <SetupShowcase />

        <TrustBand />

        <ValuePillars />

        <DemoReel />

        <Section className="py-32">
          <Reveal className="block" y={20}>
            <p style={{ fontFamily: SANS, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: C.ink3, fontWeight: 600, textAlign: "center", marginBottom: 16 }}>
              Try it
            </p>
          </Reveal>
          <Reveal className="block" y={20} delay={0.08}>
            <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(32px, 5vw, 56px)", color: C.fg, textAlign: "center", margin: "0 0 56px", lineHeight: 1.08 }}>
              A booking flow that feels like<br />a luxury reservation, not a form.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <BookingPreview />
          </Reveal>
        </Section>

        <Section className="py-24" innerClassName="border-t border-[#E5E5E5]">
          <Reveal>
            <MetricsBand />
          </Reveal>
        </Section>

        <Section className="py-32">
          <Reveal className="block" y={20}>
            <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(28px, 4vw, 44px)", color: C.fg, marginBottom: 40 }}>
              From people who run these businesses.
            </h2>
          </Reveal>
          <Testimonials />
        </Section>

        <ClosingCTA />
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
