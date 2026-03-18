import { useState, useEffect, useRef, useCallback } from "react";
import {
  MdPerson,
  MdWork,
  MdTimeline,
  MdArticle,
  MdEmail,
  MdCode,
  MdDescription,
  MdSearch,
} from "react-icons/md";
import { smoother } from "./Navbar";
import "./styles/CommandPalette.css";

interface Command {
  id: string;
  label: string;
  section: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
}

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = useCallback((selector: string) => {
    setIsOpen(false);
    if (window.innerWidth > 1024 && smoother) {
      smoother.scrollTo(selector, true, "top top");
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const commands: Command[] = [
    {
      id: "about",
      label: "About Me",
      section: "Navigate",
      icon: <MdPerson />,
      action: () => scrollToSection("#about"),
      keywords: ["about", "bio", "introduction", "who"],
    },
    {
      id: "work",
      label: "Projects / Work",
      section: "Navigate",
      icon: <MdWork />,
      action: () => scrollToSection("#work"),
      keywords: ["projects", "work", "portfolio", "built"],
    },
    {
      id: "career",
      label: "Career & Experience",
      section: "Navigate",
      icon: <MdTimeline />,
      action: () => scrollToSection(".career-section"),
      keywords: ["career", "experience", "timeline", "history", "jobs"],
    },
    {
      id: "blogs",
      label: "Blogs & Thoughts",
      section: "Navigate",
      icon: <MdArticle />,
      action: () => scrollToSection("#blogs"),
      keywords: ["blogs", "articles", "writing", "medium", "thoughts"],
    },
    {
      id: "contact",
      label: "Contact",
      section: "Navigate",
      icon: <MdEmail />,
      action: () => scrollToSection("#contact"),
      keywords: ["contact", "email", "connect", "hire", "reach"],
    },
    {
      id: "skills",
      label: "What I Do / Skills",
      section: "Navigate",
      icon: <MdCode />,
      action: () => scrollToSection(".whatIDO"),
      keywords: ["skills", "what", "do", "expertise", "tech"],
    },
    {
      id: "resume",
      label: "Download Resume",
      section: "Quick Actions",
      icon: <MdDescription />,
      action: () => {
        setIsOpen(false);
        window.open("/Muka Resume.pdf", "_blank");
      },
      keywords: ["resume", "cv", "download", "pdf"],
    },
    {
      id: "github",
      label: "Visit GitHub",
      section: "Quick Actions",
      icon: <MdCode />,
      action: () => {
        setIsOpen(false);
        window.open("https://github.com/Mukalingam", "_blank");
      },
      keywords: ["github", "code", "repo", "repository"],
    },
    {
      id: "linkedin",
      label: "Visit LinkedIn",
      section: "Quick Actions",
      icon: <MdPerson />,
      action: () => {
        setIsOpen(false);
        window.open(
          "https://www.linkedin.com/in/muka-lingam-278526113/",
          "_blank"
        );
      },
      keywords: ["linkedin", "social", "professional", "network"],
    },
    {
      id: "medium",
      label: "Visit Medium",
      section: "Quick Actions",
      icon: <MdArticle />,
      action: () => {
        setIsOpen(false);
        window.open("https://medium.com/@utlamuka", "_blank");
      },
      keywords: ["medium", "blog", "articles", "posts"],
    },
    {
      id: "emailto",
      label: "Send Email",
      section: "Quick Actions",
      icon: <MdEmail />,
      action: () => {
        setIsOpen(false);
        window.location.href = "mailto:utlamuka@gmail.com";
      },
      keywords: ["email", "mail", "send", "contact"],
    },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : commands;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  };

  const sections = [...new Set(filtered.map((c) => c.section))];

  if (!isOpen) return null;

  return (
    <div className="cmd-overlay" onClick={() => setIsOpen(false)}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <MdSearch className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Search commands, navigate, or take action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            data-cursor="disable"
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>
        <div className="cmd-results">
          {filtered.length === 0 && (
            <div className="cmd-empty">No results found</div>
          )}
          {sections.map((section) => (
            <div key={section}>
              <div className="cmd-section-label">{section}</div>
              {filtered
                .filter((c) => c.section === section)
                .map((cmd) => {
                  const globalIdx = filtered.indexOf(cmd);
                  return (
                    <div
                      key={cmd.id}
                      className={`cmd-item ${globalIdx === selectedIndex ? "cmd-item-active" : ""}`}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      data-cursor="disable"
                    >
                      <span className="cmd-item-icon">{cmd.icon}</span>
                      <span className="cmd-item-label">{cmd.label}</span>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        <div className="cmd-footer">
          <span>
            <kbd>↑↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>Ctrl+K</kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
