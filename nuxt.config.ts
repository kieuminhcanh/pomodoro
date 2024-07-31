// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig( {
  devtools: { enabled: false },
  ssr: false,
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/color-mode"],
  compatibilityDate: "2024-07-23",
  css: ['~/assets/css/main.css'],
  ui: {
    safelistColors: ['orange', 'yellow']
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
} )
