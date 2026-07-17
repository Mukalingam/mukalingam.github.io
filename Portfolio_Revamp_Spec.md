# Portfolio Revamp Spec — mukalingam.github.io v2

**Owner:** Utla Mukalingam (Muka) · AI Solution Architect
**Build tool:** Claude Code · **Host:** GitHub Pages (static export)
**Goal:** A portfolio that proves "production agentic AI architect" in one scroll — parseable by ATS/AI screeners, memorable to humans, and itself a demo of my craft.

---

## 0. PHASE 0 — Audit & migrate (do this first)

The current site is a client-side JS app with 3D elements. Before building:
1. Inventory the existing repo: list every section, asset, and the 3D implementation (likely Three.js). Save the inventory to `MIGRATION_NOTES.md`.
2. Preserve: profile photo assets, any project imagery worth keeping, resume PDF link, analytics snippet if present.
3. Everything else is superseded by this spec. Old projects list is outdated (pre-2025 identity: "Lead AI Engineer, freelancing") — the new positioning is AI Solution Architect with two live products.

## 1. Non-negotiable technical decisions

- **Framework:** Next.js 14 (App Router) with `output: 'export'` static export → GitHub Pages. Every word of content must be in the server-rendered HTML. **Reason:** the current site renders nothing without JS — invisible to ATS/AI screeners and link previews. Verify with `curl` that hero text + project names appear in raw HTML.
- **SEO/metadata:** full OpenGraph + Twitter cards, JSON-LD Person + SoftwareApplication schema for iVaak/TruFix, sitemap, semantic headings (h1 = name + role).
- **Performance budget:** LCP < 2.0s on mobile, Lighthouse ≥ 95 performance. This kills the heavy 3D hero (see §3).
- **Design language:** dark-first, Linear/Vercel-tier aesthetic — Inter (or Geist) with tight tracking, light/medium weights; bento-grid hero; glassmorphism nav with backdrop blur; subtle hover micro-interactions; CSS/SVG abstract visuals, zero stock photos. Accent color: gold #C9A227 on deep navy/near-black (matches my resume brand).
- **Light mode:** supported via toggle, dark default.

## 2. Information architecture (single page + 3 subpages)

```
/               → Hero bento · Live Products · Selected Work (case studies) ·
                  How I Build · Writing & Speaking · Contact
/work/[slug]    → 5 case-study pages (see §5)
/ask            → "Ask Muka's Agent" (see §7 — the unique feature)
/uses           → stack & tools page (nice-to-have, low priority)
```

## 3. Hero — bento grid (replace the 3D scene)

Replace the heavy 3D hero with a **bento grid** that delivers instant credibility:

- **Tile 1 (large):** Name, "AI Solution Architect", one-liner: *"I build agentic AI systems that run in production — not in demos."* CTA buttons: "Ask my agent" (→ /ask), "Download resume", GitHub/LinkedIn/Medium icons.
- **Tile 2 — live metrics strip:** `2 live AI products` · `sub-800ms voice latency` · `−35% MTTR in pilots` · `7+ yrs` · `$1M+ saved (CV systems)`. Static values, styled like a live dashboard with a subtle pulse dot on "live".
- **Tile 3 — logo wall:** Microsoft · Qatar Energy · Dr. Reddy's · BEL · Govt. of India (INCOIS/HERC) · Sembcorp. Text-styled if logo licensing is a concern.
- **Tile 4 — mini terminal animation:** a typed-out code snippet cycling my principle: `principle = "Agents you can't measure are agents you can't trust."` (CSS/JS typing effect, no heavy libs).
- **3D policy:** one tasteful, cheap accent only — e.g., a lightweight WebGL/CSS particle field or animated gradient mesh behind the bento, lazy-loaded, `prefers-reduced-motion` respected. If any existing 3D asset is < 150KB and tasteful, it may live here; otherwise drop it. The 3D must never block LCP.

## 4. Live Products section

Two large cards — these are the crown jewels, treat them like product marketing:

- **iVaak AI** — ivaak.ai (live link, opens in new tab). Multi-tenant Voice AI SaaS. Sub-bullets: isolated per-tenant LangGraph state machines · RAG knowledge bases · real-time human escalation · sub-800ms latency. Include a 20–30s muted autoplay demo clip or animated architecture SVG (voice pipeline: Twilio → Whisper → LangGraph → ElevenLabs).
- **TruFix AI** — trufix.ai. Autonomous ITSM platform. Sub-bullets: agents own the full ticket lifecycle · confidence-threshold human routing · −35% MTTR in pilots · every release eval-gated (Langfuse + RAGAS).
- Each card: "Status: Live · Enterprise clients" badge with pulse dot.

## 5. Selected Work — 5 case studies (quality over quantity)

Per 2026 research: 3–5 deep case studies beat exhaustive lists. Each `/work/[slug]` page follows the same template: **Problem → Constraints → Architecture (SVG diagram) → What I built → Measured outcome → Stack chips**. Write in first person, concrete numbers, no fluff.

