import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "Anova Medical Clinic - sănătate mintală și neurologică în Iași";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f3ee",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#1c4b47",
            fontSize: "34px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              background: "#1c4b47",
            }}
          />
          Anova Medical Clinic
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              color: "#1f2421",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Învingem obstacolele, restabilim echilibrul.
          </div>
          <div style={{ display: "flex", fontSize: "36px", color: "#5a615c" }}>
            Sănătate mintală și neurologică, în {siteConfig.city}.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "28px",
            color: "#1c4b47",
          }}
        >
          Psihiatrie · Psihologie · Neurologie · Cardiologie · Endocrinologie
        </div>
      </div>
    ),
    { ...size },
  );
}
