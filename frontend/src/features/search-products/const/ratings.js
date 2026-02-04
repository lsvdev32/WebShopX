/**
 * Configuración de filtros de calificación para productos
 * Permite filtrar productos por su rating promedio mínimo
 */

/**
 * Array de opciones de calificación para los filtros
 * Cada opción representa un umbral mínimo de estrellas
 *
 * @typedef {Object} RatingOption
 * @property {string} name - Nombre descriptivo para mostrar al usuario
 * @property {number} rating - Valor numérico del rating (1-5)
 * @property {string} description - Descripción del nivel de calidad
 */
export const ratings = [
  {
    name: '5 estrellas',
    rating: 5,
    description: 'Solo productos con calificación perfecta'
  },
  {
    name: '4 estrellas o más',
    rating: 4,
    description: 'Productos excelentes y muy bien valorados'
  },
  {
    name: '3 estrellas o más',
    rating: 3,
    description: 'Productos con buena valoración'
  },
  {
    name: '2 estrellas o más',
    rating: 2,
    description: 'Productos con valoración aceptable'
  },
  {
    name: '1 estrella o más',
    rating: 1,
    description: 'Todos los productos con al menos una reseña'
  }
]

/**
 * Obtiene el nombre descriptivo de un rating por su valor
 * @param {number} rating - Valor del rating (1-5)
 * @returns {string|null} Nombre del rating o null si no existe
 *
 * @example
 * getRatingName(4) // "4 estrellas o más"
 */
export const getRatingName = (rating) => {
  const ratingOption = ratings.find(r => r.rating === Number(rating))
  return ratingOption ? ratingOption.name : null
}

/**
 * Verifica si un producto cumple con el filtro de rating
 * @param {number} productRating - Calificación del producto
 * @param {number} minimumRating - Calificación mínima requerida
 * @returns {boolean} true si el producto cumple con el rating mínimo
 *
 * @example
 * meetsRatingRequirement(4.5, 4) // true
 * meetsRatingRequirement(3.8, 4) // false
 */
export const meetsRatingRequirement = (productRating, minimumRating) => {
  return productRating >= minimumRating
}

/**
 * Obtiene un emoji representativo según el rating
 * Útil para visualizaciones adicionales
 * @param {number} rating - Rating del producto (1-5)
 * @returns {string} Emoji correspondiente
 *
 * @example
 * getRatingEmoji(4.5) // "⭐"
 * getRatingEmoji(2.5) // "😐"
 */
export const getRatingEmoji = (rating) => {
  if (rating >= 4.5) return '⭐'
  if (rating >= 3.5) return '👍'
  if (rating >= 2.5) return '😐'
  if (rating >= 1.5) return '👎'
  return '💔'
}

/**
 * Obtiene el color recomendado para mostrar un rating
 * @param {number} rating - Rating del producto (1-5)
 * @returns {string} Clase de color de Tailwind
 *
 * @example
 * getRatingColor(4.5) // "text-green-500"
 */
export const getRatingColor = (rating) => {
  if (rating >= 4.5) return 'text-green-500'
  if (rating >= 3.5) return 'text-blue-500'
  if (rating >= 2.5) return 'text-yellow-500'
  if (rating >= 1.5) return 'text-orange-500'
  return 'text-red-500'
}

/**
 * Formatea un rating para mostrar con precisión decimal
 * @param {number} rating - Rating a formatear
 * @param {number} decimals - Cantidad de decimales (default: 1)
 * @returns {string} Rating formateado
 *
 * @example
 * formatRating(4.567) // "4.6"
 * formatRating(4.5, 2) // "4.50"
 */
export const formatRating = (rating, decimals = 1) => {
  return Number(rating).toFixed(decimals)
}
