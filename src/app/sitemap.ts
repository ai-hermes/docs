import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getDocsConfig } from '@/lib/docs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rethinkai.com';

  const routes: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPages = ['', '/docs', '/download'];

  for (const locale of locales) {
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }

    // Doc pages
    const docsConfig = await getDocsConfig(locale);
    for (const doc of docsConfig.flatMap((category) => category.items)) {
      routes.push({
        url: `${baseUrl}/${locale}/docs/${doc.slug}`,
        lastModified: new Date(doc.lastModified),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return routes;
}
