import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ServiceOS — Bookings in. Jobs out. You grow.",
  description: "The AI-powered booking and dispatch platform for service businesses. Auto-schedule jobs, resolve conflicts, and grow — without the manual work.",
};
export default function V9Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
