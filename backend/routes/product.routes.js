import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as productController from '../controllers/product.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.js'

const productsRoutes = express.Router()

// === RUTAS DE ADMINISTRADOR ===
// CRUD de productos - solo administradores

productsRoutes.get('/admin/', isAuth, isAdmin, expressAsyncHandler(productController.getAllProductsAdmin)) // Lista todos los productos para administración
productsRoutes.post('/admin/create', isAuth, isAdmin, expressAsyncHandler(productController.createProduct)) // Crea un nuevo producto
productsRoutes.put('/admin/:id', isAuth, isAdmin, expressAsyncHandler(productController.updateProduct)) // Actualiza un producto existente
productsRoutes.delete('/admin/:id', isAuth, isAdmin, expressAsyncHandler(productController.deleteProduct)) // Elimina un producto

// === RUTAS PÚBLICAS ===
// Accesibles sin autenticación - para mostrar productos en la tienda

productsRoutes.get('/', expressAsyncHandler(productController.getAllProducts)) // Lista productos con paginación y filtros
productsRoutes.get('/random', expressAsyncHandler(productController.getRandomProducts)) // Obtiene productos aleatorios (para recomendaciones)
productsRoutes.get('/recent', expressAsyncHandler(productController.getRecentProducts)) // Productos más recientes
productsRoutes.get('/top-selling', expressAsyncHandler(productController.getSellingProducts)) // Productos más vendidos
productsRoutes.get('/search', expressAsyncHandler(productController.getProductSearch)) // Busca productos por término

// === RUTAS DE CATEGORÍAS ===
// Navegación y filtrado por categorías y grupos

productsRoutes.get('/categories', expressAsyncHandler(productController.getCategories)) // Lista todas las categorías disponibles
productsRoutes.get('/categories/groups', expressAsyncHandler(productController.getCategoryGroups)) // Obtiene grupos de categorías con metadatos
productsRoutes.get('/group/:groupSlug', expressAsyncHandler(productController.getProductsByGroup)) // Productos de un grupo de categorías
productsRoutes.get('/category/:category', expressAsyncHandler(productController.getProductsByCategory)) // Productos de una categoría

// === RUTAS DE PRODUCTOS INDIVIDUALES ===

productsRoutes.get('/link/:link', expressAsyncHandler(productController.getProductByLink)) // Obtiene producto por URL amigable
productsRoutes.get('/:id', expressAsyncHandler(productController.getProductById))// Obtiene un producto específico por ID

// === RUTAS DE REVIEWS ===
// Requieren autenticación para crear/editar reseñas

productsRoutes.post('/:id/reviews', isAuth, expressAsyncHandler(productController.createProductReview)) // Crea una nueva reseña
productsRoutes.put('/:id/reviews/:reviewId', isAuth, expressAsyncHandler(productController.updateProductReview)) // Actualiza una reseña existente
productsRoutes.delete('/:id/reviews/:reviewId', isAuth, expressAsyncHandler(productController.deleteProductReview)) // Elimina una reseña

export default productsRoutes
