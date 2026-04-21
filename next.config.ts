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
    BUILD_TIME: new Date().toISOString(),
    BUILD_ID: `${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}`,
  },
};

export default withNextIntl(withMDX(nextConfig));
