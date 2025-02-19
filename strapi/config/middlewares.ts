export default ({ env }) => [
  'strapi::errors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('ALLOWED_ORIGINS'),
    },
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', env('MEDIA_DOMAIN')],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', env('MEDIA_DOMAIN')],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
