import Link from "next/link";
import type { Metadata } from "next";
import InfoPage, { Section } from "../../components/InfoPage";

/* Google Play account-deletion page (support.google.com/googleplay/android-developer/answer/13327111):
   names the app and developer, gives prominent request steps, says what is deleted and what is kept
   and for how long. Deletion is per business (owner 11-06): there is no Neatr-wide customer account. */

export const metadata: Metadata = {
  title: "Delete your account | Neatr",
  description: "How to request deletion of your account and personal data in Neatr: Book & manage cleaning.",
  alternates: { canonical: "https://www.neatr.ai/delete-account" },
};

const MAILTO = "mailto:hello@neatr.ai?subject=Account%20deletion%20request";
const POLICY = "https://book.neatr.ai/privacy-policy";

export default function DeleteAccountPage() {
  return (
    <InfoPage
      title="Delete your account"
      intro={
        <p className="m-0">
          How to request deletion of your account and personal data in{" "}
          <strong>Neatr: Book &amp; manage cleaning</strong>, the app by Neatlist LLC. Your account is held by each
          business you book with, so you ask that business to delete it.
        </p>
      }
    >
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#E7E6E1] bg-white p-5">
          <h2 className="m-0 text-[17px] font-semibold">In the app</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[#0A0A0A]/75">
            <li>Open the app and sign in.</li>
            <li>
              Go to <strong>Account</strong> → <strong>Delete account</strong>.
            </li>
            <li>
              Tap <strong>Request account deletion</strong>. A message to the business opens with the request
              already written. Send it.
            </li>
            <li>The business confirms in the same conversation once it&apos;s done (within 30 days).</li>
          </ol>
        </div>
        <div className="rounded-2xl border border-[#E7E6E1] bg-white p-5">
          <h2 className="m-0 text-[17px] font-semibold">Without the app</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#0A0A0A]/75">
            Contact the business you book with, or email us from the address on your account. Tell us the name of
            the business and we will pass your request to them.
          </p>
          <a
            href={MAILTO}
            className="mt-4 inline-flex items-center rounded-full bg-[#0A0A0A] px-5 py-2.5 text-[14px] font-semibold text-white no-underline hover:bg-[#0A0A0A]/85"
          >
            Email hello@neatr.ai
          </a>
        </div>
      </div>

      <Section title="What happens">
        <p>
          The business you choose removes your access and erases the personal details it holds about you, within 30
          days of your request:
        </p>
        <ul>
          <li>your profile (name, phone number, email);</li>
          <li>your saved addresses and property notes;</li>
          <li>the payment cards saved with that business.</li>
        </ul>
      </Section>

      <Section title="What is kept, and for how long">
        <p>
          Booking, invoice and payment records the business must keep for tax and accounting are kept, with your
          contact details removed, for the period in our <a href={POLICY}>privacy policy</a>. Section 9 (Data
          retention) says booking and account records are kept for &ldquo;at least 6–7 years&rdquo;.
        </p>
      </Section>

      <Section title="Each business is separate">
        <p>
          A request covers only the business you send it to. If you book with other businesses, they keep your
          account until you ask them too.
        </p>
      </Section>

      <Section title="Questions">
        <p>
          Email <a href={MAILTO}>hello@neatr.ai</a> or see <Link href="/support">Support</Link>.
        </p>
      </Section>
    </InfoPage>
  );
}
