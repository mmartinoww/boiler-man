import type { MetadataRoute } from "next";
import { BUSINESS_FULL_NAME, SITE_NAME } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_FULL_NAME,
    short_name: SITE_NAME,
    description: "Ремонт, монтаж и профилактика на бойлери в София и Пазарджик.",
    start_url: "/",
    display: "standalone",
    background_color: "#061225",
    theme_color: "#07182f",
    lang: "bg"
  };
}
