import en from './en.json';
import es from './es.json';

const translations: Record<string, typeof en> = { en, es };

export function getTranslations(locale: string) {
  return translations[locale] || translations.en;
}

export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}
