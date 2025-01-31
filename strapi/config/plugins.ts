export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('S3_BASE_URL', 'http://127.0.0.1:4566/sanserif'),
        accessKeyId: env('S3_ACCESS_KEY_ID', 'test'),
        secretAccessKey: env('S3_ACCESS_SECRET', 'test'),
        endpoint: env('S3_ENDPOINT', 'http://storage:4566'),
        region: env('S3_REGION', 'auto'),
        forcePathStyle: env.bool('S3_FORCE_PATH_STYLE', true),
        params: {
          Bucket: env('S3_BUCKET_NAME', 'sanserif'),
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
