import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Everneat — Your booking system, automated.",
  description: "From online booking to automated team dispatch. Everneat gives home service businesses a complete system that runs itself.",
};
export default function V8Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
