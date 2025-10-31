import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gondor: {
          dark: '#1a1a1a',      // Primary background
          stone: '#2a2a2a',      // Secondary background
          silver: '#eeeff1',     // Primary text (updated for WCAG 2.1 AA contrast)
          gold: '#d6b13a',       // Accent color (lightened for better contrast)
          white: '#f9fafb',      // Headings
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
