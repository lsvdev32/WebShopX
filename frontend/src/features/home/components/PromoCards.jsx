import { cn } from '@/lib/utils'

/**
 * Cards para promociones horizontales. Las tarjetas promocionales horizontales se utilizan para destacar ofertas o productos de manera visualmente atractiva.
 * Estas tarjetas incluyen un título, un subtítulo, una imagen y un botón de llamada a la acción.
 * @param {*} param0 - Props que recibe el componente.
 * @returns {JSX.Element} - Componente de tarjeta promocional horizontal.
 */

export function HorizontalPromoCard ({
  className,
  tagline,
  title,
  ctaText = 'Ver ofertas',
  imageSrc,
  imageAlt = 'Promotional image',
  imagePosition = 'right',
  ...props
}) {
  return (
    <div
      className={cn(
        'flex overflow-hidden rounded-lg bg-card shadow-sm',
        imagePosition === 'left' ? 'flex-row-reverse' : 'flex-row',
        className
      )}
      {...props}
    >
      <div className='flex flex-1 flex-col justify-between p-6'>
        <div className='space-y-2'>
          <p className='text-sm font-medium uppercase tracking-wider text-gray-500'>{tagline}</p>
          <h3 className='text-2xl font-bold text-card-foreground'>{title}</h3>
        </div>
        <button className='mt-4 inline-flex h-10 w-fit items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'>
          {ctaText}
        </button>
      </div>
      {imageSrc && (
        <div className='w-1/2'>
          <img src={imageSrc || '/placeholder.svg'} alt={imageAlt} className='h-full w-full object-cover' />
        </div>
      )}
    </div>
  )
}
