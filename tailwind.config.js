/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F172A', 800: '#1E293B', 700: '#334155' },
        brand: { green: '#22C55E', orange: '#F97316', red: '#EF4444' },
      },
    },
  },
  plugins: [],
}
