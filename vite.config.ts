import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import adminApiPlugin from './vite-plugin-admin-api'

export default defineConfig({
  base: '/CapEnergieVitrineONG/',
  plugins: [
    vue(),
    tailwindcss(),
    adminApiPlugin(),
  ],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
