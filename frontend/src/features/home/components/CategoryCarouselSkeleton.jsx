import CardWrapper from '@/components/common/CardWrapper'
import Container from '@/components/common/Container'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton de carga para el carrusel de categorías.
 * Muestra un diseño de carga con elementos animados para simular el contenido.
 * @returns {JSX.Element} Componente de esqueleto del carrusel de categorías.
 */

export default function CategoryCarouselSkeleton () {
  return (
    <section className='pb-10'>
      <Container>
        <CardWrapper className='p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <Skeleton className='h-6 w-1/3 rounded animate-pulse' />
            <div className='flex items-center'>
              <Skeleton className='h-4 w-24 rounded mr-4' />
              <div className='flex'>
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className='mx-0.5 h-2 w-2 rounded-full' />
                ))}
              </div>
            </div>
          </div>
          <Carousel className='w-full'>
            <CarouselContent>
              <CarouselItem className='p-6'>
                <div className='grid grid-cols-1 sm:grid-rows-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse'>
                  {[...Array(12)].map((_, index) => (
                    <Skeleton key={index} className='h-24 rounded-lg' />
                  ))}
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </CardWrapper>
      </Container>
    </section>
  )
}
