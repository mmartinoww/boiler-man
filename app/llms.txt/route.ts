import { brandPath, brands } from "../lib/brands";
import { cityList } from "../lib/cities";
import { posts, postPath } from "../lib/posts";
import { services, servicePath } from "../lib/services-data";
import { CONTENT_UPDATED, PHONE_DISPLAY, SITE_NAME, SITE_URL, absoluteUrl } from "../lib/site";

export const dynamic = "force-static";

/**
 * Plain-text summary of the business for AI assistants and agents (llms.txt convention).
 * Facts here must match the visible pages and the JSON-LD.
 */
export function GET() {
  const lines = [
    `# ${SITE_NAME} - ремонт на бойлери в София и Пазарджик`,
    "",
    "> Мобилен сервиз за електрически бойлери със седалище София. Техниците идват на адрес във всички квартали на София и на Пазарджик: диагностика, ремонт, смяна на нагревател и термостат, течове, монтаж, демонтаж, профилактика и доставка.",
    "",
    "## Ключови факти",
    "",
    `- Телефон и Viber: ${PHONE_DISPLAY}`,
    "- Работно време: понеделник-събота, 08:00-19:00 (събота при предварителна уговорка, с оскъпяване)",
    "- София: реакция до 1 час във всички райони; до 30 минути за Левски, Орландовци, Суха река, Хаджи Димитър, Гео Милев и Редута",
    "- Пазарджик: на адрес във всички квартали, до 2 часа при възможност (техниците идват от София)",
    "- Диагностиката обикновено започва от 20-30 евро; крайната цена се уточнява след оглед",
    "- Гаранция: 6 месеца за ремонтираната част, с протокол",
    "- Не се ремонтират проточни и газови бойлери",
    "- Няма публичен адрес за посещения: услугата е само на адрес на клиента",
    "",
    "## Страници за градовете",
    "",
    ...cityList.map((city) => `- [Ремонт на бойлери ${city.inName}](${absoluteUrl(city.path)}): ${city.metaDescription}`),
    "",
    "## Услуги",
    "",
    ...services.map((service) => `- [${service.title}](${absoluteUrl(servicePath(service.slug))}): ${service.metaDescription}`),
    "",
    "## Марки",
    "",
    ...brands.map((brand) => `- [${brand.name}](${absoluteUrl(brandPath(brand.slug))}): ${brand.metaDescription}`),
    "",
    "## За нас и контакти",
    "",
    `- [За нас](${absoluteUrl("/za-nas/")}): как работи сервизът, какво се поема и какво не`,
    `- [Контакти](${absoluteUrl("/kontakti/")}): телефон, Viber и работно време`,
    "",
    "## Статии",
    "",
    ...posts.map((post) => `- [${post.title}](${absoluteUrl(postPath(post.slug))}): ${post.answer}`),
    "",
    `Последна актуализация: ${CONTENT_UPDATED}`,
    `Сайт: ${SITE_URL}/`,
    ""
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
