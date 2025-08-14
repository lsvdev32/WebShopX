import api from '@/api/api.js'

/**
 * Servicio para manejar las operaciones relacionadas con el carrito de compras
 * @module cartService
 */

/**
 * Obtiene productos relacionados basados en las categorías de los ítems del carrito
 * @param {string[]} categories - Categorías de los ítems en el carrito
 * @param {string[]} excludeIds - IDs de productos a excluir
 * @returns {Promise} Lista de productos relacionados
 */
export const fetchRelatedProducts = async (categories, excludeIds) => {
  const { data } = await api.get('/api/products', {
    params: { categories: categories.join(',') }
  })
  return data.filter((p) => !excludeIds.includes(p._id)).slice(0, 10)
}
