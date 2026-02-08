/**
 * ===================================
 * PRODUCT ROUTES (product.routes.js)
 * ===================================
 * Maneja todas las rutas relacionadas con productos
 */

import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as productController from '../controllers/product.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.js'

const productsRoutes = express.Router()

// === RUTAS DE ADMINISTRADOR ===
// CRUD de productos - solo administradores

productsRoutes.get('/admin/', isAuth, isAdmin, expressAsyncHandler(productController.getAllProductsAdmin)) // GET /api/products/admin/ - Lista todos los productos para administración
productsRoutes.post('/admin/create', isAuth, isAdmin, expressAsyncHandler(productController.createProduct)) // POST /api/products/admin/create - Crea un nuevo producto
productsRoutes.put('/admin/:id', isAuth, isAdmin, expressAsyncHandler(productController.updateProduct)) // PUT /api/products/admin/123 - Actualiza un producto existente
productsRoutes.delete('/admin/:id', isAuth, isAdmin, expressAsyncHandler(productController.deleteProduct)) // DELETE /api/products/admin/123 - Elimina un producto

// === RUTAS PÚBLICAS ===
// Accesibles sin autenticación - para mostrar productos en la tienda

productsRoutes.get('/', expressAsyncHandler(productController.getAllProducts)) // GET /api/products/ - Lista productos con paginación y filtros
productsRoutes.get('/random', expressAsyncHandler(productController.getRandomProducts)) // GET /api/products/random - Obtiene productos aleatorios (para recomendaciones)
productsRoutes.get('/recent', expressAsyncHandler(productController.getRecentProducts)) // GET /api/products/recent - Productos más recientes
productsRoutes.get('/top-selling', expressAsyncHandler(productController.getSellingProducts)) // GET /api/products/top-selling - Productos más vendidos
productsRoutes.get('/search', expressAsyncHandler(productController.getProductSearch)) // GET /api/products/search?q=telefono - Busca productos por término

// === RUTAS DE CATEGORÍAS ===
// Navegación y filtrado por categorías y grupos

productsRoutes.get('/categories', expressAsyncHandler(productController.getCategories)) // GET /api/products/categories - Lista todas las categorías disponibles
productsRoutes.get('/categories/groups', expressAsyncHandler(productController.getCategoryGroups)) // GET /api/products/categories/groups - Obtiene grupos de categorías con metadatos
productsRoutes.get('/group/:groupSlug', expressAsyncHandler(productController.getProductsByGroup)) // GET /api/products/group/tecnologia-electronica - Productos de un grupo de categorías
productsRoutes.get('/category/:category', expressAsyncHandler(productController.getProductsByCategory)) // GET /api/products/category/smartphones - Productos de una categoría

// === RUTAS DE PRODUCTOS INDIVIDUALES ===

productsRoutes.get('/link/:link', expressAsyncHandler(productController.getProductByLink)) // GET /api/products/link/iphone-14 - Obtiene producto por URL amigable
productsRoutes.get('/:id', expressAsyncHandler(productController.getProductById))// GET /api/products/123 - Obtiene un producto específico por ID

// === RUTAS DE REVIEWS ===
// Requieren autenticación para crear/editar reseñas

productsRoutes.post('/:id/reviews', isAuth, expressAsyncHandler(productController.createProductReview)) // POST /api/products/123/reviews - Crea una nueva reseña
productsRoutes.put('/:id/reviews/:reviewId', isAuth, expressAsyncHandler(productController.updateProductReview)) // PUT /api/products/123/reviews/456 - Actualiza una reseña existente
productsRoutes.delete('/:id/reviews/:reviewId', isAuth, expressAsyncHandler(productController.deleteProductReview)) // DELETE /api/products/123/reviews/456 - Elimina una reseña

export default productsRoutes
