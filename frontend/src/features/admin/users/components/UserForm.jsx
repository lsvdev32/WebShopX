/**
 * Formulario para editar usuarios en la sección de administración.
 * Utiliza un formulario controlado para manejar los datos del usuario.
 */

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useUserForm from '../hooks/useUserForm'

export default function UserForm ({ user, setOpenModal, onSuccess }) {
  const { form, isAdmin, setIsAdmin, handleSubmit } = useUserForm({ user, setOpenModal, onSuccess })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground font-medium'>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='Nombre completo...' {...field} aria-label='Nombre completo' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground font-medium'>Correo electrónico</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Correo electrónico...' {...field} aria-label='Correo electrónico' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground font-medium'>Teléfono</FormLabel>
              <FormControl>
                <Input type='tel' placeholder='Número de teléfono...' {...field} aria-label='Número de teléfono' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='relative flex items-center py-4'>
          <Separator className='flex-grow bg-border' />
          <span className='absolute left-1/2 -translate-x-1/2 bg-card px-3 text-sm font-medium text-foreground'>
            Opciones avanzadas
          </span>
        </div>
        <div className='flex items-center space-x-2 pb-4'>
          <Checkbox
            id='isAdmin'
            checked={isAdmin}
            onCheckedChange={setIsAdmin}
            aria-label='¿El usuario es administrador?'
          />
          <FormLabel htmlFor='isAdmin' className='text-foreground font-medium'>
            ¿El usuario es administrador de la tienda?
          </FormLabel>
        </div>
        <Button type='submit' className='w-full' aria-label='Actualizar usuario'>
          Actualizar usuario
        </Button>
      </form>
    </Form>
  )
}
