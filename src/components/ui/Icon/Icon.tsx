import {
  Activity, AlertCircle, BarChart2, Calendar, Check, CheckSquare, CircleDot, Clock,
  FileText, GitBranch, GitCommit, GitFork, GitPullRequest, Github, Globe, GripHorizontal,
  Layout, LayoutDashboard, Link, Lock, LockOpen, Plus, Search, Settings, Settings2, Star,
  X, Zap, type LucideIcon as LucideIconType,
} from 'lucide-react';
import { cn } from '@utils/classnames.utils';
import type { IconProps } from './Icon.types';

// Named imports keep the bundle small; importing lucide's `icons` map pulls in all ~1500 icons.
// Add an icon here before using its name anywhere in the app.
const ICONS: Record<string, LucideIconType> = {
  Activity, AlertCircle, BarChart2, Calendar, Check, CheckSquare, CircleDot, Clock,
  FileText, GitBranch, GitCommit, GitFork, GitPullRequest, Github, Globe, GripHorizontal,
  Layout, LayoutDashboard, Link, Lock, LockOpen, Plus, Search, Settings, Settings2, Star,
  X, Zap,
};

/**
 * Renders a Lucide icon by name with configurable size and color.
 * Falls back to a placeholder square if the icon name is not in ICONS.
 *
 * @param props.name - Lucide icon name, e.g. "Clock", "Search"
 * @param props.size - Icon size in pixels (default 20)
 * @param props.className - Optional additional Tailwind classes
 * @param props.strokeWidth - SVG stroke width (default 2)
 */
export function Icon({ name, size = 20, className, strokeWidth = 2 }: IconProps) {
  const LucideIcon = ICONS[name];

  if (!LucideIcon) {
    return (
      <span
        className={cn('inline-block rounded bg-white/20', className)}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
    />
  );
}
