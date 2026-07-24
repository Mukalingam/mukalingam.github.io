"use client";

import { useId } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* Fluid image reveal — clip-path unveil + continuous liquid distortion
   via animated SVG turbulence. */
export default function FluidImageReveal({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const id = useId().replace(/[:]/g, "");
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id={`fluid-${id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.012 0.02;0.017 0.026;0.012 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" />
        </filter>
      </svg>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.35 }}
          whileInView={{ scale: 1.07 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
          className="relative h-full w-full"
          style={{ filter: `url(#fluid-${id})` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 40vw, 30vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#5b5bf0]/30 bg-gradient-to-t from-[#0a0a14]/50 via-transparent to-transparent" />
    </div>
  );
}
