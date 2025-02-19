import { app } from 'src/app';

export const GET = async () => {
  return new Response(
    JSON.stringify({
      name: app.global?.meta.title,
      short_name: app.global?.meta.title,
      description: app.global?.meta.description,
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      theme_color: '#EAEAEA',
      background_color: '#151515',
      icons: [
        {
          src: app.global?.favicon.main.data.attributes.url,
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: app.global?.favicon.main.data.attributes.url,
          type: 'image/png',
          sizes: '512x512',
        },
        {
          src: app.global?.favicon.main.data.attributes.url,
          type: 'image/png',
          sizes: '192x192',
          purpose: 'maskable',
        },
        {
          src: app.global?.favicon.main.data.attributes.url,
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable',
        },
      ],
    }),
  );
};
