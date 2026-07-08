import type { Metadata } from "next";
import { FAQ, SITE, UPLOAD_DATE, VIDEOS } from "./content";

export const metadata: Metadata = {
  title: "neatr — Online Booking Software for Cleaning & Home-Service Businesses",
  description:
    "Take bookings online, dispatch your team, and get paid — with a booking page customers finish in about a minute. Watch real recordings: 22-second sign-up, full setup in 1:45, a live customer booking in 1:07.",
  keywords:
    "online booking software, cleaning business software, home service booking system, service scheduling software, booking page for cleaning company, dispatch software, arrival windows",
  alternates: { canonical: `${SITE}/v34` },
  openGraph: {
    title: "neatr — Bookings in. Jobs dispatched. You just grow.",
    description:
      "Real recordings of the live product: sign up in 22 seconds, set up operations in 1:45, and watch a customer book in 1:07.",
    url: `${SITE}/v34`,
    siteName: "neatr",
    type: "website",
    locale: "en_US",
    images: [{ url: `https://cdn.neatr.ai/assets/videos/poster-03.jpg`, width: 1600, height: 900, alt: "A customer booking a cleaning on neatr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "neatr — Bookings in. Jobs dispatched. You just grow.",
    description: "Real recordings of the live product — from sign-up to a paid booking.",
    images: [`https://cdn.neatr.ai/assets/videos/poster-03.jpg`],
  },
  robots: { index: true, follow: true },
};

export default function V34Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "neatr",
      url: `${SITE}/v34`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Online booking software for cleaning and home-service businesses: booking page, dispatch, notifications, and payments.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to start taking online bookings with neatr",
      totalTime: "PT4M",
      step: VIDEOS.map((v, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: ["Sign up", "Set up your operations", "Share your booking page"][i],
        text: v.description,
        video: {
          "@type": "VideoObject",
          name: v.name,
          description: v.description,
          contentUrl: v.src,
          thumbnailUrl: v.poster,
          duration: v.duration,
          uploadDate: UPLOAD_DATE,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
