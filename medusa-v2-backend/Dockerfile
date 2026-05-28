ARG NODE_VERSION=22.14
FROM node:${NODE_VERSION}-bookworm-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++

FROM base AS deps
WORKDIR /opt/medusa/deps
COPY package.json yarn.lock .yarnrc.yml* ./
COPY .yarn ./.yarn
RUN corepack enable yarn && yarn install --immutable

FROM base AS builder
WORKDIR /opt/medusa/build
COPY --from=deps /opt/medusa/deps .
COPY . .
RUN corepack enable yarn && yarn run build

# Verificación de que el admin se construyó
RUN test -f /opt/medusa/build/.medusa/server/public/admin/index.html || \
    (echo "ERROR: Admin UI no se generó" && exit 1)

FROM base AS runner
RUN apt-get update \
  && apt-get install --no-install-recommends -y tini=0.19.0-1+b3 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
WORKDIR /opt/medusa
# Copiar archivos de dependencias desde el builder
COPY --from=builder --chown=node:node /opt/medusa/build/package.json .
COPY --from=builder --chown=node:node /opt/medusa/build/yarn.lock .
COPY --from=builder --chown=node:node /opt/medusa/build/.yarn ./.yarn
# Instalar SOLO dependencias de producción (como root)
RUN corepack enable yarn && yarn install --immutable --production
# Copiar artefactos del build (sin node_modules)
COPY --from=builder --chown=node:node /opt/medusa/build/.medusa ./.medusa
RUN test -f /opt/medusa/.medusa/server/medusa-config.js || (echo "ERROR: medusa-config.js no encontrado" && exit 1)
# Cambiar a usuario node
ENV MEDUSA_CONFIG_PATH=/opt/medusa/.medusa/server/medusa-config.js
USER node
ARG PORT=9000
ARG NODE_ENV=production
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
EXPOSE $PORT
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "start"]