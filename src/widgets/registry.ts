import type { RegistryEntry, WidgetMeta } from '@app-types/widget.types';

/**
 * Singleton map from widget id to its full registry entry.
 * Access only via the exported helper functions — never import this directly.
 */
const _registry = new Map<string, RegistryEntry>();

/**
 * Register a widget with the dashboard system.
 * Must be called exactly once per widget type, in the widget's `*.register.ts` file.
 *
 * @param entry - The full registry entry including metadata and component references
 * @throws If a widget with the same id is already registered (prevents accidental double-registration)
 */
export function registerWidget(entry: RegistryEntry): void {
  if (_registry.has(entry.meta.id)) {
    throw new Error(
      `[WidgetRegistry] Widget "${entry.meta.id}" is already registered. Each widget id must be unique.`,
    );
  }
  _registry.set(entry.meta.id, entry);
}

/**
 * Look up a widget's registry entry by its stable id.
 *
 * @param id - The widget's kebab-case identifier, e.g. "clock"
 * @returns The RegistryEntry if found, or undefined if the id is not registered
 */
export function resolveWidget(id: string): RegistryEntry | undefined {
  return _registry.get(id);
}

/**
 * Return the metadata for every registered widget.
 * Used by the widget picker sidebar to list available widgets.
 *
 * @returns Array of WidgetMeta objects, in registration order
 */
export function getAllWidgetMeta(): WidgetMeta[] {
  return Array.from(_registry.values()).map((entry) => entry.meta);
}

/**
 * Return all registry entries that belong to a specific category.
 *
 * @param category - The category to filter by
 * @returns Array of matching RegistryEntry objects
 */
export function getWidgetsByCategory(
  category: WidgetMeta['category'],
): RegistryEntry[] {
  return Array.from(_registry.values()).filter(
    (entry) => entry.meta.category === category,
  );
}
