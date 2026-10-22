# Google Dashboard

[![CI](https://github.com/Eadroma/google-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/Eadroma/google-dashboard/actions/workflows/ci.yml)
[![Latest release](https://img.shields.io/github/v/release/Eadroma/google-dashboard)](https://github.com/Eadroma/google-dashboard/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A Chrome extension that replaces the new-tab page with a dashboard of drag-and-drop widgets. Everything runs locally in the browser: no account, no server, no tracking.

## Widgets

| Widget | What it does |
|---|---|
| **Clock** | Live time, 12/24-hour, optional seconds and date |
| **Date** | Today's date, ISO week number, day of the year |
| **Search Bar** | Search Google, Bing or DuckDuckGo, in the same or a new tab |
| **Quick Links** | Shortcut tiles with favicons |
| **Todo** | Task list with completion tracking |
| **Notes** | Plain-text notes, saved as you type |
| **GitHub Activity** | Recent public events for any GitHub user (no token needed) |

You can also choose a solid, gradient or image background, and switch between English and French.

## Install

**From a release (no build needed):**

1. Download `google-dashboard-<version>.zip` from the [latest release](https://github.com/Eadroma/google-dashboard/releases/latest) and unzip it.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and pick the unzipped folder.
4. Open a new tab.

**From source:** you need Node.js 22+. Run `npm install && npm run build`, then load the `dist/` folder the same way.

If your browser doesn't let extensions override the new-tab page (Opera GX, for example), click the extension's toolbar icon to open the dashboard.

## Use

- Click **Edit** (top right) to enter edit mode, then **Add widget** to open the widget picker.
- In edit mode, drag a widget by its top bar and resize it from the corner.
- Each widget's toolbar has **settings** (⚙), **lock** (stops it from moving) and **remove** (✕).
- Click **Done** to leave edit mode. The ⚙ button in the top bar opens language and background settings.

## Develop

```bash
npm run dev        # Vite dev server at http://localhost:5173 (the page runs outside the extension)
npm run build      # Type-check, then build into dist/
npm test           # Run the unit tests (Vitest)
npm run typecheck  # Type-check only (tsc -b: app + config)
npm run lint       # ESLint
```

After `npm run build`, click the reload button on the extension's card in `chrome://extensions` to load the new build.

**Stack:** React 19, TypeScript (strict), Vite 6, Tailwind CSS 3, Zustand 5, react-grid-layout, lucide-react.

### Project layout

```
public/            manifest.json, background.js (toolbar button), icons
src/
  app/             Root component and global CSS
  components/
    layout/        Dashboard grid, widget frame, top bar, sidebar, settings
    ui/            Reusable UI parts (Button, Input, Icon, Switch, ...)
  features/<name>/ One folder per widget
  hooks/           Shared React hooks
  locales/         English and French translation strings
  stores/          Zustand stores (layout, widget settings, theme, locale)
  types/           Shared TypeScript types
  utils/           Small helper functions
  widgets/         Widget registry, and the list of widgets to load
```

### Contributing

1. Fork the repo, create a branch, and make your change.
2. Before opening a pull request, run `npm run lint && npm test && npm run build`. CI runs the same checks.
3. Write commit messages as [Conventional Commits](https://www.conventionalcommits.org) (`feat: ...`, `fix: ...`). Releases are generated from them.

To add a widget, follow [PRACTICES.md → Adding a widget](PRACTICES.md#10-adding-a-widget): one folder in `src/features/` and one import line in `src/widgets/index.ts`. PRACTICES.md has all the code conventions.

## Releases

Releases are fully automatic. Every push to `main` runs CI (lint, tests, build). If that passes, [semantic-release](https://semantic-release.gitbook.io) reads the commit messages since the last release and then:

1. picks the next version (patch, minor or major);
2. updates `CHANGELOG.md`, `package.json` and `public/manifest.json`, and commits them back;
3. tags the release and creates a GitHub Release with `google-dashboard-<version>.zip` attached;
4. uploads the zip to the Chrome Web Store, if the store secrets are set (see below).

The version comes from your commit messages, so use [Conventional Commits](https://www.conventionalcommits.org):

| Commit message | Release |
|---|---|
| `fix: todo counter ignores hidden tasks` | patch: 1.0.0 → 1.0.1 |
| `feat: weather widget` | minor: 1.0.0 → 1.1.0 |
| `feat!: drop French locale` (or a `BREAKING CHANGE:` footer) | major: 1.0.0 → 2.0.0 |
| `docs:`, `chore:`, `refactor:`, `test:`, `ci:` | no release |

### Chrome Web Store auto-publish (optional)

Without the secrets below, each release still builds the zip and attaches it to the GitHub Release. You then upload it by hand in the [developer dashboard](https://chrome.google.com/webstore/devconsole).

To publish automatically:

1. **Do the first upload by hand.** The store API can only update an extension that already exists. This also covers the one-time $5 developer fee, the store listing and the privacy form.
2. Create OAuth credentials and a refresh token by following [this guide](https://github.com/fregante/chrome-webstore-upload-keys).
3. Add these repository secrets (Settings → Secrets and variables → Actions):

   | Secret | Where to find it |
   |---|---|
   | `CWS_EXTENSION_ID` | The extension's ID in the developer dashboard |
   | `CWS_PUBLISHER_ID` | Developer dashboard → Account |
   | `CWS_CLIENT_ID`, `CWS_CLIENT_SECRET` | Your Google Cloud OAuth client |
   | `CWS_REFRESH_TOKEN` | From step 2 |

Google still reviews each upload, so a new version goes live only after the review passes.

If `main` is branch-protected, allow GitHub Actions to push to it. The release job commits the changelog and version bump back to `main`.

## Data and privacy

- Your layout, widget content (todos, notes, links), theme and language are saved in the browser's `localStorage`, on your machine only. Open tabs stay in sync with each other.
- The only network requests are:
  - the GitHub API (`api.github.com`), when a GitHub Activity widget has a username set. Responses are cached for 5 minutes, because GitHub allows 60 requests per hour without a token.
  - Google's favicon service (`www.google.com/s2/favicons`), to show Quick Link icons.
  - your search engine, when you search.
  - any background image URL you enter.
- The extension asks for no Chrome permissions. Its only host permission is `api.github.com`.

## License

[MIT](LICENSE)
