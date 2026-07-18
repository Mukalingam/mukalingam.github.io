import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    { url: `${site.url}/ask/`, priority: 0.9 },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}/`, priority: 0.8 })),
  ];
}
