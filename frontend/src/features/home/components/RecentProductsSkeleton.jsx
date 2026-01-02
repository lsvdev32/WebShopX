import CardWrapper from '@/components/common/CardWrapper'
import Container from '@/components/common/Container'
import SkeletonCardSlider from '@/components/layout/products/SkeletonCardSlider'

/**
 * Skeleton de la seccion de productos recientes que se muestra en la pagina de inicio.
 */

export default function RecentProductsSkeleton () {
  return (
    <section className='py-6'>
      <Container>
        <CardWrapper className='md:flex flex-wrap p-6'>
          {[...Array(5).keys()].map((x) => (
            <div key={x} className='pl-2 md:pl-4 basis-2/3 sm:basis-2/5 md:basis-[28.57%] lg:basis-1/5'>
              <SkeletonCardSlider />
            </div>
          ))}
        </CardWrapper>
      </Container>
    </section>
  )
}
