# syntax=docker/dockerfile:1

FROM node:22-trixie-slim AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY patches patches
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/strapi/package.json apps/strapi/package.json
RUN --mount=type=cache,id=pnpm-frontend,target=/pnpm/store \
    --mount=type=cache,id=corepack-frontend,target=/root/.cache/node/corepack \
    pnpm config set store-dir /pnpm/store --global && \
    pnpm fetch

FROM deps AS build
COPY apps/frontend apps/frontend
RUN --mount=type=cache,id=pnpm-frontend,target=/pnpm/store \
    --mount=type=cache,id=corepack-frontend,target=/root/.cache/node/corepack \
    pnpm --filter @studiomono.fr/frontend install --frozen-lockfile --offline
# The URLs are build-time placeholders only: they are validated during the build
# but marked as secrets in the Astro env schema, so the runtime values are used.
RUN NODE_ENV=production \
    BASE_URL=http://build.invalid \
    STRAPI_URL=http://build.invalid/graphql \
    STRAPI_TOKEN=build-placeholder \
    pnpm --filter @studiomono.fr/frontend build
RUN pnpm --filter @studiomono.fr/frontend deploy --prod /app/pruned
RUN rm -f /app/pruned/pnpm-lock.yaml /app/pruned/pnpm-workspace.yaml

FROM debian:trixie-slim AS tini
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends tini

FROM gcr.io/distroless/nodejs22-debian13:nonroot AS runtime
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321 \
    TMPDIR=/tmp
WORKDIR /app
COPY --from=tini /usr/bin/tini /tini
COPY --from=build --chown=65532:65532 /app/pruned ./
EXPOSE 4321
ENTRYPOINT ["/tini", "--"]
CMD ["/nodejs/bin/node", "dist/server/entry.mjs"]
