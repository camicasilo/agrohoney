ARG NODE_VERSION=22.14
FROM node:${NODE_VERSION}-bookworm-slim AS base

FROM base AS installer
WORKDIR /opt/medusa/install
RUN npm install -g bun
COPY package.json yarn.lock .yarnrc.yml* ./
COPY .yarn ./.yarn
RUN bun install --yarn

FROM base AS builder
WORKDIR /opt/medusa/build
COPY --from=installer /opt/medusa/install/node_modules ./node_modules
COPY --from=installer /opt/medusa/install/package.json .
COPY --from=installer /opt/medusa/install/yarn.lock .
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
RUN corepack enable yarn && yarn workspaces focus --production
# Copiar artefactos del build (sin node_modules)
COPY --from=builder --chown=node:node /opt/medusa/build/.medusa ./.medusa
RUN test -f /opt/medusa/.medusa/server/medusa-config.js || (echo "ERROR: medusa-config.js no encontrado" && exit 1)
# Cambiar a usuario node
ENV MEDUSA_CONFIG_PATH=/opt/medusa/.medusa/server/medusa-config.js
USER node
ARG PORT=9000
ENV PORT=$PORT
EXPOSE $PORT
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "start"]