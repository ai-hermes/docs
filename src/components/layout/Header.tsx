'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/docs`, label: t('docs') },
    { href: `/${locale}/pricing`, label: t('pricing') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Rethink AI"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-gradient-primary">
            {t('brand')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href={`/${locale}/auth/login`}>
            <Button variant="ghost" size="sm">
              {t('login')}
            </Button>
          </Link>
          <Link href={`/${locale}/auth/register`}>
            <Button size="sm" className="gradient-primary hover:gradient-primary-hover text-white">
              {t('register')}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4">
                <LanguageSwitcher />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Link href={`/${locale}/auth/login`} onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t('login')}
                  </Button>
                </Link>
                <Link href={`/${locale}/auth/register`} onClick={() => setIsOpen(false)}>
                  <Button className="w-full gradient-primary hover:gradient-primary-hover text-white">
                    {t('register')}
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
