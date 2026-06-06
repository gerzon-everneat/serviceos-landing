import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Early Access · First 500 Teams",
  description: "Be among the first 500 teams on neatr.ai. Personal onboarding, locked pricing, and a direct line to the team before public launch.",
};
export default function V17Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
