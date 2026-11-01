import type { MetadataRoute } from "next";
import { brandPath, brands } from "./lib/brands";
import { cityList } from "./lib/cities";
import { posts, postPath } from "./lib/posts";
import { services, servicePath } from "./lib/services-data";
import { CONTENT_UPDATED, absoluteUrl } from "./lib/site";

/** lastModified uses fixed content dates (not "now"), so crawlers only see real changes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(CONTENT_UPDATED);

  return [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    ...cityList.map((city) => ({
      url: absoluteUrl(city.path),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.95
    })),
    { url: absoluteUrl("/uslugi/"), lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    ...services.map((service) => ({
      url: absoluteUrl(servicePath(service.slug)),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.85
    })),
    { url: absoluteUrl("/marki/"), lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    ...brands.map((brand) => ({
      url: absoluteUrl(brandPath(brand.slug)),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    { url: absoluteUrl("/za-nas/"), lastModified: updated, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/kontakti/"), lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/blog/"), lastModified: updated, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((post) => ({
      url: absoluteUrl(postPath(post.slug)),
      lastModified: new Date(post.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
