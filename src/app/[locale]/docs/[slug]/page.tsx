import { notFound } from 'next/navigation';
import {
  getDocBySlug,
  getAllDocSlugs,
  getDocComponent,
  getDocsConfig,
} from '@/lib/docs';
import DocsSidebar from '@/components/docs/DocsSidebar';
import MobileDocsSidebar from '@/components/docs/MobileDocsSidebar';
import { locales } from '@/i18n/config';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const slugs = await getAllDocSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const doc = await getDocBySlug(locale, slug);

  if (!doc) {
    return { title: 'Not Found' };
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [doc, docsConfig, DocContent] = await Promise.all([
    getDocBySlug(locale, slug),
    getDocsConfig(locale),
    getDocComponent(locale, slug),
  ]);

  if (!doc || !DocContent) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rethinkai.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.title,
    description: doc.description,
    inLanguage: locale,
    dateModified: doc.lastModified,
    url: `${baseUrl}/${locale}/docs/${slug}`,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex gap-10">
        <DocsSidebar docsConfig={docsConfig} locale={locale} currentSlug={slug} />

        <article className="flex-1 min-w-0 max-w-3xl">
          <MobileDocsSidebar docsConfig={docsConfig} locale={locale} currentSlug={slug} />

          {/* Header */}
          <header className="mb-12 pb-8 border-b border-border">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{doc.title}</h1>
            {doc.description && (
              <p className="text-xl text-muted-foreground leading-relaxed">{doc.description}</p>
            )}
          </header>

          {/* Content — hide YAML frontmatter rendered as hr + h2 by @next/mdx */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none [&>hr:first-child]:hidden [&>hr:first-child+h2]:hidden prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border prose-h3:mt-8 prose-h3:mb-4 prose-p:my-5 prose-p:leading-relaxed prose-ul:my-5 prose-ol:my-5 prose-li:my-1.5 prose-hr:my-10 prose-strong:text-foreground prose-a:text-purple-500 prose-a:no-underline [&_a:hover]:underline prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:my-6 prose-pre:rounded-xl prose-pre:bg-[#1e1e2e] prose-pre:text-[#cdd6f4] prose-pre:[&_code]:bg-transparent prose-pre:[&_code]:p-0 prose-pre:[&_code]:text-[inherit] prose-table:my-6 prose-blockquote:border-purple-400 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:rounded-r-lg">
            <DocContent />
          </div>
        </article>
      </div>
    </div>
  );
}
