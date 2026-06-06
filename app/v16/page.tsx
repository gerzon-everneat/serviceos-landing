"use client";
import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const D = {
  bg: "#FAFAFA",
  text: "#1A1A1A",
  muted: "#666666",
  border: "#E5E5E5",
  lime: "#C8FF00",
  limeText: "#3A5000",
  dark: "#0F0F0F",
  trustBg: "#F4F4F0",
  serif: "var(--font-cormorant), Georgia, serif",
  sans: "var(--font-sans), system-ui, sans-serif",
} as const;

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
        {state === "loading" ? "Joining…" : "Join the Waitlist"}
      </button>
    </form>
  );
}

// ─── Business Categories ────────────────────────────────────────────────────────
const CATEGORIES = [
  { icon: "🧹", name: "Residential Cleaning", tag: "House & deep cleans" },
  { icon: "🔧", name: "Home Maintenance", tag: "Repairs & handyman" },
  { icon: "🌿", name: "Landscaping", tag: "Lawn care & garden" },
  { icon: "❄️", name: "HVAC & Plumbing", tag: "Installs & service calls" },
  { icon: "🪟", name: "Window Cleaning", tag: "Residential & commercial" },
  { icon: "🏢", name: "Commercial Cleaning", tag: "Offices & facilities" },
];

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function V16Page() {
  return (
    <div style={{ fontFamily: D.sans, background: D.bg, color: D.text, minHeight: "100vh" }}>
      <style>{`
        @keyframes v16-fade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Category bar */}
      <div
        style={{
          background: D.trustBg,
          borderBottom: `1px solid ${D.border}`,
          padding: "10px 24px",
          textAlign: "center",
        }}
      >
        <span style={{ fontFamily: D.sans, fontSize: 13, color: D.muted }}>
          Built for&nbsp;
          <strong style={{ color: D.text }}>cleaning, maintenance, landscaping, HVAC,</strong>
          &nbsp;and field service teams
        </span>
      </div>

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250,250,250,0.96)",
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

      {/* Hero — social proof on the right from the start */}
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
        <div style={{ animation: "v16-fade 0.8s ease both" }}>
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
            <span style={{ fontSize: 12, fontWeight: 700, color: D.limeText, letterSpacing: "0.08em" }}>
              EARLY ACCESS OPEN
            </span>
          </div>
          <h1
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              marginBottom: 24,
            }}
          >
            Your customers book.
            <br />
            Your team shows up.
            <br />
            <em style={{ fontStyle: "italic" }}>You stop chasing.</em>
          </h1>
          <p style={{ fontSize: 17, color: D.muted, lineHeight: 1.7, marginBottom: 36 }}>
            neatr.ai handles the full cycle — booking, dispatch, and invoicing — so you can run more
            jobs without running yourself into the ground.
          </p>
          <WaitlistForm />
          <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
            {["No credit card required", "Cancel anytime", "Live in minutes"].map((t) => (
              <span
                key={t}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: D.muted }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="7" fill="#22C55E" />
                  <path
                    d="M4 7l2 2 4-4"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Business category cards — who this is built for */}
        <div style={{ animation: "v16-fade 0.8s 200ms ease both" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: D.muted,
              marginBottom: 16,
            }}
          >
            BUILT FOR
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {CATEGORIES.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: `1px solid ${D.border}`,
                  borderRadius: 12,
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: D.serif, fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 12, color: D.muted, marginTop: 3 }}>{c.tag}</div>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 13,
              color: D.muted,
              marginTop: 16,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            If your business runs on scheduled appointments and a field crew, neatr.ai is built for you.
          </p>
        </div>
      </section>

      {/* Outcome Features — not feature-led, outcome-led */}
      <section id="features" style={{ background: D.trustBg, padding: "100px 24px" }}>
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
              What actually changes when you use it.
            </h2>
            <p style={{ textAlign: "center", color: D.muted, fontSize: 16, marginBottom: 64 }}>
              Built for teams that do the actual work — not just the admin.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              {
                icon: "📅",
                outcome: "Zero scheduling back-and-forth",
                body: "Customers book themselves from your live calendar. No calls, no &lsquo;are you free Tuesday?&rsquo; threads.",
              },
              {
                icon: "🤖",
                outcome: "Jobs get matched automatically",
                body: "The right crew member is dispatched based on location, availability, and skill — without you stepping in.",
              },
              {
                icon: "💬",
                outcome: "Customers know what's happening",
                body: "Confirmations, reminders, and updates go out automatically. Fewer no-shows, fewer confused calls.",
              },
              {
                icon: "💳",
                outcome: "Invoices go out the moment jobs close",
                body: "No manual invoicing. The job finishes, the invoice sends. You collect faster, with less effort.",
              },
              {
                icon: "📱",
                outcome: "Your business runs from anywhere",
                body: "See your schedule, manage your team, and track jobs — all from your phone, in real time.",
              },
              {
                icon: "⚡",
                outcome: "You're live in under an hour",
                body: "Add your services, set your availability, share your link. No developer, no setup calls, no stress.",
              },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  style={{
                    background: "#fff",
                    border: `1px solid ${D.border}`,
                    borderRadius: 12,
                    padding: "28px 24px",
                  }}
                >
                  <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{f.icon}</span>
                  <h3 style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                    {f.outcome}
                  </h3>
                  <p
                    style={{ color: D.muted, fontSize: 14, lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: f.body }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: D.serif,
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 80,
              letterSpacing: "-0.3px",
            }}
          >
            Four steps. That&apos;s the whole thing.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {[
            {
              n: "1",
              t: "Customer books online",
              b: "They visit your page, pick a service and time, and confirm. Done.",
            },
            {
              n: "2",
              t: "Booking confirmed",
              b: "Calendar updates. Customer gets a confirmation. You get a notification.",
            },
            {
              n: "3",
              t: "Team gets dispatched",
              b: "The right person is assigned and notified. No manual coordination.",
            },
            {
              n: "4",
              t: "Invoice sent after job",
              b: "Job complete — invoice goes out automatically. No chasing.",
            },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: i === 3 ? D.lime : "#F0F0F0",
                    border: `2px solid ${i === 3 ? D.lime : D.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: D.serif,
                      fontWeight: 700,
                      fontSize: 22,
                      color: i === 3 ? D.limeText : D.text,
                    }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3 style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                  {s.t}
                </h3>
                <p style={{ color: D.muted, fontSize: 14, lineHeight: 1.7 }}>{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section style={{ background: D.trustBg, padding: "100px 24px" }}>
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
              See the booking experience your customers get.
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

      {/* CTA — trust signals near the action */}
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
              Be one of the first teams in.
            </h2>
            <p style={{ color: "#888", fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
              We&apos;re new and building this with our first customers — not after them. Grab a spot and
              help us get it right.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <WaitlistForm dark />
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
              {["No credit card", "Cancel anytime", "Live in minutes"].map((t) => (
                <span
                  key={t}
                  style={{ fontSize: 13, color: "#666", display: "flex", alignItems: "center", gap: 6 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="7" fill="#22C55E" />
                    <path
                      d="M4 7l2 2 4-4"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
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
