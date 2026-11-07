# AGENTS.md

Minimal Vite + React 19 + TypeScript SPA. Single entrypoint: `index.html` → `src/main.tsx` → `src/App.tsx`. `dist/` is generated and gitignored.

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
