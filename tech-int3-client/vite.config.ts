import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  preview: { allowedHosts: true },
  plugins: [
    svgr({ include: '**/*.svg' }),
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
    minify: mode === 'production' ? 'esbuild' : false,
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 1000,
  },
  server: { hmr: { overlay: false } },
}));
