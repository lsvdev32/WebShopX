import mongoose from 'mongoose'

/**
 * SCHEMA DE RESEÑAS/REVIEWS
 * Cada producto puede tener múltiples reseñas de usuarios
 */
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Quien escribió la reseña
    name: { type: String, required: true }, // Nombre del usuario (copiado para rendimiento)
    ratings: { type: Number, required: true }, // Calificación 1-5 estrellas
    comment: { type: String, required: true } // Comentario escrito
  },
  {
    timestamps: true // Fecha de creación y actualización de la reseña
  }
)

/**
 * SCHEMA PRINCIPAL DE PRODUCTO
 * Estructura completa de un producto en la tienda
 */
const productSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true }, // Nombre único del producto
    link: { type: String, require: true, unique: true }, // URL amigable única (ej: "iphone-14")
    images: [{ type: String, require: true }], // Array de URLs de imágenes
    brand: { type: String, require: true }, // Marca (Apple, Samsung, etc.)
    category: { type: String, require: true }, // Categoría (smartphones, laptops, etc.)
    description: { type: String, require: true }, // Descripción detallada
    price: { type: Number, require: true }, // Precio actual
    stock: { type: Number, require: true }, // Cantidad disponible en inventario

    // Estadísticas de reseñas
    ratings: { type: Number, require: true, default: 0 }, // Promedio de calificaciones
    numReviews: { type: Number, require: true, default: 0 }, // Número total de reseñas

    reviews: [reviewSchema] // Array de reseñas del producto
  },
  {
    timestamps: true, // createdAt y updatedAt automáticos
    versionKey: false // Desactiva el campo __v de versioning
  }
)

const Product = mongoose.model('Product', productSchema)
export default Product
