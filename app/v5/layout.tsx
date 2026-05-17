import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everneat — AI Booking Intelligence",
  description: "The AI brain behind your field service operation. Dispatch, schedule, and price with machine precision.",
};

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return <div className="theme-dark">{children}</div>;
}
