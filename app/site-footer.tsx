import Link from "next/link";
import { IconPhone, IconPin, IconSpark } from "./icons";
import { brandPath, brands } from "./lib/brands";
import { cityList } from "./lib/cities";
import { services, servicePath } from "./lib/services-data";

type FooterBusiness = {
  name: string;
  city: string;
  addressLine: string;
  phone: string;
  phoneHref: string;
  viberHref: string;
};

type SiteFooterProps = {
  business: FooterBusiness;
  mapEmbedSrc: string;
};

export function SiteFooter({ business, mapEmbedSrc }: SiteFooterProps) {
  return (
    <footer className="site-footer" id="contact" aria-labelledby="footer-heading">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="site-footer__inner">
        <div className="site-footer__panel">
          <p className="eyebrow">Контакт</p>
          <h2 id="footer-heading">{business.name}</h2>
          <dl className="site-footer__meta">
            <div>
              <dt>Работно време</dt>
              <dd>Пон–Съб · 08:00 – 19:00</dd>
            </div>
            <div>
              <dt>Зона</dt>
              <dd>{business.city} · всички квартали</dd>
            </div>
          </dl>
          <div className="site-footer__location">
            <IconPin size={18} />
            <address>{business.addressLine}</address>
          </div>
          <div className="site-footer__actions">
            <a className="button button--primary" href={business.phoneHref} aria-label={`Обадете се на ${business.phone}`}>
              <IconPhone />
              {business.phone}
            </a>
            <a className="button button--ghost" href={business.viberHref}>
              <IconSpark size={18} />
              Пишете във Viber
            </a>
          </div>
        </div>

        <div className="site-footer__mapWrap">
          <iframe
            className="site-footer__map"
            title={`Зона на обслужване - ${business.name}, ${business.city}`}
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

      <nav className="site-footer__nav" aria-label="Страници на сайта">
        <div>
          <h3>Градове</h3>
          <ul>
            {cityList.map((city) => (
              <li key={city.slug}>
                <Link href={city.path}>Ремонт на бойлери {city.inName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Услуги</h3>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={servicePath(service.slug)}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Марки</h3>
          <ul>
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link href={brandPath(brand.slug)}>{brand.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Още</h3>
          <ul>
            <li>
              <Link href="/uslugi/">Всички услуги</Link>
            </li>
            <li>
              <Link href="/marki/">Всички марки</Link>
            </li>
            <li>
              <Link href="/blog/">Блог</Link>
            </li>
            <li>
              <Link href="/za-nas/">За нас</Link>
            </li>
            <li>
              <Link href="/kontakti/">Контакти</Link>
            </li>
            <li>
              <Link href="/">Начало</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="site-footer__bar">
        <span>
          © {new Date().getFullYear()} {business.name}. Ремонт на бойлери в {business.city}.
        </span>
        <a href="https://martin-web.dev/" target="_blank" rel="noopener noreferrer">
          Изработено от Martin-web.dev
        </a>
      </div>
    </footer>
  );
}
