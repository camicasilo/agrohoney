import { FulfillmentService } from "medusa-interfaces"

class EnviaFulfillmentService extends FulfillmentService {
  options: any
  static identifier = "envia-com"

  constructor(options) {
    super()
    this.options = options
  }

  async getFulfillmentOptions() {
    return [
      {
        id: "envia-standard",
        name: "Envía.com Standard",
      },
      {
        id: "envia-express",
        name: "Envía.com Express",
      },
    ]
  }

  async validateOption(data) {
    return true
  }

  async validateFulfillmentData(optionData, data, cart) {
    return {
      ...data,
    }
  }

  async createFulfillment(methodData, fulfillmentItems, fromOrder, fulfillment) {
    // Aquí iría la lógica HTTP (axios/fetch) hacia la API de Envia.com
    // para generar la guía (waybill) usando los datos de 'fromOrder'
    console.log(`[ENVIA-API] Generando guía para la orden: ${fromOrder.id}`)

    return {
      tracking_number: `ENV-${Date.now()}`,
      label_url: "https://envia.com/label/mock",
    }
  }

  async canCalculate(data) {
    return true
  }

  async calculatePrice(optionData, data, cart) {
    // Aquí se cotiza dinámicamente con envia.com usando el código postal del 'cart'
    console.log(`[ENVIA-API] Cotizando envío para el carrito: ${cart.id}`)
    return optionData.id === "envia-express" ? 15000 : 8000
  }
}

export default EnviaFulfillmentService
