export const locales = ['zh', 'en', 'ja', 'fr', 'ko', 'it', 'de', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  fr: 'Français',
  ko: '한국어',
  it: 'Italiano',
  de: 'Deutsch',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  zh: '🇨🇳',
  en: '🇺🇸',
  ja: '🇯🇵',
  fr: '🇫🇷',
  ko: '🇰🇷',
  it: '🇮🇹',
  de: '🇩🇪',
  ru: '🇷🇺',
};
