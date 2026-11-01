import type { Metadata } from "next";
import Link from "next/link";
import { CompactHero } from "../components/hero";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { CtaBand } from "../components/sections";
import { IconArrow } from "../icons";
import { brandPath, brands } from "../lib/brands";
import { baseNodes, breadcrumbNode, graph, itemListNode, webPageNode } from "../lib/json-ld";
import { pageMetadata } from "../lib/seo";
import { business, mapEmbedSrc } from "../lib/site";
import { RevealOnScroll } from "../reveal-on-scroll";
import { SiteFooter } from "../site-footer";

const PATH = "/marki/";
const TITLE = "Ремонт на бойлери по марки: Tesy, Eldom, Ariston и други | Бойлер-Мен";
const DESCRIPTION =
  "Ремонтираме електрически бойлери Tesy, Eldom, Tedan, Atlantic, Светлю Шишков, Midea, Diplomat и Ariston на адрес в София и Пазарджик. Изберете вашата марка.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const crumbs = [
  { name: "Начало", path: "/" },
  { name: "Марки", path: PATH }
];

export default function BrandsIndexPage() {
  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
      breadcrumbNode(PATH, crumbs),
      itemListNode(
        PATH,
        "Марки бойлери, които ремонтираме",
        brands.map((brand) => ({ name: brand.name, path: brandPath(brand.slug) }))
      )
    ])
  ];

  return (
    <>
      <CompactHero
        crumbs={crumbs}
        eyebrow="Марки"
        title="Ремонт на бойлери по марки"
        text="Няма значение дали уредът е български или внесен - щом е електрически бойлер с резервоар, можем да го диагностицираме и поправим на адрес."
      />

      <main id="main-content">
        <section className="band band--ice band--after-hero" id="brands" aria-labelledby="brands-index-heading">
          <div className="band__inner">
            <div className="section-heading section-heading--stacked">
              <p className="eyebrow">Марки</p>
              <h2 id="brands-index-heading">Намерете вашата марка</h2>
              <p className="section-heading__lead">
                Всяка страница обяснява как подхождаме към съответните уреди и какво да ни пратите, за да подготвим частите.
                Ако не виждате вашата марка, обадете се - често можем да помогнем и с нея.
              </p>
            </div>
            <div className="services-grid">
              {brands.map((brand) => (
                <article className="service-card" key={brand.slug}>
                  <h3>
                    <Link href={brandPath(brand.slug)}>{brand.name}</Link>
                  </h3>
                  <p>{brand.indexText}</p>
                  <span className="service-card__more" aria-hidden="true">
                    Към марката <IconArrow size={16} />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          eyebrow="Не откривате марката си?"
          heading="Пратете снимка на табелката"
          text="Дори името да не е в списъка, ще разгледаме модела и ще кажем дали можем да поемем ремонта."
        />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
