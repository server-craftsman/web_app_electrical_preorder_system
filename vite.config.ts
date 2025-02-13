import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('@src/app')) {
            return 'app';
          }
          if (id.includes('@src/components')) {
            return 'components';
          }
          if (id.includes('@src/contexts')) {
            return 'context';
          }
          if (id.includes('@src/const')) {
            return 'const';
          }
          if (id.includes('@src/utils')) {
            return 'utils';
          }
          if (id.includes('@src/routes')) {
            return 'routes';
          }
          if (id.includes('@src/hooks')) {
            return 'hooks';
          }
          if (id.includes('@src/pages')) {
            return 'pages';
          }
          if (id.includes('@src/layout')) {
            return 'layout';
          }
          if (id.includes('@src/models')) {
            return 'models';
          }
          if (id.includes('@src/services')) {
            return 'services';
          }
        },
      },
      // debug lottie warning
      onwarn(warning, warn) {
        // Suppress eval warnings
        if (warning.code === 'EVAL') return;
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 10000,
  },
});
