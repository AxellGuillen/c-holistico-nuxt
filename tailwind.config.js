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
          base: "#fcf2ed", // Base clara – fondo principal, sensación de calma
          soft: "#f0e7da", // Fondo alterno o contenedor suave
          sand: "#e1cfba", // Tonalidad media para secciones o overlays
          clay: "#d3b093", // Calidez natural – títulos secundarios o bordes
          earth: "#bf9770", // Tierra – botones, énfasis visual
          blush: "#f6ccc4", // Rosa cálido – acento emocional o detalles suaves
          terracotta: "#3e1404", // Terracota intensa – CTA principal, contraste
        },
      },
    },
  },
  plugins: [],
};
