/**
 * SERVIDOR PRINCIPAL DE LA APLICACIÓN WEBSHOPX
 * Este archivo es el punto de entrada de la aplicación backend. Configura y ejecuta
 * el servidor Express.js con todas las medidas de seguridad, middlewares y rutas necesarias.
 */

import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import connectDB from '../db/connection.js'
import orderRoutes from '../routes/order.routes.js'
import productsRoutes from '../routes/product.routes.js'
import uploadRouter from '../routes/upload.routes.js'
import userRoutes from '../routes/user.routes.js'

// === CONFIGURACIÓN INICIAL ===
/**
 * Carga las variables de entorno desde el archivo .env
 * Debe ejecutarse antes de usar process.env en cualquier parte del código
 */
dotenv.config()

/**
 * Establece conexión con la base de datos MongoDB
 * Esta función maneja la lógica de conexión y reconexión automática
 */
connectDB()

// === CREACIÓN Y CONFIGURACIÓN DEL SERVIDOR EXPRESS ===

/**
 * Crea una instancia de aplicación Express
 * Esta será nuestra aplicación web principal
 */
const app = express()

// === CONFIGURACIÓN DE SEGURIDAD ===

/**
 * HELMET - Seguridad básica
 * Helmet configura automáticamente múltiples cabeceras HTTP de seguridad:
 * - X-Content-Type-Options: nosniff (previene ataques de tipo MIME)
 * - X-Frame-Options: DENY (previene clickjacking)
 * - X-XSS-Protection: habilitado (protección básica contra XSS)
 * - Y muchas más configuraciones de seguridad por defecto
 */
app.use(helmet())

/**
 * HELMET - Configuración avanzada de Content Security Policy (CSP)
 * CSP es una capa adicional de seguridad que previene ataques XSS y de inyección de código
 */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // defaultSrc: Define fuentes permitidas por defecto para todos los recursos
      defaultSrc: ["'self'"], // Solo permite recursos desde el mismo origen (dominio propio)

      // imgSrc: Controla desde dónde se pueden cargar imágenes
      imgSrc: ["'self'", 'data:'], // Permite imágenes desde el mismo origen y datos embebidos (base64)

      // scriptSrc: Controla desde dónde se pueden ejecutar scripts JavaScript
      scriptSrc: ["'self'"], // Solo permite scripts desde el mismo dominio (bloquea scripts externos)

      // objectSrc: Controla elementos como <object>, <embed>, <applet>
      objectSrc: ["'none'"], // Desactiva completamente estos elementos (riesgo de ejecución externa)

      // upgradeInsecureRequests: Instruye al navegador a convertir HTTP en HTTPS automáticamente
      upgradeInsecureRequests: [] // Array vacío = directiva habilitada sin valores adicionales
    }
  })
)

/**
 * OCULTACIÓN DE INFORMACIÓN DEL SERVIDOR
 * Por defecto, Express envía la cabecera 'X-Powered-By: Express'
 * Esto revela información sobre la tecnología usada, lo cual puede ser útil para atacantes
 * Al deshabilitarlo, ocultamos esta información
 */
app.disable('x-powered-by')

// === CONFIGURACIÓN DE CORS ===
/**
 * CORS (Cross-Origin Resource Sharing)
 * Permite que el frontend (React en puerto 5173) haga peticiones al backend
 * Sin CORS, el navegador bloquearía estas peticiones por política de seguridad
 */
app.use(
  cors({
    // origin: Especifica qué dominios pueden hacer peticiones al servidor
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

// === MIDDLEWARES PARA PROCESAMIENTO DE DATOS ===

/**
 * MIDDLEWARE PARA JSON
 * Permite que Express entienda y procese datos JSON enviados en el body de las peticiones
 * Sin esto, req.body estaría vacío cuando se envían datos JSON
 */
app.use(express.json())

/**
 * MIDDLEWARE PARA FORMULARIOS URL-ENCODED
 * Procesa datos enviados desde formularios HTML tradicionales
 * extended: true permite procesamiento de objetos y arrays anidados
 */
app.use(express.urlencoded({ extended: true }))

// === REGISTRO DE RUTAS DE LA API ===
/**
 * Aquí registramos todas las rutas de nuestra API
 * Cada app.use() conecta un conjunto de rutas con un prefijo específico
 *
 * Estructura de URLs resultante:
 * - /api/users/* → userRoutes (login, registro, perfil, etc.)
 * - /api/orders/* → orderRoutes (crear pedidos, historial, etc.)
 * - /api/upload/* → uploadRouter (subir imágenes de productos)
 * - /api/products/* → productsRoutes (CRUD de productos)
 */

app.use('/api/users', userRoutes) // Todas las rutas de usuarios
app.use('/api/orders', orderRoutes) // Todas las rutas de órdenes
app.use('/api/upload', uploadRouter) // Todas las rutas de carga de archivos
app.use('/api/products', productsRoutes) // Todas las rutas de productos

// === RUTA ESPECIAL PARA PAYPAL ===
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

// === MANEJO GLOBAL DE ERRORES ===
/**
 * MIDDLEWARE DE MANEJO DE ERRORES
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

  // Nota: En producción, nunca envíes detalles del error al cliente
  // ya que puede revelar información sensible del sistema
})

// === CONFIGURACIÓN DEL PUERTO ===
/**
 * Determina en qué puerto ejecutar el servidor
 * Prioriza la variable de entorno PORT (importante para despliegue en producción)
 * Si no existe, usa el puerto 5000 como fallback para desarrollo local
 */
const port = process.env.PORT || 5000

// === INICIO DEL SERVIDOR ===
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
