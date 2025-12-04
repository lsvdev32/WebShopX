/**
 * Componente Ratings para mostrar calificaciones con estrellas
 *
 * Lo utilizamos para mostrar las calificaciones de productos, reseñas, etc.
 * Muestra estrellas llenas, medias estrellas y estrellas vacías según la calificación.
 *
 * Lo utiliza: ProductCard, ProductDetails, ReviewForm, ReviewList
 */

/* eslint-disable multiline-ternary */
import { Star, StarHalf } from 'lucide-react'

export default function Ratings (props) {
  const { ratings = 0, numReviews = 0, caption } = props // tomamos 3 propiedades como parametro "rating", "numReviews", "caption"

  // con estas clases asignamos modulos diferentes para variar el tamaño
  return (
    <div className='hidden sm:flex items-center '>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {ratings >= star ? (
            <Star className='w-4 h-4 mb-2 text-yellow-400 fill-current' />
          ) : ratings >= star - 0.5 ? (
            <StarHalf className='w-4 h-4 mb-2  text-yellow-400 fill-current' />
          ) : (
            <Star className='w-4 h-4 mb-2  text-gray-300' />
          )}
        </span>
      ))}
      {caption ? (
        <span className='ml-2 text-xs mb-2 text-gray-600'>{caption}</span>
      ) : numReviews > 0 ? (
        <span className='ml-2 text-xs mb-2 text-gray-600'>{numReviews} {numReviews === 1 ? 'Reseña' : 'Reseñas'}</span>
      ) : null}
    </div>
  )
}
