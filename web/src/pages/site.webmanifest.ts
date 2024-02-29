import { Resize } from '@cloudinary/url-gen/actions';
import { app } from 'src/app';
import { cloudinary } from 'src/cloudinary';

export const GET = async () => {
  const favicon = cloudinary.image(
    app.global?.favicon.main.data.attributes.provider_metadata.public_id,
  );

  const f192 = favicon.resize(Resize.thumbnail(192, 192)).format('png');
  const f512 = favicon.resize(Resize.thumbnail(512, 512)).format('png');

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
          src: f192.toURL(),
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: f512.toURL(),
          type: 'image/png',
          sizes: '512x512',
        },
        {
          src: f192.toURL(),
          type: 'image/png',
          sizes: '192x192',
          purpose: 'maskable',
        },
        {
          src: f512.toURL(),
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable',
        },
      ],
    }),
  );
};
