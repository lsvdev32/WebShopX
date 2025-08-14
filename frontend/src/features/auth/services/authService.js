import api from '@/api/api.js'

/**
 * Servicio para manejar operaciones de autenticación
 * @module authService
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

/**
 * Inicia sesión con las credenciales del usuario
 * @param {*} data - Datos de inicio de sesión del usuario
 * @returns {Promise} Respuesta del servidor con la información del usuario
 */
export const signin = async (data) => {
  const response = await api.post(`${BACKEND_URL}/api/users/signin`, data)
  return response.data
}

/**
 * Inicia sesión con Google usando el token de autenticación
 * @param {*} token - Token de autenticación de Google
 * @returns {Promise} Respuesta del servidor con la información del usuario
 */
export const googleSignin = async (token) => {
  const response = await api.post(`${BACKEND_URL}/api/users/google-signin`, { token })
  return response.data
}

/**
 * Registra un nuevo usuario
 * @param {*} data - Datos del nuevo usuario
 * @returns {Promise} Respuesta del servidor con la información del usuario registrado
 */
export const signup = async (data) => {
  const response = await api.post(`${BACKEND_URL}/api/users/signup`, data)
  return response.data
}

/**
 * Envía un correo electrónico para restablecer la contraseña
 * @param {*} data - Datos necesarios para restablecer la contraseña
 * @returns {Promise} Respuesta del servidor confirmando el envío del correo electrónico
 */
export const forgotPassword = async (data) => {
  const response = await api.post(`${BACKEND_URL}/api/users/forgot-password`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return response.data
}

/**
 * Restablece la contraseña del usuario
 * @param {*} token - Token de restablecimiento de contraseña
 * @param {*} data - Nuevas credenciales de la contraseña
 * @returns {Promise} Respuesta del servidor confirmando el restablecimiento de la contraseña
 */
export const resetPassword = async (token, data) => {
  const response = await api.post(`${BACKEND_URL}/api/users/reset-password/${token}`, data)
  return response.data
}
