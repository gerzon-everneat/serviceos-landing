"use client";

import { useEffect, useRef, useState } from "react";
import { VIDEOS } from "../content";

/* Attio-style showcase: ONE big browser-framed stage playing the recording,
   pill tabs to switch clips, auto-advance when a clip ends. Plays only while
   in view; honors prefers-reduced-motion. No zoom/scale effects anywhere. */

const TITLES = ["Sign up", "Set up your operations", "Customers book themselves", "Make the form yours"];

export default function ShowcaseVideos() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // poster + native controls via click only
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, active]);

  const v = VIDEOS[active];

  return (
    <div ref={wrapRef}>
      {/* Attio-style segmented tab bar, attached to the top of the stage */}
      <div
        role="tablist"
        aria-label="Product recordings"
        className="grid grid-cols-2 overflow-hidden rounded-t-2xl border border-b-0 border-[#E7E6E1] bg-[#FBFBF9] md:grid-cols-4"
      >
        {VIDEOS.map((x, i) => {
          const isActive = i === active;
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => { setActive(i); setProgress(0); }}
              className={`relative px-4 py-4 text-center font-sans text-[14px] font-medium transition-colors ${
                isActive ? "bg-white text-[#0A0A0A]" : "text-[#0A0A0A]/55 hover:bg-white/70 hover:text-[#0A0A0A]"
              }`}
            >
              <span>{TITLES[i]}</span>
              <span className={`ml-2 text-[12px] ${isActive ? "text-[#0A0A0A]/40" : "text-[#0A0A0A]/30"}`}>{x.time}</span>
              {isActive && (
                <>
                  <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full bg-[#0A0A0A]/10" />
                  <span aria-hidden className="absolute bottom-0 left-0 h-[2px] bg-[#0A0A0A]" style={{ width: `${progress}%` }} />
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Big stage — browser chrome frame, flush under the tab bar */}
      <figure className="m-0">
        <div className="overflow-hidden rounded-b-2xl border border-[#E7E6E1] bg-white shadow-[0_32px_80px_-32px_rgba(10,10,10,0.28)]">
          <div className="flex items-center gap-1.5 border-b border-[#E7E6E1] bg-[#FBFBF9] px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
            <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
            <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
            <span className="ml-2 truncate font-sans text-xs text-[#0A0A0A]/45">{TITLES[active]} — real recording, unedited</span>
            <span className="ml-auto font-sans text-xs text-[#0A0A0A]/30">{v.time}</span>
          </div>
          <video
            key={v.key}
            ref={videoRef}
            src={v.src}
            poster={v.poster}
            muted
            playsInline
            preload="metadata"
            controls={false}
            aria-label={v.name}
            className="block aspect-video w-full"
            onTimeUpdate={(e) => {
              const el = e.currentTarget;
              if (el.duration > 0) setProgress((el.currentTime / el.duration) * 100);
            }}
            onEnded={() => { setActive((a) => (a + 1) % VIDEOS.length); setProgress(0); }}
            onClick={(e) => {
              const el = e.currentTarget;
              if (el.paused) el.play().catch(() => {});
              else el.pause();
            }}
          />
        </div>
        <figcaption className="mt-3 flex items-center gap-2.5 px-1 font-sans text-[13px] text-[#0A0A0A]/60">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#C8FF00]" aria-hidden />
          <span className="truncate">{v.description.replace("Unedited screen recording: ", "").replace(/^./, (c) => c.toUpperCase())}</span>
          <span className="ml-auto hidden shrink-0 text-[#0A0A0A]/35 sm:inline">{String(active + 1).padStart(2, "0")} / {String(VIDEOS.length).padStart(2, "0")}</span>
        </figcaption>
      </figure>
    </div>
  );
}
