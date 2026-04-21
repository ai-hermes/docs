import { getTranslations } from 'next-intl/server';
import DownloadClient from './download-client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('title') };
}

export default async function DownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  const faqs = [0, 1, 2].map((i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
  }));

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Download Cards - Client Component */}
      <DownloadClient />

      {/* System Requirements */}
      <div className="max-w-3xl mx-auto mt-20 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">{t('requirements.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div className="text-center p-4">
            <p className="font-semibold text-foreground mb-2">macOS</p>
            <p>{t('requirements.mac')}</p>
          </div>
          <div className="text-center p-4">
            <p className="font-semibold text-foreground mb-2">Windows</p>
            <p>{t('requirements.windows')}</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{t('faq.title')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium">
                {faq.question}
                <span className="ml-2 transition-transform group-open:rotate-180">&#9662;</span>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
