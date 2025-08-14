import api from '@/api/api'

/**
 * Servicio para manejar operaciones relacionadas con productos
 * @module productService
 */

/**
 * Busca productos con filtros
 * @param {Object} params - Parámetros de búsqueda
 * @param {string} params.page - Página actual
 * @param {string} params.query - Consulta de búsqueda
 * @param {string} params.category - Categoría
 * @param {string} params.price - Rango de precio
 * @param {string} params.rating - Calificación mínima
 * @param {string} params.order - Ordenamiento
 * @param {number} params.limit - Límite de productos por página
 * @returns {Promise} Resultados de la búsqueda
 */
export const searchProducts = async ({ page, query, category, price, rating, order, limit }) => {
  const { data } = await api.get(
    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}&limit=${limit}`
  )
  return data
}

/**
 * Obtiene las categorías de productos
 * @returns {Promise} Lista de categorías
 */
export const fetchCategories = async () => {
  const { data } = await api.get('/api/products/categories')
  return data
}
