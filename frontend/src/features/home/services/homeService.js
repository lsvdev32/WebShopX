import api from '@/api/api.js'
/**
 * Servicio para manejar operaciones relacionadas con la página de inicio
 * @module homeService
 */

/**
 * Obtiene los productos más vendidos
 * @returns {Promise} Lista de productos más vendidos
 */
export const fetchTopSellingProducts = async () => {
  const { data } = await api.get('/api/products/top-selling')
  return data
}

/**
 * Obtiene productos aleatorios
 * @returns {Promise} Lista de productos aleatorios
 */
export const fetchRandomProducts = async () => {
  const { data } = await api.get('/api/products/random')
  return data
}

/**
 * Obtiene productos recientes
 * @returns {Promise} Lista de productos recientes
 */
export const fetchRecentProducts = async () => {
  const { data } = await api.get('/api/products/recent')
  return data
}

/**
 * Obtiene promociones (estático por ahora, preparado para API)
 * @returns {Promise} Lista de promociones
 */
export const fetchPromos = async () => {
  // Simulación de llamada a la API
  return [
    {
      id: 1,
      tagline: 'CUMPLE TU PROPÓSITO',
      title: 'OFERTAS EN MUNDO DEPORTIVO',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_993923-MLA83157633377_032025-OO.jpg',
      imageAlt: 'Cyclist riding a red bicycle'
    },
    {
      id: 2,
      tagline: 'SOBRE RUEDAS',
      title: 'PARA VEHÍCULOS HASTA 40% OFF',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_647293-MLA74296781066_022024-OO.jpg',
      imageAlt: 'Vehicle dashboard interior'
    }
  ]
}

/**
 * Obtiene grupos de categorías desde la API
 * Ahora consume el endpoint real en lugar de datos simulados
 * @returns {Promise} Lista de grupos de categorías con sus metadatos
 */
export const fetchCategories = async () => {
  const { data } = await api.get('/api/products/categories/groups')
  return data
}
