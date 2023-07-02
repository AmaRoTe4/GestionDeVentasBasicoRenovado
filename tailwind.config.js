/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: "#217346",
        gris_oscuro: "#3F3F3F",
        blanco: "#FFFFFF",
        gris_claro: "#E6E6E6",
        azul: "#007ACC",
        rojo: "#B02E26",
        celeste: "rgb(147 197 253 / var(--tw-bg-opacity))"
      },
    },
  },
  plugins: [],
}

