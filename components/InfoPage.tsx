import Link from "next/link";
import type { ReactNode } from "react";

/* Shell for plain server-rendered info pages (/support, /delete-account).
   Same canvas, type and header/footer as the v33 landing; no client JS. */

const SANS = "var(--font-dm-sans), system-ui, sans-serif";
const SERIF = "var(--font-cormorant), Georgia, serif";

function MarkGrid() {
  const pts = [10, 24, 38].flatMap((y) => [10, 24, 38].map((x) => ({ x, y })));
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden>
      {pts.map(({ x, y }, i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 5 : 3.2} fill={i === 4 ? "#C8FF00" : "#0A0A0A"} opacity={i === 4 ? 1 : 0.75} />
      ))}
    </svg>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="m-0 text-[20px] font-semibold tracking-tight text-[#0A0A0A]">{title}</h2>
      <div className="mt-3 space-y-3 text-[15.5px] leading-relaxed text-[#0A0A0A]/75 [&_a]:font-medium [&_a]:text-[#0A0A0A] [&_a]:underline [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

export default function InfoPage({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <div style={{ fontFamily: SANS, background: "#FBFBF9", color: "#0A0A0A" }} className="min-h-screen">
      <header className="border-b border-[#E7E6E1] bg-[#FBFBF9]">
        <nav aria-label="Main" className="mx-auto flex h-14 w-full max-w-[760px] items-center px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <MarkGrid />
            <span className="text-[15px] font-bold tracking-tight text-[#0A0A0A]">neatr</span>
          </Link>
        </nav>
      </header>

      <main id="main" className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-12 md:px-8">
        <h1 style={{ fontFamily: SERIF }} className="m-0 text-[44px] font-medium leading-[1.05] tracking-tight md:text-[56px]">
          {title}
        </h1>
        <div className="mt-4 text-[17px] leading-relaxed text-[#0A0A0A]/70">{intro}</div>
        {children}
      </main>

      <footer className="border-t border-[#E7E6E1] bg-[#FBFBF9]">
        <div className="mx-auto flex w-full max-w-[760px] flex-col gap-3 px-5 py-8 text-[13px] text-[#0A0A0A]/50 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="m-0 flex items-center gap-2">
            <MarkGrid /> <span className="font-semibold text-[#0A0A0A]">neatr</span> · © 2026
          </p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/support" className="text-[#0A0A0A]/50 no-underline hover:text-[#0A0A0A]">Support</Link>
            <Link href="/delete-account" className="text-[#0A0A0A]/50 no-underline hover:text-[#0A0A0A]">Delete account</Link>
            <a href="https://book.neatr.ai/privacy-policy" className="text-[#0A0A0A]/50 no-underline hover:text-[#0A0A0A]">Privacy policy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
