import Link from "next/link";

export default function NotFound() {
  return (
    <main className="contact wrap" style={{ paddingTop: 180 }}>
      <h2>404 — nothing here</h2>
      <p>This page doesn&apos;t exist. The homepage does.</p>
      <div className="cta-row" style={{ justifyContent: "center" }}>
        <Link href="/" className="btn btn-gold">Back home</Link>
      </div>
    </main>
  );
}
