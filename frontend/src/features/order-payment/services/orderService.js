import api from '@/api/api.js'

/**
 * Servicio para manejar operaciones relacionadas con órdenes y pagos
 * @module orderService
 */

/**
 * Obtiene los detalles de una orden por su ID
 * @param {string} orderId - ID de la orden
 * @param {string} token - Token de autenticación
 * @returns {Promise} Datos de la orden
 */
export const fetchOrder = async (orderId, token) => {
  const { data } = await api.get(`/api/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Obtiene la clave del cliente de PayPal
 * @param {string} token - Token de autenticación
 * @returns {Promise} Clave del cliente de PayPal
 */
export const fetchPayPalClientId = async (token) => {
  const { data } = await api.get('/api/keys/paypal', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Procesa el pago de una orden
 * @param {string} orderId - ID de la orden
 * @param {Object} paymentDetails - Detalles del pago
 * @param {string} token - Token de autenticación
 * @returns {Promise} Datos de la orden actualizada
 */
export const payOrder = async (orderId, paymentDetails, token) => {
  const { data } = await api.put(`/api/orders/${orderId}/pay`, paymentDetails, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Obtiene la tasa de conversión de COP a USD
 * @returns {Promise<number>} Tasa de conversión
 */
export const fetchConversionRate = async () => {
  try {
    const apiKey = import.meta.env.VITE_EXCHANGERATE_API_KEY || 'YOUR_EXCHANGERATE_API_KEY'
    const { data } = await api.get(`https://api.exchangerate-api.com/v4/latest/COP?apiKey=${apiKey}`)
    return data.rates.USD
  } catch (err) {
    console.error('Error fetching conversion rate:', err)
    return 0.00027 // Fallback a tasa fija
  }
}
