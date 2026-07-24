/* eslint-disable @next/next/no-img-element */
import type { TechLogo } from "@/lib/data";

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: (string | TechLogo)[];
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`inline-flex items-center ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {row.map((item, i) =>
          typeof item === "string" ? (
            <span
              key={i}
              className={`mx-6 inline-block shrink-0 font-mono text-sm tracking-widest ${className}`}
            >
              {item} <span className="mx-2 text-[#5b5bf0]">·</span>
            </span>
          ) : (
            <span
              key={i}
              className="mx-4 inline-flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-[#0a0a14]/70 px-5 py-2.5 backdrop-blur-sm"
            >
              <img src={item.src} alt={item.name} className="h-7 w-7 object-contain" />
              <span className={`text-sm font-medium text-gray-300 ${className}`}>
                {item.name}
              </span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
