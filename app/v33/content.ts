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
    a: "neatr is free while we finalize plans. We're onboarding businesses personally right now — request early access with your email and business details, and we'll set you up. For larger teams we offer custom enterprise pricing at hello@neatr.ai.",
  },
];

export const VIDEOS = [
  {
    key: "setup",
    label: "Set up operations",
    time: "1:42",
    name: "Set up a cleaning business on neatr in 1:42",
    description: "Unedited screen recording: configuring categories, spaces, services, pricing tiers, and business branding in the neatr admin.",
    src: "https://cdn.neatr.ai/assets/videos/02-operations-setup.mp4",
    poster: "https://cdn.neatr.ai/assets/videos/poster-02.jpg",
    duration: "PT1M42S",
  },
  {
    key: "form-builder",
    label: "Customize your form",
    time: "0:49",
    name: "Customize your booking form on neatr in 49 seconds",
    description: "Unedited screen recording: an owner adds a custom question to the booking form, drags it into place, and publishes — then a customer answers it on the live form and the quote updates.",
    src: "https://cdn.neatr.ai/assets/videos/04-form-builder.mp4",
    poster: "https://cdn.neatr.ai/assets/videos/poster-04.jpg",
    duration: "PT49S",
  },
  {
    key: "booking",
    label: "Customer books",
    time: "1:04",
    name: "A customer books a cleaning on neatr in 1:04",
    description: "Unedited screen recording: a guest customer checks their ZIP, picks a service and arrival window, pays, and gets a confirmed booking.",
    src: "https://cdn.neatr.ai/assets/videos/03-customer-booking.mp4",
    poster: "https://cdn.neatr.ai/assets/videos/poster-03.jpg",
    duration: "PT1M4S",
  },
];
