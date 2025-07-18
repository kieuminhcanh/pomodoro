// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({  
  devtools: { enabled: false },
  ssr: false,
  app: {
    baseURL:  process.env.NUXT_APP_BASE_URL || '/',
    head: {
      link: [
        { rel: 'icon', href: 'logo.png', type: 'image/png' }
      ],
      meta: [
        { name: 'description', content: 'Work in Sprints, Win the Marathon' },
        { name: 'author', content: 'Ken Kieu' },
        { property: 'og:title', content: 'Pomodoro Timer' },
        { property: 'og:description', content: 'Work in Sprints, Win the Marathon' },
        { property: 'og:image', content: 'https://pomodoro.website/screenshots/shared.png' },
        { property: 'og:url', content: 'https://pomodoro.website' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@kieuminhcanh' },
        { name: 'twitter:creator', content: '@kieuminhcanh' },
        { name: 'twitter:title', content: 'Pomodoro Timer' },
        { name: 'twitter:description', content: 'Work in Sprints, Win the Marathon' },
        { name: 'twitter:image', content: 'https://pomodoro.website/screenshots/shared.png' },
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
    "includeAssets": [
      "logo.png"
    ],
    "registerType": "autoUpdate",
    "client": {
      "installPrompt": true
    },
    "manifest": {
      "id": "website.pomodoro.pwa",
      "scope": "/",
      "start_url": "/",
      "name": "Pomodoro Timer",
      "short_name": "Pomodoro",
      "description": "Work in Sprints, Win the Marathon",
      "display": "standalone",
      "background_color": "#000000",
      "lang": "en",
      "theme_color": "#ffffff",
      "orientation": "any",
      "launch_handler": {
        "client_mode": [
          "navigate-existing",
          "auto"
        ]
      },
      "icons": [
        {
          "src": "logo.png",
          "sizes": "72x72 96x96 128x128 256x256 512x512",
          "type": "image/png"
        }
      ],
      "handle_links": "auto",
      "dir": "ltr",
      "iarc_rating_id": "228e2971-4722-41cb-9ab8-609426d77fae",
      "screenshots": [
        {
          "src": "/screenshots/1500x2668.png",
          "sizes": "1500x2668",
          "type": "image/jpg",
          "platform": "mobile"
        },
        {
          "src": "/screenshots/2560x1600.png",
          "sizes": "2560x1600",
          "type": "image/jpg",
          "platform": "wide"
        }
      ],
      "categories": [
        "education",
        "productivity",
        "tools",
        "utilities"
      ],
      "share_target": {
        "action": "/",
        "method": "GET",
        "params": {
          "title": "Pomodoro Timer",
          "text": "Work in Sprints, Win the Marathon",
          "url": "https://pomodoro.website"
        }
      }
    }
  },
  gtag: {
    id: 'G-FFJP2236LD'
  }
})
