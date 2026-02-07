import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getAllDocSlugs } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rethinkai.com';

  const routes: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPages = ['', '/docs', '/pricing', '/auth/login', '/auth/register'];

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
    const docSlugs = getAllDocSlugs(locale);
    for (const slug of docSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/docs/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return routes;
}
