"use client";

import { useState } from "react";

/* Early-access lead capture — collects the equivalent of a signup wizard's
   personal + business-info steps (no password, no billing). POSTs to the
   existing booking-fe leads endpoint, which emails the team — no signup
   flow behind this, by design. */

// neatr.ai backend (booking-fe). Override with NEXT_PUBLIC_NEATR_API for local dev.
const NEATR_API = process.env.NEXT_PUBLIC_NEATR_API ?? "https://book.neatr.ai";

const FIELD =
  "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14.5px] text-white placeholder:text-white/40 focus:border-[#C8FF00]/60 focus:outline-none";
const SELECT = `${FIELD} appearance-none [&>option]:text-[#0A0A0A]`;

const INDUSTRIES = [
  "Home Cleaning",
  "Office / Commercial Cleaning",
  "Airbnb / Vacation Rental Cleaning",
  "Post-Construction Cleaning",
  "Carpet / Window / Specialty Cleaning",
  "Other home service",
];

// The endpoint only takes { email, source, message } — every profile field
// beyond email is packed into message so the backend needs no changes.
const PROFILE_FIELDS: Array<[name: string, label: string]> = [
  ["name", "Name"],
  ["business", "Business"],
  ["industry", "Industry"],
  ["stage", "Stage"],
  ["team", "Team size"],
  ["phone", "Phone"],
  ["location", "Location"],
];

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (!email) return;
    const profile = PROFILE_FIELDS.map(([name, label]) => {
      const v = String(f.get(name) ?? "").trim();
      return v && `${label}: ${v}`;
    })
      .filter(Boolean)
      .join("\n");
    setStatus("sending");
    try {
      const r = await fetch(`${NEATR_API}/api/v1/leads`, {
        method: "POST",
        // X-Requested-With is required by the backend's csrfGuard.
        headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
        body: JSON.stringify({ email, source: "neatr.ai — early access", ...(profile ? { message: profile } : {}) }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mx-auto mt-9 max-w-[44ch] text-[15.5px] font-semibold text-[#C8FF00]" role="status">
        You&rsquo;re on the list — we&rsquo;ll reach out shortly.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-9 grid w-full max-w-[620px] gap-3 text-left sm:grid-cols-2">
      <input type="text" name="name" aria-label="Your name" placeholder="Your name" className={FIELD} />
      <input type="email" name="email" required aria-label="Work email" placeholder="Work email *" className={FIELD} />
      <input type="text" name="business" aria-label="Business name" placeholder="Business name" className={FIELD} />
      <select name="industry" aria-label="Industry" defaultValue="" className={SELECT}>
        <option value="" disabled>
          Industry
        </option>
        {INDUSTRIES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select name="stage" aria-label="Are you starting a new business?" defaultValue="" className={SELECT}>
        <option value="" disabled>
          Are you starting a new business?
        </option>
        <option value="Already in business">No, I&rsquo;m already in business</option>
        <option value="Starting a new business">Yes, I&rsquo;m starting one</option>
      </select>
      <select name="team" aria-label="Team size" defaultValue="" className={SELECT}>
        <option value="" disabled>
          Team size
        </option>
        {["Just me", "2–5", "6–15", "16+"].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <input type="tel" name="phone" aria-label="Phone number" placeholder="Phone (optional)" className={FIELD} />
      <input type="text" name="location" aria-label="City and country" placeholder="City, country" className={FIELD} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[#C8FF00] px-8 py-4 text-[15px] font-bold text-[#0A0A0A] transition-opacity hover:opacity-85 disabled:opacity-60 sm:col-span-2"
      >
        {status === "sending" ? "Sending…" : "Get early access"}
      </button>
      {status === "error" && (
        <p className="m-0 text-[13px] text-[#FF9A8A] sm:col-span-2" role="alert">
          Something went wrong — please try again, or email hello@neatr.ai.
        </p>
      )}
    </form>
  );
}
