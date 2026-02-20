import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'
import { Resend } from 'resend'
import { generateToken } from '../middleware/auth.js'
import User from '../models/user.model.js'

// Inicialización de servicios externos
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Obtiene todos los usuarios registrados en el sistema.
 * Solo para uso administrativo.
 * @returns {Promise<Array>} Lista completa de usuarios
 */
export const getAllUsers = async () => {
  return await User.find({})
}

/**
 * Obtiene un usuario específico por su ID.
 * @param {string} id - ID único del usuario
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */
export const getUserById = async (id) => {
  return await User.findById(id)
}

/**
 * Actualiza los datos de un usuario existente (solo administradores).
 * @param {string} id - ID del usuario a actualizar
 * @param {Object} userData - Nuevos datos del usuario
 * @param {string} userData.name - Nombre completo
 * @param {string} userData.email - Correo electrónico
 * @param {string} userData.phone - Número de teléfono
 * @param {boolean} userData.isAdmin - Permisos de administrador
 * @returns {Promise<Object|null>} Usuario actualizado o null si no existe
 */
export const updateUser = async (id, userData) => {
  const user = await User.findById(id)

  if (user) {
    // Actualiza solo los campos proporcionados (mantiene valores existentes si no se envían)
    user.name = userData.name || user.name
    user.email = userData.email || user.email
    user.phone = userData.phone || user.phone
    user.isAdmin = userData.isAdmin !== undefined ? userData.isAdmin : user.isAdmin
    return await user.save()
  }

  return null
}

/**
 * Elimina un usuario del sistema con protección para el administrador principal.
 * @param {string} id - ID del usuario a eliminar
 * @returns {Promise<boolean>} true si se eliminó, false si no existe o está protegido
 */
export const deleteUser = async (id) => {
  const user = await User.findById(id)

  // Protección: no permite eliminar la cuenta de administrador principal
  if (user && user.email !== 'admin@webshopx.com') {
    await user.deleteOne()
    return true
  }

  return false
}

/**
 * Autentica un usuario con email y contraseña.
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<Object|null>} Datos del usuario con token JWT o null si fallan credenciales
 */
export const signin = async (email, password) => {
  const user = await User.findOne({ email })

  // bcrypt.compareSync compara la contraseña plana con el hash almacenado
  if (user && bcrypt.compareSync(password, user.password)) {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user) // Genera JWT token
    }
  }

  return null
}

/**
 * Registra un nuevo usuario en el sistema.
 * @param {Object} userData - Datos del nuevo usuario
 * @param {string} userData.name - Nombre completo
 * @param {string} userData.email - Correo electrónico único
 * @param {string} userData.phone - Número de teléfono
 * @param {string} userData.password - Contraseña en texto plano
 * @returns {Promise<Object>} Usuario creado con token JWT
 */
export const signup = async (userData) => {
  const newUser = new User({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    // bcrypt.hashSync cifra la contraseña con salt rounds de 8
    password: bcrypt.hashSync(userData.password, 8)
  })

  const user = await newUser.save()

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
    token: generateToken(user)
  }
}

/**
 * Actualiza el perfil del usuario autenticado.
 * @param {string} id - ID del usuario autenticado
 * @param {Object} userData - Datos a actualizar
 * @param {string} userData.password - Nueva contraseña (opcional)
 * @returns {Promise<Object|null>} Usuario actualizado con nuevo token
 */
export const updateUserProfile = async (id, userData) => {
  const user = await User.findById(id)

  if (user) {
    user.name = userData.name || user.name
    user.email = userData.email || user.email
    user.phone = userData.phone || user.phone

    // Solo actualiza contraseña si se proporciona
    if (userData.password) {
      user.password = bcrypt.hashSync(userData.password, 8)
    }

    const updatedUser = await user.save()

    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser) // Nuevo token con datos actualizados
    }
  }

  return null
}

/**
 * Verifica si un email ya está registrado en el sistema.
 * Útil para validaciones en tiempo real en formularios.
 * @param {string} email - Email a verificar
 * @returns {Promise<boolean>} true si existe, false si no
 */
export const checkEmail = async (email) => {
  const existingUser = await User.findOne({ email })
  return !!existingUser // Convierte a boolean: null -> false, objeto -> true
}

