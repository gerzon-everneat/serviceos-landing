import Reveal from "@/components/ui/Reveal";
import { C, SANS, SERIF } from "../tokens";

const PILLARS = [
  {
    n: "01",
    title: "One link, zero back‑and‑forth",
    body: "Share a single booking link. Customers see real availability and pick a slot themselves — no calls, no email tag.",
  },
  {
    n: "02",
    title: "Dispatch runs itself",
    body: "Every booking routes to the right crew automatically, based on location, skill, and load — before you've opened the app.",
  },
  {
    n: "03",
    title: "Payments collect on completion",
    body: "Card on file, charged the moment the job's marked done. No invoices to chase, no cash to track down.",
  },
  {
    n: "04",
    title: "Follow‑ups that never slip",
    body: "Reminders, review requests, and rebooking nudges go out on schedule — even on your day off.",
  },
];

export default function ValuePillars() {
  return (
    <div id="pillars" style={{ background: C.bg, padding: "120px 0" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <span style={{ fontFamily: SANS, fontSize: 13, color: C.limeDeep, fontWeight: 600, letterSpacing: "0.08em" }}>
                {p.n} / {String(PILLARS.length).padStart(2, "0")}
              </span>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.08, color: C.fg, margin: "14px 0 16px", maxWidth: 480 }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: SANS, fontSize: 16, color: C.ink2, lineHeight: 1.65, maxWidth: 440 }}>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
