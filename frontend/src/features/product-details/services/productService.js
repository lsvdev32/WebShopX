import api from '@/api/api'
/**
 * Servicio para manejar todo lo relacionado a la vista
 * de un producto en especifico
 * @module productService
 */

/**
 * Peticion para obtener el producto por medio de su id
 * @param {string} id
 * @returns {Promise} Devuelve el producto
 */
export const fetchProductByLink = async (linkOrId) => {
  const { data } = await api.get(`/api/products/link/${linkOrId}`)
  return data
}

/**
 * Funcion para obtener productos relacionados al que estamos viendo
 * @param {*} category Obtenemos la categoria del producto que estamos viendo
 * @param {*} excludeId Excluimos el id del producto actual para no mostrarlo en la lista de productos relacionados
 * @returns {Promise} Devuelve una lista de productos relacionados
 */
export const fetchRelatedProducts = async (category, excludeId) => {
  const { data } = await api.get(`/api/products/category/${category}`)
  return data.filter((p) => p._id !== excludeId)
}

/**
 * Funcion para agregar una reseña al producto
 * @param {*} productId Obtenemos el id del producto
 * @param {*} review Creamos un objeto con la reseña
 * @param {*} token Necesitamos el token para verifiar que el usuario esta logueado
 * @returns {Promise} Devuelve la reseña creada
 */
export const postProductReview = async (productId, review, token) => {
  const { data } = await api.post(`/api/products/${productId}/reviews`, review, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Funcion para actualizar una reseña ya creada del producto que estamos viendo
 * @returns {Promise} Devuelve la reseña actualizada
 */
export const updateProductReview = async (productId, reviewId, review, token) => {
  const { data } = await api.put(`/api/products/${productId}/reviews/${reviewId}`, review, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
  * Funcion para eliminar una reseña del producto que estamos viendo
 * @returns {Promise} Devuelve la reseña eliminada
 */
export const deleteProductReview = async (productId, reviewId, token) => {
  const { data } = await api.delete(`/api/products/${productId}/reviews/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}
