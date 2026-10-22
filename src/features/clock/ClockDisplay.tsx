import type { FC } from 'react';

interface ClockDisplayProps {
  /** Formatted time string, e.g. "2:32:05 PM" */
  time: string;
  /** Formatted date string */
  date: string;
  /** Whether to show the date row */
  showDate: boolean;
}

/**
 * Presentational clock face — renders the pre-formatted time and date strings.
 * Contains no logic or side effects.
 *
 * @param props.time - Pre-formatted time from useClockLogic
 * @param props.date - Pre-formatted date from useClockLogic
 * @param props.showDate - Whether to render the date row
 */
export const ClockDisplay: FC<ClockDisplayProps> = ({ time, date, showDate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1 select-none p-4">
      <time
        className="text-5xl font-light text-white tabular-nums leading-none tracking-tight text-shadow-widget"
        dateTime={time}
      >
        {time}
      </time>
      {showDate && (
        <p className="text-sm text-white/60 font-normal text-center text-shadow-sm">{date}</p>
      )}
    </div>
  );
};
