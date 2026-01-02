import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Componente de esqueleto para la lista de productos
 * @returns JSX.Element - Retorna un elemento JSX con el esqueleto de la lista de productos
 * @description Este componente se utiliza para mostrar un esqueleto de carga mientras se obtienen los datos de los productos.
 */
export default function ProductListSkeleton () {
  return (
    <div className='space-y-4 animate-pulse'>
      <div className='flex justify-between mb-6'>
        <Skeleton className='h-4 w-1/4 rounded' />
        <Skeleton className='h-10 w-32 rounded' />
      </div>
      <div className='space-y-4 md:space-y-0 md:grid md:grid-cols-1 md:gap-4'>
        {[...Array(5)].map((_, i) => (
          <CardWrapper key={i} className='p-4'>
            <CardContent className='flex flex-col md:flex-row gap-6'>
              <Skeleton className='md:w-48 h-48 rounded-md' />
              <div className='flex-1 space-y-4'>
                <Skeleton className='h-6 w-3/4 rounded' />
                <Skeleton className='h-4 w-1/2 rounded' />
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-4 w-24 rounded' />
                </div>
                <Skeleton className='h-6 w-1/4 rounded' />
              </div>
            </CardContent>
          </CardWrapper>
        ))}
      </div>
    </div>
  )
}
