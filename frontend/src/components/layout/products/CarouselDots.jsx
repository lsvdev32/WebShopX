/**
 * Componente de indicadores (dots) para carruseles.
 * Muestra puntos que indican la posición actual en el carrusel.
 */

import { cn } from '@/lib/utils'

// Necesitamos importar React
import * as React from 'react'

export default function CarouselDots ({ api, className }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState([])

  React.useEffect(() => {
    if (!api) return

    setScrollSnaps(api.scrollSnapList())
    setSelectedIndex(api.selectedScrollSnap())

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (!api || scrollSnaps.length === 0) return null

  return (
    <div className={cn('flex justify-center gap-2 py-4', className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          className={cn(
            'h-2 w-2 rounded-full transition-all duration-300',
            index === selectedIndex
              ? 'bg-blue-600 w-6'
              : 'bg-gray-300 hover:bg-gray-400'
          )}
          onClick={() => api.scrollTo(index)}
          aria-label={`Ir a slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
