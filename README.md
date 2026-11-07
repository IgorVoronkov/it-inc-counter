# counter

A React frontend project built with Vite and TypeScript.

## Stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/) with the [React Compiler](https://react.dev/learn/react-compiler) (native Oxc transform, experimental)
- [TypeScript](https://www.typescriptlang.org/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting
- [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting

## Project structure

The project uses a lightweight [Feature-Sliced Design](https://feature-sliced.design/) layout:
five layers, no `widgets`, no `processes`, and no empty slices. Folders are created only
when they hold code; empty layers currently exist as `.gitkeep` placeholders.

```text
src/
├── app/        # bootstrap (main.tsx, App.tsx) and global styles
├── pages/      # route-level screens
├── features/   # user actions
├── entities/   # business entities
└── shared/     # UI kit, lib, config
```

Imports only flow downward (`app` → `pages` → `features` → `entities` → `shared`), and a
slice is imported through its `index.ts`. The full set of rules is in
[AGENTS.md](./AGENTS.md#architecture-feature-sliced-design-simplified).

## Getting started

```sh
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` — start the development server
- `pnpm build` — type-check and build for production
- `pnpm preview` — preview the production build
- `pnpm lint` — run Oxlint
- `pnpm lint:fix` — run Oxlint with automatic fixes
- `pnpm fmt` — format the codebase with Oxfmt
- `pnpm fmt:check` — check formatting without writing files
