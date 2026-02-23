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
const allowedOrigins = [
  'http://localhost:5173', // Frontend local
  'http://localhost:5174', // Frontend local alternativo
  process.env.FRONTEND_URL // URL de producción desde variable de entorno
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (Postman, apps móviles, etc.)
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('No permitido por CORS'))
      }
    },
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
  })
)

app.use(express.json()) // Middleware para JSON
app.use(express.urlencoded({ extended: true })) // Middelware para formularios URL-ENCODED

// Registro de rutas
app.use('/api/users', userRoutes) // Todas las rutas de usuarios
app.use('/api/orders', orderRoutes) // Todas las rutas de órdenes
app.use('/api/upload', uploadRouter) // Todas las rutas de carga de archivos
app.use('/api/products', productsRoutes) // Todas las rutas de productos
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

// Usado por UptimeRobot y para verificar que el servidor está vivo
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
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
