"use client";

import dynamic from "next/dynamic";
import Reveal from "@/components/Reveal";
import DownloadResume from "@/components/DownloadResume";
import Stats from "@/components/Stats";
import { certifications, recognition } from "@/lib/data";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

const expertise = [
  {
    area: "Agentic AI",
    items:
      "Multi-Agent Systems · LangGraph · CrewAI · LangChain · LlamaIndex · MCP · A2A Protocol · Tool-Calling · Stateful Orchestration · HITL Design",
  },
  {
    area: "LLM & RAG",
    items:
      "Claude · GPT-4o · Gemini · Llama · RAG Pipelines · Hybrid Retrieval · Re-ranking · Semantic Chunking · Fine-tuning (LoRA/QLoRA)",
  },
  {
    area: "LLMOps & Eval",
    items:
      "Langfuse · LangSmith · RAGAS · Eval Harnesses · Tracing · Drift Detection · MLflow",
  },
  {
    area: "Voice AI",
    items:
      "ElevenLabs · Whisper · Deepgram · Twilio · LiveKit · Real-time TTS/STT · Sub-800ms Latency",
  },
  {
    area: "ML / CV",
    items:
      "PyTorch · TensorFlow · Transformers · LSTM · XGBoost · YOLO · OpenCV",
  },
  {
    area: "Cloud / Backend",
    items:
      "AWS · Azure · Docker · Kubernetes · CI/CD · FastAPI · Django · Node.js · Next.js · PostgreSQL · Redis",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-[6vw] pb-32 pt-32 text-white">
      <Scene3D minimal />
      <Reveal>
        <p className="font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
          WHO I AM
        </p>
        <h1 className="mt-2 text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-tighter">
          About Me<span className="text-[#5b5bf0]">.</span>
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <Reveal>
            <p>
              I&apos;m <span className="text-white">Muka Lingam</span> — a
              Senior AI Solution Architect based in Hyderabad, India, with 7+
              years of production-grade experience designing and shipping
              LLM-first, agentic AI systems at enterprise and national scale.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              My path started in mechanical engineering (B.Tech, St.
              Martin&apos;s Engineering College) before moving through data
              science into AI architecture — from predictive maintenance
              models saving $1M+ in operating costs, to national-scale ocean
              modelling for the Ministry of Earth Sciences, to a live
              multi-tenant Voice AI SaaS.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Today I architect stateful multi-agent systems with
              human-in-the-loop gates, engineer RAG pipelines that cut
              hallucination rates, and ship Voice AI at sub-800ms latency —
              always backed by rigorous LLMOps. Based in Hyderabad, India —
              open to relocation to the UAE, Qatar and Australia.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="pt-4">
              <DownloadResume />
            </div>
          </Reveal>
        </div>

        <div className="space-y-10">
          <Reveal>
            <h2 className="mb-4 font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
              RECOGNITION
            </h2>
            <ul className="space-y-3">
              {recognition.map((r) => (
                <li key={r} className="border-l-2 border-[#5b5bf0]/50 pl-4 text-sm text-gray-300">
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="mb-4 font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
              CERTIFICATIONS
            </h2>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="border-l-2 border-white/15 pl-4 text-sm text-gray-400">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mt-28">
        <Reveal>
          <h2 className="mb-12 font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
            CORE EXPERTISE
          </h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e, i) => (
            <Reveal key={e.area} delay={(i % 3) * 0.1} className="h-full">
              <div className="h-full bg-[#0a0a14]/90 p-7 backdrop-blur-md transition hover:bg-[#11112a]/90">
                <h3 className="font-semibold text-white">{e.area}</h3>
                <p className="mt-3 font-mono text-xs leading-relaxed text-gray-500">
                  {e.items}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-28 border-t border-white/5 pt-20">
        <Stats />
      </div>
    </main>
  );
}
