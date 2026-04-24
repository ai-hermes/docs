'use client';

import { useTranslations } from 'next-intl';
import { Download, KeyRound, MessageCircle } from 'lucide-react';

const steps = [
  { key: 'step1', icon: Download, number: '1' },
  { key: 'step2', icon: KeyRound, number: '2' },
  { key: 'step3', icon: MessageCircle, number: '3' },
];

export default function HowItWorks() {
  const t = useTranslations('home.howItWorks');

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-muted/40" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">{t('title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative flex flex-col items-center text-center">
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[32px] left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
                )}

                {/* Step icon */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-2xl border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 tracking-tight">
                  <span className="text-primary mr-1.5">{step.number}.</span>
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">{t(`${step.key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
