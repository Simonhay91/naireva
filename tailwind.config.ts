import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f4efe8",
        paper: "#fbf8f3",
        ink: "#171717",
        muted: "#706a64",
        wine: {
          DEFAULT: "#5a1f2a",
          dark: "#3f151d"
        },
        gold: {
          DEFAULT: "#b69d78",
          light: "#d9c9a9"
        },
        line: "#d9d0c5",
        charcoal: {
          DEFAULT: "#171513",
          soft: "#1d1a18",
          mid: "#2d2521"
        }
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"]
      },
      maxWidth: {
        wrap: "1320px"
      },
      borderRadius: {
        xl2: "1.75rem",
        xl3: "2rem"
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        reveal: "reveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards"
      }
    }
  },
  plugins: []
};

export default config;
