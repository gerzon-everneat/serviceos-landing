"use client";

import { useEffect, useRef } from "react";
import { VIDEOS } from "../content";

/* Attio-style: every recording gets its own FULL-WIDTH stage, stacked in a
   single column. Each video plays while in view and pauses when scrolled
   away; prefers-reduced-motion leaves posters static. Layout only — no
   zoom/scale effects. */

const TITLES = ["Sign up", "Set up your operations", "Customers book themselves", "Make the form yours"];

function Stage({ index }: { index: number }) {
  const v = VIDEOS[index];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // poster only; click still plays
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="m-0">
      {/* Title row above each stage */}
      <div className="mb-4 flex items-baseline gap-3 px-1">
        <span className="font-sans text-[13px] font-semibold text-[#3A5000]" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="m-0 font-sans text-[17px] font-semibold text-[#0A0A0A]">{TITLES[index]}</h3>
        <span className="ml-auto font-sans text-[13px] text-[#0A0A0A]/40">{v.time}</span>
      </div>

      {/* Full-width browser-framed stage */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E6E1] bg-white shadow-[0_32px_80px_-32px_rgba(10,10,10,0.28)]">
        <div className="flex items-center gap-1.5 border-b border-[#E7E6E1] bg-[#FBFBF9] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
          <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
          <span className="h-2 w-2 rounded-full bg-[#0A0A0A]/15" />
          <span className="ml-2 truncate font-sans text-xs text-[#0A0A0A]/45">{TITLES[index]} — real recording, unedited</span>
          <span className="ml-auto font-sans text-xs text-[#0A0A0A]/30">{v.time}</span>
        </div>
        <video
          ref={videoRef}
          src={v.src}
          poster={v.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={v.name}
          className="block aspect-video w-full"
          onClick={(e) => {
            const el = e.currentTarget;
            if (el.paused) el.play().catch(() => {});
            else el.pause();
          }}
        />
      </div>

      <figcaption className="mt-3 flex items-center gap-2.5 px-1 font-sans text-[13px] text-[#0A0A0A]/60">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#C8FF00]" aria-hidden />
        <span className="truncate">
          {v.description.replace("Unedited screen recording: ", "").replace(/^./, (c) => c.toUpperCase())}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ShowcaseVideos() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {VIDEOS.map((_, i) => (
        <Stage key={VIDEOS[i].key} index={i} />
      ))}
    </div>
  );
}
