"use client";

import { useRef, useState } from "react";
import { VIDEOS } from "../content";
import { zoomHandlers, zoomVideoClass } from "./zoom";

/* The three-step proof: each step card holds its real recording.
   Tap a card to play/pause; only one plays at a time. */

export default function StepVideos() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  function toggle(i: number) {
    const v = refs.current[i];
    if (!v) return;
    if (playing === i) {
      v.pause();
      setPlaying(null);
      return;
    }
    refs.current.forEach((o, j) => j !== i && o?.pause());
    v.play().catch(() => {});
    setPlaying(i);
  }

  return (
    <ol className="grid list-none gap-6 p-0 md:grid-cols-3 md:gap-5">
      {VIDEOS.map((v, i) => (
        <li key={v.key} className="flex flex-col">
          <button
            type="button"
            onClick={() => toggle(i)}
            aria-label={playing === i ? `Pause: ${v.name}` : `Play: ${v.name}`}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-[#E7E6E1] bg-white text-left shadow-[0_20px_50px_-28px_rgba(10,10,10,0.25)] transition-transform duration-300 hover:-translate-y-0.5"
            {...zoomHandlers()}
          >
            <video
              ref={(el) => { refs.current[i] = el; }}
              src={v.src}
              poster={v.poster}
              muted
              playsInline
              preload="metadata"
              onEnded={() => setPlaying(null)}
              className={`block aspect-video w-full object-cover ${zoomVideoClass}`}
            />
            {/* play state overlay */}
            <span
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing === i ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
              aria-hidden
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0A0A]/85 shadow-lg backdrop-blur-sm">
                {playing === i ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#FFFFFF"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#FFFFFF"><path d="M3 1.5v11a.6.6 0 0 0 .9.5l9-5.5a.6.6 0 0 0 0-1l-9-5.5a.6.6 0 0 0-.9.5Z" /></svg>
                )}
              </span>
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-[#0A0A0A]/80 px-2 py-0.5 font-sans text-[11px] font-medium text-white" aria-hidden>
              {v.time}
            </span>
          </button>
          <div className="mt-4 flex items-baseline gap-3 px-1">
            <span className="font-sans text-xs font-semibold text-[#3A5000]" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-sans text-[15px] font-semibold text-[#0A0A0A]">{["Sign up", "Set up your operations", "Customers book themselves"][i]}</h3>
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-[#0A0A0A]/60">{v.description.replace("Unedited screen recording: ", "").replace(/^./, (c) => c.toUpperCase())}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
