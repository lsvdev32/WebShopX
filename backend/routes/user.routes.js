import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as userController from '../controllers/user.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.js'

const userRoutes = express.Router()

// === RUTAS PÚBLICAS ===
// Acceso sin autenticación

userRoutes.post('/signin', expressAsyncHandler(userController.signin)) // Iniciar sesión con email/password
userRoutes.post('/signup', expressAsyncHandler(userController.signup)) // Registrar nuevo usuario
userRoutes.post('/check-email', expressAsyncHandler(userController.checkEmail)) // Verificar si email ya existe
userRoutes.post('/google-signin', expressAsyncHandler(userController.googleSignin)) // Iniciar sesión con Google OAuth
userRoutes.post('/forgot-password', expressAsyncHandler(userController.forgotPassword)) // Solicitar restablecimiento de contraseña
userRoutes.post('/reset-password/:token', expressAsyncHandler(userController.resetPassword)) // Restablecer contraseña con token

// === RUTAS PROTEGIDAS ===
// Requieren autenticación (isAuth)

userRoutes.get('/profile', isAuth, expressAsyncHandler(userController.userProfile)) // Ver perfil del usuario autenticado
userRoutes.put('/updateProfile/:id', isAuth, expressAsyncHandler(userController.updateUserProfile)) // Actualizar perfil propio

// === RUTAS DE ADMINISTRADOR ===
// Gestión de usuarios - solo administradores

userRoutes.get('/admin/', isAuth, isAdmin, expressAsyncHandler(userController.getAllUsers)) // Lista todos los usuarios
userRoutes.get('/admin/:id', isAuth, isAdmin, expressAsyncHandler(userController.getUserById)) // Obtiene usuario específico por ID
userRoutes.put('/admin/:id', isAuth, isAdmin, expressAsyncHandler(userController.updateUser)) // Actualiza cualquier usuario (admin)
userRoutes.delete('/admin/:id', isAuth, isAdmin, expressAsyncHandler(userController.deleteUser)) // Elimina un usuario

export default userRoutes
