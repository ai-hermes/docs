import { getTranslations } from 'next-intl/server';
import LoginForm from '@/components/auth/LoginForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.login' });

  return {
    title: t('title'),
  };
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <LoginForm />
    </div>
  );
}
