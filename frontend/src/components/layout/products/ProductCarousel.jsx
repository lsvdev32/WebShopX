/**
 * Este componente es el slider de productos que se muestra en la página de inicio.
 * Utiliza el componente Carousel para mostrar los productos de forma deslizante.
 */

import CardProductSlider from '@/components/layout/products/CardProductSlider'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function ProductCarousel ({ products, className }) {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className='w-full max-w-[75vw] sm:max-w-[80vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl mx-auto'
    >
      <CarouselContent className='-ml-2 md:-ml-4'>
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className={`pl-2 md:pl-4 basis-2/3 sm:basis-2/5 md:basis-[28.57%] lg:basis-1/5 ${className}`}
          >
            <div className='p-1'>
              <CardProductSlider product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
