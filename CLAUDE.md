# CLAUDE.md

Chrome MV3 extension: a new-tab dashboard of drag-and-drop widgets. React 19 + TS (strict) + Vite 6 + Tailwind 3 + Zustand 5 + react-grid-layout. There is no backend, and all state is in `localStorage`. See README.md for features and PRACTICES.md for the code contract.

## Commands

```bash
npm run build      # tsc -b && vite build -> dist/ (load unpacked in chrome://extensions)
npm test           # vitest run (tests choose jsdom via a `// @vitest-environment jsdom` comment)
npm run typecheck  # tsc -b (app + vite config); also the first half of `npm run build`
npm run lint       # eslint; must stay at zero errors, CI fails otherwise
```

## CI and releases

- `.github/workflows/ci.yml`: on every PR and every push to `main`, runs `npm ci`, lint, test, build. On `main`, the `release` job then runs `npx semantic-release`.
- `.releaserc.json` reads Conventional Commits and decides the next version. It writes `CHANGELOG.md`, sets the version in `package.json` and `public/manifest.json`, builds, zips `dist/` into `google-dashboard-<v>.zip`, attaches the zip to the GitHub Release, and commits `chore(release): <v> [skip ci]` back to `main`.
- The Chrome Web Store upload (`chrome-webstore-upload-cli@4`, run in `publishCmd`) runs only when the `CWS_*` secrets are set. Otherwise it's skipped.
- **Commit messages matter:** `fix:` makes a patch release, `feat:` a minor one, `feat!:` or a `BREAKING CHANGE:` footer a major one. `docs:`, `chore:` and `refactor:` don't release. Don't hand-edit `version` in `package.json` or the manifest.

Dead files from the 2026-10-22 cleanup are parked in `.trash/` (git-ignored, ESLint-ignored), waiting for the owner to delete them.

## Architecture

- **Entry:** `src/main.tsx` imports `@widgets/index` for its side effects. That runs every `features/*/*.register.ts`, which calls `registerWidget()`. Only then does it render `App`.
- **Registry:** `src/widgets/registry.ts` maps a widget id to `{ meta, Component, SettingsComponent? }`. `DashboardGrid` and `WidgetFrame` know widgets only through `resolveWidget(id)`.
- **Stores** (`src/stores/`, each persisted under its own localStorage key):
  - `layout.store` (`dashboard-layout`): grid items. `isEditing` is deliberately *not* persisted (see `partialize`). `removeWidget` also clears that widget's settings.
  - `widgetSettings.store` (`widget-settings`): per-instance config, keyed by `instanceId`. Read it with `useWidgetConfig(instanceId, DEFAULT_CONFIG)`, which merges stored values over the defaults.
  - `theme.store` (`dashboard-theme`): background only. `locale.store` (`dashboard-locale`): `en` or `fr`.
- **Cross-tab sync:** every new tab is a separate app instance writing the same keys. Each store calls `syncAcrossTabs(store)` (`utils/storage.utils.ts`), which rehydrates on the `storage` event. **Any new persisted store must call it**, or stale tabs will overwrite other tabs' data.
- **Grid units:** 48 columns, 10px rows. A widget's `defaultSize: 'WxH'` is multiplied by 4 in `Sidebar.sizeToGridDimensions`.

## Gotchas

- **Icons:** `ui/Icon/Icon.tsx` has an explicit allowlist (`ICONS`). An icon name that isn't listed renders as a grey square, so add the import there first. Never import lucide's `icons` map: it pulls in every icon (about 700 kB).
- **Widget defaults:** each widget's `DEFAULT_CONFIG` is exported from its hook (`useClockLogic`, `useTodo`, ...), and the settings panel imports it. Don't redefine it.
- **GitHub widget:** the API is unauthenticated (60 requests/hour per IP). Responses are cached in localStorage under `gh:<username>` for 5 minutes (`readCachedEvents`).
- **Image background:** the URL is user input placed inside CSS. Keep the `JSON.stringify` quoting in `App.tsx`.
- **Manifest** (`public/manifest.json`): no `permissions`, host permission for `api.github.com` only. Don't add permissions the code doesn't use.

## Conventions (summary of PRACTICES.md and the owner's preferences)

- Container/presentational split: `X.widget.tsx` (wiring only), `XView`/`XDisplay.tsx` (markup only), `useX.ts` (logic, returns a named `UseXResult` interface).
- JSDoc on every export. Files of at most 150 lines (`SettingsModal.tsx` and `Sidebar.tsx` are already slightly over). Strict TS with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- Use the path aliases `@app @features @components @hooks @stores @app-types @utils @widgets @locales`, never `../../`.
- User-facing strings go through `useTranslation().t(key)`, with keys in `src/locales/translations.ts` (en + fr).

**PRACTICES.md is out of date in three places.** Follow the code until the owner decides:
- It says to use `chrome.storage` and never `localStorage`. The app actually uses `localStorage` (synchronous hydration means no empty first paint).
- It requires zod validation of API responses. `zod` is installed, but nothing uses it yet.
- It says consumers import from barrels. In practice, consumers import from deep paths.
