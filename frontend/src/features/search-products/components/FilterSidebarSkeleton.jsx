import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Componente skeleton para la barra lateral de filtros
 * @param {*} param0 - Objeto con la propiedad isMobile
 * @param {boolean} param0.isMobile - Indica si el componente se renderiza en móvil
 * @returns {JSX.Element} - Componente de esqueleto para la barra lateral de filtros
 */
export default function FilterSidebarSkeleton ({ isMobile = false }) {
  const content = (
    <div className='space-y-6 animate-pulse'>
      <div>
        <Skeleton className='h-6 w-1/3 rounded mb-3' />
        <div className='space-y-2'>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className='h-4 w-full rounded' />
          ))}
        </div>
      </div>
      <Skeleton className='h-px' />
      <div>
        <Skeleton className='h-6 w-1/3 rounded mb-3' />
        <div className='space-y-2'>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className='h-4 w-full rounded' />
          ))}
        </div>
      </div>
      <Skeleton className='h-px' />
      <div>
        <Skeleton className='h-6 w-1/3 rounded mb-3' />
        <div className='space-y-2'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className='h-4 w-full rounded' />
          ))}
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return content
  }

  return (
    <CardWrapper className='sticky top-4'>
      <CardContent className='p-4'>{content}</CardContent>
    </CardWrapper>
  )
}
