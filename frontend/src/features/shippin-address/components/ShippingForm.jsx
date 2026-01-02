import CardWrapper from '@/components/common/CardWrapper'
import { Input } from '@/components/ui/input'
import {
  Building,
  Globe,
  MapPin,
  Phone,
  User
} from 'lucide-react'
import { Controller } from 'react-hook-form'

/**
 * Componente para el formulario de envío
 * @param {*} param0 - Contiene el control y los errores del formulario
 * @returns JSX.Element
 * @description Este componente utiliza react-hook-form para manejar el estado del formulario y la validación
 */
export default function ShippingForm ({ control, errors }) {
  return (
    <CardWrapper className='w-full p-6 h-fit mb-5'>
      <div className='flex flex-col items-center mb-8'>
        <h1 className='text-2xl font-semibold text-foreground text-center'>Información de envío y métodos de pago</h1>
        <p className='text-xs text-muted-foreground mt-1'>
          Complete la información lo mas claro posible para facilitar la entrega y reducir el tiempo de espera
        </p>
      </div>
      <form className='space-y-7'>
        <Controller
          name='fullName'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='Ingrese su nombre completo'
              error={errors.fullName?.message}
              icon={User}
              {...field}
            />
          )}
        />
        <Controller
          name='phone'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='Digite su número de teléfono'
              error={errors.phone?.message}
              icon={Phone}
              {...field}
            />
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='Ingrese su dirección'
              error={errors.address?.message}
              icon={MapPin}
              {...field}
            />
          )}
        />
        <Controller
          name='city'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='Ingrese su ciudad'
              error={errors.city?.message}
              icon={Building}
              {...field}
            />
          )}
        />
        <Controller
          name='postalCode'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='Ingrese el codigo postal'
              error={errors.postalCode?.message}
              icon={Building}
              {...field}
            />
          )}
        />
        <Controller
          name='country'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='Pais de origen'
              error={errors.country?.message}
              icon={Globe}
              {...field}
            />
          )}
        />
      </form>
    </CardWrapper>
  )
}
