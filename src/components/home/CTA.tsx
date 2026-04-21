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
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-pink-400/10 rounded-full blur-[100px]" />
      </div>

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
            <Button size="lg" className="gradient-primary hover:gradient-primary-hover text-white px-10 gap-2 shadow-lg shadow-purple-500/25 cursor-pointer transition-shadow duration-200 hover:shadow-xl hover:shadow-purple-500/30">
              {t('button')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
