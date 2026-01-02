import AnimatedSection from '@/components/common/AnimatedSection'
import CardWrapper from '@/components/common/CardWrapper'
import Loader from '@/components/common/Loader'
import { MessageBox } from '@/components/common/MessageBox'
import OrderItems from '@/components/common/OrderItems'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatDateTime } from '@/utils/format-date-time'
import { Helmet } from 'react-helmet-async'
import OrderPaymentSkeleton from '../components/OrderPaymentSkeleton'
import OrderPaymentSummary from '../components/OrderPaymentSummary'
import ShippingSummary from '../components/ShippingSumary'
import useOrderPayment from '../hooks/useOrderPayment'

/**
 * Pantalla de pago de la orden.
 * Muestra los detalles de la orden, el resumen de envío,
 * los artículos comprados y el resumen de pago.
 * @returns {JSX.Element} Componente de pantalla de pago de la orden.
 */
export default function OrderPaymentScreen () {
  const {
    loading,
    error,
    order,
    isPending,
    loadingPay,
    paymentProcessing,
    userInfo,
    createPayPalOrder,
    onApprovePayPal,
    onPayPalError
  } = useOrderPayment()

  /**
   * Verifica si la orden es válida.
   * Una orden es válida si tiene un ID, una dirección de envío,
   * y una lista de artículos de orden que es un array.
   */
  const isOrderValid = order && order._id && order.shippingAddress && order.orderItems && Array.isArray(order.orderItems)

  return (
    <AnimatedSection>
      <div>
        <Helmet>
          <title>Orden: #{order?._id || ''} | WebShopX</title>
        </Helmet>
        {loading || !userInfo || paymentProcessing || !isOrderValid
          ? (
            <OrderPaymentSkeleton />
            )
          : error
            ? (
              <MessageBox variant='danger'>{error}</MessageBox>
              )
            : (
              <>
                <header>
                  <h1 className='text-2xl font-semibold text-foreground'>ID Orden: #{order._id}</h1>
                </header>
                <Separator className='mb-6 border-t-2 border-yellow-500' />
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                  <section className='lg:col-span-2 space-y-6'>
                    <article>
                      {/* Usamos el componente para mostrar la informacion de envío */}
                      <ShippingSummary
                        shippingAddress={order.shippingAddress}
                        isDelivered={order.isDelivered}
                        deliveredAt={order.deliveredAt}
                      />
                    </article>
                    <article>
                      <CardWrapper>
                        <CardContent className='py-4'>
                          <CardTitle className='mb-2 text-xl font-semibold text-foreground'>Información de pago</CardTitle>
                          <div className='mb-4 text-sm'>
                            <p>
                              <span className='text-lg font-semibold text-foreground'>Método de pago:</span> {order.paymentMethod}
                            </p>
                          </div>
                          {order.isPaid
                            ? (
                              <Alert className='mt-2 border-success text-success'>
                                <AlertTitle>Pagado</AlertTitle>
                                <AlertDescription>Fecha de pago: {formatDateTime(order.paidAt)}</AlertDescription>
                              </Alert>
                              )
                            : (
                              <Alert variant='destructive' className='mt-2'>
                                <AlertTitle>No pagado</AlertTitle>
                              </Alert>
                              )}
                        </CardContent>
                      </CardWrapper>
                    </article>
                    <article>
                      <OrderItems textTitle='Productos comprados...' orderItems={order.orderItems} />
                    </article>
                  </section>
                  <aside>
                    {/* Mostramos el resumen del pedido con el componente OrderPaymentSumary */}
                    <OrderPaymentSummary
                      itemsPrice={order.itemsPrice}
                      shippingPrice={order.shippingPrice}
                      savingsPrice={order.savingsPrice}
                      totalPrice={order.totalPrice}
                      isPaid={order.isPaid}
                      isPending={isPending}
                      loadingPay={loadingPay}
                      createPayPalOrder={createPayPalOrder}
                      onApprovePayPal={onApprovePayPal}
                      onPayPalError={onPayPalError}
                    />
                  </aside>
                </div>
                {loadingPay && <Loader />}
              </>
              )}
      </div>
    </AnimatedSection>
  )
}
