// Curated Q&A knowledge base for /ask fallback mode (spec §7b).
// Grounded only in resume + case studies. Muka reviews this file before launch.
export type QA = { keywords: string[]; q: string; a: string };

export const FALLBACK =
  "I don't have that in my knowledge base — I only answer from Muka's verified resume and case studies, and I don't guess. Email him directly at utlamuka@gmail.com or reach out on LinkedIn (linkedin.com/in/muka-lingam-278526113).";

export const STARTERS = [
  "What has Muka shipped in production?",
  "Tell me about iVaak's architecture",
  "Is Muka open to relocation?",
  "Walk me through his eval practice",
];

export const qaPairs: QA[] = [
  {
    keywords: ["shipped", "production", "built", "portfolio", "projects", "work", "done"],
    q: "What has Muka shipped in production?",
    a: "Two live products and five enterprise systems:\n\n• iVaak AI (ivaak.ai) — multi-tenant Voice AI SaaS, sub-800ms latency\n• TruFix AI (trufix.ai) — autonomous ITSM, −35% MTTR in pilots\n• Enterprise AI Copilot for Microsoft (Azure OpenAI + MCP + Azure DevOps)\n• QConnect for Qatar Energy — multilingual RAG over port-operations manuals\n• SentinelView — real-time CCTV video intelligence (YOLO26 + ByteTrack + TensorRT)\n• Regulatory document intelligence for Dr. Reddy's — citation-backed RAG\n• Industrial vision for BEL and Sembcorp — $1M+ saved, 900+ labor hours recovered",
  },
  {
    keywords: ["ivaak", "voice", "architecture", "latency", "call"],
    q: "Tell me about iVaak's architecture",
    a: "iVaak AI is a multi-tenant Voice AI SaaS. The voice pipeline is Twilio → Whisper (STT) → LangGraph agent → ElevenLabs (TTS), tuned to sub-800ms end-to-end latency. Each tenant gets an isolated LangGraph state machine and its own RAG knowledge base, with real-time human escalation mid-call. It's live at ivaak.ai with enterprise clients.",
  },
  {
    keywords: ["trufix", "itsm", "ticket", "mttr", "helpdesk", "servicedesk"],
    q: "What is TruFix AI?",
    a: "TruFix AI (trufix.ai) is an autonomous ITSM platform where AI agents own the full ticket lifecycle — triage, resolution, verification. Low-confidence cases route to humans via confidence thresholds. It delivered −35% MTTR in enterprise pilots, and every release is eval-gated with Langfuse + RAGAS.",
  },
  {
    keywords: ["relocation", "relocate", "location", "remote", "based", "hyderabad", "gcc", "move", "abroad", "visa"],
    q: "Is Muka open to relocation?",
    a: "Muka is based in Hyderabad, India, and is open to global roles — GCC region and remote-first positions included. For specifics on timing and logistics, email utlamuka@gmail.com.",
  },
  {
    keywords: ["eval", "evaluation", "test", "benchmark", "ragas", "langfuse", "quality", "measure"],
    q: "Walk me through his eval practice",
    a: "Eval-first is the core of how Muka ships:\n\n• Golden datasets and regression evals gate every release — no eval pass, no deploy\n• Langfuse for tracing + RAGAS for RAG quality on iVaak and TruFix\n• Groundedness metrics for compliance-critical RAG (Dr. Reddy's)\n• Per-alert-type precision tracking with operator feedback loops (SentinelView)\n\nHis principle: \"Agents you can't measure are agents you can't trust.\"",
  },
  {
    keywords: ["experience", "years", "career", "background", "history", "journey"],
    q: "What's Muka's experience?",
    a: "7+ years shipping AI systems:\n\n• Now — AI Solution Architect at IICL; founder of iVaak AI and TruFix AI\n• 2025 — Lead AI Engineer, LowCode Labs: agent ecosystems serving 500+ users\n• 2023–25 — Lead AI Engineer, The Audience Street: LLM AdTech platform\n• 2021 — Senior Data Scientist, Spotflock: INCOIS ocean models, Sembcorp gauge monitoring ($1M+ saved)\n• 2019 — Data Scientist, Innodatatics: predictive maintenance (−30% downtime)",
  },
  {
    keywords: ["microsoft", "copilot", "azure", "devops", "teams", "ado"],
    q: "What did Muka build for Microsoft?",
    a: "An enterprise AI copilot embedded in MS Teams: Azure OpenAI powering schema-validated tool-calling into Azure DevOps via MCP-based connectors, with confirmation gates on every irreversible action. It cut manual ADO overhead and sped up sprint planning. (Details limited to what's public on his resume.)",
  },
  {
    keywords: ["qatar", "qconnect", "port", "energy", "multilingual"],
    q: "What was the Qatar Energy project?",
    a: "QConnect — a multilingual RAG assistant over hundreds of pages of port-operations manuals for Qatar Energy, with AI-generated assessments and presence verification. Result: answers in seconds instead of manual searches, delivered through a formal executive pilot handover.",
  },
  {
    keywords: ["sentinelview", "cctv", "video", "camera", "yolo", "tracking", "surveillance"],
    q: "Tell me about SentinelView",
    a: "SentinelView is Muka's newest build — a real-time CCTV video-intelligence platform: YOLO26 + ByteTrack for multi-camera detection and tracking, queue/wait-time analytics, heatmaps, and intrusion/loitering alerts. Every alert type carries its own precision metric with an operator review loop, and the inference stack is optimized PyTorch → ONNX → TensorRT with a published benchmark page.",
  },
  {
    keywords: ["reddy", "pharma", "regulatory", "compliance", "citation", "document"],
    q: "What was the Dr. Reddy's project?",
    a: "Regulatory document intelligence for Dr. Reddy's: citation-backed RAG where every answer traces to a source passage, designed groundedness-first — the system refuses rather than guesses, because in pharma compliance a plausible wrong answer is worse than none.",
  },
  {
    keywords: ["vision", "bel", "sembcorp", "gauge", "bolt", "industrial", "inspection", "incois", "marine"],
    q: "What computer vision work has Muka done?",
    a: "Three production CV systems:\n\n• BEL — RF-DETR bolt/connector inspection on live production-line cameras\n• Sembcorp — YOLO + OpenCV automated gauge monitoring: 900+ labor hours saved, US$1M+ generated\n• INCOIS — hazardous marine species detection for coastal monitoring\n\nPlus SentinelView, the CCTV video-intelligence platform.",
  },
  {
    keywords: ["stack", "skills", "technologies", "tools", "tech", "languages", "framework"],
    q: "What's Muka's tech stack?",
    a: "Agentic AI: LangGraph, LangChain, MCP, OpenAI/Claude/Gemini, ElevenLabs, Whisper\nRAG: pgvector, embeddings, citation grounding, RAGAS\nCV: YOLO, RF-DETR, ByteTrack, OpenCV, PyTorch → ONNX → TensorRT\nInfra: FastAPI, PostgreSQL, Docker, Kubernetes, AWS, GCP\nObservability: Langfuse, full-trace debugging, eval pipelines",
  },
  {
    keywords: ["mcp", "model context protocol", "connector"],
    q: "Does Muka work with MCP?",
    a: "Yes — Muka built MCP-based connectors for the Microsoft copilot (Azure DevOps integration) and has written about it: \"Model Context Protocol (MCP): The Universal Connector for AI Systems\" on Medium (@utlamuka). He also mentored engineers on MCP at LowCode Labs.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "touch"],
    q: "How do I contact Muka?",
    a: "Email: utlamuka@gmail.com\nLinkedIn: linkedin.com/in/muka-lingam-278526113\nGitHub: github.com/Mukalingam\nMedium: medium.com/@utlamuka\n\nResume: the Download Resume button on this site.",
  },
  {
    keywords: ["speaking", "faculty", "teaching", "summit", "award", "conference"],
    q: "Does Muka speak or teach?",
    a: "Yes:\n\n• Empanelled Faculty — Boston Institute of Analytics (GenAI & Agentic AI)\n• Speaker — East Coast Maritime & Logistics Summit 2025, presenting AI innovations to government officials\n• 'Super Scientist' award — Spotflock",
  },
  {
    keywords: ["cost", "spend", "optimize", "cheap", "budget", "savings"],
    q: "How does Muka handle LLM costs?",
    a: "Cost engineering is one of his five build principles: caching, batching, and model routing cut LLM API spend 30% in production. Earlier, Kubernetes optimization saved clients $15,000+ in cloud costs. The economics have to survive scale, or the system doesn't ship.",
  },
  {
    keywords: ["agent", "agentic", "autonomous", "multi-agent", "orchestration"],
    q: "What agentic AI experience does Muka have?",
    a: "Agentic AI is his core specialty: iVaak runs isolated per-tenant LangGraph state machines; TruFix agents own full ticket lifecycles with confidence-threshold human routing; the Microsoft copilot does schema-validated tool-calling with confirmation gates. All of it eval-gated and traced in production.",
  },
  {
    keywords: ["safety", "guardrail", "hallucination", "grounded", "trust", "reliable"],
    q: "How does Muka handle AI safety and hallucinations?",
    a: "Guardrails are built in, not bolted on: grounded answers only (citation-backed for compliance work), confidence thresholds with human escalation, schema-validated outputs, and confirmation gates on irreversible actions. This very agent follows the same policy — it refuses rather than guesses.",
  },
  {
    keywords: ["voice ai", "elevenlabs", "whisper", "twilio", "conversational", "speech"],
    q: "What voice AI experience does Muka have?",
    a: "He founded iVaak AI, a multi-tenant Voice AI SaaS: Twilio → Whisper → LangGraph → ElevenLabs at sub-800ms latency, with per-tenant RAG and mid-call human escalation. Earlier he built ElevenLabs-based voice agents and WhatsApp AI agents at LowCode Labs serving 500+ users.",
  },
  {
    keywords: ["rag", "retrieval", "vector", "pgvector", "knowledge base", "embedding"],
    q: "What RAG systems has Muka built?",
    a: "Production RAG across domains: per-tenant knowledge bases in iVaak, multilingual RAG for Qatar Energy's port manuals, citation-backed compliance RAG for Dr. Reddy's, and RAGAS-evaluated pipelines gating TruFix releases. Also wrote \"Mastering Advanced RAG with GPT-4o and LangChain\" on Medium.",
  },
  {
    keywords: ["education", "degree", "college", "study", "btech"],
    q: "What's Muka's education?",
    a: "B.Tech in Mechanical Engineering, St. Martin's Engineering College — plus 7+ years of production AI engineering and current empanelled-faculty work at Boston Institute of Analytics teaching GenAI & Agentic AI.",
  },
  {
    keywords: ["writing", "medium", "blog", "articles", "posts"],
    q: "Where does Muka write?",
    a: "On Medium at medium.com/@utlamuka — recent posts cover Claude Opus & agentic coding, Model Context Protocol (MCP), advanced RAG with GPT-4o and LangChain, and AI fashion tech. The Writing section on the homepage lists the latest four.",
  },
  {
    keywords: ["available", "availability", "open", "roles", "opportunities", "job", "hiring", "freelance", "consulting"],
    q: "Is Muka open to new roles?",
    a: "Yes — open to AI architecture roles, advisory, and hard agentic-AI problems (GCC / remote / global). He's currently AI Solution Architect at IICL and building ivaak.ai. Best first step: email utlamuka@gmail.com with a short note about the problem you're solving.",
  },
  {
    keywords: ["government", "incois", "herc", "haryana", "public sector", "govt"],
    q: "Has Muka worked with government?",
    a: "Yes — Govt. of India projects: INCOIS/MOES ocean-current prediction (85% accuracy, officially recognized), hazardous marine species detection, and multi-region electricity load forecasting for Haryana (HERC). Plus Qatar Energy on the international side, with a formal executive pilot handover.",
  },
  {
    keywords: ["this agent", "chatbot", "how do you work", "are you ai", "what are you", "llm", "who are you"],
    q: "How does this agent work?",
    a: "I'm the curated version of Muka's agent: I match your question against a reviewed knowledge base built from his resume and case studies — grounded, eval-tested, and I refuse to hallucinate, like everything Muka ships. If I don't know, I say so and point you to utlamuka@gmail.com.",
  },
  {
    keywords: ["strength", "different", "why hire", "unique", "standout", "value"],
    q: "What makes Muka different?",
    a: "He runs what he preaches: two live AI products with real enterprise clients, not demo repos. Every claim on this site is a measured number — sub-800ms voice latency, −35% MTTR, $1M+ CV savings — and every release is eval-gated. Production evidence over promises.",
  },
];
