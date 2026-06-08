import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — No contract. No upfront. Just results.",
  description: "You pay nothing until a job is done. That's the entire business model.",
};
export default function V26Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
