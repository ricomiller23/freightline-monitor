import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        border: "var(--border)",
        text: "var(--text)",
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        brand: "var(--brand)",
        "brand-hover": "var(--brand-hover)",
        "brand-soft": "var(--brand-soft)",
        "brand-ink": "var(--brand-ink)",
        live: "var(--live)",
        sea: "var(--sea)",
        congested: "var(--congested)",
        blocked: "var(--blocked)",
      },
      fontFamily: {
        ui: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "var(--font-ui)"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        pill: "var(--r-pill)",
      }
    },
  },
  plugins: [],
};
export default config;
