import CardWrapper from '@/components/common/CardWrapper'
import { CreditCard, Shield, Truck } from 'lucide-react'

// publicidad de envío
export default function ShippingInfo () {
  return (
    <CardWrapper className='p-6 space-y-4 bg-primary text-primary-foreground mt-3 hidden lg:block shadow-sm'>
      <div className='space-y-3'>
        <div className='flex items-start space-x-3'>
          <Truck className='h-5 w-5 flex-shrink-0 opacity-90' />
          <div>
            <h3 className='font-medium'>Entrega rápida</h3>
            <ul className='text-sm opacity-80 space-y-1 mt-1'>
              <li>✓ Cupón de COP $20.000 por entrega tardía</li>
              <li>✓ Reembolso por pérdida de paquete</li>
              <li>✓ Reembolso por artículo dañados</li>
              <li>✓ Reembolso si no llega en 60 días</li>
            </ul>
          </div>
        </div>

        <div className='flex items-start space-x-3'>
          <Shield className='h-5 w-5 flex-shrink-0 opacity-90' />
          <div>
            <h3 className='font-medium'>Seguridad & Privacidad</h3>
            <p className='text-sm opacity-80 mt-1'>Pagos seguros - Datos personales seguros</p>
          </div>
        </div>

        <div className='flex items-start space-x-3'>
          <CreditCard className='h-5 w-5 flex-shrink-0 opacity-90' />
          <div>
            <h3 className='font-medium'>Pagos seguros</h3>
            <p className='text-sm opacity-80 mt-1'>Con socios de pago populares tus datos personales están seguros</p>
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
