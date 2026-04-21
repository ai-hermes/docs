import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Clock, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  return { title: t('overview') };
}

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  const t = await getTranslations({ locale, namespace: 'dashboard' });
  const usagePercent = (user.analysisCount / user.analysisLimit) * 100;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('welcome')}, {user.nickname}!</h1>
        <p className="text-muted-foreground">{t('overview')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Quota Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('quota.title')}</CardDescription>
            <CardTitle className="text-2xl">
              {user.analysisCount} / {user.analysisLimit}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={usagePercent} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {t('quota.remaining')}: {user.analysisLimit - user.analysisCount}
            </p>
          </CardContent>
        </Card>

        {/* Plan Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('billing.currentPlan')}</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Badge variant={user.plan === 'free' ? 'secondary' : 'default'} className={user.plan !== 'free' ? 'gradient-primary text-white' : ''}>
                {user.plan.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.plan === 'free' ? (
              <Link href={`/${locale}/download`}>
                <Button size="sm" className="gradient-primary hover:gradient-primary-hover text-white">
                  {t('billing.upgrade')}
                </Button>
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t('billing.expireDate')}: {user.planExpiresAt?.toLocaleDateString() || 'N/A'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Action Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('startAnalysis')}</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full gradient-primary hover:gradient-primary-hover text-white gap-2">
              <Plus className="w-4 h-4" />
              {t('startAnalysis')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {t('recentAnalysis')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{t('noAnalysis')}</p>
            <Button variant="outline" className="mt-4">
              {t('startAnalysis')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
