/**
 * Este componente es un SkeletonCard que se utiliza para mostrar un esqueleto de carga mientras se cargan los datos del producto
 */

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonCard () {
  return (
    <Card className='rounded-sm border shadow-sm transition-shadow hover:shadow-md'>
      <CardHeader className='bg-card m-2 rounded-sm p-0'>
        <Skeleton className='w-full aspect-[16/9]' />
      </CardHeader>
      <CardContent className='relative p-3'>
        {/* Rating skeleton */}
        <div className='flex gap-1 mb-2'>
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-4' />
        </div>

        {/* Título del producto (2 líneas) */}
        <Skeleton className='h-4 w-full mb-2' />
        <Skeleton className='h-4 w-3/4 mb-3' />

        {/* Precio */}
        <Skeleton className='h-5 w-24 mb-3' />

        {/* Cuotas */}
        <Skeleton className='h-3 w-full mb-3' />

        {/* Envío gratis */}
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-3 w-20' />
        </div>
      </CardContent>
    </Card>
  )
}
