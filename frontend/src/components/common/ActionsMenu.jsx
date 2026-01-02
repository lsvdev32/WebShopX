/**
 * Menu desplegable que muestra las opciones en el componente DataTable que utilizamos para usuario, productos y ordenes
 */

/* eslint-disable react/jsx-handler-names */
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Separator } from '../ui/separator'
import ConfirmDialog from './ConfirmDialog'

export default function ActionsMenu ({ actions }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)

  const handleActionClick = (action) => {
    if (action.confirm) {
      setConfirmAction(action)
      setIsDropdownOpen(false)
    } else {
      action.onClick()
      setIsDropdownOpen(false)
    }
  }

  const handleConfirmClose = () => {
    setConfirmAction(null) // Limpiamos el estado del dialog
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menú</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <Separator />
          {actions.map((action, index) => (
            <div key={index}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  handleActionClick(action)
                }}
                className='flex justify-between hover:cursor-pointer p-2'
              >
                {action.label}
                {action.icon && <action.icon className='w-4 h-4 text-foreground ml-2' />}
              </DropdownMenuItem>
              {index !== actions.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {confirmAction && (
        <ConfirmDialog
          open={!!confirmAction}
          triggerText={confirmAction.label}
          title={confirmAction.confirmTitle}
          description={confirmAction.confirmDescription}
          confirmText={confirmAction.confirmText}
          onConfirm={() => {
            confirmAction.onClick()
            handleConfirmClose()
          }}
          onOpenChange={handleConfirmClose}
          icon={confirmAction.icon}
        />
      )}
    </>
  )
}
