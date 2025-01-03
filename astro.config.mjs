import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpine from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  integrations: [alpine(), tailwind()]
});