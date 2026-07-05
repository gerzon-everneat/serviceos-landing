"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { C, SANS } from "../tokens";

const LINKS = [
  { href: "#pillars", label: "How it works" },
  { href: "#showcase", label: "Setup" },
  { href: "#preview", label: "Live preview" },
  { href: "#testimonials", label: "Reviews" },
];

function MarkGrid() {
  const pts = [10, 24, 38].flatMap((y) => [10, 24, 38].map((x) => ({ x, y })));
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" aria-hidden>
      {pts.map(({ x, y }, i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 5 : 3.2} fill={i === 4 ? C.lime : C.fg} opacity={i === 4 ? 1 : 0.75} />
      ))}
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        fontFamily: SANS,
        background: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <MarkGrid />
          <span style={{ fontSize: 17, fontWeight: 600, color: C.fg, letterSpacing: "-0.01em" }}>neatr</span>
        </a>

        <nav style={{ alignItems: "center", gap: 32 }} className="hidden md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{ fontSize: 14, color: C.ink2, textDecoration: "none", fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton as="a" href="/booking" className="inline-flex items-center rounded-full">
            <span style={{ background: C.fg, color: "#fff", borderRadius: 999, padding: "10px 20px", fontSize: 14, fontWeight: 600 }}>
              Get started
            </span>
          </MagneticButton>
        </div>

        <button
          className="md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}
        >
          <div style={{ width: 20, height: 14, position: "relative" }}>
            <span style={{ position: "absolute", top: menuOpen ? 6 : 0, left: 0, width: 20, height: 2, background: C.fg, transform: menuOpen ? "rotate(45deg)" : "none", transition: "all 0.25s ease" }} />
            <span style={{ position: "absolute", top: 6, left: 0, width: 20, height: 2, background: C.fg, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s ease" }} />
            <span style={{ position: "absolute", top: menuOpen ? 6 : 12, left: 0, width: 20, height: 2, background: C.fg, transform: menuOpen ? "rotate(-45deg)" : "none", transition: "all 0.25s ease" }} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 40 }}
            className="flex flex-col items-center justify-center gap-7 md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4 }}
                style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, color: C.fg, textDecoration: "none" }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="/booking"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * LINKS.length, duration: 0.4 }}
              style={{ marginTop: 12, background: C.fg, color: "#fff", borderRadius: 999, padding: "12px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}
            >
              Get started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
