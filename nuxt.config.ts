// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    sanityToken: process.env.SANITY_TOKEN,
    mercadoPagoAccessToken: process.env.NUXT_MERCADOPAGO_ACCESS_TOKEN,
    siteUrl: process.env.SITE_URL,
    public: {
      sanity: {
        projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NUXT_PUBLIC_SANITY_DATASET,
      },
    },
  },

  app: {
    head: {
      title: "Centro Holístico CDMX",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Centro Holístico en CDMX",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "preload",
          href: "/pangaia/PPPangaia-Bold.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    server: {
      allowedHosts: ["localhost", ".ngrok-free.dev"],
    },
    plugins: [svgLoader()],
  },

  modules: ["@nuxt/image", "@nuxtjs/sanity", "@pinia/nuxt"],

  sanity: {
    projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-01-01",
    useCdn: true,
  },

  image: {
    sanity: {
      projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NUXT_PUBLIC_SANITY_DATASET,
    },
    domains: ["cdn.sanity.io"],
  },
});
