import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

/**
 * Skeleton de carga para la vista de detalles del producto.
 * Muestra un diseño de carga con elementos de esqueleto para simular la estructura de la página.
 * Incluye una galería de imágenes, información del producto, botones de acción y pestañas de descripción.
 * @returns {JSX.Element} Componente de esqueleto de vista de producto.
 */
export default function ProductDetailScreenSkeleton () {
  return (
    <div className='grid md:grid-cols-[1fr_400px] gap-6'>
      {/* Columna izquierda: Galería + Descripción */}
      <div className='space-y-6'>
        {/* Galería de imágenes */}
        <div className='flex gap-4'>
          {/* Thumbnails verticales */}
          <div className='flex flex-col gap-2'>
            {[1, 2, 3, 4].map((_, idx) => (
              <Skeleton
                key={idx}
                className='w-20 h-20 rounded-lg flex-shrink-0'
              />
            ))}
          </div>

          {/* Imagen principal */}
          <div className='flex-1 bg-card rounded-lg'>
            <Skeleton className='w-full aspect-square max-h-[450px]' />
          </div>
        </div>

        {/* Pestañas de Descripción/Reseñas */}
        <div className='space-y-4'>
          {/* Tabs */}
          <div className='border-b border-border flex gap-4'>
            <Skeleton className='h-7 w-28 mb-2' />
            <Skeleton className='h-7 w-28 mb-2' />
          </div>

          {/* Contenido de la descripción */}
          <div className='space-y-4 py-2'>
            <Skeleton className='h-6 w-48' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-4/5' />
            </div>

            <Skeleton className='h-6 w-40 mt-6' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
            </div>

            <Skeleton className='h-6 w-44 mt-6' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>

            <Skeleton className='h-6 w-36 mt-6' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha: Información del producto */}
      <div className='space-y-4'>
        <Card className='p-6 space-y-4 sticky top-20'>
          {/* Título */}
          <Skeleton className='h-7 w-full' />
          <Skeleton className='h-7 w-3/4' />

          {/* Rating */}
          <div className='flex items-center gap-2'>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <Skeleton key={idx} className='h-5 w-5' />
              ))}
            </div>
            <Skeleton className='h-4 w-20' />
          </div>

          {/* Precio */}
          <Skeleton className='h-10 w-48' />

          {/* Cuotas */}
          <Skeleton className='h-5 w-full' />

          {/* Características */}
          <div className='space-y-3 pt-2'>
            <Skeleton className='h-5 w-32' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-52' />
              <Skeleton className='h-4 w-64' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24 rounded-full' />
              </div>
            </div>
          </div>

          {/* Botón agregar al carrito */}
          <Skeleton className='h-11 w-full rounded-lg' />

          {/* Información adicional */}
          <div className='space-y-3 pt-2'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-4 w-48' />
            </div>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-4 w-40' />
            </div>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-4 w-44' />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
