/** Props for the Icon component */
export interface IconProps {
  /** Lucide icon name (PascalCase), e.g. "Clock"; must be listed in Icon.tsx */
  name: string;
  /** Icon size in pixels (default 20) */
  size?: number;
  /** Additional Tailwind CSS classes */
  className?: string;
  /** SVG stroke width (default 2) */
  strokeWidth?: number;
}
