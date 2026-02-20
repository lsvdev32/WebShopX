import { categoryGroupImages, getCategoriesByGroupSlug, groupedCategories } from '../config/categories.config.js'
import Product from '../models/product.model.js'

// Constante para paginación por defecto
const PAGE_SIZE = 6

/**
 * Obtiene todos los productos disponibles en el catálogo público.
 * @returns {Promise<Array>} Lista completa de productos activos
 */
export const getAllProducts = async () => {
  return await Product.find({})
}

/**
 * Obtiene una muestra aleatoria de productos para mostrar variedad.
 * Útil para secciones como "Productos destacados" o "Puede que te interese".
 * @param {number} limit - Cantidad de productos aleatorios a retornar
 * @returns {Promise<Array>} Lista de productos seleccionados aleatoriamente
 */
export const getRandomProducts = async (limit = 6) => {
  // $sample es un operador de agregación que selecciona documentos aleatorios
  return await Product.aggregate([{ $sample: { size: limit } }])
}

/**
 * Obtiene los productos más recientes ordenados por fecha de creación.
 * @returns {Promise<Array>} Lista de productos ordenados por creación descendente
 */
export const getRecentProducts = async () => {
  return await Product.find({})
    .sort({ createdAt: -1 }) // -1 = descendente (más recientes primero)
}

/**
 * Obtiene productos con paginación para el panel administrativo.
 * Incluye metadatos de paginación para construir controles de navegación.
 * @param {number} page - Número de página (comenzando en 1)
 * @param {number} pageSize - Cantidad de productos por página
 * @returns {Promise<Object>} Objeto con productos y metadata de paginación
 */
export const getAllProductsAdmin = async (page = 1, pageSize = 10) => {
  // Calcula cuántos documentos saltar para la paginación
  const skip = (page - 1) * pageSize

  // lean() retorna objetos JavaScript planos (más rápido, menos funcionalidad)
  const products = await Product.find()
    .skip(skip)
    .limit(pageSize)
    .lean()

  // Cuenta total de productos para calcular páginas
  const total = await Product.countDocuments()

  return {
    products,
    page,
    pages: Math.ceil(total / pageSize), // Total de páginas disponibles
    total
  }
}

/**
 * Obtiene un producto específico por su ID.
 * @param {string} id - ID único del producto
 * @returns {Promise<Object>} Producto encontrado
 * @throws {Error} Si el producto no existe
 */
export const getProductById = async (id) => {
  const product = await Product.findById(id)
  if (!product) throw new Error('Producto no encontrado')
  return product
}

/**
 * Obtiene un producto por su enlace/slug SEO-friendly.
 * Ordena las reseñas por fecha para mostrar las más recientes primero.
 * @param {string} link - Enlace único del producto (ej: "iphone-15-pro")
 * @returns {Promise<Object>} Producto encontrado con reseñas ordenadas
 * @throws {Error} Si el producto no existe
 */
export const getProductByLink = async (link) => {
  const product = await Product.findOne({ link })
  if (!product) throw new Error('Producto no encontrado')

  // Ordena reseñas por fecha de creación descendente (más recientes primero)
  product.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return product
}

/**
 * Obtiene todos los productos de una categoría específica.
 * @param {string} category - Nombre de la categoría
 * @returns {Promise<Array>} Lista de productos de la categoría
 */
export const getProductsByCategory = async (category) => {
  return await Product.find({ category })
}

/**
 * Obtiene los productos más vendidos/populares basado en reseñas y calificaciones.
 * @param {number} limit - Cantidad de productos a retornar
 * @returns {Promise<Array>} Lista de productos ordenados por popularidad
 */
export const getSellingProducts = async (limit = 6) => {
  return await Product.find({})
    .sort({ numReviews: -1, ratings: -1 }) // Primero por número de reseñas, luego por calificación
    .limit(limit)
}

/**
 * Obtiene todas las categorías únicas de productos disponibles.
 * @returns {Promise<Array>} Lista de nombres de categorías únicos
 */
export const getCategories = async () => {
  // distinct() retorna valores únicos del campo especificado
  return await Product.distinct('category')
}

/**
 * Crea un nuevo producto con validaciones de negocio.
 * @param {Object} productData - Datos completos del producto
 * @returns {Promise<Object>} Producto creado y guardado
 * @throws {Error} Si no cumple las validaciones (ej: mínimo 3 imágenes)
 */
export const createProduct = async (productData) => {
  // Validación de negocio: productos deben tener al menos 3 imágenes
  if (!productData.images || productData.images.length < 3) {
    throw new Error('Se requieren al menos 3 imágenes para crear un producto')
  }

  const newProduct = new Product(productData)
  return await newProduct.save()
}

/**
 * Actualiza un producto existente con nuevos datos.
 * @param {string} productId - ID del producto a actualizar
 * @param {Object} productData - Datos a actualizar
 * @returns {Promise<Object>} Producto actualizado
 * @throws {Error} Si el producto no existe
 */
export const updateProduct = async (productId, productData) => {
  const product = await Product.findById(productId)
  if (!product) throw new Error('Producto no encontrado')

  // Object.assign() copia propiedades del objeto fuente al destino
  Object.assign(product, productData)
  return await product.save()
}

