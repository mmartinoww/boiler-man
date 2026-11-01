import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompactHero } from "../../components/hero";
import { JsonLdScripts } from "../../components/json-ld-scripts";
import { CtaBand, FaqBand, ServicesBand } from "../../components/sections";
import { IconArrow, IconPhone } from "../../icons";
import { brandPath, brands, getBrand } from "../../lib/brands";
import { cityList } from "../../lib/cities";
import { baseNodes, breadcrumbNode, faqNode, graph, serviceNode, webPageNode } from "../../lib/json-ld";
import { pageMetadata } from "../../lib/seo";
import { getService } from "../../lib/services-data";
import { business, mapEmbedSrc } from "../../lib/site";
import { RevealOnScroll } from "../../reveal-on-scroll";
import { SiteFooter } from "../../site-footer";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return pageMetadata({ path: brandPath(slug), title: brand.metaTitle, description: brand.metaDescription });
}

export default async function BrandPageRoute({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const path = brandPath(brand.slug);
  const crumbs = [
    { name: "Начало", path: "/" },
    { name: "Марки", path: "/marki/" },
    { name: brand.name, path }
  ];
  const related = brand.related.map((relatedSlug) => getService(relatedSlug)).filter((item) => item !== undefined);

  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path, name: brand.metaTitle, description: brand.metaDescription }),
      breadcrumbNode(path, crumbs),
      serviceNode({
        path,
        name: brand.h1,
        serviceType: `Ремонт на бойлери ${brand.name}`,
        description: brand.metaDescription
      }),
      faqNode(path, brand.faqs)
    ])
  ];

  return (
    <>
      <CompactHero crumbs={crumbs} eyebrow="Марка" title={brand.h1} text={brand.heroText} />

      <main id="main-content">
        <section className="band band--ice band--after-hero" aria-labelledby="brand-heading">
          <div className="band__inner content-layout">
            <article className="prose">
              <h2 id="brand-heading">{`${brand.name}: ремонт на адрес в София и Пазарджик`}</h2>
              {brand.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <h2>{brand.faultsHeading}</h2>
              <p>{brand.faultsText}</p>

              <h2>{brand.modelHeading}</h2>
              <p>{brand.modelText}</p>
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
              <p>{brand.asideNote}</p>
              <a className="button button--primary" href={business.phoneHref} aria-label={`Обадете се на ${business.phone}`}>
                <IconPhone />
                {business.phone}
              </a>
            </aside>
          </div>
        </section>

        <FaqBand faqs={brand.faqs} heading={`Въпроси за ${brand.name}`} band="mist" />

        <ServicesBand
          id="related"
          band="ice"
          eyebrow="Свързани услуги"
          heading={`Какво още можем да направим за ${brand.name}`}
          items={related}
          featuredSlug=""
          allLink
          variant="compact"
        />

        <CtaBand eyebrow={brand.cta.eyebrow} heading={brand.cta.heading} text={brand.cta.text} />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
