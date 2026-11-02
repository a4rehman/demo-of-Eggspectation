import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF7F2",
          50: "#FDFCFA",
          100: "#F7F3EB",
          200: "#EFE7D9",
          300: "#E3D4BF",
        },
        charcoal: {
          DEFAULT: "#211B14",
          50: "#4A4238",
          600: "#3E362C",
          700: "#322B22",
          800: "#2A231B",
          900: "#211B14",
        },
        brand: {
          50: "#FBF1E9",
          100: "#F6E0CC",
          200: "#EEBE95",
          300: "#E4975C",
          400: "#DC7B31",
          500: "#BE4A0F",
          600: "#A9430D",
          700: "#8E3B0F",
          800: "#6F300F",
          900: "#59270E",
        },
        sage: {
          50: "#F0F4EF",
          100: "#DDE7DB",
          600: "#5C7558",
          700: "#495E47",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 28px -8px rgb(33 27 20 / 0.10)",
        card: "0 1px 2px rgb(33 27 20 / 0.05), 0 16px 40px -20px rgb(33 27 20 / 0.22)",
        lift: "0 4px 12px -2px rgb(33 27 20 / 0.08), 0 24px 56px -24px rgb(33 27 20 / 0.30)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
