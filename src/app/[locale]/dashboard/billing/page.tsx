import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { CreditCard, Receipt, AlertCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard.billing' });
  return { title: t('title') };
}

export default async function BillingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  const t = await getTranslations({ locale, namespace: 'dashboard.billing' });

  // Get billing history
  const billingHistory = await prisma.billingHistory.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  const planNames: Record<string, string> = {
    free: 'Free',
    pro: 'Pro',
    enterprise: 'Enterprise',
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            {t('currentPlan')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant={user.plan === 'free' ? 'secondary' : 'default'} className={user.plan !== 'free' ? 'gradient-primary text-white text-lg px-4 py-1' : 'text-lg px-4 py-1'}>
                {planNames[user.plan]}
              </Badge>
              {user.planExpiresAt && (
                <p className="text-sm text-muted-foreground mt-2">
                  {t('expireDate')}: {user.planExpiresAt.toLocaleDateString()}
                </p>
              )}
            </div>
            {user.plan === 'free' ? (
              <Link href={`/${locale}/pricing`}>
                <Button className="gradient-primary hover:gradient-primary-hover text-white">
                  {t('upgrade')}
                </Button>
              </Link>
            ) : (
              <Button variant="outline" className="text-destructive hover:text-destructive">
                {t('cancel')}
              </Button>
            )}
          </div>

          {user.plan !== 'free' && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('autoRenew')}</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically renew your subscription
                  </p>
                </div>
                <Switch checked={user.autoRenew} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {t('history')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {billingHistory.length > 0 ? (
            <div className="space-y-4">
              {billingHistory.map((record: any) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{planNames[record.plan]} Plan</p>
                    <p className="text-sm text-muted-foreground">
                      {record.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {record.currency} {record.amount.toFixed(2)}
                    </p>
                    <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                      {record.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('noHistory')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
