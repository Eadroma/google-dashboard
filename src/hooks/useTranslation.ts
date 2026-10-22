import { useLocaleStore } from '@stores/locale.store';
import { translations, LOCALE_BCP47 } from '@locales/translations';
import type { TranslationKey } from '@locales/translations';

/** Return value of useTranslation. */
export interface UseTranslationResult {
  /**
   * Translate a key, optionally substituting {{var}} placeholders.
   * @param key - Translation key
   * @param vars - Optional map of placeholder names to values
   */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /** Current locale identifier, e.g. "en" or "fr". */
  locale: string;
  /** BCP 47 tag for Intl APIs, e.g. "en-US" or "fr-FR". */
  bcp47: string;
}

/**
 * Returns a `t()` translate function bound to the current locale,
 * plus the raw locale string and BCP 47 tag for Intl date/number APIs.
 */
export function useTranslation(): UseTranslationResult {
  const locale = useLocaleStore((s) => s.locale);
  const bcp47 = LOCALE_BCP47[locale];

  function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    let value: string = translations[locale][key];
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        value = value.replaceAll(`{{${k}}}`, String(v));
      }
    }
    return value;
  }

  return { t, locale, bcp47 };
}
