import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncAcrossTabs } from '@utils/storage.utils';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import type { DashboardLayout, GridItem, GridPosition, GridDimensions } from '@app-types/layout.types';

interface LayoutActions {
  /**
   * Add a new widget instance to the grid.
   * @param widgetId - Registry widget type id, e.g. "clock"
   * @param dimensions - Initial grid dimensions; defaults to 8×8 if omitted
   */
  addWidget: (widgetId: string, dimensions?: GridDimensions) => void;
  /**
   * Remove a widget instance and its stored settings.
   * @param instanceId - The UUID of the instance to remove
   */
  removeWidget: (instanceId: string) => void;
  /**
   * Move a widget instance to a new grid position.
   * @param instanceId - The UUID of the instance to move
   * @param position - Target grid column/row
   */
  moveWidget: (instanceId: string, position: GridPosition) => void;
  /**
   * Resize a widget instance.
   * @param instanceId - The UUID of the instance to resize
   * @param dimensions - New width/height in grid units
   */
  resizeWidget: (instanceId: string, dimensions: GridDimensions) => void;
  /**
   * Toggle the dashboard between view mode and edit/drag mode.
   * @param editing - True to enter edit mode
   */
  setEditing: (editing: boolean) => void;
  /**
   * Toggle the locked state of a widget instance.
   * Locked widgets cannot be dragged or resized in edit mode.
   * @param instanceId - The UUID of the instance to lock/unlock
   */
  toggleLockWidget: (instanceId: string) => void;
}

type LayoutStore = DashboardLayout & LayoutActions;

const defaultLayout: DashboardLayout = {
  columns: 48,
  items: [],
  isEditing: false,
};

/**
 * Manages the dashboard grid layout.
 * Persisted to localStorage (except edit mode) and kept in sync across open tabs.
 */
export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      ...defaultLayout,

      addWidget: (widgetId, dimensions) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              instanceId: crypto.randomUUID(),
              widgetId,
              position: { col: 0, row: 0 },
              dimensions: dimensions ?? { w: 8, h: 8 },
            } satisfies GridItem,
          ],
        })),

      removeWidget: (instanceId) => {
        set((state) => ({
          items: state.items.filter((item) => item.instanceId !== instanceId),
        }));
        useWidgetSettingsStore.getState().removeSettings(instanceId);
      },

      moveWidget: (instanceId, position) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.instanceId === instanceId ? { ...item, position } : item,
          ),
        })),

      resizeWidget: (instanceId, dimensions) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.instanceId === instanceId ? { ...item, dimensions } : item,
          ),
        })),

      setEditing: (isEditing) => set({ isEditing }),

      toggleLockWidget: (instanceId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.instanceId === instanceId
              ? { ...item, isLocked: !item.isLocked }
              : item,
          ),
        })),
    }),
    {
      name: 'dashboard-layout',
      storage: createJSONStorage(() => localStorage),
      // Edit mode is per-tab UI state; persisting it reopens new tabs in edit mode.
      partialize: ({ columns, items }) => ({ columns, items }),
    },
  ),
);

syncAcrossTabs(useLayoutStore);
