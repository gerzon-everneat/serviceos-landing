import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "neatr.ai — Run your calendar without running it",
  description:
    "The full-stack showcase: R3F hero, GSAP-pinned scroll storytelling, Lenis smooth scroll, and Framer Motion micro-interactions built around neatr's real setup flow and booking widget.",
};

export default function V32Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
