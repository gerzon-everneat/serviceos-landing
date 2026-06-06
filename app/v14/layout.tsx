import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Your business. On autopilot.",
  description: "neatr.ai is the complete operating system for service businesses. Booking, dispatch, payments, and follow-ups — automated end to end.",
};
export default function V14Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
