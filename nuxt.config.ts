// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Centro Holístico CDMX",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Art",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "preload",
          href: "/cirka/PPCirka-Bold.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/cirka/PPCirka-Light.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/cirka/PPCirka-Variable.ttf",
          as: "font",
          type: "font/ttf",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/writer/PPWriter-Regular.otf",
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
    plugins: [svgLoader()],
  },
  modules: ["@nuxt/image", "@nuxtjs/sanity", "@pinia/nuxt"],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    apiVersion: "2022-03-25",
    useCdn: true, // Set to false for fresh data
  },
  image: {
    sanity: {
      projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NUXT_PUBLIC_SANITY_DATASET,
    },
    domains: ["cdn.sanity.io"],
  },
});
