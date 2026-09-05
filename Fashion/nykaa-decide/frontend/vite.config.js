import { defineConfig } from 'vite';

// Frontend deploys to Vercel; the API lives on Render.
//
// In development the proxy below lets the app keep calling /api/... on the
// same origin, so VITE_API_BASE can stay empty locally.
// In production set VITE_API_BASE to the Render URL in Vercel's env settings.
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API || 'http://localhost:8731',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
