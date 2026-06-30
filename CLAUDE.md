# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Nierenrechner is a distributable kidney-function (eGFR) calculator built as a single Lit web component. It is published as a self-contained ES module (`nierenrechner.js`) that host pages embed via `<script type="module">` plus the `<app-nierenrechner>` custom element. The UI and all user-facing text are in German.

## Commands

```bash
npm run dev      # Vite dev server (loads index.html)
npm run build    # tsc type-check + vite lib build, then zips dist/ + README into dist/package.zip
npm run preview  # serve the production build
npm test         # run Vitest (watch mode by default)
```

Run a single test by name: `npx vitest run -t "should calculate correct value for white 50 years old female"`. Tests live in `src/unitTests/` and currently cover only `EgfrCalculator` (the formula math).

The build emits a **library** (see `vite.config.ts`), not an app — entry is `src/nierenrechner.ts`, output is a single ES module named `nierenrechner`. `index.html` is only used for local dev/preview and references the already-built `dist/nierenrechner.js`.

## Component activation

Which calculators appear is controlled by boolean HTML attributes on the element, each mapping to a `@property` on the `Nierenrechner` class (`src/nierenrechner.ts`): `ckdEpi`, `mdrd`, `mayo`, `ckdEpiCystatin`, `ckdEpiKreatininCystatin`, `cockcroftGault`. If none are set, it defaults to `ckdEpi`. Each enabled flag conditionally renders a tab + panel hosting the matching calculator element. See README.md for the attribute→formula table.

## Architecture

**Calculation is fully separated from UI.** All formula math lives in `src/services/egfrCalculator.ts` (`EgfrCalculator`), a pure, DOM-free class. Each calculator component (`src/components/calculators/*`) is a thin Lit form that:
1. Reads a `FormData` on submit,
2. Calls the relevant `EgfrCalculator.calculate*` method,
3. Wraps the numeric result + classification + a record of the input fields into a `CalcResult`,
4. Dispatches a bubbling/composed `result` event (`ResultEvent` from `src/types.ts`).

The top-level `Nierenrechner` listens for `result`, then sets `.result` and opens the shared `<result-modal>` (`src/components/modal/result-modal.ts`). Tab switches dispatch a `tab-select` (`TabSelectedEvent`) event. Both custom events set `bubbles` and `composed` so they cross shadow-DOM boundaries — preserve those flags when adding events.

**Key data flow types** (`src/types.ts`, `src/classes/GfrResult.ts`):
- `GfrResult` — raw `{ value, unit, calculatorType }` returned by every `EgfrCalculator` method.
- `CalcResult extends GfrResult` — adds `formData` (a `Record<string, CalculatorInputFields>` built by each component's `mapInputTypes`) and `classification`. This is the event payload consumed by the modal.

**Constants are factor lookup tables.** `src/constants/genderFactors.ts` and `skinColorFactors.ts` hold per-formula coefficients keyed by gender/skin color; the calculator indexes into them rather than branching. When changing a formula, edit the coefficient table, not the calculator logic, where possible. `formeln.md` documents every formula and its sources — consult it before touching `egfrCalculator.ts`.

**Classification.** `classificationService` (singleton, `src/services/classification-service.ts`) maps an eGFR value to a CKD stage via `min`/`max` ranges in `src/constants/classifications.ts`.

### Cross-cutting services
- `logger` (`src/services/debugger-logger.ts`) — singleton, no-op unless the host page URL has `?debug=true`. Use `logger.log()` for diagnostics rather than bare `console.log`.
- `iconService` (`src/services/icon-service.ts`) — wraps Font Awesome; icons must be registered in the `library.add(...)` call in its constructor before `getIcon()` can render them by name.
- `FieldMapper` (`src/services/field-mapper.ts`) — maps internal field names to German display labels.

## Conventions

- **Lit components**: each is a `@customElement("app-...")` class. Per-component CSS is colocated in the static `styles` array; shared styles come from `src/styles/app-styles.ts`. Theme is driven by CSS custom properties documented in README.md (`--app-theme-*`).
- **TypeScript is strict** with `noUnusedLocals`/`noUnusedParameters` and `experimentalDecorators` (with `useDefineForClassFields: false`, required for Lit decorators). Imports use explicit `.ts` extensions (`allowImportingTsExtensions`).
- Adding a calculator: create `src/components/calculators/<name>.ts`, add the `EgfrCalculator` method + any coefficients, import the component in `src/nierenrechner.ts`, and add a `@property` flag + conditional tab/panel block.
