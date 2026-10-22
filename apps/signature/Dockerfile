# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY patches patches
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/signature/package.json apps/signature/package.json
COPY apps/strapi/package.json apps/strapi/package.json
RUN --mount=type=cache,id=pnpm-signature,target=/pnpm/store \
    --mount=type=cache,id=corepack-signature,target=/root/.cache/node/corepack \
    pnpm config set store-dir /pnpm/store --global && \
    pnpm fetch

FROM deps AS build
COPY apps/signature apps/signature
RUN --mount=type=cache,id=pnpm-signature,target=/pnpm/store \
    --mount=type=cache,id=corepack-signature,target=/root/.cache/node/corepack \
    pnpm --filter @sanserif.be/signature install --frozen-lockfile --offline
RUN NODE_ENV=production pnpm --filter @sanserif.be/signature build

FROM debian:bookworm-slim AS tini
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends tini

FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runtime
ENV NODE_ENV=production \
    PORT=3000 \
    TMPDIR=/tmp
WORKDIR /app
COPY --from=tini /usr/bin/tini /tini
COPY --from=build --chown=65532:65532 /app/apps/signature/dist ./dist
COPY --from=build --chown=65532:65532 /app/apps/signature/dist-server ./dist-server
EXPOSE 3000
ENTRYPOINT ["/tini", "--"]
CMD ["/nodejs/bin/node", "dist-server/server.js"]
