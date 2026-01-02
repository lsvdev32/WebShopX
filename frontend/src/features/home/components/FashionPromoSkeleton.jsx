import Container from '@/components/common/Container'

/**
 * Skeleton de carga para la sección de promociones de moda.
 * Muestra un contenedor con un fondo gris y animación de pulsación.
 * @returns {JSX.Element} Componente de esqueleto de carga para promociones de moda.
 */

export default function FashionPromoSkeleton () {
  return (
    <section className='py-6'>
      <Container>
        <div className='h-64 bg-card rounded-lg animate-pulse' />
        <div className='my-10 h-16 bg-card rounded animate-pulse' />
      </Container>
    </section>
  )
}
