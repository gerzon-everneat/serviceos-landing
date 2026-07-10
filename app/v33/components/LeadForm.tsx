"use client";

import { useState } from "react";

/* Early-access lead capture. POSTs to the existing booking-fe leads endpoint,
   which emails the team — no signup flow behind this, by design. */

// neatr.ai backend (booking-fe). Override with NEXT_PUBLIC_NEATR_API for local dev.
const NEATR_API = process.env.NEXT_PUBLIC_NEATR_API ?? "https://book.neatr.ai";

const FIELD =
  "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14.5px] text-white placeholder:text-white/40 focus:border-[#C8FF00]/60 focus:outline-none";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (!email) return;
    // The endpoint only takes { email, source, message } — pack the business
    // profile into message so the backend needs no changes.
    const profile = [
      f.get("business") && `Business: ${f.get("business")}`,
      f.get("team") && `Team size: ${f.get("team")}`,
    ]
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
    <form onSubmit={submit} className="mx-auto mt-9 flex w-full max-w-[420px] flex-col gap-3">
      <input type="email" name="email" required aria-label="Work email" placeholder="Work email *" className={FIELD} />
      <input type="text" name="business" aria-label="Business name" placeholder="Business name" className={FIELD} />
      <select name="team" aria-label="Team size" defaultValue="" className={`${FIELD} appearance-none [&>option]:text-[#0A0A0A]`}>
        <option value="" disabled>
          Team size
        </option>
        {["Just me", "2–5", "6–15", "16+"].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[#C8FF00] px-8 py-4 text-[15px] font-bold text-[#0A0A0A] transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get early access"}
      </button>
      {status === "error" && (
        <p className="m-0 text-[13px] text-[#FF9A8A]" role="alert">
          Something went wrong — please try again, or email hello@neatr.ai.
        </p>
      )}
    </form>
  );
}
