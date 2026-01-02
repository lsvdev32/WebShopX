/**
 * Formulario de inicio de sesión
 * Este componente permite a los usuarios iniciar sesión utilizando su correo electrónico y contraseña
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
import { Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSignin } from '../hooks/useSignin'
import { SigninValidation } from '../validations/SigninValidation'

export default function SigninForm ({ redirect }) {
  /**
   * Hook para manejar el formulario de inicio de sesión
   * Utiliza react-hook-form para la gestión del estado del formulario y validación
   */
  const form = useForm({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  /**
   * Hook personalizado para manejar el inicio de sesión y el registro con Google
   * Proporciona funciones para iniciar sesión con correo electrónico y contraseña,
   */
  const { userSignin } = useSignin(redirect)

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(userSignin)} className='space-y-4'>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input icon={Mail} type='email' placeholder='Correo electrónico' {...field} />
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
                  <Input icon={Lock} type='password' placeholder='Contraseña' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='text-right'>
            <a href='/forgot-password' className='text-sm text-gray-600 hover:underline'>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Button type='submit' className='w-full rounded-sm bg-[#1a2238] hover:bg-[#2a3248]'>
            Iniciar sesión
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-card px-2 text-muted-foreground'>O</span>
        </div>
      </div>

      <div className='flex justify-center'>
        {/* <GoogleLogin
          text='Iniciar sesión con Google'
          theme='dark'
          onSuccess={({ credential }) => googleRegistration(credential)}
        /> */}
      </div>
    </div>
  )
}
