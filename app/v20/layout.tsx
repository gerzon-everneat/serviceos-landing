import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Sound familiar?",
  description: "If you're still managing bookings by phone, text, or spreadsheet — this is for you.",
};
export default function V20Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
