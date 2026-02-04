import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router'

/**
 * Componente para mostrar etiquetas de filtros aplicados en la búsqueda de productos
 * @param {*} param0 - Contiene los filtros aplicados y la función para navegar
 * @param {string} param0.query - Término de búsqueda
 * @returns {JSX.Element} - Etiquetas de filtros aplicados
 */
export default function FilterTags ({ query, category, price, ratings, getFilterUrl }) {
  // Hook para navegar a diferentes rutas
  const navigate = useNavigate()
  /**
   * Lista de filtros aplicados
   */
  const filters = [
    { label: 'Búsqueda', value: query, reset: { query: 'all' } },
    { label: 'Categoría', value: category, reset: { category: 'all' } },
    { label: 'Precio', value: price, reset: { price: 'all' } },
    { label: 'Calificación', value: ratings, reset: { ratings: 'all' } } // CAMBIADO: rating → ratings
  ].filter((f) => f.value !== 'all')

  return (
    <div className='flex flex-wrap gap-2'>
      {filters.map((filter) => (
        <Badge key={filter.label} variant='secondary'>
          {filter.label}: {filter.value}
          <X
            className='ml-1 h-3 w-3 cursor-pointer'
            onClick={() => navigate(getFilterUrl(filter.reset))}
            aria-label={`Eliminar filtro ${filter.label}`}
          />
        </Badge>
      ))}
    </div>
  )
}
