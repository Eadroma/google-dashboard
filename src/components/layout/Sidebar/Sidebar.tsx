import { useRef } from 'react';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';
import { Badge } from '@components/ui/Badge';
import { useLayoutStore } from '@stores/layout.store';
import { getAllWidgetMeta, getWidgetsByCategory } from '@widgets/registry';
import { useKeyPress } from '@hooks/useKeyPress';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetCategory, WidgetMeta } from '@app-types/widget.types';
import type { GridDimensions } from '@app-types/layout.types';

/**
 * Convert a WidgetSize string (e.g. "4x2") to GridDimensions scaled for the
 * 48-col / 10px-row fine grid (4× the logical widget size in each axis).
 */
function sizeToGridDimensions(defaultSize: WidgetMeta['defaultSize']): GridDimensions {
  const [w, h] = defaultSize.split('x').map(Number);
  return { w: (w ?? 2) * 4, h: (h ?? 2) * 4 };
}

interface SidebarProps {
  /** Whether the sidebar is visible */
  isOpen: boolean;
  /** Callback to close the sidebar */
  onClose: () => void;
}

const CATEGORIES: { id: WidgetCategory; icon: string }[] = [
  { id: 'core', icon: 'Layout' },
  { id: 'productivity', icon: 'Zap' },
  { id: 'google', icon: 'Globe' },
  { id: 'info', icon: 'BarChart2' },
];

/**
 * Widget picker drawer. Lists all registered widgets grouped by category.
 * Clicking a widget adds it to the dashboard grid.
 *
 * @param props.isOpen - Controls visibility
 * @param props.onClose - Called when the drawer should close
 */
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const addWidget = useLayoutStore((s) => s.addWidget);
  const allMeta = getAllWidgetMeta();
  const { t } = useTranslation();

  const CATEGORY_LABELS = {
    core: t('categoryCore'),
    productivity: t('categoryProductivity'),
    google: t('categoryGoogle'),
    info: t('categoryInfo'),
  } as const;

  useKeyPress('Escape', onClose, isOpen);
  useOnClickOutside(panelRef, onClose, isOpen);

  const handleAdd = (meta: WidgetMeta) => {
    addWidget(meta.id, sizeToGridDimensions(meta.defaultSize));
    onClose();
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="complementary"
        aria-label="Widget picker"
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto',
          'border-r border-white/10 bg-slate-900 shadow-2xl',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white">{t('sidebarTitle')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close widget picker"
          >
            <Icon name="X" size={16} className="text-white/60" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {CATEGORIES.map((cat) => {
            const entries = getWidgetsByCategory(cat.id);
            if (entries.length === 0) return null;

            return (
              <div key={cat.id}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name={cat.icon} size={14} className="text-white/40" />
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    {CATEGORY_LABELS[cat.id]}
                  </span>
                </div>
                <div className="space-y-1">
                  {entries.map(({ meta }) => (
                    <button
                      key={meta.id}
                      type="button"
                      onClick={() => { handleAdd(meta); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 shrink-0">
                        <Icon name={meta.icon} size={16} className="text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white/90 truncate">
                          {meta.name}
                        </div>
                        <div className="text-xs text-white/40 truncate">{meta.description}</div>
                      </div>
                      <Icon
                        name="Plus"
                        size={14}
                        className="text-white/30 group-hover:text-blue-400 shrink-0 transition-colors"
                      />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {allMeta.length === 0 && (
            <p className="text-sm text-white/40 text-center py-8">{t('noWidgets')}</p>
          )}
        </div>

        <div className="sticky bottom-0 px-5 py-3 border-t border-white/10 bg-slate-900">
          <Badge variant="info" className="text-xs">
            {t('widgetsCount', { count: allMeta.length })}
          </Badge>
        </div>
      </div>
    </>
  );
}
