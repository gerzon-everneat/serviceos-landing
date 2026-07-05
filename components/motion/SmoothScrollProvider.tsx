"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // On bfcache restore, the browser snaps native scrollY back but Lenis's
    // internal target can be left stale — resync it immediately, no easing,
    // so content doesn't sit transform-offset from where it visually is.
    function onPageShow(e: PageTransitionEvent) {
      if (!e.persisted) return;
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      ScrollTrigger.refresh();
    }
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      lenis.destroy();
      gsap.ticker.remove(onTick);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
