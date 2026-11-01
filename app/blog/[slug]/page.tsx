import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompactHero } from "../../components/hero";
import { JsonLdScripts } from "../../components/json-ld-scripts";
import { CtaBand, ServicesBand } from "../../components/sections";
import { IconArrow, IconPhone } from "../../icons";
import { cityList } from "../../lib/cities";
import { articleNode, baseNodes, breadcrumbNode, graph, webPageNode } from "../../lib/json-ld";
import { formatPostDate, getPost, postPath, posts } from "../../lib/posts";
import { pageMetadata } from "../../lib/seo";
import { getService } from "../../lib/services-data";
import { business, mapEmbedSrc } from "../../lib/site";
import { RevealOnScroll } from "../../reveal-on-scroll";
import { SiteFooter } from "../../site-footer";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    path: postPath(slug),
    title: post.metaTitle,
    description: post.description,
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.updated
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = postPath(post.slug);
  const crumbs = [
    { name: "Начало", path: "/" },
    { name: "Блог", path: "/blog/" },
    { name: post.title, path }
  ];
  const related = post.relatedServices.map((relatedSlug) => getService(relatedSlug)).filter((item) => item !== undefined);

  const schemas = [
    graph([
      ...baseNodes(),
      webPageNode({
        path,
        name: post.metaTitle,
        description: post.description,
        datePublished: post.published,
        dateModified: post.updated
      }),
      breadcrumbNode(path, crumbs),
      articleNode(post)
    ])
  ];

  return (
    <>
      <CompactHero crumbs={crumbs} eyebrow="Блог" title={post.title} text={post.description} />

      <main id="main-content">
        <section className="band band--ice band--after-hero" aria-labelledby="answer-heading">
          <div className="band__inner content-layout">
            <article className="prose">
              <p className="prose__meta">
                <time dateTime={post.updated}>Обновено: {formatPostDate(post.updated)}</time> · {post.readMinutes} мин. четене
              </p>

              <div className="answer-box">
                <h2 id="answer-heading">Накратко</h2>
                <p>{post.answer}</p>
              </div>

              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul className="dot-list">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>

            <aside className="aside-card coverage-card" aria-label="Нужна ви е помощ?">
              <p className="eyebrow">Нужна ви е помощ?</p>
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
              <a className="button button--primary" href={business.phoneHref} aria-label={`Обадете се на ${business.phone}`}>
                <IconPhone />
                {business.phone}
              </a>
            </aside>
          </div>
        </section>

        <ServicesBand
          id="related"
          band="mist"
          eyebrow="Свързани услуги"
          heading={`Услуги, които помагат при „${post.cardTitle.toLowerCase()}“`}
          items={related}
          featuredSlug=""
          allLink
          variant="compact"
        />

        <CtaBand eyebrow={post.cta.eyebrow} heading={post.cta.heading} text={post.cta.text} />
      </main>

      <SiteFooter business={business} mapEmbedSrc={mapEmbedSrc} />
      <JsonLdScripts schemas={schemas} />
      <RevealOnScroll />
    </>
  );
}
