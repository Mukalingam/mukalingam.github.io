export const site = {
  name: "Muka Lingam",
  fullName: "Utla Mukalingam",
  role: "AI Solution Architect",
  url: "https://mukalingam.in",
  email: "utlamuka@gmail.com",
  github: "https://github.com/Mukalingam",
  linkedin: "https://www.linkedin.com/in/muka-lingam-278526113/",
  medium: "https://medium.com/@utlamuka",
  resume: "/Muka-Resume.pdf",
  oneliner: "I build agentic AI systems that run in production — not in demos.",
};

export const metrics = [
  { num: "2", lbl: "live AI products", live: true },
  { num: "<800ms", lbl: "voice latency (iVaak)" },
  { num: "−35%", lbl: "MTTR in TruFix pilots" },
  { num: "7+ yrs", lbl: "shipping AI systems" },
  { num: "$1M+", lbl: "saved via CV systems" },
];

export const logos = [
  "Microsoft",
  "Qatar Energy",
  "Dr. Reddy's",
  "BEL",
  "Govt. of India",
  "Sembcorp",
];

export const products = [
  {
    name: "iVaak AI",
    url: "https://ivaak.ai",
    tagline: "Multi-tenant Voice AI SaaS for enterprise phone operations.",
    bullets: [
      "Isolated per-tenant LangGraph state machines",
      "RAG knowledge bases per tenant",
      "Real-time human escalation mid-call",
      "Sub-800ms end-to-end voice latency",
    ],
    pipeline: ["Twilio", "Whisper", "LangGraph", "ElevenLabs"],
  },
  {
    name: "TruFix AI",
    url: "https://trufix.ai",
    tagline: "Autonomous ITSM platform where agents own the full ticket lifecycle.",
    bullets: [
      "Agents own tickets end-to-end: triage → resolve → verify",
      "Confidence-threshold routing to humans",
      "−35% MTTR in enterprise pilots",
      "Every release eval-gated (Langfuse + RAGAS)",
    ],
    pipeline: ["Ticket", "Triage agent", "Resolver", "Eval gate"],
  },
];

