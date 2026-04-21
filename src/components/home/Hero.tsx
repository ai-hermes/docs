'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const t = useTranslations('home.hero');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[100px] animate-aurora" />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] animate-aurora animation-delay-200" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-pink-400/15 rounded-full blur-[100px] animate-aurora animation-delay-400" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/15 mb-10">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gradient-primary">AI-Powered Chat Analysis</span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in-up animation-delay-200 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            {t('title')}
            <br />
            <span className="text-gradient-primary">{t('titleHighlight')}</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animation-delay-400 text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/download`}>
              <Button size="lg" className="gradient-primary hover:gradient-primary-hover text-white px-8 gap-2 shadow-lg shadow-purple-500/25 cursor-pointer transition-shadow duration-200 hover:shadow-xl hover:shadow-purple-500/30">
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
