import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Your customers book. Your team shows up.",
  description: "neatr.ai handles the full cycle — booking, dispatch, and invoicing — so you can run more jobs without running yourself into the ground.",
};
export default function V16Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
