/**
 * Single source of truth for the business identity.
 * Change the domain with NEXT_PUBLIC_SITE_URL (or the fallback below) and the phone in PHONE_*.
 * Everything else (metadata, JSON-LD, sitemap, robots, llms.txt, canonical URLs) derives from here.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://boiler-man.net").replace(/\/+$/, "");
export const SITE_NAME = "Бойлер-Мен";
export const BUSINESS_FULL_NAME = "Бойлер-Мен - Ремонт на бойлери в София и Пазарджик";
export const OG_IMAGE_SRC = "/opengraph-image";

/** TODO: replace with the dedicated business number when it is ready (display + tel + Viber + E.164). */
export const PHONE_DISPLAY = "0885 466 663";
export const PHONE_HREF = "tel:+359885466663";
export const PHONE_E164 = "+359885466663";
export const VIBER_HREF = "viber://chat?number=359885466663";

/** Bump this when content changes materially; it feeds sitemap lastmod and schema dateModified. */
export const CONTENT_UPDATED = "2026-11-01";

export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  if (path.startsWith("#")) return path;

  const hashIndex = path.indexOf("#");
  const pathname = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";

  if (pathname === "/") return `/${hash}`;

  return `${pathname.endsWith("/") ? pathname : `${pathname}/`}${hash}`;
}

/** Absolute canonical URL for a site path (always with trailing slash, no hash). */
export function absoluteUrl(path = "/"): string {
  const clean = withTrailingSlash(path.split("#")[0] || "/");
  return `${SITE_URL}${clean}`;
}

export const business = {
  name: SITE_NAME,
  fullName: BUSINESS_FULL_NAME,
  city: "София и Пазарджик",
  area: "Всички квартали на София и Пазарджик",
  addressLine: "Мобилен сервиз за бойлери в София и Пазарджик",
  phone: PHONE_DISPLAY,
  phoneHref: PHONE_HREF,
  viberHref: VIBER_HREF,
  siteUrl: SITE_URL,
  description:
    "Бойлер-Мен извършва ремонт, сервиз, профилактика, монтаж, демонтаж и доставка на бойлери на адрес в София и Пазарджик с бърза реакция и гаранция."
};

/** Hub map: zoomed out so both cities are visible. City pages use their own map (see cities.ts). */
export const mapEmbedSrc =
  "https://www.google.com/maps?q=" + encodeURIComponent("София, България") + "&z=8&hl=bg&output=embed";

export const BUSINESS_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
