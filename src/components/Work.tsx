import { useState } from "react";
import "./styles/Work.css";
import { MdArrowOutward, MdClose } from "react-icons/md";

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const projects = [
  {
    title: "AI Universee",
    category: "Multi-Modal AI Platform — Founder",
    tools: "GPT-4, Claude, Gemini, DALL-E, Midjourney, Stable Diffusion, Runway ML, FastAPI, React",
    color: "#a855f7",
    tags: ["GPT-4", "Claude", "Gemini", "DALL-E", "FastAPI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    size: "large",
  },
  {
    title: "TubeQuiz AI",
    category: "AI Video Learning Platform — Founder",
    tools: "RAG Systems, GPT-4, Computer Vision, Video Processing, PostgreSQL, pgvector, React",
    color: "#3b82f6",
    tags: ["RAG", "GPT-4", "pgvector"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    size: "medium",
  },
  {
    title: "Real-Time AI Voice Agent",
    category: "Conversational Voice AI",
    tools: "ElevenLabs Conversational AI, WebSocket, FastAPI, React, PostgreSQL — voice cloning & persona management",
    color: "#ec4899",
    tags: ["ElevenLabs", "Voice AI", "WebSocket"],
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop",
    size: "medium",
  },
  {
    title: "WhatsApp AI Agent",
    category: "Enterprise Chatbot — Mendix Platform",
    tools: "WhatsApp Business API, GPT-4, RAG Systems, PostgreSQL, Mendix, Custom React Widgets",
    color: "#22c55e",
    tags: ["WhatsApp API", "GPT-4", "RAG"],
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop",
    size: "small",
  },
  {
    title: "AI Interview System",
    category: "LLM-Powered Hiring Platform",
    tools: "GPT-4, Claude, NLP, Sentiment Analysis, React, FastAPI, PostgreSQL — voice & text interviews",
    color: "#f59e0b",
    tags: ["GPT-4", "Claude", "NLP"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
    size: "small",
  },
  {
    title: "MedGemma Healthcare AI",
    category: "Healthcare AI — MediConnect Platform",
    tools: "MedGemma 4B, Mendix, RAG, Medical Knowledge Graphs, AWS EC2, SSL/TLS",
    color: "#06b6d4",
    tags: ["MedGemma 4B", "RAG", "Healthcare"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    size: "large",
  },
  {
    title: "Ninadata AdTech Platform",
    category: "NLP / LLM / GenAI AdTech",
    tools: "LLMs, Advanced NLP, BERT, GenAI — 20% ad engagement ↑, 25% relevance ↑",
    color: "#8b5cf6",
    tags: ["LLMs", "NLP", "BERT"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    size: "medium",
  },
  {
    title: "Automated Gauge Monitor",
    category: "Computer Vision — Sembcorp",
    tools: "YOLO, OpenCV, PyTorch, AWS — 900+ labor hours saved, 47% efficiency ↑, US$1M+ savings",
    color: "#ef4444",
    tags: ["YOLO", "OpenCV", "PyTorch"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    size: "medium",
  },
  {
    title: "Ocean Current Prediction",
    category: "Deep Learning — Govt. Project (INCOIS)",
    tools: "Transformers, LSTM, PyTorch, TensorFlow — 85% accuracy, recognised by INCOIS/MOES",
    color: "#14b8a6",
    tags: ["Transformers", "LSTM", "PyTorch"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    size: "small",
  },
  {
    title: "Load Forecasting — Haryana Govt",
    category: "Time Series — Government Project",
    tools: "ARIMA, LSTM, Prophet, Ensemble Models, Python — multi-region electricity forecasting",
    color: "#f97316",
    tags: ["ARIMA", "LSTM", "Prophet"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
    size: "small",
  },
];

const Work = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <p className="work-subtitle">
          10 production projects across AI, LLMs, Computer Vision, and Government
        </p>

        <div className="bento-grid">
          {projects.map((project, index) => (
            <div
              className={`bento-card bento-${project.size}`}
              key={index}
              style={{
                "--card-color": project.color,
                "--card-color-15": hexToRgba(project.color, 0.15),
                "--card-color-30": hexToRgba(project.color, 0.3),
                "--card-color-50": hexToRgba(project.color, 0.5),
              } as React.CSSProperties}
              onClick={() => setExpandedProject(expandedProject === index ? null : index)}
              data-cursor="disable"
            >
              <img
                src={project.image}
                alt={project.title}
                className="bento-img"
                loading="lazy"
              />
              <div className="bento-overlay" />
              <div className="bento-content">
                <div className="bento-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="bento-title">{project.title}</h3>
                <p className="bento-category">{project.category}</p>
                <div className="bento-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="bento-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="bento-expand-icon">
                  <MdArrowOutward />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Project Modal */}
        {expandedProject !== null && (
          <div className="bento-modal-overlay" onClick={() => setExpandedProject(null)}>
            <div
              className="bento-modal"
              onClick={(e) => e.stopPropagation()}
              style={{
                "--card-color": projects[expandedProject].color,
                "--card-color-15": hexToRgba(projects[expandedProject].color, 0.15),
                "--card-color-30": hexToRgba(projects[expandedProject].color, 0.3),
              } as React.CSSProperties}
            >
              <button
                className="bento-modal-close"
                onClick={() => setExpandedProject(null)}
                data-cursor="disable"
              >
                <MdClose />
              </button>
              <div className="bento-modal-img-wrap">
                <img
                  src={projects[expandedProject].image}
                  alt={projects[expandedProject].title}
                  className="bento-modal-img"
                />
                <div className="bento-modal-img-overlay" />
              </div>
              <div className="bento-modal-body">
                <span className="bento-modal-number">
                  {String(expandedProject + 1).padStart(2, "0")}
                </span>
                <h3>{projects[expandedProject].title}</h3>
                <p className="bento-modal-category">
                  {projects[expandedProject].category}
                </p>
                <div className="bento-modal-section">
                  <h5>Tools & Features</h5>
                  <p>{projects[expandedProject].tools}</p>
                </div>
                <div className="bento-modal-tags">
                  {projects[expandedProject].tags.map((t) => (
                    <span key={t} className="bento-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
