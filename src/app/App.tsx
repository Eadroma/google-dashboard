import type { CSSProperties } from 'react';
import { useState, useCallback } from 'react';
import { useThemeStore } from '@stores/theme.store';
import { DashboardGrid } from '@components/layout/DashboardGrid';
import { TopBar } from '@components/layout/TopBar';
import { Sidebar } from '@components/layout/Sidebar';
import { SettingsModal } from '@components/layout/SettingsModal';
import type { Background } from '@app-types/theme.types';

/**
 * Root application component.
 * The background is a separate fixed div so any CSS filter (brightness/blur on
 * image backgrounds) does not bleed into widget content.
 */
export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { background } = useThemeStore();

  const openSidebar = useCallback(() => { setSidebarOpen(true); }, []);
  const closeSidebar = useCallback(() => { setSidebarOpen(false); }, []);
  const openSettings = useCallback(() => { setSettingsOpen(true); }, []);
  const closeSettings = useCallback(() => { setSettingsOpen(false); }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background layer — no z-index so it sits above body colour but below DOM-order siblings */}
      <div className="fixed inset-0" style={buildBackgroundStyle(background)} />

      {/* Content — relative + z-0 ensures it always paints above the background fixed div */}
      <div className="relative z-0 min-h-screen">
        <DashboardGrid />
        <TopBar onOpenSidebar={openSidebar} onOpenSettings={openSettings} />
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <SettingsModal isOpen={settingsOpen} onClose={closeSettings} />
      </div>
    </div>
  );
}

/**
 * Build the inline background CSS from the theme store's background config.
 *
 * @param background - The background discriminated union from the theme store
 * @returns A React CSSProperties object
 */
function buildBackgroundStyle(background: Background): CSSProperties {
  if (background.type === 'solid') {
    return { backgroundColor: background.color };
  }
  if (background.type === 'gradient') {
    return {
      backgroundImage: `linear-gradient(${background.direction}, ${background.from}, ${background.to})`,
    };
  }
  return {
    backgroundImage: `url(${JSON.stringify(background.url)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: `brightness(${background.brightness})`,
  };
}
