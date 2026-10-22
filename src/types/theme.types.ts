/** Solid color background */
export interface SolidBackground {
  type: 'solid';
  /** CSS color value, e.g. "#0f172a" */
  color: string;
}

/** Two-stop CSS gradient background */
export interface GradientBackground {
  type: 'gradient';
  /** Starting color */
  from: string;
  /** Ending color */
  to: string;
  /** CSS gradient direction, e.g. "to bottom right" */
  direction: string;
}

/** Remote image background with visual adjustments */
export interface ImageBackground {
  type: 'image';
  /** Fully qualified image URL */
  url: string;
  /** Brightness multiplier (0.2–1.2) */
  brightness: number;
}

/** Discriminated union of all background variants */
export type Background = SolidBackground | GradientBackground | ImageBackground;

/**
 * Full dashboard theme — persisted in localStorage.
 */
export interface Theme {
  background: Background;
}
