/**
 * Este componente es una cart de prosucto utilizada en un slider de productos.
 * Muestra la imagen del producto, nombre, precio, calificaciones y opciones de envío.
 */

import Ratings from '@/components/common/Ratings'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { calculateSavings, formatPrice } from '@/utils/pricing'
import { Truck } from 'lucide-react'
import { Link } from 'react-router'

export default function CardProductSlider ({ product }) {
  const installmentPrice = product.price > 0 ? formatPrice(product.price / 3) : null // Si el precio es mayor a 0, se calcula el precio de la cuota

  return (
    <Card className='rounded-sm border bg-white dark:bg-background transition-all hover:shadow-md hover:border-primary/50'>
      <Link to={`/product/${product.link}`} className='block group'>
        <CardHeader className=' bg-white m-2 rounded-sm p-0'>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className='aspect-[16/9] h-full w-full object-contain'
          />
        </CardHeader>
        <CardContent className='p-3'>
          <Ratings ratings={product.ratings} numReviews={product.numReviews} />
          <p className='min-h-fit line-clamp-2 overflow-hidden text-ellipsis text-xs text-foreground group-hover:text-primary transition-colors'>
            {product.name}
          </p>
          <p className='text-sm font-semibold mt-3 text-foreground'>{formatPrice(product.price)}</p>
          {installmentPrice && (
            <p className='mt-2 text-xs'>
              en <span className='text-success line-clamp-2 overflow-hidden text-ellipsis'>3 cuotas de {installmentPrice} con 0% de intereses</span>
            </p>
          )}
          <div className='mt-3 flex items-center gap-2 text-success'>
            <Truck className='h-4 w-4' />
            <p className='text-xs'>
              {calculateSavings ? 'Envío gratis' : `Envío: ${formatPrice(20000)}`}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
