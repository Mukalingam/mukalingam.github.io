import { useState, useRef, useEffect } from "react";
import { MdClose, MdSend } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import "./styles/AIChatbot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const knowledge = {
  name: "Muka Lingam",
  title: "AI Solution Architect",
  email: "utlamuka@gmail.com",
  experience: "7+ years",
  current: "AI Solution Architect at IICL",
  education: "B.Tech, Mechanical Engineering — St. Martins Engineering College",
  about:
    "Senior AI Engineer & AI Solution Architect with 7+ years deploying production-grade AI across enterprise, government, and startup environments. Deep expertise in LLMs, Agentic AI, RAG pipelines, Voice AI systems, and Computer Vision. Founder of AI Universee — a unified multi-modal AI platform. Expert in AI Agent orchestration, Model Context Protocol (MCP), pgvector, and real-time conversational AI. Invited speaker at the East Coast Maritime & Logistics Summit 2025, presenting AI innovations to government officials including the Chief Minister of Andhra Pradesh.",
  skillsText:
    "**AI/LLM:** LangChain, GPT-4, Claude, Gemini, ElevenLabs, RAG, MCP, AI Agents\n\n**MLOps & Cloud:** AWS SageMaker, Docker, Kubernetes, FastAPI, PostgreSQL, GCP\n\n**Deep Learning:** PyTorch, TensorFlow, YOLO, OpenCV\n\n**Time Series:** ARIMA, LSTM, Prophet",
  projectList: [
    { name: "AI Universee", desc: "Multi-Modal AI Platform (Founder) — GPT-4, Claude, Gemini, DALL-E, Midjourney, FastAPI, React. A unified platform bringing together multiple AI models." },
    { name: "TubeQuiz AI", desc: "AI Video Learning Platform (Founder) — RAG, GPT-4, Computer Vision, pgvector." },
    { name: "Real-Time AI Voice Agent", desc: "ElevenLabs Conversational AI, WebSocket, FastAPI — voice cloning & persona management." },
    { name: "WhatsApp AI Agent", desc: "Enterprise chatbot — WhatsApp Business API, GPT-4, RAG, Mendix." },
    { name: "AI Interview System", desc: "LLM-powered hiring — GPT-4, Claude, NLP, Sentiment Analysis." },
    { name: "MedGemma Healthcare AI", desc: "MedGemma 4B, RAG, Medical Knowledge Graphs, AWS EC2." },
    { name: "Ninadata AdTech", desc: "NLP/LLM/GenAI AdTech — 20% ad engagement increase, 25% relevance improvement." },
    { name: "Automated Gauge Monitor", desc: "Computer Vision for Sembcorp — YOLO, OpenCV, PyTorch — saved 900+ hours, US$1M+." },
    { name: "Ocean Current Prediction", desc: "Deep Learning for INCOIS govt — Transformers, LSTM — 85% accuracy." },
    { name: "Load Forecasting", desc: "Time Series for Haryana Govt — ARIMA, LSTM, Prophet." },
  ],
  careerText:
    "**2019** — Data Scientist at Innodatatics Inc.: 30% reduction in downtime via predictive maintenance.\n\n**2021** — Senior Data Scientist at Spotflock Technologies: Ocean current prediction (85% accuracy), Gauge Monitoring (US$1M+ savings).\n\n**2023–2025** — Lead AI Engineer at The Audience Street Inc.: Built Ninadata AdTech, intelligent model routing system.\n\n**April 2025** — Lead AI Engineer at LowCode Labs: Enterprise AI agent ecosystems, 500+ users, $15K+ cloud savings.\n\n**Present** — AI Solution Architect at IICL: End-to-end AI solutions, 20–30% business transformation.",
  blogs: ["Claude Opus 4.6 & Cowork", "Model Context Protocol (MCP)", "Virtual Try-On Fashion Tech", "Advanced RAG with GPT-4o & LangChain", "AI-Based Profanity Checks"],
  contactText: "**Email:** utlamuka@gmail.com\n**LinkedIn:** linkedin.com/in/muka-lingam-278526113\n**GitHub:** github.com/Mukalingam\n**Medium:** medium.com/@utlamuka",
};

type Rule = { keys: string[]; response: string | (() => string) };

