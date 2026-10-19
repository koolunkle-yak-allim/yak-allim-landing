import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // GitHub Pages에서는 https://koolunkle-yak-allim.github.io/yak-allim-landing/ 아래에서 열린다.
  base: '/yak-allim-landing/',
});
