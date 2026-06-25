import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Booking, automated.",
  description:
    "neatr.ai develops the booking system home-service businesses actually run on — from the first enquiry to the final invoice. Built in close partnership with the crews who use it.",
};
export default function V29Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
