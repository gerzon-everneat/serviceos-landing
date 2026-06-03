import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "neatr.ai — AI-Powered Booking Platform",
  description: "Intelligent dispatch, scheduling, and revenue intelligence for modern service businesses.",
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
