import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useNavigate } from 'react-router'
import { sortOptions } from '../const/sortOptions'

/**
 * Componente de selección para ordenar productos
 * @param {*} param0 - Objeto que contiene el orden actual y la función para obtener la URL de filtro
 * @returns JSX.Element - Retorna un elemento JSX con el selector de ordenamiento
 * @description Este componente se utiliza para seleccionar el orden de los productos en la búsqueda.
 */
export default function SortSelect ({ currentOrder, getFilterUrl }) {
  const navigate = useNavigate()

  return (
    <Select
      value={currentOrder}
      onValueChange={(value) => navigate(getFilterUrl({ order: value }))}
      aria-label='Ordenar productos'
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Ordenar por' />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
