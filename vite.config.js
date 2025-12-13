
import { defineConfig } from 'vite';

export default defineConfig({
  // This configuration ensures that the 'public' directory is copied to the
  // build output directory ('dist'). This is the default Vite behavior,
  // but this file makes it explicit. The JSON data files are located in
  // 'public/' and are fetched by the application at runtime.
  build: {
    copyPublicDir: true,
  },
});
