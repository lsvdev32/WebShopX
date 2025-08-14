import api from '@/api/api.js'

/**
 * Servicio para manejar operaciones relacionadas con usuarios
 * @module userService
 */

/**
 * Obtiene la lista de usuarios (requiere permisos de administrador)
 * @param {string} token - Token de autenticación
 * @returns {Promise} Lista de usuarios
 */
export const fetchUsers = async (token) => {
  const { data } = await api.get('/api/users/admin/', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Elimina un usuario por su ID (requiere permisos de administrador)
 * @param {string} userId - ID del usuario
 * @param {string} token - Token de autenticación
 * @returns {Promise} Respuesta de la eliminación
 */
export const deleteUser = async (userId, token) => {
  await api.delete(`/api/users/admin/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

/**
 * Actualiza un usuario por su ID (requiere permisos de administrador)
 * @param {string} userId - ID del usuario
 * @param {Object} userData - Datos del usuario a actualizar
 * @param {string} token - Token de autenticación
 * @returns {Promise} Datos del usuario actualizado
 */
export const updateUser = async (userId, userData, token) => {
  const { data } = await api.put(`/api/users/admin/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}
