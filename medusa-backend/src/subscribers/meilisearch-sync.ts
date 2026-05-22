import {
  type SubscriberConfig,
  type SubscriberArgs,
  ProductService,
} from "@medusajs/medusa"

export default async function meiliSearchSync({
  data, eventName, container, pluginOptions,
}: SubscriberArgs<Record<string, any>>) {
  // Nota: Medusa ya tiene un plugin oficial para MeiliSearch (@medusajs/plugin-meilisearch).
  // Este subscriber adicional se puede usar para transformaciones complejas antes
  // de enviar a MeiliSearch, o para índices personalizados.

  const productService: ProductService = container.resolve("productService")

  try {
    const product = await productService.retrieve(data.id)
    console.log(`[MEILISEARCH-SYNC] Producto ${product.id} detectado en evento ${eventName}. Delegando indexación léxica...`)
  } catch(error) {
    console.error(`[MEILISEARCH-SYNC-ERROR] Error al recuperar producto: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: [
    "product.created",
    "product.updated",
    "product.deleted",
  ],
  context: {
    subscriberId: "meilisearch-sync-handler",
  },
}
