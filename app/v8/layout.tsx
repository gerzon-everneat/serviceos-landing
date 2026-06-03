import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Your booking system, automated.",
  description: "From online booking to automated team dispatch. neatr.ai gives home service businesses a complete system that runs itself.",
};
export default function V8Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
