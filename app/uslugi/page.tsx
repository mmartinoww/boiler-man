import type { Metadata } from "next";
import { CompactHero } from "../components/hero";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { CitiesBand, CtaBand, ServicesBand } from "../components/sections";
import { baseNodes, breadcrumbNode, graph, itemListNode, webPageNode } from "../lib/json-ld";
import { pageMetadata } from "../lib/seo";
import { services, servicePath } from "../lib/services-data";
import { business, mapEmbedSrc } from "../lib/site";
import { RevealOnScroll } from "../reveal-on-scroll";
import { SiteFooter } from "../site-footer";

const PATH = "/uslugi/";
const TITLE = "Услуги за бойлери в София и Пазарджик | Бойлер-Мен";
const DESCRIPTION =
  "Всички услуги за електрически бойлери на адрес в София и Пазарджик: ремонт, смяна на нагревател и термостат, течове, монтаж, профилактика, доставка.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const crumbs = [
  { name: "Начало", path: "/" },
  { name: "Услуги", path: PATH }
];

export default function ServicesIndexPage() {
  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
      breadcrumbNode(PATH, crumbs),
      itemListNode(
        PATH,
        "Услуги за бойлери в София и Пазарджик",
        services.map((service) => ({ name: service.title, path: servicePath(service.slug) }))
      )
    ])
  ];

  return (
    <>
      <CompactHero
        crumbs={crumbs}
        eyebrow="Услуги"
        title="Услуги за бойлери в София и Пазарджик"
        text="Ремонт, смяна на нагревател и термостат, течове, монтаж, профилактика и доставка - на адрес в София (до 1 час) и Пазарджик (до 2 часа при възможност)."
      />

      <main id="main-content">
        <ServicesBand
          afterHero
          heading="Какво правим за вашия бойлер"
          lead="Изберете услугата, за да видите какво включва, кога е нужна и как протича посещението."
          items={services}
          variant="index"
        />
        <CitiesBand variant="services" />
        <CtaBand
          eyebrow="Не сте сигурни коя услуга ви трябва?"
          heading="Кажете ни симптомите - ние ще определим услугата"
          text="Разкажете какво прави бойлерът и ще ви насочим към подходящата стъпка още преди посещението."
        />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
