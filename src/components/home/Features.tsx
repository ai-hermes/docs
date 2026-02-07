'use client';

import { useTranslations } from 'next-intl';
import { Brain, Heart, Target, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    key: 'personality',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'emotion',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    key: 'intent',
    icon: Target,
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    key: 'multilingual',
    icon: Globe,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function Features() {
  const t = useTranslations('home.features');

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.key}
                className="group relative overflow-hidden border-border/50 hover:border-border transition-all hover:shadow-lg"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t(`${feature.key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t(`${feature.key}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
