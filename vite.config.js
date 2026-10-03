import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative assets work at both a domain root and a Pages repository path.
  base: './',
  plugins: [react()],
})
