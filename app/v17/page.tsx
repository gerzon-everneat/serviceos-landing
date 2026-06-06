"use client";
import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: "#FFFFFF",
  text: "#0F0F0F",
  muted: "#666666",
  border: "#E8E8E8",
  lime: "#C8FF00",
  limeText: "#3A5000",
  dark: "#0F0F0F",
  amber: "#F59E0B",
  amberLight: "#FEF3C7",
  amberDark: "#92400E",
  serif: "var(--font-cormorant), Georgia, serif",
  sans: "var(--font-sans), system-ui, sans-serif",
} as const;

const WAITLIST_COUNT = 247;
const MAX_SPOTS = 500;
const PCT = Math.round((WAITLIST_COUNT / MAX_SPOTS) * 100);

// ─── Reveal ─────────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 20,
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

// ─── Animated counter ───────────────────────────────────────────────────────────
function AnimCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const duration = 1600;
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}</span>;
}

// ─── Waitlist Form ──────────────────────────────────────────────────────────────
function WaitlistForm({ dark = false, cta = "Claim My Spot" }: { dark?: boolean; cta?: string }) {
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
        You&apos;re in! We&apos;ll reach out within 48 hours to get you set up.
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
        {state === "loading" ? "Claiming…" : cta}
      </button>
    </form>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function V17Page() {
  return (
    <div style={{ fontFamily: D.sans, background: D.bg, color: D.text, minHeight: "100vh" }}>
      <style>{`
        @keyframes v17-fade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes v17-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @keyframes v17-progress {
          from { width: 0%; }
          to   { width: ${PCT}%; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Urgency banner */}
      <div
        style={{
          background: D.amberLight,
          borderBottom: `1px solid #FDE68A`,
          padding: "10px 24px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, color: D.amberDark }}>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: D.amber,
              marginRight: 8,
              verticalAlign: "middle",
              animation: "v17-pulse 2s infinite",
            }}
          />
          Early Access · <strong>247 teams on the waitlist</strong> · We&apos;re onboarding the first
          500 personally
        </span>
      </div>

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.96)",
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
          <span style={{ fontFamily: D.serif, fontSize: 22, fontWeight: 700 }}>neatr.ai</span>
          <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500, color: D.muted, alignItems: "center" }}>
            {["Features", "How it works"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
            <a
              href="#waitlist"
              style={{
                padding: "9px 18px",
                background: D.amber,
                color: "#fff",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              Claim My Spot
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 80px", textAlign: "center" }}>
        <div style={{ animation: "v17-fade 0.8s ease both" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: D.amberLight,
              border: `1px solid #FDE68A`,
              borderRadius: 100,
              padding: "6px 14px",
              marginBottom: 28,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: D.amberDark, letterSpacing: "0.08em" }}>
              EARLY ACCESS · LIMITED SPOTS
            </span>
          </div>
          <h1
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-1.5px",
              marginBottom: 28,
            }}
          >
            Be among our
            <br />
            first 500 teams.
          </h1>
        </div>

        <div style={{ animation: "v17-fade 0.8s 150ms ease both" }}>
          <p style={{ fontSize: 18, color: D.muted, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 44px" }}>
            We&apos;re building neatr.ai for service businesses — bookings, dispatch, and invoicing on
            autopilot. Early teams get personal onboarding and locked rates before public launch.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ animation: "v17-fade 0.8s 260ms ease both", maxWidth: 480, margin: "0 auto 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: D.text }}>
              <AnimCounter target={WAITLIST_COUNT} /> / {MAX_SPOTS} early spots claimed
            </span>
            <span style={{ fontSize: 14, color: D.amber, fontWeight: 700 }}>{PCT}% full</span>
          </div>
          <div
            style={{ height: 10, background: "#F0F0F0", borderRadius: 100, overflow: "hidden" }}
          >
            <div
              style={{
                height: "100%",
                background: D.amber,
                borderRadius: 100,
                animation: "v17-progress 1.8s cubic-bezier(0.2, 0, 0, 1) both",
                animationDelay: "600ms",
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
            When we hit 500, we close early access and go fully self-serve.
          </p>
        </div>

        <div style={{ animation: "v17-fade 0.8s 360ms ease both", maxWidth: 480, margin: "0 auto" }}>
          <WaitlistForm />
        </div>
      </section>

      {/* What early teams get */}
      <section id="features" style={{ background: "#FAFAFA", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: D.serif,
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: 16,
                letterSpacing: "-0.3px",
              }}
            >
              What early teams get.
            </h2>
            <p style={{ textAlign: "center", color: D.muted, fontSize: 16, marginBottom: 64 }}>
              These benefits are only available to our first 500. After that, we go fully self-serve.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              {
                icon: "🧑‍💻",
                tag: "EXCLUSIVE",
                title: "Personal onboarding",
                body: "We set everything up with you — services, availability, team. You're not alone figuring it out.",
                highlight: true,
              },
              {
                icon: "🔒",
                tag: "EARLY BIRD",
                title: "Locked pricing",
                body: "Whatever rate you join at during beta is your rate. No price hikes when we launch publicly.",
                highlight: true,
              },
              {
                icon: "🎯",
                tag: "PRIORITY",
                title: "Direct line to the team",
                body: "Early teams get a direct Slack channel. Feature requests, bugs, questions — we're there.",
                highlight: true,
              },
              {
                icon: "📅",
                tag: "CORE",
                title: "Automated booking system",
                body: "Customers book 24/7 from your live calendar. No calls, no back-and-forth.",
                highlight: false,
              },
              {
                icon: "🤖",
                tag: "CORE",
                title: "AI-powered dispatch",
                body: "Right crew, right job, right time — assigned automatically the moment a booking lands.",
                highlight: false,
              },
              {
                icon: "💳",
                tag: "CORE",
                title: "Post-job invoicing",
                body: "Job complete, invoice sent. You collect without chasing a single customer.",
                highlight: false,
              },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${f.highlight ? "#FDE68A" : D.border}`,
                    borderRadius: 12,
                    padding: "28px 24px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {f.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: D.amber,
                      }}
                    />
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 24 }}>{f.icon}</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: f.highlight ? D.amberDark : D.muted,
                        background: f.highlight ? D.amberLight : "#F5F5F5",
                        padding: "3px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                    {f.title}
                  </h3>
                  <p style={{ color: D.muted, fontSize: 14, lineHeight: 1.7 }}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we onboard */}
      <section id="how-it-works" style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 16,
              letterSpacing: "-0.3px",
            }}
          >
            How we onboard you.
          </h2>
          <p style={{ textAlign: "center", color: D.muted, fontSize: 16, marginBottom: 72 }}>
            Not a self-serve flow. A real human process.
          </p>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            {
              n: "1",
              t: "You claim your spot",
              b: "Drop your email. That's it. We handle the rest.",
              tag: "Today",
            },
            {
              n: "2",
              t: "We reach out within 48h",
              b: "A real person from our team sets up a 20-minute call to understand your business.",
              tag: "Day 1–2",
            },
            {
              n: "3",
              t: "We configure everything together",
              b: "Services, pricing, calendar, team. You watch it come together.",
              tag: "Day 2–3",
            },
            {
              n: "4",
              t: "You go live",
              b: "Share your booking link. Customers start booking. Jobs start flowing.",
              tag: "Day 3–5",
            },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  padding: "36px 0",
                  borderBottom: i < 3 ? `1px solid ${D.border}` : "none",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: D.amber,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: D.serif, fontWeight: 700, fontSize: 20, color: "#fff" }}>
                    {s.n}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: D.serif, fontSize: 22, fontWeight: 600 }}>{s.t}</h3>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: D.amber,
                        background: D.amberLight,
                        padding: "3px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <p style={{ color: D.muted, fontSize: 15, lineHeight: 1.7 }}>{s.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section style={{ background: "#F9F9F9", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: D.serif,
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: 52,
                letterSpacing: "-0.3px",
              }}
            >
              Here&apos;s what your customers will see.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${D.border}`,
                boxShadow: "0 24px 80px rgba(0,0,0,0.06)",
              }}
            >
              <iframe
                src="/booking"
                style={{ width: "100%", height: 640, border: "none", display: "block" }}
                title="Live booking demo"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA — loss aversion framing */}
      <section id="waitlist" style={{ background: D.dark, padding: "120px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: D.serif,
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 600,
                color: "#fff",
                marginBottom: 20,
                letterSpacing: "-0.3px",
              }}
            >
              Don&apos;t miss early access.
            </h2>
            <p style={{ color: "#888", fontSize: 16, marginBottom: 20, lineHeight: 1.7 }}>
              We&apos;re at {PCT}% of our first 500 spots. Once we hit that, we close early access and
              go fully self-serve — no personal onboarding, no locked pricing.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1A1000",
                border: `1px solid ${D.amber}`,
                borderRadius: 100,
                padding: "8px 16px",
                marginBottom: 40,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: D.amber,
                  animation: "v17-pulse 2s infinite",
                }}
              />
              <span style={{ fontSize: 13, color: D.amber, fontWeight: 600 }}>
                {MAX_SPOTS - WAITLIST_COUNT} early spots remaining
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <WaitlistForm dark cta="Claim My Early Spot" />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${D.border}`,
          padding: "32px 24px",
          textAlign: "center",
          background: D.bg,
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
