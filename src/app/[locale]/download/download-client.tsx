'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Monitor, Apple, Download, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RELEASES_URL = '/api/releases';
const BASE_URL = 'http://static.rethinkai.spotty.com.cn';
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

function detectPlatform(): Platform | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) {
    // Default to arm64 for modern Macs
    return 'mac-arm64';
  }
  if (ua.includes('win')) return 'windows';
  return null;
}

const platformConfig: Record<Platform, { icon: typeof Apple; label: string; sublabel: string }> = {
  'mac-arm64': { icon: Apple, label: 'macOS', sublabel: 'Apple Silicon (M1/M2/M3/M4)' },
  'mac-x64': { icon: Apple, label: 'macOS', sublabel: 'Intel' },
  windows: { icon: Monitor, label: 'Windows', sublabel: 'x64' },
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
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{t('fetchError')}</p>
        <a href={GITHUB_RELEASES} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            {t('githubFallback')}
          </Button>
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const latest = data.releases[0];
  const platforms: Platform[] = ['mac-arm64', 'mac-x64', 'windows'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Version badge */}
      <div className="text-center mb-8">
        <Badge variant="secondary" className="text-sm px-3 py-1">
          v{latest.version} &middot; {latest.date}
        </Badge>
      </div>

      {/* Download cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const config = platformConfig[platform];
          const Icon = config.icon;
          const isDetected = detected === platform;
          const downloadUrl = `${BASE_URL}/${latest.downloads[platform]}`;

          return (
            <Card
              key={platform}
              className={`relative transition-all hover:shadow-lg ${
                isDetected ? 'border-purple-500 border-2 shadow-md shadow-purple-500/20' : ''
              }`}
            >
              {isDetected && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white">
                  {t('recommended')}
                </Badge>
              )}
              <CardContent className="pt-8 pb-6 flex flex-col items-center text-center gap-4">
                <Icon className="w-12 h-12 text-muted-foreground" />
                <div>
                  <p className="text-lg font-semibold">{config.label}</p>
                  <p className="text-sm text-muted-foreground">{config.sublabel}</p>
                </div>
                <a href={downloadUrl} className="w-full">
                  <Button
                    className={`w-full gap-2 ${
                      isDetected ? 'gradient-primary hover:gradient-primary-hover text-white' : ''
                    }`}
                    variant={isDetected ? 'default' : 'outline'}
                  >
                    <Download className="w-4 h-4" />
                    {t('downloadBtn')}
                  </Button>
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Open source note */}
      <p className="text-center text-sm text-muted-foreground mt-8">
        {t('openSourceNote')}{' '}
        <a
          href={GITHUB_RELEASES}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
