import mongoose from 'mongoose'

/**
 * SCHEMA DE ITEMS DE ORDEN
 * Representa cada producto individual dentro de una orden
 * Una orden puede tener múltiples items (carrito de compras)
 */
const orderItemSchema = new mongoose.Schema({
  link: { type: String, required: true }, // URL amigable del producto (ej: "iphone-14")
  name: { type: String, required: true }, // Nombre del producto
  quantity: { type: Number, required: true }, // Cantidad ordenada
  images: [{ type: String }], // Array de URLs de imágenes del producto
  price: { type: Number, required: true }, // Precio unitario al momento de la compra
  product: { // Referencia al producto original
    type: mongoose.Schema.Types.ObjectId, // ID del producto en la colección Products
    ref: 'Product', // Indica que referencia el modelo Product
    required: true
  }
})

/**
 * SCHEMA PRINCIPAL DE ORDEN
 * Estructura completa de un pedido/orden
 */
const orderSchema = new mongoose.Schema(
  {
    // Array de productos en esta orden
    orderItems: [orderItemSchema],

    // Información de envío
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, minlenght: 10, maxlenght: 10, require: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },

    // Método de pago seleccionado (PayPal, tarjeta, etc.)
    paymentMethod: { type: String, required: true },

    // Información de pago de PayPal (se llena cuando se procesa el pago)
    paymentResult: {
      id: String, // ID de transacción de PayPal
      status: String, // Estado del pago (COMPLETED, PENDING, etc.)
      update_time: String, // Última actualización del pago
      email_address: String // Email del pagador en PayPal
    },

    // Cálculos de precios
    itemsPrice: { type: Number, required: true }, // Subtotal de productos
    shippingPrice: { type: Number, required: true }, // Costo de envío
    savingsPrice: { type: Number, required: true }, // Descuentos aplicados
    totalPrice: { type: Number, required: true }, // Total final a pagar

    // Usuario que hizo la orden
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Estados de la orden
    isPaid: { type: Boolean, default: false }, // ¿Ya está pagado?
    paidAt: { type: Date }, // Fecha de pago
    isDelivered: { type: Boolean, default: false }, // ¿Ya se entregó?
    deliveredAt: { type: Date } // Fecha de entrega
  },
  {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
  }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
