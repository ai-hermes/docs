'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RELEASES_URL = '/api/releases';
const BASE_URL = 'https://static.rethinkai.spotty.com.cn';
const GITHUB_RELEASES = 'https://github.com/ai-hermes/wechat-mem0/releases';

interface Release {
  version: string;
  date: string;
  downloads: {
    'mac-arm64': string;
    'mac-x64': string;
    windows: string;
  };
}

interface ReleasesData {
  latest: string;
  releases: Release[];
}

type Platform = 'mac-arm64' | 'mac-x64' | 'windows';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 12V6.75l6-1.32v6.48L3 12zm6.73-.07 8.27-.9V2.46l-8.27 1.33v8.14zm-6.73 1.01 6 .09v6.81l-6-1.08V12.94zm6.73.17 8.27.14v8.78l-8.27-1.24v-7.68z" />
    </svg>
  );
}

function detectAppleSilicon(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return true;
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
    if (renderer.includes('apple')) return true;
    if (renderer.includes('intel')) return false;
    return true;
  } catch {
    return true;
  }
}

function detectPlatform(): Platform | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) {
    return detectAppleSilicon() ? 'mac-arm64' : 'mac-x64';
  }
  if (ua.includes('win')) return 'windows';
  return null;
}

const platformConfig: Record<Platform, { icon: typeof AppleIcon; label: string; sublabel: string }> = {
  'mac-arm64': { icon: AppleIcon, label: 'macOS', sublabel: 'Apple Silicon (M1/M2/M3/M4)' },
  'mac-x64': { icon: AppleIcon, label: 'macOS', sublabel: 'Intel' },
  windows: { icon: WindowsIcon, label: 'Windows', sublabel: 'x64' },
};

export default function DownloadClient() {
  const t = useTranslations('pricing');
  const [data, setData] = useState<ReleasesData | null>(null);
  const [error, setError] = useState(false);
  const [detected, setDetected] = useState<Platform | null>(null);

  useEffect(() => {
    setDetected(detectPlatform());
    fetch(RELEASES_URL)
      .then((res) => {
        if (!res.ok) throw new Error('fetch failed');
        return res.json();
      })
      .then((json: ReleasesData) => setData(json))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-5">{t('fetchError')}</p>
        <Button asChild variant="outline" className="gap-2 cursor-pointer">
          <a href={GITHUB_RELEASES} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            {t('githubFallback')}
          </a>
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const latest = data.releases[0];
  const platforms: Platform[] = ['mac-arm64', 'mac-x64', 'windows'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Version badge */}
      <div className="text-center mb-10">
        <Badge variant="secondary" className="text-sm px-4 py-1.5 font-medium">
          v{latest.version} &middot; {latest.date}
        </Badge>
      </div>

      {/* Download cards — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const config = platformConfig[platform];
          const Icon = config.icon;
          const isDetected = detected === platform;
          const downloadUrl = `${BASE_URL}/${latest.downloads[platform]}`;

          return (
            <div
              key={platform}
              className={`relative rounded-2xl border bg-card p-8 flex flex-col items-center text-center gap-5 transition-all duration-200 ${
                isDetected
                  ? 'border-purple-500/60 shadow-lg shadow-purple-500/10 scale-[1.02]'
                  : 'border-border/60 hover:border-border hover:shadow-md'
              }`}
            >
              {isDetected && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs px-3 py-1">
                  {t('recommended')}
                </Badge>
              )}
              <Icon className={`w-12 h-12 ${isDetected ? 'text-purple-500' : 'text-muted-foreground'}`} />
              <div>
                <p className="text-lg font-semibold">{config.label}</p>
                <p className="text-sm text-muted-foreground">{config.sublabel}</p>
              </div>
              <Button
                asChild
                className={`w-full gap-2 cursor-pointer transition-shadow duration-200 ${
                  isDetected
                    ? 'gradient-primary hover:gradient-primary-hover text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/25'
                    : ''
                }`}
                variant={isDetected ? 'default' : 'outline'}
              >
                <a href={downloadUrl}>
                  <Download className="w-4 h-4" />
                  {t('downloadBtn')}
                </a>
              </Button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
