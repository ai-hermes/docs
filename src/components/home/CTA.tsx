'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  const t = useTranslations('home.cta');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary opacity-5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-8 shadow-lg shadow-purple-500/20">
            <Zap className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTA Button */}
          <Link href={`/${locale}/auth/register`}>
            <Button size="lg" className="gradient-primary hover:gradient-primary-hover text-white px-8 gap-2 shadow-lg shadow-purple-500/20">
              {t('button')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
