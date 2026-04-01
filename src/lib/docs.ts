import 'server-only';

import { cache } from 'react';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');
const DEFAULT_DOC_LOCALE = 'en';
const MDX_EXTENSION = '.mdx';
const CATEGORY_ORDER = ['introduction', 'quickStart', 'chatlogIntegration', 'usageGuide', 'legal'];

export interface DocItem {
  slug: string;
  title: string;
  description?: string;
  category: string;
  order: number;
  contentLocale: string;
  lastModified: string;
}

export interface DocCategory {
  key: string;
  items: DocItem[];
}

interface DocFrontmatter {
  title?: string;
  description?: string;
  category?: string;
  order?: number;
}

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readDocsFromDirectory(locale: string): Promise<DocItem[]> {
  const localeDirectory = path.join(CONTENT_ROOT, locale);

  if (!(await pathExists(localeDirectory))) {
    return [];
  }

  const entries = await fs.readdir(localeDirectory, { withFileTypes: true });
  const docs = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(MDX_EXTENSION))
      .map(async (entry) => {
        const filePath = path.join(localeDirectory, entry.name);
        const raw = await fs.readFile(filePath, 'utf8');
        const { data } = matter(raw);
        const frontmatter = data as DocFrontmatter;
        const slug = entry.name.slice(0, -MDX_EXTENSION.length);

        if (!frontmatter.title || !frontmatter.category) {
          throw new Error(`Missing required frontmatter in ${filePath}`);
        }

        const stats = await fs.stat(filePath);

        return {
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          category: frontmatter.category,
          order: frontmatter.order ?? 0,
          contentLocale: locale,
          lastModified: stats.mtime.toISOString(),
        } satisfies DocItem;
      })
  );

  return docs.sort((a, b) => {
    const categoryDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (categoryDiff !== 0) {
      return categoryDiff;
    }

    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.title.localeCompare(b.title);
  });
}

const getDocsForLocale = cache(async (locale: string): Promise<DocItem[]> => {
  const localizedDocs = await readDocsFromDirectory(locale);
  if (locale === DEFAULT_DOC_LOCALE) {
    return localizedDocs;
  }

  const fallbackDocs = await readDocsFromDirectory(DEFAULT_DOC_LOCALE);
  if (localizedDocs.length === 0) {
    return fallbackDocs;
  }

  const mergedDocs = new Map(localizedDocs.map((doc) => [doc.slug, doc]));
  for (const fallbackDoc of fallbackDocs) {
    if (!mergedDocs.has(fallbackDoc.slug)) {
      mergedDocs.set(fallbackDoc.slug, fallbackDoc);
    }
  }

  return Array.from(mergedDocs.values()).sort((a, b) => {
    const categoryDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (categoryDiff !== 0) {
      return categoryDiff;
    }

    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.title.localeCompare(b.title);
  });
});

export const getDocsConfig = cache(async (locale: string): Promise<DocCategory[]> => {
  const docs = await getDocsForLocale(locale);
  const groups = new Map<string, DocItem[]>();

  for (const doc of docs) {
    const items = groups.get(doc.category) ?? [];
    items.push(doc);
    groups.set(doc.category, items);
  }

  const orderedKeys = Array.from(groups.keys()).sort((a, b) => {
    const aIndex = CATEGORY_ORDER.indexOf(a);
    const bIndex = CATEGORY_ORDER.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });

  return orderedKeys.map((key) => ({
    key,
    items: groups.get(key) ?? [],
  }));
});

export const getAllDocSlugs = cache(async (locale: string): Promise<string[]> => {
  const docs = await getDocsForLocale(locale);
  return docs.map((doc) => doc.slug);
});

export const getDocBySlug = cache(async (locale: string, slug: string): Promise<DocItem | null> => {
  const docs = await getDocsForLocale(locale);
  return docs.find((doc) => doc.slug === slug) ?? null;
});

export async function getDocComponent(locale: string, slug: string) {
  const doc = await getDocBySlug(locale, slug);

  if (!doc) {
    return null;
  }

  const docModule = await import(`../content/${doc.contentLocale}/${doc.slug}.mdx`);
  return docModule.default;
}
