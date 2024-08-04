// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      dev: process.env.NODE_ENV === 'development', // Expose dev mode as a runtime config variable
    }
  },
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/logo.png', type: 'image/png' }
      ],
      meta: [
        { name: 'description', content: 'Work in Sprints, Win the Marathon' },
        { name: 'author', content: 'Ken Kieu' },
        { property: 'og:title', content: 'Pomodoro Timer' },
        { property: 'og:description', content: 'Work in Sprints, Win the Marathon' },
        { property: 'og:image', content: 'https://pomodoro.website/screenshots/1.png' },
        { property: 'og:url', content: 'https://pomodoro.website' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@kieuminhcanh' },
        { name: 'twitter:creator', content: '@kieuminhcanh' },
        { name: 'twitter:title', content: 'Pomodoro Timer' },
        { name: 'twitter:description', content: 'Work in Sprints, Win the Marathon' },
        { name: 'twitter:image', content: 'https://pomodoro.website/screenshots/1.png' },
      ]
    }
  },
  compatibilityDate: "2024-07-23",
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
    "nuxt-gtag"
  ],
  pwa: {
    includeAssets: ['logo.png'],
    registerType: 'autoUpdate',
    manifest: {
      id: '/',
      name: 'Pomodoro Timer',
      short_name: 'Pomodoro',
      description: 'Work in Sprints, Win the Marathon',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.png',
          type: 'image/png'
        },
      ],
    },
  },
  gtag: {
    id: 'G-FFJP2236LD'
  }
})
