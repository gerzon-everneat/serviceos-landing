import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Bookings in. Jobs dispatched.",
  description: "neatr.ai is the simplest way to take bookings for your service business. No training, no setup calls, no confusion.",
};
export default function V15Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
