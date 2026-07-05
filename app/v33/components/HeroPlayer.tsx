"use client";

import { useEffect, useRef, useState } from "react";

/* Hero signature: the real customer-booking recording plays in a browser frame
   while a live status line narrates what's happening, synced to the clip's
   actual timeline. Honest by construction — the captions describe the footage. */

const TICKER: { at: number; text: string }[] = [
  { at: 0, text: "Checking the customer's ZIP…" },
  { at: 7, text: "Picking a service — prices come from your pricing matrix" },
  { at: 19, text: "Sizing the home: beds, baths, square footage" },
  { at: 28, text: "Adding extras" },
  { at: 33, text: "Locking a 2-hour arrival window your team can actually make" },
  { at: 40, text: "Guest checkout — card saved, $0 charged today" },
  { at: 61, text: "Booking confirmed · NT-50F17D6D" },
];

export default function HeroPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [line, setLine] = useState(TICKER[0].text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // poster + controls only
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-[#E7E6E1] bg-white shadow-[0_32px_80px_-32px_rgba(10,10,10,0.28)]">
        <div className="flex items-center gap-1.5 border-b border-[#E7E6E1] bg-[#FBFBF9] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
          <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
          <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
          <span className="ml-2 truncate font-sans text-xs text-[#0A0A0A]/45">book.neatr.ai — your booking page</span>
          <span className="ml-auto font-sans text-xs text-[#0A0A0A]/30">1:07</span>
        </div>
        <video
          ref={videoRef}
          src="/videos/03-customer-booking.mp4"
          poster="/videos/poster-03.jpg"
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          aria-label="Screen recording of a customer booking a cleaning on neatr in 1 minute 7 seconds"
          className="block aspect-video w-full object-cover"
          onTimeUpdate={(e) => {
            const t = e.currentTarget.currentTime;
            let next = TICKER[0];
            for (const entry of TICKER) if (t >= entry.at) next = entry;
            setLine(next.text);
            setDone(next === TICKER[TICKER.length - 1]);
          }}
        />
      </div>
      <figcaption className="mt-3 flex items-center gap-2.5 px-1 font-sans text-[13px] text-[#0A0A0A]/60">
        <span className={`h-2 w-2 shrink-0 rounded-full ${done ? "bg-[#C8FF00]" : "bg-[#C8FF00] animate-pulse"}`} aria-hidden />
        <span className="truncate" aria-live="polite">{line}</span>
        <span className="ml-auto hidden shrink-0 text-[#0A0A0A]/35 sm:inline">real recording · unedited</span>
      </figcaption>
    </figure>
  );
}
