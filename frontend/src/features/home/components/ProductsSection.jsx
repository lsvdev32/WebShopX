import AnimatedSection from '@/components/common/AnimatedSection'
import Container from '@/components/common/Container'
import { MessageBox } from '@/components/common/MessageBox'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CardProduct from '../../../components/layout/products/CardProduct'
import ProductsSectionSkeleton from './ProductsSectionSkeleton'

/**
 * Seccion de productos que se muestra en la página de inicio.
 * Muestra un carrusel en dispositivos móviles y una cuadrícula en pantallas más grandes.
 * @param {*} param0 - Contiene los productos, estado de carga y error.
 * @returns JSX Element que representa la sección de productos.
 */
export default function ProductsSection ({ products, loading, error }) {
  return (
    <AnimatedSection>
      <Container>
        {loading
          ? (
            <ProductsSectionSkeleton />
            )
          : error
            ? (
              <MessageBox variant='danger'>{error}</MessageBox>
              )
            : (
              <>
                <div className='block md:hidden'>
                  <Carousel
                    opts={{ align: 'start' }}
                    className='w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl mx-auto' // estamos verificando el ancho de las cards para el responsive
                  >
                    <CarouselContent>
                      {products.slice(0, 6).map((product) => (
                        <CarouselItem key={product._id} className='pl-4 md:pl-6 basis-2/5 sm:basis-2/7 md:basis-[28.57%] lg:basis-1/5'>
                          <CardProduct product={product} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
                <div className='hidden md:flex flex-wrap'>
                  {products.slice(0, 6).map((product) => (
                    <div key={product._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mt-4'>
                      <CardProduct product={product} />
                    </div>
                  ))}
                </div>
              </>
              )}
      </Container>
    </AnimatedSection>
  )
}
