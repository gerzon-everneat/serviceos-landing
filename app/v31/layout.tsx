import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Live product demo (Attio technique)",
  description:
    "An Attio-style tabbed product demo: the interface is real DOM rebuilt with the site's own design tokens, fed fake data and driven by CSS transitions — not a screen recording.",
};
export default function V31Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
