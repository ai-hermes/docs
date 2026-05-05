'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { captureChannelFromUrl, getPostHog } from '@/lib/analytics';

/**
 * Mount once in the locale layout to:
 *   - bootstrap PostHog client
 *   - capture share-channel attribution (?channel=...) and strip the param
 */
export default function AnalyticsProvider() {
  const params = useParams();
  const locale = (params?.locale as string) || undefined;

  useEffect(() => {
    getPostHog();
    captureChannelFromUrl(locale);
  }, [locale]);

  return null;
}
