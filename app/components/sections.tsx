import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow, IconBolt, IconCheck, IconClock, IconDroplet, IconPhone, IconPin, IconShield, IconSpark, IconWrench } from "../icons";
import { brandPath, brands } from "../lib/brands";
import { cityList, type City } from "../lib/cities";
import type { Faq, ServicePage } from "../lib/services-data";
import { servicePath } from "../lib/services-data";
import { formatPostDate, postPath, type Post } from "../lib/posts";
import { business } from "../lib/site";
import type { RepairExample } from "../lib/examples";

const serviceIcons: Record<string, typeof IconWrench> = {
  "remont-na-elektricheska-chast": IconBolt,
  "smyana-na-predpazen-klapan": IconShield,
  "remont-na-techasht-boiler": IconDroplet,
  "smyana-na-nagrevatel": IconSpark,
  "smyana-na-termostat": IconClock,
  "montazh-na-boileri": IconWrench,
  "profilaktika-na-boileri": IconShield,
  "dostavka-i-podmyana-boiler": IconArrow
};

function ServiceIcon({ slug }: { slug: string }) {
  const Icon = serviceIcons[slug] ?? IconWrench;
  return <Icon size={28} />;
}

type Band = "ice" | "mist" | "navy";

function bandClass(band: Band, extra = "") {
  return `band band--${band}${extra ? ` ${extra}` : ""}`;
}

