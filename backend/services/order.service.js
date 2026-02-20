import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.model.js'

/**
 * Obtiene todas las órdenes del sistema con información del usuario.
 * Utilizado en el panel administrativo para gestión de pedidos.
 * @returns {Promise<Array>} Lista de órdenes ordenadas por fecha descendente
 */
export const getAllOrders = async () => {
  // populate('user', 'name'): incluye solo el nombre del usuario que hizo la orden
  // sort({ createdAt: -1 }): ordena por fecha de creación, más recientes primero
  return await Order.find().populate('user', 'name').sort({ createdAt: -1 })
}

/**
 * Crea una nueva orden y actualiza automáticamente el inventario de productos.
 * Realiza validaciones de stock y disponibilidad antes de confirmar la orden.
 * @param {Object} orderData - Datos completos de la orden del frontend
 * @param {Array} orderData.orderItems - Lista de productos con cantidades
 * @param {Object} orderData.shippingAddress - Dirección de envío
 * @param {string} orderData.paymentMethod - Método de pago elegido
 * @param {number} orderData.itemsPrice - Subtotal de productos
 * @param {number} orderData.shippingPrice - Costo de envío
 * @param {number} orderData.savingsPrice - Descuentos aplicados
 * @param {number} orderData.totalPrice - Total final a pagar
 * @param {string} userId - ID del usuario autenticado que crea la orden
 * @returns {Promise<Object>} Orden creada y guardada en BD
 * @throws {Error} Si producto no existe o no hay stock suficiente
 */
export const createOrder = async (orderData, userId) => {
  // Normaliza los items de la orden para asegurar consistencia
  const orderItems = orderData.orderItems.map((item) => ({
    ...item,
    product: item._id || item.product // Maneja diferentes formatos de ID
  }))

  // Crea la instancia de orden pero aún no la guarda
  const newOrder = new Order({
    orderItems,
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod,
    itemsPrice: orderData.itemsPrice,
    shippingPrice: orderData.shippingPrice,
    savingsPrice: orderData.savingsPrice,
    totalPrice: orderData.totalPrice,
    user: userId
  })

  // Actualización de inventario y validaciones críticas
  for (const item of orderItems) {
    const product = await Product.findById(item.product)

    // Validación: el producto debe existir
    if (!product) {
      throw new Error(`Producto no encontrado: ${item.name}`)
    }

    // Validación: debe haber stock suficiente
    if (product.stock < item.quantity) {
      throw new Error(`Stock insuficiente para: ${item.name}`)
    }

    // Actualiza el stock del producto (resta la cantidad comprada)
    product.stock -= item.quantity
    await product.save()
  }

  // Solo guarda la orden si todas las validaciones pasaron
  return await newOrder.save()
}

/**
 * Genera un resumen estadístico completo para el dashboard administrativo.
 * Incluye métricas de órdenes, usuarios, productos y análisis temporal.
 * @returns {Promise<Object>} Objeto con todas las estadísticas agregadas
 */
export const getOrderSummary = async () => {
  // Agregación de MongoDB: agrupa todos los documentos y calcula totales
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null, // Agrupa todos los documentos
        numOrders: { $sum: 1 }, // Cuenta total de órdenes
        totalSales: { $sum: '$totalPrice' } // Suma total de ventas
      }
    }
  ])

  // Total de usuarios registrados
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 }
      }
    }
  ])

  // Total de productos en catálogo
  const products = await Product.aggregate([
    {
      $group: {
        _id: null,
        numProducts: { $sum: 1 }
      }
    }
  ])

  // Análisis de órdenes por día para gráficos de tendencias
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, // Agrupa por fecha
        orders: { $sum: 1 }, // Órdenes por día
        sales: { $sum: '$totalPrice' } // Ventas por día
      }
    },
    { $sort: { _id: 1 } } // Ordena por fecha ascendente
  ])

  // Distribución de productos por categoría
  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    }
  ])

  return { users, products, orders, dailyOrders, productCategories }
}

/**
 * Obtiene todas las órdenes de un usuario específico.
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Array>} Lista de órdenes del usuario
 */
export const getUserOrders = async (userId) => {
  return await Order.find({ user: userId })
}

/**
 * Obtiene una orden específica por su ID.
 * @param {string} orderId - ID único de la orden
 * @returns {Promise<Object|null>} Orden encontrada o null
 */
export const getOrderById = async (orderId) => {
  return await Order.findById(orderId)
}

/**
 * Actualiza una orden marcándola como pagada con información del pago.
 * Se ejecuta después de confirmar el pago con el proveedor externo.
 * @param {string} orderId - ID de la orden a actualizar
 * @param {Object} paymentResult - Información del pago del proveedor
 * @param {string} paymentResult.id - ID de transacción
 * @param {string} paymentResult.status - Estado del pago
 * @param {string} paymentResult.update_time - Timestamp del pago
 * @param {string} paymentResult.email_address - Email del pagador
 * @returns {Promise<Object>} Orden actualizada
 * @throws {Error} Si la orden no existe
 */
export const updateOrderToPaid = async (orderId, paymentResult) => {
  const order = await Order.findById(orderId)

  if (order) {
    // Actualiza los campos relacionados con el pago
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = paymentResult
    return await order.save()
  }

  throw new Error('Order not found')
}

/**
 * Actualiza una orden marcándola como entregada.
 * Solo administradores pueden ejecutar esta acción.
 * @param {string} orderId - ID de la orden a marcar como entregada
 * @returns {Promise<Object>} Orden actualizada
 * @throws {Error} Si la orden no existe
 */
export const updateOrderToDelivered = async (orderId) => {
  const order = await Order.findById(orderId)

  if (order) {
    // Marca la orden como entregada con timestamp
    order.isDelivered = true
    order.deliveredAt = Date.now()
    return await order.save()
  }

  throw new Error('Order not found')
}

/**
 * Elimina permanentemente una orden del sistema.
 * Solo administradores pueden eliminar órdenes.
 * @param {string} orderId - ID de la orden a eliminar
 * @throws {Error} Si la orden no existe
 */
export const deleteOrder = async (orderId) => {
  const order = await Order.findById(orderId)

  if (!order) throw new Error('Order not found')

  // deleteOne() elimina el documento de la base de datos
  await order.deleteOne()
}
