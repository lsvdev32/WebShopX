import * as userService from '../services/user.service.js'

/**
 * Obtiene todos los usuarios registrados en el sistema.
 * Endpoint: GET /users
 * @param {Object} req - Objeto de petición HTTP (request)
 * @param {Object} res - Objeto de respuesta HTTP (response)
 * @returns {Array} Lista de todos los usuarios o mensaje de error
 */
export const getAllUsers = async (req, res) => {
  try {
    // Llama al servicio para obtener todos los usuarios de la base de datos
    const users = await userService.getAllUsers()

    // Envía la lista de usuarios con estado 200 (éxito) implícito
    res.send(users)
  } catch (error) {
    // Si ocurre un error, envía un estado 500 (error del servidor) con el mensaje
    res.status(500).send({ message: error.message || 'Error al obtener la lista de usuarios.' })
  }
}

/**
 * Obtiene un usuario específico por su ID.
 * Endpoint: GET /users/:id
 * @param {Object} req - Objeto de petición que contiene el ID en req.params.id
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos del usuario encontrado o mensaje de error
 */
export const getUserById = async (req, res) => {
  try {
    // req.params.id extrae el parámetro 'id' de la URL (ej: /users/123 -> id = "123")
    const user = await userService.getUserById(req.params.id)

    // Verifica si el usuario existe en la base de datos
    if (user) {
      // Usuario encontrado: envía los datos con estado 200 implícito
      res.send(user)
    } else {
      // Usuario no encontrado: envía estado 404 (no encontrado) con mensaje
      res.status(404).send({ message: 'Usuario no encontrado!' })
    }
  } catch (error) {
    // Error del servidor: estado 500 con mensaje descriptivo
    res.status(500).send({ message: error.message || 'Error al obtener el usuario.' })
  }
}

/**
 * Actualiza los datos de un usuario existente.
 * Endpoint: PUT /users/:id
 * @param {Object} req - Contiene el ID en params y los nuevos datos en body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Mensaje de éxito con usuario actualizado o error
 */
