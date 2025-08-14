import api from '@/api/api.js'

/**
 * Servicio para manejar operaciones relacionadas con el dashboard
 * @module dashboardService
 */

/**
 * Obtiene el resumen general del dashboard
 * @param {string} token - Token JWT del usuario
 * @returns {Promise} Resumen con usuarios, pedidos, productos, ventas diarias y categorías
 */
export const fetchDashboardSummary = async (token) => {
  const { data } = await api.get('/api/orders/summary', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Obtiene usuarios registrados por día (simulado)
 * @param {string} token - Token JWT del usuario
 * @returns {Promise} Lista de usuarios por día
 */
export const fetchUsersByDay = async (token) => {
  // Simulación: reemplazar con endpoint real /api/users/summary?groupBy=day
  return [
    { _id: '2025-07-10', count: 50 },
    { _id: '2025-07-11', count: 60 },
    { _id: '2025-07-12', count: 45 },
    { _id: '2025-07-13', count: 70 },
    { _id: '2025-07-14', count: 55 },
    { _id: '2025-07-15', count: 65 }
  ]
}

/**
 * Obtiene estado de pedidos (simulado)
 * @param {string} token - Token JWT del usuario
 * @returns {Promise} Conteo de pedidos por estado
 */
export const fetchOrderStatus = async (token) => {
  // Simulación: reemplazar con endpoint real /api/orders/summary?groupBy=status
  return [
    { _id: { isPaid: true, isDelivered: true }, count: 100, label: 'Pagados y Entregados' },
    { _id: { isPaid: true, isDelivered: false }, count: 50, label: 'Pagados, No Entregados' },
    { _id: { isPaid: false, isDelivered: false }, count: 30, label: 'No Pagados' }
  ]
}

/**
 * Obtiene ventas por categoría (simulado)
 * @param {string} token - Token JWT del usuario
 * @returns {Promise} Ventas diarias por categoría
 */
export const fetchSalesByCategory = async (token) => {
  // Simulación: reemplazar con endpoint real /api/orders/summary?groupBy=category
  return [
    {
      _id: '2025-07-10',
      categories: [
        { category: 'Electrónica', sales: 5000 },
        { category: 'Ropa', sales: 3000 },
        { category: 'Hogar', sales: 2000 }
      ]
    },
    {
      _id: '2025-07-11',
      categories: [
        { category: 'Electrónica', sales: 6000 },
        { category: 'Ropa', sales: 3500 },
        { category: 'Hogar', sales: 2500 }
      ]
    }
  ]
}

/**
 * Obtiene productos más vendidos (simulado)
 * @param {string} token - Token JWT del usuario
 * @returns {Promise} Lista de productos más vendidos
 */
export const fetchTopProducts = async (token) => {
  // Simulación: reemplazar con endpoint real /api/products/summary?top=5
  return [
    { _id: '1', name: 'Smartphone X', sales: 200 },
    { _id: '2', name: 'Laptop Pro', sales: 150 },
    { _id: '3', name: 'Auriculares', sales: 100 },
    { _id: '4', name: 'Camiseta', sales: 80 },
    { _id: '5', name: 'Sofá', sales: 50 }
  ]
}
