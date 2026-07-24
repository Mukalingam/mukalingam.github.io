"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "@/lib/data";

export default function HorizontalExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.05, 1], ["2%", "-72%"]);

  return (
    <section id="experience" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-[6vw]">
          <p className="font-mono text-sm tracking-[0.3em] text-[#5b5bf0]">
            CAREER
          </p>
          <h2 className="mt-2 text-4xl font-bold sm:text-6xl">
            Experience<span className="text-[#5b5bf0]">.</span>
          </h2>
          <p className="mt-2 font-mono text-xs text-gray-600">
            scroll to travel through time →
          </p>
        </div>
        <motion.div style={{ x }} className="mt-12 flex gap-8 pl-[6vw]">
          {experience.map((e, i) => (
            <div
              key={e.company}
              className="w-[80vw] shrink-0 rounded-2xl border border-white/10 bg-[#0a0a14]/80 p-8 backdrop-blur-md sm:w-[44vw] lg:w-[34vw]"
            >
              <p className="font-mono text-6xl font-bold text-white/5">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {e.role}
              </h3>
              <p className="mt-1 text-sm text-[#8888f5]">{e.company}</p>
              <p className="font-mono text-xs text-gray-500">{e.period}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                {e.blurb}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
