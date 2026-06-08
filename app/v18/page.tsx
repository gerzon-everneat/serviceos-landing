"use client";
import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: "#FFFFFF",
  text: "#0A0A0A",
  muted: "#5A5A5A",
  border: "#EBEBEB",
  lime: "#C8FF00",
  limeText: "#3A5000",
  dark: "#0A0A0A",
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

// ─── Auto-cycling pipeline card ─────────────────────────────────────────────────
const PIPELINE = [
  { icon: "📥", label: "Received", desc: "Sarah M. · Deep clean · $185", color: "#22C55E" },
  { icon: "🗓️", label: "Scheduled", desc: "Thu Jun 12 · 10am · Slot reserved", color: "#3B82F6" },
  { icon: "🤖", label: "Dispatched", desc: "AI matching crew by location", color: "#F59E0B" },
  { icon: "👤", label: "Assigned", desc: "Maria L. · 0.8 mi · 4.9★", color: "#8B5CF6" },
  { icon: "✉️", label: "Notified", desc: "Confirmation sent to customer", color: "#EC4899" },
  { icon: "💳", label: "Invoiced", desc: "Job complete · Invoice sent", color: D.lime },
];

function PipelineCard() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % PIPELINE.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        background: "#F8F8F8",
        border: `1px solid ${D.border}`,
        borderRadius: 20,
        padding: 24,
        width: "100%",
        maxWidth: 400,
      }}
    >
      <div
        style={{
          marginBottom: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: D.sans,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: D.muted,
          }}
        >
          LIVE BOOKING PIPELINE
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#22C55E", fontWeight: 600 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
              animation: "v18-pulse 2s infinite",
            }}
          />
          LIVE
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {PIPELINE.map((step, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                background: isActive ? "#fff" : "transparent",
                border: `1.5px solid ${isActive ? step.color : "transparent"}`,
                transition: "all 0.4s ease",
                opacity: isPast ? 0.4 : 1,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: isActive ? step.color : isPast ? "#E0E0E0" : "#EBEBEB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.4s ease",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {isPast ? "✓" : step.icon}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: isActive ? D.text : D.muted,
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.label}
                </div>
                <div style={{ fontSize: 11, color: D.muted, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {step.desc}
                </div>
              </div>
              {isActive && (
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: step.color,
                    animation: "v18-pulse 1.5s infinite",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Hoverable Feature Card ─────────────────────────────────────────────────────
function FeatureCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hovered ? D.lime : D.border}`,
        borderRadius: 16,
        padding: "32px 28px",
        cursor: "default",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        boxShadow: hovered
          ? "0 12px 40px rgba(200,255,0,0.1), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 2px 8px rgba(0,0,0,0.03)",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      <span style={{ fontSize: 32, display: "block", marginBottom: 18 }}>{icon}</span>
      <h3 style={{ fontFamily: D.serif, fontSize: 22, fontWeight: 600, marginBottom: 10 }}>{title}</h3>
      <p style={{ color: D.muted, fontSize: 14, lineHeight: 1.75 }}>{body}</p>
    </div>
  );
}

// ─── Interactive Stepper ────────────────────────────────────────────────────────
const STEPS = [
  {
    t: "Customer visits your booking page",
    b: "Any device, any time. Your calendar is always live and up to date.",
  },
  {
    t: "They pick a service and slot",
    b: "No back-and-forth. No calls. They confirm in under a minute and they're done.",
  },
  {
    t: "Your team gets dispatched",
    b: "The right person is assigned and notified automatically — no manual coordination.",
  },
  {
    t: "Invoice sent after the job",
    b: "Job done, invoice out. You collect without chasing anyone.",
  },
];

function Stepper() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      {/* Progress rail */}
      <div style={{ display: "flex", gap: 4, marginBottom: 52 }}>
        {STEPS.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              flex: 1,
              height: 4,
              background: i <= active ? D.lime : "#F0F0F0",
              borderRadius: 100,
              transition: "background 0.4s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      {/* Step content */}
      {STEPS.map((s, i) => (
        <div
          key={i}
          style={{
            display: i === active ? "flex" : "none",
            gap: 28,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: D.lime,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: D.serif, fontWeight: 700, fontSize: 26, color: D.limeText }}>
              {i + 1}
            </span>
          </div>
          <div>
            <h3
              style={{
                fontFamily: D.serif,
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 600,
                marginBottom: 12,
                letterSpacing: "-0.3px",
              }}
            >
              {s.t}
            </h3>
            <p style={{ color: D.muted, fontSize: 17, lineHeight: 1.7 }}>{s.b}</p>
          </div>
        </div>
      ))}
      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 8, marginTop: 36 }}>
        {STEPS.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: 100,
              background: i === active ? D.lime : "#E0E0E0",
              transition: "all 0.35s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Waitlist Form ──────────────────────────────────────────────────────────────
function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          minWidth: 200,
          padding: "12px 16px",
          borderRadius: 10,
          border: `1.5px solid ${focused ? D.lime : dark ? "#333" : D.border}`,
          fontFamily: D.sans,
          fontSize: 15,
          background: dark ? "#111" : "#fff",
          color: dark ? "#fff" : D.text,
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
          (e.currentTarget as HTMLButtonElement).style.opacity = "0.92";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.opacity = "1";
        }}
        style={{
          padding: "12px 24px",
          borderRadius: 10,
          background: D.lime,
          color: D.limeText,
          fontFamily: D.sans,
          fontWeight: 700,
          fontSize: 15,
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "transform 0.18s, opacity 0.18s",
        }}
      >
        {state === "loading" ? "Joining…" : "Get Early Access"}
      </button>
    </form>
  );
}

// ─── Nav Link with hover underline ─────────────────────────────────────────────
function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? D.text : D.muted,
        textDecoration: "none",
        borderBottom: `2px solid ${hovered ? D.lime : "transparent"}`,
        paddingBottom: 2,
        transition: "color 0.2s, border-color 0.2s",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {label}
    </a>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function V18Page() {
  return (
    <div style={{ fontFamily: D.sans, background: D.bg, color: D.text, minHeight: "100vh" }}>
      <style>{`
        @keyframes v18-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes v18-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
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
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Demo", href: "#demo" },
            ].map((l) => (
              <NavLink key={l.label} label={l.label} href={l.href} />
            ))}
            <a
              href="#waitlist"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
              style={{
                padding: "9px 18px",
                background: D.lime,
                color: D.limeText,
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                transition: "transform 0.18s",
                display: "inline-block",
              }}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — left text + right pipeline card */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "100px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(200,255,0,0.05) 0%, transparent 70%)",
        }}
      >
        <div style={{ animation: "v18-fade 0.8s ease both" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#EFFFCD",
              border: `1px solid ${D.lime}`,
              borderRadius: 100,
              padding: "6px 14px",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
                animation: "v18-pulse 2s infinite",
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: D.limeText, letterSpacing: "0.08em" }}>
              EARLY ACCESS OPEN
            </span>
          </div>
          <h1
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(44px, 5.5vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.5px",
              marginBottom: 24,
            }}
          >
            Your service business,
            <br />
            running on autopilot.
          </h1>
          <p style={{ fontSize: 17, color: D.muted, lineHeight: 1.7, marginBottom: 36 }}>
            Bookings, dispatch, and invoicing handled automatically — so you can focus on delivering
            great work, not managing the back-office.
          </p>
          <WaitlistForm />
          <p style={{ fontSize: 13, color: "#999", marginTop: 14 }}>No credit card required · Free during beta</p>
        </div>
        <div
          style={{
            animation: "v18-fade 0.8s 200ms ease both",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PipelineCard />
        </div>
      </section>

      {/* Features — hover-lift cards */}
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
              Everything your business needs.
            </h2>
            <p style={{ textAlign: "center", color: D.muted, fontSize: 16, marginBottom: 64 }}>
              Hover each card to explore.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              {
                icon: "📅",
                title: "Online booking, 24/7",
                body: "Your customers pick a service, choose a slot, and confirm — without calling or texting.",
              },
              {
                icon: "🤖",
                title: "AI dispatch",
                body: "The right crew is assigned automatically the moment a booking lands. No manual matching.",
              },
              {
                icon: "💳",
                title: "Post-job invoicing",
                body: "Invoice goes out automatically when the job is marked complete. No chasing.",
              },
              {
                icon: "📱",
                title: "Works on any device",
                body: "Desktop, phone, tablet — your booking page looks great and works everywhere.",
              },
              {
                icon: "🔔",
                title: "Automated reminders",
                body: "Customers get reminders before their appointment. Fewer no-shows, zero effort from you.",
              },
              {
                icon: "⚡",
                title: "Live in under an hour",
                body: "Add your services, set your hours, share your link. No developer needed.",
              },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <FeatureCard {...f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — interactive stepper */}
      <section id="how-it-works" style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              marginBottom: 12,
              letterSpacing: "-0.3px",
            }}
          >
            How it works.
          </h2>
          <p style={{ color: D.muted, fontSize: 16, marginBottom: 52 }}>Click any step or just watch.</p>
        </Reveal>
        <Reveal delay={100}>
          <Stepper />
        </Reveal>
      </section>

      {/* Demo */}
      <section id="demo" style={{ background: "#FAFAFA", padding: "100px 24px" }}>
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
              See the live booking experience.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div
              style={{
                borderRadius: 20,
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
        </div>
      </section>

      {/* CTA — dark with lime glow */}
      <section
        id="waitlist"
        style={{ background: D.dark, padding: "128px 24px", position: "relative", overflow: "hidden" }}
      >
        {/* Lime glow blob */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: D.lime,
            opacity: 0.05,
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative" }}>
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
              Get early access today.
            </h2>
            <p style={{ color: "#888", fontSize: 17, marginBottom: 44, lineHeight: 1.7 }}>
              We&apos;re onboarding teams personally during beta. Drop your email and we&apos;ll get you
              set up.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <WaitlistForm dark />
            <p style={{ fontSize: 13, color: "#555", marginTop: 14 }}>
              No credit card required · Free during beta
            </p>
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
