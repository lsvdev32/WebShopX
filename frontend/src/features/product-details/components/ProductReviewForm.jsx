import Loader from '@/components/common/Loader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'
import { Link } from 'react-router'

/**
 * Componente para el formulario de reseñas del producto.
 * Permite a los usuarios dejar una calificación y un comentario sobre un producto.
 * @param {*} param0 - Props del componente
 * @returns JSX.Element
 */
export default function ProductDetailsForm ({ userInfo, onSubmit, loading, userReview }) {
  // Estado para manejar la calificación y el comentario del usuario
  const [ratings, setRatings] = useState(userReview?.ratings ? String(userReview.ratings) : '')
  const [comment, setComment] = useState(userReview?.comment || '')

  /**
   * Maneja el envío del formulario.
   * Valida la calificación y llama a la función onSubmit con los datos del formulario
   * @param {*} e - Evento de envío del formulario
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!ratings || isNaN(Number(ratings)) || Number(ratings) < 1 || Number(ratings) > 5) {
      toast({ title: 'Error', description: 'Por favor, selecciona una calificación válida (1-5).', variant: 'destructive' })
      return
    }
    if (typeof onSubmit === 'function') {
      onSubmit({ ratings: Number(ratings), comment, reviewId: userReview?._id })
      setRatings('')
      setComment('')
    } else {
      console.error('onSubmit is not a function')
    }
  }

  /**
   * Maneja la eliminación de una reseña existente.
   * Llama a la función onSubmit con los datos necesarios para eliminar la reseña.
   */
  const handleDelete = () => {
    if (userReview && typeof onSubmit === 'function') {
      onSubmit({ ratings: null, comment: '', reviewId: userReview._id, deleted: true })
    } else {
      console.error('onSubmit is not a function or userReview is missing')
    }
  }

  /**
   * Si el usuario no está autenticado, muestra un mensaje para iniciar sesión.
   * Proporciona un enlace a la página de inicio de sesión con redirección al producto actual.
   */
  if (!userInfo) {
    return (
      <p className='text-muted-foreground'>
        Por favor,
        <Link
          to={`/signin?redirect=/product/${window.location.pathname.split('/').pop()}`}
          className='text-primary hover:text-primary-hover'
        >
          inicia sesión
        </Link>
        para dejar un comentario.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
      <h3 className='text-xl font-semibold text-foreground'>
        {userReview ? 'Editar tu reseña' : 'Cuéntanos, ¿qué tal te pareció el producto?'}
      </h3>
      <div>
        <Label htmlFor='ratings'>Calificación</Label>
        <Select value={ratings} onValueChange={setRatings} disabled={loading}>
          <SelectTrigger id='ratings'>
            <SelectValue placeholder='Seleccionar...' />
          </SelectTrigger>
          <SelectContent className='flex gap-2'>
            <SelectItem value='1' className='hover:cursor-pointer'>1 - Muy malo</SelectItem>
            <SelectItem value='2' className='hover:cursor-pointer'>2 - Malo</SelectItem>
            <SelectItem value='3' className='hover:cursor-pointer'>3 - Bueno</SelectItem>
            <SelectItem value='4' className='hover:cursor-pointer'>4 - Muy bueno</SelectItem>
            <SelectItem value='5' className='hover:cursor-pointer'>5 - Excelente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor='comment'>Comentario</Label>
        <Textarea
          id='comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Escribe tu comentario...'
          rows={4}
          disabled={loading}
        />
      </div>
      <div>
        <Button type='submit' disabled={loading} className='bg-primary text-primary-foreground hover:bg-primary-hover'>
          {loading ? <Loader className='w-4 h-4' /> : userReview ? 'Actualizar' : 'Agregar comentario'}
        </Button>
        {userReview && (
          <Button variant='destructive' onClick={handleDelete} disabled={loading}>
            Eliminar
          </Button>
        )}
      </div>
    </form>
  )
}
