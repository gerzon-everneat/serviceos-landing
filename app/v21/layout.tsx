import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Your business dashboard.",
  description: "See your schedule, team, and revenue in one place. neatr.ai is the operating system for service businesses.",
};
export default function V21Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
