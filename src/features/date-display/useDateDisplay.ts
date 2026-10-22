import { useState, useEffect } from 'react';
import { useWidgetConfig } from '@hooks/useWidgetConfig';
import { useTranslation } from '@hooks/useTranslation';
import { getWeekNumber, getDayOfYear } from '@utils/date.utils';
import type { DateDisplayConfig } from './dateDisplay.types';

/** Defaults for a new Date instance — also used by DateDisplaySettings */
export const DEFAULT_CONFIG: DateDisplayConfig = {
  showWeekNumber: true,
  showDayOfYear: false,
};

/** Return value of useDateDisplay */
export interface UseDateDisplayResult {
  /** Formatted full date, e.g. "Monday, January 6, 2025" */
  fullDate: string;
  /** Translated week label, e.g. "Week 3" / "Semaine 3" */
  weekLabel: string;
  /** Translated day label, e.g. "Day 20" / "Jour 20" */
  dayLabel: string;
  /** ISO week number */
  weekNumber: number;
  /** Day-of-year count */
  dayOfYear: number;
  /** Current widget config */
  config: DateDisplayConfig;
}

/**
 * Manages the Date Display widget — refreshes at midnight.
 *
 * @param instanceId - Widget instance UUID
 * @returns Formatted date info and current config
 */
export function useDateDisplay(instanceId: string): UseDateDisplayResult {
  const config = useWidgetConfig<DateDisplayConfig>(instanceId, DEFAULT_CONFIG);
  const { bcp47, t } = useTranslation();

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const scheduleNextMidnight = () => {
      const next = new Date();
      next.setHours(24, 0, 0, 0);
      const msUntilMidnight = next.getTime() - Date.now();
      return setTimeout(() => {
        setNow(new Date());
        timerId = scheduleNextMidnight();
      }, msUntilMidnight);
    };

    let timerId = scheduleNextMidnight();
    return () => { clearTimeout(timerId); };
  }, []);

  const fullDate = now.toLocaleDateString(bcp47, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const weekLabel = t('dateWeek', { n: getWeekNumber(now) });
  const dayLabel = t('dateDay', { n: getDayOfYear(now) });

  return {
    fullDate,
    weekLabel,
    dayLabel,
    weekNumber: getWeekNumber(now),
    dayOfYear: getDayOfYear(now),
    config,
  };
}
