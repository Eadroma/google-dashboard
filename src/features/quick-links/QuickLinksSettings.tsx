import { type FC, useState } from 'react';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Switch } from '@components/ui/Switch';
import { Icon } from '@components/ui/Icon';
import { useQuickLinks } from './useQuickLinks';
import { useTranslation } from '@hooks/useTranslation';
import type { WidgetSettingsProps } from '@app-types/widget.types';

/**
 * Settings panel for the Quick Links widget.
 * Allows adding, removing, and toggling display options.
 *
 * @param props.instanceId - Widget instance being configured
 */
export const QuickLinksSettings: FC<WidgetSettingsProps> = ({ instanceId }) => {
  const { config, addLink, removeLink, setShowLabels } = useQuickLinks(instanceId);
  const { t } = useTranslation();
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = () => {
    const trimmedLabel = newLabel.trim();
    const trimmedUrl = newUrl.trim();
    if (!trimmedLabel || !trimmedUrl) return;
    addLink({ label: trimmedLabel, url: trimmedUrl });
    setNewLabel('');
    setNewUrl('');
  };

  return (
    <div className="space-y-5">
      <Switch label={t('quicklinksShowLabels')} checked={config.showLabels} onChange={setShowLabels} />

      <div className="space-y-1">
        <p className="text-xs font-medium text-white/50 uppercase tracking-wide">{t('quicklinksLinks')}</p>
        {config.links.map((link) => (
          <div key={link.id} className="flex items-center gap-2 group">
            <span className="flex-1 text-sm text-white/70 truncate">{link.label}</span>
            <button
              type="button"
              onClick={() => { removeLink(link.id); }}
              className="opacity-0 group-hover:opacity-100 flex h-6 w-6 items-center justify-center rounded hover:bg-red-500/30 transition-all"
              aria-label={`${t('removeWidget')} ${link.label}`}
            >
              <Icon name="X" size={12} className="text-white/60" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Input
          placeholder={t('quicklinksLabelPlaceholder')}
          value={newLabel}
          onChange={(e) => { setNewLabel(e.target.value); }}
        />
        <Input
          placeholder={t('quicklinksUrlPlaceholder')}
          value={newUrl}
          onChange={(e) => { setNewUrl(e.target.value); }}
          type="url"
        />
        <Button
          variant="secondary"
          size="sm"
          leftIcon="Plus"
          onClick={handleAdd}
          disabled={!newLabel.trim() || !newUrl.trim()}
          className="w-full"
        >
          {t('quicklinksAddLink')}
        </Button>
      </div>
    </div>
  );
};
