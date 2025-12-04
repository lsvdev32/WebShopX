/**
 * Componente para mostrar publicidad o promociones destacadas.
 * Responsive: En móvil muestra una imagen al lado izquierdo y contenido a la derecha
 * En desktop mantiene el diseño original con imágenes en ambos lados
 */

import { cn } from '@/lib/utils'
import CardWrapper from './CardWrapper'

export function PromoBanner ({
  className,
  discount,
  title,
  subtitle,
  buttonText,
  buttonHref,
  leftImageSrc,
  rightImageSrc,
  ...props
}) {
  return (
    <CardWrapper
      className={cn('relative flex overflow-hidden bg-[#1a2238] text-white', className)}
      {...props}
    >
      {/* Layout Mobile: Horizontal (imagen izquierda + contenido derecha) */}
      <div className='flex w-full md:hidden'>
        {/* Imagen izquierda en móvil */}
        {leftImageSrc && (
          <div className='flex-shrink-0 w-2/5 flex items-center justify-center p-2'>
            <img
              src={leftImageSrc || '/placeholder.svg'}
              alt=''
              className='h-full w-full object-contain'
            />
          </div>
        )}

        {/* Contenido derecha en móvil */}
        <div className='flex-1 flex flex-col items-start justify-center p-4 text-left'>
          <div className='text-3xl font-bold mb-1'>-{discount}</div>
          <h2 className='text-base font-semibold mb-1 leading-tight'>{title}</h2>
          <p className='text-xs text-white/80 mb-3 line-clamp-2'>{subtitle}</p>
          {buttonText && (
            <button className='px-4 py-1.5 text-xs font-medium border border-white rounded-sm hover:bg-white hover:text-[#1a2238] transition-colors'>
              {buttonText}
            </button>
          )}
        </div>
      </div>

      {/* Layout Desktop: Original (imágenes en ambos lados) */}
      <div className='hidden md:flex w-full px-4 py-8 md:px-10 relative'>
        {leftImageSrc && (
          <div className='absolute bottom-0 left-0 h-full w-1/4 md:w-1/5'>
            <img
              src={leftImageSrc || '/placeholder.svg'}
              alt=''
              className='h-full w-full object-contain object-left-bottom'
            />
          </div>
        )}

        <div className='z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center'>
          <div className='mb-2 text-4xl font-bold md:text-5xl lg:text-6xl'>-{discount}</div>
          <h2 className='mb-2 text-xl font-semibold md:text-2xl'>{title}</h2>
          <p className='mb-6 max-w-md text-sm text-white/80'>{subtitle}</p>
          {buttonText && (
            <button className='inline-flex h-10 items-center justify-center rounded-sm border border-white bg-transparent px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#1a2238] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a2238]'>
              {buttonText}
            </button>
          )}
        </div>

        {rightImageSrc && (
          <div className='absolute bottom-0 right-0 h-full w-1/4 md:w-1/5'>
            <img
              src={rightImageSrc || '/placeholder.svg'}
              alt=''
              className='h-full w-full object-contain object-right-bottom'
            />
          </div>
        )}
      </div>
    </CardWrapper>
  )
}
