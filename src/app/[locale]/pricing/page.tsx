import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('title') };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  const plans = [
    {
      key: 'free',
      popular: false,
    },
    {
      key: 'pro',
      popular: true,
    },
    {
      key: 'enterprise',
      popular: false,
    },
  ];

  const faqs = [0, 1, 2].map((i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
  }));

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
        {plans.map((plan) => {
          const featureCounts: Record<string, number> = { free: 4, pro: 6, enterprise: 6 };
          const count = featureCounts[plan.key] || 4;
          const features = Array.from({ length: count }, (_, i) =>
            t(`plans.${plan.key}.features.${i}`)
          );

          return (
            <Card
              key={plan.key}
              className={`relative ${plan.popular ? 'border-purple-500 border-2 shadow-lg shadow-purple-500/20' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white">
                  Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{t(`plans.${plan.key}.name`)}</CardTitle>
                <CardDescription>{t(`plans.${plan.key}.description`)}</CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">
                    {plan.key === 'enterprise' ? '' : '¥'}
                    {t(`plans.${plan.key}.price`)}
                  </span>
                  <span className="text-muted-foreground">{t(`plans.${plan.key}.period`)}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.key === 'enterprise' ? `/${locale}/contact` : `/${locale}/auth/register`}>
                  <Button
                    className={`w-full ${plan.popular ? 'gradient-primary hover:gradient-primary-hover text-white' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {t(`plans.${plan.key}.cta`)}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{t('faq.title')}</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
