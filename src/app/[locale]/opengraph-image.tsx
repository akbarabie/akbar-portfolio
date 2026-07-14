import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.role.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0F172A",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: "#F8FAFC" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 32, color: "#3B82F6", marginTop: 20 }}>
          {siteConfig.role.join("   ·   ")}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94A3B8",
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}