import { useState, useCallback } from 'react';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';
import { Tooltip } from '@components/ui/Tooltip';
import { useLayoutStore } from '@stores/layout.store';
import { useTranslation } from '@hooks/useTranslation';
import { WidgetSettingsPanel } from '@components/layout/WidgetSettingsPanel';
import { resolveWidget } from '@widgets/registry';
import type { WidgetFrameProps } from './WidgetFrame.types';

/**
 * Wraps every widget with a drag handle (in edit mode), lock/settings/remove
 * controls, and the settings slide-over panel.
 *
 * @param props.instanceId - UUID of the widget instance
 * @param props.widgetId - Widget type id for registry lookup
 * @param props.isEditing - Whether the dashboard is in edit mode
 * @param props.isLocked - When true drag/resize are disabled and only unlock is shown
 * @param props.children - The rendered widget component
 */
export function WidgetFrame({ instanceId, widgetId, isEditing, isLocked, children }: WidgetFrameProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { removeWidget, toggleLockWidget } = useLayoutStore();
  const { t } = useTranslation();

  const handleRemove = useCallback(() => {
    removeWidget(instanceId);
  }, [removeWidget, instanceId]);

  const handleToggleLock = useCallback(() => {
    toggleLockWidget(instanceId);
    if (!isLocked) setSettingsOpen(false);
  }, [toggleLockWidget, instanceId, isLocked]);

  const entry = resolveWidget(widgetId);
  const hasSettings = !!entry?.SettingsComponent;

  return (
    <>
      <div
        className={cn(
          'relative h-full w-full overflow-hidden',
          'rounded-2xl',
          isEditing && (isLocked ? 'ring-2 ring-yellow-500/40' : 'ring-2 ring-blue-500/50'),
        )}
      >
        {/* Edit-mode toolbar */}
        {isEditing && (
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-black/30 backdrop-blur-sm">
            {/* Drag area — hidden when locked */}
            {isLocked ? (
              <div className="flex-1" />
            ) : (
              <div className="drag-handle flex flex-1 items-center px-2 py-1 cursor-grab active:cursor-grabbing min-w-0">
                <Icon name="GripHorizontal" size={14} className="text-white/40 pointer-events-none" />
              </div>
            )}

            <div className="flex items-center gap-1 px-1 py-1">
              {/* Settings — hidden when locked */}
              {!isLocked && hasSettings && (
                <Tooltip content={t('widgetSettingsLabel')}>
                  <button
                    type="button"
                    onClick={() => { setSettingsOpen(true); }}
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label={t('widgetSettingsLabel')}
                  >
                    <Icon name="Settings" size={12} className="text-white/70" />
                  </button>
                </Tooltip>
              )}

              {/* Lock / Unlock */}
              <Tooltip content={isLocked ? t('unlockWidget') : t('lockWidget')}>
                <button
                  type="button"
                  onClick={handleToggleLock}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-md transition-colors',
                    isLocked
                      ? 'bg-yellow-500/25 hover:bg-yellow-500/45'
                      : 'bg-white/10 hover:bg-white/20',
                  )}
                  aria-label={isLocked ? t('unlockWidget') : t('lockWidget')}
                >
                  <Icon
                    name={isLocked ? 'LockOpen' : 'Lock'}
                    size={12}
                    className={isLocked ? 'text-yellow-400' : 'text-white/70'}
                  />
                </button>
              </Tooltip>

              {/* Remove — hidden when locked */}
              {!isLocked && (
                <Tooltip content={t('removeWidget')}>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 hover:bg-red-500/60 transition-colors"
                    aria-label={t('removeWidget')}
                  >
                    <Icon name="X" size={12} className="text-white/70" />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        )}

        {/* Widget content */}
        <div className="h-full w-full overflow-auto">
          {children}
        </div>
      </div>

      {/* Settings panel — only available when unlocked */}
      {hasSettings && entry.SettingsComponent && !isLocked && (
        <WidgetSettingsPanel
          isOpen={settingsOpen}
          onClose={() => { setSettingsOpen(false); }}
          instanceId={instanceId}
          SettingsComponent={entry.SettingsComponent}
        />
      )}
    </>
  );
}
