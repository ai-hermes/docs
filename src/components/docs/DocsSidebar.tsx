import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { DocCategory } from '@/lib/docs';

interface DocsSidebarProps {
  docsConfig: DocCategory[];
  locale: string;
  currentSlug: string;
}

export default function DocsSidebar({ docsConfig, locale, currentSlug }: DocsSidebarProps) {
  const t = useTranslations('docs.categories');

  return (
    <nav className="w-64 shrink-0 border-r pr-6 hidden lg:block">
      <div className="sticky top-24 space-y-6">
        {docsConfig.map((category) => (
          <div key={category.key}>
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              {t(category.key)}
            </h3>
            <ul className="space-y-1">
              {category.items.map((item) => {
                const href = `/${locale}/docs/${item.slug}`;
                const isActive = currentSlug === item.slug;

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={cn(
                        'block py-2 px-3 rounded-lg text-sm transition-colors',
                        isActive
                          ? 'bg-gradient-to-r from-blue-400/10 to-purple-500/10 text-foreground font-medium border-l-2 border-purple-500'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
