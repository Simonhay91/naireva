import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#5a1f2a"
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontFamily: "Georgia, serif",
            color: "#f4efe8",
            letterSpacing: "2px"
          }}
        >
          NAIREVA
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 28,
            fontFamily: "Georgia, serif",
            color: "#d9c9b8",
            letterSpacing: "4px",
            textTransform: "uppercase"
          }}
        >
          Private Aesthetic Journeys in Armenia
        </span>
      </div>
    ),
    { ...size }
  );
}
