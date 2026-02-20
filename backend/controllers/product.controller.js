import * as productService from '../services/product.service.js'

/**
 * Obtiene todos los productos disponibles en el catálogo público.
 * Endpoint: GET /products
 * Acceso: Público (no requiere autenticación)
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista completa de productos activos
 */
export const getAllProducts = async (req, res) => {
  try {
    // Obtiene todos los productos visibles para el público
    // Normalmente excluye productos inactivos o fuera de stock
    const products = await productService.getAllProducts()

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene una cantidad aleatoria de productos para mostrar en homepage o secciones destacadas.
 * Endpoint: GET /products/random
 * Query params: ?limit=número (opcional, default: 6)
 * @param {Object} req - Contiene req.query.limit (opcional)
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista aleatoria de productos
 */
export const getRandomProducts = async (req, res) => {
  try {
    // parseInt() convierte string a número, || 6 es valor por defecto
    // Ejemplo: ?limit=8 -> limit = 8, sin query -> limit = 6
    const limit = parseInt(req.query.limit) || 6

    // Útil para mostrar productos variados en cada visita a la página
    const products = await productService.getRandomProducts(limit)

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene los productos más recientes ordenados por fecha de creación.
 * Endpoint: GET /products/recent
 * Útil para mostrar "Nuevos productos" o "Últimos lanzamientos"
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista de productos ordenados por fecha descendente
 */
export const getRecentProducts = async (req, res) => {
  try {
    // Normalmente retorna productos creados recientemente (últimos 30 días, etc.)
    const products = await productService.getRecentProducts()

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene todos los productos con paginación para el panel de administración.
 * Endpoint: GET /admin/products
 * Requiere permisos de administrador
 * Query params: ?page=1&pageSize=10
 * @param {Object} req - Contiene parámetros de paginación en req.query
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Objeto con productos, total de páginas, página actual, etc.
 */
export const getAllProductsAdmin = async (req, res) => {
  try {
    // Destructuring con valores por defecto para paginación
    const { page = 1, pageSize = 10 } = req.query

    // Number() convierte strings a números de forma más estricta que parseInt()
    // Retorna objeto como: { products: [...], totalPages: 5, currentPage: 1, total: 50 }
    const data = await productService.getAllProductsAdmin(Number(page), Number(pageSize))

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene un producto específico por su ID único.
 * Endpoint: GET /products/:id
 * @param {Object} req - Contiene el ID del producto en req.params.id
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos completos del producto incluyendo reseñas
 */
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id)

    res.json(product)
  } catch (error) {
    // Estado 404: producto no encontrado con ese ID
    res.status(404).json({ message: error.message })
  }
}

/**
 * Obtiene un producto por su enlace amigable/slug (URL SEO-friendly).
 * Endpoint: GET /products/link/:link
 * Ejemplo: /products/link/smartphone-samsung-galaxy-s24
 * @param {Object} req - Contiene el slug en req.params.link
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Datos del producto encontrado por su enlace
 */
export const getProductByLink = async (req, res) => {
  try {
    // Los enlaces/slugs son URLs amigables generadas del nombre del producto
    // Ejemplo: "iPhone 15 Pro" -> "iphone-15-pro"
    const product = await productService.getProductByLink(req.params.link)

    res.json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

/**
 * Obtiene todos los productos de una categoría específica.
 * Endpoint: GET /products/category/:category
 * Ejemplo: /products/category/electronics
 * @param {Object} req - Contiene la categoría en req.params.category
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista de productos filtrados por categoría
 */
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await productService.getProductsByCategory(req.params.category)

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene los productos más vendidos/populares.
 * Endpoint: GET /products/selling
 * Query params: ?limit=número (opcional, default: 6)
 * @param {Object} req - Contiene req.query.limit (opcional)
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista de productos ordenados por ventas descendente
 */
export const getSellingProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6

    // Útil para secciones como "Más vendidos" o "Populares"
    const products = await productService.getSellingProducts(limit)

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene todas las categorías disponibles de productos.
 * Endpoint: GET /products/categories
 * Útil para menús de navegación y filtros
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista de categorías únicas con conteos opcionalmente
 */
export const getCategories = async (req, res) => {
  try {
    // Puede retornar solo nombres o incluir conteo de productos por categoría
    // Ejemplo: [{ name: "Electronics", count: 25 }, { name: "Clothing", count: 15 }]
    const categories = await productService.getCategories()

    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Crea un nuevo producto en el sistema.
 * Endpoint: POST /admin/products
 * Requiere permisos de administrador
 * @param {Object} req - Contiene todos los datos del producto en req.body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Producto creado con su ID asignado
 */
export const createProduct = async (req, res) => {
  try {
    // req.body típicamente contiene: name, description, price, category, images, stock, etc.
    const product = await productService.createProduct(req.body)

    // Estado 201: recurso creado exitosamente
    res.status(201).json(product)
  } catch (error) {
    // Estado 400: datos inválidos o faltantes (validación fallida)
    res.status(400).json({ message: error.message })
  }
}

/**
 * Actualiza un producto existente.
 * Endpoint: PUT /admin/products/:id
 * Requiere permisos de administrador
 * @param {Object} req - Contiene ID en params y datos actualizados en body
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Producto actualizado con los nuevos datos
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body)

    res.json(product)
  } catch (error) {
    // Estado 400: ID no válido o datos de actualización incorrectos
    res.status(400).json({ message: error.message })
  }
}

/**
 * Elimina un producto del sistema.
 * Endpoint: DELETE /admin/products/:id
 * Requiere permisos de administrador
 * @param {Object} req - Contiene el ID del producto a eliminar
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Mensaje de confirmación de eliminación
 */
export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id)

    res.json({ message: 'Producto eliminado exitosamente' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

/**
 * Crea una nueva reseña/calificación para un producto.
 * Endpoint: POST /products/:id/reviews
 * Requiere autenticación: solo usuarios logueados pueden reseñar
 * @param {Object} req - Contiene ID del producto, datos del usuario y reseña
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Reseña creada con estadísticas actualizadas del producto
 */
export const createProductReview = async (req, res) => {
  try {
    // req.user: datos del usuario autenticado
    // req.body: típicamente contiene rating, comment, title
    const product = await productService.createProductReview(req.params.id, req.user, req.body)

    // Retorna la reseña recién creada y estadísticas actualizadas
    res.status(201).json({
      review: product.reviews[product.reviews.length - 1], // Última reseña agregada
      numReviews: product.numReviews, // Total de reseñas
      ratings: product.ratings // Promedio de calificación
    })
  } catch (error) {
    // Errores comunes: usuario ya reseñó, producto no existe, datos inválidos
    res.status(400).json({ message: error.message })
  }
}

/**
 * Actualiza una reseña existente del usuario.
 * Endpoint: PUT /products/:id/reviews/:reviewId
 * Solo el autor de la reseña puede actualizarla
 * @param {Object} req - Contiene IDs del producto y reseña, usuario y nuevos datos
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Reseña actualizada con nuevas estadísticas
 */
export const updateProductReview = async (req, res) => {
  try {
    const product = await productService.updateProductReview(
      req.params.id, // ID del producto
      req.params.reviewId, // ID de la reseña específica
      req.user, // Usuario autenticado (verificación de propiedad)
      req.body // Nuevos datos de la reseña
    )

    // product.reviews.id() es un método de Mongoose para encontrar subdocumentos por ID
    const updatedReview = product.reviews.id(req.params.reviewId)

    res.json({
      review: updatedReview,
      numReviews: product.numReviews,
      ratings: product.ratings
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

/**
 * Elimina una reseña del producto.
 * Endpoint: DELETE /products/:id/reviews/:reviewId
 * Solo el autor de la reseña o admin puede eliminarla
 * @param {Object} req - Contiene IDs del producto y reseña, más datos del usuario
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Confirmación y estadísticas actualizadas del producto
 */
export const deleteProductReview = async (req, res) => {
  try {
    const product = await productService.deleteProductReview(
      req.params.id,
      req.params.reviewId,
      req.user
    )

    res.json({
      message: 'Reseña eliminada exitosamente',
      numReviews: product.numReviews, // Contador actualizado
      ratings: product.ratings // Promedio recalculado sin la reseña eliminada
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

/**
 * Realiza búsqueda de productos con filtros y parámetros.
 * Endpoint: GET /products/search
 * Query params: ?q=término&category=cat&minPrice=10&maxPrice=100&sort=price
 * @param {Object} req - Contiene todos los parámetros de búsqueda en req.query
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} Resultados de búsqueda con productos y metadatos de paginación
 */
export const getProductSearch = async (req, res) => {
  try {
    // req.query puede contener:
    // - q: término de búsqueda
    // - category: filtro por categoría
    // - minPrice, maxPrice: rango de precios
    // - sort: criterio de ordenamiento
    // - page, limit: paginación
    const result = await productService.getProductSearch(req.query)

    // Resultado típico: { products: [...], totalResults: 25, currentPage: 1, totalPages: 3 }
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene los grupos de categorías disponibles para navegación.
 * Endpoint: GET /products/categories/groups
 * Acceso: Público (no requiere autenticación)
 * Retorna los 8 grupos principales de categorías con sus metadatos
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista de grupos de categorías con imágenes y slugs
 */
export const getCategoryGroups = async (req, res) => {
  try {
    // Obtiene los grupos de categorías configurados
    // Útil para mostrar en carruseles, menús de navegación, etc.
    const groups = await productService.getCategoryGroups()

    res.json(groups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Obtiene productos filtrados por grupo de categorías.
 * Endpoint: GET /products/group/:groupSlug
 * Ejemplo: /products/group/tecnologia-electronica
 * @param {Object} req - Contiene el slug del grupo en req.params.groupSlug
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Array} Lista de productos que pertenecen al grupo
 */
export const getProductsByGroup = async (req, res) => {
  try {
    const products = await productService.getProductsByGroup(req.params.groupSlug)

    res.json(products)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
