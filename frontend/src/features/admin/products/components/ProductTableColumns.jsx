/**
 * Componentes de columnas para la tabla de pedidos en la sección de administración.
 */

import ActionsMenu from '@/components/common/ActionsMenu'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/utils/pricing'
import { FileSliders, Trash2 } from 'lucide-react'

export const getProductTableColumns = ({ handleEditProduct, handleDeleteProduct }) => [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Seleccionar todos'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Seleccionar fila'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },

  // Columna de ID del producto
  {
    accessorKey: '_id',
    header: 'ID'
  },

  // Columna de imagen del producto
  {
    accessorKey: 'images',
    header: 'Imagen',
    cell: ({ row }) => {
      const images = row.getValue('images')
      const imageUrl = images && Array.isArray(images) && images.length > 0
        ? images[0]
        : '/placeholder.svg'
      return (
        <div className='bg-white w-full h-full rounded-sm'>
          <img
            src={imageUrl}
            alt={row.getValue('name') || 'Imagen del producto'}
            className='w-12 h-12 object-contain aspect-[16/9]'
          />
        </div>
      )
    }
  },

  // Columna de nombre del producto
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => (
      <span className='text-ellipsis line-clamp-1'>{row.getValue('name')}</span>
    )
  },

  // Columna de precio del producto
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => formatPrice(row.getValue('price'))
  },

  // Columna de categoría del producto
  { accessorKey: 'category', header: 'Categoría' },

  // Columna de marca del producto
  { accessorKey: 'brand', header: 'Marca' },

  // Columna de stock del producto
  {
    accessorKey: 'stock',
    header: () => <div className='text-center'>Stock</div>,
    cell: ({ row }) => {
      const stock = row.getValue('stock')
      return (
        <div className='text-center'>
          {/* Si el stock es mayor a 5, mostramos un badge de color verde, si es mayor a 0 pero menor o igual a 5, mostramos un badge de color naranja, si es 0, mostramos un badge de color rojo */}
          <Badge
            variant='outline'
            className={
              stock > 5
                ? 'text-success text-xs border-success dark:text-success dark:border-success'
                : stock > 0
                  ? 'text-[#f59e0b] text-xs border-[#f59e0b] dark:text-[#fbbf24] dark:border-[#fbbf24]'
                  : 'text-red-600 text-xs border-red-600 dark:text-red-400 dark:border-red-400'
            }
          >
            {stock > 5 ? 'Disponible' : stock > 0 ? 'Stock bajo' : 'Agotado'}
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
      const product = row.original
      return (

        /**
         * Componente ActionsMenu que muestra las acciones disponibles para cada producto, incluye editar y eliminar producto,
         * funciones que estan definidas en el hook useProduct y se pasan como props
         */
        <ActionsMenu
          actions={[
            {
              label: 'Editar producto',
              onClick: () => handleEditProduct(product),
              icon: FileSliders
            },
            {
              label: 'Eliminar producto',
              confirm: true,
              confirmTitle: 'Eliminar producto',
              confirmDescription: '¿Estás seguro de que quieres eliminar este producto?',
              confirmText: 'Sí, eliminar',
              onClick: () => handleDeleteProduct(product._id),
              icon: Trash2
            }
          ]}
        />
      )
    }
  }
]
