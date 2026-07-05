import Reveal from "@/components/ui/Reveal";
import { C, SANS, SERIF } from "../tokens";

const COLS = [
  { title: "Product", links: [{ label: "Live preview", href: "#preview" }, { label: "Setup flow", href: "#showcase" }, { label: "Full booking demo", href: "/booking" }] },
  { title: "Company", links: [{ label: "All variants", href: "/versions" }, { label: "Logo marks", href: "/logos" }] },
  { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
];

export default function Footer() {
  return (
    <footer style={{ background: C.dark, color: "#fff", paddingTop: 80 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="grid grid-cols-2 md:grid-cols-[1.4fr_repeat(3,1fr)] gap-10 md:gap-10 pb-16 border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div>
            <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, marginBottom: 10 }}>neatr</p>
            <p style={{ fontFamily: SANS, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 260 }}>
              Booking, dispatch, and follow‑up for service businesses — running quietly in the background.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p style={{ fontFamily: SANS, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16, fontWeight: 600 }}>{col.title}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} style={{ fontFamily: SANS, fontSize: 14, color: "rgba(255,255,255,0.72)", textDecoration: "none" }}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-2 py-5 md:flex-row md:items-center md:justify-between">
          <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>© {new Date().getFullYear()} neatr.ai</p>
          <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>v32 · Full‑stack showcase</p>
        </div>
      </div>

      <Reveal className="block" y={40}>
        <p
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(80px, 18vw, 260px)",
            lineHeight: 0.85,
            color: "rgba(255,255,255,0.06)",
            textAlign: "center",
            margin: 0,
            padding: "0 24px 24px",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          neatr
        </p>
      </Reveal>
    </footer>
  );
}
