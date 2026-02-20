import express from 'express'
import * as orderController from '../controllers/order.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.js'

const router = express.Router()

// === RUTAS DE ADMINISTRADOR ===
// Requieren autenticación Y permisos de admin (isAuth + isAdmin)

router.get('/', isAuth, isAdmin, orderController.getAllOrders) // Obtiene todas las órdenes del sistema (solo admin)
router.get('/summary', isAuth, isAdmin, orderController.getOrderSummary) // Obtiene resumen/estadísticas de órdenes (solo admin)
router.delete('/admin/:id', isAuth, isAdmin, orderController.deleteOrder) // Elimina una orden específica (solo admin)
router.put('/admin/:id/deliver', isAuth, isAdmin, orderController.updateOrderToDelivered) // Marca una orden como entregada (solo admin)

// === RUTAS DE USUARIOS AUTENTICADOS ===
// Requieren solo autenticación (isAuth)

router.post('/', isAuth, orderController.createOrder) // Crea una nueva orden
router.get('/mine', isAuth, orderController.getUserOrders) // Obtiene las órdenes del usuario autenticado
router.get('/:id', isAuth, orderController.getOrderById) // Obtiene una orden específica por ID
router.put('/:id/pay', isAuth, orderController.updateOrderToPaid) // Marca una orden como pagada

export default router
