export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('S3_BASE_URL'),
        s3Options: {
          credentials: {
            accessKeyId: env('S3_ACCESS_KEY_ID'),
            secretAccessKey: env('S3_ACCESS_SECRET'),
          },
          endpoint: env('S3_ENDPOINT'),
          region: env('S3_REGION', 'auto'),
          forcePathStyle: env.bool('S3_FORCE_PATH_STYLE', true),
          params: {
            Bucket: env('S3_BUCKET_NAME'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT'),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('MAILER_EMAIL'),
        defaultReplyTo: env('MAILER_EMAIL'),
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
