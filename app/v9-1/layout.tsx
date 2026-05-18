import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neaterops — Stop being the dispatcher. Start being the owner.",
  description: "neaterops handles scheduling, dispatch, conflicts, and follow-ups automatically — so you can stop running the software and start running the business.",
};
export default function V91Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
