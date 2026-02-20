import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import connectDB from '../db/connection.js'
import orderRoutes from '../routes/order.routes.js'
import productsRoutes from '../routes/product.routes.js'
import uploadRouter from '../routes/upload.routes.js'
import userRoutes from '../routes/user.routes.js'

/**
 * Carga las variables de entorno desde el archivo .env
 * Debe ejecutarse antes de usar process.env en cualquier parte del código
 */
dotenv.config()

connectDB() // Establece conexión con la base de datos MongoDB

const app = express()

app.use(helmet())

/**
 * HELMET - Configuración avanzada de Content Security Policy (CSP)
 * CSP es una capa adicional de seguridad que previene ataques XSS y de inyección de código
 */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Solo permite recursos desde el mismo origen (dominio propio)
      imgSrc: ["'self'", 'data:'], // Permite imágenes desde el mismo origen y datos embebidos (base64)
      scriptSrc: ["'self'"], // Solo permite scripts desde el mismo dominio (bloquea scripts externos)
      objectSrc: ["'none'"], // Desactiva completamente estos elementos (riesgo de ejecución externa)
      upgradeInsecureRequests: [] // Array vacío = directiva habilitada sin valores adicionales
    }
  })
)

app.disable('x-powered-by') // Oculta la información del servidor

// Configuración de CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Dominio del frontend de desarrollo (Vite)
      'https://frontend-webshopx-production.up.railway.app' // Dominio el frontend de produccion
    ],
    // methods: Métodos HTTP permitidos
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE', // Lista de métodos HTTP que acepta el servidor
    // credentials: Permite envío de cookies y headers de autenticación
    credentials: true // Necesario para JWT tokens y sesiones
  })
)

app.use(express.json()) // Middleware para JSON
app.use(express.urlencoded({ extended: true })) // Middelware para formularios URL-ENCODED

// Registro de rutas
app.use('/api/users', userRoutes) // Todas las rutas de usuarios
app.use('/api/orders', orderRoutes) // Todas las rutas de órdenes
app.use('/api/upload', uploadRouter) // Todas las rutas de carga de archivos
app.use('/api/products', productsRoutes) // Todas las rutas de productos

// Ruta especial para PayPal
/**
 * Endpoint específico para obtener el Client ID de PayPal
 * Esta ruta no está en un archivo separado porque es muy simple y específica
 *
 * @route GET /api/keys/paypal
 * @desc Obtiene el Client ID público de PayPal para el frontend
 * @access Público (no requiere autenticación)
 */
app.get('/api/keys/paypal', (req, res) => {
  // process.env.PAYPAL_CLIENT_ID viene del archivo .env
  // Si no existe, devuelve 'sb' (sandbox) como fallback para desarrollo
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

// Manejo global de errores
/**
 * Este middleware se ejecuta cuando ocurre cualquier error en la aplicación
 *
 * Parámetros:
 * @param {Error} error - El objeto de error que ocurrió
 * @param {Request} req - Objeto de petición HTTP
 * @param {Response} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 *
 * IMPORTANTE: Los middlewares de error SIEMPRE deben tener 4 parámetros,
 * incluso si no usas 'next'. Express los identifica por la cantidad de parámetros.
 */
app.use((error, req, res, next) => {
  // Registra el error en la consola del servidor para debugging
  console.error('Error en la solicitud:', error.message)

  // Responde al cliente con un error genérico
  // Status 500 = Internal Server Error (error interno del servidor)
  res.status(500).json({
    message: 'Ops!... ocurrió un error en el servidor'
  })
})

const port = process.env.PORT || 5000

/**
 * Inicia el servidor HTTP en el puerto especificado
 *
 * @param {number} port - Puerto en el que escuchará el servidor
 * @param {Function} callback - Función que se ejecuta cuando el servidor está listo
 */
app.listen(port, () => {
  // Mensaje de confirmación en la consola del servidor
  console.log(`El servidor está en ejecución en el puerto http://localhost:${port}`)
})
