/** The part of a Zustand persist store that cross-tab sync needs */
interface PersistedStore {
  persist: {
    getOptions: () => { name?: string };
    rehydrate: () => Promise<void> | void;
  };
}

/**
 * Reload a persisted store whenever another tab writes its localStorage key.
 * Every new tab is a separate app instance; without this, a stale tab writes
 * its old state back and erases what the other tab saved.
 *
 * @param store - A Zustand store created with the persist middleware
 */
export function syncAcrossTabs(store: PersistedStore): void {
  window.addEventListener('storage', (event) => {
    if (event.key === store.persist.getOptions().name) void store.persist.rehydrate();
  });
}
