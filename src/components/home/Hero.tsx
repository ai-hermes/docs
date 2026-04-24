'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const t = useTranslations('home.hero');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      {/* Subtle background tint */}
      <div className="absolute inset-0 -z-10 bg-primary/[0.03]" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="animate-fade-in-up text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            {t('title')}
            <br />
            <span className="text-primary">{t('titleHighlight')}</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animation-delay-200 text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/download`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 gap-2 cursor-pointer transition-colors duration-200">
                {t('cta')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/${locale}/docs`}>
              <Button size="lg" variant="outline" className="px-8 cursor-pointer transition-colors duration-200">
                {t('secondaryCta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