export const buildSteps = [
  {
    title: "Eval-first",
    body: "No agent ships without a benchmark. Golden datasets and regression evals gate every release.",
    proof: "Langfuse + RAGAS on every deploy",
  },
  {
    title: "Observability by default",
    body: "Every tool call, token, and latency traced from day one — not bolted on after the incident.",
    proof: "Full-trace debugging in production",
  },
  {
    title: "Safety & guardrails",
    body: "Grounded answers only, confidence thresholds, human escalation paths, schema-validated outputs.",
    proof: "Zero-hallucination policy on client systems",
  },
  {
    title: "Cost engineering",
    body: "Caching, batching, and model routing so the economics survive contact with scale.",
    proof: "Cut LLM API spend 30% in production",
  },
  {
    title: "Deterministic tool integration",
    body: "Typed, schema-validated tool calls with confirmation gates for anything irreversible.",
    proof: "MCP connectors across enterprise stacks",
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  featured?: boolean;
  problem: string;
  constraints: string[];
  architecture: string[]; // pipeline nodes for the SVG diagram
  built: string[];
  outcome: string;
  outcomeShort: string; // for homepage card
  stack: string[];
  links?: { label: string; url: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sentinelview",
    client: "CCTV Video Intelligence",
    title: "SentinelView — real-time video intelligence on live CCTV",
    summary:
      "A production video-intelligence platform: multi-camera object tracking, queue and wait-time analytics, heatmaps, and intrusion/loitering alerts — with per-alert-type precision metrics and an operator review loop.",
    featured: true,
    problem:
      "CCTV feeds are watched by nobody. Facilities wanted answers — how long are queues, where do people dwell, who entered a restricted zone — without hiring a wall of operators, and without an alert system that cries wolf.",
    constraints: [
      "Real-time inference on commodity GPUs across many simultaneous streams",
      "Alerts must be trustworthy — every alert type carries its own precision metric",
      "On-prem friendly: no cloud dependency for video frames",
    ],
    architecture: ["RTSP streams", "YOLO26", "ByteTrack", "Analytics engine", "Alerts + review UI"],
    built: [
      "Detection and tracking pipeline: YOLO26 + ByteTrack across multi-camera RTSP ingest",
      "Queue-length, wait-time, and dwell analytics with zone-based heatmaps",
      "Intrusion and loitering alerts with operator confirm/reject feeding a per-type precision dashboard",
      "PyTorch → ONNX → TensorRT optimization pipeline with a published benchmark page",
    ],
    outcome:
      "Live multi-camera analytics with measured per-alert-type precision, and a documented PyTorch→ONNX→TensorRT speedup path. Built as a productized platform, not a demo notebook.",
    outcomeShort: "Per-alert-type precision metrics · TensorRT-optimized real-time inference",
    stack: ["YOLO26", "ByteTrack", "PyTorch", "ONNX", "TensorRT", "FastAPI", "React"],
    links: [
      { label: "GitHub repo", url: "https://github.com/Mukalingam" },
    ],
  },
  {
    slug: "microsoft-ai-copilot",
    client: "Microsoft",
    title: "Enterprise AI Copilot for engineering teams",
    summary:
      "An Azure OpenAI copilot embedded in MS Teams that lets engineering teams drive Azure DevOps — sprints, work items, queries — through schema-validated tool-calling with confirmation gates.",
    problem:
      "Sprint planning and ADO housekeeping consumed engineering hours: creating and updating work items, querying board state, chasing status. Teams live in chat; the tooling didn't.",
    constraints: [
      "Enterprise confidentiality — public-resume-level detail only",
      "Zero tolerance for wrong writes: every mutation needs a confirmation gate",
      "Must live inside MS Teams, not another tab",
    ],
    architecture: ["MS Teams", "Copilot (Azure OpenAI)", "MCP connectors", "Azure DevOps APIs"],
    built: [
      "Azure OpenAI-powered copilot surfaced natively in MS Teams",
      "MCP-based connectors to Azure DevOps APIs",
      "Schema-validated tool-calling: typed inputs, validated outputs",
      "Confirmation gates on every irreversible action (create/update/close)",
    ],
    outcome:
      "Manual ADO overhead cut significantly; sprint planning moved from tab-hopping to conversation. Adopted in day-to-day team workflows.",
    outcomeShort: "Manual ADO overhead cut · faster sprint planning",
    stack: ["Azure OpenAI", "MS Teams", "Azure DevOps", "MCP", "Tool calling"],
  },
  {
    slug: "qconnect-qatar-energy",
    client: "Qatar Energy",
    title: "QConnect — multilingual RAG over port operations",
    summary:
      "A multilingual RAG assistant over hundreds of pages of port-operations manuals, with AI-generated assessments and presence verification — delivered through a formal executive pilot handover.",
    problem:
      "Port operations knowledge lived in hundreds of pages of dense manuals. Finding one procedure meant manual searches; onboarding and compliance checks were slow and inconsistent across languages.",
    constraints: [
      "Multilingual: operators query in their own language",
      "Answers must be grounded in the official manuals — no improvisation",
      "Government/enterprise delivery: formal pilot with executive handover",
    ],
    architecture: ["Operations manuals", "Ingestion + chunking", "Multilingual RAG", "Assessments", "Presence verification"],
    built: [
      "Document ingestion and retrieval pipeline over the full manual corpus",
      "Multilingual question-answering grounded in source passages",
      "AI-generated assessments to verify operator comprehension",
      "Presence verification integrated into the training workflow",
    ],
    outcome:
      "Answers in seconds versus manual searches through hundreds of pages. Completed as a formal executive pilot handover.",
    outcomeShort: "Seconds vs. manual searches through hundreds of pages",
    stack: ["RAG", "Multilingual LLM", "Vector search", "FastAPI", "React"],
  },
  {
    slug: "dr-reddys-document-intelligence",
    client: "Dr. Reddy's",
    title: "Pharma regulatory document intelligence",
    summary:
      "Grounded, citation-backed RAG over regulatory documentation — designed groundedness-first, because in pharma compliance a plausible-sounding wrong answer is worse than no answer.",
    problem:
      "Regulatory teams navigate vast, versioned documentation where errors carry compliance risk. Generic chatbots hallucinate; pharma cannot.",
    constraints: [
      "Every answer must cite its source passage — verifiable by a human reviewer",
      "Groundedness prioritized over coverage: refuse rather than guess",
      "Enterprise data boundaries respected end-to-end",
    ],
    architecture: ["Regulatory docs", "Chunking + embeddings", "Grounded RAG", "Citations", "Reviewer"],
    built: [
      "Citation-backed retrieval: every claim traceable to a source passage",
      "Groundedness-first prompt and refusal design for compliance contexts",
      "Evaluation harness measuring groundedness before release",
    ],
    outcome:
      "A document-intelligence system regulatory teams can actually trust: answers arrive with citations, and the system refuses rather than hallucinates.",
    outcomeShort: "Citation-backed answers · groundedness-first for compliance",
    stack: ["RAG", "Embeddings", "Citation grounding", "Evals", "Python"],
  },
  {
    slug: "industrial-vision",
    client: "BEL · Sembcorp · INCOIS",
    title: "Industrial vision in production",
    summary:
      "Three computer-vision systems running on real production infrastructure: RF-DETR bolt inspection on live assembly lines (BEL), automated gauge monitoring ($1M+ saved, Sembcorp), and hazardous marine species detection (INCOIS).",
    problem:
      "Manual visual inspection doesn't scale: missed bolt defects on production lines, human gauge-reading rounds costing hundreds of labor hours, and marine hazards that need constant watching.",
    constraints: [
      "Live production-line cameras — inference can't lag the line",
      "Industrial environments: glare, vibration, weather",
      "Measurable ROI required to survive procurement",
    ],
    architecture: ["Line cameras", "RF-DETR / YOLO", "OpenCV post-processing", "Alerts + dashboards"],
    built: [
      "BEL: RF-DETR bolt/connector inspection running on live production-line cameras",
      "Sembcorp: YOLO + OpenCV automated gauge monitoring replacing manual reading rounds",
      "INCOIS: hazardous marine species detection for coastal monitoring",
    ],
    outcome:
      "Sembcorp gauge monitoring alone saved 900+ labor hours and generated US$1M+ in value. BEL inspection runs on live lines; INCOIS detection supports govt. coastal operations.",
    outcomeShort: "$1M+ saved · 900+ labor hours recovered",
    stack: ["RF-DETR", "YOLO", "OpenCV", "PyTorch", "Edge deployment"],
  },
];

export const earlierWork = [
  { title: "Ocean current prediction — INCOIS/MOES", line: "Transformer-based model, 85% accuracy, officially recognized by INCOIS/MOES." },
  { title: "Load forecasting — Haryana Govt (HERC)", line: "Multi-region electricity demand forecasting with ARIMA/LSTM/Prophet ensembles." },
  { title: "Ninadata — AdTech NLP platform", line: "LLM-driven ad intelligence: +20% targeted engagement, +25% ad relevance." },
  { title: "Enterprise agent ecosystems — LowCode Labs", line: "RAG + Voice AI + WhatsApp agents serving 500+ users; $15K+ cloud cost savings." },
];

export const speaking = [
  { pre: "Empanelled Faculty", rest: " — Boston Institute of Analytics (GenAI & Agentic AI)" },
  { pre: "Speaker", rest: " — East Coast Maritime & Logistics Summit 2025" },
  { pre: "'Super Scientist' award", rest: " — Spotflock" },
];

// Fallback if Medium RSS is unreachable at build time
export const fallbackPosts = [
  {
    title: "Claude Opus 4.6 & Cowork: The AI That Codes While You Sleep",
    url: "https://medium.com/@utlamuka/claude-opus-4-6-cowork-the-ai-that-codes-while-you-sleep-and-does-everything-else-too-3b0fd8ae182c",
    date: "2026-02-06",
  },
  {
    title: "Model Context Protocol (MCP): The Universal Connector for AI Systems",
    url: "https://medium.com/@utlamuka/model-context-protocol-mcp-the-universal-connector-for-ai-systems-baa2f19c0787",
    date: "2025-04-25",
  },
  {
    title: "Building the Future of Virtual Try-On: How Appify AI Is Shaping Fashion Tech",
    url: "https://medium.com/@utlamuka/building-the-future-of-virtual-try-on-how-appify-ai-is-shaping-the-next-era-of-fashion-tech-049671e10d4d",
    date: "2025-01-15",
  },
  {
    title: "From Data to Insights: Mastering Advanced RAG with GPT-4o and LangChain",
    url: "https://medium.com/@utlamuka/from-data-to-insights-mastering-advanced-retrieval-augmented-generation-with-gpt-4o-and-langchain-0759f6aaec1a",
    date: "2024-11-20",
  },
];
