'use client';

import { useTranslations } from 'next-intl';
import { Download, KeyRound, MessageCircle } from 'lucide-react';

const steps = [
  { key: 'step1', icon: Download, number: '01' },
  { key: 'step2', icon: KeyRound, number: '02' },
  { key: 'step3', icon: MessageCircle, number: '03' },
];

export default function HowItWorks() {
  const t = useTranslations('home.howItWorks');

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-muted/40" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.22_264/0.04),transparent_50%)]" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-semibold text-gradient-primary uppercase tracking-wider mb-3">Getting Started</p>
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
                  <div className="hidden md:block absolute top-[52px] left-[calc(50%+48px)] w-[calc(100%-96px)] h-px">
                    <div className="w-full h-full bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
                  </div>
                )}

                {/* Step icon */}
                <div className="relative mb-8">
                  <div className="w-[104px] h-[104px] rounded-3xl gradient-primary flex items-center justify-center shadow-xl shadow-purple-500/20">
                    <Icon className="w-11 h-11 text-white" />
                  </div>
                  <div className="absolute -top-2.5 -right-2.5 w-9 h-9 rounded-full bg-background border-2 border-purple-500 flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-gradient-primary">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{t(`${step.key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">{t(`${step.key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
