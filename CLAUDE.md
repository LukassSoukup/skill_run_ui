# CLAUDE.md — skill_run_ui

Guidelines for Claude Code when working in this repository.

---

## Project Overview

Personal portfolio website for Lukáš Soukup, a Full-Stack Software Engineer. Built with Next.js App Router, featuring an interactive 3D scene, animated UI, dark/light theming, and a contact form backed by a serverless API route.

Live site: https://skill-run-ui.vercel.app/

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 + DaisyUI 4 |
| 3D | Three.js + @react-three/fiber |
| Animation | Framer Motion |
| Forms | React Hook Form |
| Email | Resend |
| Deployment | Vercel |

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (Turbopack) at http://localhost:3000
npm run build        # Production build
npm run start        # Start production server locally
npm run lint         # Run ESLint
```

Always run `npm run lint` before committing.

---

## Environment Variables

| Variable | Required | Used in |
|---|---|---|
| `RESEND_API_KEY` | Yes | `src/app/api/contact/route.ts` |

Create a `.env.local` file at the project root. This file is git-ignored — never commit secrets.

```
RESEND_API_KEY=your_api_key_here
```

---

## Project Structure

```
src/app/
├── (main)/                  # Route group for main pages
│   ├── (home)/page.tsx      # Landing page
│   ├── about/               # About + skills modal
│   ├── work/                # Work experience
│   ├── contact/             # Contact form page
│   └── personalProjects/    # GitHub projects showcase
├── api/contact/route.ts     # POST endpoint — sends email via Resend
├── components/
│   ├── canvas/              # Three.js / R3F scene components
│   └── Utils/               # Shared utility components
├── context/                 # React context providers (ThemeProvider)
├── data/                    # Static content (staticDataProvider, icons)
├── interfaces/              # TypeScript interfaces/types
├── layout.tsx               # Root layout
└── globals.css              # Global styles
```

Use the `@/*` path alias (maps to `./src/*`) everywhere — never use relative `../../` paths beyond one level.

---

## Code Style & Conventions

### TypeScript
- Strict mode is enabled — always provide explicit types; avoid `any`.
- Use `.tsx` for files that contain JSX; use `.ts` for pure logic.
- Define interfaces/types in `src/app/interfaces/` when shared across files.

### Components
- One component per file; the file name must match the exported component name.
- Prefer functional components with hooks.
- Keep components small and focused. Extract logic into custom hooks or utility functions when a component grows too large.

### Styling
- Use Tailwind utility classes as the primary styling approach.
- Use DaisyUI component classes (e.g. `btn`, `modal`, `card`) for standard UI elements.
- Avoid writing custom CSS unless Tailwind/DaisyUI cannot achieve the result.
- Dark mode is handled via the `ThemeProvider` context and DaisyUI themes (`business` dark / default light). Do not hardcode colors that conflict with theming.

### Animation
- Use Framer Motion for all enter/exit animations and transitions.
- Avoid inline CSS `transition` styles — keep animation logic in Framer Motion props.

### 3D / Canvas
- All Three.js components live in `src/app/components/canvas/`.
- Use `@react-three/fiber` React primitives (`<mesh>`, `<ambientLight>`, etc.) rather than imperative Three.js API calls where possible.
- Heavy canvas components should be dynamically imported with `next/dynamic` and `{ ssr: false }` to avoid SSR issues.

### API Routes
- Keep API routes thin — validate input, call a service, return a response.
- Always handle errors and return appropriate HTTP status codes.
- Never expose secrets or internal error details to the client.

---

## Deployment

Deployment is managed by Vercel. Pushing to the `main` branch triggers an automatic production deployment. No manual deploy steps are needed.

- Do not commit `.env.local` or any file containing secrets.
- Verify `npm run build` succeeds locally before pushing significant changes.

---

## Testing & Linting

No test framework is currently configured. When adding one, prefer **Vitest** with **React Testing Library**.

Always run before committing:
```bash
npm run lint
```

Fix all lint errors before opening a PR — the ESLint config enforces Next.js best practices and Core Web Vitals rules.

---

## General Do's and Don'ts

**Do:**
- Keep components small and single-purpose.
- Use the existing `staticDataProvider.tsx` for all static content instead of hardcoding strings in components.
- Follow the established folder structure when adding new pages or components.
- Use `next/image` for all images to get automatic optimization.
- Use `next/link` for internal navigation.

**Don't:**
- Add new npm dependencies without good reason — check if existing libraries already cover the need.
- Use `useEffect` for data that can be derived from props or state.
- Bypass TypeScript with `as any` or `@ts-ignore` without a documented reason.
- Write large monolithic components — split early.
- Use `console.log` in production code; remove debug statements before committing.
