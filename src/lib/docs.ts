export interface DocItem {
  slug: string;
  title: string;
  description?: string;
}

export interface DocCategory {
  key: string;
  items: DocItem[];
}

export const docsConfig: Record<string, DocCategory[]> = {
  zh: [
    {
      key: 'introduction',
      items: [
        { slug: 'introduction', title: '产品介绍', description: '了解 Rethink AI 是什么以及它能为你做什么' },
      ],
    },
    {
      key: 'quickStart',
      items: [
        { slug: 'quick-start', title: '快速上手', description: '5 分钟快速开始使用 Rethink AI' },
      ],
    },
    {
      key: 'chatlogIntegration',
      items: [
        { slug: 'chatlog-integration', title: '对接聊天记录', description: '了解如何导入各种聊天工具的记录' },
      ],
    },
    {
      key: 'usageGuide',
      items: [
        { slug: 'usage-guide', title: '使用说明', description: '详细的功能使用指南' },
      ],
    },
  ],
  en: [
    {
      key: 'introduction',
      items: [
        { slug: 'introduction', title: 'Introduction', description: 'Learn what Rethink AI is and what it can do for you' },
      ],
    },
    {
      key: 'quickStart',
      items: [
        { slug: 'quick-start', title: 'Quick Start', description: 'Get started with Rethink AI in 5 minutes' },
      ],
    },
    {
      key: 'chatlogIntegration',
      items: [
        { slug: 'chatlog-integration', title: 'Chat Log Integration', description: 'Learn how to import chat logs from various tools' },
      ],
    },
    {
      key: 'usageGuide',
      items: [
        { slug: 'usage-guide', title: 'Usage Guide', description: 'Detailed feature usage guide' },
      ],
    },
  ],
};

export function getDocsConfig(locale: string): DocCategory[] {
  return docsConfig[locale] || docsConfig.en;
}

export function getAllDocSlugs(locale: string): string[] {
  const config = getDocsConfig(locale);
  return config.flatMap((category) => category.items.map((item) => item.slug));
}

export function getDocBySlug(locale: string, slug: string): DocItem | undefined {
  const config = getDocsConfig(locale);
  for (const category of config) {
    const item = category.items.find((i) => i.slug === slug);
    if (item) return item;
  }
  return undefined;
}
