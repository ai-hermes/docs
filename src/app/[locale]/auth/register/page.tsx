import { getTranslations } from 'next-intl/server';
import RegisterForm from '@/components/auth/RegisterForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.register' });

  return {
    title: t('title'),
  };
}

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <RegisterForm />
    </div>
  );
}
