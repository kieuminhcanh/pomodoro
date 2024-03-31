import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { internalIpV4 } from 'internal-ip'
import ViteFonts from 'unplugin-fonts/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM)

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    Vuetify({
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),

    ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
          {
            name: 'Roboto Slab',
          },
        ],
      },
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: mobile ? '0.0.0.0' : false,
    hmr: mobile
      ? {
          protocol: 'ws',
          host: await internalIpV4(),
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}))
