'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Phone, KeyRound, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SocialLoginButtons from './SocialLoginButtons';

export default function LoginForm() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!phone) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send code');
      }

      setCodeSent(true);
      setCountdown(60);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !code) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      router.push(`/${locale}/dashboard`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">{t('phone')}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder={t('phonePlaceholder')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">{t('code')}</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="code"
                  type="text"
                  placeholder={t('codePlaceholder')}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="pl-10"
                  maxLength={6}
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleSendCode}
                disabled={!phone || countdown > 0 || loading}
                className="shrink-0"
              >
                {countdown > 0 ? `${countdown}s` : codeSent ? t('codeSent') : t('sendCode')}
              </Button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full gradient-primary hover:gradient-primary-hover text-white"
            disabled={loading || !phone || !code}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('submit')}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">{t('or')}</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground text-center mb-4">{t('socialLogin')}</p>
            <SocialLoginButtons />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('noAccount')}{' '}
          <Link
            href={`/${locale}/auth/register`}
            className="text-purple-500 hover:underline font-medium"
          >
            {t('registerNow')}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
