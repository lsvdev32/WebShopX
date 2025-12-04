import Container from '@/components/common/Container'
import SkeletonCard from '@/components/layout/products/SkeletonCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

/**
 * Skelton de carga para la sección de productos más vendidos.
 * Muestra un título y una cuadrícula de tarjetas de productos con animación de carga.
 * @returns {JSX.Element} Componente de esqueleto de productos más vendidos.
 */

export default function BestSellingProductsSkeleton () {
  return (
    <section className='bg-[#1a2238] text-white py-6'>
      <Container>
        <div className='h-6 w-1/3 bg-gray-200 rounded mb-6 animate-pulse' />
        <div className='block md:hidden'>
          <Carousel
            className='w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl mx-auto'
          >
            <CarouselContent>
              {[...Array(4).keys()].map((x) => (
                <CarouselItem key={x} className='pl-2 md:pl-4 basis-2/5 sm:basis-2/7 md:basis-[28.57%] lg:basis-1/5'>
                  <SkeletonCard />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className='hidden md:flex flex-wrap'>
          {[...Array(6).keys()].map((x) => (
            <div key={x} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mt-4'>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
