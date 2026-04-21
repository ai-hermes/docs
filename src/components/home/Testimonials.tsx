'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Testimonials() {
  const t = useTranslations('home.testimonials');

  const testimonials = [
    {
      content: t('items.0.content'),
      author: t('items.0.author'),
      role: t('items.0.role'),
      avatar: 'ZM',
    },
    {
      content: t('items.1.content'),
      author: t('items.1.author'),
      role: t('items.1.role'),
      avatar: 'LT',
    },
    {
      content: t('items.2.content'),
      author: t('items.2.author'),
      role: t('items.2.role'),
      avatar: 'WQ',
    },
  ];

  return (
    <section className="py-24 md:py-36">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-semibold text-gradient-primary uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">{t('title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-border/60 bg-card p-8 transition-all duration-200 hover:shadow-lg hover:border-border"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-purple-500/15 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-8 leading-relaxed text-[0.95rem]">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="gradient-primary text-white text-xs font-medium">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
