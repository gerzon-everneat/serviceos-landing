export const SITE = "https://www.neatr.ai";
export const UPLOAD_DATE = "2026-07-05";

/* One source of truth: the visible page and the JSON-LD must say the same thing. */
export const FAQ = [
  {
    q: "What is neatr?",
    a: "neatr is online booking software for cleaning and home-service businesses. It gives you a customer booking page, a dispatch board for your team, automated notifications, and payments — in one system.",
  },
  {
    q: "How long does it take to set up neatr?",
    a: "The core setup — categories, spaces, services, pricing, and branding — takes minutes, not weeks. The unedited setup recording on this page runs 1 minute 45 seconds from empty account to a configured business.",
  },
  {
    q: "Can customers book without creating an account?",
    a: "Yes. Customers book as guests: they enter a ZIP code, pick a service and an arrival window, and pay — no account required. The full guest booking in the recording takes 1 minute 7 seconds.",
  },
  {
    q: "How do arrival windows work?",
    a: "Instead of exact times, customers pick a two-hour arrival window. neatr only opens windows your team can actually make, based on each provider's real availability, travel buffers, and existing jobs.",
  },
  {
    q: "Does neatr charge my customers when they book?",
    a: 'No. The card is verified and saved at booking with no charge — you charge after the job is done. Customers see "No payment due today" at checkout.',
  },
  {
    q: "How much does neatr cost?",
    a: "neatr is free while we finalize plans — you can put a booking page live today at no cost. Paid plans are coming soon, and for larger teams we offer custom enterprise pricing. Get in touch at hello@neatr.ai for a quote.",
  },
];

export const VIDEOS = [
  {
    key: "signup",
    label: "Sign up",
    time: "0:22",
    name: "Sign up for neatr in 22 seconds",
    description: "Unedited screen recording: creating a neatr account with an email and one-time code, landing in a live admin dashboard.",
    src: "https://cdn.neatr.ai/videos/01-tenant-signup.mp4",
    poster: "https://cdn.neatr.ai/videos/poster-01.jpg",
    duration: "PT22S",
  },
  {
    key: "setup",
    label: "Set up operations",
    time: "1:45",
    name: "Set up a cleaning business on neatr in 1:45",
    description: "Unedited screen recording: configuring categories, spaces, services, pricing tiers, and business branding in the neatr admin.",
    src: "https://cdn.neatr.ai/videos/02-operations-setup.mp4",
    poster: "https://cdn.neatr.ai/videos/poster-02.jpg",
    duration: "PT1M45S",
  },
  {
    key: "booking",
    label: "Customer books",
    time: "1:07",
    name: "A customer books a cleaning on neatr in 1:07",
    description: "Unedited screen recording: a guest customer checks their ZIP, picks a service and arrival window, pays, and gets a confirmed booking.",
    src: "https://cdn.neatr.ai/videos/03-customer-booking.mp4",
    poster: "https://cdn.neatr.ai/videos/poster-03.jpg",
    duration: "PT1M7S",
  },
];
