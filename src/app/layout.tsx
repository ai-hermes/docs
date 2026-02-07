import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    apple: '/images/icon-192.png',
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
