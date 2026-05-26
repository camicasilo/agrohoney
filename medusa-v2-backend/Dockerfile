ARG NODE_VERSION=22.14
FROM node:${NODE_VERSION}-bookworm-slim AS base

FROM base AS deps
WORKDIR /opt/medusa/deps
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
ENV PNPM_APPROVE_BUILDS=true
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /opt/medusa/build
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN npm install -g pnpm
COPY --from=deps /opt/medusa/deps/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base AS runner
RUN apt-get update \
  && apt-get install --no-install-recommends -y tini=0.19.0-1+b3 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN npm install -g pnpm
USER node
WORKDIR /opt/medusa
COPY --from=builder --chown=node:node /opt/medusa/build .
COPY --from=builder --chown=node:node /opt/medusa/build/.medusa ./.medusa
ARG PORT=9000
ARG NODE_ENV=production
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
EXPOSE $PORT
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["pnpm", "run", "start"]
