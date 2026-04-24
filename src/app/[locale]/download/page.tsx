import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import DownloadClient from './download-client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('title') };
}

export default async function DownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  const faqCount = 4;
  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t.rich(`faq.items.${i}.answer`, {
      docLink: (chunks) => (
        <Link href={`/${locale}/docs/introduction`} className="text-primary hover:underline">
          {chunks}
        </Link>
      ),
    }),
  }));

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Download</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">{t('title')}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">{t('subtitle')}</p>
      </div>

      {/* Download Cards - Client Component */}
      <DownloadClient />

      {/* System Requirements */}
      <div className="max-w-3xl mx-auto mt-24 mb-20">
        <h2 className="text-2xl font-bold text-center mb-10 tracking-tight">{t('requirements.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 rounded-2xl border border-border/60 bg-card">
            <p className="font-semibold text-foreground mb-2">macOS</p>
            <p className="text-sm text-muted-foreground">{t('requirements.mac')}</p>
          </div>
          <div className="text-center p-6 rounded-2xl border border-border/60 bg-card">
            <p className="font-semibold text-foreground mb-2">Windows</p>
            <p className="text-sm text-muted-foreground">{t('requirements.windows')}</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10 tracking-tight">{t('faq.title')}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-border/60 bg-card transition-colors duration-200 hover:border-border">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-[0.95rem]">
                {faq.question}
                <span className="ml-3 text-muted-foreground transition-transform duration-200 group-open:rotate-180">&#9662;</span>
              </summary>
              <div className="px-5 pb-5 -mt-1">
                <p className="text-muted-foreground text-[0.925rem] leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
