import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Before and after.",
  description: "See what running a service business looks like before neatr.ai, and after.",
};
export default function V19Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
