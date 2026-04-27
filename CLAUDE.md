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

Vue 3 SPA (Composition API + `<script setup>`, no TypeScript) built with Vite. No state management library — all state is local `ref()`/`reactive()` per component.

### API Layer (`src/services/api.js`)

Single axios instance shared across the app. Base URL comes from `VITE_API_BASE_URL` env var, falling back to `/api` (proxied in dev via `vite.config.js` to the Azure backend). In production, points to `https://cvapi20260422004212.azurewebsites.net/api`.

Two interceptors:
- **Request:** Attaches `Authorization: Bearer <token>` from `localStorage` if present.
- **Response:** On 401, clears the token and redirects to `/login`. On 500 GET failures, retries up to 3 times with exponential backoff (2s × retry count).

API modules exported from the same file: `authApi`, `profileApi`, `projectsApi`, `skillsApi`, `experienceApi`, `educationApi`, `contactApi`.

### Auth Flow

Login POSTs to `/auth/login`, receives `{ token }`, stores it in `localStorage`. The router's `beforeEach` guard checks `meta.requiresAuth` and redirects unauthenticated users to `/login`. Only `/admin` is protected.

### View Structure

- **Public views** (`src/views/`): Home, Projects, Skills, Experience, Education, Contact, Login — each fetches its own data on mount.
- **Admin** (`src/views/AdminView.vue`): Tabbed shell that renders six admin sub-components from `src/components/admin/`. Each sub-component handles full CRUD inline.

### Styling

Dark theme with cyan (`#4fc3f7`) and purple (`#a78bfa`) accents. Global styles in `src/assets/main.css`; shared admin UI styles in `src/components/admin/admin.css`. All other styles are scoped CSS blocks inside `.vue` files. No CSS framework or preprocessor.

### Locale

All UI text (labels, errors, skill levels) is in **Danish**. Skill levels are: Begynder → Øvet → Avanceret → Ekspert.
