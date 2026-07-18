"use client";

import { useEffect, useRef, useState } from "react";
import { qaPairs, FALLBACK, STARTERS } from "@/lib/qa";

type Msg = { role: "user" | "bot"; text: string };

// Score = keyword hits (weighted) + word overlap with the canonical question.
function answer(query: string): string {
  const q = query.toLowerCase();
  const qWords = new Set(q.split(/\W+/).filter((w) => w.length > 2));
  let best = null as { score: number; a: string } | null;
  for (const pair of qaPairs) {
    let score = 0;
    for (const k of pair.keywords) if (q.includes(k)) score += 3;
    for (const w of pair.q.toLowerCase().split(/\W+/)) {
      if (w.length > 3 && qWords.has(w)) score += 1;
    }
    if (!best || score > best.score) best = { score, a: pair.a };
  }
  return best && best.score >= 3 ? best.a : FALLBACK;
}

const GREETING =
  "Hi — I'm Muka's agent. Ask me anything about his production AI work, iVaak, TruFix, or his experience. I only answer from his verified resume and case studies.";

export default function AskAgent() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: answer(text) }]), 350);
  };

  return (
    <div className="chat">
      <div className="chat-log" ref={logRef} aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>{m.text}</div>
        ))}
      </div>
      {msgs.length === 1 && (
        <div className="chat-chips">
          {STARTERS.map((s) => (
            <button key={s} onClick={() => ask(s)}>{s}</button>
          ))}
        </div>
      )}
      <form
        className="chat-form"
        onSubmit={(e) => { e.preventDefault(); ask(input); }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Muka's work…"
          aria-label="Your question"
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
}
