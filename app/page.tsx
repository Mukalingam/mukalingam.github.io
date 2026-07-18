import Link from "next/link";
import Terminal from "@/components/Terminal";
import ArchDiagram from "@/components/ArchDiagram";
import { site, metrics, logos, products, buildSteps, caseStudies, earlierWork, speaking } from "@/lib/data";
import { getPosts } from "@/lib/posts";

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      {/* ============ Hero bento ============ */}
      <section className="hero wrap">
        <div className="bento">
          <div className="tile tile-main">
            <p className="kicker">AI Solution Architect</p>
            <h1>{site.name}</h1>
            <p className="role">Building agentic AI for the enterprise</p>
            <p className="oneliner">
              <strong>{site.oneliner}</strong> Voice agents, autonomous ITSM, grounded RAG, and
              production computer vision — measured, observable, and eval-gated.
            </p>
            <div className="cta-row">
              <Link href="/ask/" className="btn btn-gold">Ask my agent</Link>
              <a href={site.resume} download className="btn btn-ghost">Download resume</a>
              <div className="icon-links">
                <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.11-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
                </a>
                <a href={site.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="tile tile-metrics" aria-label="Key metrics">
            <div className="metrics">
              {metrics.map((m) => (
                <div className="metric" key={m.lbl}>
                  <span className="num">{m.live && <span className="pulse-dot" aria-hidden="true" />}{m.num}</span>
                  <span className="lbl">{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tile tile-terminal">
            <Terminal />
          </div>

          <div className="tile tile-logos">
            <p className="logos-label">Shipped for</p>
            <div className="logo-wall">
              {logos.map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Live products ============ */}
      <section className="section wrap" id="products">
        <p className="section-label">Live Products</p>
        <h2 className="section-title">Two products in production, right now</h2>
        <p className="section-sub">
          Not side projects — multi-tenant SaaS platforms with enterprise clients, uptime budgets, and eval-gated releases.
        </p>
        <div className="products">
          {products.map((p) => (
            <article className="product" key={p.name}>
              <div className="product-top">
                <h3><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a></h3>
                <span className="badge-live"><span className="pulse-dot" aria-hidden="true" />Live · Enterprise clients</span>
              </div>
              <p className="tagline">{p.tagline}</p>
              <ArchDiagram nodes={p.pipeline} title={`${p.name} pipeline`} />
              <ul>
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <a className="product-link" href={p.url} target="_blank" rel="noopener noreferrer">
                {p.url.replace("https://", "")} ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ============ Selected work ============ */}
      <section className="section wrap" id="work">
        <p className="section-label">Selected Work</p>
        <h2 className="section-title">Five case studies, real outcomes</h2>
        <p className="section-sub">
          Depth over volume: problem, constraints, architecture, and the measured result. Written the way I build — no fluff.
        </p>
        <div className="work-grid">
          {caseStudies.map((c) => (
            <Link href={`/work/${c.slug}/`} className={`work-card${c.featured ? " featured" : ""}`} key={c.slug}>
              <span className="work-client">{c.client}</span>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <p className="work-outcome"><b>Outcome:</b> {c.outcomeShort}</p>
              <div className="chips">
                {c.stack.slice(0, 5).map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
              <span className="work-more">Read case study →</span>
            </Link>
          ))}
        </div>
        <details className="earlier">
          <summary>Earlier work</summary>
          <div>
            <ul>
              {earlierWork.map((w) => (
                <li key={w.title}><b>{w.title}</b> — {w.line}</li>
              ))}
            </ul>
          </div>
        </details>
      </section>

      {/* ============ How I build ============ */}
      <section className="section wrap" id="how-i-build">
        <p className="section-label">How I Build</p>
        <h2 className="section-title">Production is the only benchmark</h2>
        <p className="section-sub">
          The checklist every system I ship goes through — the same one that gates iVaak and TruFix releases.
        </p>
        <div className="build-strip">
          {buildSteps.map((s) => (
            <div className="build-step" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="proof">{s.proof}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Writing & speaking ============ */}
      <section className="section wrap" id="writing">
        <p className="section-label">Writing &amp; Speaking</p>
        <h2 className="section-title">Latest from Medium</h2>
        <div className="posts">
          {posts.map((p) => (
            <a className="post" href={p.url} target="_blank" rel="noopener noreferrer" key={p.url}>
              {p.date && <time dateTime={p.date}>{fmt(p.date)}</time>}
              <h3>{p.title}</h3>
              <span>Read on Medium ↗</span>
            </a>
          ))}
        </div>
        <div className="speaking">
          {speaking.map((s) => (
            <span key={s.pre}><b>{s.pre}</b>{s.rest}</span>
          ))}
        </div>
      </section>

      {/* ============ Contact ============ */}
      <section className="contact wrap" id="contact">
        <h2>Let&apos;s build something that ships.</h2>
        <p>
          Open to AI architecture roles, advisory, and hard agentic-AI problems.
          The fastest way to reach me is email or LinkedIn.
        </p>
        <div className="cta-row" style={{ justifyContent: "center" }}>
          <a href={`mailto:${site.email}`} className="btn btn-gold">{site.email}</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">LinkedIn</a>
        </div>
      </section>
    </main>
  );
}
