import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8F9FA",
        line: "rgba(0,0,0,0.08)",
        electric: "#000000",
        mint: "#00ff88",
        violet: "#7c3aed",
        danger: "#ff4d6d",
        success: "#00ff88",
        muted: "#52525b",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.35)",
        neon: "0 0 40px rgba(0,212,255,0.18)",
        mint: "0 0 35px rgba(0,255,136,0.16)",
        danger: "0 0 30px rgba(255,77,109,0.14)",
      },
      backgroundImage: {
        "hero-orb":
          "radial-gradient(circle at 20% 20%, rgba(0,212,255,0.24), transparent 30%), radial-gradient(circle at 80% 0%, rgba(124,58,237,0.2), transparent 26%), radial-gradient(circle at 80% 80%, rgba(0,255,136,0.14), transparent 24%)",
        "grid-radial":
          "radial-gradient(circle at top, rgba(0,212,255,0.15), transparent 40%), radial-gradient(circle at bottom, rgba(124,58,237,0.12), transparent 34%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(0,212,255,0.1)" },
          "50%": { boxShadow: "0 0 28px rgba(0,212,255,0.25)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        glow: "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
