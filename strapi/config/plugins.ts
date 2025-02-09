export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('S3_BASE_URL'),
        accessKeyId: env('S3_ACCESS_KEY_ID'),
        secretAccessKey: env('S3_ACCESS_SECRET'),
        endpoint: env('S3_ENDPOINT'),
        region: env('S3_REGION', 'auto'),
        forcePathStyle: env.bool('S3_FORCE_PATH_STYLE', true),
        params: {
          Bucket: env('S3_BUCKET_NAME'),
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
