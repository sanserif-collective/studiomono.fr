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
COPY apps/strapi/package.json apps/strapi/package.json
COPY apps/frontend/package.json apps/frontend/package.json
RUN --mount=type=cache,id=pnpm-strapi,target=/pnpm/store \
    --mount=type=cache,id=corepack-strapi,target=/root/.cache/node/corepack \
    pnpm config set store-dir /pnpm/store --global && \
    pnpm fetch

FROM deps AS build
COPY apps/strapi apps/strapi
RUN --mount=type=cache,id=pnpm-strapi,target=/pnpm/store \
    --mount=type=cache,id=corepack-strapi,target=/root/.cache/node/corepack \
    pnpm --filter @studiomono.fr/strapi install --frozen-lockfile --offline
RUN NODE_ENV=production pnpm --filter @studiomono.fr/strapi build
RUN pnpm --filter @studiomono.fr/strapi deploy --prod /app/pruned
RUN mkdir -p /app/pruned/.tmp && \
    rm -f /app/pruned/pnpm-lock.yaml /app/pruned/pnpm-workspace.yaml

FROM debian:trixie-slim AS tini
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends tini

FROM gcr.io/distroless/nodejs22-debian13:nonroot AS runtime
ENV NODE_ENV=production \
    PORT=1337 \
    TMPDIR=/tmp
WORKDIR /app
COPY --from=tini /usr/bin/tini /tini
COPY --from=build --chown=65532:65532 /app/pruned ./
EXPOSE 1337
ENTRYPOINT ["/tini", "--"]
CMD ["/nodejs/bin/node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
