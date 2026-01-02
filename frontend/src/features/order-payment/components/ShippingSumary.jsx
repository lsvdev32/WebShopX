import CardWrapper from '@/components/common/CardWrapper'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CardContent, CardTitle } from '@/components/ui/card'
import { formatDateTime } from '@/utils/format-date-time'

/**
 * Componente para mostrar el resumen de envío en la página de pago del pedido.
 * Muestra la información del envío, incluyendo nombre, teléfono, dirección
 * @param {*} param0 - Props que incluyen la dirección de envío, método de pago, estado de entrega y fecha de entrega.
 * @param {Object} param0.shippingAddress - Dirección de envío del pedido.
 * @returns {JSX.Element} - Componente que muestra la información de envío y estado de entrega.
 * @param {Object} param0.paymentMethod - Método de pago utilizado para el pedido.
 */
export default function ShippingSummary ({ shippingAddress, paymentMethod, isDelivered, deliveredAt }) {
  return (
    <CardWrapper>
      <CardContent className='py-4'>
        <CardTitle className='mb-2 text-xl font-semibold text-foreground'>
          Información de envío
        </CardTitle>
        <div className='space-y-3 mb-2'>
          <p className='text-foreground'>
            <span className='text-lg font-semibold'>Nombre:</span> <span className='font-light'>{shippingAddress.fullName}</span>
          </p>
          <p className='text-foreground'>
            <span className='text-lg font-semibold'>Teléfono:</span> <span className='font-light'>{shippingAddress.phone}</span>
          </p>
          <p className='text-foreground'>
            <span className='text-lg font-semibold'>Dirección:</span> <span className='font-light'>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</span>
          </p>
          {paymentMethod && (
            <p className='text-foreground'>
              <span className='text-lg font-semibold'>Método de pago:</span> {paymentMethod}
            </p>
          )}
        </div>
        {isDelivered
          ? (
            <Alert className='mt-2 border-success text-success'>
              <AlertTitle>Entregado</AlertTitle>
              <AlertDescription>Fecha de entrega: {formatDateTime(deliveredAt)}</AlertDescription>
            </Alert>
            )
          : (
            <Alert variant='destructive' className='mt-2'>
              <AlertTitle>No entregado</AlertTitle>
            </Alert>
            )}
      </CardContent>
    </CardWrapper>
  )
}
