/**
 * Formulario de registro de usuario
 * Este componente permite a los usuarios registrarse proporcionando su nombre, correo electrónico, teléfono y contraseña
 */

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSignup } from '../hooks/useSignup'
import { SignupValidation } from '../validations/SignupValidation'

export default function SignupForm ({ redirect }) {
  /**
   * Hook para manejar el formulario de registro
   * Utiliza react-hook-form para la gestión del estado del formulario y validación
   */
  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  })

  /**
   * Hook personalizado para manejar el registro de usuario
   * Incluye funciones para el registro normal y el registro a través de Google
   */
  const { userRegistration } = useSignup(redirect)

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(userRegistration)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    icon={User}
                    type='text'
                    placeholder='Nombre completo'
                    {...field}
                  />
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
                <FormControl>
                  <Input
                    icon={Mail}
                    type='email'
                    placeholder='Correo electrónico'
                    {...field}
                  />
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
                <FormControl>
                  <Input
                    icon={Phone}
                    type='text'
                    placeholder='Número de teléfono'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    icon={Lock}
                    type='password'
                    placeholder='Contraseña'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    icon={Lock}
                    type='password'
                    placeholder='Confirmar contraseña'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full rounded-sm bg-[#1a2238] hover:bg-[#2a3248]'>
            Registrarse
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-white px-2 text-muted-foreground'>O</span>
        </div>
      </div>

      <div className='flex justify-center'>
        {/* <GoogleLogin
          theme='dark'
          text='Registrarse con Google'
          onSuccess={googleRegistration}
        /> */}
      </div>
    </div>
  )
}
