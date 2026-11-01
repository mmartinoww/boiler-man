import type { Metadata } from "next";
import { Hero } from "./hero";
import { JsonLdScripts } from "./json-ld-scripts";
import {
  CoverageBand,
  CrossCityBand,
  CtaBand,
  ExamplesBand,
  FaqBand,
  IntroBand,
  LocalBand,
  ProcessBand,
  ServicesBand,
  WhyBand
} from "./sections";
import { cities, type CitySlug } from "../lib/cities";
import { examplesForCity } from "../lib/examples";
import { baseNodes, breadcrumbNode, faqNode, graph, itemListNode, serviceNode, webPageNode } from "../lib/json-ld";
import { pageMetadata } from "../lib/seo";
import { services, servicePath } from "../lib/services-data";
import { business } from "../lib/site";
import { RevealOnScroll } from "../reveal-on-scroll";
import { SiteFooter } from "../site-footer";

export function cityMetadata(slug: CitySlug): Metadata {
  const city = cities[slug];
  return pageMetadata({ path: city.path, title: city.metaTitle, description: city.metaDescription });
}

export function CityPage({ slug }: { slug: CitySlug }) {
  const city = cities[slug];
  const other = cities[city.otherSlug];
  const crumbs = [
    { name: "Начало", path: "/" },
    { name: `Ремонт на бойлери ${city.inName}`, path: city.path }
  ];

  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path: city.path, name: city.metaTitle, description: city.metaDescription }),
      breadcrumbNode(city.path, crumbs),
      serviceNode({
        path: city.path,
        name: `Ремонт на бойлери ${city.inName}`,
        serviceType: "Ремонт, монтаж и профилактика на бойлери",
        description: city.metaDescription,
        cities: [city]
      }),
      itemListNode(
        city.path,
        `Услуги за бойлери ${city.inName}`,
        services.map((service) => ({ name: service.title, path: servicePath(service.slug) }))
      ),
      faqNode(city.path, city.faqs)
    ])
  ];

  return (
    <>
      <Hero
        crumbs={crumbs}
        eyebrow={city.eyebrow}
        line={city.heroLine}
        accent={city.heroAccent}
        sub={city.heroSub}
        text={city.heroText}
        usp={city.usp}
        signals={city.signals}
      />

      <main id="main-content">
        <IntroBand city={city} band="ice" />
        <ServicesBand
          id="services"
          band="mist"
          heading={`Услуги за бойлери ${city.inName}`}
          lead={city.servicesLead}
          items={services}
          allLink
          variant={slug}
        />
        <WhyBand
          heading={city.whyHeading}
          lead={city.whyLead}
          problems={city.problems}
          note={city.whyNote}
        />
        <LocalBand city={city} band="ice" />
        <ExamplesBand city={city} items={examplesForCity(slug)} band="mist" />
        <ProcessBand band="ice" heading={city.processHeading} lead={city.processLead} steps={city.processSteps} />
        <CoverageBand city={city} band="mist" />
        <FaqBand faqs={city.faqs} heading={`Въпроси за ремонт на бойлери ${city.inName}`} band="ice" note={city.faqNote} />
        <CrossCityBand city={other} band="mist" />
        <CtaBand eyebrow={city.cta.eyebrow} heading={city.cta.heading} text={city.cta.text} />
      </main>

      <SiteFooter business={business} mapEmbedSrc={city.mapSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
