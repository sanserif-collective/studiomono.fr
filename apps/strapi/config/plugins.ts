import { resolve } from 'node:path';

export default ({ env }) => {
  // Local development uses Mailpit over SMTP, production sends through the
  // Cloudflare Email Service REST API (Hetzner blocks SMTP ports 25 and 465).
  const emailProvider = env(
    'EMAIL_PROVIDER',
    env('NODE_ENV') === 'production' ? 'cloudflare' : 'nodemailer',
  );

  return {
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
        provider:
          emailProvider === 'cloudflare'
            ? resolve(__dirname, '../src/providers/email-cloudflare')
            : emailProvider,
        providerOptions:
          emailProvider === 'cloudflare'
            ? {
                accountId: env('CLOUDFLARE_ACCOUNT_ID'),
                apiToken: env('CLOUDFLARE_EMAIL_API_TOKEN'),
              }
            : {
                host: env('SMTP_HOST'),
                port: env.int('SMTP_PORT', 587),
                secure: env.bool('SMTP_SECURE', false),
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
  };
};
