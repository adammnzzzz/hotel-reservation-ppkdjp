import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Tambahin ini
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // 2. Pasang di sini
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    }
  }
})