export const updateUser = async (req, res) => {
  try {
    // req.body contiene los datos a actualizar enviados en el cuerpo de la petición
    const updatedUser = await userService.updateUser(req.params.id, req.body)

    // NOTA: Hay un error en la condición - debería ser 'updatedUser' no 'updateUser'
    if (updatedUser) { // <- Corregido: era 'updateUser' (typo)
      // Envía mensaje de éxito junto con los datos del usuario actualizado
      res.send({ message: 'Usuario actualizado con éxito!', user: updatedUser })
    } else {
      // ID no válido o usuario no existe
      res.status(404).send({ message: 'Usuario no encontrado!' })
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error al actualizar el usuario.' })
  }
}

/**
 * Elimina un usuario del sistema.
 * Endpoint: DELETE /users/:id
 * @param {Object} req - Contiene el ID del usuario a eliminar en params
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Mensaje de confirmación o error
 */
export const deleteUser = async (req, res) => {
  try {
    // El servicio retorna true/false o el objeto eliminado dependiendo de la implementación
    const result = await userService.deleteUser(req.params.id)

    if (result) {
      // NOTA: Hay un typo en "elimando" - debería ser "eliminado"
      res.send({ message: 'Usuario eliminado con éxito!' }) // <- Corregido typo
    } else {
      res.status(404).send({ message: 'Usuario no encontrado.' })
    }
  } catch (error) {
    // NOTA: Hay un typo en "usario" - debería ser "usuario"
    res.status(500).send({ message: error.message || 'Error al eliminar al usuario.' }) // <- Corregido typo
  }
}

/**
 * Maneja el inicio de sesión de usuarios (autenticación).
 * Endpoint: POST /auth/signin
 * @param {Object} req - Contiene email y password en req.body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos del usuario autenticado (incluyendo token) o error
 */
export const signin = async (req, res) => {
  try {
    // Extrae email y password del cuerpo de la petición
    const user = await userService.signin(req.body.email, req.body.password)

    if (user) {
      // Credenciales válidas: envía datos del usuario (normalmente incluye JWT token)
      res.send(user)
    } else {
      // Credenciales inválidas: estado 401 (no autorizado)
      // NOTA: El símbolo '@' en "incorrect@" es inusual - probablemente un typo
      res.status(401).send({ message: 'Usuario o contraseña incorrectos!' }) // <- Corregido
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error al iniciar sesión.' })
  }
}

/**
 * Registra un nuevo usuario en el sistema.
 * Endpoint: POST /auth/signup
 * @param {Object} req - Contiene todos los datos del nuevo usuario en req.body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos del usuario registrado o mensaje de error
 */
export const signup = async (req, res) => {
  try {
    // req.body normalmente contiene: name, email, password, phone, etc.
    const user = await userService.signup(req.body)

    // Usuario creado exitosamente: envía los datos (sin la contraseña)
    res.send(user)
  } catch (error) {
    // Errores comunes: email ya existe, validación fallida, etc.
    // NOTA: Typo en "resgistrar" - debería ser "registrar"
    res.status(500).send({ message: error.message || 'Error al registrar el usuario.' }) // <- Corregido typo
  }
}

/**
 * Obtiene el perfil del usuario autenticado.
 * Endpoint: GET /auth/profile
 * Requiere autenticación: el middleware debe agregar req.user
 * @param {Object} req - Contiene req.user._id agregado por middleware de autenticación
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos del perfil del usuario sin información sensible
 */
export const userProfile = async (req, res) => {
  try {
    // req.user._id es agregado por el middleware de autenticación después de verificar el JWT
    const user = await userService.getUserById(req.user._id)

    if (user) {
      // Envía solo los datos necesarios del perfil (excluye password, tokens, etc.)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin // Indica si el usuario tiene permisos de administrador
      })
    } else {
      // Caso raro: el token es válido pero el usuario no existe en BD
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al obtener el perfil de usuario' })
  }
}

/**
 * Actualiza el perfil del usuario autenticado.
 * Endpoint: PUT /auth/profile
 * Requiere autenticación: solo puede actualizar su propio perfil
 * @param {Object} req - Contiene req.user._id y los datos a actualizar en req.body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos del perfil actualizado o mensaje de error
 */
export const updateUserProfile = async (req, res) => {
  try {
    // Actualiza solo el perfil del usuario autenticado (seguridad)
    const updatedUser = await userService.updateUserProfile(req.user._id, req.body)

    if (updatedUser) {
      res.send(updatedUser)
    } else {
      res.status(404).send({ message: 'Usuario no encontrado!' })
    }
  } catch (error) {
    // NOTA: Estado 404 es incorrecto aquí - debería ser 500 para errores del servidor
    res.status(500).send({ message: error.message || 'Error al actualizar el perfil del usuario.' }) // <- Corregido status
  }
}

/**
 * Verifica si un email ya está registrado en el sistema.
 * Endpoint: POST /auth/check-email
 * Útil para validaciones en tiempo real en formularios de registro
 * @param {Object} req - Contiene el email a verificar en req.body.email
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Objeto con propiedad 'exists' (boolean) o mensaje de error
 */
export const checkEmail = async (req, res) => {
  try {
    // Verifica si el email ya existe en la base de datos
    const exists = await userService.checkEmail(req.body.email)

    // Envía respuesta con boolean indicando si el email existe
    // Ejemplo: { exists: true } o { exists: false }
    res.status(200).send({ exists })
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error al verificar email.' })
  }
}

/**
 * Maneja el inicio de sesión con Google OAuth.
 * Endpoint: POST /auth/google-signin
 * @param {Object} req - Contiene el token de Google en req.body.token
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos del usuario autenticado o mensaje de error
 */
export const googleSignin = async (req, res) => {
  try {
    // Extrae el token de Google del cuerpo de la petición
    const { token } = req.body

    // El servicio verifica el token con Google y crea/autentica al usuario
    const user = await userService.googleSignin(token)

    res.send(user)
  } catch (error) {
    // Estado 401: token inválido o expirado
    res.status(401).send({ message: error.message || 'Error al iniciar sesión con Google.' })
  }
}

/**
 * Inicia el proceso de recuperación de contraseña.
 * Endpoint: POST /auth/forgot-password
 * Envía un email con enlace de recuperación al usuario
 * @param {Object} req - Contiene el email en req.body.email
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Mensaje de confirmación o error
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Validación: el email es requerido
    if (!email) {
      return res.status(400).json({ message: 'El correo electronico es requerido!' })
    }

    // El servicio genera un token y envía email de recuperación
    const result = await userService.forgotPassword(email)

    res.send(result)
  } catch (error) {
    // Estado 400: datos inválidos (ej: email no existe)
    res.status(400).send({ message: error.message || 'Error al enviar email de recuperación de contraseña.' })
  }
}

/**
 * Restablece la contraseña usando el token de recuperación.
 * Endpoint: POST /auth/reset-password/:token
 * @param {Object} req - Contiene el token en params y la nueva contraseña en body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Mensaje de confirmación o error
 */
export const resetPassword = async (req, res) => {
  try {
    // req.params.token: token de recuperación de la URL
    const { token } = req.params
    // req.body.password: nueva contraseña del usuario
    const { password } = req.body

    // Validación: ambos campos son requeridos
    if (!token || !password) {
      return res.status(400).send({ message: 'Token y contraseña son requeridos.' })
    }

    // El servicio verifica el token y actualiza la contraseña
    const result = await userService.resetPassword(token, password)

    res.send(result)
  } catch (error) {
    // Log del error para debugging (solo visible en consola del servidor)
    console.error('Error resetting password:', error)

    // Estado 400: token expirado/inválido o contraseña no cumple criterios
    res.status(400).send({ message: error.message || 'Error al restablecer la contraseña.' })
  }
}
