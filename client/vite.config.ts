import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0', // Allow external access
    port: Number(process.env.PORT) || 4173, // Use the port Render provides or default to 4173
  }
})
