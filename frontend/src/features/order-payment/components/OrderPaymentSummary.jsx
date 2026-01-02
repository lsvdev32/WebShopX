import CardWrapper from '@/components/common/CardWrapper'
import { Badge } from '@/components/ui/badge'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils/pricing'
import PayPalPayment from './PayPalPayment'

/**
 * Componente que muestra el resumen del pedido en la sección de pago.
 * Incluye detalles como el precio de los artículos, gastos de envío, ahorros y total.
 * También maneja el proceso de pago con PayPal si el pedido no ha sido pagado
 * @param {*} param0 - Props que incluyen precios, estado de pago y funciones de PayPal
 * @returns JSX Element que representa el resumen del pedido
 */
export default function OrderPaymentSummary ({
  itemsPrice,
  shippingPrice,
  savingsPrice,
  totalPrice,
  isPaid,
  isPending,
  loadingPay,
  createPayPalOrder,
  onApprovePayPal,
  onPayPalError
}) {
  return (
    <CardWrapper className='w-full bg-primary text-primary-foreground'>
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex justify-between'>
          <p>Precio de los artículos:</p>
          <p>{formatPrice(itemsPrice)}</p>
        </div>
        <div className='flex justify-between'>
          <p>Gastos de envío</p>
          {shippingPrice === 0
            ? (
              <Badge variant='outline' className='text-success border-success bg-success/10 dark:text-success dark:border-success dark:bg-success/10'>
                Gratis
              </Badge>
              )
            : (
              <p>{formatPrice(shippingPrice)}</p>
              )}
        </div>
        <div className='flex justify-between text-destructive'>
          <p>Ahorro total</p>
          <p>- {formatPrice(savingsPrice)}</p>
        </div>
        <Separator className='bg-primary-foreground/20' />
        <div className='flex justify-between font-semibold'>
          <p>Total:</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
        {!isPaid && (
          <div className='pt-6'>
            <p className='text-center text-xs text-muted-foreground italic'>
              <span className='text-muted-foreground font-semibold'>Nota:</span> Recuerda que puedes pagar tus órdenes cuando desees. Solo ve a tu historial de órdenes, la seleccionas, la pagas y listo :)
            </p>
            {/* Utilizamos el componente PayPalPayment para procesar el pago de la orden */}
            <PayPalPayment
              isPending={isPending}
              loadingPay={loadingPay}
              createOrder={createPayPalOrder}
              onApprove={onApprovePayPal}
              onError={onPayPalError}
            />
          </div>
        )}
      </CardContent>
    </CardWrapper>
  )
}
