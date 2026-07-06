"use client";

import { useEffect, useRef, useState } from "react";
import { VIDEOS } from "../content";

/* Attio-style showcase: ONE big browser-framed stage playing the recording,
   pill tabs to switch clips, auto-advance when a clip ends. Plays only while
   in view; honors prefers-reduced-motion. No zoom/scale effects anywhere. */

const TITLES = ["Set up your operations", "Form builder", "Customers book themselves"];

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
      {/* Attio-style segmented strip ABOVE the stage: one cell per demo, the
          active cell fills with a progress bar, then the carousel advances */}
      <div role="tablist" aria-label="Product recordings" className="grid grid-cols-1 gap-px border-y border-[#E7E6E1] bg-[#E7E6E1] md:grid-cols-3">
        {VIDEOS.map((x, i) => {
          const isActive = i === active;
          const done = i < active;
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => { setActive(i); setProgress(0); }}
              className={`relative cursor-pointer px-7 py-6 text-left font-sans transition-all ${
                isActive
                  ? "z-[1] bg-white shadow-[0_12px_28px_-10px_rgba(10,10,10,0.28)]"
                  : "bg-[#FBFBF9] hover:bg-white hover:shadow-[0_8px_20px_-12px_rgba(10,10,10,0.2)]"
              }`}
            >
              <span className={`block text-[14px] transition-colors ${isActive ? "font-bold text-[#0A0A0A]" : "font-semibold text-[#0A0A0A]/50"}`}>
                {TITLES[i]}
              </span>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] bg-[#0A0A0A] transition-[width] duration-200"
                style={{ width: isActive ? `${progress}%` : done ? "100%" : "0%", opacity: isActive ? 1 : 0.25 }}
              />
            </button>
          );
        })}
      </div>

      {/* Big stage — one carousel frame; starts on Set up, auto-advances */}
      <figure className="m-0 mt-8">
        <div className="overflow-hidden rounded-2xl border border-[#E7E6E1] bg-white shadow-[0_32px_80px_-32px_rgba(10,10,10,0.28)]">
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
              if (!(el.duration > 0)) return;
              setProgress((el.currentTime / el.duration) * 100);
              /* ponytail: some recordings' metadata duration outruns the stream and
                 `ended` never fires — treat the last 0.2s as the end so the carousel
                 can't freeze on the final frame */
              if (el.duration - el.currentTime < 0.2 && !el.dataset.advanced) {
                el.dataset.advanced = "1";
                setActive((a) => (a + 1) % VIDEOS.length);
                setProgress(0);
              }
            }}
            onEnded={(e) => {
              if (e.currentTarget.dataset.advanced) return;
              e.currentTarget.dataset.advanced = "1";
              setActive((a) => (a + 1) % VIDEOS.length);
              setProgress(0);
            }}
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
