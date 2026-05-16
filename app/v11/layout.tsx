import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ServiceOS — Stop answering your own phone.",
  description: "ServiceOS puts a self-booking assistant on your website. Customers pick their own slot, AI answers their questions, and bookings land in your dashboard — without a single call.",
};
export default function V11Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
