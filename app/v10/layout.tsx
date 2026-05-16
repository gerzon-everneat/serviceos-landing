import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ServiceOS — Bookings in. Jobs out. You grow.",
  description: "AI-powered booking and dispatch for cleaning, maintenance & field service businesses. Join the waitlist for founding-member access.",
};
export default function V10Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
