const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS settings
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,https://admin.agrohoney.com";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,https://store.agrohoney.com";

// Database settings (Layer 1: Write DB / Layer 2: Read Replica if configured later via pg-bouncer)
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Redis settings (Layer 3: Cache and Event Bus)
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  // Layer 4: MeiliSearch (Lexical Search)
  {
    resolve: `medusa-plugin-meilisearch`,
    options: {
      config: {
        host: process.env.MEILISEARCH_HOST || "http://localhost:7700",
        apiKey: process.env.MEILISEARCH_API_KEY || "masterKey",
      },
      settings: {
        products: {
          indexSettings: {
            searchableAttributes: ["title", "description", "variant_sku"],
            displayedAttributes: ["title", "description", "variant_sku", "thumbnail", "handle"],
          },
          primaryKey: "id",
        },
      },
    },
  },
  // Layer 5 (Custom Integration): Qdrant Vector DB sync will be handled via Custom Subscribers
  // Storage: MinIO Configuration (S3 Compatible)
  {
    resolve: `medusa-file-minio`,
    options: {
        endpoint: process.env.MINIO_ENDPOINT || "http://localhost:9000",
        bucket: process.env.MINIO_BUCKET || "agrohoney-assets",
        access_key_id: process.env.MINIO_ACCESS_KEY || "minioadmin",
        secret_access_key: process.env.MINIO_SECRET_KEY || "minioadmin",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: false,
        port: 7001,
      },
    },
  },
];

const modules = {
  // Use Redis for Event Bus
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  // Use Redis for Cache
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