/**
 * Elimina un producto del sistema.
 * @param {string} productId - ID del producto a eliminar
 * @throws {Error} Si el producto no existe
 */
export const deleteProduct = async (productId) => {
  const product = await Product.findById(productId)
  if (!product) throw new Error('Producto no encontrado')
  await product.deleteOne()
}

/**
 * Crea una nueva reseña para un producto.
 * Recalcula automáticamente las estadísticas de calificación del producto.
 * @param {string} productId - ID del producto a reseñar
 * @param {Object} user - Usuario autenticado que crea la reseña
 * @param {Object} reviewData - Datos de la reseña (calificación, comentario)
 * @returns {Promise<Object>} Producto actualizado con la nueva reseña
 * @throws {Error} Si producto no existe o usuario ya reseñó
 */
export const createProductReview = async (productId, user, reviewData) => {
  const product = await Product.findById(productId)
  if (!product) throw new Error('Producto no encontrado')

  // Validación: un usuario solo puede hacer una reseña por producto
  if (product.reviews.find((x) => x.user.toString() === user._id.toString())) {
    throw new Error('Ya has escrito una reseña para este producto')
  }

  // Crea el objeto reseña
  const review = {
    name: user.name,
    ratings: Number(reviewData.ratings),
    comment: reviewData.comment,
    user: user._id
  }

  // Agrega la reseña al producto
  product.reviews.push(review)

  // Reordena reseñas por fecha (más recientes primero)
  product.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Recalcula estadísticas del producto
  product.numReviews = product.reviews.length
  product.ratings = product.reviews.reduce((a, c) => c.ratings + a, 0) / product.reviews.length

  return await product.save()
}

/**
 * Actualiza una reseña existente del usuario.
 * Solo el autor de la reseña puede actualizarla.
 * @param {string} productId - ID del producto
 * @param {string} reviewId - ID de la reseña a actualizar
 * @param {Object} user - Usuario autenticado (debe ser el autor)
 * @param {Object} reviewData - Nuevos datos de la reseña
 * @returns {Promise<Object>} Producto con la reseña actualizada
 * @throws {Error} Si no existe producto/reseña o no tiene permisos
 */
export const updateProductReview = async (productId, reviewId, user, reviewData) => {
  const product = await Product.findById(productId)
  if (!product) throw new Error('Producto no encontrado')

  // product.reviews.id() es método de Mongoose para buscar subdocumentos
  const review = product.reviews.id(reviewId)
  if (!review) throw new Error('Reseña no encontrada')

  // Validación de autorización: solo el autor puede editar
  if (review.user.toString() !== user._id.toString()) {
    throw new Error('No estás autorizado para actualizar esta reseña')
  }

  // Actualiza los campos de la reseña
  review.ratings = Number(reviewData.ratings)
  review.comment = reviewData.comment
  review.updatedAt = Date.now()

  // Reordena considerando fecha de actualización
  product.reviews.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))

  // Recalcula estadísticas
  product.numReviews = product.reviews.length
  product.ratings = product.reviews.reduce((a, c) => c.ratings + a, 0) / product.reviews.length

  return await product.save()
}

/**
 * Elimina una reseña de un producto.
 * Solo el autor de la reseña puede eliminarla.
 * @param {string} productId - ID del producto
 * @param {string} reviewId - ID de la reseña a eliminar
 * @param {Object} user - Usuario autenticado (debe ser el autor)
 * @returns {Promise<Object>} Producto con estadísticas recalculadas
 * @throws {Error} Si no existe producto/reseña o no tiene permisos
 */
export const deleteProductReview = async (productId, reviewId, user) => {
  const product = await Product.findById(productId)
  if (!product) throw new Error('Producto no encontrado')

  const review = product.reviews.id(reviewId)
  if (!review) throw new Error('Reseña no encontrada')

  // Log de debugging (debería removerse en producción)
  console.log('User ID:', user._id, 'Review User ID:', review.user.toString())

  // Validación de autorización
  if (review.user.toString() !== user._id.toString()) {
    throw new Error('No estás autorizado para eliminar esta reseña')
  }

  // Filtra las reseñas excluyendo la que se va a eliminar
  product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId)

  // Reordena las reseñas restantes
  product.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Recalcula estadísticas (maneja el caso de 0 reseñas)
  product.numReviews = product.reviews.length
  product.ratings = product.reviews.length > 0
    ? product.reviews.reduce((a, c) => c.ratings + a, 0) / product.reviews.length
    : 0

  return await product.save()
}

/**
 * Realiza búsqueda avanzada de productos con múltiples filtros y paginación.
 * @param {Object} query - Objeto con parámetros de búsqueda y filtros
 * @param {string} query.query - Término de búsqueda en nombre
 * @param {string} query.category - Filtro por categoría
 * @param {string} query.price - Rango de precios (ej: "10-50")
 * @param {string} query.ratings - Calificación mínima
 * @param {string} query.order - Criterio de ordenamiento
 * @param {number} query.page - Página actual
 * @param {number} query.pageSize - Productos por página
 * @returns {Promise<Object>} Resultados de búsqueda con metadatos
 */
