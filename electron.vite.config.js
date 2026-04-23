import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@shared': resolve('src/shared'),
        '@utils': resolve('src/renderer/utils'),
        '@proxies': resolve('src/renderer/proxies'),
        '@store': resolve('src/main/store-compat.js'),
        '@package': resolve('package.json')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: 'src/renderer',
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      vuetify({
        autoImport: true,
        styles: 'none'
      })
    ],
    build: {
      rollupOptions: {
        input: {
          index: resolve('src/renderer/index.html'),
          webtorrent: resolve('src/renderer/webtorrent.html')
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        '@': resolve('src/renderer'),
        '@renderer': resolve('src/renderer'),
        '@main': resolve('src/main'),
        '@shared': resolve('src/shared'),
        '@store': resolve('src/renderer/store'),
        '@router': resolve('src/renderer/router'),
        '@plugins': resolve('src/renderer/plugins'),
        '@proxies': resolve('src/renderer/proxies'),
        '@transformers': resolve('src/renderer/transformers'),
        '@assets': resolve('src/renderer/assets'),
        '@components': resolve('src/renderer/components'),
        '@views': resolve('src/renderer/views'),
        '@layouts': resolve('src/renderer/layouts'),
        '@mixins': resolve('src/renderer/mixins'),
        '@utils': resolve('src/renderer/utils'),
        '@package': resolve('package.json')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables" as *;'
        }
      }
    }
  }
})
