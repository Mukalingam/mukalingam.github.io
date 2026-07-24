"use client";

import { useEffect, useState } from "react";

const LINES = [
  "$ muka --init",
  "→ booting LangGraph runtime…",
  "✓ multi-agent orchestration: ready",
  "✓ 12 flagship projects deployed",
  "✓ RAG precision: +40%",
  "✓ voice pipeline: <800ms latency",
  "✓ 500+ concurrent users @ 99.5% uptime",
  "→ status: open to UAE · Qatar · Australia",
  "$ ready.",
];

export default function AgentTerminal() {
  const [typed, setTyped] = useState<string[]>([]);

  useEffect(() => {
    let line = 0;
    let char = 0;
    let out: string[] = [];
    const id = setInterval(() => {
      if (line >= LINES.length) {
        clearInterval(id);
        return;
      }
      char++;
      out = [...out.slice(0, line), LINES[line].slice(0, char)];
      setTyped(out);
      if (char >= LINES[line].length) {
        line++;
        char = 0;
      }
    }, 28);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0d1a]/90 font-mono text-sm shadow-[0_0_60px_-20px_#5b5bf0] backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#e33]" />
        <span className="h-3 w-3 rounded-full bg-[#ee0]" />
        <span className="h-3 w-3 rounded-full bg-[#0b0]" />
        <span className="ml-3 text-xs text-gray-500">muka@agent: ~</span>
      </div>
      <div className="min-h-[16rem] space-y-2 p-5">
        {typed.map((l, i) => (
          <p
            key={i}
            className={
              l.startsWith("✓")
                ? "text-[#23ae23]"
                : l.startsWith("$")
                  ? "text-white"
                  : "text-[#8888f5]"
            }
          >
            {l}
            {i === typed.length - 1 && (
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#23ae23] align-middle" />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
