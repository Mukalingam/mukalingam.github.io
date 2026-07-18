# Migration Notes — v1 → v2

v1 preserved on branch `v1-archive`. This file is the Phase 0 inventory (spec §0).

## v1 stack
Vite + React 18 + TS SPA. Three.js character (2.3MB encrypted GLB + 1MB draco decoder + 296KB HDR ≈ 3.6MB 3D payload), GSAP ScrollSmoother, R3F physics tech-stack scene. **Zero content in raw HTML** — everything client-rendered (the core problem this revamp fixes).

## v1 sections
Landing (name + rotating "Architect/Engineer") · About · What I Do (2 cards) · Career timeline (5 entries) · Work (10 hardcoded projects, Unsplash images, modal-only — no detail pages) · TechStack (3D physics spheres) · Blogs (5 hardcoded Medium posts) · Contact · Navbar · Command palette (Ctrl+K) · "AI chatbot" (client-side keyword matching, no LLM, no backend) · custom cursor, sound toggle, particle network.

## Preserved
- `public/Muka Resume.pdf` — **flag: spec asks for the global/UAE variant without personal-details block; current file may need replacing before launch**
- Career timeline content (Innodatatics 2019 → Spotflock 2021 → Audience Street 2023–25 → LowCode Labs 2025 → IICL now) — reused in /ask knowledge + case-study context
- Links: github.com/Mukalingam · linkedin.com/in/muka-lingam-278526113 · medium.com/@utlamuka · utlamuka@gmail.com
- 5 Medium post URLs (hardcoded fallback for Writing section)
- Vercel Analytics was installed (client had `@vercel/analytics`) — not carried over; GitHub Pages + optional analytics can be re-added later

## Dropped (superseded per spec §0.3)
- All of `public/images/` (~35MB, 100% orphaned template leftovers — nothing referenced by code)
- 3D character + draco + HDR + encrypt helper (kills LCP; spec §3 3D policy: >150KB → drop)
- GSAP, Three.js, R3F, rapier, cannon, postprocessing, marquee deps
- Old 10-project list (pre-2025 positioning) → superseded by 2 live products + 5 case studies; older items compressed into "Earlier work" accordion
- Keyword chatbot → superseded by /ask curated Q&A (fallback mode), Workers-backed agent later

## Not found in v1 (needed, ask Muka)
- Profile photo — none exists in repo
- iVaak / TruFix demo clips or imagery — none exist; architecture SVGs generated instead
- Analytics snippet — none in index.html
