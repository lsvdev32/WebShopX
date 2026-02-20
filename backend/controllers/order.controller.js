import * as orderService from '../services/order.service.js'

/**
 * Obtiene todas las órdenes del sistema (solo para administradores).
 * Endpoint: GET /orders
 * Requiere permisos de administrador
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista completa de todas las órdenes o mensaje de error
 */
export const getAllOrders = async (req, res) => {
  try {
    // Obtiene todas las órdenes de todos los usuarios (vista administrativa)
    const orders = await orderService.getAllOrders()

    // res.json() es equivalente a res.send() pero garantiza formato JSON
    res.json(orders)
  } catch (error) {
    // Error del servidor al obtener las órdenes
    res.status(500).json({ message: error.message })
  }
}

/**
 * Crea una nueva orden de compra para el usuario autenticado.
 * Endpoint: POST /orders
 * Requiere autenticación: el usuario debe estar logueado
 * @param {Object} req - Contiene los datos de la orden en req.body y usuario en req.user
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Orden creada con mensaje de confirmación o error
 */
export const createOrder = async (req, res) => {
  try {
    // Verificación doble de autenticación (seguridad adicional)
    // req.user es agregado por el middleware de autenticación
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    // req.body típicamente contiene: productos, cantidades, dirección, método de pago, etc.
    const order = await orderService.createOrder(req.body, req.user._id)

    // Estado 201: recurso creado exitosamente
    res.status(201).json({ message: '¡Nueva orden creada!', order })
  } catch (error) {
    // Log del error para debugging en el servidor
    console.error('Error creating order:', error)

    // Lógica condicional para determinar el código de estado apropiado
    // Si el error contiene "No autorizado" -> 401, sino -> 500
    res
      .status(error.message.includes('No autorizado') ? 401 : 500)
      .json({ message: error.message || 'Error al crear la orden' })
  }
}

/**
 * Obtiene un resumen estadístico de todas las órdenes (dashboard administrativo).
 * Endpoint: GET /orders/summary
 * Útil para mostrar métricas como: total de órdenes, ingresos, órdenes pendientes, etc.
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Objeto con estadísticas y métricas de órdenes
 */
export const getOrderSummary = async (req, res) => {
  try {
    // El servicio calcula estadísticas agregadas de las órdenes
    // Ejemplo: { totalOrders: 150, totalRevenue: 25000, pendingOrders: 5 }
    const summary = await orderService.getOrderSummary()

    res.json(summary)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene todas las órdenes del usuario autenticado.
 * Endpoint: GET /orders/my-orders
 * Requiere autenticación: solo muestra órdenes del usuario logueado
 * @param {Object} req - Contiene req.user._id del usuario autenticado
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista de órdenes del usuario o mensaje de error
 */
export const getUserOrders = async (req, res) => {
  try {
    // Filtra órdenes por ID de usuario para privacidad y seguridad
    const orders = await orderService.getUserOrders(req.user._id)

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene una orden específica por su ID.
 * Endpoint: GET /orders/:id
 * @param {Object} req - Contiene el ID de la orden en req.params.id
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos completos de la orden o mensaje de error
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id)

    // Verifica si la orden existe en la base de datos
    if (order) {
      res.json(order)
    } else {
      // Orden no encontrada con el ID proporcionado
      res.status(404).json({ message: '¡Orden no encontrada!' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Actualiza el estado de una orden a "pagada" con información del pago.
 * Endpoint: PUT /orders/:id/pay
 * Se ejecuta después de confirmar el pago con el proveedor (PayPal, Stripe, etc.)
 * @param {Object} req - Contiene ID de orden en params y detalles de pago en body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Orden actualizada con información de pago
 */
export const updateOrderToPaid = async (req, res) => {
  try {
    // Estructura los datos de pago que se guardarán en la orden
    const updatedOrder = await orderService.updateOrderToPaid(req.params.id, {
      id: req.body.id, // ID de transacción del proveedor de pago
      status: req.body.status, // Estado del pago (ej: "COMPLETED")
      update_time: req.body.update_time, // Timestamp del pago
      email_address: req.body.payer.email_address // Email del pagador
    })

    res.json({ message: 'Orden pagada.', order: updatedOrder })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Actualiza el estado de una orden a "entregada".
 * Endpoint: PUT /orders/:id/deliver
 * Solo administradores pueden marcar órdenes como entregadas
 * @param {Object} req - Contiene ID de orden y posibles datos de entrega
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Orden actualizada con estado de entrega
 */
export const updateOrderToDelivered = async (req, res) => {
  try {
    // req.body puede contener: fecha de entrega, empresa de envío, número de seguimiento, etc.
    const order = await orderService.updateOrderToDelivered(req.params.id, req.body)

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Elimina una orden del sistema.
 * Endpoint: DELETE /orders/:id
 * Solo administradores pueden eliminar órdenes
 * @param {Object} req - Contiene el ID de la orden a eliminar
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Mensaje de confirmación de eliminación
 */
export const deleteOrder = async (req, res) => {
  try {
    // Elimina permanentemente la orden de la base de datos
    await orderService.deleteOrder(req.params.id)

    // NOTA: Hay un typo en "Ordern" - debería ser "Orden"
    res.json({ message: 'Orden eliminada con éxito' }) // <- Corregido typo
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
