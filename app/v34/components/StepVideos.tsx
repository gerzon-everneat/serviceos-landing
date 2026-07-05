"use client";

import { useEffect, useRef, useState } from "react";
import { VIDEOS } from "../content";
import { zoomHandlers, zoomVideoClass } from "./zoom";

/* The three-step proof: each step card holds its real recording.
   Clicking a card opens the recording in an overlay player (native controls,
   so it can be scrubbed); hover still zooms into the card's frame. */

export default function StepVideos() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (lightbox === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <>
      <ol className="grid list-none gap-6 p-0 md:grid-cols-3 md:gap-5">
        {VIDEOS.map((v, i) => (
          <li key={v.key} className="flex flex-col">
            <button
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Play: ${v.name}`}
              aria-haspopup="dialog"
              className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-[#E7E6E1] bg-white text-left shadow-[0_20px_50px_-28px_rgba(10,10,10,0.25)] transition-transform duration-300 hover:-translate-y-0.5"
              {...zoomHandlers()}
            >
              <video
                src={v.src}
                poster={v.poster}
                muted
                playsInline
                preload="metadata"
                className={`block aspect-video w-full object-cover ${zoomVideoClass}`}
              />
              {/* play affordance */}
              <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0A0A]/85 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#FFFFFF"><path d="M3 1.5v11a.6.6 0 0 0 .9.5l9-5.5a.6.6 0 0 0 0-1l-9-5.5a.6.6 0 0 0-.9.5Z" /></svg>
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

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={VIDEOS[lightbox].name}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/85 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setLightbox(null)}
        >
          <div className="w-full max-w-[1000px]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="m-0 truncate font-sans text-sm text-white/80">{VIDEOS[lightbox].name}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close video"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-transparent text-white transition-colors hover:bg-white/10"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>
            <video
              key={VIDEOS[lightbox].src}
              src={VIDEOS[lightbox].src}
              poster={VIDEOS[lightbox].poster}
              autoPlay
              muted
              controls
              playsInline
              className="block aspect-video w-full rounded-xl bg-black shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
            />
            <p className="mt-3 font-sans text-[13px] text-white/50">real recording · unedited</p>
          </div>
        </div>
      )}
    </>
  );
}