export const getProductSearch = async (query) => {
  const pageSize = query.pageSize || PAGE_SIZE
  const page = query.page || 1
  const category = query.category || ''
  const price = query.price || ''
  const ratings = query.ratings || ''
  const order = query.order || ''
  const searchQuery = query.query || ''

  // Construye filtros condicionales para la consulta

  // Filtro por nombre (búsqueda de texto con regex case-insensitive)
  const queryFilter = searchQuery && searchQuery !== 'all'
    ? { name: { $regex: searchQuery, $options: 'i' } }
    : {}

  // Filtro por categoría (soporta categorías múltiples separadas por comas)
  const categoryFilter = category && category !== 'all'
    ? category.includes(',')
      ? { category: { $in: category.split(',') } } // Múltiples categorías (grupo)
      : { category } // Categoría individual
    : {}

  // Filtro por calificación mínima
  const ratingsFilter = ratings && ratings !== 'all'
    ? { ratings: { $gte: Number(ratings) } }
    : {}

  // Filtro por rango de precios (formato: "min-max")
  const priceFilter = price && price !== 'all'
    ? (() => {
        const [min, max] = price.split('-').map(Number)

        // Validación: ambos valores deben ser números válidos
        if (isNaN(min) || isNaN(max)) {
          console.warn(`Formato de precio inválido: ${price}`)
          return {}
        }

        // Validación adicional: min debe ser menor que max
        if (min > max) {
          console.warn(`Rango de precio inválido: min (${min}) > max (${max})`)
          return {}
        }

        // Validación adicional: valores deben ser positivos
        if (min < 0 || max < 0) {
          console.warn(`Valores negativos no permitidos: ${price}`)
          return {}
        }

        return { price: { $gte: min, $lte: max } }
      })()
    : {}

  // Determina criterio de ordenamiento
  const sortOrder =
    order === 'featured'
      ? { featured: -1 } // Productos destacados
      : order === 'lowest'
        ? { price: 1 } // Precio menor a mayor
        : order === 'highest'
          ? { price: -1 } // Precio mayor a menor
          : order === 'toprated'
            ? { ratings: -1 } // Mejor calificados
            : order === 'newest'
              ? { createdAt: -1 } // Más recientes
              : { _id: -1 } // Por defecto

  // Ejecuta la consulta con todos los filtros aplicados
  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingsFilter
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1)) // Paginación
    .limit(pageSize)

  // Cuenta total de productos que cumplen los criterios (sin paginación)
  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingsFilter
  })

  return {
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize)
  }
}

/**
 * Actualiza el stock de un producto dentro de una transacción.
 * Utilizado para operaciones que requieren consistencia (ej: cancelar órdenes).
 * @param {string} productId - ID del producto
 * @param {number} quantity - Cantidad a sumar/restar del stock
 * @param {Object} session - Sesión de transacción de MongoDB
 * @throws {Error} Si producto no existe o stock insuficiente
 */
export const updateProductStock = async (productId, quantity, session) => {
  const product = await Product.findById(productId).session(session)
  if (!product) throw new Error('Producto no encontrado')

  // Validación: no permitir stock negativo
  if (product.stock < -quantity) {
    throw new Error('No hay suficiente stock disponible')
  }

  product.stock += quantity
  await product.save({ session })
}

/**
 * Obtiene los grupos de categorías con sus metadatos para mostrar en el frontend.
 * Retorna los 8 grupos principales con imágenes y categorías hijas.
 * Útil para carruseles de navegación y filtros por grupo.
 * @returns {Array<Object>} Array de grupos con sus datos completos
 */
export const getCategoryGroups = async () => {
  // Mapea los grupos agregando ID secuencial, imagen y URL de navegación
  return groupedCategories.map((group, index) => ({
    id: index + 1,
    title: group.group,
    slug: group.slug,
    categories: group.items.map(item => item.value), // Solo los valores de categorías
    imageSrc: categoryGroupImages[group.slug] || '', // Imagen del grupo
    href: `/search?category=${group.slug}&query=all&price=all&ratings=all&order=newest&page=1`
  }))
}

/**
 * Obtiene productos filtrados por grupo de categorías.
 * Útil cuando el usuario hace clic en un grupo en el carrusel del home.
 * @param {string} groupSlug - Slug del grupo (ej: 'tecnologia-electronica')
 * @param {Object} additionalFilters - Filtros adicionales opcionales (precio, rating, etc.)
 * @returns {Promise<Array>} Lista de productos que pertenecen a cualquier categoría del grupo
 */
export const getProductsByGroup = async (groupSlug, additionalFilters = {}) => {
  // Obtiene todas las categorías que pertenecen al grupo
  const categories = getCategoriesByGroupSlug(groupSlug)

  if (categories.length === 0) {
    throw new Error('Grupo de categorías no encontrado')
  }

  // Busca productos que tengan cualquiera de las categorías del grupo
  return await Product.find({
    category: { $in: categories },
    ...additionalFilters
  })
}
