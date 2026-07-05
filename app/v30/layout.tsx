import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — Operations, automated.",
  description:
    "neatr.ai is the AI ops agent for service businesses — it answers every call 24/7, books and dispatches the job, keeps crews stocked and shipped, and collects payment. The whole operation runs itself.",
};
export default function V30Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
