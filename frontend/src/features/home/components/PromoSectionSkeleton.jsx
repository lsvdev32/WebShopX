import Container from '@/components/common/Container'

/**
 * Skeleton de la seccion de promociones que se muestra en la pagina de inicio.
 * Muestra una lista de tarjetas de promociones en estado de carga.
 * @returns {JSX.Element} - Componente de skeleton de seccion de promociones.
 */

export default function PromoSectionSkeleton () {
  return (
    <section className='py-6'>
      <Container>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 animate-pulse'>
          {[...Array(2).keys()].map((x) => (
            <div key={x} className='h-64 bg-card rounded-lg' />
          ))}
        </div>
      </Container>
    </section>
  )
}
