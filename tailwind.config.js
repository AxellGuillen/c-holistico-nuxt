import { fontFamily } from "./theme/fontFamily";

/**
 * tailwind.config.js - Raíces Centro Holístico
 *
 * CONVENCIÓN DE NOMBRES:
 * ======================
 * Usamos kebab-case para tokens personalizados porque:
 * 1. Es consistente con las utilidades nativas de Tailwind (gap-4, text-sm)
 * 2. Las clases resultantes son más legibles (h-nav-height vs h-navHeight)
 * 3. Es el estándar en CSS
 *
 * IMPORTANTE: Los nombres con guiones requieren comillas en JS
 * Ejemplo: "nav-height": "4rem" → genera clase h-nav-height
 */

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
      // ============================================
      // TIPOGRAFÍA
      // ============================================
      fontFamily: fontFamily,

      // ============================================
      // COLORES
      // ============================================
      colors: {
        // SISTEMA SEMÁNTICO
        surface: {
          DEFAULT: "#fcf2ed",
          muted: "#f0e7da",
          emphasis: "#e1cfba",
        },

        content: {
          DEFAULT: "#3e1404",
          muted: "rgb(62 20 4 / 0.7)",
          subtle: "rgb(62 20 4 / 0.4)",
        },
        white: {
          DEFAULT: "#f7f5f2",
          muted: "rgb(255 255 255 / 0.7)",
          subtle: "rgb(255 255 255 / 0.4)",
        },

        accent: {
          DEFAULT: "#bf9770",
          soft: "#f6ccc4",
        },

        // SISTEMA LEGACY
        brand: {
          base: "#fcf2ed",
          soft: "#f0e7da",
          sand: "#e1cfba",
          clay: "#d3b093",
          earth: "#bf9770",
          blush: "#f6ccc4",
          terracotta: "#3e1404",
        },

        // NAVEGACIÓN
        nav: {
          bg: "#e1cfba", // surface.emphasis (sand)
          "bg-hover": "#d3c4ab", // sand más oscuro
          border: "rgb(62 20 4 / 0.1)", // content con opacidad
          separator: "rgb(62 20 4 / 0.2)", // content con opacidad
          link: "rgb(62 20 4 / 0.7)", // content al 70%
          "link-hover": "#3e1404", // content.DEFAULT
          "link-active": "#3e1404", // content.DEFAULT
          "cta-text": "rgb(62 20 4 / 0.85)", // NO blanco puro
          "cta-text-hover": "rgb(255 255 255 / 0.92)", // blanco suavizado
        },
        hero: {
          title: "#3e1404", // content.DEFAULT
          subtitle: "rgb(62 20 4 / 0.65)", // content más suave que muted
        },
      },

      // ============================================
      // SPACING
      // ============================================
      spacing: {
        // GUTTER - Aire alrededor de elementos flotantes
        gutter: "0.5rem", // Solo arriba
        "gutter-md": "0.5rem",

        // NAV - Espaciados de navegación
        "nav-height": "3rem",
        "nav-px": "1.5rem",
        "nav-px-lg": "2rem",
        "nav-gap": "1rem",
        "nav-gap-links": "1.5rem",
        "nav-gap-links-lg": "2rem",

        // SECTION - Separación entre secciones
        "section-sm": "3rem",
        "section-md": "5rem",
        "section-lg": "7rem",
        "section-xl": "9rem",
      },

      // ============================================
      // TIPOGRAFÍA SEMÁNTICA
      // ============================================
      fontSize: {
        // DISPLAY
        "display-hero-mobile": [
          "clamp(3.25rem, 14vw, 4.5rem)",
          {
            lineHeight: "1",
            letterSpacing: "-0.01em",
            fontWeight: "300",
          },
        ],
        "display-hero": [
          "clamp(2.75rem, 10vw, 7rem)",
          { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "300" },
        ],
        "display-xl": [
          "clamp(2.25rem, 6vw, 4.5rem)",
          { lineHeight: "1.10", letterSpacing: "-0.01em", fontWeight: "300" },
        ],
        "display-lg": [
          "clamp(1.875rem, 4vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "display-md": [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "display-sm": [
          "clamp(1.25rem, 2.5vw, 1.75rem)",
          { lineHeight: "1.3", fontWeight: "400" },
        ],

        // HEADING
        "heading-lg": [
          "1.5rem",
          { lineHeight: "1.3", fontWeight: "400", letterSpacing: "-0.01em" },
        ],
        "heading-lg-mobile": [
          "1.5rem",
          { lineHeight: "1.4", fontWeight: "400", letterSpacing: "-0.01em" },
        ],
        "heading-md": ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],

        // BODY
        "body-xl": ["1.25rem", { lineHeight: "1.8", fontWeight: "400" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.75", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body-xs": ["0.75rem", { lineHeight: "1.6", fontWeight: "400" }],

        // UI
        "ui-md": [
          "0.9375rem",
          { lineHeight: "1.5", fontWeight: "500", letterSpacing: "0.01em" },
        ],
        "ui-sm": [
          "0.8125rem",
          { lineHeight: "1.5", fontWeight: "500", letterSpacing: "0.02em" },
        ],

        // NAV
        "nav-brand": [
          "1.125rem",
          { lineHeight: "1", fontWeight: "200", letterSpacing: "0.05em" },
        ],
        "nav-link": [
          "0.75rem",
          { lineHeight: "1", fontWeight: "200", letterSpacing: "0.15em" },
        ],
        "nav-cta": [
          "0.8125rem",
          { lineHeight: "1", fontWeight: "600", letterSpacing: "0.12em" },
        ],
      },

      // ============================================
      // MAX WIDTH
      // ============================================
      maxWidth: {
        content: "42rem",
        wide: "72rem",
        wider: "80rem",
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        card: "1rem",
        button: "9999px",
        input: "0.5rem",
        badge: "2px",
        nav: "1rem",
        "nav-mobile": "1.5rem",
        container: "1.5rem",
        "t-container": "1.5rem 1.5rem 0 0", // Top corners only
      },

      // ============================================
      // BOX SHADOW
      // ============================================
      boxShadow: {
        soft: "0 2px 8px -2px rgb(62 20 4 / 0.1)",
        medium: "0 4px 16px -4px rgb(62 20 4 / 0.15)",
        strong: "0 8px 32px -8px rgb(62 20 4 / 0.2)",
        glow: "0 0 24px rgb(191 151 112 / 0.3)",
        nav: "0 4px 24px -4px rgb(0 0 0 / 0.08)",
        "nav-scrolled": "0 8px 32px -4px rgb(0 0 0 / 0.12)",
      },

      // ============================================
      // BACKDROP BLUR
      // ============================================
      backdropBlur: {
        xs: "2px",
        nav: "12px",
        "nav-scrolled": "20px",
      },

      // ============================================
      // TRANSITIONS
      // ============================================
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
    },
  },

  plugins: [],
};
