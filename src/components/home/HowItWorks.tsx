'use client';

import { useTranslations } from 'next-intl';
import { Download, KeyRound, MessageCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    key: 'step1',
    icon: Download,
    number: '01',
  },
  {
    key: 'step2',
    icon: KeyRound,
    number: '02',
  },
  {
    key: 'step3',
    icon: MessageCircle,
    number: '03',
  },
];

export default function HowItWorks() {
  const t = useTranslations('home.howItWorks');

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30 absolute -right-3" />
                    <div className="h-px bg-gradient-to-r from-blue-400/50 to-purple-500/50" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step number & icon */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-purple-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-gradient-primary">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{t(`${step.key}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`${step.key}.description`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
