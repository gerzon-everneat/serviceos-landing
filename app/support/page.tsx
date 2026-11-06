import Link from "next/link";
import type { Metadata } from "next";
import InfoPage, { Section } from "../../components/InfoPage";

export const metadata: Metadata = {
  title: "Support | Neatr",
  description: "Help with the Neatr app: reach the business you booked with, contact Neatr, privacy, and account deletion.",
  alternates: { canonical: "https://www.neatr.ai/support" },
};

export default function SupportPage() {
  return (
    <InfoPage
      title="Support"
      intro={
        <p className="m-0">
          Neatr is the booking app that service businesses use to take bookings, send updates and get paid. Each
          business runs its own bookings in Neatr, so the quickest help usually comes from the business you booked with.
        </p>
      }
    >
      <Section title="Questions about a booking">
        <p>
          For anything about a visit (times, changes, cancellations, prices, payments, or the work itself), contact
          the business you booked with. In the app, open <strong>Messages</strong> and write to them; they reply in
          the same conversation.
        </p>
      </Section>

      <Section title="Contact Neatr">
        <p>
          If you can&apos;t reach the business, or something in the app is not working, email us at{" "}
          <a href="mailto:hello@neatr.ai">hello@neatr.ai</a>. Businesses using Neatr can reach us at the same address.
          Please include the name of the business and the email you use in the app.
        </p>
      </Section>

      <Section title="Delete your account">
        <p>
          Your account details are held by each business you book with, and deletion is requested from that business.
          See <Link href="/delete-account">how to delete your account</Link>.
        </p>
      </Section>

      <Section title="Privacy">
        <p>
          Read our <a href="https://book.neatr.ai/privacy-policy">privacy policy</a>.
        </p>
      </Section>
    </InfoPage>
  );
}
