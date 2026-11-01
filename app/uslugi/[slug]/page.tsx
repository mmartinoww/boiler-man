import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompactHero } from "../../components/hero";
import { JsonLdScripts } from "../../components/json-ld-scripts";
import { CtaBand, FaqBand, ProcessBand, ServicesBand } from "../../components/sections";
import { IconArrow, IconCheck, IconPhone } from "../../icons";
import { cityList } from "../../lib/cities";
import { baseNodes, breadcrumbNode, faqNode, graph, serviceNode, webPageNode } from "../../lib/json-ld";
import { pageMetadata } from "../../lib/seo";
import { getService, servicePath, services } from "../../lib/services-data";
import { business, mapEmbedSrc } from "../../lib/site";
import { RevealOnScroll } from "../../reveal-on-scroll";
import { SiteFooter } from "../../site-footer";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ path: servicePath(slug), title: service.metaTitle, description: service.metaDescription });
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = servicePath(service.slug);
  const crumbs = [
    { name: "Начало", path: "/" },
    { name: "Услуги", path: "/uslugi/" },
    { name: service.title, path }
  ];
  const related = service.related.map((relatedSlug) => getService(relatedSlug)).filter((item) => item !== undefined);

  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path, name: service.metaTitle, description: service.metaDescription }),
      breadcrumbNode(path, crumbs),
      serviceNode({
        path,
        name: service.h1,
        serviceType: service.title,
        description: service.metaDescription
      }),
      faqNode(path, service.faqs)
    ])
  ];

  return (
    <>
      <CompactHero crumbs={crumbs} eyebrow="Услуга" title={service.h1} text={service.heroText} />

      <main id="main-content">
        <section className="band band--ice band--after-hero" aria-labelledby="service-heading">
          <div className="band__inner content-layout">
            <article className="prose">
              <h2 id="service-heading">{service.title} на адрес в София и Пазарджик</h2>
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <h2>{service.whenHeading}</h2>
              <ul className="check-list">
                {service.symptoms.map((symptom) => (
                  <li key={symptom}>
                    <IconCheck size={18} />
                    {symptom}
                  </li>
                ))}
              </ul>

              <h2>{service.includedHeading}</h2>
              <ul className="check-list">
                {service.included.map((item) => (
                  <li key={item}>
                    <IconCheck size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <aside className="aside-card coverage-card" aria-label="Къде работим">
              <p className="eyebrow">Къде работим</p>
              <ul className="aside-card__links">
                {cityList.map((city) => (
                  <li key={city.slug}>
                    <Link href={city.path}>
                      Ремонт на бойлери {city.inName}
                      <IconArrow size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
              <p>{service.asideNote}</p>
              <a className="button button--primary" href={business.phoneHref} aria-label={`Обадете се на ${business.phone}`}>
                <IconPhone />
                {business.phone}
              </a>
            </aside>
          </div>
        </section>

        <ProcessBand
          band="mist"
          columns={3}
          steps={service.steps}
          heading={`Стъпки при: ${service.title.toLowerCase()}`}
          lead={null}
        />

        <FaqBand faqs={service.faqs} heading={`Въпроси: ${service.title.toLowerCase()}`} band="ice" />

        <ServicesBand
          id="related"
          band="mist"
          eyebrow="Свързани услуги"
          heading={`Свързано с: ${service.title.toLowerCase()}`}
          items={related}
          featuredSlug=""
          allLink
          variant="compact"
        />

        <CtaBand eyebrow={service.cta.eyebrow} heading={service.cta.heading} text={service.cta.text} />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
