/**
 * Rangos de precios para filtros del eCommerce
 * Diseñados para cubrir desde productos económicos hasta premium
 */

/**
 * Formatea un rango de precios en formato de Peso Colombiano
 * @param {number} min - Precio mínimo del rango
 * @param {number} max - Precio máximo del rango
 * @returns {string} Rango formateado (ej: "$50.000 - $100.000")
 */
const formatPriceRange = (min, max) => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return `${formatter.format(min)} - ${formatter.format(max)}`
}

/**
 * Array de rangos de precios para los filtros
 * Rangos diseñados para un eCommerce profesional de tecnología/electrónica
 */
export const prices = [
  {
    name: formatPriceRange(0, 50000),
    value: '0-50000',
    description: 'Productos básicos y accesorios'
  },
  {
    name: formatPriceRange(50000, 100000),
    value: '50000-100000',
    description: 'Accesorios y gadgets'
  },
  {
    name: formatPriceRange(100000, 300000),
    value: '100000-300000',
    description: 'Productos de gama media'
  },
  {
    name: formatPriceRange(300000, 500000),
    value: '300000-500000',
    description: 'Tecnología intermedia'
  },
  {
    name: formatPriceRange(500000, 1000000),
    value: '500000-1000000',
    description: 'Gama media-alta'
  },
  {
    name: formatPriceRange(1000000, 2000000),
    value: '1000000-2000000',
    description: 'Productos premium'
  },
  {
    name: formatPriceRange(2000000, 5000000),
    value: '2000000-5000000',
    description: 'Alta gama'
  },
  {
    name: 'Más de $5.000.000',
    value: '5000000-999999999',
    description: 'Productos luxury'
  }
]

/**
 * Obtiene el nombre formateado de un rango de precio por su valor
 * @param {string} value - Valor del rango (ej: "100000-300000")
 * @returns {string|null} Nombre formateado del rango o null si no existe
 */
export const getPriceRangeName = (value) => {
  const priceRange = prices.find(p => p.value === value)
  return priceRange ? priceRange.name : null
}

/**
 * Verifica si un precio está dentro de un rango específico
 * @param {number} price - Precio a verificar
 * @param {string} rangeValue - Valor del rango (ej: "100000-300000")
 * @returns {boolean} true si el precio está en el rango
 */
export const isPriceRange = (price, rangeValue) => {
  if (rangeValue === 'all') return true

  const [min, max] = rangeValue.split('-').map(Number)
  return price >= min && price <= max
}
