import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ServiceOS — Online Booking System for Service Businesses",
  description: "ServiceOS is an AI-powered online booking system for cleaning, maintenance & field service businesses. Auto-dispatch jobs, resolve conflicts, collect payments, and follow up with customers — automatically.",
  keywords: "online booking system, booking software, service scheduling software, cleaning business booking, field service booking system, AI dispatch, job dispatch software",
  openGraph: {
    title: "ServiceOS — Online Booking System for Service Businesses",
    description: "Bookings in. Jobs dispatched. You just grow. The complete AI-powered booking system for service businesses.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServiceOS — Online Booking System for Service Businesses",
    description: "Bookings in. Jobs dispatched. You just grow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ServiceOS",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered online booking system for cleaning, maintenance & field service businesses.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "149",
      "priceCurrency": "USD",
      "offerCount": "3",
    },
    "featureList": [
      "AI job dispatch",
      "Conflict resolution",
      "Online booking widget",
      "Customer portal",
      "Staff mobile app",
      "Online payments",
      "Automated notifications",
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
