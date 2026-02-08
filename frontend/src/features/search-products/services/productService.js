import api from '@/api/api'
import { getCategoriesByGroupSlug, isGroupSlug } from '../const/categories'

/**
 * Servicio para manejar operaciones relacionadas con productos
 * @module productService
 */

/**
 * Busca productos con filtros
 * @param {Object} params - Parámetros de búsqueda
 * @param {string} params.page - Página actual
 * @param {string} params.query - Consulta de búsqueda
 * @param {string} params.category - Categoría o grupo de categorías
 * @param {string} params.price - Rango de precio
 * @param {string} params.ratings - Calificación mínima
 * @param {string} params.order - Ordenamiento
 * @param {number} params.limit - Límite de productos por página
 * @returns {Promise} Resultados de la búsqueda
 */
export const searchProducts = async ({ page, query, category, price, ratings, order, limit }) => {
  // Si la categoría es un grupo (slug), convertirlo a búsqueda múltiple
  let searchCategory = category

  if (category !== 'all' && isGroupSlug(category)) {
    // Es un grupo, obtener todas las categorías del grupo
    const groupCategories = getCategoriesByGroupSlug(category)

    // Convertir array a string separado por comas para enviar al backend
    // El backend deberá interpretar esto como búsqueda con $in
    searchCategory = groupCategories.join(',')
  }

  const { data } = await api.get(
    `/api/products/search?page=${page}&query=${query}&category=${searchCategory}&price=${price}&ratings=${ratings}&order=${order}&limit=${limit}`
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
