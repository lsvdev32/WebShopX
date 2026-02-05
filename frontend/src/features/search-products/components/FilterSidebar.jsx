import CardWrapper from '@/components/common/CardWrapper'
import { CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Star } from 'lucide-react'
import { Link } from 'react-router'
import { prices } from '../const/prices'
import { ratings } from '../const/ratings'

/**
 * Componente para la barra lateral de filtros en la página de búsqueda de productos.
 * Permite filtrar productos por categoría, precio y calificación.
 */

export default function FilterSidebar ({ categories, currentCategory, currentPrice, currentRating, getFilterUrl, isMobile }) {
  const content = (
    <div className='space-y-4'>
      <div>
        <h3 className='font-medium mb-3'>Categorías</h3>
        <ScrollArea className='h-[200px]'>
          <div className='space-y-2'>
            <Link
              className={`block text-sm hover:text-primary transition-colors ${
                currentCategory === 'all' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
              to={getFilterUrl({ category: 'all' })}
              aria-label='Todas las categorías'
            >
              Todas las categorías
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                className={`block text-sm hover:text-primary transition-colors ${
                  c === currentCategory ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
                to={getFilterUrl({ category: c })}
                aria-label={`Filtrar por categoría ${c}`}
              >
                {c}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <Separator />
      <div>
        <h3 className='font-medium mb-3'>Precio</h3>
        <div className='space-y-2'>
          <Link
            className={`block text-sm hover:text-primary transition-colors ${
              currentPrice === 'all' ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
            to={getFilterUrl({ price: 'all' })}
            aria-label='Cualquier precio'
          >
            Cualquier precio
          </Link>
          {prices.map((p) => (
            <Link
              key={p.value}
              className={`block text-sm hover:text-primary transition-colors ${
                p.value === currentPrice ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
              to={getFilterUrl({ price: p.value })}
              aria-label={`Filtrar por precio ${p.name}`}
            >
              {p.name}
            </Link>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className='font-medium mb-3'>Calificaciones</h3>
        <div className='space-y-2'>
          <Link
            className={`block text-sm hover:text-primary transition-colors ${
              currentRating === 'all' ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
            to={getFilterUrl({ ratings: 'all' })} // CAMBIADO: rating → ratings
            aria-label='Todas las calificaciones'
          >
            Todas las calificaciones
          </Link>
          {ratings.map((r) => (
            <Link
              key={r.rating}
              className={`block text-sm hover:text-primary transition-colors ${
                `${r.rating}` === currentRating ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
              to={getFilterUrl({ ratings: r.rating })} // CAMBIADO: rating → ratings
              aria-label={`Filtrar por calificación ${r.name}`}
            >
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < r.rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'
                    }`}
                  />
                ))}
                {/* agregamos el nombre de las calificaciones 'r.name' */}
                <span className='ml-1 text-xs'>{r.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return content
  }

  return (
    <CardWrapper>
      <CardContent className='p-4'>{content}</CardContent>
    </CardWrapper>
  )
}
