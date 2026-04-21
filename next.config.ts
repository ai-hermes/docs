import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  env: {
    BUILD_TIME: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Shanghai' }).replace(' ', 'T'),
  },
  async rewrites() {
    return [
      {
        source: '/dl/:path*',
        destination: 'http://static.rethinkai.spotty.com.cn/:path*',
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
