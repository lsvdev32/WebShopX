/**
 * Cards para mostrar promociones o ofertas especiales.
 */

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import CardWrapper from './CardWrapper'

export function PromoCard ({
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
    <CardWrapper
      className={cn(
        'flex overflow-hidden bg-card text-card-foreground shadow-sm h-[300px] transition-shadow hover:shadow-md',
        imagePosition === 'left' ? 'flex-row-reverse' : 'flex-row',
        className
      )}
      {...props}
    >
      <div className='flex flex-1 flex-col justify-between p-6'>
        <div className='space-y-2'>
          <p className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>{tagline}</p>
          <h3 className='text-2xl font-bold text-foreground'>{title}</h3>
        </div>
        <Button className='bg-primary text-primary-foreground hover:bg-primary-hover transition-colors'>
          {ctaText}
        </Button>
      </div>
      {imageSrc && (
        <div className='w-1/2'>
          <img src={imageSrc} alt={imageAlt} className='h-full w-full object-cover' />
        </div>
      )}
    </CardWrapper>
  )
}
