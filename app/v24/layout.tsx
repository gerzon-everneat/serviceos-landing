import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "neatr.ai — You built this business. Now let it run.",
  description: "See what a Tuesday looks like when neatr.ai handles your bookings, dispatch, and invoicing automatically.",
};
export default function V24Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
