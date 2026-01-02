/**
 * Componentes de columnas para la tabla de pedidos en la sección de administración.
 */

import ActionsMenu from '@/components/common/ActionsMenu'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/format-date-time'
import { formatPrice } from '@/utils/pricing'
import { CheckCircle, FileSliders, Trash2 } from 'lucide-react'

export const getOrderTableColumns = ({ handleViewDetails, handleMarkAsDelivered, handleDeleteOrder }) => [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Seleccionar todos'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label='Seleccionar fila'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },

  // Columna de ID de la orden
  {
    accessorKey: '_id',
    header: 'ID'
  },

  // Columna de nombre del usuario
  {
    accessorKey: 'user',
    header: 'Usuario',
    cell: ({ row }) => {
      const user = row.original.user
      return <p>{user ? user.name : 'Usuario eliminado'}</p>
    }
  },

  // Columna de fecha de creación de la orden
  {
    accessorKey: 'createdAt',
    header: 'Fecha de creación',
    cell: ({ row }) => <p>{formatDateTime(row.original.createdAt)}</p>
  },

  // Clumna de total pagado
  {
    accessorKey: 'totalPrice',
    header: 'Total pagado',
    cell: ({ row }) => formatPrice(row.getValue('totalPrice'))
  },

  // Columna de estado de pago de la orden
  {
    accessorKey: 'isPaid',
    header: '¿Orden pagada?',
    cell: ({ row }) => {
      const isPaid = row.getValue('isPaid')
      return (
        <div className='text-center'>
          {/* Si la orden ya fue pagada, mostramos un badge de color verde, si no, mostramos un badge de color rojo */}
          <Badge
            variant='outline'
            className={isPaid ? 'text-success text-xs border-success dark:text-success dark:border-success' : 'text-red-600 text-xs border-red-600 dark:text-red-400 dark:border-red-400'}
          >
            {isPaid ? 'PAGADA' : 'NO PAGADA'}
          </Badge>
        </div>
      )
    }
  },

  // Columna de estado de entrega de la orden
  {
    accessorKey: 'isDelivered',
    header: '¿Orden entregada?',
    cell: ({ row }) => {
      const isDelivered = row.getValue('isDelivered')
      return (
        <div className='text-center'>
          {/* Si la orden ya fue entregada, mostramos un badge de color verde, si no, mostramos un badge de color rojo */}
          <Badge
            variant='outline'
            className={isDelivered ? 'text-success text-xs border-success dark:text-success dark:border-success' : 'text-red-600 text-xs border-red-600 dark:text-red-400 dark:border-red-400'}
          >
            {isDelivered ? 'ENTREGADA' : 'NO ENTREGADA'}
          </Badge>
        </div>
      )
    }
  },

  // Columna de acciones
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original
      return (
        /**
         * Componente ActionsMenu que muestra las acciones disponibles para cada orden, incluye ver detalles, marcar como entregada y eliminar orden,
         * funciones que estan definidas en el hook useOrder y se pasan como props
         */
        <ActionsMenu
          actions={[
            {
              label: 'Ver detalles de la orden',
              onClick: () => handleViewDetails(order._id),
              icon: FileSliders
            },
            {
              label: 'Marcar como entregada',
              confirm: true,
              confirmTitle: 'Confirmar entrega',
              confirmDescription: '¿Estás seguro de que esta orden ha sido entregada?',
              confirmText: 'Sí, marcar como entregada',
              onClick: () => handleMarkAsDelivered(order._id),
              icon: CheckCircle
            },
            {
              label: 'Eliminar orden',
              confirm: true,
              confirmTitle: 'Eliminar orden',
              confirmDescription: '¿Estás seguro de que deseas eliminar esta orden?',
              confirmText: 'Sí, eliminar',
              onClick: () => handleDeleteOrder(order._id),
              icon: Trash2
            }
          ]}
        />
      )
    }
  }
]
