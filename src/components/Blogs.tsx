import { useState } from "react";
import { MdArrowOutward, MdArrowBack, MdArrowForward } from "react-icons/md";
import "./styles/Blogs.css";

const blogs = [
  {
    title: "Claude Opus 4.6 & Cowork: The AI That Codes While You Sleep",
    tag: "AI · LLMs · Claude",
    date: "Feb 6, 2026",
    color: "#a855f7",
    url: "https://medium.com/@utlamuka/claude-opus-4-6-cowork-the-ai-that-codes-while-you-sleep-and-does-everything-else-too-3b0fd8ae182c",
    image: "https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=600&h=340&fit=crop",
  },
  {
    title: "Model Context Protocol (MCP): The Universal Connector for AI Systems",
    tag: "MCP · AI Agents · Architecture",
    date: "Apr 25, 2025",
    color: "#3b82f6",
    url: "https://medium.com/@utlamuka/model-context-protocol-mcp-the-universal-connector-for-ai-systems-baa2f19c0787",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop",
  },
  {
    title: "Building the Future of Virtual Try-On: How Appify AI Is Shaping Fashion Tech",
    tag: "AI · Computer Vision · Fashion",
    date: "2025",
    color: "#ec4899",
    url: "https://medium.com/@utlamuka/building-the-future-of-virtual-try-on-how-appify-ai-is-shaping-the-next-era-of-fashion-tech-049671e10d4d",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=340&fit=crop",
  },
  {
    title: "From Data to Insights: Mastering Advanced RAG with GPT-4o and LangChain",
    tag: "RAG · GPT-4o · LangChain",
    date: "2025",
    color: "#14b8a6",
    url: "https://medium.com/@utlamuka/from-data-to-insights-mastering-advanced-retrieval-augmented-generation-with-gpt-4o-and-langchain-0759f6aaec1a",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=340&fit=crop",
  },
  {
    title: "Say Goodbye to Offensive Content: AI-Based Profanity Checks for Text and Image",
    tag: "NLP · Content Moderation",
    date: "2024",
    color: "#f59e0b",
    url: "https://medium.com/@utlamuka/say-goodbye-to-offensive-content-a-closer-look-at-profanity-checks-ai-based-text-and-image-411015a6cf51",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=340&fit=crop",
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const Blogs = () => {
  const [active, setActive] = useState(0);

  const goNext = () => setActive((prev) => (prev + 1) % blogs.length);
  const goPrev = () => setActive((prev) => (prev - 1 + blogs.length) % blogs.length);

  return (
    <div className="blogs-section" id="blogs">
      <div className="blogs-container section-container">
        <h2>
          Blogs <span>&</span> Thoughts
        </h2>
        <p className="blogs-sub">
          Technical articles on AI Agents, LLMs, RAG systems, and enterprise AI
          — published on{" "}
          <a
            href="https://medium.com/@utlamuka"
            target="_blank"
            data-cursor="disable"
          >
            Medium
          </a>
        </p>

        <div className="blog-stack-wrapper">
          {/* Stacked Cards */}
          <div className="blog-stack">
            {blogs.map((blog, index) => {
              const offset = index - active;
              const absOffset = Math.abs(offset);
              const isActive = index === active;

              // Only show 3 cards max
              if (absOffset > 2) return null;

              return (
                <div
                  key={index}
                  className={`blog-stack-card ${isActive ? "blog-stack-active" : ""}`}
                  style={{
                    "--stack-offset": offset,
                    "--stack-abs": absOffset,
                    "--card-color": blog.color,
                    zIndex: blogs.length - absOffset,
                    transform: `translateX(${offset * 30}px) scale(${1 - absOffset * 0.06}) translateZ(${-absOffset * 40}px)`,
                    opacity: absOffset > 1 ? 0.3 : 1 - absOffset * 0.2,
                    filter: isActive ? "none" : `brightness(${0.7 - absOffset * 0.15})`,
                  } as React.CSSProperties}
                  onClick={() => setActive(index)}
                  data-cursor="disable"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-stack-img"
                    loading="lazy"
                  />
                  <div
                    className="blog-stack-overlay"
                    style={{
                      background: `linear-gradient(180deg, transparent 20%, ${hexToRgba(blog.color, 0.3)} 60%, rgba(10,14,23,0.95) 100%)`,
                    }}
                  />
                  <div className="blog-stack-content">
                    <span className="blog-stack-tag" style={{ color: blog.color }}>
                      {blog.tag}
                    </span>
                    <h3 className="blog-stack-title">{blog.title}</h3>
                    <span className="blog-stack-date">{blog.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Panel */}
          <div className="blog-info-panel">
            <div className="blog-info-number">
              {String(active + 1).padStart(2, "0")}{" "}
              <span className="blog-info-total">/ {String(blogs.length).padStart(2, "0")}</span>
            </div>
            <h3 className="blog-info-title">{blogs[active].title}</h3>
            <p className="blog-info-tag">{blogs[active].tag}</p>
            <p className="blog-info-date">{blogs[active].date}</p>
            <a
              href={blogs[active].url}
              target="_blank"
              className="blog-info-btn"
              data-cursor="disable"
              style={{
                background: hexToRgba(blogs[active].color, 0.12),
                borderColor: hexToRgba(blogs[active].color, 0.4),
                color: blogs[active].color,
              }}
            >
              Read on Medium <MdArrowOutward />
            </a>

            <div className="blog-nav-btns">
              <button onClick={goPrev} data-cursor="disable" aria-label="Previous blog">
                <MdArrowBack />
              </button>
              <button onClick={goNext} data-cursor="disable" aria-label="Next blog">
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
