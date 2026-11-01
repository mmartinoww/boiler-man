import type { Metadata } from "next";
import Link from "next/link";
import { CompactHero } from "../components/hero";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { FaqBand } from "../components/sections";
import { IconArrow, IconCheck, IconPhone, IconSpark } from "../icons";
import { cityList } from "../lib/cities";
import { baseNodes, breadcrumbNode, faqNode, graph, webPageNode } from "../lib/json-ld";
import { pageMetadata } from "../lib/seo";
import { business, mapEmbedSrc } from "../lib/site";
import { RevealOnScroll } from "../reveal-on-scroll";
import { SiteFooter } from "../site-footer";

const PATH = "/kontakti/";
const TITLE = "Контакти: телефон и Viber за ремонт на бойлер | Бойлер-Мен";
const DESCRIPTION =
  "Свържете се с Бойлер-Мен по телефон или Viber за ремонт на бойлер на адрес в София и Пазарджик. Работно време, как да опишете повредата и къде идваме.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const crumbs = [
  { name: "Начало", path: "/" },
  { name: "Контакти", path: PATH }
];

const checklist = [
  "Какво точно се случва: студена вода, теч, падаща защита или друго",
  "Снимка на бойлера и на табелката му, ако можете да я направите",
  "Квартал и етаж в София или Пазарджик, без да е нужен точен адрес по телефона",
  "Кога ви е удобно да дойдем и дали случаят е спешен"
];

const faqs = [
  {
    question: "Мога ли да донеса бойлера в офис или магазин?",
    answer:
      "Не, защото нямаме място за посетители. Цялата дейност е на адреса на клиента, където уредът е монтиран."
  },
  {
    question: "Кое е най-бързото средство за връзка?",
    answer:
      "При аварийна ситуация се обадете по телефона. Ако не бързате и имате снимка, Viber е по-удобен, защото всичко остава в един разговор."
  }
];

export default function ContactPage() {
  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "ContactPage" }),
      breadcrumbNode(PATH, crumbs),
      faqNode(PATH, faqs)
    ])
  ];

  return (
    <>
      <CompactHero
        crumbs={crumbs}
        eyebrow="Контакти"
        title="Свържете се с Бойлер-Мен"
        text="Позвънете или пишете във Viber - ще получите насока и ориентир кога техникът може да стигне до вас."
      />

      <main id="main-content">
        <section className="band band--ice band--after-hero" aria-labelledby="contact-ways-heading">
          <div className="band__inner">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Връзка</p>
              <h2 id="contact-ways-heading">Изберете удобен начин</h2>
            </div>
            <div className="local-grid">
              <article className="coverage-card">
                <h3>По телефона</h3>
                <p>Най-бързият път при теч или внезапно спряла топла вода. Насока получавате още по време на разговора.</p>
                <a className="button button--primary" href={business.phoneHref} aria-label={`Обадете се на ${business.phone}`}>
                  <IconPhone />
                  {business.phone}
                </a>
              </article>
              <article className="coverage-card">
                <h3>Във Viber</h3>
                <p>Подходящ е, когато искате да изпратите снимка на бойлера или на неговата табелка.</p>
                <a className="button button--ghost" href={business.viberHref}>
                  <IconSpark size={18} />
                  Пишете във Viber
                </a>
              </article>
              <article className="coverage-card">
                <h3>Кога сме на разположение</h3>
                <p>
                  Приемаме повиквания всеки ден от понеделник до събота, между 08:00 и 19:00 часа. Събота е възможна
                  след предварителна уговорка.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="band band--mist" aria-labelledby="describe-heading">
          <div className="band__inner content-layout">
            <article className="prose">
              <h2 id="describe-heading">Какво да ни кажете, когато се свържете</h2>
              <p>
                Колкото повече подробности споделите, толкова по-точна насока ще получите и толкова по-вероятно е
                техникът да дойде с нужната част.
              </p>
              <ul className="check-list">
                {checklist.map((item) => (
                  <li key={item}>
                    <IconCheck size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <aside className="aside-card coverage-card" aria-label="Къде идваме">
              <p className="eyebrow">Къде идваме</p>
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
              <p>Услугата е само на адрес на клиента, затова не е нужно да пътувате до нас.</p>
            </aside>
          </div>
        </section>

        <FaqBand faqs={faqs} heading="Преди да ни потърсите" band="ice" />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
