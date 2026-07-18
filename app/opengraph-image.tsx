import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Muka Lingam — AI Solution Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #070a12 0%, #0d1428 100%)",
          color: "#e8eaf0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#c9a227", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600 }}>
          AI Solution Architect
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, marginTop: 16 }}>Muka Lingam</div>
        <div style={{ fontSize: 34, color: "#9aa1b2", marginTop: 20, maxWidth: 900 }}>
          Agentic AI systems that run in production — not in demos.
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 56, fontSize: 26, color: "#c9a227", fontWeight: 600 }}>
          <span>ivaak.ai</span>
          <span>trufix.ai</span>
          <span style={{ color: "#6b7280" }}>mukalingam.in</span>
        </div>
      </div>
    ),
    size
  );
}
