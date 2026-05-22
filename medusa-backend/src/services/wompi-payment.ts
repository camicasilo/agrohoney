import { PaymentService } from "medusa-interfaces"

class WompiPaymentService extends PaymentService {
  static identifier = "wompi"

  constructor(options) {
    super()
    this.options_ = options
  }

  async getStatus(paymentData) {
    if (paymentData.status === "APPROVED") {
      return "authorized"
    }
    return "pending"
  }

  async getPaymentData(cart) {
    // Generamos un identificador de sesión para Wompi
    return {
      reference: `AGRO-${cart.id}-${Date.now()}`,
      amount: cart.total,
      currency: cart.region.currency_code,
    }
  }

  async authorizePayment(cart, payment, context) {
    // Validamos el estado que retorna Wompi (normalmente manejado vía Webhooks)
    return {
      status: "authorized",
      data: {
        ...payment.data,
        wompi_transaction_id: "mock_txn_123",
      },
    }
  }

  async getPaymentDataFromSession(session) {
    return session.data
  }

  async updatePaymentData(sessionData, update) {
    return {
      ...sessionData,
      ...update.data,
    }
  }

  async deletePayment(payment) {
    return
  }

  async capturePayment(payment) {
    return {
      status: "captured",
      data: payment.data,
    }
  }

  async refundPayment(payment, refundAmount) {
    // Llamada a la API de Wompi para Void/Refund
    return {
      status: "refunded",
      data: payment.data,
    }
  }

  async cancelPayment(payment) {
    return {
      status: "canceled",
      data: payment.data,
    }
  }
}

export default WompiPaymentService
