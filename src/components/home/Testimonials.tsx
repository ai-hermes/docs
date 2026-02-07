'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border-border/50">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />

              <CardContent className="pt-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="gradient-primary text-white text-sm">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
