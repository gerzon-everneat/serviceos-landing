import type { MetadataRoute } from "next";

// One canonical page (/) — the /v* directories are design experiments and the
// /booking page is a demo; keep crawlers on the real thing. AI crawlers
// (GPTBot, ClaudeBot, PerplexityBot, ...) are deliberately allowed: visibility
// in AI answers matters more to a growth-stage brand than training opt-outs.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/v1", "/v2", "/v3", "/v4", "/v5", "/v6", "/v7", "/v8", "/v9", "/versions", "/booking"],
      },
    ],
    sitemap: "https://www.neatr.ai/sitemap.xml",
  };
}
