import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/data";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI Solution Architect`,
    template: `%s — ${site.name}`,
  },
  description:
    "AI Solution Architect building agentic AI systems that run in production. Creator of iVaak AI (voice AI SaaS) and TruFix AI (autonomous ITSM). 7+ years shipping AI for Microsoft, Qatar Energy, Dr. Reddy's, BEL and Govt. of India.",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — AI Solution Architect`,
    description: "Agentic AI systems that run in production — not in demos.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Solution Architect`,
    description: "Agentic AI systems that run in production — not in demos.",
  },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.fullName,
      alternateName: site.name,
      jobTitle: "AI Solution Architect",
      url: site.url,
      email: `mailto:${site.email}`,
      sameAs: [site.github, site.linkedin, site.medium],
      address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
      knowsAbout: ["Agentic AI", "LLMs", "RAG", "Voice AI", "Computer Vision", "MCP", "MLOps"],
    },
    {
      "@type": "SoftwareApplication",
      name: "iVaak AI",
      url: "https://ivaak.ai",
      applicationCategory: "BusinessApplication",
      description: "Multi-tenant Voice AI SaaS with sub-800ms latency, per-tenant LangGraph state machines and RAG knowledge bases.",
      author: { "@type": "Person", name: site.fullName },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "SoftwareApplication",
      name: "TruFix AI",
      url: "https://trufix.ai",
      applicationCategory: "BusinessApplication",
      description: "Autonomous ITSM platform where AI agents own the full ticket lifecycle with confidence-threshold human routing.",
      author: { "@type": "Person", name: site.fullName },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.variable}>
        <div className="mesh" aria-hidden="true" />
        <Nav />
        {children}
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>
              Based in Hyderabad · Open to global roles (GCC / remote) · Building{" "}
              <a href="https://ivaak.ai" target="_blank" rel="noopener noreferrer">ivaak.ai</a>
            </span>
            <nav className="footer-links" aria-label="Social links">
              <a href={`mailto:${site.email}`}>Email</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={site.medium} target="_blank" rel="noopener noreferrer">Medium</a>
              <a href={site.resume} download>Resume</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
