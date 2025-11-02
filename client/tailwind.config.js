/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0EA5E9",
          dark: "#0284C7",
          light: "#38BDF8",
        },
        dark: {
          bg: "#0F172A",
          card: "#1E293B",
          border: "#334155",
          text: "#F1F5F9",
          "text-secondary": "#94A3B8",
        },
      },
    },
  },
  plugins: [],
}
