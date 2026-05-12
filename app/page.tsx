"use client";

import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="4" width="14" height="14" rx="2" /><path d="M3 9h14M7 2v4M13 2v4" />
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 2L4 11h7l-2 7 9-10h-7l2-6z" />
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M13 18v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" /><circle cx="7.5" cy="7" r="3" />
    <path d="M17 18v-1a4 4 0 0 0-3-3.87M14 4a3 3 0 0 1 0 5.83" />
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M6.5 3h7A1.5 1.5 0 0 1 15 4.5v11A1.5 1.5 0 0 1 13.5 17h-7A1.5 1.5 0 0 1 5 15.5v-11A1.5 1.5 0 0 1 6.5 3z" />
    <circle cx="10" cy="14.5" r=".75" fill="currentColor" />
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 6l4 4-4 4M7 6L3 10l4 4" />
  </svg>
);
const IconCreditCard = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="5" width="16" height="12" rx="2" /><path d="M2 9h16" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 7l3 3L11.5 3.5" />
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
);

// ─── Admin Dashboard Mockup ───────────────────────────────────────────────────

function DashboardMockup() {
  const jobs = [
    { time: "9:00 AM", service: "Deep Clean", address: "123 Oak Street", pro: "Sarah M.", status: "assigned", dot: "bg-blue-500" },
    { time: "11:00 AM", service: "Move-out Clean", address: "456 Elm Avenue", pro: "Unassigned", status: "pending", dot: "bg-gold" },
    { time: "2:00 PM", service: "Regular Clean", address: "789 Pine Road", pro: "Mike T.", status: "in progress", dot: "bg-emerald-500" },
    { time: "4:30 PM", service: "Post-Reno Clean", address: "321 Maple Drive", pro: "Anna K.", status: "complete", dot: "bg-ink-3" },
  ];

  const statusStyle: Record<string, string> = {
    assigned: "text-blue-400 bg-blue-400/10",
    pending: "text-gold bg-gold/10",
    "in progress": "text-emerald-400 bg-emerald-400/10",
    complete: "text-ink-3 bg-ink-4/60",
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-edge-2 bg-card shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-edge px-5 py-3.5">
        <div>
          <p className="text-xs text-ink-3">Today's Jobs</p>
          <p className="font-display text-base font-semibold italic text-ink">May 15, 2025</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-gold/10 px-2.5 py-1 text-gold">4 jobs</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border-b border-edge">
        {[["$1,240", "Revenue"], ["3/4", "Assigned"], ["0", "Conflicts"]].map(([val, label]) => (
          <div key={label} className="border-r border-edge last:border-0 px-4 py-3">
            <p className="font-display text-lg font-semibold text-ink">{val}</p>
            <p className="text-[10px] text-ink-3">{label}</p>
          </div>
        ))}
      </div>

      {/* Job list */}
      <div className="divide-y divide-edge">
        {jobs.map((job, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-card-2 transition-colors">
            <div className={`h-2 w-2 flex-shrink-0 rounded-full ${job.dot}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-ink">{job.service}</p>
                <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] capitalize ${statusStyle[job.status]}`}>
                  {job.status}
                </span>
              </div>
              <p className="text-xs text-ink-3">{job.time} · {job.pro}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-edge px-5 py-3">
        <button className="flex w-full items-center justify-center gap-1.5 text-xs text-gold hover:text-gold-hi transition-colors">
          View all jobs <IconArrow />
        </button>
      </div>
    </div>
  );
}

// ─── Embed Widget Mockup ──────────────────────────────────────────────────────

function EmbedMockup() {
  return (
    <div className="w-44 rounded-xl border border-edge-2 bg-card-3 p-4 shadow-xl">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-gold">Book a service</p>
      <div className="mb-2 rounded-lg bg-card-2 px-3 py-2 text-xs text-ink-3">Deep Clean</div>
      <div className="mb-2 rounded-lg bg-card-2 px-3 py-2 text-xs text-ink-3">May 20, 9:00 AM</div>
      <div className="mb-3 rounded-lg bg-card-2 px-3 py-2 text-xs text-ink-3">2 Bedrooms</div>
      <button className="w-full rounded-lg bg-gold py-2 text-xs font-medium text-canvas">
        Confirm →
      </button>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-edge/60 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-2xl font-semibold italic text-ink">
          ServiceOS
        </a>
        <div className="hidden items-center gap-8 text-sm text-ink-3 md:flex">
          {[["Features", "#features"], ["How it works", "#how-it-works"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <a key={label} href={href} className="transition-colors hover:text-ink">{label}</a>
          ))}
          <a href="#" className="transition-colors hover:text-ink">Login</a>
        </div>
        <a href="#" className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-gold-hi">
          Start free trial
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[30%] top-[40%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-[0.04] blur-[130px]" />
        <div className="absolute right-[15%] top-[35%] h-[400px] w-[400px] rounded-full bg-gold opacity-[0.025] blur-[100px]" />
      </div>

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-2">
        {/* Content */}
        <div>
          <div className="animate-rise mb-7 inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5 text-xs text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Built for cleaning, maintenance & field service businesses
          </div>

          <h1 className="animate-rise-1 font-display text-[4.75rem] font-light italic leading-[1.02] tracking-tight text-ink">
            Run your<br />
            service business<br />
            <span className="font-semibold not-italic">end-to-end.</span>
          </h1>

          <p className="animate-rise-2 mt-7 max-w-md text-base leading-[1.8] text-ink-2">
            From online booking to job dispatch and customer follow-up — ServiceOS connects every part of your operation in one platform, purpose-built for service businesses.
          </p>

          <div className="animate-rise-3 mt-9 flex flex-wrap items-center gap-5">
            <a href="#" className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-gold-hi">
              Start free trial →
            </a>
            <a href="#" className="flex items-center gap-2.5 text-sm text-ink-2 transition-colors hover:text-ink">
              <span className="h-px w-8 bg-current" />
              Book a demo
            </a>
          </div>

          <div className="animate-rise-3 mt-12 flex gap-10 border-t border-edge pt-10">
            {[
              { n: "5K+", label: "Service businesses" },
              { n: "1.2M+", label: "Jobs completed" },
              { n: "98%", label: "On-time dispatch rate" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-[1.75rem] font-semibold leading-none text-gold">{s.n}</p>
                <p className="mt-1.5 text-xs text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="hidden lg:flex lg:items-center lg:justify-end">
          <div className="relative">
            <div className="animate-float">
              <DashboardMockup />
            </div>

            {/* Embed widget */}
            <div className="animate-float2 absolute -left-24 bottom-8">
              <EmbedMockup />
            </div>

            {/* Notification */}
            <div className="animate-float3 absolute -right-4 -top-10 w-56 rounded-2xl border border-edge-2 bg-card p-3.5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm text-emerald-400">✓</div>
                <div>
                  <p className="text-xs font-medium text-ink">Job completed</p>
                  <p className="text-xs text-ink-3">Sarah M. · Deep Clean · Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-4">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-current" />
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

// ─── Logos ────────────────────────────────────────────────────────────────────

function Logos() {
  const names = ["CleanCo", "PureSpace", "NeatPros", "SwiftMaid", "HomeFlow", "BrightTeam"];
  return (
    <section className="border-y border-edge bg-card py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-center text-[10px] tracking-[0.25em] uppercase text-ink-3">
          Powering service businesses across the country
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {names.map((n) => (
            <span key={n} className="cursor-default font-display text-xl font-semibold italic text-ink-4 opacity-50 transition-opacity hover:opacity-80">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <IconCode />,
    title: "Embeddable Booking Widget",
    desc: "Drop a booking form on your website in minutes. Customers configure services, pick a time, and pay — all without leaving your site.",
    tag: "Customer-facing",
  },
  {
    icon: <IconZap />,
    title: "Smart Dispatch",
    desc: "Auto-suggest the best pro for each job based on skills, availability, and location. Conflict detection prevents double-bookings.",
    tag: "Operations",
  },
  {
    icon: <IconPhone />,
    title: "Pro Field Portal",
    desc: "Your field staff get a clean mobile view of their daily jobs. They can update status, upload before/after photos, and collect signatures.",
    tag: "Staff",
  },
  {
    icon: <IconUsers />,
    title: "Customer Portal",
    desc: "Clients can view their booking history, reschedule, cancel, and track job status in real time — no phone calls needed.",
    tag: "Customers",
  },
  {
    icon: <IconCreditCard />,
    title: "Payments & Payroll",
    desc: "Stripe checkout built in. Automatic invoicing, payment tracking, and payroll reports so your finances stay organised.",
    tag: "Finance",
  },
  {
    icon: <IconCalendar />,
    title: "Notifications & Webhooks",
    desc: "Automated email and SMS reminders via AWS SES + Twilio. HMAC-signed webhooks keep your other tools in sync.",
    tag: "Automation",
  },
];

function Features() {
  return (
    <section id="features" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] uppercase text-gold">Platform</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Everything your service business<br />
            <span className="font-semibold not-italic">needs in one place</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={i}
              className="group rounded-2xl border border-edge bg-card p-7 transition-all duration-300 hover:border-edge-2 hover:bg-card-2"
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="inline-flex rounded-xl bg-gold/10 p-3 text-gold transition-colors group-hover:bg-gold/15">
                  {f.icon}
                </div>
                <span className="rounded-full border border-edge-2 px-2.5 py-1 text-[10px] text-ink-3">{f.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold italic text-ink">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Configure your operations",
    desc: "Set up your services, pricing rules, staff availability, and branding. Connect your calendar and payment provider in minutes.",
  },
  {
    n: "02",
    title: "Embed the booking form",
    desc: "Paste one line of code on your website. Customers can book, pay, and receive confirmation — fully automated.",
  },
  {
    n: "03",
    title: "Dispatch and track",
    desc: "Jobs flow into your dashboard automatically. Assign pros, track status in real time, and get paid without the admin overhead.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-edge bg-card py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] uppercase text-gold">How it works</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            From setup to first booking<br />
            <span className="font-semibold not-italic">in under an hour</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={i} className="relative">
              {i < STEPS.length - 1 && (
                <div className="absolute left-[calc(100%+1.25rem)] top-8 hidden h-px w-[calc(100%-2.5rem)] border-t border-dashed border-edge-2 md:block" />
              )}
              <div className="font-display text-6xl font-semibold leading-none text-ink-4">{s.n}</div>
              <h3 className="mt-5 font-display text-2xl font-semibold italic text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "We went from managing everything in spreadsheets to having a fully automated dispatch system in a week. Our team saves 10+ hours every week.",
    name: "Marcus Webb",
    role: "Owner, Webb Cleaning Co.",
    initials: "MW",
  },
  {
    quote: "The embeddable booking form alone was worth it. Customers book themselves, pay online, and we get notified instantly. No more back-and-forth calls.",
    name: "Priya Anand",
    role: "Operations Manager, NeatPros",
    initials: "PA",
  },
  {
    quote: "Having the pro portal means my field staff always know where to be. Before/after photos in the app have basically eliminated disputes.",
    name: "Derek Hollis",
    role: "Founder, SwiftMaid",
    initials: "DH",
  },
];

function Testimonials() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] uppercase text-gold">Testimonials</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Loved by service businesses<br />
            <span className="font-semibold not-italic">that run lean</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-edge bg-card p-8">
              <svg className="mb-6 text-gold/25" width="36" height="28" viewBox="0 0 36 28" fill="currentColor">
                <path d="M0 28V16.8C0 11.2 1.75 6.65 5.25 3.15 8.75 1.05 12.95 0 17.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H14V28H0zm21 0V16.8c0-5.6 1.75-10.15 5.25-13.65C29.75 1.05 33.95 0 38.85 0l.35 3.15c-3.03.93-5.48 2.68-7.35 5.25-1.63 2.57-2.45 5.13-2.45 7.7H35V28H21z" />
              </svg>
              <p className="flex-1 text-sm leading-[1.8] text-ink-2">"{t.quote}"</p>
              <div className="mt-8 flex items-center gap-3 border-t border-edge pt-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-ink-3">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    desc: "For solo operators just getting started.",
    features: ["1 staff member", "Up to 30 bookings/month", "Embeddable booking form", "Stripe payments", "Email notifications", "Customer portal"],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Growth",
    monthly: 49,
    annual: 39,
    desc: "For growing teams managing real volume.",
    features: ["Up to 10 staff", "Unlimited bookings", "Smart dispatch & assignment", "SMS + email notifications", "Pro field portal", "Advanced analytics", "Webhooks & API access", "Priority support"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: 149,
    annual: 119,
    desc: "For multi-location operations at scale.",
    features: ["Unlimited staff", "Unlimited locations", "Everything in Growth", "Custom branding & white-label", "SSO & SAML", "Dedicated account manager", "Custom integrations", "SLA guarantee"],
    cta: "Contact sales",
    highlight: false,
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="border-y border-edge bg-card py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] uppercase text-gold">Pricing</p>
          <h2 className="font-display text-5xl font-light italic leading-tight text-ink">
            Simple pricing,<br />
            <span className="font-semibold not-italic">no surprises</span>
          </h2>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-edge-2 bg-canvas p-1.5">
            {[{ label: "Monthly", value: false }, { label: "Annual", value: true, badge: "Save 20%" }].map((opt) => (
              <button key={opt.label} onClick={() => setAnnual(opt.value)}
                className={["flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all",
                  annual === opt.value ? "bg-gold font-medium text-canvas" : "text-ink-3 hover:text-ink"].join(" ")}
              >
                {opt.label}
                {opt.badge && (
                  <span className={`text-xs ${annual === opt.value ? "text-canvas/70" : "text-emerald-500"}`}>{opt.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <div key={i} className={["flex flex-col rounded-2xl border p-8 transition-all",
              plan.highlight ? "border-gold/35 bg-card-3 shadow-2xl" : "border-edge bg-canvas hover:border-edge-2"].join(" ")}
            >
              {plan.highlight && (
                <span className="mb-4 inline-block self-start rounded-full bg-gold/15 px-3 py-1 text-xs text-gold">Most popular</span>
              )}
              <h3 className="font-display text-2xl font-semibold italic text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-ink-3">{plan.desc}</p>
              <div className="my-7">
                <span className="font-display text-5xl font-semibold text-ink">
                  ${annual ? plan.annual : plan.monthly}
                </span>
                <span className="ml-2 text-sm text-ink-3">/ month</span>
                {annual && plan.annual > 0 && <p className="mt-1 text-xs text-ink-3">Billed annually</p>}
              </div>
              <ul className="flex-1 space-y-3 border-t border-edge pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-gold" : "text-ink-3"}`}><IconCheck /></span>
                    <span className="text-sm text-ink-2">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#"
                className={["mt-8 block w-full rounded-full py-3.5 text-center text-sm font-medium transition-colors",
                  plan.highlight ? "bg-gold text-canvas hover:bg-gold-hi" : "border border-edge-2 text-ink hover:border-gold/30 hover:text-gold"].join(" ")}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }} />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-[0.055] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-[3.75rem] font-light italic leading-tight text-ink">
          Ready to run your business<br />
          <span className="font-semibold not-italic">the smart way?</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-ink-2">
          Join 5,000+ service businesses that have moved their operations to ServiceOS.<br />
          Free to start. No credit card required.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="rounded-full bg-gold px-9 py-4 text-sm font-medium text-canvas transition-colors hover:bg-gold-hi">
            Start your free trial
          </a>
          <a href="#" className="rounded-full border border-edge-2 px-9 py-4 text-sm text-ink-2 transition-colors hover:border-gold/30 hover:text-gold">
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links: Record<string, string[]> = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Solutions: ["Cleaning Services", "Maintenance", "Field Service", "Multi-location"],
    Developers: ["API Docs", "Webhooks", "Embed Guide", "Status"],
    Company: ["About", "Blog", "Careers", "Contact"],
  };

  return (
    <footer className="border-t border-edge bg-card py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-semibold italic text-ink">ServiceOS</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-3">
              The complete booking & dispatch platform for service businesses.
            </p>
          </div>
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <p className="mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-ink-3">{cat}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-ink-3 transition-colors hover:text-ink">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 text-xs text-ink-4 md:flex-row">
          <p>© 2025 ServiceOS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink-3 transition-colors">Privacy</a>
            <a href="#" className="hover:text-ink-3 transition-colors">Terms</a>
            <a href="#" className="hover:text-ink-3 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
