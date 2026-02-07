'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const t = useTranslations('home.hero');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 mb-8">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gradient-primary">AI-Powered Analysis</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t('title')}
            <br />
            <span className="text-gradient-primary">{t('titleHighlight')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/auth/register`}>
              <Button size="lg" className="gradient-primary hover:gradient-primary-hover text-white px-8 gap-2">
                {t('cta')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/${locale}/docs`}>
              <Button size="lg" variant="outline" className="px-8">
                {t('secondaryCta')}
              </Button>
            </Link>
          </div>

          {/* Hero Image/Illustration */}
          <div className="mt-16 relative w-full max-w-3xl">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-400/5 to-purple-500/5 border border-border/50 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Rethink AI"
                  width={120}
                  height={120}
                  className="opacity-50"
                />
              </div>
              {/* Mockup UI elements */}
              <div className="absolute inset-4 flex flex-col gap-3 p-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4 pt-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-muted animate-pulse" />
                    <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="col-span-2 space-y-3">
                    <div className="h-8 w-1/2 rounded-lg gradient-primary opacity-50" />
                    <div className="h-20 w-full rounded-lg bg-muted/50" />
                    <div className="flex gap-2">
                      <div className="h-6 w-20 rounded-full bg-blue-400/30" />
                      <div className="h-6 w-24 rounded-full bg-purple-500/30" />
                      <div className="h-6 w-16 rounded-full bg-green-400/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
