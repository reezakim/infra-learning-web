/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx,md}",
    "./public/**/*.html",
    "./legacy/**/*.html",
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        swiss: {
          lightBg: "#F7F7F5",
          lightSurface: "#FFFFFF",
          lightText: "#111111",
          lightMuted: "#555555",
          lightBorder: "#E0E0DC",
          darkBg: "#0D0D0D",
          darkSurface: "#141414",
          darkText: "#EEEEEE",
          darkMuted: "#A0A0A0",
          darkBorder: "#262626",
          accent: "#ff3e00",
        },
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          900: "#0c4a6e",
          accent: "#ff3e00",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};