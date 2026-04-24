'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare, Layers, KeyRound, Puzzle } from 'lucide-react';

const features = [
  { key: 'personality', icon: MessageSquare },
  { key: 'emotion', icon: Layers },
  { key: 'intent', icon: KeyRound },
  { key: 'multilingual', icon: Puzzle },
];

export default function Features() {
  const t = useTranslations('home.features');

  return (
    <section id="features" className="py-24 md:py-36">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">{t('title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="group relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-200 hover:border-border hover:shadow-lg cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2.5 tracking-tight">{t(`${feature.key}.title`)}</h3>
                <p className="text-muted-foreground text-[0.925rem] leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
