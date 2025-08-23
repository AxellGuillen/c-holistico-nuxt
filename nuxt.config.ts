// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Artist-LAYOUT",
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
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
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
