import { createVuePlugin } from 'vite-plugin-vue2';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [createVuePlugin()], // Usa el plugin para Vue 2
  server: {
    watch: {
      usePolling: true, // Habilita esto si estás en Windows o usando WSL
    },
  },
});