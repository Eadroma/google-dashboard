import type { FC } from 'react';
import { useQuickLinks } from './useQuickLinks';
import { QuickLinksList } from './QuickLinksList';
import type { WidgetProps } from '@app-types/widget.types';

/**
 * Quick Links widget container.
 *
 * @param props.instanceId - Widget instance UUID
 */
export const QuickLinks: FC<WidgetProps> = ({ instanceId }) => {
  const { config } = useQuickLinks(instanceId);
  return (
    <QuickLinksList
      links={config.links}
      showLabels={config.showLabels}
    />
  );
};
