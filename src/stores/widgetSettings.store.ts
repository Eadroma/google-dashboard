import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncAcrossTabs } from '@utils/storage.utils';

/** Internal storage format — opaque bag of JSON-serialisable values */
type StoredConfig = Record<string, unknown>;

interface WidgetSettingsState {
  /** Map from instanceId to that widget instance's raw config object */
  settings: Record<string, StoredConfig>;
}

interface WidgetSettingsActions {
  /**
   * Partially update the settings for a widget instance.
   *
   * @param instanceId - The widget instance UUID
   * @param patch - Partial config to merge into existing settings
   */
  updateSettings: <T>(instanceId: string, patch: Partial<T>) => void;
  /**
   * Remove all stored settings for a widget instance.
   * Called when the widget is removed from the dashboard.
   *
   * @param instanceId - The widget instance UUID to clear
   */
  removeSettings: (instanceId: string) => void;
}

type WidgetSettingsStore = WidgetSettingsState & WidgetSettingsActions;

/**
 * Stores per-widget-instance configuration, keyed by instanceId.
 * Widgets read their config with the useWidgetConfig hook.
 * Persisted to localStorage and kept in sync across open tabs.
 */
export const useWidgetSettingsStore = create<WidgetSettingsStore>()(
  persist(
    (set) => ({
      settings: {},

      updateSettings: <T>(instanceId: string, patch: Partial<T>): void => {
        set((s) => ({
          settings: {
            ...s.settings,
            [instanceId]: {
              ...(s.settings[instanceId] ?? {}),
              ...(patch as StoredConfig),
            },
          },
        }));
      },

      removeSettings: (instanceId) => {
        set((s) => {
          const { [instanceId]: _removed, ...rest } = s.settings;
          return { settings: rest };
        });
      },
    }),
    {
      name: 'widget-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

syncAcrossTabs(useWidgetSettingsStore);
