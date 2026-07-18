"use client";

import Link from "next/link";

function toggleTheme() {
  const el = document.documentElement;
  const light = el.getAttribute("data-theme") === "light";
  if (light) {
    el.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  } else {
    el.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Muka<span>Lingam</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/#products">Products</Link>
          <Link href="/#work">Work</Link>
          <Link href="/#how-i-build">How I Build</Link>
          <Link href="/#writing">Writing</Link>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle light/dark theme">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
            </svg>
          </button>
          <Link href="/ask/" className="nav-cta">Ask my agent</Link>
        </nav>
      </div>
    </header>
  );
}
