import type { Metadata } from "next";
import { CompactHero } from "../components/hero";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { CitiesBand, CtaBand, PostCard } from "../components/sections";
import { baseNodes, breadcrumbNode, graph, itemListNode, webPageNode } from "../lib/json-ld";
import { postPath, posts } from "../lib/posts";
import { pageMetadata } from "../lib/seo";
import { business, mapEmbedSrc } from "../lib/site";
import { RevealOnScroll } from "../reveal-on-scroll";
import { SiteFooter } from "../site-footer";

const PATH = "/blog/";
const TITLE = "Блог за бойлерите: ремонт, цени, профилактика | Бойлер-Мен";
const DESCRIPTION =
  "Практични статии за електрическите бойлери: течове, липса на топла вода, цена на ремонта, ремонт или нов бойлер. От сервиз в София и Пазарджик.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const crumbs = [
  { name: "Начало", path: "/" },
  { name: "Блог", path: PATH }
];

export default function BlogIndexPage() {
  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
      breadcrumbNode(PATH, crumbs),
      itemListNode(
        PATH,
        "Статии за бойлери",
        posts.map((post) => ({ name: post.title, path: postPath(post.slug) }))
      )
    ])
  ];

  return (
    <>
      <CompactHero
        crumbs={crumbs}
        eyebrow="Блог"
        title="Блог за бойлерите"
        text="Кратки практични отговори от сервиза: какво да правите при теч, колко струва ремонтът и кога е по-добре да смените бойлера."
      />

      <main id="main-content">
        <section className="band band--ice band--after-hero" aria-labelledby="posts-heading">
          <div className="band__inner">
            <div className="section-heading section-heading--stacked">
              <p className="eyebrow">Статии</p>
              <h2 id="posts-heading">Полезно за вашия бойлер</h2>
            </div>
            <div className="services-grid">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
        <CitiesBand variant="blog" />
        <CtaBand
          eyebrow="Имате конкретен въпрос?"
          heading="Попитайте директно сервиза"
          text="Ако отговорът не е в статиите, обадете се или пишете във Viber - ще ви насочим."
        />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
