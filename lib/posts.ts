import { fallbackPosts, site } from "./data";

export type Post = { title: string; url: string; date: string };

// Build-time fetch of the Medium RSS feed; static export bakes the result into HTML.
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${site.medium.replace("medium.com/", "medium.com/feed/")}`, {
      // next static export: this runs once at build
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`RSS ${res.status}`);
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 4);
    const posts = items.map((m) => {
      const item = m[1];
      const title = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ?? "";
      const url = (item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "").split("?")[0];
      const pub = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
      const date = pub ? new Date(pub).toISOString().slice(0, 10) : "";
      return { title, url, date };
    }).filter((p) => p.title && p.url);
    return posts.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts; // ponytail: RSS down at build → last known posts, never a broken section
  }
}
