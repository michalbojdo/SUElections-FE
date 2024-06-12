import { fileURLToPath, URL } from 'node:url'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    extensions: [".ts",".vue"],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@types':fileURLToPath(new URL('./src/types/types.ts', import.meta.url)),
      '@views':fileURLToPath(new URL('./src/views', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url))
    }
  }
})
