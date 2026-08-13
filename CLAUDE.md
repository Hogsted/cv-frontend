# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (port 5173)
npm run build     # Production build
npm run preview   # Preview production build
```

No test runner or linter is configured.

## Architecture

Vue 3 SPA (Composition API + `<script setup>`, no TypeScript) built with Vite. No state management library — all state is local `ref()`/`reactive()` per component. Fully static site: no backend, no API calls, no auth.

### Data (`src/data/*.js`)

Profile, skills, experiences, and educations are hardcoded in plain JS modules under `src/data/`. Views import these directly and render them — no fetching, loading state, or error handling to worry about.

**Projects are the exception:** `src/data/projects.js` is generated at build time by `scripts/fetch-github-projects.js` and is gitignored — don't edit it by hand, it gets overwritten. To add/remove a showcased project or change its title/fallback description/live-URL override, edit `src/data/projects.config.js` (the small, committed source list) instead. The script runs automatically via `predev`/`prebuild` npm hooks; it calls the GitHub REST API per repo for `description`, `homepage`, and language byte-counts (top 3 become the card's tech tags), and derives the filter `categories` (`C#/.NET`, `Frontend`, `Backend`, `API`) heuristically from the primary language plus repo name/description keywords — this is an approximation, not guaranteed precise for mixed-stack repos. On a per-repo fetch failure the script falls back to the previous generated data (or the config's `descriptionFallback`) rather than breaking the build. CI passes `secrets.GITHUB_TOKEN` to the build step for a higher rate limit.

### View Structure

`src/views/`: Home, Projects, Skills, Experience, Education — each imports its data directly from `src/data/`. There is no Contact, Login, or Admin page.

### Styling

Dark theme with cyan (`#4fc3f7`) and purple (`#a78bfa`) accents. Global styles in `src/assets/main.css`. All other styles are scoped CSS blocks inside `.vue` files. No CSS framework or preprocessor.

### Locale

All UI text (labels, skill levels) is in **Danish**. Skill levels are: Begynder → Øvet → Avanceret → Ekspert.

### Deployment

Built to `dist/` and deployed via FTP (see `.github/workflows/deploy.yml`) as a static site — `public/web.config` handles SPA fallback routing on IIS. No server-side component, no environment-specific API URLs.
