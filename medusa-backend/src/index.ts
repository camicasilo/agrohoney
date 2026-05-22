import express from "express"
import { GracefulShutdownServer } from "medusa-core-utils"

const PORT = process.env.PORT || 9000

const start = async () => {
  const app = express()

  const loaders = await import("@medusajs/medusa/dist/loaders/index")

  const { container, dbConnection } = await loaders.default({
    directory: process.cwd(),
    expressApp: app
  })

  const server = GracefulShutdownServer.create(
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  )

  // Handle graceful shutdown
  const gracefulShutDown = () => {
    server
      .shutdown()
      .then(() => {
        console.info("Gracefully stopping the server.")
        process.exit(0)
      })
      .catch((e) => {
        console.error("Error received when shutting down the server.", e)
        process.exit(1)
      })
  }

  process.on("SIGTERM", gracefulShutDown)
  process.on("SIGINT", gracefulShutDown)
}

start()
