import CardWrapper from '@/components/common/CardWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils/pricing'

/**
 * Componente para mostrar el resumen del pedido.
 * Incluye detalles como el subtotal, gastos de envío, ahorros y total estimado.
 * @param {*} param0 - Objeto que contiene los detalles del pedido.
 * @returns {JSX.Element} Componente de resumen del pedido.
 */
export default function OrderSummary ({
  subtotal,
  shippingCost,
  savings,
  total,
  quantityOfProducts,
  buttonText,
  onClick,
  isDisabled
}) {
  return (
    <CardWrapper className='w-full bg-primary text-primary-foreground space-y-6 shadow-lg'>
      <div className='p-6'>
        <h2 className='text-xl font-semibold mb-4'>Resumen</h2>
        <div className='space-y-3'>
          {quantityOfProducts !== undefined && (
            <div className='flex justify-between'>
              <p>Productos ({quantityOfProducts})</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
          )}
          {quantityOfProducts === undefined && (
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
          )}
          <div className='flex justify-between'>
            <p>Gastos de envío</p>
            {shippingCost === 0
              ? (
                <Badge variant='outline' className='text-success border-success bg-success/10 dark:text-success dark:border-success dark:bg-success/10'>
                  Gratis
                </Badge>
                )
              : (
                <p>{formatPrice(shippingCost)}</p>
                )}
          </div>
          <div className='flex justify-between text-destructive font-medium'>
            <p>Ahorro total</p>
            <p>- {formatPrice(savings)}</p>
          </div>
          <Separator className='bg-primary-foreground/20' />
          <div className='flex justify-between font-semibold text-lg'>
            <p>Total estimado</p>
            <p>{formatPrice(total)}</p>
          </div>
          <Button
            className='w-full bg-background text-foreground hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed py-3 font-semibold shadow-sm transition-all'
            onClick={onClick}
            disabled={isDisabled}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </CardWrapper>
  )
}
