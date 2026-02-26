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
      animation: {
        "geo-drift-1": "geo-drift-1 30s ease-in-out infinite",
        "geo-drift-2": "geo-drift-2 34s ease-in-out infinite",
        "geo-drift-3": "geo-drift-3 28s ease-in-out infinite",
        "geo-drift-4": "geo-drift-4 36s ease-in-out infinite",
        "geo-drift-5": "geo-drift-5 32s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}