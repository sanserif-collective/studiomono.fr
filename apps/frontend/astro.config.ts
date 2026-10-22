import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  env: {
    schema: {
      // Secret server variables are read from the runtime environment instead
      // of being inlined into the build output. These are not application
      // secrets, but they must remain configurable per deployment.
      BASE_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      STRAPI_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      STRAPI_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      PLAUSIBLE_DOMAIN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      PLAUSIBLE_URL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
  server: {
    host: true,
  },
});
