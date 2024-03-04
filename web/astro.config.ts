import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://sanserif.be',
  output: 'server',
  adapter: vercel({
    functionPerRoute: true,
  }),
});
