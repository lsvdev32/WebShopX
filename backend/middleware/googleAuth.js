import { OAuth2Client } from 'google-auth-library'

// Cliente OAuth2 de Google inicializado con el ID de cliente de la aplicación
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

/**
 * Middleware para verificar tokens de Google OAuth.
 * Valida el token con los servidores de Google y extrae información del usuario.
 * Uso: router.post('/auth/google', verifyGoogleToken, googleLoginController)
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} req.body.token - Token de Google enviado desde el frontend
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para continuar al siguiente middleware/controlador
 */
export const verifyGoogleToken = async (req, res, next) => {
  const { token } = req.body

  try {
    // Verifica el token con los servidores de Google
    const ticket = await client.verifyIdToken({
      idToken: token, // Token a verificar
      audience: process.env.GOOGLE_CLIENT_ID // Verifica que el token es para nuestra app
    })

    // Extrae la información del usuario del token verificado
    const payload = ticket.getPayload()

    // payload contiene información como:
    // - sub: ID único de Google del usuario
    // - email: correo electrónico verificado
    // - name: nombre completo
    // - picture: URL de foto de perfil
    // - email_verified: si el email está verificado por Google

    // Agrega datos del usuario de Google a la petición para uso posterior
    req.googleUser = payload

    next() // Continúa al controlador que manejará el login/registro
  } catch (error) {
    // Errores comunes:
    // - Token expirado o inválido
    // - Token no pertenece a nuestra aplicación
    // - Problemas de conectividad con Google
    // - Configuración incorrecta de GOOGLE_CLIENT_ID
    res.status(401).send({ message: 'Error al verificar el token de Google.' })
  }
}