const rules: Rule[] = [
  // Greetings
  {
    keys: ["hi", "hello", "hey", "hola", "howdy", "yo", "sup", "what's up", "wassup", "good morning", "good evening"],
    response: `Hey there! 👋 I'm Muka's AI assistant. Ask me anything about his **experience**, **projects**, **skills**, **career**, or **blogs**!`,
  },
  // How are you / conversational
  {
    keys: ["how are you", "how r u", "how do you do", "what's going on", "how's it going"],
    response: `I'm doing great, thanks for asking! 😊 I'm here to tell you all about Muka Lingam. What would you like to know — his **skills**, **projects**, or **career**?`,
  },
  // About / Who
  {
    keys: ["who is muka", "who are you", "about muka", "tell me about", "about him", "introduce", "who is he", "about yourself", "what does muka do"],
    response: knowledge.about,
  },
  // Skills / Tech
  {
    keys: ["skill", "tech stack", "tools", "technologies", "expertise", "proficiency", "what can he do", "know", "capable"],
    response: () => `Muka's core tech stack:\n\n${knowledge.skillsText}`,
  },
  // Projects / Work
  {
    keys: ["project", "work", "portfolio", "built", "created", "made", "developed", "what has he built"],
    response: () => {
      const list = knowledge.projectList.map((p, i) => `${i + 1}. **${p.name}** — ${p.desc}`).join("\n\n");
      return `Here are Muka's 10 key projects:\n\n${list}\n\nAsk about any specific project for more details!`;
    },
  },
  // Career / Experience
  {
    keys: ["career", "experience", "timeline", "journey", "history", "companies", "worked", "job", "employment", "resume", "cv"],
    response: () => `Muka's career journey:\n\n${knowledge.careerText}`,
  },
  // Current role
  {
    keys: ["current", "now", "present", "where does he work", "currently", "today"],
    response: `Muka is currently working as an **AI Solution Architect at IICL**, architecting end-to-end AI solutions driving 20–30% business transformation across enterprises.`,
  },
  // Blogs
  {
    keys: ["blog", "article", "write", "medium", "publish", "post", "read"],
    response: () => {
      const list = knowledge.blogs.map((b, i) => `${i + 1}. ${b}`).join("\n");
      return `Muka's technical articles on Medium:\n\n${list}\n\nVisit **medium.com/@utlamuka** to read them!`;
    },
  },
  // Contact
  {
    keys: ["contact", "email", "reach", "hire", "connect", "get in touch", "phone", "call"],
    response: () => `You can reach Muka at:\n\n${knowledge.contactText}`,
  },
  // Education
  {
    keys: ["education", "degree", "college", "university", "study", "school", "qualification"],
    response: `Muka holds a **${knowledge.education}**.`,
  },
  // Name
  {
    keys: ["name", "full name"],
    response: `His name is **${knowledge.name}**. He's an ${knowledge.title} with ${knowledge.experience} of experience.`,
  },
  // AI Universee
  {
    keys: ["universee", "ai universee", "multi-modal"],
    response: `**AI Universee** is Muka's flagship project — a unified Multi-Modal AI Platform built with GPT-4, Claude, Gemini, DALL-E, Midjourney, Stable Diffusion, Runway ML, FastAPI, and React. He founded this platform to bring multiple AI models under one roof.`,
  },
  // Voice AI
  {
    keys: ["voice", "elevenlabs", "voice agent", "voice ai", "voice cloning"],
    response: `Muka built a **Real-Time AI Voice Agent** using ElevenLabs Conversational AI with WebSocket, FastAPI, and React. It features voice cloning & persona management for real-time conversations.`,
  },
  // WhatsApp
  {
    keys: ["whatsapp", "whatsapp agent"],
    response: `The **WhatsApp AI Agent** is an enterprise chatbot on the Mendix Platform — WhatsApp Business API, GPT-4, RAG Systems, and PostgreSQL with custom React widgets.`,
  },
  // Healthcare
  {
    keys: ["health", "medical", "medgemma", "healthcare", "mediconnect"],
    response: `**MedGemma Healthcare AI** (MediConnect) uses MedGemma 4B with RAG, Medical Knowledge Graphs, deployed on AWS EC2 with SSL/TLS. Built to provide AI-driven medical insights.`,
  },
  // RAG
  {
    keys: ["rag", "retrieval", "langchain", "vector", "pgvector", "embedding"],
    response: `Muka is an expert in **RAG (Retrieval-Augmented Generation)** systems. He's built multiple RAG pipelines using pgvector, LangChain, and GPT-4o. He also wrote: "From Data to Insights: Mastering Advanced RAG with GPT-4o and LangChain."`,
  },
  // MCP
  {
    keys: ["mcp", "model context protocol", "protocol"],
    response: `Muka is an expert in **Model Context Protocol (MCP)** — the universal connector for AI systems. He uses it in production for AI agent orchestration and wrote a widely-read article on it.`,
  },
  // Computer Vision
  {
    keys: ["computer vision", "yolo", "opencv", "gauge", "object detection", "image"],
    response: `Muka built the **Automated Gauge Monitor** for Sembcorp using YOLO, OpenCV, PyTorch & AWS — saving 900+ labor hours, 47% efficiency improvement, and US$1M+ in savings.`,
  },
  // Ocean / INCOIS
  {
    keys: ["ocean", "incois", "current prediction", "marine"],
    response: `The **Ocean Current Prediction** project was for INCOIS/MOES (Indian govt). Muka used Transformers + LSTM to achieve 85% accuracy — officially recognized by INCOIS/MOES.`,
  },
  // Speaking / Summit
  {
    keys: ["speak", "summit", "conference", "talk", "presentation", "chief minister"],
    response: `Muka was an invited speaker at the **East Coast Maritime & Logistics Summit 2025**, presenting AI innovations to government officials including the Chief Minister of Andhra Pradesh.`,
  },
  // Interview system
  {
    keys: ["interview", "hiring", "recruitment"],
    response: `Muka built an **AI Interview System** — an LLM-powered hiring platform using GPT-4, Claude, NLP, and Sentiment Analysis with both voice & text interview capabilities.`,
  },
  // AdTech / Ninadata
  {
    keys: ["adtech", "ninadata", "advertising", "ad", "bert"],
    response: `**Ninadata AdTech Platform** — Built using LLMs, NLP, BERT, and GenAI. Achieved 20% increase in targeted ad engagement and 25% ad relevance improvement.`,
  },
  // Load Forecasting
  {
    keys: ["load", "forecasting", "haryana", "electricity", "time series", "arima", "prophet"],
    response: `**Load Forecasting** for Haryana Govt — Multi-region electricity forecasting using ARIMA, LSTM, Prophet, and Ensemble Models in Python.`,
  },
  // Age / Years of experience
  {
    keys: ["how many years", "how long", "since when"],
    response: `Muka has **${knowledge.experience}** of experience in AI/ML, starting from 2019 as a Data Scientist and growing to his current role as AI Solution Architect.`,
  },
  // Thank you
  {
    keys: ["thank", "thanks", "appreciated", "great", "awesome", "cool", "nice"],
    response: `You're welcome! 😊 Feel free to ask anything else about Muka's work, or check out his projects and blogs on the site!`,
  },
  // Bye
  {
    keys: ["bye", "goodbye", "see you", "later", "cya"],
    response: `Goodbye! 👋 Feel free to come back anytime. Don't forget to check out Muka's projects and connect with him on LinkedIn!`,
  },
];

