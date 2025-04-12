import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '@components': path.resolve('./src/components'),
      '@routes': path.resolve('./src/routes'),
      '@utils': path.resolve('./src/utils')
    }
  }
};

export default config;
