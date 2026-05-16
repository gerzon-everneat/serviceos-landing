import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ServiceOS — Stop being the dispatcher. Start being the owner.",
  description: "ServiceOS handles scheduling, dispatch, conflicts, and follow-ups automatically — so you can stop running the software and start running the business.",
};
export default function V91Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
