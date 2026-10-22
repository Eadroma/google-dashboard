# Code Practices

How code is written in this project. Follow these rules for new code. If a rule and the code disagree, fix one of them; don't leave both.

---

## 1. Container / view split

Each widget separates logic from markup:

- **`[Name].widget.tsx`** (container): calls the widget's hook and passes the results to the view as props. No styling and no logic.
- **`[Name]View.tsx`** (view; the Clock uses `ClockDisplay.tsx`): receives typed props and renders JSX. No side effects. Only `useMemo`, `useCallback` and local UI `useState` are allowed.

```tsx
// ✅ Container
export const Clock: FC<WidgetProps> = ({ instanceId }) => {
  const { time, date, config } = useClockLogic(instanceId);
  return <ClockDisplay time={time} date={date} showDate={config.showDate} />;
};

// ❌ Logic and markup mixed
export const Clock: FC<WidgetProps> = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); ... }, []);
  return <div className="text-4xl">{time.toLocaleTimeString()}</div>;
};
```

---

## 2. Hooks

- Each widget has one hook for its logic, for example `useTodo.ts` or `useGithubActivity.ts`.
- A hook returns a plain object typed by an exported interface named `Use[Name]Result`. It never returns JSX.
- A widget's default config lives in its hook as `export const DEFAULT_CONFIG`. The settings panel imports it from there and never defines its own copy.

---

## 3. File size

Keep files under about 150 lines. When a file grows past that, move a sub-component into its own file, logic into a hook, or a large block of types into `*.types.ts`. Split by responsibility, never just to reduce the line count.

---

## 4. Imports

Always use the path aliases, and import from the file that defines the thing:

```ts
import { Button } from '@components/ui/Button';           // ✅ (folder index.ts re-exports the component)
import { useLayoutStore } from '@stores/layout.store';    // ✅
import { Button } from '../../../components/ui/Button';  // ❌
```

| Alias | Maps to |
|---|---|
| `@app/*` | `src/app/*` |
| `@features/*` | `src/features/*` |
| `@components/*` | `src/components/*` |
| `@hooks/*` | `src/hooks/*` |
| `@stores/*` | `src/stores/*` |
| `@app-types/*` | `src/types/*` |
| `@utils/*` | `src/utils/*` |
| `@widgets/*` | `src/widgets/*` |
| `@locales/*` | `src/locales/*` |

Only the component folders under `src/components/` have an `index.ts`. There are no top-level barrel files (folder-level `index.ts` files that re-export everything); don't add them.

---

## 5. Naming

| What | File | Export |
|---|---|---|
| Widget container | `[Name].widget.tsx` | `[Name]` |
| Widget view | `[Name]View.tsx` | `[Name]View` |
| Settings panel | `[Name]Settings.tsx` | `[Name]Settings` |
| Hook | `use[Name].ts` | `use[Name]` |
| Zustand store | `[domain].store.ts` | `use[Domain]Store` |
| Types | `[domain].types.ts` | named interfaces |
| Registration | `[domain].register.ts` | side effect only |
| Test | `[name].test.ts` next to the code | — |

---

## 6. Where state lives

| Kind of state | Where |
|---|---|
| Dashboard-wide (layout, theme, language) | A Zustand store in `src/stores/` |
| Per-widget config and content | `useWidgetSettingsStore`, keyed by `instanceId`; read it with `useWidgetConfig(instanceId, DEFAULT_CONFIG)` |
| Short-lived UI state (open/closed, hover, an input draft) | `useState` in the component |

Never put short-lived UI state in a persisted store.

---

## 7. Storage

- Persisted stores use Zustand's `persist` middleware with `localStorage`. It's synchronous, so the dashboard renders with saved data on the first frame.
- **Every persisted store must call `syncAcrossTabs(store)`** from `@utils/storage.utils`. Each new tab is a separate copy of the app, and without the sync a stale tab overwrites what another tab saved.
- Use `partialize` to keep per-tab UI flags out of storage (see `isEditing` in `layout.store.ts`).
- The only `chrome.*` call in the project is in `public/background.js` (the toolbar button). The app itself is a plain web page.

---

## 8. TypeScript

The config uses `strict`, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.

- No `any`. Use `unknown` and narrow it.
- Avoid `as`. It's acceptable in two places:
  - where data enters from outside (`fetch`, `JSON.parse`, `localStorage`). There, read optional fields defensively (`?? fallback`) and handle a failed parse.
  - in generic plumbing that TypeScript can't express (`useWidgetConfig`, `Select`).
- With `exactOptionalPropertyTypes`, leave an optional key out instead of passing `undefined`.

---

## 9. Comments and JSDoc

- Every exported function, component, hook and store action has a JSDoc comment. Components document their props with `@param props.<name>`.
- Inline comments explain *why*, not *what*.

```ts
/**
 * Get the ISO week number (1–53) for a given date.
 *
 * @param date - The date to evaluate
 * @returns ISO week number
 */
export function getWeekNumber(date: Date): number { ... }
```

---

## 10. Adding a widget

| File | Purpose |
|---|---|
| `use[Name].ts` | Logic and `DEFAULT_CONFIG` |
| `[Name].widget.tsx` | Container |
| `[Name]View.tsx` | Markup |
| `[Name]Settings.tsx` | Optional settings form |
| `[name].types.ts` | `[Name]Config` and local types |
| `[name].register.ts` | Calls `registerWidget()` |

Then add one import line to `src/widgets/index.ts`. Any new icon name goes in the `ICONS` list in `src/components/ui/Icon/Icon.tsx`. The grid knows widgets only by id, through `resolveWidget(id)`, and never imports a widget directly.

---

## 11. Commits

Use [Conventional Commits](https://www.conventionalcommits.org). Releases are cut from the commit messages (see README → Releases): `fix:` makes a patch release, `feat:` a minor one, `feat!:` a major one. `docs:`, `chore:`, `refactor:`, `test:` and `ci:` don't release.
