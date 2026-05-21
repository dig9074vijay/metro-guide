import { MetadataRoute } from "next";

const APP_URL = "https://delhimetroguide.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
