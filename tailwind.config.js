import { fontFamily } from "./theme/fontFamily";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: fontFamily,

      colors: {
        brand: {
          primary: "#7A9B8B", // Verde Eucalipto — calma, equilibrio
          secondary: "#B87F6E", // Arcilla — conexión, calidez
          accent1: "#D9A96F", // Sol Desértico — energía suave
          accent2: "#C9D5D3", // Piedra Lunar — serenidad
          neutralLight: "#FDFBF7", // Fondo cálido, limpio
          neutralDark: "#344036", // Profundidad y contraste
        },
      },
    },
  },
  plugins: [],
};
