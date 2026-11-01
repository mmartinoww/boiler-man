import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { ScrollToTop } from "./components/scroll-to-top";
import { BUSINESS_FULL_NAME, OG_IMAGE_SRC, SITE_NAME, SITE_URL } from "./lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap"
});

const defaultTitle = `${SITE_NAME} | Ремонт на бойлери в София и Пазарджик`;
const defaultDescription =
  "Бойлер-Мен предлага ремонт, сервиз, профилактика, монтаж и демонтаж на бойлери в София и Пазарджик с бърза реакция на адрес, гаранция и работа с всички основни марки.";

/**
 * Canonical URLs, titles and descriptions are set per page (see lib/seo.ts), never globally,
 * so no page can accidentally inherit another page's canonical.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`
  },
  description: defaultDescription,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${SITE_URL}${OG_IMAGE_SRC}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_FULL_NAME} - сервиз на адрес`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: "Ремонт, монтаж и профилактика на бойлери в София и Пазарджик с бърза реакция на адрес.",
    images: [`${SITE_URL}${OG_IMAGE_SRC}`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  category: "Ремонт на бойлери",
  // Set GOOGLE_SITE_VERIFICATION in the environment once the Search Console property exists.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07182f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body className={montserrat.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
