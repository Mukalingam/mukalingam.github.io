import { useState, useCallback } from "react";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import "./styles/Blogs.css";

const blogs = [
  {
    title: "Claude Opus 4.6 & Cowork: The AI That Codes While You Sleep (And Does Everything Else Too)",
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
    title: "Building the Future of Virtual Try-On: How Appify AI Is Shaping the Next Era of Fashion Tech",
    tag: "AI · Computer Vision · Fashion Tech",
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
    tag: "NLP · Content Moderation · AI Safety",
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
    const newIndex = currentIndex === 0 ? blogs.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === blogs.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

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

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous blog"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next blog"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {blogs.map((blog, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>{String(index + 1).padStart(2, "0")}</h3>
                      </div>
                      <div className="carousel-details">
                        <p className="carousel-category">{blog.tag}</p>
                        <h4>{blog.title}</h4>
                        <div className="carousel-tools">
                          <span className="tools-label">{blog.date}</span>
                        </div>
                        <a
                          href={blog.url}
                          target="_blank"
                          className="blog-read-btn"
                          data-cursor="disable"
                          style={{
                            background: hexToRgba(blog.color, 0.12),
                            borderColor: hexToRgba(blog.color, 0.4),
                            color: blog.color,
                          }}
                        >
                          Read on Medium <MdArrowOutward />
                        </a>
                      </div>
                    </div>

                    <div className="carousel-image-wrapper">
                      <div
                        className="blog-thumb"
                        style={{
                          borderColor: hexToRgba(blog.color, 0.3),
                        }}
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="blog-thumb-img"
                          loading="lazy"
                        />
                        <div
                          className="blog-thumb-overlay"
                          style={{
                            background: `linear-gradient(180deg, transparent 30%, ${hexToRgba(blog.color, 0.3)} 100%)`,
                          }}
                        />
                        <span
                          className="blog-thumb-label"
                          style={{ color: "#fff" }}
                        >
                          {blog.tag.split(" · ")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {blogs.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to blog ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
