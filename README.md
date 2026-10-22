# sanserif.be

Monorepo for the Sanserif website: an Astro frontend, a Strapi CMS and the
signature generator.

## Requirements

- [devenv](https://devenv.sh/) with Nix

The whole repository runs on Node.js 22 LTS. Strapi 4 does not support newer
Node.js versions yet.

## Local development

```sh
cp .env.example .env
cp apps/strapi/.env.example apps/strapi/.env
cp apps/frontend/.env.example apps/frontend/.env

devenv shell -- pnpm install
devenv up
```

The root `.env` contains the shared local infrastructure settings (database,
S3/MinIO, SMTP for Mailpit). App-specific secrets stay in `apps/*/.env`. devenv
loads the root `.env` into the shell, and Compose passes it to Strapi as well.

`devenv up` starts:

| Service   | URL                   |
| --------- | --------------------- |
| Frontend  | http://localhost:4321 |
| Signature | http://localhost:5173 |
| Strapi    | http://localhost:1337 |
| Mailpit   | http://localhost:8025 |
| MinIO     | http://localhost:9000 |
| MinIO UI  | http://localhost:9001 |

MinIO credentials are `root` / `rootroot`. The `strapi-media` bucket is created
automatically and is publicly readable. MinIO is explicitly allowed as an
insecure package in `devenv.yaml` because it is only used for local development.

Run `devenv down` to stop everything.

Strapi 4 uses React 18, while signature uses React 19. Their versions stay
app-specific because Strapi 4 validates direct dependency versions as semver
and does not accept pnpm's `catalog:` protocol.

## Commands

```sh
pnpm dev          # Run all apps (requires Postgres, MinIO and Mailpit)
pnpm build        # Build all apps
pnpm lint         # oxlint
pnpm lint:fix     # oxlint with fixes
pnpm format       # oxfmt
pnpm format:check # Check formatting
```

## Production

Each app has its own Dockerfile:

- `apps/strapi/Dockerfile` — Node 22 build, distroless runtime
- `apps/frontend/Dockerfile` — Node 22 build, distroless runtime
- `apps/signature/Dockerfile` — Node 22 build, TypeScript static server, distroless runtime

All images use multi-stage builds, tini and a non-root user. The frontend is
served by the Astro Node adapter on port 4321, and the signature app is served
by a small Node static server on port 3000. Both must be reachable through the
Cloudflare tunnel; the tunnel configuration is managed outside this repository.
The signature app builds its logo URL from the current browser origin, so it
works on staging and production without a hardcoded domain.

```sh
docker compose build
docker compose up -d
```

Production environment files are expected at `.env`, `apps/strapi/.env` and
`apps/frontend/.env`. Compose passes both the root `.env` and the Strapi `.env`
to the Strapi container, with the app file taking precedence. Database
variables are named `DATABASE_*` in the root `.env`. The frontend `STRAPI_URL`
is read from `apps/frontend/.env`; when running the frontend in Docker, point it
to a unique Strapi hostname (for example the container name
`http://sanserif-strapi-app:1337/graphql`) or to its public URL.

### Email

In production Strapi sends emails through the
[Cloudflare Email Service](https://developers.cloudflare.com/email-service/)
REST API over HTTPS, so no outbound SMTP access is needed (Hetzner blocks ports
25 and 465). The sending domain must be onboarded for Email Sending in the
Cloudflare dashboard, and `apps/strapi/.env` must define:

- `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID.
- `CLOUDFLARE_EMAIL_API_TOKEN` — an API token with the **Email Sending: Edit**
  permission.

`MAILER_EMAIL` (from the root `.env`) sets the sender address and must use the
onboarded domain. Locally, Strapi defaults to the nodemailer provider pointing
at Mailpit because `NODE_ENV` is not `production`. Set `EMAIL_PROVIDER` to
`cloudflare` or `nodemailer` to override the choice explicitly.

Compose also expects the external networks `cloudflared-net` and
`backup-scheduler-net` to exist.
