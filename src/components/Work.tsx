import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

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
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=340&fit=crop",
  },
  {
    title: "TubeQuiz AI",
    category: "AI Video Learning Platform — Founder",
    tools: "RAG Systems, GPT-4, Computer Vision, Video Processing, PostgreSQL, pgvector, React",
    color: "#3b82f6",
    tags: ["RAG", "GPT-4", "pgvector", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=340&fit=crop",
  },
  {
    title: "Real-Time AI Voice Agent",
    category: "Conversational Voice AI",
    tools: "ElevenLabs Conversational AI, WebSocket, FastAPI, React, PostgreSQL — voice cloning & persona management",
    color: "#ec4899",
    tags: ["ElevenLabs", "Voice AI", "WebSocket", "FastAPI"],
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=340&fit=crop",
  },
  {
    title: "WhatsApp AI Agent",
    category: "Enterprise Chatbot — Mendix Platform",
    tools: "WhatsApp Business API, GPT-4, RAG Systems, PostgreSQL, Mendix, Custom React Widgets",
    color: "#22c55e",
    tags: ["WhatsApp API", "GPT-4", "RAG", "Mendix"],
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=340&fit=crop",
  },
  {
    title: "AI Interview System",
    category: "LLM-Powered Hiring Platform",
    tools: "GPT-4, Claude, NLP, Sentiment Analysis, React, FastAPI, PostgreSQL — voice & text interviews",
    color: "#f59e0b",
    tags: ["GPT-4", "Claude", "Sentiment Analysis", "FastAPI"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=340&fit=crop",
  },
  {
    title: "MedGemma Healthcare AI",
    category: "Healthcare AI — MediConnect Platform",
    tools: "MedGemma 4B, Mendix, RAG, Medical Knowledge Graphs, AWS EC2, SSL/TLS",
    color: "#06b6d4",
    tags: ["MedGemma 4B", "RAG", "Healthcare", "AWS EC2"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=340&fit=crop",
  },
  {
    title: "Ninadata AdTech Platform",
    category: "NLP / LLM / GenAI AdTech",
    tools: "LLMs, Advanced NLP, BERT, GenAI — 20% ad engagement ↑, 25% relevance ↑",
    color: "#8b5cf6",
    tags: ["LLMs", "NLP", "BERT", "GenAI"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop",
  },
  {
    title: "Automated Gauge Monitor",
    category: "Computer Vision — Sembcorp",
    tools: "YOLO, OpenCV, PyTorch, AWS — 900+ labor hours saved, 47% efficiency ↑, US$1M+ savings",
    color: "#ef4444",
    tags: ["YOLO", "OpenCV", "PyTorch", "AWS"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=340&fit=crop",
  },
  {
    title: "Ocean Current Prediction",
    category: "Deep Learning — Govt. Project (INCOIS)",
    tools: "Transformers, LSTM, PyTorch, TensorFlow — 85% accuracy, recognised by INCOIS/MOES",
    color: "#14b8a6",
    tags: ["Transformers", "LSTM", "PyTorch", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=340&fit=crop",
  },
  {
    title: "Load Forecasting — Haryana Govt",
    category: "Time Series — Government Project",
    tools: "ARIMA, LSTM, Prophet, Ensemble Models, Python — multi-region electricity forecasting",
    color: "#f97316",
    tags: ["ARIMA", "LSTM", "Prophet", "Time Series"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=340&fit=crop",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>{String(index + 1).padStart(2, "0")}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-image-wrapper">
                      <div
                        className="project-visual"
                        style={{
                          borderColor: hexToRgba(project.color, 0.3),
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-visual-img"
                          loading="lazy"
                        />
                        <div
                          className="project-visual-overlay"
                          style={{
                            background: `linear-gradient(180deg, transparent 40%, ${hexToRgba(project.color, 0.25)} 100%)`,
                          }}
                        />
                        <div className="project-visual-label">
                          <span
                            className="project-visual-name"
                            style={{ color: "#fff" }}
                          >
                            {project.title}
                          </span>
                          <div className="project-visual-tags">
                            {project.tags.map((t) => (
                              <span
                                key={t}
                                className="project-visual-tag"
                                style={{
                                  background: hexToRgba(project.color, 0.25),
                                  borderColor: hexToRgba(project.color, 0.5),
                                  color: "#fff",
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
