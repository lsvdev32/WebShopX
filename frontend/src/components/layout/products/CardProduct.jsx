/**
 * Cards de productos para la tienda
 */

import api from '@/api/api'
import Ratings from '@/components/common/Ratings'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card'
import { Store } from '@/context/Store'
import { useToast } from '@/hooks/use-toast'
import { calculateSavings, formatPrice } from '@/utils/pricing'
import { ShoppingCart, Truck } from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router'

export default function CardProduct ({ product }) {
  const { state, dispatch } = useContext(Store)
  const { cart: { cartItems } } = state
  const { toast } = useToast()

  const isOutOfStock = product.stock === 0
  const installmentPrice = product.price > 0 ? formatPrice(product.price / 3) : null

  /**
   * Con esta función se agrega un producto al carrito
   */
  const handleAddToCart = async () => {
    const existingItem = cartItems.find((item) => item._id === product._id)
    const quantity = existingItem ? existingItem.quantity + 1 : 1
    /**
     * Verificamos si el producto está en stock
     */
    try {
      const { data } = await api.get(`/api/products/${product._id}`)
      if (data.stock < quantity) {
        toast({
          variant: 'destructive',
          description: 'Lo sentimos... El producto se encuentra agotado :('
        })
        return
      }
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Error al agregar el producto al carrito.'
      })
    }
  }

  return (
    <Card className='rounded-sm border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md'>
      <Link to={`/product/${product.link}`} className='block group'>
        <CardHeader className=' bg-white m-2 rounded-sm p-0'>
          <img
            src={product.images?.[0] || '/placeholder.svg'}
            alt={product.name}
            className='aspect-[16/9] h-full w-full object-contain hover:scale-105 transition-transform'
          />

        </CardHeader>
        <CardContent className='p-3 dark:text-gray-400'>
          <Ratings ratings={product.ratings} numReviews={product.numReviews} />
          <p className='min-h-16 line-clamp-2 overflow-hidden text-ellipsis text-xs group-hover:text-blue-600 lg:min-h-fit'>
            {product.name}
          </p>
          <p className='text-sm font-semibold'>{formatPrice(product.price)}</p>
          {installmentPrice && (
            <p className='mt-1 text-xs'>
              en <span className='text-green-600 dark:text-green-700'>3 cuotas de {installmentPrice} con 0% de intereses</span>
            </p>
          )}
          <div className='mt-2 flex items-center gap-2 text-green-600 dark:text-green-700'>
            <Truck className='h-4 w-4' />
            <p className='text-xs'>
              {calculateSavings ? 'Envío gratis' : `Envío: ${formatPrice(20000)}`}
            </p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className='px-3'>
        <Button
          variant={isOutOfStock ? 'outline' : 'default'}
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`flex w-full rounded-sm items-center ${isOutOfStock ? 'bg-[#1a2238] text-white' : 'bg-[#1a2238] text-white hover:bg-[#2a3248]'}`}
        >
          {isOutOfStock
            ? (
                '¡Producto agotado!'
              )
            : (
              <>
                <ShoppingCart className=' h-4 w-4' />
                Agregar al carrito
              </>
              )}
        </Button>
      </CardFooter>
    </Card>
  )
}
