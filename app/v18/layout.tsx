import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Your service business, on autopilot.",
  description: "Bookings, dispatch, and invoicing handled automatically. neatr.ai is the complete operating layer for service businesses.",
};
export default function V18Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
