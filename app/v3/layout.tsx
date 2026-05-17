import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everneat — AI-Powered Booking Platform",
  description: "Intelligent dispatch, conflict resolution, and revenue intelligence for modern service businesses.",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <div className="theme-dark">{children}</div>;
}
