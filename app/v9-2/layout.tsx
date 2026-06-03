import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — The booking system that scales with your business.",
  description: "From 3 crews to 30 locations, neatr.ai grows with you — AI dispatch, conflict resolution, and operations that handle themselves at any volume.",
};
export default function V92Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
