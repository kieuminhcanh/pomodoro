// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      ]
    }
  },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt"
  ],
  pwa: {
    includeAssets: ['logo.png'],
    registerType: 'autoUpdate',
    manifest: {
      name: 'Pomodoro Timer',
      short_name: 'Pomodoro',
      description: 'Work in Sprints, Win the Marathon',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.png',
          type: 'image/png'
        },
      ]
    }
  },
  compatibilityDate: "2024-07-23",
  css: ['~/assets/css/main.css'],
  ui: {
    safelistColors: ['orange', 'yellow']
  },
  components: {
    global: true,
    dirs: ['~/components', '~/components/pomodoro']
  },
})
