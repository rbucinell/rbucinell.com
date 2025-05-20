import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import alpine from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  integrations: [alpine()]
});