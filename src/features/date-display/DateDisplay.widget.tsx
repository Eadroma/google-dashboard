import type { FC } from 'react';
import { useDateDisplay } from './useDateDisplay';
import { DateDisplayView } from './DateDisplayView';
import type { WidgetProps } from '@app-types/widget.types';

/**
 * Date Display widget container.
 *
 * @param props.instanceId - Widget instance UUID
 */
export const DateDisplay: FC<WidgetProps> = ({ instanceId }) => {
  const { fullDate, weekLabel, dayLabel, config } = useDateDisplay(instanceId);
  return (
    <DateDisplayView
      fullDate={fullDate}
      weekLabel={weekLabel}
      dayLabel={dayLabel}
      showWeekNumber={config.showWeekNumber}
      showDayOfYear={config.showDayOfYear}
    />
  );
};
