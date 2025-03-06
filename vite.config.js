import { createVuePlugin } from 'vite-plugin-vue2';
import { defineConfig } from 'vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';


export default defineConfig({
  plugins: [createVuePlugin(), // Usa el plugin para Vue 2
    Components({
      resolvers: [
        // Vuetify
        VuetifyResolver(),
      ],
    })
  ],
  server: {
    watch: {
      usePolling: true, // Habilita esto si estás en Windows o usando WSL
    },
  },
});