"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0a0a14]/60 px-[6vw] py-4 backdrop-blur-md">
      <Link href="/" className="font-mono text-lg font-bold tracking-tight">
        <span className="text-[#5b5bf0]">ML</span>
        <span className="text-gray-500">.</span>
      </Link>
      <div className="flex gap-6 sm:gap-10">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm transition ${
              pathname === l.href
                ? "text-[#8888f5]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {l.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
