import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "neatr.ai v2 — AI-Powered Booking Platform",
  description: "AI dispatch, conflict resolution, and pricing intelligence for service businesses.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-dark">
      {children}
    </div>
  );
}
