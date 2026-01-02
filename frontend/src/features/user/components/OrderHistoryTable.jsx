import CardWrapper from '@/components/common/CardWrapper'
import { MessageBox } from '@/components/common/MessageBox'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatPrice } from '@/utils/pricing'
import { useNavigate } from 'react-router'

/**
 * Componente para mostrar el historial de órdenes del usuario
 * @param {*} param0 - Objeto que contiene las órdenes del usuario
 * @returns JSX.Element - Componente que muestra una tabla con el historial de órdenes
 */
export default function OrderHistoryTable ({ orders }) {
  const navigate = useNavigate()

  return (
    <CardWrapper className='p-6'>
      <h1 className='text-2xl font-light mb-6'>Historial de compras</h1>
      {orders.length === 0
        ? (
          <MessageBox variant='warning'>No se encontraron órdenes que coincidan con la búsqueda.</MessageBox>
          )
        : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pagado</TableHead>
                <TableHead>Entregado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                  <TableCell>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</TableCell>
                  <TableCell>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</TableCell>
                  <TableCell>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => navigate(`/order/${order._id}`)}
                      aria-label={`Ver detalles de la orden ${order._id}`}
                      className='dark:bg-transparent'
                    >
                      Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
    </CardWrapper>
  )
}
