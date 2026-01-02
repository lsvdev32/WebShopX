import Ratings from '@/components/common/Ratings'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'

/**
 * Componente para mostrar las reseñas de un producto.
 * Muestra un máximo de 3 reseñas inicialmente y permite cargar más.
 * @param {*} param0 - Objeto que contiene las reseñas del producto.
 * @returns JSX.Element - Componente de reseñas del producto.
 */
export default function ProductReviews ({ reviews }) {
  // Estado para controlar cuántas reseñas se muestran inicialmente
  const [visibleCount, setVisibleCount] = useState(3)

  // Si no hay reseñas, muestra un mensaje informativo
  if (!reviews || reviews.length === 0) {
    return <p className='text-muted-foreground'>Este producto no tiene aún comentarios ni calificaciones.</p>
  }

  /**
   * Función para manejar la carga de más reseñas.
   * Incrementa el contador de reseñas visibles en 3 cada vez que se llama.
   */
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3)
  }

  return (
    <div className='space-y-8'>
      {reviews.slice(0, visibleCount).map((review, index) => (
        <div key={review._id}>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0 mr-3'>
              <div className='w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium'>
                {review.name.charAt(0)}
              </div>
            </div>
            <div>
              <Ratings ratings={review.ratings} />
              <p className='text-foreground mt-2 text-justify'>{review.comment}</p>
              <div className='mt-3'>
                <p className='font-semibold text-foreground'>{review.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {/* Le damos formato a la fecha de la reseña Ej: May 5, 2025 */}
                  {new Date(review.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          {/* Crea un borde de separacion entre reseñas para que se vea mas estetica */}
          {index < visibleCount - 1 && index < reviews.length - 1 && (
            <hr className='mt-6 border-t border-border' />
          )}
        </div>
      ))}
      {/* Si el producto tiene mas de 3 reseñas se pueden cargar mas al dar click al boton */}
      {reviews.length > 3 && visibleCount < reviews.length && (
        <div className='flex items-center text-foreground justify-center'>
          <RefreshCcw className='text-foreground w-4 h-4' />
          <Button onClick={handleLoadMore} variant='link' className='text-primary hover:text-primary-hover'>
            Cargar más reseñas
          </Button>
        </div>
      )}
    </div>
  )
}
