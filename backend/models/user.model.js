import mongoose from 'mongoose'

/**
 * SCHEMA DE USUARIO
 * Maneja tanto usuarios regulares como administradores
 * Soporta autenticación tradicional y OAuth con Google
 */
const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true }, // Nombre completo
    email: { type: String, require: true, unique: true }, // Email único (usado para login)
    password: { type: String, require: true }, // Contraseña hasheada con bcrypt
    phone: { type: String, minlenght: 10, maxlenght: 10, require: true }, // Teléfono
    isAdmin: { type: Boolean, default: false, require: true }, // Permisos de administrador

    // Campos para OAuth con Google
    googleId: { type: String, require: true }, // ID único de Google
    picture: { type: String, require: true }, // URL de foto de perfil de Google

    // Campos para recuperación de contraseña
    resetPasswordToken: { type: String }, // Token hasheado para reset de password
    resetPasswordExpires: { type: Date } // Fecha de expiración del token (30 min)
  },
  {
    timestamp: true // createdAt y updatedAt automáticos
  }
)

const User = mongoose.model('User', userSchema)
export default User
