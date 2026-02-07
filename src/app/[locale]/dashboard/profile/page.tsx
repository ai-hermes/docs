import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard.profile' });
  return { title: t('title') };
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  const t = await getTranslations({ locale, namespace: 'dashboard.profile' });

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>
            {t('createdAt')}: {user.createdAt.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar || ''} />
              <AvatarFallback className="gradient-primary text-white text-2xl">
                {user.nickname?.slice(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{t('avatar')}</p>
              <Button variant="outline" size="sm" className="mt-2">
                {t('changeAvatar')}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Nickname */}
          <div className="space-y-2">
            <Label htmlFor="nickname">{t('nickname')}</Label>
            <Input
              id="nickname"
              defaultValue={user.nickname || ''}
              placeholder={t('nickname')}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>{t('phone')}</Label>
            <div className="flex items-center gap-2">
              <Input
                value={user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                disabled
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                {t('bindPhone')}
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>{t('email')}</Label>
            <div className="flex items-center gap-2">
              <Input
                value={user.email || ''}
                placeholder="example@email.com"
                disabled
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                {t('bindEmail')}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button className="gradient-primary hover:gradient-primary-hover text-white">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
