# AGENTS.md

Minimal Vite + React 19 + TypeScript SPA. Single entrypoint: `index.html` → `src/app/main.tsx` → `src/app/App.tsx`. `dist/` is generated and gitignored.

## Architecture (Feature-Sliced Design, simplified)

`src` is split into layers; every file belongs to exactly one layer.

```text
src/
├── app/        # bootstrap, providers, global styles, app-wide composition
├── pages/      # route-level screens
├── features/   # user actions (control + its handler)
├── entities/   # business entities (types, model, presentational UI)
└── shared/     # framework-agnostic UI kit, lib, config
```

- Imports flow strictly downward: `app` → `pages` → `features` → `entities` → `shared`.
  Never import upward, never import a sibling slice on the same layer.
- A slice (`pages/counter`, `features/counter-controls`, `entities/counter`) exposes its
  public API through `index.ts`. Import slices via the alias (`@/entities/counter`), not by
  deep paths into `ui/` or `model/`.
- `shared` has no layer-wide barrel: import concrete modules (`@/shared/ui/Button`).
- Allowed segments inside a slice: `ui/`, `model/`, `lib/`, `api/`, `config/`. Create a
  segment only when it holds code.
- `widgets` and `processes` are intentionally absent. Add `widgets` only when a page has to
  compose several features; `processes` is not used.
- Empty layers are placeholders kept via `.gitkeep` during scaffolding. Delete the
  placeholder as soon as the layer gets its first slice; do not create empty slices,
  segments, or speculative directories (`i18n/`, `mocks/`, `shared/api/`) ahead of need.
- Global styles live in `app/styles`; component styles are CSS Modules colocated with the
  component (`Button.module.css`).
- State lives as close to its usage as possible; it moves into `entities/*/model` only when
  more than one consumer needs it.
- Named exports everywhere; the public API of a slice is `index.ts`.
- Within a slice use relative imports with extensions (`./types.ts`); across slices use the
  `@/*` alias. This follows `allowImportingTsExtensions` and `verbatimModuleSyntax`.

Import direction is lint-enforced: `.oxlintrc.json` maps each layer to a `no-restricted-imports`
override that blocks upward imports, same-layer sibling slices, and deep imports into a slice's
internals. The rule inspects the import specifier, not the resolved path, so cross-slice imports
must use the `@/*` alias to be checked; relative imports that climb out of a layer are not
detected.

## Commands

Package manager is pnpm (pinned in `package.json` `packageManager`). Do not add npm/yarn lockfiles.

```sh
pnpm install
pnpm dev
pnpm build      # tsc -b && vite build — this is the only typecheck
pnpm lint       # oxlint
pnpm fmt        # oxfmt (writes)
pnpm fmt:check  # oxfmt --check
```

- There is no test framework, no test script, and no CI. Do not invent `pnpm test`.
- Verification order: `pnpm fmt:check` → `pnpm lint` → `pnpm build`.
- `pnpm build` is the only type-checking step; there is no standalone `typecheck` script. Use `pnpm exec tsc -b` for a faster typecheck without bundling.

## Git hooks

- Husky is installed through the `prepare` script. `.husky/pre-commit` runs `pnpm exec lint-staged` followed by `pnpm exec tsc -b`.
- lint-staged config lives in `package.json`: staged JS/TS files go through `oxlint --fix` + `oxfmt`, staged CSS/JSON/Markdown/HTML through `oxfmt`.
- `.oxlintrc.json` sets `options.denyWarnings: true`, so any lint warning fails the commit. Fix it instead of bypassing; use `git commit --no-verify` only when there is a deliberate reason.
- Hooks are not installed when dependencies are installed with `--ignore-scripts` (some CI setups).

## Toolchain quirks

- Lint/format use **Oxc** (`oxlint`, `oxfmt`), not ESLint/Prettier. Configs: `.oxlintrc.json`, `.oxfmtrc.json`. Don't introduce ESLint/Prettier configs or disable comments for them.
- React Compiler is enabled through `@vitejs/plugin-react` (`react({ compiler: true })` in `vite.config.ts`), backed by the exact-pinned native `oxc-transform-react@0.156.0`. Write plain components and let the compiler memoize; don't add `useMemo`/`useCallback` for perf.
- `tsconfig.json` is a solution file with two projects: `tsconfig.app.json` covers `src`, `tsconfig.node.json` covers only `vite.config.ts`. New root-level TS files must be added to the latter's `include`.

## TypeScript conventions (enforced)

- `verbatimModuleSyntax`: use `import type { ... }` for type-only imports.
- `erasableSyntaxOnly`: no `enum`, `namespace`, or constructor parameter properties.
- `noUnusedLocals` / `noUnusedParameters`: unused symbols fail `pnpm build`.
- `allowImportingTsExtensions`: relative imports include the extension, e.g. `import App from "./App.tsx"`.
- `moduleResolution: "bundler"`, `noEmit: true`.
- Import alias `@/*` → `src/*`, e.g. `import App from "@/App.tsx"`. Defined once in `tsconfig.app.json` `paths`; Vite resolves it natively via `resolve.tsconfigPaths: true` in `vite.config.ts` — do not add `resolve.alias` or `vite-tsconfig-paths`.
