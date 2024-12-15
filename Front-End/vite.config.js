import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chakra: ['@chakra-ui/react'],
          axios: ['axios'],
          vendor: ['react', 'react-dom'],
        }
      }
    }
  }
})
