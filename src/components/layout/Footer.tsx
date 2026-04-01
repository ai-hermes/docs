'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  const footerLinks = {
    product: [
      { href: `/${locale}/#features`, label: t('features') },
      { href: `/${locale}/pricing`, label: t('pricing') },
      { href: `/${locale}/docs`, label: t('docs') },
    ],
    company: [
      { href: `/${locale}/about`, label: t('about') },
      { href: `/${locale}/blog`, label: t('blog') },
      { href: `/${locale}/careers`, label: t('careers') },
    ],
    legal: [
      { href: `/${locale}/docs/terms`, label: t('terms') },
      { href: `/${locale}/docs/privacy`, label: t('privacy') },
      { href: `/${locale}/contact`, label: t('contact') },
    ],
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Rethink AI"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-gradient-primary">
                {tCommon('brand')}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {tCommon('slogan')}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('product')}</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
