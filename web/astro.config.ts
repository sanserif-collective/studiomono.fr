import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://sanserif.be',
  output: 'server',
  adapter: cloudflare(),
});
