import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5a1f2a",
          borderRadius: "14%"
        }}
      >
        <span
          style={{
            fontSize: 40,
            fontFamily: "Georgia, serif",
            color: "#f4efe8",
            letterSpacing: "-1px"
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size }
  );
}
