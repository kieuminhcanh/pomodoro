import { createApp } from 'vue'
import App from './App.vue'
import "@mdi/font/css/materialdesignicons.css";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  defaults: {
    VSheet: {
      color: 'transparent',
    },
    VCard: {
      variant: 'text',
    },
  },
})

createApp(App).use(vuetify).mount('#app')
