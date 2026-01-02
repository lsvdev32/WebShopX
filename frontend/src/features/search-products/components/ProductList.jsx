import CardWrapper from '@/components/common/CardWrapper'
import Ratings from '@/components/common/Ratings'
import { CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { calculateFreeShipping, formatPrice } from '@/utils/pricing'
import { Truck } from 'lucide-react'
import { Link } from 'react-router'

/**
 * Componente que muestra una lista de productos
 * @param {*} param0 - Objeto que contiene los productos a mostrar
 * @returns JSX.Element - Retorna un elemento JSX con la lista de productos
 */
export default function ProductList ({ products }) {
  return (
    <div className='space-y-4 md:space-y-0 md:grid md:grid-cols-1 md:gap-4'>
      {products.map((product, index) => (
        <div key={product._id}>
          <CardWrapper className='overflow-hidden hover:shadow-md transition-shadow w-full'>
            <CardContent className='p-4 flex flex-col md:flex-row gap-6'>
              <Link to={`/product/${product.link}`} className='md:w-48 h-48 overflow-hidden flex-shrink-0'>
                <img
                  src={product.images?.[0] || '/placeholder.svg'}
                  alt={`Imagen de ${product.name}`}
                  className='w-full h-full object-contain rounded-md hover:scale-105 transition-transform bg-white p-0'
                />
              </Link>
              <div className='flex-1 space-y-4 group'>
                <div>
                  <Link
                    to={`/product/${product.link}`}
                    className='text-lg font-medium line-clamp-1 text-ellipsis text-foreground hover:text-primary-hover transition-colors'
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    {product.name}
                  </Link>
                  <p className='text-sm text-muted-foreground mt-1'>Marca: {product.brand}</p>
                </div>
                <Ratings ratings={product.ratings} numReviews={product.numReviews} />
                <div>
                  <p className='text-2xl text-foreground'>{formatPrice(product.price)}</p>
                  <div className='mt-2 flex items-center gap-2 text-success'>
                    <Truck className='h-4 w-4' aria-hidden='true' />
                    <p className='text-xs'>
                      {calculateFreeShipping(product.price) ? 'Envío gratis' : `Envío: ${formatPrice(20000)}`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardWrapper>
          {index < products.length - 1 && <Separator className='md:hidden my-4' />}
        </div>
      ))}
    </div>
  )
}
