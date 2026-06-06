import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Bookings in. Jobs dispatched.",
  description: "neatr.ai automates your entire booking pipeline. Customers book, team gets dispatched, payments collected — all without you.",
};
export default function V12Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
