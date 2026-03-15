import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

// Kita buat __dirname versi ESM biar gak error
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // Ini biar @/ beneran nembak ke folder src lo
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Polling ini bagus kalau lo pake OneDrive/Docker biar auto-refresh
    watch: {
      usePolling: true,
    }
  }
})