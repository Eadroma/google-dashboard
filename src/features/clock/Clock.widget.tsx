import type { FC } from 'react';
import { useClockLogic } from './useClockLogic';
import { ClockDisplay } from './ClockDisplay';
import type { WidgetProps } from '@app-types/widget.types';

/**
 * Clock widget container. Connects useClockLogic to ClockDisplay.
 * Contains no styling logic — delegates all rendering to ClockDisplay.
 *
 * @param props.instanceId - Widget instance UUID (passed to useClockLogic for settings)
 * @param props.isEditing - Unused by Clock but required by WidgetProps contract
 */
export const Clock: FC<WidgetProps> = ({ instanceId }) => {
  const { time, date, config } = useClockLogic(instanceId);
  return <ClockDisplay time={time} date={date} showDate={config.showDate} />;
};
