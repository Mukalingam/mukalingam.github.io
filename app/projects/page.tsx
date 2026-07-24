"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

function TiltCard({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("");

  return (
    <a
      ref={ref}
      href={href}
      target={href ? "_blank" : undefined}
      rel="noreferrer"
      style={{ transform, transition: transform ? "none" : "transform 0.4s" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTransform(
          `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(10px)`
        );
      }}
      onMouseLeave={() => setTransform("")}
      className={`block h-full rounded-2xl border border-white/10 bg-[#0a0a14]/80 p-8 backdrop-blur-md will-change-transform hover:border-[#5b5bf0]/70 ${
        href ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {children}
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-[6vw] pb-32 pt-32 text-white">
      <Scene3D minimal />
      <Reveal>
        <p className="font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
          THE WORK
        </p>
        <h1 className="mt-2 text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-tighter">
          Flagship Projects
          <span className="text-[#5b5bf0]">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-gray-400">
          From live Voice AI SaaS platforms to national-scale government
          deployments — {projects.length} projects that shipped.
        </p>
      </Reveal>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.1}>
            <TiltCard href={p.link}>
              <p className="font-mono text-5xl font-bold text-white/5">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-mono text-xs text-[#8888f5]">{p.tag}</p>
              <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {p.blurb}
              </p>
              <p className="mt-5 font-mono text-xs text-gray-500">{p.stack}</p>
              {p.link && (
                <p className="mt-4 font-mono text-xs text-[#5b5bf0]">
                  visit live ↗
                </p>
              )}
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
