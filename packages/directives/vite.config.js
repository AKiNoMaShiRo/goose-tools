import {fileURLToPath ,URL} from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./main.js', import.meta.url)),
      formats: ['es', 'cjs'],
      name: 'goose-tools-directives'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
      ],
      vueTemplate: true,
    }),
  ],
})
