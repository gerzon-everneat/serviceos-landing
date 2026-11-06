import Link from "next/link";
import type { Metadata } from "next";
import InfoPage, { Section } from "../../components/InfoPage";

/* Google Play account-deletion page (support.google.com/googleplay/android-developer/answer/13327111):
   names the app, gives prominent steps, says what is deleted and what is kept and for how long.
   Deletion is per business (owner 11-06): there is no Neatr-wide customer account. */

export const metadata: Metadata = {
  title: "Delete your account | Neatr",
  description: "How to request deletion of your account and data in the Neatr app.",
  alternates: { canonical: "https://www.neatr.ai/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <InfoPage
      title="Delete your Neatr account"
      intro={
        <p className="m-0">
          This page explains how to request deletion of your account and data in the <strong>Neatr</strong> app.
          In Neatr, your account details are held by each business you book with, so a deletion request goes to that
          business and covers your data with that business only. If you book with more than one business, request
          deletion from each one.
        </p>
      }
    >
      <Section title="In the app">
        <ol>
          <li>Open the Neatr app and sign in.</li>
          <li>
            Go to <strong>Account</strong> → <strong>Delete account</strong>.
          </li>
          <li>
            Tap <strong>Request account deletion</strong>. This opens a message to the business with the request
            already written. Send it.
          </li>
          <li>The business replies in the same conversation once your data has been deleted.</li>
        </ol>
      </Section>

      <Section title="Without the app">
        <ul>
          <li>Contact the business you book with and ask them to delete your account, or</li>
          <li>
            email <a href="mailto:hello@neatr.ai">hello@neatr.ai</a> from the email address on your account. Tell us
            the name of the business and we will pass your request to them.
          </li>
        </ul>
      </Section>

      <Section title="What is deleted">
        <p>For the business you ask, deletion removes:</p>
        <ul>
          <li>your profile with that business (name, email, phone number);</li>
          <li>the addresses and property details you saved with that business;</li>
          <li>the payment cards saved for that business;</li>
          <li>your booking history with that business, except the records described below.</li>
        </ul>
        <p>Your data with any other business you book with is not affected.</p>
      </Section>

      <Section title="What may be kept, and for how long">
        <p>
          Some records have to be kept for legal, tax and accounting reasons, such as records of past visits and
          payments. Our <a href="https://book.neatr.ai/privacy-policy">privacy policy</a> (section 9, Data retention)
          says booking and account records are kept for at least 6–7 years, and records of privacy requests for at
          least 24 months. Anonymized or aggregated data that does not identify you may be kept.
        </p>
      </Section>

      <Section title="Questions">
        <p>
          Email <a href="mailto:hello@neatr.ai">hello@neatr.ai</a> or see <Link href="/support">Support</Link>.
        </p>
      </Section>
    </InfoPage>
  );
}
