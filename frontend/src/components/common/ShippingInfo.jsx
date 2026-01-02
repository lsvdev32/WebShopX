/**
 * Componente para mostrar información de envío
 * con iconos y descripciones de los pasos del proceso.
 */

import { cn } from '@/lib/utils'
import { CheckCircle, Package, Truck } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import Container from './Container'

export function ShippingInfo ({ className, ...props }) {
  const steps = [
    {
      icon: <Package className='h-6 w-6' />,
      title: 'PAQUETE SEGURO Y PROTEGIDO'
    },
    {
      icon: <Truck className='h-6 w-6' />,
      title: 'ENTREGA RÁPIDA A TU DESTINO'
    },
    {
      icon: <CheckCircle className='h-6 w-6' />,
      title: 'PAQUETE ENTREGADO CON EXITO'
    }
  ]

  return (
    <AnimatedSection>
      <Container className={cn('flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0', className)} {...props}>
        {steps.map((step, index) => (
          <div key={index} className='flex flex-1 items-center'>
            <div className='flex w-full items-center justify-center sm:rounded-sm bg-primary text-primary-foreground p-4 text-center shadow-sm'>
              <div className='flex flex-col items-center space-y-2'>
                {step.icon}
                <span className='text-xs font-light md:text-sm'>{step.title}</span>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className='hidden md:block md:flex-1'>
                <div className='flex items-center justify-center'>
                  <div className='h-px w-full border-t-2 border-dashed border-primary/20' />
                </div>
              </div>
            )}
          </div>
        ))}
      </Container>
    </AnimatedSection>
  )
}
