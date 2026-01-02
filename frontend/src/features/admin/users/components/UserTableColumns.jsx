/**
 * Componente de columnas para la tabla de usuarios en el panel de administración.
 */

import ActionsMenu from '@/components/common/ActionsMenu'
import { Badge } from '@/components/ui/badge'
import { UserRoundCog, UserRoundMinus } from 'lucide-react'

export const getUserTableColumns = ({ handleEditUser, handleDeleteUser }) => [
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

  // Columna de ID del usuario
  { accessorKey: '_id', header: 'ID' },

  // Columna de email del usuario
  { accessorKey: 'name', header: 'Nombre' },

  // Columna de teléfono del usuario
  { accessorKey: 'email', header: 'Email' },

  // Columna de teléfono del usuario
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ row }) => <p>+57 {row.getValue('phone')}</p>
  },

  // Columna de estado del usuario, muestra si el usuario es administrador o no
  {
    accessorKey: 'isAdmin',
    header: () => <div className='text-center'>¿Es Admin?</div>,
    cell: ({ row }) => {
      const isAdmin = row.getValue('isAdmin')
      return (
        <div className='text-center'>
          <Badge
            variant='outline'
            className={isAdmin ? 'text-primary border-primary dark:border-primary' : 'text-foreground border-foreground'}
          >
            {isAdmin ? 'SÍ' : 'NO'}
          </Badge>
        </div>
      )
    }
  },

  // Columna de acciones, permite editar o eliminar al usuario
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return (

        /**
         * Componente ActionsMenu que muestra las acciones disponibles para cada usuario, incluye editar y eliminar usuario,
         * funciones que estan definidas en el hook useUser y se pasan como props
         */
        <ActionsMenu
          actions={[
            {
              label: 'Editar usuario',
              onClick: () => handleEditUser(user),
              icon: UserRoundCog
            },
            {
              label: 'Eliminar usuario',
              confirm: true,
              confirmTitle: 'Eliminar usuario',
              confirmDescription: '¿Estás seguro de que quieres eliminar a este usuario?',
              confirmText: 'Sí, eliminar',
              onClick: () => handleDeleteUser(user._id),
              icon: UserRoundMinus
            }
          ]}
        />
      )
    }
  }
]
