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
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"', useFlatConfig: true },
    }),
    visualizer({ open: false, gzipSize: true, brotliSize: true }) as any,
    tailwindcss(),
    react(),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    target: 'esnext',
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 1000,
  },
  server: { hmr: { overlay: false } },
}));
