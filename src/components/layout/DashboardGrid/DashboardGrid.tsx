import { useCallback } from 'react';
import GridLayout, { WidthProvider, type Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useLayoutStore } from '@stores/layout.store';
import { resolveWidget } from '@widgets/registry';
import { WidgetFrame } from '@components/layout/WidgetFrame';

// Measures its container and re-renders on window resize.
const AutoWidthGrid = WidthProvider(GridLayout);

/**
 * The main dashboard grid. Reads widget instances from the layout store
 * and renders each one inside a WidgetFrame via the widget registry.
 * Drag and resize are only active when isEditing is true.
 */
export function DashboardGrid() {
  const { items, columns, isEditing, moveWidget, resizeWidget } = useLayoutStore();

  const layout: Layout[] = items.map((item) => ({
    i: item.instanceId,
    x: item.position.col,
    y: item.position.row,
    w: item.dimensions.w,
    h: item.dimensions.h,
    isDraggable: isEditing && !item.isLocked,
    isResizable: isEditing && !item.isLocked,
    static: !!(item.isLocked),
  }));

  const handleLayoutChange = useCallback(
    (newLayout: Layout[]) => {
      newLayout.forEach((l) => {
        const item = items.find((i) => i.instanceId === l.i);
        if (!item) return;
        if (item.isLocked) return;

        const posChanged = item.position.col !== l.x || item.position.row !== l.y;
        const sizeChanged = item.dimensions.w !== l.w || item.dimensions.h !== l.h;

        if (posChanged) {
          moveWidget(l.i, { col: l.x, row: l.y });
        }
        if (sizeChanged) {
          resizeWidget(l.i, { w: l.w, h: l.h });
        }
      });
    },
    [items, moveWidget, resizeWidget],
  );

  return (
    <>
      {/* Centre alignment guides — visible in edit mode only */}
      {isEditing && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {/* Vertical centre line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '50%',
              width: '1px',
              background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 8px, transparent 8px, transparent 16px)',
            }}
          />
          {/* Horizontal centre line */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: '50%',
              height: '1px',
              background: 'repeating-linear-gradient(to right, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 8px, transparent 8px, transparent 16px)',
            }}
          />
        </div>
      )}
    <AutoWidthGrid
      className="layout"
      layout={layout}
      cols={columns}
      rowHeight={10}
      margin={[8, 8]}
      containerPadding={[16, 16]}
      isDraggable={isEditing}
      isResizable={isEditing}
      compactType={null}
      preventCollision={true}
      allowOverlap={true}
      onLayoutChange={handleLayoutChange}
      draggableHandle=".drag-handle"
    >
      {items.map((item) => {
        const entry = resolveWidget(item.widgetId);
        if (!entry) return null;

        const { Component } = entry;

        return (
          <div key={item.instanceId}>
            <WidgetFrame
              instanceId={item.instanceId}
              widgetId={item.widgetId}
              isEditing={isEditing}
              isLocked={item.isLocked ?? false}
            >
              <Component instanceId={item.instanceId} isEditing={isEditing} />
            </WidgetFrame>
          </div>
        );
      })}
    </AutoWidthGrid>
    </>
  );
}
