import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — The easiest way to run your service business",
  description: "Online booking, auto-dispatch, and customer follow-ups — all in one place. Built for cleaning, maintenance, and field service businesses.",
};
export default function V13Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
