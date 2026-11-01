import type { Metadata } from "next";
import { OG_IMAGE_SRC, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

type PageMeta = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Consistent per-page metadata: self-canonical, Open Graph, Twitter. */
export function pageMetadata({ path, title, description, type = "website", publishedTime, modifiedTime }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const image = { url: `${SITE_URL}${OG_IMAGE_SRC}`, width: 1200, height: 630, alt: title };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "bg_BG",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url]
    }
  };
}
