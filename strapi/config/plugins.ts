export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CDN_URL'),
        accessKeyId: env('R2_ACCESS_KEY_ID'),
        secretAccessKey: env('R2_ACCESS_SECRET'),
        endpoint: env('R2_ENDPOINT'),
        region: 'auto',
        params: {
          Bucket: env('R2_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        jwtSecret: env('JWT_SECRET'),
        expiresIn: '30d',
      },
    },
  },
});
