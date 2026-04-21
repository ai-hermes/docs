'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DocCategory } from '@/lib/docs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { VisuallyHidden } from 'radix-ui';
import { useState } from 'react';

interface MobileDocsSidebarProps {
  docsConfig: DocCategory[];
  locale: string;
  currentSlug: string;
}

export default function MobileDocsSidebar({
  docsConfig,
  locale,
  currentSlug,
}: MobileDocsSidebarProps) {
  const t = useTranslations('docs.categories');
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Menu className="w-4 h-4" />
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 px-6">
          <VisuallyHidden.Root>
            <SheetTitle>Documentation menu</SheetTitle>
          </VisuallyHidden.Root>
          <nav className="mt-6 space-y-6">
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
                          onClick={() => setOpen(false)}
                          className={cn(
                            'block py-2 px-3 rounded-lg text-sm transition-colors',
                            isActive
                              ? 'bg-gradient-to-r from-blue-400/10 to-purple-500/10 text-foreground font-medium'
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
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
