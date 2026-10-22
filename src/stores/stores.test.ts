// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLayoutStore } from '@stores/layout.store';
import { useWidgetSettingsStore } from '@stores/widgetSettings.store';
import { readCachedEvents } from '@features/github-activity/useGithubActivity';

beforeEach(() => {
  localStorage.clear();
  useLayoutStore.setState({ items: [], isEditing: false });
  useWidgetSettingsStore.setState({ settings: {} });
});

describe('layout + widget settings stores', () => {
  it('removing a widget also deletes its settings', () => {
    useLayoutStore.getState().addWidget('notes');
    const id = useLayoutStore.getState().items[0]?.instanceId ?? '';
    expect(id).not.toBe('');
    useWidgetSettingsStore.getState().updateSettings(id, { content: 'secret' });

    useLayoutStore.getState().removeWidget(id);

    expect(useLayoutStore.getState().items).toHaveLength(0);
    expect(useWidgetSettingsStore.getState().settings[id]).toBeUndefined();
  });

  it('picks up a write made by another tab instead of overwriting it', async () => {
    // Simulate another tab saving a todo, then the browser's storage event.
    const other = { settings: { w1: { items: [{ id: 't1', text: 'pay rent' }] } } };
    localStorage.setItem('widget-settings', JSON.stringify({ state: other, version: 0 }));
    window.dispatchEvent(new StorageEvent('storage', { key: 'widget-settings' }));

    await vi.waitFor(() => {
      expect(useWidgetSettingsStore.getState().settings).toEqual(other.settings);
    });

    // A later write in this tab keeps the other tab's data.
    useWidgetSettingsStore.getState().updateSettings('w2', { content: 'note' });
    const saved = JSON.parse(localStorage.getItem('widget-settings') ?? '{}') as { state: typeof other };
    expect(Object.keys(saved.state.settings)).toEqual(['w1', 'w2']);
  });

  it('does not persist edit mode', () => {
    useLayoutStore.getState().setEditing(true);
    const saved = JSON.parse(localStorage.getItem('dashboard-layout') ?? '{}') as { state: object };
    expect(saved.state).not.toHaveProperty('isEditing');
  });
});

describe('GitHub events cache', () => {
  it('serves fresh entries and drops stale ones', () => {
    localStorage.setItem('gh:octocat', JSON.stringify({ at: 1_000, data: [{ id: 'e1' }] }));
    expect(readCachedEvents('Octocat', 1_000 + 60_000)).toEqual([{ id: 'e1' }]);
    expect(readCachedEvents('octocat', 1_000 + 10 * 60_000)).toBeNull();
    expect(readCachedEvents('nobody')).toBeNull();
  });
});
