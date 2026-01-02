/**
 * Skeleton de carga para la sección de pedidos en la interfaz de administración.
 * Muestra un diseño de carga animado mientras se obtienen los datos de los pedidos.
 */

import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function OrdersSkeleton () {
  return (
    <section className='w-full py-6 animate-pulse'>
      <div className='mb-6'>
        <Skeleton className='h-8 w-1/3 rounded' />
        <Skeleton className='h-4 w-2/3 rounded mt-2' />
      </div>
      <CardWrapper>
        <CardContent className='py-4'>
          <div className='grid grid-cols-8 gap-4 mb-4'>
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className='h-4 rounded' />
            ))}
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='grid grid-cols-8 gap-4 py-2'>
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className='h-4 rounded' />
              ))}
            </div>
          ))}
        </CardContent>
      </CardWrapper>
    </section>
  )
}
