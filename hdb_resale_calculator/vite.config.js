import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['bootstrap']
  },
  server: {
    // Listen on all network interfaces and use the PORT environment variable
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  }
});