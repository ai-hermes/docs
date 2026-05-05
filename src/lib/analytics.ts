'use client';

import posthog, { type PostHog } from 'posthog-js';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

const CHANNEL_STORAGE_KEY = 'rethinkai_attribution_channel';
const KNOWN_CHANNELS = new Set([
  'tiktok',
  'twitter',
  'x',
  'google',
  'facebook',
  'instagram',
  'youtube',
  'reddit',
  'wechat',
  'weibo',
  'xiaohongshu',
  'rednote',
  'bilibili',
  'douyin',
  'linkedin',
  'producthunt',
  'github',
  'email',
  'direct',
]);

let initialized = false;

export function getPostHog(): PostHog | null {
  if (typeof window === 'undefined') return null;
  if (!KEY) return null;
  if (!initialized) {
    posthog.init(KEY, {
      api_host: HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: true,
      loaded: (ph) => {
        const stored = readStoredChannel();
        if (stored) ph.register({ attribution_channel: stored });
      },
    });
    initialized = true;
  }
  return posthog;
}

export function track(event: string, properties?: Record<string, unknown>): void {
  const ph = getPostHog();
  if (!ph) return;
  ph.capture(event, properties);
}

function sanitizeChannel(raw: string): string | null {
  const v = raw.trim().toLowerCase().slice(0, 32);
  if (!v) return null;
  if (!/^[a-z0-9_-]+$/.test(v)) return null;
  return v;
}

export function isKnownChannel(channel: string): boolean {
  return KNOWN_CHANNELS.has(channel);
}

function readStoredChannel(): string | null {
  try {
    return window.localStorage.getItem(CHANNEL_STORAGE_KEY);
  } catch {
    return null;
  }
}

function persistChannel(channel: string): void {
  try {
    window.localStorage.setItem(CHANNEL_STORAGE_KEY, channel);
  } catch {
    /* localStorage disabled */
  }
}

/**
 * Read `?channel=` from current URL. If present and valid:
 *   1. fire share_channel_attributed
 *   2. register as super-property so subsequent events carry it
 *   3. persist to localStorage
 *   4. strip from URL via history.replaceState (no reload)
 *
 * Idempotent: safe to call multiple times; only acts when URL has the param.
 */
export function captureChannelFromUrl(locale?: string): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const raw = url.searchParams.get('channel');
  if (!raw) return;

  const channel = sanitizeChannel(raw);
  url.searchParams.delete('channel');
  const cleanedUrl = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '') + url.hash;

  if (channel) {
    const ph = getPostHog();
    if (ph) {
      ph.register({ attribution_channel: channel });
      ph.capture('share_channel_attributed', {
        channel,
        is_known_channel: isKnownChannel(channel),
        locale,
        landing_path: url.pathname,
        referrer: document.referrer || null,
      });
    }
    persistChannel(channel);
  }

  // Always strip the param to avoid re-capture on refresh / re-share, even if invalid
  window.history.replaceState(window.history.state, '', cleanedUrl);
}

export function getAttributionChannel(): string | null {
  if (typeof window === 'undefined') return null;
  return readStoredChannel();
}
