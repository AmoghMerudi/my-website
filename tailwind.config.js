/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0e",
        panel: "#111118",
        muted: "#9ca3af",
        accent: "#7c7cff",
      },
    },
  },
  plugins: [],
}