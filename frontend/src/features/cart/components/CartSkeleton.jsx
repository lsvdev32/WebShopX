import CardWrapper from '@/components/common/CardWrapper'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton de carga para el carrito de compras.
 * Muestra un diseño de carga mientras se obtienen los datos del carrito.
 * @returns {JSX.Element} Componente de esqueleto del carrito de compras.
 */
export default function CartSkeleton () {
  return (
    <CardWrapper className='lg:col-span-2 p-6 animate-pulse'>
      <div className='mb-6'>
        <Skeleton className='h-8 w-1/3 rounded' />
      </div>
      <div className='space-y-4'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-6 flex items-center space-x-4'>
              <Skeleton className='w-16 h-16 rounded-lg' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-3/4 rounded' />
                <Skeleton className='h-3 w-1/2 rounded' />
              </div>
            </div>
            <div className='col-span-3 flex justify-center'>
              <Skeleton className='h-10 w-20 rounded' />
            </div>
            <div className='col-span-3 flex items-center justify-end space-x-4'>
              <Skeleton className='h-4 w-16 rounded' />
              <Skeleton className='h-8 w-8 rounded-full' />
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  )
}
