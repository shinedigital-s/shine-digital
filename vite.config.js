import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Treat uppercase .MP4 files as static assets (same as lowercase .mp4)
  assetsInclude: ['**/*.MP4'],
})
