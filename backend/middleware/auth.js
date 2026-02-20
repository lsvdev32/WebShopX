import jwt from 'jsonwebtoken'

/**
 * Genera un token JWT para un usuario autenticado.
 * Se ejecuta después del login exitoso o registro.
 * @param {Object} user - Objeto del usuario con datos a incluir en el token
 * @param {string} user._id - ID único del usuario en la base de datos
 * @param {string} user.name - Nombre completo del usuario
 * @param {string} user.email - Email del usuario
 * @param {boolean} user.isAdmin - Indica si el usuario tiene permisos de administrador
 * @returns {string} Token JWT firmado que expira en 30 días
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      // Payload del token - información que se puede extraer sin verificar
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET, // Clave secreta para firmar el token
    {
      expiresIn: '30d' // Token válido por 30 días
    }
  )
}

/**
 * Middleware de autenticación - verifica si el usuario está autenticado.
 * Protege rutas que requieren usuario logueado.
 * Uso: router.get('/protected-route', isAuth, controller)
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para continuar al siguiente middleware/controlador
 */
export const isAuth = (req, res, next) => {
  // Extrae el header Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  const authorization = req.headers.authorization

  if (authorization) {
    // Remueve "Bearer " del inicio y extrae solo el token
    // slice(7) elimina los primeros 7 caracteres: "Bearer "
    const token = authorization.slice(7, authorization.length)

    // Verifica la validez y firma del token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        // Token expirado, inválido o manipulado
        res.status(401).send({ message: 'Token inválido' }) // <- Corregido tilde
      } else {
        // Token válido: agrega datos del usuario decodificados a la petición
        req.user = decode
        next() // Continúa al siguiente middleware o controlador
      }
    })
  } else {
    // No se proporcionó header Authorization
    res.status(401).send({ message: 'Sin token' })
  }
}

/**
 * Middleware de autorización - verifica si el usuario es administrador.
 * Debe usarse DESPUÉS del middleware isAuth.
 * Uso: router.delete('/admin/users/:id', isAuth, isAdmin, controller)
 * @param {Object} req - Objeto de petición (debe contener req.user del middleware isAuth)
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para continuar al siguiente middleware/controlador
 */
export const isAdmin = (req, res, next) => {
  // Verifica que req.user existe (agregado por isAuth) y que isAdmin es true
  if (req.user && req.user.isAdmin) {
    next() // Usuario es admin: continúa
  } else {
    // Usuario no es admin o no está autenticado
    res.status(401).send({ message: 'Token de administrador inválido' })
  }
}
