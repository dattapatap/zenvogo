import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { siteConfig } from "@/config/site";

/**
 * Default social share image (WhatsApp, LinkedIn, X, Slack…), 1200×630, generated at build
 * time. Pages without their own opengraph-image inherit it.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(
  join(process.cwd(), "public/images/brand/zenvogo-logo-light.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logo}`;

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(115deg, #071a42 0%, #0a2560 55%, #0c3380 100%)",
        color: "white",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs <img> */}
      <img src={logoSrc} alt="" width={340} height={90} style={{ objectFit: "contain" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5 }}>
          Industry-led programmes, certifications &amp; global immersions
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
          Designed with leading institutions · Built around real business challenges
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
        <div style={{ width: 48, height: 4, background: "#ff6818", borderRadius: 4 }} />
        <span style={{ color: "#ffb21a", fontWeight: 700 }}>{siteConfig.tagline}</span>
      </div>
    </div>,
    size,
  );
}
