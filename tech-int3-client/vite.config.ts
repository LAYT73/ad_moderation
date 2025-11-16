import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  preview: { allowedHosts: true },
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
        useFlatConfig: true,
      },
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'bundle_statistics.html',
    }) as any,
    tailwindcss(),
    react(),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    target: 'esnext',
    minify: mode === 'production' ? 'esbuild' : false,
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 500, // Снижаем порог предупреждений
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Mantine UI
          'mantine-core': ['@mantine/core', '@mantine/hooks'],

          // Icons (самый тяжелый пакет)
          icons: ['@tabler/icons-react'],

          // Charts
          charts: ['recharts'],

          // Animations
          animations: ['framer-motion'],

          // Data processing
          'data-utils': ['papaparse', 'jspdf', 'jspdf-autotable'],

          // API & State
          'api-state': ['@tanstack/react-query', 'axios', 'zod'],
        },
      },
    },
  },
  server: { hmr: { overlay: false } },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mantine/core',
      '@mantine/hooks',
      '@tanstack/react-query',
      'axios',
      'zod',
    ],
  },
}));
