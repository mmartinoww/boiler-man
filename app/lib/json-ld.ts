import { cityList, type City } from "./cities";
import type { Faq, ServicePage } from "./services-data";
import { services, servicePath } from "./services-data";
import type { Post } from "./posts";
import { postPath } from "./posts";
import {
  BUSINESS_ID,
  CONTENT_UPDATED,
  OG_IMAGE_SRC,
  PHONE_E164,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  business
} from "./site";

export type JsonLdObject = Record<string, unknown>;

const cityNode = (city: City): JsonLdObject => ({
  "@type": "City",
  name: city.slug === "sofia" ? "Sofia" : "Pazardzhik",
  alternateName: city.name,
  sameAs: city.sameAs
});

export const areaServed = cityList.map(cityNode);

/** Wrap nodes in a single @graph so every page ships one connected entity graph. */
export function graph(nodes: JsonLdObject[]): JsonLdObject {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * LocalBusiness as a service-area business: no street address is published (none exists),
 * only the home locality, plus the cities actually served.
 */
export function businessNode(): JsonLdObject {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": BUSINESS_ID,
    name: business.fullName,
    alternateName: business.name,
    description: business.description,
    url: `${SITE_URL}/`,
    telephone: PHONE_E164,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/identity/BOILER-MAN-LOGO-IMG.svg` },
    image: `${SITE_URL}${OG_IMAGE_SRC}`,
    priceRange: "€€",
    currenciesAccepted: "EUR, BGN",
    paymentAccepted: "Брой, банков превод",
    address: {
      "@type": "PostalAddress",
      addressLocality: "София",
      addressCountry: "BG"
    },
    areaServed,
    knowsAbout: [
      "Ремонт на електрически бойлери",
      "Смяна на нагревател на бойлер",
      "Смяна на термостат на бойлер",
      "Монтаж и демонтаж на бойлери",
      "Профилактика на бойлери"
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "19:00"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      contactType: "customer service",
      areaServed: "BG",
      availableLanguage: "bg"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги за бойлери в София и Пазарджик",
      itemListElement: services.map((service, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: absoluteUrl(servicePath(service.slug)),
          provider: { "@id": BUSINESS_ID },
          areaServed
        }
      }))
    }
  };
}

export function websiteNode(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: business.name,
    description: business.description,
    inLanguage: "bg-BG",
    publisher: { "@id": BUSINESS_ID }
  };
}

export function webPageNode(input: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  datePublished?: string;
  dateModified?: string;
}): JsonLdObject {
  const url = absoluteUrl(input.path);
  return {
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "bg-BG",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? CONTENT_UPDATED
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(path: string, crumbs: Crumb[]): JsonLdObject {
  const url = absoluteUrl(path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path)
    }))
  };
}

export function serviceNode(input: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  cities?: City[];
}): JsonLdObject {
  const url = absoluteUrl(input.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: (input.cities ?? cityList).map(cityNode),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        description: "Диагностиката обикновено започва от 20-30 евро. Цената зависи от повредата, нужните части и достъпа до уреда."
      }
    }
  };
}

export function faqNode(path: string, faqs: Faq[]): JsonLdObject {
  const url = absoluteUrl(path);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}

export function articleNode(post: Post): JsonLdObject {
  const url = absoluteUrl(postPath(post.slug));
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    url,
    inLanguage: "bg-BG",
    datePublished: post.published,
    dateModified: post.updated,
    image: `${SITE_URL}${OG_IMAGE_SRC}`,
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
    isPartOf: { "@id": WEBSITE_ID }
  };
}

export function itemListNode(path: string, name: string, items: { name: string; path: string }[]): JsonLdObject {
  const url = absoluteUrl(path);
  return {
    "@type": "ItemList",
    "@id": `${url}#list`,
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path)
    }))
  };
}

/** Nodes shared by every page: the entity itself plus the site. */
export function baseNodes(): JsonLdObject[] {
  return [businessNode(), websiteNode()];
}

export function serviceSchemaFor(service: ServicePage): JsonLdObject {
  return serviceNode({
    path: servicePath(service.slug),
    name: service.h1,
    serviceType: service.title,
    description: service.metaDescription
  });
}
