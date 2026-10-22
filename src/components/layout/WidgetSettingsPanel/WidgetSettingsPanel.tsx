import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';
import { useKeyPress } from '@hooks/useKeyPress';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetSettingsPanelProps } from './WidgetSettingsPanel.types';

/**
 * A slide-in panel from the right that renders the widget's SettingsComponent.
 * Closes on Escape key press or click outside the panel.
 *
 * @param props.isOpen - Controls panel visibility
 * @param props.onClose - Called when the panel should close
 * @param props.instanceId - Widget instance whose settings are shown
 * @param props.SettingsComponent - The widget-provided settings form
 */
export function WidgetSettingsPanel({
  isOpen,
  onClose,
  instanceId,
  SettingsComponent,
}: WidgetSettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useKeyPress('Escape', onClose, isOpen);
  useOnClickOutside(panelRef, onClose, isOpen);

  return createPortal(
    <>
      {/* Backdrop — rendered at body level to escape grid stacking contexts */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden="true"
      />

      {/* Slide-over panel — starts below the TopBar (pt accounts for top-bar height) */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Widget settings"
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-80 overflow-y-auto',
          'border-l border-white/10 bg-slate-900/95 shadow-2xl',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header — padded so it clears the TopBar */}
        <div className="flex items-center justify-between px-5 pt-16 pb-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white">{t('widgetSettingsTitle')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close settings"
          >
            <Icon name="X" size={16} className="text-white/60" />
          </button>
        </div>

        <div className="p-5">
          <SettingsComponent instanceId={instanceId} onClose={onClose} />
        </div>
      </div>
    </>,
    document.body,
  );
}
