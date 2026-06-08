import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — We know you've tried software before.",
  description: "Most service business software is built for accountants. neatr.ai is built for field crews.",
};
export default function V25Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
