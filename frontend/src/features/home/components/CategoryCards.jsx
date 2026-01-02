import { cn } from '@/lib/utils'
import { Link } from 'react-router'

/**
 * Card para la sección de categorías en la página de inicio.
 * @param {*} param0 - Props del componente
 * @returns JSX.Element - Componente de tarjeta de categoría
 */

export function CategoryCard ({ className, title, imageSrc, imageAlt, href = '#', ...props }) {
  return (
    <Link
      to={href}
      className={cn(
        'flex overflow-hidden rounded-sm border bg-white dark:bg-background text-card-foreground transition-all hover:shadow-md hover:border-primary/50',
        className
      )}
      {...props}
    >
      <div className='flex w-[120px] items-center justify-center bg-background p-2'>
        <div className='bg-white rounded-sm p-2'>
          <img
            src={imageSrc || '/placeholder.svg?height=80&width=80'}
            alt={imageAlt || title}
            className='h-full w-full object-contain'
          />
        </div>
      </div>
      <div className='flex flex-1 items-center p-4'>
        <h3 className='text-base font-medium'>{title}</h3>
      </div>
    </Link>
  )
}
