import AnimatedSection from '@/components/common/AnimatedSection'
import Container from '@/components/common/Container'
import { MessageBox } from '@/components/common/MessageBox'
import CardProduct from '@/components/layout/products/CardProduct'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import BestSellingProductsSkeleton from './BestSellingProductsSkeleton'

/**
 * Componente para mostrar la sección de productos más vendidos.
 * Utiliza un carrusel para dispositivos móviles y una cuadrícula para pantallas más grandes.
 * @param {*} param0 - Props que incluyen productos, estado de carga y error.
 * @returns JSX Element que representa la sección de productos más vendidos.
 */
export default function BestSellingProductsSection ({ products, loading, error }) {
  return (
    <AnimatedSection className='bg-primary text-primary-foreground'>
      <Container>
        <h1 className='text-start text-2xl font-light text-white mb-6'>Productos más vendidos</h1>
        {loading
          ? (
            <BestSellingProductsSkeleton />
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
                    className='w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl mx-auto'
                  >
                    <CarouselContent>
                      {/* Con slice solo mostramos la cantidad de productos que deseemos, en este caso solo se muestran 6 */}
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
