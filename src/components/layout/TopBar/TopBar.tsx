import { useCallback } from 'react';
import { cn } from '@utils/classnames.utils';
import { Button } from '@components/ui/Button';
import { Icon } from '@components/ui/Icon';
import { Tooltip } from '@components/ui/Tooltip';
import { useLayoutStore } from '@stores/layout.store';
import { useTranslation } from '@hooks/useTranslation';

interface TopBarProps {
  /** Callback to open the widget picker sidebar */
  onOpenSidebar: () => void;
  /** Callback to open the settings modal */
  onOpenSettings: () => void;
}

/**
 * The top-right control bar visible on the dashboard.
 * Contains the edit mode toggle, add widget button, and settings button.
 *
 * @param props.onOpenSidebar - Opens the widget picker sidebar
 * @param props.onOpenSettings - Opens the settings modal
 */
export function TopBar({ onOpenSidebar, onOpenSettings }: TopBarProps) {
  const { isEditing, setEditing } = useLayoutStore();
  const { t } = useTranslation();

  const toggleEdit = useCallback(() => { setEditing(!isEditing); }, [isEditing, setEditing]);

  return (
    <div className="fixed top-4 right-4 z-30 flex items-center gap-2">
      {isEditing && (
        <Tooltip content={t('addWidget')}>
          <Button variant="secondary" size="sm" leftIcon="Plus" onClick={onOpenSidebar}>
            {t('addWidget')}
          </Button>
        </Tooltip>
      )}

      <Tooltip content={isEditing ? t('done') : t('edit')}>
        <Button
          variant={isEditing ? 'primary' : 'ghost'}
          size="sm"
          onClick={toggleEdit}
          leftIcon={isEditing ? 'Check' : 'LayoutDashboard'}
          className={cn(isEditing && 'ring-2 ring-blue-400/50')}
        >
          {isEditing ? t('done') : t('edit')}
        </Button>
      </Tooltip>

      <Tooltip content={t('settingsTitle')}>
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={t('settingsTitle')}
        >
          <Icon name="Settings2" size={16} className="text-white/70" />
        </button>
      </Tooltip>
    </div>
  );
}
