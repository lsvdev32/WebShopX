import AnimatedSection from '@/components/common/AnimatedSection'
import CardWrapper from '@/components/common/CardWrapper'
import Container from '@/components/common/Container'
import { MessageBox } from '@/components/common/MessageBox'
import ProductCarousel from '../../../components/layout/products/ProductCarousel'
import RecentProductsSkeleton from './RecentProductsSkeleton'

/**
 * Seccion de productos recientes que se muestra en la pagina de inicio.
 * Muestra una lista de productos agregados recientemente.
 * @param {*} param0 - objeto que contiene los productos, el estado de carga y el error.
 * @returns {JSX.Element} - Componente de seccion de productos recientes.
 */

export default function RecentProductsSection ({ products, loading, error }) {
  return (
    <AnimatedSection>
      <Container>
        <CardWrapper className='p-6'>
          <h2 className='text-start text-xl md:text-2xl font-light mb-4'>Productos agregados recientemente</h2>
          {loading
            ? (
              <RecentProductsSkeleton />
              )
            : error
              ? (
                <MessageBox variant='danger'>{error}</MessageBox>
                )
              : products.length > 0
                ? (
                  <ProductCarousel products={products} />
                  )
                : (
                  <MessageBox variant='warning'>No hay productos relacionados disponibles.</MessageBox>
                  )}
        </CardWrapper>
      </Container>
    </AnimatedSection>
  )
}
