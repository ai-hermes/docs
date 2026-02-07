import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rethink AI',
    short_name: 'Rethink AI',
    description: '重新思考对话，洞察人心 - AI 对话分析工具',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#A855F7',
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
