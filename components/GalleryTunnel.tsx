"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export type TunnelProject = {
  name: string;
  tag: string;
  stack: string;
  blurb: string;
  link?: string;
};

function TunnelCard({
  progress,
  index,
  total,
  project,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  project: TunnelProject;
}) {
  // step sized so the last card's range ends exactly at 1 (offsets must stay in [0,1])
  const step = 1 / (total + 1);
  const start = index * step;
  const end = start + step * 2;

  // card flies from deep in the tunnel toward (and past) the camera
  const z = useTransform(progress, [start, end], [-1800, 350]);
  const opacity = useTransform(
    progress,
    [start, start + step * 0.4, end - step * 0.35, end],
    [0, 1, 1, 0]
  );
  const x = index % 2 === 0 ? "-16%" : "16%";
  const y = index % 3 === 0 ? "-8%" : index % 3 === 1 ? "10%" : "0%";

  return (
    <motion.div
      style={{ z, opacity, x, y, transformStyle: "preserve-3d" }}
      className="absolute left-1/2 top-1/2 w-[min(34rem,92vw)] -translate-x-1/2 -translate-y-1/2"
    >
      <a
        href={project.link}
        target={project.link ? "_blank" : undefined}
        rel="noreferrer"
        className={`block rounded-3xl border border-[#5b5bf0]/40 bg-[#0a0a14]/85 p-10 shadow-[0_0_80px_-15px_#5b5bf0] backdrop-blur-md transition-colors hover:border-[#5b5bf0] ${
          project.link ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <p className="font-mono text-sm text-[#8888f5]">{project.tag}</p>
        <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-gray-400">
          {project.blurb}
        </p>
        <p className="mt-6 font-mono text-xs text-gray-500">{project.stack}</p>
      </a>
    </motion.div>
  );
}

export default function GalleryTunnel({
  projects,
}: {
  projects: TunnelProject[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" ref={ref} style={{ height: `${projects.length * 70 + 100}vh` }}>
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        style={{ perspective: "1100px" }}
      >
        <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2">
          <h2 className="font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
            FLAGSHIP PROJECTS
          </h2>
        </div>
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((p, i) => (
            <TunnelCard
              key={p.name}
              progress={scrollYProgress}
              index={i}
              total={projects.length}
              project={p}
            />
          ))}
        </div>
        <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-600">
          keep scrolling ↓
        </p>
      </div>
    </section>
  );
}
