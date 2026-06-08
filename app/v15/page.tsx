"use client";
import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: "#FFFFFF",
  text: "#111111",
  muted: "#555555",
  border: "#E8E8E8",
  lime: "#C8FF00",
  limeText: "#3A5000",
  dark: "#0F0F0F",
  serif: "var(--font-cormorant), Georgia, serif",
  sans: "var(--font-sans), system-ui, sans-serif",
} as const;

// ─── Reveal ─────────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s ${delay}ms, transform 0.7s ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Waitlist Form ──────────────────────────────────────────────────────────────
function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setTimeout(() => setState("done"), 1400);
  };
  if (state === "done")
    return (
      <p style={{ fontFamily: D.sans, fontSize: 15, color: dark ? "#aaa" : D.muted, marginTop: 8 }}>
        You&apos;re on the list — we&apos;ll be in touch soon.
      </p>
    );
  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          flex: 1,
          minWidth: 200,
          padding: "12px 16px",
          borderRadius: 8,
          border: `1.5px solid ${dark ? "#333" : D.border}`,
          fontFamily: D.sans,
          fontSize: 15,
          background: dark ? "#1A1A1A" : "#fff",
          color: dark ? "#fff" : D.text,
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        style={{
          padding: "12px 24px",
          borderRadius: 8,
          background: D.lime,
          color: D.limeText,
          fontFamily: D.sans,
          fontWeight: 700,
          fontSize: 15,
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {state === "loading" ? "Joining…" : "Get Early Access"}
      </button>
    </form>
  );
}

// ─── Booking Feed (right-side hero visual) ─────────────────────────────────────
const FEED = [
  { icon: "📥", msg: "New booking — Deep clean · $185",          tag: "RECEIVED",  color: "#22C55E" },
  { icon: "🗓️", msg: "Calendar slot confirmed — Thu Jun 12",     tag: "SCHEDULED", color: "#3B82F6" },
  { icon: "🤖", msg: "AI dispatch — crew matched by location",   tag: "DISPATCH",  color: "#F59E0B" },
  { icon: "👤", msg: "Maria L. assigned · 0.8 mi · 4.9★",       tag: "ASSIGNED",  color: "#8B5CF6" },
  { icon: "✉️", msg: "Confirmation sent to customer",             tag: "NOTIFIED",  color: "#EC4899" },
  { icon: "💳", msg: "Job complete · Invoice sent automatically", tag: "INVOICED",  color: D.lime },
];

