/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        charcoal: {
          800: '#1f1f23',
          900: '#121215',
          950: '#09090b',
        }
      },
      fontFamily: {
        cinematic: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        display: ['Orbitron', 'Cinzel', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
