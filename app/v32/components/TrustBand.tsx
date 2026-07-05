import Marquee from "@/components/ui/Marquee";
import { C, SANS } from "../tokens";

const VERTICALS = [
  "Residential cleaning", "Airbnb turnover", "Commercial cleaning", "Home maintenance",
  "Landscaping", "Pool service", "Pest control", "Move‑in / move‑out", "Deep cleaning", "Handyman",
];

export default function TrustBand() {
  return (
    <div style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.surface, padding: "22px 0" }}>
      <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.ink3, fontWeight: 600, marginBottom: 18, fontFamily: SANS }}>
        Built for service businesses that run on schedules
      </p>
      <Marquee>
        {VERTICALS.map((v) => (
          <span key={v} style={{ fontFamily: SANS, fontSize: 15, color: C.ink2, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 16 }}>
            {v}
            <span style={{ width: 4, height: 4, borderRadius: 999, background: C.line }} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
