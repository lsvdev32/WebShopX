/**
 * Boton de carrito de compras que muestra la cantidad de productos en el carrito
 * @param {Object} cart - Objeto que contiene los items del carrito
 */

import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

export default function CartIcon ({ cart }) {
  return (
    <Link to='/cart' className='relative flex items-center'>
      <ShoppingCart className='w-5 h-5' />
      {cart.cartItems.length > 0 && (
        <Badge variant='destructive' className='absolute rounded-full w-5 h-5 -top-2 -right-6 flex justify-center items-center'>
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
        </Badge>
      )}
    </Link>
  )
}
