import { useState } from 'react'
import ProductDescription from './ProductDescription'
import ProductRatingSummary from './ProductRatingSummary'
import ProductDetailsForm from './ProductReviewForm'
import ProductReviews from './ProductReviews'

/**
 * Componente para mostrar las pestañas de detalles del producto.
 * Permite alternar entre la descripción del producto y las reseñas.
 * @param {*} param0 - Objeto que contiene el producto, información del usuario, función para enviar reseñas,
 * estado de carga de reseñas, referencia a las reseñas, estado de visibilidad del formulario de reseñas,
 * función para alternar el formulario de reseñas y la reseña del usuario.
 * @returns JSX.Element - Componente de pestañas de detalles del producto.
 */
export default function ProductTabs ({
  product,
  userInfo,
  onReviewSubmit,
  loadingCreateReview,
  reviewsRef,
  showReviewForm,
  toggleReviewForm,
  userReview
}) {
  // Estado para controlar la pestaña activa (descripción o reseñas)
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className='mt-8'>
      <div className='border-b border-border flex'>
        <button
          onClick={() => setActiveTab('description')}
          className={`py-2 px-4 font-medium text-sm transition-colors ${
            activeTab === 'description'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Descripción
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-2 px-4 font-medium text-sm flex items-center transition-colors ${
            activeTab === 'reviews'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Reseñas
          {product.numReviews > 0 && (
            <span className='ml-1 bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded-full'>
              {product.numReviews}
            </span>
          )}
        </button>
      </div>
      <div className='py-4'>
        {activeTab === 'description' && <ProductDescription description={product.description} />}
        {activeTab === 'reviews' && (
          <div>
            <ProductRatingSummary product={product} />
            <div ref={reviewsRef}>
              <ProductReviews reviews={product.reviews} />
            </div>
            <div className='mt-4 text-center'>
              {userInfo && !showReviewForm && (
                <button
                  onClick={toggleReviewForm}
                  className='text-primary hover:text-primary-hover hover:underline transition-colors'
                >
                  ¿Quieres opinar sobre este producto?
                </button>
              )}
              {showReviewForm && (
                <ProductDetailsForm
                  userInfo={userInfo}
                  onSubmit={onReviewSubmit}
                  loading={loadingCreateReview}
                  userReview={userReview}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
