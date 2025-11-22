# Repository Guidelines

## Project Structure & Module Organization
- Next.js (pages router) + TypeScript + Tailwind.
- App entry: `pages/` (e.g., `pages/index.tsx`, `pages/create.tsx`).
- UI components: `components/` (e.g., `components/samples/PersonaList.tsx`).
- Sample data/content: `samples/` (e.g., `samples/personas-list.json`, `samples/personas/<id>/{profile.md,prompt.md}`).
- Utilities & types: `utils/`, `types/`.
- Static assets: `public/`. Build outputs: `.next/`, `out/`.

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server on `http://localhost:3000`.
- `npm run build` — Production build (typecheck + Next build).
- `npm start` — Serve the production build.
- `npm run export` — Static export to `out/`.
- `npm run lint` — ESLint (Next config).
- `npm test` — Basic repository checks in `scripts/test-basic-functionality.js`.

## Coding Style & Naming Conventions
- TypeScript strictness preferred; keep props/interfaces explicit.
- ESLint (Next) + Tailwind utility-first classes. No Prettier in repo—match existing style.
- File names: React components in `PascalCase.tsx` (e.g., `PersonaList.tsx`), pages in `kebab-case.tsx` or route folders.
- Routes: keep under `pages/` with clear, shallow paths (e.g., `/create`, `/samples/personas/[id]`).

## Testing Guidelines
- CI-style checks: `npm test` and `npm run build` should pass locally before pushing.
- The test script validates file presence, form data sections, prompt generator strings, clipboard fallback, and build.
- Add new tests to `scripts/` or extend the existing script when modifying critical flows.

## Commit & Pull Request Guidelines
- Commits: imperative, concise, scoped (e.g., `Add …`, `Fix …`, `Refactor …`).
- PRs: 日本語で作成してください。要約・背景・変更範囲を明記し、関連Issueのリンク、`samples/`配下のスキーマ/コンテンツ変更があれば記載。
- UI changes: attach before/after screenshots or GIFs; list impacted routes (e.g., `/`, `/create`).
- Ensure `npm run lint`, `npm test`, and `npm run build` succeed before requesting review.

## Security & Configuration Tips
- This app is static/SSG focused; avoid secrets in the repo or client code.
- Do not commit tokens or private data to `samples/`. Treat added content as public.

## Agent-Specific Instructions
- Keep changes minimal and focused; avoid unrelated refactors.
- Respect existing structure and copy; update docs when moving files/routes.
- When adding content, follow `samples/personas/<id>/profile.md` and `prompt.md` layout.
