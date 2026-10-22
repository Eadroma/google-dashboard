import { useState, useEffect } from 'react';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useTranslation } from '@hooks/useTranslation';
import type { ClockConfig } from './clock.types';

/** Defaults for a new Clock instance — also used by ClockSettings */
export const DEFAULT_CONFIG: ClockConfig = {
  showSeconds: true,
  use24h: false,
  showDate: true,
};

/** Return value of useClockLogic */
export interface UseClockLogicResult {
  /** Formatted time string, e.g. "2:32:05 PM" */
  time: string;
  /** Formatted date string, e.g. "Monday, January 6, 2025" */
  date: string;
  /** Current widget configuration */
  config: ClockConfig;
}

/**
 * Manages a live clock that updates every second.
 * Reads persisted settings from the widgetSettings store.
 *
 * @param instanceId - The widget instance UUID
 * @returns Live time/date strings and current config
 */
export function useClockLogic(instanceId: string): UseClockLogicResult {
  const config = useWidgetConfig<ClockConfig>(instanceId, DEFAULT_CONFIG);

  const { bcp47 } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => { setNow(new Date()); }, 1000);
    return () => { clearInterval(id); };
  }, []);

  const time = now.toLocaleTimeString(bcp47, {
    hour: '2-digit',
    minute: '2-digit',
    ...(config.showSeconds && { second: '2-digit' }),
    hour12: !config.use24h,
  });

  const date = now.toLocaleDateString(bcp47, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return { time, date, config };
}
