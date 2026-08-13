import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import JSDOMRenderer from '@prerenderer/renderer-jsdom';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      renderer: new JSDOMRenderer({
        renderAfterTime: 2000,
        maxConcurrentRoutes: 4
      }),
      routes: [
        '/', 
        '/about', 
        '/contact', 
        '/services', 
        '/portfolio', 
        '/pricing', 
        '/technologies', 
        '/faqs', 
        '/privacy-policy',
        '/blog'
      ],
    })
  ],
  server: {
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:8000',
      '/media': 'http://localhost:8000'
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — always needed, smallest initial payload
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          // UI animation — framer-motion is large but used across all pages
          ui: ['framer-motion', 'lucide-react'],
          // Analytics — tiny, separate so it doesn't block rendering
          analytics: ['react-ga4'],
          // Auth — only needed on /dashboard and clerk-protected routes
          auth: ['@clerk/clerk-react'],
          // Smooth scroll — only used on public (non-admin) routes
          lenis: ['@studio-freight/lenis'],
        }
      }
    }
  }
});

