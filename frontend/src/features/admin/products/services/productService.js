import api from '@/api/api.js'

/**
 * Servicio para manejar operaciones relacionadas con productos
 * @module productService
 */

/**
 * Obtiene la lista de productos recientes
 * @param {string} token - Token de autenticación
 * @returns {Promise} Lista de productos
 */
export const fetchProducts = async (token) => {
  const { data } = await api.get('/api/products/recent', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Elimina un producto por su ID (requiere permisos de administrador)
 * @param {string} productId - ID del producto
 * @param {string} token - Token de autenticación
 * @returns {Promise} Respuesta de la eliminación
 */
export const deleteProduct = async (productId, token) => {
  await api.delete(`/api/products/admin/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

/**
 * Crea un nuevo producto (requiere permisos de administrador)
 * @param {Object} productData - Datos del producto
 * @param {string} token - Token de autenticación
 * @returns {Promise} Datos del producto creado
 */
export const createProduct = async (productData, token) => {
  const { data } = await api.post('/api/products/admin/create', productData, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Actualiza un producto por su ID (requiere permisos de administrador)
 * @param {string} productId - ID del producto
 * @param {Object} productData - Datos del producto a actualizar
 * @param {string} token - Token de autenticación
 * @returns {Promise} Datos del producto actualizado
 */
export const updateProduct = async (productId, productData, token) => {
  const { data } = await api.put(`/api/products/admin/${productId}`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Carga imágenes para un producto
 * @param {File[]} files - Archivos de imagen a cargar
 * @param {string} token - Token de autenticación
 * @returns {Promise} URLs de las imágenes cargadas
 */
export const uploadProductImages = async (files, token) => {
  const uploadPromises = [...files].map(file => {
    const bodyFormData = new FormData()
    bodyFormData.append('file', file)
    return api.post('/api/upload', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
  })
  const uploadResponses = await Promise.all(uploadPromises)
  return uploadResponses.map(res => res.data.secure_url)
}
