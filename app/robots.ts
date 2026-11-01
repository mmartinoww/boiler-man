import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/**
 * Everything public is crawlable, including search/answer crawlers of AI assistants
 * (OAI-SearchBot, PerplexityBot, Claude-SearchBot). The default rule already allows them;
 * they are listed explicitly so the intent is documented.
 * Decide separately whether to allow model-training crawlers (GPTBot, Google-Extended, CCBot).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["OAI-SearchBot", "PerplexityBot", "Claude-SearchBot", "ChatGPT-User"], allow: "/" }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
