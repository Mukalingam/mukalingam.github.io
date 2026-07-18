import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArchDiagram from "@/components/ArchDiagram";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    openGraph: { title: c.title, description: c.summary },
    alternates: { canonical: `/work/${c.slug}/` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = caseStudies.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const c = caseStudies[i];
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <main className="case wrap">
      <Link href="/#work" className="back">← All work</Link>
      <p className="case-client">{c.client}</p>
      <h1>{c.title}</h1>
      <p className="case-summary">{c.summary}</p>

      <h2>Problem</h2>
      <p>{c.problem}</p>

      <h2>Constraints</h2>
      <ul>
        {c.constraints.map((x) => <li key={x}>{x}</li>)}
      </ul>

      <h2>Architecture</h2>
      <ArchDiagram nodes={c.architecture} title={`${c.title} architecture`} />

      <h2>What I built</h2>
      <ul>
        {c.built.map((x) => <li key={x}>{x}</li>)}
      </ul>

      <h2>Measured outcome</h2>
      <div className="outcome-box">
        <p>{c.outcome}</p>
      </div>

      {c.links && c.links.length > 0 && (
        <p>
          {c.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontWeight: 550, marginRight: 18 }}>
              {l.label} ↗
            </a>
          ))}
        </p>
      )}

      <div className="chips">
        {c.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
      </div>

      <div className="case-nav">
        <Link href="/#work">← All work</Link>
        <Link href={`/work/${next.slug}/`}>Next: {next.client} →</Link>
      </div>
    </main>
  );
}