function SectionHeading({
  eyebrow,
  heading,
  id,
  lead,
  dark,
  compact
}: {
  eyebrow: string;
  heading: string;
  id: string;
  lead?: ReactNode;
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`section-heading${compact ? " section-heading--compact" : " section-heading--stacked"}${dark ? " section-heading--dark" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{heading}</h2>
      {lead ? <p className="section-heading__lead">{lead}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ services */

/** Which teaser wording a service card uses. Every page uses its own, so no card text repeats across pages. */
export type CardVariant = "home" | "index" | "sofia" | "pazardzhik" | "compact";

function cardText(service: ServicePage, variant: CardVariant): string | null {
  switch (variant) {
    case "home":
      return service.cardText;
    case "index":
      return service.indexText;
    case "sofia":
      return service.cityTexts.sofia;
    case "pazardzhik":
      return service.cityTexts.pazardzhik;
    default:
      return null;
  }
}

export function ServiceCard({
  service,
  featured,
  variant = "home"
}: {
  service: ServicePage;
  featured?: boolean;
  variant?: CardVariant;
}) {
  const text = cardText(service, variant);
  return (
    <article className={`service-card${featured ? " service-card--featured" : ""}`}>
      {featured ? <span className="service-card__badge">Най-търсено</span> : null}
      <span className="service-card__icon" aria-hidden="true">
        <ServiceIcon slug={service.slug} />
      </span>
      <h3>
        <Link href={servicePath(service.slug)}>{service.title}</Link>
      </h3>
      {text ? <p>{text}</p> : null}
      <span className="service-card__more" aria-hidden="true">
        Подробности <IconArrow size={16} />
      </span>
    </article>
  );
}

export function ServicesBand({
  id = "services",
  eyebrow = "Услуги",
  heading,
  lead,
  items,
  band = "ice",
  afterHero,
  featuredSlug = "remont-na-techasht-boiler",
  allLink,
  variant = "home"
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  lead?: ReactNode;
  items: ServicePage[];
  band?: Band;
  afterHero?: boolean;
  featuredSlug?: string;
  allLink?: boolean;
  variant?: CardVariant;
}) {
  return (
    <section className={bandClass(band, afterHero ? "band--after-hero" : "")} id={id} aria-labelledby={`${id}-heading`}>
      <div className="band__inner">
        <SectionHeading eyebrow={eyebrow} heading={heading} id={`${id}-heading`} lead={lead} />
        <div className="services-grid">
          {items.map((service) => (
            <ServiceCard key={service.slug} service={service} featured={service.slug === featuredSlug} variant={variant} />
          ))}
        </div>
        {allLink ? (
          <p className="section-more">
            <Link className="button button--primary" href="/uslugi/">
              Всички услуги
              <IconArrow size={18} />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- why */

export function WhyBand({
  eyebrow = "Защо Бойлер-Мен",
  heading,
  lead,
  problems,
  note,
  id = "why"
}: {
  eyebrow?: string;
  heading: string;
  lead: ReactNode;
  problems: string[];
  note: string;
  id?: string;
}) {
  return (
    <section className="band band--navy band--wave" id={id} aria-labelledby={`${id}-heading`}>
      <div className="band__inner split-layout">
        <SectionHeading eyebrow={eyebrow} heading={heading} id={`${id}-heading`} lead={lead} dark />

        <div className="glass-panel">
          <ul className="problem-list" aria-label="Чести проблеми">
            {problems.map((problem) => (
              <li key={problem}>
                <IconCheck size={17} />
                {problem}
              </li>
            ))}
          </ul>
          <div className="glass-panel__note">
            <IconShield />
            <p>{note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- brands */


export function BrandsBand() {
  return (
    <section className="band band--mist" aria-labelledby="brands-heading">
      <div className="band__inner">
        <SectionHeading eyebrow="Марки" heading="Работим с популярните бойлери в България" id="brands-heading" compact />
        <div className="brand-cloud" aria-label="Марки бойлери">
          {brands.map((brand) => (
            <Link className="brand-pill" key={brand.slug} href={brandPath(brand.slug)}>
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- process */

export const processSteps = [
  {
    title: "Казвате какво се случва",
    text: "Обаждате се или пишете във Viber. Ако можете, изпращате снимка на бойлера и проблема."
  },
  {
    title: "Получавате насока",
    text: "Уточняваме симптомите, района и удобния час за посещение, без да губите време в излишни обиколки."
  },
  {
    title: "Техник идва на адрес",
    text: "Диагностиката и ремонтът се извършват на място, като повечето повреди се решават при първото посещение."
  },
  {
    title: "Получавате гаранция",
    text: "След ремонта се издава протокол за извършената дейност и гаранция за ремонтираната част."
  }
];

export function ProcessBand({
  band = "ice",
  steps = processSteps,
  heading = "Как протича посещението",
  lead = "От първото обаждане до работещ бойлер — ясен и кратък процес, без излишни стъпки.",
  columns
}: {
  band?: Band;
  steps?: { title: string; text: string }[];
  heading?: string;
  lead?: ReactNode;
  columns?: 3;
}) {
  return (
    <section className={bandClass(band)} id="process" aria-labelledby="process-heading">
      <div className="band__inner">
        <SectionHeading eyebrow="Процес" heading={heading} id="process-heading" lead={lead} />
        <ol className={`process-grid${columns === 3 ? " process-grid--three" : ""}`}>
          {steps.map((step, index) => (
            <li className="process-step" key={step.title}>
              <span className="process-step__num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- reviews */

export const reviews = [
  {
    author: "Милена Ангелова",
    dateLabel: "20 авг. 2026 г.",
    text: "Страхотно обслужване! Много любезни и отзивчиви хора, работят бързо и качествено."
  },
  {
    author: "Марта Кръстева",
    dateLabel: "10 авг. 2026 г.",
    text: "С любезното съдействие избрахме подходящ бойлер и техниците го монтираха професионално."
  },
  {
    author: "Кремена Цанова",
    dateLabel: "27 юли 2026 г.",
    text: "Единственият сервиз, който ми вдигна в неделя. В 8:50 вече имах работещ бойлер."
  }
];

export function ReviewsBand() {
  return (
    <section className="band band--navy band--wave" aria-labelledby="proof-heading">
      <div className="band__inner">
        <SectionHeading eyebrow="Отзиви" heading="Хората помнят бързата реакция" id="proof-heading" dark />
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.author}>
              <div className="review-card__stars" aria-label="5 от 5 звезди">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
              <p>“{review.text}”</p>
              <footer>
                <strong>{review.author}</strong>
                <span>{review.dateLabel}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- cities */

/** Two cards that send visitors (and crawlers) to each city landing page. */
const citiesBandCopy = {
  home: {
    heading: "Обслужваме София и Пазарджик",
    lead: "Мобилен сервиз със седалище София. Идваме на адрес във всички квартали на София и на Пазарджик."
  },
  services: {
    heading: "Къде предлагаме тези услуги",
    lead: "Всички услуги от списъка са достъпни на адрес в двата града - изберете своя, за да видите местните особености."
  },
  blog: {
    heading: "Нужна ви е помощ на място?",
    lead: "След като прочетете статиите, техник може да огледа вашия бойлер на адрес в двата града."
  }
} as const;

export type CitiesVariant = keyof typeof citiesBandCopy;

export function CitiesBand({ band = "mist", variant = "home" }: { band?: Band; variant?: CitiesVariant }) {
  const copy = citiesBandCopy[variant];
  const full = variant === "home";
  return (
    <section className={bandClass(band)} id="coverage" aria-labelledby="coverage-heading">
      <div className="band__inner">
        <SectionHeading eyebrow="Зона на обслужване" heading={copy.heading} id="coverage-heading" lead={copy.lead} />
        <div className="cities-grid">
          {cityList.map((city) => {
            const teaser = city.teasers[variant];
            return (
              <article className="coverage-card" key={city.slug}>
                <p className="eyebrow">{city.name}</p>
                <h3>
                  <Link href={city.path}>{teaser.title}</Link>
                </h3>
                <p>{teaser.text}</p>
                {full ? (
                  <div className="coverage-pills" aria-label={`Квартали ${city.inName}`}>
                    {city.coverage.slice(0, 6).map((area) => (
                      <span className="brand-pill" key={area}>
                        {area}
                      </span>
                    ))}
                  </div>
                ) : null}
                {full ? (
                  <p className="coverage-card__eta">
                    <IconClock size={18} /> {city.eta}
                  </p>
                ) : null}
                <Link className="service-card__more service-card__more--link" href={city.path}>
                  {teaser.link} <IconArrow size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Coverage band for a single city (neighbourhood pills). */
export function CoverageBand({ city, band = "mist" }: { city: City; band?: Band }) {
  return (
    <section className={bandClass(band)} id="coverage" aria-labelledby="coverage-heading">
      <div className="band__inner coverage-layout">
        <div className="coverage-card">
          <p className="eyebrow">Зона на обслужване</p>
          <h2 id="coverage-heading">{city.coverageHeading}</h2>
          <p>{city.coverageText}</p>
        </div>
        <div className="coverage-pills" aria-label={`Квартали ${city.inName}`}>
          {city.coverage.map((area) => (
            <span className="brand-pill" key={area}>
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocalBand({ city, band = "mist" }: { city: City; band?: Band }) {
  return (
    <section className={bandClass(band)} id="local" aria-labelledby="local-heading">
      <div className="band__inner">
        <SectionHeading eyebrow={city.name} heading={city.localHeading} id="local-heading" compact />
        <div className="local-grid">
          {city.localSections.map((section) => (
            <article className="coverage-card" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IntroBand({ city, band = "ice" }: { city: City; band?: Band }) {
  return (
    <section className={bandClass(band, "band--after-hero")} id="intro" aria-labelledby="intro-heading">
      <div className="band__inner">
        <SectionHeading eyebrow={`Ремонт на бойлери ${city.inName}`} heading={city.introHeading} id="intro-heading" compact />
        <div className="prose prose--wide">
          {city.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ examples */

export function ExamplesBand({ city, items, band = "ice" }: { city: City; items: RepairExample[]; band?: Band }) {
  if (items.length === 0) return null;
  return (
    <section className={bandClass(band)} id="examples" aria-labelledby="examples-heading">
      <div className="band__inner">
        <SectionHeading
          eyebrow="Примери от ремонти"
          heading={`Реални ремонти ${city.inName}`}
          id="examples-heading"
          lead="Снимки и данни от изпълнени поръчки: каква е била повредата и как е отстранена."
        />
        <div className="examples-grid">
          {items.map((example) => (
            <figure className="example-card" key={example.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={example.image} alt={example.imageAlt} loading="lazy" decoding="async" />
              <figcaption>
                <h3>{example.title}</h3>
                <dl>
                  <div>
                    <dt>Марка</dt>
                    <dd>{example.brand}</dd>
                  </div>
                  <div>
                    <dt>Повреда</dt>
                    <dd>{example.fault}</dd>
                  </div>
                  <div>
                    <dt>Ремонт</dt>
                    <dd>{example.fix}</dd>
                  </div>
                  {example.price ? (
                    <div>
                      <dt>Цена</dt>
                      <dd>{example.price}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Дата</dt>
                    <dd>
                      <time dateTime={example.date}>{formatPostDate(example.date)}</time>
                      {example.area ? ` · ${example.area}` : ""}
                    </dd>
                  </div>
                </dl>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- faq */

export function FaqBand({
  faqs,
  heading = "Преди да повикате техник",
  band = "ice",
  note
}: {
  faqs: Faq[];
  heading?: string;
  band?: Band;
  note?: string;
}) {
  return (
    <section className={bandClass(band)} id="faq" aria-labelledby="faq-heading">
      <div className="band__inner">
        <SectionHeading eyebrow="Въпроси" heading={heading} id="faq-heading" />
        <div className="faq-grid">
          {faqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
        {note ? (
          <p className="site-note">{note}</p>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- blog */

export function PostCard({ post, home }: { post: Post; home?: boolean }) {
  return (
    <article className="service-card post-card">
      <p className="post-card__meta">{post.readMinutes} мин. четене</p>
      <h3>
        <Link href={postPath(post.slug)}>{home ? post.homeTitle : post.cardTitle}</Link>
      </h3>
      <p>{home ? post.homeExcerpt : post.excerpt}</p>
      <span className="service-card__more" aria-hidden="true">
        Прочети <IconArrow size={16} />
      </span>
    </article>
  );
}

export function BlogBand({ posts, band = "mist", heading = "Полезно от сервиза" }: { posts: Post[]; band?: Band; heading?: string }) {
  return (
    <section className={bandClass(band)} id="blog" aria-labelledby="blog-heading">
      <div className="band__inner">
        <SectionHeading
          eyebrow="Блог"
          heading={heading}
          id="blog-heading"
          lead="Кратки практични статии за бойлерите - кога е нужен ремонт, колко струва и как да избегнете повредите."
        />
        <div className="services-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} home />
          ))}
        </div>
        <p className="section-more">
          <Link className="button button--primary" href="/blog/">
            Всички статии
            <IconArrow size={18} />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- cta */

export function CtaBand({
  heading,
  eyebrow,
  text
}: {
  heading: string;
  eyebrow: string;
  text: string;
}) {
  return (
    <section className="band band--navy" aria-labelledby="cta-heading">
      <div className="band__inner">
        <div className="cta-panel">
          <span className="cta-panel__icon" aria-hidden="true">
            <IconDroplet />
          </span>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="cta-heading">{heading}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-panel__actions">
            <a className="button button--primary" href={business.phoneHref}>
              <IconPhone />
              {business.phone}
            </a>
            <a className="button button--ghost" href={business.viberHref}>
              Viber
              <IconArrow size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Cross-link to the other city, plus the neighbouring service pages. */
export function CrossCityBand({ city, band = "mist" }: { city: City; band?: Band }) {
  return (
    <section className={bandClass(band)} aria-labelledby="cross-heading">
      <div className="band__inner coverage-layout">
        <div className="coverage-card">
          <p className="eyebrow">
            <IconPin size={16} /> {city.name}
          </p>
          <h2 id="cross-heading">{city.crossHeading}</h2>
          <p>{city.crossText}</p>
          <Link className="button button--primary" href={city.path}>
            Ремонт на бойлери {city.inName}
            <IconArrow size={18} />
          </Link>
        </div>
        <div className="coverage-pills" aria-label="Още от сервиза">
          <Link className="brand-pill" href="/uslugi/">
            Всички услуги
          </Link>
          <Link className="brand-pill" href="/blog/">
            Блог
          </Link>
          <Link className="brand-pill" href="/uslugi/smyana-na-nagrevatel/">
            Смяна на нагревател
          </Link>
          <Link className="brand-pill" href="/uslugi/smyana-na-termostat/">
            Смяна на термостат
          </Link>
          <Link className="brand-pill" href="/uslugi/remont-na-techasht-boiler/">
            Ремонт на течове
          </Link>
        </div>
      </div>
    </section>
  );
}
