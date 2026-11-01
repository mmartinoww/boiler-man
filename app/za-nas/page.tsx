import type { Metadata } from "next";
import Link from "next/link";
import { CompactHero } from "../components/hero";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { CtaBand } from "../components/sections";
import { IconArrow } from "../icons";
import { cityList } from "../lib/cities";
import { baseNodes, breadcrumbNode, graph, webPageNode } from "../lib/json-ld";
import { pageMetadata } from "../lib/seo";
import { business, mapEmbedSrc } from "../lib/site";
import { RevealOnScroll } from "../reveal-on-scroll";
import { SiteFooter } from "../site-footer";

const PATH = "/za-nas/";
const TITLE = "За нас: мобилен сервиз за бойлери в София и Пазарджик | Бойлер-Мен";
const DESCRIPTION =
  "Бойлер-Мен е мобилен сервиз за електрически бойлери със седалище София. Как работим, какво ремонтираме и какво не, къде идваме и каква гаранция даваме.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const crumbs = [
  { name: "Начало", path: "/" },
  { name: "За нас", path: PATH }
];

const principles = [
  {
    title: "Първо измерваме",
    text: "Преди да сменим каквото и да е, проверяваме с уред коя част е повредена. Така не плащате за подмяна по догадки."
  },
  {
    title: "Казваме истината",
    text: "Ако бойлерът не заслужава поправка, ще го чуете от нас още при огледа, а не след като сте платили за излишна част."
  },
  {
    title: "Оставяме документ",
    text: "След работата получавате протокол за свършеното и 6 месеца гаранция върху ремонтираната част."
  },
  {
    title: "Идваме подготвени",
    text: "Носим най-търсените части и инструменти, за да приключим при първото посещение, когато моделът е стандартен."
  }
];

export default function AboutPage() {
  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "AboutPage" }),
      breadcrumbNode(PATH, crumbs)
    ])
  ];

  return (
    <>
      <CompactHero
        crumbs={crumbs}
        eyebrow="За нас"
        title="Бойлер-Мен: сервиз, който идва при вас"
        text="Електрически бойлери, поправени там, където са монтирани - без носене, без чакане на склад и без излишни части."
      />

      <main id="main-content">
        <section className="band band--ice band--after-hero" aria-labelledby="about-heading">
          <div className="band__inner">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Кои сме</p>
              <h2 id="about-heading">Мобилен сервиз със седалище София</h2>
            </div>
            <div className="prose prose--wide">
              <p>
                Бойлер-Мен е сервиз за електрически бойлери с база в София. Нямаме магазин или сервизна зала, в която да
                ви приемаме; вместо това екипът пътува до клиентите и поправя уреда там, където е закрепен на стената.
              </p>
              <p>
                По този начин обслужваме жителите на София и на Пазарджик. Тръгваме от столицата, а при поръчка за
                Пазарджик уточняваме по телефона пътя и часа, за да знаете какво да очаквате.
              </p>
            </div>
          </div>
        </section>

        <section className="band band--mist" aria-labelledby="principles-heading">
          <div className="band__inner">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Как работим</p>
              <h2 id="principles-heading">Четири неща, на които държим</h2>
            </div>
            <div className="examples-grid">
              {principles.map((item) => (
                <article className="coverage-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band band--ice" aria-labelledby="scope-heading">
          <div className="band__inner">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Обхват</p>
              <h2 id="scope-heading">С какво се занимаваме и с какво не</h2>
            </div>
            <div className="local-grid">
              <article className="coverage-card">
                <h3>Какво поемаме</h3>
                <p>
                  Стандартни електрически бойлери с резервоар: диагностика, смяна на нагревател, термостат и предпазен
                  клапан, поправка на течове и на електрическата част, профилактика, монтаж и подмяна.
                </p>
                <Link className="service-card__more service-card__more--link" href="/uslugi/">
                  Разгледайте услугите <IconArrow size={16} />
                </Link>
              </article>
              <article className="coverage-card">
                <h3>Какво оставяме настрана</h3>
                <p>
                  Проточните и газовите бойлери не влизат в нашата дейност. За тях е по-добре да потърсите специализиран
                  сервиз, вместо да чакате безполезен оглед.
                </p>
                <Link className="service-card__more service-card__more--link" href="/marki/">
                  Вижте марките, с които работим <IconArrow size={16} />
                </Link>
              </article>
              <article className="coverage-card">
                <h3>В кои градове</h3>
                <p>
                  Във всички квартали на двата града. В София обикновено сме при вас до час, а в Пазарджик - до два
                  часа при възможност.
                </p>
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
              </article>
            </div>
          </div>
        </section>

        <CtaBand
          eyebrow="Запознайте се с нас по най-добрия начин"
          heading="Повикайте техник и вижте как работим"
          text="Обадете се или пишете във Viber. Ще ви кажем какво да направите дотогава и кога можем да дойдем."
        />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
