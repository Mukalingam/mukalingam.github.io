"use client";

import { useEffect, useState } from "react";

const LINES = [
  `principle = "Agents you can't measure are agents you can't trust."`,
  `deploy_rule = "Eval-gated releases only. No vibes-based shipping."`,
  `latency_budget = "Voice replies in under 800ms, or it isn't a conversation."`,
];

export default function Terminal() {
  const [text, setText] = useState(LINES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let line = 0, char = 0, deleting = false;
    const tick = () => {
      const full = LINES[line];
      if (!deleting) {
        char++;
        if (char >= full.length) { deleting = true; return schedule(2600); }
      } else {
        char -= 3;
        if (char <= 0) { char = 0; deleting = false; line = (line + 1) % LINES.length; }
      }
      setText(LINES[line].slice(0, Math.max(char, 0)));
      schedule(deleting ? 18 : 34);
    };
    let t: ReturnType<typeof setTimeout>;
    const schedule = (ms: number) => { t = setTimeout(tick, ms); };
    schedule(600);
    return () => clearTimeout(t);
  }, []);

  const eq = text.indexOf("=");
  const key = eq > 0 ? text.slice(0, eq) : text;
  const rest = eq > 0 ? text.slice(eq) : "";

  return (
    <div className="terminal" aria-label="Engineering principles">
      <div className="terminal-head" aria-hidden="true"><i /><i /><i /></div>
      <div className="t-comment"># how_i_ship.py</div>
      <div>
        <span className="t-key">{key}</span>
        <span className="t-str">{rest}</span>
        <span className="caret" aria-hidden="true" />
      </div>
    </div>
  );
}