function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Try exact phrase matches first, then keyword matches
  for (const rule of rules) {
    for (const key of rule.keys) {
      if (q.includes(key)) {
        return typeof rule.response === "function" ? rule.response() : rule.response;
      }
    }
  }

  // Check for individual project names
  for (const project of knowledge.projectList) {
    if (q.includes(project.name.toLowerCase())) {
      return `**${project.name}:** ${project.desc}`;
    }
  }

  // Smart fallback — try to match any single word against rule keys
  const words = q.split(/\s+/);
  for (const rule of rules) {
    for (const key of rule.keys) {
      if (words.some((w) => w.length > 3 && key.includes(w))) {
        return typeof rule.response === "function" ? rule.response() : rule.response;
      }
    }
  }

  return `Great question! Here's what I can tell you about Muka:\n\n• **"skills"** — His tech stack & expertise\n• **"projects"** — 10 production AI projects\n• **"career"** — Full work history\n• **"blogs"** — Published articles\n• **"contact"** — How to reach him\n• **"about"** — His background\n\nOr ask something specific like "Tell me about Voice AI" or "What is MCP?"`;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Muka's AI assistant 🤖 Ask me anything about his experience, projects, skills, or career!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 500 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => {
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/• /g, "&#8226; ");
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      <button
        className={`chatbot-toggle ${isOpen ? "chatbot-toggle-active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        data-cursor="disable"
        aria-label="Toggle AI chatbot"
      >
        {isOpen ? <MdClose /> : <RiRobot2Fill />}
        {!isOpen && <span className="chatbot-pulse" />}
      </button>

      <div className={`chatbot-panel ${isOpen ? "chatbot-panel-open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <RiRobot2Fill className="chatbot-header-icon" />
            <div>
              <h4>Muka's AI Assistant</h4>
              <span>Ask me anything about Muka</span>
            </div>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
              <div className={`chatbot-bubble chatbot-bubble-${msg.role}`}>
                {formatMessage(msg.content)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-msg chatbot-msg-assistant">
              <div className="chatbot-bubble chatbot-bubble-assistant chatbot-typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Ask about skills, projects, career..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            data-cursor="disable"
          />
          <button
            className="chatbot-send"
            onClick={sendMessage}
            disabled={!input.trim()}
            data-cursor="disable"
          >
            <MdSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
