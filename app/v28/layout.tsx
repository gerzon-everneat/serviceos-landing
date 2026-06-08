import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Built for residential cleaning businesses.",
  description: "From booking to invoice, without a single spreadsheet. Built specifically for cleaning crews.",
};
export default function V28Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
