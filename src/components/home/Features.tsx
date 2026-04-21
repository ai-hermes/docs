'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare, Layers, KeyRound, Puzzle } from 'lucide-react';

const features = [
  {
    key: 'personality',
    icon: MessageSquare,
    gradient: 'from-indigo-500 to-blue-500',
    shadow: 'shadow-indigo-500/20',
  },
  {
    key: 'emotion',
    icon: Layers,
    gradient: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-500/20',
  },
  {
    key: 'intent',
    icon: KeyRound,
    gradient: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-500/20',
  },
  {
    key: 'multilingual',
    icon: Puzzle,
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/20',
  },
];

export default function Features() {
  const t = useTranslations('home.features');

  return (
    <section id="features" className="py-24 md:py-36">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-semibold text-gradient-primary uppercase tracking-wider mb-3">Features</p>
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
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg ${feature.shadow} transition-transform duration-200 group-hover:scale-105`}>
                  <Icon className="w-6 h-6 text-white" />
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
