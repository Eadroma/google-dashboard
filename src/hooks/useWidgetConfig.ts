import { useWidgetSettingsStore } from '@stores/widgetSettings.store';

/**
 * Reactively reads per-widget config from the settings store.
 *
 * Unlike calling `getSettings()` directly, this hook subscribes to
 * `s.settings[instanceId]` — a reference that changes on every `updateSettings`
 * call — so the component re-renders whenever the widget's config changes.
 *
 * @param instanceId - Widget instance UUID
 * @param defaults - Fallback values merged under stored values
 * @returns Merged config with stored values taking precedence over defaults
 */
export function useWidgetConfig<T>(instanceId: string, defaults: T): T {
  const stored = useWidgetSettingsStore((s) => s.settings[instanceId]);
  if (!stored) return defaults;
  return { ...defaults, ...stored };
}
