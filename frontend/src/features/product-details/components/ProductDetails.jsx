import Ratings from '@/components/common/Ratings'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatPrice } from '@/utils/pricing'
import { CreditCard, Truck, User } from 'lucide-react'

/**
 * Componente para mostrar los detalles de un producto.
 * Incluye nombre, precio, características, estado de stock y botones de acción.
 * @param {*} param0 - Props que contiene los detalles del producto y una función para agregar al carrito.
 * @returns JSX Element que muestra los detalles del producto.
 */
export default function ProductDetails ({ product, onAddToCart }) {
  const installmentPrice = product.price > 0 ? formatPrice(product.price / 3) : null
  return (
    <Card className='sticky top-3 border-none shadow-none'>
      <div className='space-y-4 p-6'>
        <h1 className='text-start text-md sm:text-2xl text-foreground font-semibold'>{product.name}</h1>
        <Ratings ratings={product.ratings} numReviews={product.numReviews} />
        <div className='flex items-baseline gap-3'>
          <p className='text-4xl font-light text-foreground'>{formatPrice(product.price)}</p>
          {product.oldPrice && (
            <span className='text-muted-foreground line-through text-lg'>{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        {installmentPrice && (
          <p className='mt-1 text-sm'>
            en <span className='text-success'>3 cuotas de {installmentPrice} con 0% de intereses</span>
          </p>
        )}
        <div className='text-foreground'>
          <h2 className='font-semibold mb-4'>Características</h2>
          <ul className='list-disc list-inside text-muted-foreground space-y-1'>
            <li>Marca: {product.brand}</li>
            <li>Stock: {product.stock} unidades disponibles</li>
            <li>
              Estado:
              <Badge
                variant='outline'
                className={product.stock > 0 ? 'text-success border-success dark:text-success dark:border-success ml-2' : 'text-destructive border-destructive dark:text-destructive dark:border-destructive ml-2'}
              >
                {product.stock > 0 ? 'Disponible' : 'No disponible'}
              </Badge>
            </li>
          </ul>
        </div>
        {product.stock > 0 && (
          <div className='flex items-center gap-2 mt-4'>
            <Button onClick={onAddToCart} className='w-full bg-primary text-primary-foreground hover:bg-primary-hover'>Agregar al carrito</Button>
          </div>
        )}
        <div className='space-y-1 text-muted-foreground'>
          <div className='flex items-center gap-3'>
            <Truck className='text-muted-foreground w-5 h-5' />
            <span>Envío gratis a todo el país</span>
          </div>
          <div className='flex items-center gap-3'>
            <CreditCard className='text-muted-foreground w-5 h-5' />
            <span>Pagos 100% seguros</span>
          </div>
          <div className='flex items-center gap-3'>
            <User className='text-muted-foreground w-5 h-5' />
            <span>Vendedores confiables</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
