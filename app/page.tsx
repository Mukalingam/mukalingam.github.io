"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import TerminalLoader from "@/components/TerminalLoader";
import DownloadResume from "@/components/DownloadResume";
import Reveal from "@/components/Reveal";
import GalleryTunnel from "@/components/GalleryTunnel";
import HorizontalExperience from "@/components/HorizontalExperience";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import TextScramble from "@/components/TextScramble";
import AgentTerminal from "@/components/AgentTerminal";
import { socials, projects, techLogos } from "@/lib/data";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 flex items-center justify-center bg-[#0a0a14]">
      <TerminalLoader text="Booting 3D..." />
    </div>
  ),
});

const heroMarquee = [
  "AGENTIC AI", "MULTI-AGENT SYSTEMS", "VOICE AI", "RAG PIPELINES",
  "LANGGRAPH", "MCP / A2A", "LLMOPS", "PRODUCTION-GRADE",
];

const roles = [
  "AI Solution Architect",
  "Agentic AI Specialist",
  "Voice AI Builder",
  "RAG Pipeline Engineer",
];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-block text-[#8888f5]"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);

  return (
    <main className="min-h-screen overflow-x-clip text-white">
      <Scene3D />

      {/* ── Hero: split layout — decode-effect name + live agent terminal ── */}
      <section className="relative flex h-screen flex-col justify-end">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="flex flex-1 flex-col"
        >
          <div className="grid flex-1 items-center gap-12 px-[6vw] pt-24 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <h1 className="text-[clamp(3rem,8.5vw,8rem)] font-bold leading-[0.95] tracking-tighter">
                <TextScramble text="MUKA" />
                <br />
                <TextScramble
                  text="LINGAM"
                  delay={500}
                  className="text-[#5b5bf0]"
                />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="mt-6 text-2xl font-semibold text-gray-200 sm:text-3xl"
              >
                <RotatingRole />
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.7 }}
                className="mt-3 max-w-md text-gray-400"
              >
                Building agentic AI systems, Voice AI platforms and RAG
                pipelines that ship to production — enterprise to national
                scale.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-8 flex items-center gap-8"
              >
                <DownloadResume />
                <div className="flex gap-5">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-gray-500 transition hover:text-[#5b5bf0]"
                    >
                      {s.name} ↗
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden lg:block"
            >
              <AgentTerminal />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-8 border-y border-white/5 py-4"
          >
            <Marquee items={heroMarquee} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About: sticky giant outline title + scrolling copy ─────── */}
      <section id="about" className="relative px-[6vw] py-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <h2 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_#5b5bf0]">
                ABOUT
                <br />
                ME
              </h2>
            </Reveal>
          </div>
          <div className="space-y-8 text-lg leading-relaxed text-gray-300">
            <Reveal>
              <p>
                Senior AI Solution Architect with{" "}
                <span className="text-white">7+ years</span> of
                production-grade experience designing and shipping LLM-first,
                agentic AI systems at enterprise and national scale.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Specialist in{" "}
                <span className="text-[#8888f5]">
                  stateful multi-agent orchestration
                </span>{" "}
                (LangGraph, CrewAI), deterministic tool-calling, MCP/A2A
                interoperability, RAG pipelines and Voice AI — backed by
                rigorous LLMOps and evaluation.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Proven delivery across FinTech, Healthcare, Government, AdTech
                and Manufacturing — including a{" "}
                <a
                  href="https://ivaak.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5b5bf0] underline underline-offset-4 hover:text-white"
                >
                  live B2B Voice AI SaaS
                </a>{" "}
                and government-recognized deployments.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="inline-block font-mono text-sm text-[#5b5bf0] hover:underline"
              >
                more about me →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats: full-width count-up band ────────────────────────── */}
      <section className="border-y border-white/5 bg-[#0a0a14]/70 px-[6vw] py-24 backdrop-blur-sm">
        <Stats />
      </section>

      {/* ── Experience: sticky horizontal scroll ───────────────────── */}
      <HorizontalExperience />

      {/* ── Projects: 3D gallery tunnel ────────────────────────────── */}
      <GalleryTunnel projects={projects.slice(0, 8)} />
      <div className="pb-24 text-center">
        <Link
          href="/projects"
          className="inline-block rounded-full border border-[#5b5bf0]/50 px-8 py-3 font-mono text-sm text-[#8888f5] transition hover:border-[#5b5bf0] hover:bg-[#5b5bf0]/10 hover:text-white"
        >
          view all {projects.length} projects →
        </Link>
      </div>

      {/* ── Skills: dual-direction marquees ────────────────────────── */}
      <section className="border-y border-white/5 py-20">
        <Reveal>
          <h2 className="mb-10 px-[6vw] font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
            TOOLKIT
          </h2>
        </Reveal>
        <div className="space-y-5">
          <Marquee items={techLogos[0]} />
          <Marquee items={techLogos[1]} reverse />
          <Marquee items={techLogos[2]} />
        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────────────────────── */}
      <section id="contact" className="px-[6vw] py-36 text-center">
        <Reveal>
          <p className="font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
            NEXT PROJECT?
          </p>
          <Link href="/contact" className="group mt-6 block">
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-tight tracking-tighter transition group-hover:text-[#8888f5]">
              Let&apos;s build something
              <br />
              intelligent together
              <span className="text-[#5b5bf0] transition group-hover:translate-x-2">
                {" "}→
              </span>
            </h2>
          </Link>
        </Reveal>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/10 px-[6vw] py-10 text-xs text-gray-600 sm:flex-row">
        <p>© 2026 Muka Lingam · Hyderabad, India</p>
        <div className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#5b5bf0]"
            >
              {s.name}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
