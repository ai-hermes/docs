'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  const t = useTranslations('home.cta');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-primary/[0.03]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Button */}
          <Link href={`/${locale}/download`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 gap-2 cursor-pointer transition-colors duration-200">
              {t('button')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
