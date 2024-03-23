import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { loadEnv } from 'vite';

const { BASE_URL } = loadEnv(process.env.NODE_ENV!, process.cwd(), '');

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: BASE_URL,
  output: 'server',
  adapter: cloudflare(),
});
