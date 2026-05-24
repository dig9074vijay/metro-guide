import { MetadataRoute } from "next";

const APP_URL = "https://delhimetroguide.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${APP_URL}/contact`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${APP_URL}/privacy`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
