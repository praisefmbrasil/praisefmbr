/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter para leitura e uma fonte genérica 'black' para títulos brutalistas
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        'praise-orange': '#ff6600',
        'praise-black': '#000000',
        'praise-white': '#ffffff',
        'praise-gray': '#f3f3f3',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '8': '8px',
      },
      boxShadow: {
        // Sombra Brutalista: sólida, sem desfoque
        'brutalist-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutalist': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutalist-lg': '12px 12px 0px 0px rgba(0,0,0,1)',
        'brutalist-white': '8px 8px 0px 0px rgba(255,255,255,1)',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
};