# React & TypeScript Best Practices — Google Dashboard

This document is the architectural contract for this project. All code must follow these rules.

---

## 1. Container / Presentational Split

Every widget and complex UI element is split into exactly two files:

- **`[Name].widget.tsx`** (Container) — imports the custom hook, passes data as props. Contains zero styling logic, zero JSX markup beyond wiring the presentational component.
- **`[Name]Display.tsx`** (Presentational) — receives data via typed props, renders HTML/JSX. Contains zero side effects; only `useMemo` / `useCallback` are permitted.

```tsx
// ✅ CORRECT — Container
export const Clock: FC<WidgetProps> = ({ instanceId }) => {
  const { time, format } = useClockLogic(instanceId);
  return <ClockDisplay time={time} format={format} />;
};

// ❌ WRONG — logic and presentation mixed
export const Clock: FC<WidgetProps> = ({ instanceId }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); ... }, []);
  return <div className="text-4xl">{time.toLocaleTimeString()}</div>;
};
```

---

## 2. Custom Hooks Pattern

- One hook per feature's logic: `useClockLogic.ts`, `useGmailMessages.ts`
- Hooks **always return a plain typed object** — never a tuple unless it is exactly a 2-element `[value, setter]` pair
- Hook return type is always an **explicit named interface**: `UseClockLogicResult`
- Hooks **never return JSX**
- Naming: `use[FeatureName][Aspect]` — e.g. `useGmailMessages`, `useCalendarEvents`

```typescript
// ✅ CORRECT return shape
interface UseClockLogicResult {
  time: string;       // formatted "HH:MM:SS"
  date: string;       // formatted date string
  isBlinking: boolean;
}
export function useClockLogic(instanceId: string): UseClockLogicResult { ... }
```

---

## 3. File Size Rule (≤150 lines)

If a file approaches or exceeds 150 lines:
1. Extract sub-components into their own files
2. Extract logic into a custom hook
3. Extract large type blocks into `*.types.ts`

**No exceptions. Refactor first, then continue.**

---

## 4. Barrel Exports

Every folder has an `index.ts` that re-exports its public API:

```typescript
// src/features/clock/index.ts
export { Clock } from './Clock.widget';
export type { ClockConfig } from './clock.types';
```

- Consumers import from `@features/clock`, never from deep paths like `@features/clock/Clock.widget`
- `index.ts` contains **only re-exports** — no logic, no side effects

---

## 5. Naming Conventions

| Pattern | File name | Export name |
|---|---|---|
| Widget container | `[Name].widget.tsx` | `[Name]` |
| Widget view | `[Name]Display.tsx` | `[Name]Display` |
| Settings panel | `[Name]Settings.tsx` | `[Name]Settings` |
| Custom hook | `use[Name].ts` | `use[Name]` |
| Zustand store | `[domain].store.ts` | `use[Domain]Store` |
| Types file | `[domain].types.ts` | named interfaces |
| Registration | `[domain].register.ts` | side-effect only |

---

## 6. Context vs Zustand

| Use case | Solution |
|---|---|
| Dashboard-wide state (layout, theme, auth) | Zustand store |
| Per-widget persistent configuration | `useWidgetSettingsStore` keyed by `instanceId` |
| Compound component internal wiring | React Context (scoped to component subtree) |
| Transient UI state (open/closed, hover) | `useState` in the component |

- **Never** use React Context for frequently-updating state — it re-renders all consumers
- **Never** put transient UI state (modal open, hover state) in Zustand

---

## 7. TypeScript Strictness Rules

Config: `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`

- No `any` — use `unknown` + type narrowing instead
- No `as Foo` type assertions **except** at system boundaries (API response parsing), always paired with zod validation
- Props interfaces are named `[Component]Props` and exported from `*.types.ts`
- All API responses are validated with **zod** before assignment to typed variables
- `exactOptionalPropertyTypes` — omit optional keys rather than passing `undefined`

---

## 8. JSDoc Style

Every exported function, component, hook, and store action requires a JSDoc comment:

```typescript
/**
 * Formats a Date into a locale-aware time string.
 *
 * @param date - The date to format
 * @param locale - BCP 47 locale tag, defaults to navigator.language
 * @param use24h - If true, uses 24-hour format
 * @returns Formatted string, e.g. "14:32:05" or "2:32:05 PM"
 */
export function formatTime(date: Date, locale?: string, use24h?: boolean): string { ... }
```

Components use `@param props` with individual prop descriptions:

```typescript
/**
 * Displays formatted time as a styled heading.
 *
 * @param props.time - Pre-formatted time string from useClockLogic
 * @param props.className - Optional additional Tailwind classes
 */
export const ClockDisplay: FC<ClockDisplayProps> = ({ time, className }) => ...
```

---

## 9. Absolute Imports (Path Aliases)

Always use path aliases. Never navigate up more than one level with relative paths:

```typescript
import { Button } from '@components/ui';       // ✅
import { useLayoutStore } from '@stores/layout.store'; // ✅
import { Button } from '../../../components/ui'; // ❌
```

Available aliases:

| Alias | Maps to |
|---|---|
| `@app/*` | `src/app/*` |
| `@features/*` | `src/features/*` |
| `@components/*` | `src/components/*` |
| `@hooks/*` | `src/hooks/*` |
| `@services/*` | `src/services/*` |
| `@stores/*` | `src/stores/*` |
| `@types/*` | `src/types/*` |
| `@utils/*` | `src/utils/*` |
| `@widgets/*` | `src/widgets/*` |

---

## 10. Chrome Extension Rules

- All `chrome.*` API calls live **only** in `src/services/` or `src/utils/storage.utils.ts`
- Never call `chrome.*` directly from a component or custom hook
- Never use `localStorage` or `sessionStorage` — use `chrome.storage.local` via the typed wrappers in `storage.utils.ts`
- `chrome.storage.sync` is used only for small user preferences (< 8KB total)
- Background service workers (if added) are a separate Vite entry point under `src/background/`

---

## 11. Widget System Contract

Every widget module must contain:

| File | Responsibility |
|---|---|
| `[Name].widget.tsx` | Container component — connects hook to display |
| `[Name]Display.tsx` | Presentational component — renders UI |
| `[Name]Settings.tsx` | Settings form rendered in WidgetSettingsPanel |
| `use[Name]Logic.ts` | All business logic for the widget |
| `[name].types.ts` | `[Name]Config` interface + any local types |
| `[name].register.ts` | Calls `registerWidget()` — side effect only |
| `index.ts` | Barrel re-export |

The dashboard grid (`DashboardGrid`) knows only widget IDs (strings). It calls `resolveWidget(id)` from the registry. It has **zero direct imports** of any specific widget.

**Adding a new widget = create one folder + add one import line to `src/widgets/index.ts`. Nothing else changes.**
