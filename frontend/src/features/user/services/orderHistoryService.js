import api from '@/api/api'

/**
 * Servicio para manejar operaciones relacionadas con el historial de órdenes
 * @module orderHistoryService
 */

/**
 * Obtiene el historial de órdenes del usuario autenticado
 * @param {string} token - Token JWT del usuario
 * @returns {Promise} Lista de órdenes
 */
export const fetchUserOrders = async (token) => {
  const { data } = await api.get('/api/orders/mine', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}
