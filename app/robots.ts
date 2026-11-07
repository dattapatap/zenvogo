import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Search engines and AI answer engines are explicitly welcome (GEO): being crawlable by
 * ChatGPT, Claude, Perplexity, Gemini and Copilot is what lets them cite Zenvogo.
 */
const aiCrawlers = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended",
  "Bingbot", // also powers Copilot
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