function BookingFeed() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % FEED.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        background: D.dark,
        borderRadius: 20,
        padding: 28,
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 32px 80px rgba(0,0,0,0.14)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#555", fontFamily: D.sans }}>
          BOOKING PIPELINE
        </span>
        <span style={{ fontSize: 12, color: "#22C55E", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
              animation: "v15-pulse 2s infinite",
            }}
          />
          LIVE
        </span>
      </div>
      {FEED.map((item, i) => {
        const isActive = i === active;
        const isPast = i < active;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              marginBottom: 6,
              background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
              border: `1.5px solid ${isActive ? item.color : "transparent"}`,
              transition: "all 0.4s ease",
              opacity: isPast ? 0.3 : 1,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: isActive ? item.color : "#1E1E1E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.4s ease",
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {isPast ? "✓" : item.icon}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 12,
                  color: isActive ? "#fff" : "#555",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.msg}
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: item.color,
                letterSpacing: "0.06em",
                opacity: isActive ? 1 : 0.2,
                flexShrink: 0,
              }}
            >
              {item.tag}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function V15Page() {
  return (
    <div style={{ fontFamily: D.sans, background: D.bg, color: D.text, minHeight: "100vh" }}>
      <style>{`
        @keyframes v15-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes v15-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Brand top stripe */}
      <div style={{ height: 4, background: D.lime }} />

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${D.border}`,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontFamily: D.serif, fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>
            neatr.ai
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500, color: D.muted }}>
              {["Features", "How it works", "Demo"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {l}
                </a>
              ))}
            </div>
            <a
              href="#waitlist"
              style={{
                padding: "9px 18px",
                background: D.lime,
                color: D.limeText,
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — split: headline + form left, live pipeline feed right */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "100px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div style={{ animation: "v15-fade 0.8s ease both" }}>
          <h1
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(48px, 6vw, 84px)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-1.5px",
              marginBottom: 28,
            }}
          >
            Bookings in.
            <br />
            Jobs dispatched.
            <br />
            <em style={{ fontStyle: "italic", color: D.muted }}>Without the chaos.</em>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: D.muted,
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 440,
            }}
          >
            neatr.ai is the operating layer for service businesses — bookings, dispatch, and invoicing
            handled automatically.
          </p>
          <WaitlistForm />
          <p style={{ fontSize: 13, color: "#999", marginTop: 14 }}>No credit card required · Free during beta</p>
        </div>
        <div style={{ animation: "v15-fade 0.8s 200ms ease both", display: "flex", justifyContent: "center" }}>
          <BookingFeed />
        </div>
      </section>

      {/* Three Pillars */}
      <section id="features" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(32px, 4vw, 54px)",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 72,
              letterSpacing: "-0.5px",
            }}
          >
            Three things it does well.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0 }}>
          {[
            {
              num: "01",
              title: "Online booking, 24/7",
              body: "Your customers pick a service, choose a slot, and confirm — without calling, texting, or waiting for a reply.",
              accent: false,
            },
            {
              num: "02",
              title: "Automatic dispatch",
              body: "The right person gets assigned the moment a booking lands. No manual coordination, no missed jobs.",
              accent: false,
            },
            {
              num: "03",
              title: "Invoicing after the job",
              body: "When the job is done, the invoice goes out automatically. You get paid without chasing anyone.",
              accent: true,
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                style={{
                  padding: "56px 40px",
                  borderTop: `2px solid ${item.accent ? D.lime : D.text}`,
                  borderRight: i < 2 ? `1px solid ${D.border}` : "none",
                  background: item.accent ? "#FAFFF0" : "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: D.serif,
                    fontSize: 64,
                    fontWeight: 700,
                    color: item.accent ? D.lime : D.border,
                    display: "block",
                    marginBottom: 20,
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </span>
                <h3
                  style={{
                    fontFamily: D.serif,
                    fontSize: 28,
                    fontWeight: 600,
                    marginBottom: 14,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: D.muted, lineHeight: 1.75, fontSize: 15 }}>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ background: D.dark, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: D.serif,
                fontSize: "clamp(32px, 4vw, 54px)",
                fontWeight: 600,
                color: "#fff",
                textAlign: "center",
                marginBottom: 80,
                letterSpacing: "-0.5px",
              }}
            >
              From request to invoiced in four steps.
            </h2>
          </Reveal>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0 }}
          >
            {[
              { step: "1", title: "Customer books", body: "Any device. Any time. Your booking page handles everything." },
              { step: "2", title: "Slot confirmed", body: "Calendar updated instantly. No double-bookings, ever." },
              { step: "3", title: "Team dispatched", body: "The right person is assigned and notified automatically." },
              { step: "4", title: "Invoice sent", body: "Job done — invoice out. You collect, we handle the rest." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  style={{
                    padding: "40px 32px",
                    borderLeft: `1px solid #222`,
                    borderRight: i === 3 ? `1px solid #222` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: D.lime,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: D.serif,
                        fontWeight: 700,
                        fontSize: 20,
                        color: D.limeText,
                      }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: D.serif,
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(32px, 4vw, 54px)",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 16,
              letterSpacing: "-0.5px",
            }}
          >
            See it in action.
          </h2>
          <p style={{ textAlign: "center", color: D.muted, fontSize: 16, marginBottom: 52 }}>
            This is the actual booking flow your customers would use.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${D.border}`,
              boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
            }}
          >
            <iframe
              src="/booking"
              style={{ width: "100%", height: 640, border: "none", display: "block" }}
              title="Live booking demo"
            />
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section id="waitlist" style={{ background: D.dark, padding: "128px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: D.serif,
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 600,
                color: "#fff",
                marginBottom: 20,
                letterSpacing: "-0.5px",
              }}
            >
              Ready to simplify your bookings?
            </h2>
            <p style={{ color: "#777", fontSize: 17, marginBottom: 44, lineHeight: 1.7 }}>
              Join the waitlist. We&apos;re onboarding service businesses one at a time to get the setup
              right.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <WaitlistForm dark />
            <p style={{ fontSize: 13, color: "#555", marginTop: 14 }}>No credit card required · Free during beta</p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${D.border}`,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <span style={{ fontFamily: D.serif, fontSize: 18, fontWeight: 700 }}>neatr.ai</span>
        <p style={{ color: "#999", fontSize: 13, marginTop: 8 }}>
          © 2026 neatr.ai · Built for service businesses
        </p>
      </footer>
    </div>
  );
}
