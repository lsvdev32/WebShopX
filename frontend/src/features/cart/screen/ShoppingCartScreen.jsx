import AnimatedSection from '@/components/common/AnimatedSection'
import Container from '@/components/common/Container'
import { MessageBox } from '@/components/common/MessageBox'
import OrderSummary from '@/components/common/OrderSummary'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import CartItems from '../components/CartItems'
import CartSkeleton from '../components/CartSkeleton'
import useShoppingCart from '../hooks/useShoppingCart'

/**
 * Componente para la pantalla del carrito
 * @returns {JSX.Element}
 */
export default function ShoppingCartScreen () {
  /**
   * Hook para manejar el estado del carrito de compras.
   * Incluye la carga de datos, manejo de errores, y funciones para actualizar y eliminar
   */
  const {
    loading,
    error,
    cartItems,
    subtotal,
    shippingCost,
    savings,
    total,
    quantityOfProducts,
    userInfo,
    updateCartHandler,
    removeItemHandler,
    checkoutHandler
  } = useShoppingCart()

  return (
    <AnimatedSection>
      <Helmet>
        <title>Carrito de compras | WebShopX</title>
      </Helmet>
      <Container>
        <article className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {loading
            ? (
              <CartSkeleton />
              )
            : error
              ? (
                <MessageBox variant='danger'>{error}</MessageBox>
                )
              : cartItems.length === 0
                ? (
                  <Alert variant='destructive' className='lg:col-span-2 flex items-center justify-center p-6'>
                    <div className='mr-6'>
                      <img
                        src='/cart-empty.png'
                        alt='Carrito vacío'
                        className='w-24 h-24 object-contain'
                      />
                    </div>
                    <div>
                      <AlertTitle>El carrito está vacío</AlertTitle>
                      <AlertDescription>
                        <Link to='/' className='underline hover:text-primary'>
                          Haz clic aquí para ir de compras
                        </Link>
                      </AlertDescription>
                    </div>
                  </Alert>
                  )
                : (
                  <CartItems
                    cartItems={cartItems}
                    updateCartHandler={updateCartHandler}
                    removeItemHandler={removeItemHandler}
                  />
                  )}
          <aside className='lg:top-6'>
            <OrderSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              savings={savings}
              total={total}
              quantityOfProducts={quantityOfProducts}
              buttonText={userInfo ? 'Continuar al formulario de envío' : 'Iniciar sesión para comprar'}
              onClick={checkoutHandler}
              isDisabled={cartItems.length === 0}
            />
          </aside>
        </article>
      </Container>
    </AnimatedSection>
  )
}
