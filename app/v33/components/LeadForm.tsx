"use client";

import { useState } from "react";

/* Early-access lead capture, two steps: the email alone is submitted the
   moment the CTA is clicked (zero friction — the lead is secured), then an
   optional business-profile step enriches it with a second POST. Both posts
   share the same subject line at the notify inbox, so they thread. POSTs to
   the existing booking-fe leads endpoint — no signup flow behind this, by design. */

// neatr.ai backend (booking-fe). Override with NEXT_PUBLIC_NEATR_API for local dev.
const NEATR_API = process.env.NEXT_PUBLIC_NEATR_API ?? "https://book.neatr.ai";
const SOURCE = "neatr.ai — early access";

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

async function postLead(body: { email: string; source: string; message?: string }) {
  const r = await fetch(`${NEATR_API}/api/v1/leads`, {
    method: "POST",
    // X-Requested-With is required by the backend's csrfGuard.
    headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error("lead post failed");
}

export default function LeadForm() {
  const [step, setStep] = useState<"email" | "profile" | "done">("email");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function submitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!value || sending) return;
    setSending(true);
    setError(false);
    try {
      await postLead({ email: value, source: SOURCE });
      setEmail(value);
      setStep("profile");
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  async function submitProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const f = new FormData(e.currentTarget);
    const profile = PROFILE_FIELDS.map(([name, label]) => {
      const v = String(f.get(name) ?? "").trim();
      return v && `${label}: ${v}`;
    })
      .filter(Boolean)
      .join("\n");
    if (!profile) {
      setStep("done");
      return;
    }
    setSending(true);
    // ponytail: enrichment is best-effort — the email is already captured,
    // so a failed second post still lands on the confirmation.
    try {
      await postLead({ email, source: SOURCE, message: profile });
    } catch {}
    setSending(false);
    setStep("done");
  }

  if (step === "done") {
    return (
      <p className="mx-auto mt-9 max-w-[44ch] text-[15.5px] font-semibold text-[#C8FF00]" role="status">
        You&rsquo;re on the list — we&rsquo;ll reach out shortly.
      </p>
    );
  }

  if (step === "profile") {
    return (
      <form onSubmit={submitProfile} className="mx-auto mt-9 grid w-full max-w-[620px] gap-3 text-left sm:grid-cols-2">
        <p className="m-0 text-center text-[14px] font-semibold text-[#C8FF00] sm:col-span-2" role="status">
          You&rsquo;re on the list ✓&ensp;
          <span className="font-normal text-white/55">Optional: tell us about your business so we can set you up faster.</span>
        </p>
        <input type="text" name="name" aria-label="Your name" placeholder="Your name" className={FIELD} />
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
          disabled={sending}
          className="rounded-full bg-[#C8FF00] px-8 py-4 text-[15px] font-bold text-[#0A0A0A] transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {sending ? "Sending…" : "Complete profile"}
        </button>
        <button
          type="button"
          onClick={() => setStep("done")}
          className="rounded-full border border-white/20 bg-transparent px-8 py-4 text-[15px] font-semibold text-white/70 transition-colors hover:border-white/45 hover:text-white"
        >
          Skip for now
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submitEmail} className="mx-auto mt-9 flex w-full max-w-[480px] flex-col gap-3 sm:flex-row sm:flex-wrap">
      <input type="email" name="email" required aria-label="Work email" placeholder="Work email" className={`${FIELD} flex-1`} />
      <button
        type="submit"
        disabled={sending}
        className="shrink-0 rounded-full bg-[#C8FF00] px-7 py-3.5 text-[15px] font-bold text-[#0A0A0A] transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {sending ? "Sending…" : "Get early access"}
      </button>
      {error && (
        <p className="m-0 text-[13px] text-[#FF9A8A] sm:basis-full" role="alert">
          Something went wrong — please try again, or email hello@neatr.ai.
        </p>
      )}
    </form>
  );
}
