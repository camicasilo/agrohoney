import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.MEDUSA_DATABASE_URL || process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: {
        ssl: false,
      },
      pool: {
        min: 2,
        max: 5,
        idleTimeoutMillis: 30000,
      }
    },
    redisUrl: process.env.MEDUSA_REDIS_URL || process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: false,
  }
})
