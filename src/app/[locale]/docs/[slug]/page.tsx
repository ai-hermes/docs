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
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
            {doc.description && (
              <p className="text-xl text-muted-foreground">{doc.description}</p>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-purple-500 prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <DocContent />
          </div>
        </article>
      </div>
    </div>
  );
}
