import AnimatedSection from '@/components/common/AnimatedSection'
import { MessageBox } from '@/components/common/MessageBox'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Helmet } from 'react-helmet-async'
import OrderHistoryTable from '../components/OrderHistoryTable'
import OrderHistoryTableSkeleton from '../components/OrderHistoryTableSkeleton'
import useOrderHistory from '../hooks/useOrderHistory'

/**
 * Componente para mostrar el historial de órdenes del usuario
 * @returns {JSX.Element} - Componente de historial de órdenes
 * @description Este componente utiliza un hook personalizado para manejar la lógica de carga, error y orden
 */
export default function OrderHistoryScreen () {
  const { loading, error, orders, searchQuery, setSearchQuery, sortOrder, setSortOrder } = useOrderHistory()

  return (
    <AnimatedSection>
      <div className='container mx-auto px-4 py-8'>
        <Helmet>
          <title>Historial de compras | WebShopX</title>
        </Helmet>
        <div className='mb-6 flex flex-col sm:flex-row gap-4 bg-card w-fit p-2 rounded-sm'>
          <Input
            type='text'
            placeholder='Buscar por ID de orden'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='max-w-md'
            aria-label='Buscar órdenes por ID'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='bg-background text-muted-foreground dark:bg-background dark:border-border' aria-label='Seleccionar criterio de ordenamiento'>
                {sortOrder === 'recent' ? 'Más recientes' : 'Más antiguas'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setSortOrder('recent')}
                aria-label='Ordenar por más recientes'
              >
                Más recientes
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOrder('oldest')}
                aria-label='Ordenar por más antiguas'
              >
                Más antiguas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {loading
          ? (
            <OrderHistoryTableSkeleton />
            )
          : error
            ? (
              <MessageBox variant='danger'>{error}</MessageBox>
              )
            : (
              <OrderHistoryTable orders={orders} />
              )}
      </div>
    </AnimatedSection>
  )
}
