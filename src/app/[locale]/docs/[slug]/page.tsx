import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getDocBySlug, getAllDocSlugs } from '@/lib/docs';
import DocsSidebar from '@/components/docs/DocsSidebar';
import MobileDocsSidebar from '@/components/docs/MobileDocsSidebar';
import { locales } from '@/i18n/config';

// Import doc content components
import IntroductionZh from '@/content/zh/introduction';
import QuickStartZh from '@/content/zh/quick-start';
import ChatlogIntegrationZh from '@/content/zh/chatlog-integration';
import UsageGuideZh from '@/content/zh/usage-guide';
import IntroductionEn from '@/content/en/introduction';
import QuickStartEn from '@/content/en/quick-start';
import ChatlogIntegrationEn from '@/content/en/chatlog-integration';
import UsageGuideEn from '@/content/en/usage-guide';

const docComponents: Record<string, Record<string, React.ComponentType>> = {
  zh: {
    introduction: IntroductionZh,
    'quick-start': QuickStartZh,
    'chatlog-integration': ChatlogIntegrationZh,
    'usage-guide': UsageGuideZh,
  },
  en: {
    introduction: IntroductionEn,
    'quick-start': QuickStartEn,
    'chatlog-integration': ChatlogIntegrationEn,
    'usage-guide': UsageGuideEn,
  },
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const slugs = getAllDocSlugs(locale);
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
  const doc = getDocBySlug(locale, slug);

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
  const doc = getDocBySlug(locale, slug);

  if (!doc) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'docs' });

  // Get the correct content component
  const contentLocale = docComponents[locale] ? locale : 'en';
  const DocContent = docComponents[contentLocale]?.[slug];

  if (!DocContent) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex gap-10">
        <DocsSidebar />

        <article className="flex-1 min-w-0 max-w-3xl">
          <MobileDocsSidebar />

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
