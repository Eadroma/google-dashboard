import { useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils/classnames.utils';
import { Icon } from '@components/ui/Icon';
import { useKeyPress } from '@hooks/useKeyPress';
import { useThemeStore } from '@stores/theme.store';
import { useLocaleStore } from '@stores/locale.store';
import { useTranslation } from '@hooks/useTranslation';
import type { Background } from '@app-types/theme.types';
import type { Locale } from '@locales/translations';

const SOLID_PRESETS = [
  '#0f172a', '#0d1117', '#18181b', '#111827',
  '#1e1e2e', '#1a1a2e', '#0c1445', '#0a0e1a',
];

const GRADIENT_PRESETS: Array<{ from: string; to: string; direction: string }> = [
  { from: '#0f0c29', to: '#302b63', direction: 'to bottom right' },
  { from: '#0f2027', to: '#2c5364', direction: 'to bottom right' },
  { from: '#141e30', to: '#243b55', direction: 'to bottom right' },
  { from: '#1a472a', to: '#2d6a4f', direction: 'to bottom right' },
  { from: '#2b1055', to: '#7597de', direction: 'to bottom right' },
  { from: '#434343', to: '#000000', direction: 'to bottom' },
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Dashboard settings modal — language selector and background picker.
 * Rendered via a portal to escape any CSS stacking contexts.
 *
 * @param props.isOpen - Controls visibility
 * @param props.onClose - Called when the modal should close
 */
export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { background, setBackground } = useThemeStore();
  const { locale, setLocale } = useLocaleStore();
  const { t } = useTranslation();

  const [bgTab, setBgTab] = useState<Background['type']>(background.type);
  const [imageUrl, setImageUrl] = useState(background.type === 'image' ? background.url : '');
  const [brightness, setBrightness] = useState(background.type === 'image' ? background.brightness : 1);

  useKeyPress('Escape', onClose, isOpen);

  if (!isOpen) return null;

  const applyImage = (url: string, br: number) => {
    if (url.trim()) setBackground({ type: 'image', url: url.trim(), brightness: br });
  };

  const sectionLabel = 'text-xs font-semibold text-white/40 uppercase tracking-wider mb-3';
  const tabBtn = (active: boolean) =>
    cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
      active ? 'bg-blue-600 text-white' : 'text-white/50 hover:text-white hover:bg-white/10');
  const localeBtn = (active: boolean) =>
    cn('flex-1 py-2 rounded-lg text-sm font-semibold transition-colors border',
      active ? 'bg-blue-600 border-blue-500 text-white' : 'border-white/10 text-white/50 hover:text-white hover:bg-white/10');

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-slate-900 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Icon name="Settings2" size={15} className="text-white/50" />
            {t('settingsTitle')}
          </h2>
          <button type="button" onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 transition-colors" aria-label="Close">
            <Icon name="X" size={15} className="text-white/50" />
          </button>
        </div>

        <div className="p-5 space-y-7">
          {/* Language */}
          <section>
            <p className={sectionLabel}>{t('settingsLanguage')}</p>
            <div className="flex gap-2">
              {(['en', 'fr'] as Locale[]).map((l) => (
                <button key={l} type="button" onClick={() => { setLocale(l); }} className={localeBtn(locale === l)}>
                  {l === 'en' ? 'English' : 'Français'}
                </button>
              ))}
            </div>
          </section>

          {/* Background */}
          <section>
            <p className={sectionLabel}>{t('settingsBackground')}</p>

            {/* Type tabs */}
            <div className="flex gap-1 mb-4 bg-white/5 rounded-lg p-1">
              {(['solid', 'gradient', 'image'] as const).map((tab) => (
                <button key={tab} type="button" onClick={() => { setBgTab(tab); }} className={cn('flex-1', tabBtn(bgTab === tab))}>
                  {t(`settings${tab.charAt(0).toUpperCase() + tab.slice(1)}` as Parameters<typeof t>[0])}
                </button>
              ))}
            </div>

            {bgTab === 'solid' && (
              <div className="grid grid-cols-8 gap-2">
                {SOLID_PRESETS.map((color) => (
                  <button key={color} type="button" onClick={() => { setBackground({ type: 'solid', color }); }}
                    className={cn('h-8 w-full rounded-lg border-2 transition-transform hover:scale-110',
                      background.type === 'solid' && background.color === color ? 'border-blue-400' : 'border-transparent')}
                    style={{ backgroundColor: color }} aria-label={color} />
                ))}
              </div>
            )}

            {bgTab === 'gradient' && (
              <div className="grid grid-cols-3 gap-2">
                {GRADIENT_PRESETS.map((g) => (
                  <button key={g.from} type="button" onClick={() => { setBackground({ type: 'gradient', ...g }); }}
                    className={cn('h-12 rounded-lg border-2 transition-transform hover:scale-105',
                      background.type === 'gradient' && background.from === g.from ? 'border-blue-400' : 'border-transparent')}
                    style={{ backgroundImage: `linear-gradient(${g.direction}, ${g.from}, ${g.to})` }} />
                ))}
              </div>
            )}

            {bgTab === 'image' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">{t('settingsImageUrl')}</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => { setImageUrl(e.target.value); }}
                      onBlur={() => { applyImage(imageUrl, brightness); }}
                      placeholder={t('settingsImageUrlPlaceholder')}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={() => { applyImage(imageUrl, brightness); }}
                      className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
                      OK
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-2 block">
                    {t('settingsBrightness')} — {Math.round(brightness * 100)}%
                  </label>
                  <input type="range" min={0.2} max={1.2} step={0.05} value={brightness}
                    onChange={(e) => { const v = parseFloat(e.target.value); setBrightness(v); applyImage(imageUrl, v); }}
                    className="w-full accent-blue-500" />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