/**
 * Maneja el inicio de sesión con Google OAuth.
 * Crea usuario si no existe o actualiza datos si ya existe.
 * @param {string} token - Token de Google verificado
 * @returns {Promise<Object>} Usuario autenticado con token JWT
 */
export const googleSignin = async (token) => {
  // Verifica el token con Google
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })

  const payload = ticket.getPayload()
  const { sub: googleId, email, name, picture } = payload

  // Busca usuario por email o googleId
  let user = await User.findOne({ $or: [{ email }, { googleId }] })

  if (!user) {
    // Usuario nuevo: crea cuenta con datos de Google
    user = new User({
      name,
      email,
      googleId,
      picture,
      // Genera contraseña aleatoria (no será usada, pero es requerida por el schema)
      password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 8)
    })
    await user.save()
  } else if (!user.googleId) {
    // Usuario existente sin Google: vincula cuenta
    user.googleId = googleId
    user.picture = picture
    await user.save()
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
    picture: user.picture,
    token: generateToken(user)
  }
}

/**
 * Inicia el proceso de recuperación de contraseña enviando email con token.
 * @param {string} email - Email del usuario que olvido su contraseña
 * @returns {Promise<Object>} Mensaje de confirmación
 * @throws {Error} Si el email no existe o hay error enviando email
 */
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('No se encontró un usuario con este correo electrónico')
  }

  // Genera token seguro para reset
  const resetToken = await generateSecureToken()
  user.resetPasswordToken = await hashToken(resetToken)
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000 // 30 minutos

  await user.save()

  // URL completa para reset (frontend)
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

  try {
    // Envía email usando Resend
    await resend.emails.send({
      from: 'WebShopX <onboarding@resend.dev>',
      to: user.email,
      subject: 'Solicitud de restablecimiento de contraseña',
      html: `
        <h1>Has solicitado restablecer tu contraseña</h1>
        <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetURL}" clicktracking="off">${resetURL}</a>
      `
    })

    return { message: 'Se ha enviado un correo electrónico para restablecer la contraseña' }
  } catch (error) {
    // Si falla el envío, limpia los tokens
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()
    console.error('Error sending email:', error)
    throw new Error('No se pudo enviar el correo electrónico de restablecimiento de contraseña')
  }
}

/**
 * Genera un token criptográficamente seguro.
 * Compatible con Node.js y navegadores.
 * @returns {Promise<string>} Token aleatorio en formato hexadecimal
 */
async function generateSecureToken () {
  const buffer = new Uint8Array(32)

  if (typeof window === 'undefined') {
    // Entorno Node.js
    const crypto = await import('crypto')
    return crypto.randomBytes(32).toString('hex')
  } else {
    // Entorno navegador
    window.crypto.getRandomValues(buffer)
    return Array.from(buffer, (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
}

/**
 * Genera un hash SHA-256 de un token.
 * Compatible con Node.js y navegadores.
 * @param {string} token - Token a hashear
 * @returns {Promise<string>} Hash en formato hexadecimal
 */
async function hashToken (token) {
  if (typeof window === 'undefined') {
    // Entorno Node.js
    const crypto = await import('crypto')
    return crypto.createHash('sha256').update(token).digest('hex')
  } else {
    // Entorno navegador
    const msgBuffer = new TextEncoder().encode(token)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
}

/**
 * Restablece la contraseña usando un token de recuperación válido.
 * @param {string} token - Token de recuperación (sin hash)
 * @param {string} newPassword - Nueva contraseña en texto plano
 * @returns {Promise<Object>} Mensaje de confirmación
 * @throws {Error} Si token es inválido o expirado
 */
export const resetPassword = async (token, newPassword) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Token inválido')
  }

  // Hash del token para comparar con BD
  const hashedToken = await hashToken(token)

  // Busca usuario con token válido y no expirado
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() } // $gt = greater than (mayor que)
  })

  if (!user) {
    throw new Error('Token inválido o expirado')
  }

  // Actualiza contraseña y limpia tokens
  user.password = bcrypt.hashSync(newPassword, 8)
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined

  await user.save()

  return { message: 'La contraseña ha sido restablecida con éxito' }
}
