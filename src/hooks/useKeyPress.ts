import { useEffect, useCallback } from 'react';

/**
 * Fires a callback when a specific keyboard key is pressed.
 *
 * @param targetKey - The KeyboardEvent.key value to listen for, e.g. "Escape"
 * @param callback - Function invoked when the key is pressed
 * @param enabled - When false the listener is not attached (default true)
 */
export function useKeyPress(
  targetKey: string,
  callback: () => void,
  enabled = true,
): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        callback();
      }
    },
    [targetKey, callback],
  );

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, [handleKeyDown, enabled]);
}
