import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://rethinkai.com'),
  title: {
    template: '%s | Rethink AI',
    default: 'Rethink AI - 重新思考对话，洞察人心',
  },
  description: '导入聊天记录，AI 帮你分析对话者的性格、情绪和真实诉求',
  keywords: ['AI', '聊天分析', '性格分析', '情绪识别', '对话洞察'],
  authors: [{ name: 'Rethink AI' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Rethink AI',
    title: 'Rethink AI - 重新思考对话，洞察人心',
    description: '导入聊天记录，AI 帮你分析对话者的性格、情绪和真实诉求',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rethink AI - 重新思考对话，洞察人心',
    description: '导入聊天记录，AI 帮你分析对话者的性格、情绪和真实诉求',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
