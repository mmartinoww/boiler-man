import type { ReactNode } from "react";
import { IconBolt, IconCheck, IconClock, IconPhone, IconShield, IconSpark, IconWrench } from "../icons";
import { business, SITE_NAME } from "../lib/site";
import { SiteHeader } from "../site-header";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

const signalIcons = {
  clock: IconClock,
  shield: IconShield,
  wrench: IconWrench
} as const;

export type Signal = { value: string; label: string; icon: keyof typeof signalIcons };

type HeroProps = {
  eyebrow: string;
  line: string;
  accent: string;
  sub: string;
  text: ReactNode;
  usp: string[];
  signals: Signal[];
  crumbs?: BreadcrumbItem[];
  chip?: string;
  statusMeta?: string;
};

/** The original full-height hero. Used by the home page and both city pages. Visual design is unchanged. */
export function Hero({ eyebrow, line, accent, sub, text, usp, signals, crumbs, chip = "Спешен сервиз", statusMeta = "до 58°C · на място" }: HeroProps) {
  return (
    <div className="hero-intro">
      <SiteHeader brandName={SITE_NAME} phoneHref={business.phoneHref} phoneLabel={business.phone} />

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__aurora" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__orbs" aria-hidden="true">
          <span className="hero__orb hero__orb--one" />
          <span className="hero__orb hero__orb--two" />
          <span className="hero__orb hero__orb--three" />
        </div>
        <div className="hero__container">
          <div className="hero__content">
            {crumbs ? <Breadcrumbs items={crumbs} /> : null}
            <p className="eyebrow hero__eyebrow">{eyebrow}</p>
            <h1 id="hero-heading">
              <span className="hero__titleLine">{line}</span>
              <span className="hero__titleAccent">{accent}</span>
              <span className="hero__titleSub">{sub}</span>
            </h1>
            <p className="hero__text">{text}</p>

            <ul className="hero__usp" aria-label="Основни предимства">
              {usp.map((item) => (
                <li key={item}>
                  <IconCheck />
                  {item}
                </li>
              ))}
            </ul>

            <div className="cta-row" aria-label="Основни действия">
              <a className="button button--primary" href={business.phoneHref} aria-label={`Обадете се на ${business.phone}`}>
                <IconPhone />
                Обадете се
              </a>
              <a className="button button--ghost" href={business.viberHref}>
                <IconSpark size={18} />
                Пишете във Viber
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="boiler-card">
              <div className="boiler-card__halo" />
              <div className="boiler-card__device">
                <span className="boiler-card__light" />
                <span className="boiler-card__gauge" />
                <span className="boiler-card__drop" />
              </div>
              <div className="boiler-card__status">
                <span className="boiler-card__statusLabel">Статус</span>
                <strong>Готова</strong>
                <span className="boiler-card__statusMeta">{statusMeta}</span>
              </div>
              <div className="boiler-card__chip">
                <IconBolt size={16} />
                {chip}
              </div>
            </div>
          </div>
        </div>

        <div className="signal-strip" aria-label="Бързи факти">
          {signals.map((signal) => {
            const Icon = signalIcons[signal.icon];
            return (
              <article className="signal-card" key={signal.label}>
                <span className="signal-card__icon">
                  <Icon size={22} />
                </span>
                <strong>{signal.value}</strong>
                <span>{signal.label}</span>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

type CompactHeroProps = {
  eyebrow: string;
  title: string;
  text: ReactNode;
  crumbs: BreadcrumbItem[];
};

/** Slimmer variant of the same hero for service, blog and index pages. */
export function CompactHero({ eyebrow, title, text, crumbs }: CompactHeroProps) {
  return (
    <div className="hero-intro hero-intro--compact">
      <SiteHeader brandName={SITE_NAME} phoneHref={business.phoneHref} phoneLabel={business.phone} />

      <section className="hero hero--compact" aria-labelledby="hero-heading">
        <div className="hero__aurora" aria-hidden="true" />
        <div className="hero__orbs" aria-hidden="true">
          <span className="hero__orb hero__orb--one" />
          <span className="hero__orb hero__orb--two" />
        </div>
        <div className="hero__container">
          <div className="hero__content">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow hero__eyebrow">{eyebrow}</p>
            <h1 id="hero-heading">{title}</h1>
            <p className="hero__text">{text}</p>
            <div className="cta-row" aria-label="Основни действия">
              <a className="button button--primary" href={business.phoneHref} aria-label={`Обадете се на ${business.phone}`}>
                <IconPhone />
                Обадете се
              </a>
              <a className="button button--ghost" href={business.viberHref}>
                <IconSpark size={18} />
                Пишете във Viber
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}