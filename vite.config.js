import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons':  ['react-icons'],
          'vendor-i18n':   ['i18next', 'react-i18next'],
          'vendor-ogl':    ['ogl'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
        },
      },
    },
  },
})
