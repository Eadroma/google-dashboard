import type { FC } from 'react';

interface DateDisplayViewProps {
  fullDate: string;
  /** Translated week label, e.g. "Week 3" or "Semaine 3" */
  weekLabel: string;
  /** Translated day label, e.g. "Day 20" or "Jour 20" */
  dayLabel: string;
  showWeekNumber: boolean;
  showDayOfYear: boolean;
}

/**
 * Presentational date panel — renders the pre-computed, pre-translated date strings.
 */
export const DateDisplayView: FC<DateDisplayViewProps> = ({
  fullDate,
  weekLabel,
  dayLabel,
  showWeekNumber,
  showDayOfYear,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 p-4 select-none">
      <p className="text-xl font-light text-white/90 text-center text-shadow-widget">{fullDate}</p>
      {(showWeekNumber || showDayOfYear) && (
        <div className="flex items-center gap-4 text-xs text-white/60 text-shadow-sm">
          {showWeekNumber && <span>{weekLabel}</span>}
          {showDayOfYear && <span>{dayLabel}</span>}
        </div>
      )}
    </div>
  );
};
