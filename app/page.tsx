import type { Metadata } from "next";
import { BlogBand, BrandsBand, CitiesBand, CtaBand, FaqBand, ProcessBand, ReviewsBand, ServicesBand, WhyBand } from "./components/sections";
import { Hero } from "./components/hero";
import { JsonLdScripts } from "./components/json-ld-scripts";
import { baseNodes, breadcrumbNode, faqNode, graph, itemListNode, serviceNode, webPageNode } from "./lib/json-ld";
import { posts } from "./lib/posts";
import { pageMetadata } from "./lib/seo";
import { services, servicePath } from "./lib/services-data";
import { business, mapEmbedSrc } from "./lib/site";
import { RevealOnScroll } from "./reveal-on-scroll";
import { SiteFooter } from "./site-footer";

const PATH = "/";
const TITLE = "Ремонт на бойлери в София и Пазарджик на адрес | Бойлер-Мен";
const DESCRIPTION =
  "Ремонт на бойлери в София (до 1 час) и Пазарджик (до 2 часа при възможност): течове, липса на топла вода, нагревател, термостат, монтаж. Гаранция за ремонта.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const commonProblems = [
  "Бойлерът не загрява",
  "От уреда капе вода",
  "Топлата вода свършва веднага",
  "Падат предпазителите",
  "Нагревателят е изгорял",
  "Термостатът е неизправен"
];

const FAQ_NOTE =
  "* Проточните и газовите бойлери не влизат в обхвата на услугата. Събота - само по предварителна уговорка и срещу доплащане.";

const faqs = [
  {
    question: "Каква е цената на ремонт на бойлер?",
    answer:
      "Ориентирът за оглед е 20-30 евро. Какво ще струва ремонтът, се знае след диагностиката, защото зависи от повредата и от нужната част."
  },
  {
    question: "Идвате ли спешно?",
    answer:
      "Да. София - до 1 час във всеки район, а за Левски, Орландовци, Суха река, Хаджи Димитър, Гео Милев и Редута - до 30 минути. Пазарджик - до 2 часа при възможност."
  },
  {
    question: "Само в София ли работите?",
    answer:
      "Не. Бойлер-Мен е мобилен сервиз със седалище София и ходи на адрес както във всички квартали на столицата, така и в Пазарджик."
  },
  {
    question: "Кои марки бойлери ремонтирате?",
    answer:
      "Tesy, Eldom, Tedan, Atlantic, Светлю Шишков, Midea, Diplomat, Ariston и други, които се срещат най-често в българските домове."
  },
  {
    question: "Какво не ремонтирате?",
    answer:
      "Услугата е насочена към обикновените електрически бойлери със съд. Проточни и газови уреди не поемаме."
  },
  {
    question: "Работите ли в събота?",
    answer:
      "Да, но само след предварителна уговорка и с цена, по-висока от обичайната."
  },
  {
    question: "Да ремонтирам ли стария бойлер, или да купя нов?",
    answer:
      "Сравнително младите бойлери почти винаги си струва да се ремонтират. Ако уредът е стар и се разваля често, техникът може да ви посъветва да вземете нов."
  }
];

export default function Home() {
  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION }),
      breadcrumbNode(PATH, [{ name: "Начало", path: "/" }]),
      serviceNode({
        path: PATH,
        name: "Ремонт на бойлери в София и Пазарджик",
        serviceType: "Ремонт, монтаж и профилактика на бойлери",
        description: DESCRIPTION
      }),
      itemListNode(
        PATH,
        "Услуги за бойлери",
        services.map((service) => ({ name: service.title, path: servicePath(service.slug) }))
      ),
      faqNode(PATH, faqs)
    ])
  ];

  return (
    <>
      <Hero
        eyebrow="Сервиз на адрес · София и Пазарджик"
        line="Ремонт на бойлери"
        accent="в София и Пазарджик"
        sub="с бърза реакция на адрес"
        text={
          <>
            Имате теч, студена вода или бойлер, който изключва тока? Техник на Бойлер-Мен идва до дома ви в
            София или Пазарджик, открива повредата и в повечето случаи я отстранява още при първата визита,
            независимо от марката на уреда.
          </>
        }
        usp={[
          "София - до 1 час, Пазарджик - до 2 часа при възможност",
          "Писмен протокол и гаранция върху сменената част",
          "Освен ремонт - монтаж, профилактика и подмяна на бойлер"
        ]}
        signals={[
          { value: "до 1 час", label: "реакция за София", icon: "clock" },
          { value: "до 2 часа", label: "при възможност за Пазарджик", icon: "clock" },
          { value: "6 месеца", label: "гаранция за ремонтираната част", icon: "shield" }
        ]}
      />

      <main id="main-content">
        <ServicesBand
          afterHero
          heading="Всичко за бойлера, без да го носите никъде"
          lead="Сервизът идва на адрес в София и Пазарджик, диагностицира проблема и предлага реално решение: ремонт, профилактика, монтаж или подмяна, когато ремонтът вече не е разумен."
          items={services}
          allLink
        />

        <WhyBand
          heading="Когато топлата вода спре, имате към кого да се обърнете"
          lead="Повредата не избира удобен час, затова отговаряме ясно, тръгваме бързо и поправяме на място, без излишни усложнения."
          problems={commonProblems}
          note="След всяка работа ви оставяме протокол, с който се ползва гаранцията."
        />

        <BrandsBand />
        <ProcessBand />
        <ReviewsBand />
        <CitiesBand variant="home" />
        <FaqBand faqs={faqs} note={FAQ_NOTE} />
        <BlogBand posts={posts.slice(0, 3)} />
        <CtaBand
          eyebrow="Топлата вода може да се върне днес"
          heading="Опишете проблема и запазете посещение"
          text="Обадете се директно или изпратете снимки във Viber. Ще получите насока, ориентир за цена и удобен час."
        />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
