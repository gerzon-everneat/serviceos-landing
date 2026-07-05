"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/easings";
import { C, SANS, SERIF } from "../tokens";

type Day = { date: number; weekday: number; available: boolean; isToday: boolean };
const SLOTS = ["9:00 AM", "11:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function buildMonth(): Day[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Day[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const weekday = new Date(year, month, d).getDay();
    const isPast = d < today;
    const available = !isPast && weekday !== 0 && d % 3 !== 0;
    days.push({ date: d, weekday, available, isToday: d === today });
  }
  return days;
}

export default function BookingPreview() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [step, setStep] = useState<"calendar" | "slots" | "confirmed">("calendar");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => setDays(buildMonth()), []);

  function pickDate(d: Day) {
    if (!d.available) return;
    setSelectedDate(d.date);
    setStep("slots");
  }

  function pickSlot(s: string) {
    setSelectedSlot(s);
    setStep("confirmed");
  }

  function reset() {
    setStep("calendar");
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  const leadingBlanks = days && days.length ? days[0].weekday : 0;

  return (
    <div id="preview" style={{ maxWidth: 460, margin: "0 auto", background: C.bg, border: `1px solid ${C.line}`, borderRadius: 20, boxShadow: "0 40px 90px -40px rgba(0,0,0,0.22)", overflow: "hidden" }}>
      {/* service chip */}
      <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink3, margin: 0 }}>Deep Cleaning · 2BR home</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: 20, color: C.fg, margin: "2px 0 0" }}>$180</p>
        </div>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: C.lime }} />
      </div>

      <div style={{ padding: 24, minHeight: 340 }}>
        <AnimatePresence mode="wait">
          {step === "calendar" && (
            <motion.div key="cal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.fg, marginBottom: 14 }}>
                {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 }}>
                {WEEKDAYS.map((w, i) => (
                  <div key={i} style={{ textAlign: "center", fontFamily: SANS, fontSize: 11, color: C.ink3, fontWeight: 600 }}>{w}</div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, minHeight: 210 }}>
                {days === null
                  ? Array.from({ length: 28 }).map((_, i) => <div key={i} style={{ aspectRatio: "1", borderRadius: 8, background: C.surface }} />)
                  : (
                    <>
                      {Array.from({ length: leadingBlanks }).map((_, i) => <div key={`b${i}`} />)}
                      {days.map((d) => (
                        <button
                          key={d.date}
                          onClick={() => pickDate(d)}
                          disabled={!d.available}
                          style={{
                            aspectRatio: "1",
                            borderRadius: 8,
                            border: d.isToday ? `1px solid ${C.fg}` : "1px solid transparent",
                            background: d.available ? C.surface : "transparent",
                            color: d.available ? C.fg : C.ink3,
                            fontFamily: SANS,
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: d.available ? "pointer" : "default",
                            opacity: d.available ? 1 : 0.35,
                            transition: "background 0.15s ease, transform 0.15s ease",
                          }}
                          onMouseEnter={(e) => { if (d.available) e.currentTarget.style.background = "#EFEFEF"; }}
                          onMouseLeave={(e) => { if (d.available) e.currentTarget.style.background = C.surface; }}
                        >
                          {d.date}
                        </button>
                      ))}
                    </>
                  )}
              </div>
            </motion.div>
          )}

          {step === "slots" && (
            <motion.div key="slots" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}>
              <button onClick={reset} style={{ background: "none", border: "none", padding: 0, fontFamily: SANS, fontSize: 12, color: C.ink3, cursor: "pointer", marginBottom: 14 }}>
                ← back
              </button>
              <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.fg, marginBottom: 14 }}>
                Available times · {new Date().toLocaleString("en-US", { month: "short" })} {selectedDate}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => pickSlot(s)}
                    style={{
                      textAlign: "left",
                      padding: "13px 16px",
                      borderRadius: 10,
                      border: `1px solid ${C.line}`,
                      background: C.bg,
                      fontFamily: SANS,
                      fontSize: 14,
                      fontWeight: 500,
                      color: C.fg,
                      cursor: "pointer",
                      transition: "border-color 0.15s ease, background 0.15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.fg; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "confirmed" && (
            <motion.div key="confirmed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 24 }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <motion.circle cx="28" cy="28" r="26" stroke={C.fg} strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} />
                <motion.path d="M17 29L24.5 36.5L39 20" stroke={C.lime} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT_EXPO }} />
              </svg>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: 24, color: C.fg, margin: "16px 0 6px" }}>Booked.</p>
              <p style={{ fontFamily: SANS, fontSize: 14, color: C.ink2, lineHeight: 1.6, maxWidth: 280 }}>
                {new Date().toLocaleString("en-US", { month: "long" })} {selectedDate} at {selectedSlot}. Confirmation sent — crew notified automatically.
              </p>
              <button onClick={reset} style={{ marginTop: 20, background: "none", border: "none", padding: 0, fontFamily: SANS, fontSize: 13, color: C.ink3, textDecoration: "underline", cursor: "pointer" }}>
                Try another slot
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Reveal className="block" delay={0.1}>
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.line}`, textAlign: "center" }}>
          <MagneticButton as="a" href="/booking" className="inline-flex">
            <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.fg }}>See the full booking flow →</span>
          </MagneticButton>
        </div>
      </Reveal>
    </div>
  );
}