1. **Enterprise AI Copilot — Microsoft** · Azure OpenAI, MS Teams, Azure DevOps APIs + MCP-based connectors, schema-validated tool-calling with confirmation gates. Outcome: manual ADO overhead cut, faster sprint planning. (Respect confidentiality: no internal details beyond what's public on my resume.)
2. **QConnect — Qatar Energy** · multilingual RAG over port-operations manuals, AI-generated assessments, presence verification; formal executive pilot handover. Outcome: answers in seconds vs manual searches through hundreds of pages.
3. **SentinelView — CCTV Video Intelligence** · YOLO26 + ByteTrack, queue/wait-time analytics, heatmaps, intrusion/loitering alerts with operator review + per-type precision metrics, PyTorch→ONNX→TensorRT benchmark page. Link the GitHub repo + 60-second demo video. (This is the newest build — feature it prominently.)
4. **Pharma Regulatory Document Intelligence — Dr. Reddy's** · grounded, citation-backed RAG; groundedness-first design for compliance.
5. **Industrial Vision — BEL + Sembcorp (combined "vision in production" story)** · RF-DETR bolt/connector inspection on live production-line cameras; YOLO+OpenCV gauge monitoring ($1M+ saved, 900+ hours). Plus INCOIS hazardous marine species detection as a third vignette.

Older work (INCOIS ocean currents, HERC forecasting, AdTech) → one compact "Earlier work" accordion, one line each. Do not give them cards.

## 6. "How I Build" section (differentiator — almost no portfolio has this)

Port the production checklist from my GitHub README as a visual 5-step strip:
**Eval-first → Observability by default → Safety & guardrails → Cost engineering → Deterministic tool integration.**
One sentence + one proof metric each (e.g., Cost engineering: "cut LLM API spend 30% in production via caching, batching, model routing"). Research says production signals (evals, error handling, monitoring) are exactly what 2026 hiring managers scan for — this section says it explicitly.

## 7. THE unique feature — "Ask Muka's Agent" (/ask)

The portfolio of someone who builds agents should contain one. A chat interface where visitors (recruiters!) ask about my experience and get grounded answers.

- **UI:** clean chat panel, suggested starter chips: "What has Muka shipped in production?" · "Tell me about iVaak's architecture" · "Is Muka open to relocation?" · "Walk me through his eval practice."
- **Grounding:** answers ONLY from a curated `knowledge.md` (my resume + case studies + FAQ — I will review this file's content before launch). Strict system prompt: answer only from provided context; if unknown, say "I don't have that — email Muka." Include contact CTA in fallback.
- **Backend reality check for GitHub Pages (static):** no server. Options in order of preference: (a) call a small serverless endpoint (Cloudflare Workers free tier / Vercel edge function) that holds the API key and calls Claude API with the knowledge file; (b) if no serverless, ship a "curated Q&A" mode — fuzzy-match against 25 pre-written Q&A pairs client-side, clearly labeled, zero API cost. Build (b) as the fallback regardless so the page never breaks.
- **Guardrails:** rate-limit per IP on the worker, max tokens capped, no conversation memory needed, log questions (anonymized) — the questions recruiters ask are market intelligence for me.
- This feature IS the portfolio's proof of craft: mention on the page "This agent is grounded, eval-tested, and refuses to hallucinate — like everything I ship."

## 8. Writing & Speaking

- Latest 4 Medium posts (build-time fetch of the RSS at deploy, statically rendered — no client-side fetch).
- Teaching/speaking strip: Empanelled Faculty — Boston Institute of Analytics (GenAI & Agentic AI) · Speaker — East Coast Maritime & Logistics Summit 2025 · 'Super Scientist' award, Spotflock.

## 9. Contact / footer

- Email (mailto), LinkedIn (linkedin.com/in/muka-lingam-278526113), GitHub (github.com/Mukalingam), Medium (@utlamuka), resume PDF download.
- Line: "Based in Hyderabad · Open to global roles (GCC / remote) · Building ivaak.ai".
- No contact form (static host); mailto + LinkedIn are enough.

## 10. Build order for Claude Code

1. Phase 0 audit → `MIGRATION_NOTES.md`
2. Scaffold Next.js static export + design system (tokens: colors, type scale, bento components) + deploy pipeline to GitHub Pages (GitHub Action)
3. Hero + Live Products + How I Build (homepage core)
4. 5 case-study pages from content in this spec (draft copy; I'll edit)
5. Writing (RSS at build) + contact + SEO/JSON-LD + OG images (generate a branded OG card)
6. /ask — curated Q&A mode first (works everywhere), then the Workers-backed live agent
7. Lighthouse pass ≥95, verify raw-HTML parseability with curl, mobile QA
8. Commit per phase; final: replace old site, keep old version on a `v1-archive` branch

**Definition of done:** curl shows full content in HTML · Lighthouse ≥95 · /ask works in fallback mode with no backend · all 5 case studies live · resume PDF current (UAE version without personal-details block — use the global variant).
