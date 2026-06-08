import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Watch what happens when a customer books.",
  description: "Automated bookings, dispatch, and invoicing for field service businesses. See it in motion.",
};
export default function V23Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
