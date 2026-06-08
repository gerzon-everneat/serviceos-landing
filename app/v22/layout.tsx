import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Book, dispatch, invoice. In your pocket.",
  description: "The booking and operations app for field service businesses. Built for how you actually work.",
};
export default function V22Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
