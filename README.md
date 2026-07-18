# mukalingam.in

Portfolio of **Muka Lingam** — AI Solution Architect. Live at [mukalingam.in](https://mukalingam.in).

Next.js 15 (App Router) static export → GitHub Pages. Every word server-rendered into HTML — parseable by ATS/AI screeners and link previews.

- `/` — hero bento · live products (iVaak, TruFix) · 5 case studies · How I Build · writing · contact
- `/work/<slug>` — case-study pages
- `/ask` — "Ask Muka's Agent": curated Q&A grounded in resume + case studies, zero backend

## Develop

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

Deploys automatically via GitHub Actions on push to `main`. Medium posts are fetched from RSS at build time (hardcoded fallback if unreachable). v1 (Vite + Three.js) lives on the `v1-archive` branch.
