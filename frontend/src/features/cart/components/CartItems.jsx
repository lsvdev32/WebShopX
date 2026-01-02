import CardWrapper from '@/components/common/CardWrapper'
import CartItem from './CartItem'

/**
 * Componente que muestra los items del carrito de compras.
 * Muestra una lista de productos en el carrito con opciones para actualizar la cantidad o eliminar un producto.
 * @param {*} param0 - Props que incluyen los items del carrito, funciones para actualizar y eliminar items.
 * @returns {JSX.Element} Componente de items del carrito de compras.
 */

export default function CartItems ({ cartItems, updateCartHandler, removeItemHandler }) {
  return (
    <CardWrapper className='lg:col-span-2 p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold text-foreground'>Carrito de compras</h2>
      </div>
      {/* Mostramos titulos para ser mas intuitivos */}
      <div className='hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border mb-4'>
        <div className='col-span-6'>
          <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Producto</span>
        </div>
        <div className='col-span-3 text-center'>
          <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Cantidad</span>
        </div>
        <div className='col-span-3 text-right'>
          <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Precio</span>
        </div>
      </div>
      <div className='space-y-4 md:space-y-6'>
        {/* Mapeamos cada una de las filas de productos */}
        {cartItems.map((item, index) => (
          <CartItem
            key={item._id}
            item={item}
            updateCartHandler={updateCartHandler}
            removeItemHandler={removeItemHandler}
            isLast={index === cartItems.length - 1} // Para aplicar estilos al último elemento
          />
        ))}
      </div>
    </CardWrapper>
  )
}
