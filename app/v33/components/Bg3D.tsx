"use client";

import { useEffect, useRef } from "react";

/* Ambient background ported from v30: a rotating perspective point-cloud with
   distance-linked constellation lines, plus a drifting color glow. Fixed behind
   the page; rotation speeds up gently with scroll velocity. v33 keeps a single
   ink accent so the videos stay the loudest thing on the page. */

export default function Bg3D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const N = 110;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 2 - 1,
    }));
    // ink → lime → ink across the scroll, quieter than v30's per-section palette
    const PAL = [
      [10, 10, 10],
      [122, 155, 0],
      [10, 10, 10],
    ];
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    let W = 0, H = 0, raf = 0, t = 0, lastY = window.scrollY, vel = 0;
    const resize = () => {
      W = canvas.width = Math.max(1, Math.floor(canvas.offsetWidth * dpr));
      H = canvas.height = Math.max(1, Math.floor(canvas.offsetHeight * dpr));
    };

    // Cursor joins the constellation: nearby points link to it and lean in.
    const mouse = { x: -1e5, y: -1e5 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // touch devices keep the calm version
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    const onLeave = () => { mouse.x = -1e5; mouse.y = -1e5; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    const draw = () => {
      const docScroll = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / docScroll)) : 0;
      const fi = prog * (PAL.length - 1);
      const i0 = Math.floor(fi), i1 = Math.min(PAL.length - 1, i0 + 1), k = fi - i0;
      const ac = [
        lerp(PAL[i0][0], PAL[i1][0], k) | 0,
        lerp(PAL[i0][1], PAL[i1][1], k) | 0,
        lerp(PAL[i0][2], PAL[i1][2], k) | 0,
      ];

      ctx.clearRect(0, 0, W, H);
      const curY = window.scrollY;
      vel += (Math.abs(curY - lastY) - vel) * 0.2;
      lastY = curY;
      t += reduce ? 0 : 0.0018 + Math.min(vel * 0.0008, 0.015);
      const cy = Math.cos(t), sy = Math.sin(t), cx = Math.cos(t * 0.4), sx = Math.sin(t * 0.4);
      const scale = Math.min(W, H) * 0.5, persp = 2.7, cxp = W / 2, cyp = H / 2;

      const proj = pts.map((p) => {
        const x = p.x * cy - p.z * sy, z = p.x * sy + p.z * cy;
        const y2 = p.y * cx - z * sx, z2 = p.y * sx + z * cx;
        const d = persp / (persp - z2);
        return { sx: cxp + x * scale * d, sy: cyp + y2 * scale * d, d, z: z2 };
      });

      const lim = scale * 0.34;
      for (let a = 0; a < N; a++) {
        for (let b = a + 1; b < N; b++) {
          const dx = proj[a].sx - proj[b].sx, dy = proj[a].sy - proj[b].sy;
          const dist = Math.hypot(dx, dy);
          if (dist < lim) {
            const al = (1 - dist / lim) * 0.16 * Math.min(proj[a].d, proj[b].d);
            ctx.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${al})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(proj[a].sx, proj[a].sy);
            ctx.lineTo(proj[b].sx, proj[b].sy);
            ctx.stroke();
          }
        }
      }
      // Cursor link-up: points inside the radius connect to the pointer and
      // are drawn slightly pulled toward it, so the field reacts without physics.
      const R = 190 * dpr;
      let linked = 0;
      for (const p of proj) {
        const dx = mouse.x - p.sx, dy = mouse.y - p.sy;
        const dist = Math.hypot(dx, dy);
        if (dist < R) {
          const k = 1 - dist / R;
          p.sx += dx * k * 0.14;
          p.sy += dy * k * 0.14;
          const al = k * 0.32 * p.d;
          ctx.strokeStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${al})`;
          ctx.lineWidth = dpr * 0.7;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.sx, p.sy);
          ctx.stroke();
          linked++;
        }
      }
      if (linked > 0) {
        ctx.fillStyle = "rgba(200,255,0,0.9)";
        ctx.strokeStyle = "rgba(10,10,10,0.55)";
        ctx.lineWidth = dpr;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      for (const p of proj) {
        const r = Math.max(0.6, p.d * 1.9 * dpr);
        const al = Math.min(0.5, 0.2 * p.d + (p.z > 0 ? 0.14 : 0));
        ctx.fillStyle = `rgba(${ac[0]},${ac[1]},${ac[2]},${al})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(); });
    ro.observe(canvas);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed -inset-[15%] z-0 animate-[v33glow_24s_ease-in-out_infinite_alternate] blur-[64px]"
        style={{
          background:
            "radial-gradient(32% 40% at 24% 28%, rgba(200,255,0,0.14), transparent 70%)," +
            "radial-gradient(38% 44% at 78% 64%, rgba(120,170,255,0.10), transparent 72%)," +
            "radial-gradient(30% 36% at 58% 94%, rgba(255,170,120,0.09), transparent 70%)",
        }}
      />
      <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
      <style>{`@keyframes v33glow{0%{transform:translate3d(-3%,-2%,0)}100%{transform:translate3d(4%,3%,0)}}@media (prefers-reduced-motion: reduce){.animate-\\[v33glow_24s_ease-in-out_infinite_alternate\\]{animation:none}}`}</style>
    </>
  );
}
