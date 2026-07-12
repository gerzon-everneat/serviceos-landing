import type { MetadataRoute } from "next";

// Only the canonical page. Version experiments (/v*) are intentionally
// excluded — never list non-canonical URLs in the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.neatr.ai",
      lastModified: new Date("2026-07-12"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
