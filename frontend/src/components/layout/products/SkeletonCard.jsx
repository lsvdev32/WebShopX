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
    <Card className='rounded-sm border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md'>
      <CardHeader className='bg-white m-2 rounded-sm p-0'>
        <Skeleton className='w-full aspect-[159/110]' />
      </CardHeader>
      <CardContent className='relative p-3'>
        <Skeleton className='h-4 w-1/2 mb-2' />
        <Skeleton className='h-6 flex-grow mb-2' />
        <Skeleton className='h-4 w-1/2 mb-2' />
        <Skeleton className='h-6 flex-grow mb-2' />
        <Skeleton className='h-4 w-1/2' />
      </CardContent>
      <CardFooter>
        <Skeleton className='w-full h-8' />
      </CardFooter>
    </Card>
  )
}
