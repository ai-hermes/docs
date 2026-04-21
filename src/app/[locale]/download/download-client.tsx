'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Monitor, Apple, Download, ExternalLink, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RELEASES_URL = '/api/releases';
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

function detectAppleSilicon(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true; // default to arm64 if WebGL unavailable
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return true;
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
    // Apple GPU = Apple Silicon; Intel HD/Iris/UHD = Intel Mac
    if (renderer.includes('apple')) return true;
    if (renderer.includes('intel')) return false;
    return true; // default arm64 for unknown
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
  const [showAll, setShowAll] = useState(false);

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
  const allPlatforms: Platform[] = ['mac-arm64', 'mac-x64', 'windows'];
  const otherPlatforms = allPlatforms.filter((p) => p !== detected);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Version badge */}
      <div className="text-center mb-10">
        <Badge variant="secondary" className="text-sm px-4 py-1.5 font-medium">
          v{latest.version} &middot; {latest.date}
        </Badge>
      </div>

      {/* Recommended download — prominent card */}
      {detected && (
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative rounded-2xl border-2 border-purple-500/60 bg-card p-10 flex flex-col items-center text-center gap-6 shadow-lg shadow-purple-500/10">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs px-4 py-1">
              {t('recommended')}
            </Badge>
            {(() => {
              const config = platformConfig[detected];
              const Icon = config.icon;
              const downloadUrl = `/api/download?file=${encodeURIComponent(latest.downloads[detected])}`;
              return (
                <>
                  <Icon className="w-16 h-16 text-purple-500" />
                  <div>
                    <p className="text-xl font-semibold">{config.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{config.sublabel}</p>
                  </div>
                  <Button asChild className="w-full max-w-xs gap-2 cursor-pointer gradient-primary hover:gradient-primary-hover text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow duration-200 h-12 text-base">
                    <a href={downloadUrl}>
                      <Download className="w-5 h-5" />
                      {t('downloadBtn')}
                    </a>
                  </Button>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Toggle other platforms */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 cursor-pointer"
        >
          {t('otherPlatforms')}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Other platform cards */}
      {showAll && (
        <div className={`grid grid-cols-1 ${detected ? 'md:grid-cols-2 max-w-2xl' : 'md:grid-cols-3 max-w-4xl'} gap-4 mx-auto`}>
          {(detected ? otherPlatforms : allPlatforms).map((platform) => {
            const config = platformConfig[platform];
            const Icon = config.icon;
            const downloadUrl = `/api/download?file=${encodeURIComponent(latest.downloads[platform])}`;

            return (
              <div
                key={platform}
                className="rounded-xl border border-border/60 bg-card p-6 flex items-center gap-4 hover:border-border hover:shadow-md transition-all duration-200"
              >
                <Icon className="w-10 h-10 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{config.label}</p>
                  <p className="text-xs text-muted-foreground">{config.sublabel}</p>
                </div>
                <Button asChild variant="outline" size="sm" className="gap-1.5 cursor-pointer shrink-0">
                  <a href={downloadUrl}>
                    <Download className="w-3.5 h-3.5" />
                    {t('downloadBtn')}
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Open source note */}
      <p className="text-center text-sm text-muted-foreground mt-10">
        {t('openSourceNote')}{' '}
        <a
          href={GITHUB_RELEASES}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors duration-200"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
