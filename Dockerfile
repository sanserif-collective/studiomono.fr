FROM node:20-alpine AS base
ENV NODE_ENV production

FROM base AS build
WORKDIR /app

RUN npm i -g pnpm

COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch

COPY pnpm-workspace.yaml package.json .npmrc .
COPY strapi strapi
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm --filter strapi i --frozen-lockfile

RUN pnpm --filter strapi build
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm --filter strapi deploy --prod pruned

FROM base
USER node
WORKDIR /app

COPY --from=build /app/pruned .
EXPOSE 1337

CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
