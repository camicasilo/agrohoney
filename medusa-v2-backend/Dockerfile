FROM node:20.12-bookworm-slim AS base

FROM base AS deps
WORKDIR /opt/medusa/deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM base AS builder
WORKDIR /opt/medusa/build
COPY --from=deps /opt/medusa/deps/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
RUN apt-get update \
  && apt-get install --no-install-recommends -y tini=0.19.0-1+b3 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
USER node
WORKDIR /opt/medusa
COPY --from=builder --chown=node:node /opt/medusa/build .
EXPOSE 9000
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "run", "start"]
