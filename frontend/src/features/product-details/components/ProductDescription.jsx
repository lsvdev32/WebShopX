import { Button } from '@/components/ui/button'
import DOMPurify from 'dompurify'
import { useState } from 'react'

/**
 * Componente para mostrar la descripción de un producto.
 * Si la descripción es muy larga, se muestra un resumen y un botón para ver más.
 * @param {*} param0 - Props que contiene la descripción del producto.
 * @returns JSX Element que muestra la descripción del producto.
 */
export default function ProductDescription ({ description }) {
/**
 * Estado para controlar si se muestra la descripción completa o truncada.
 * Por defecto, se muestra truncada si es mayor a 1000 caracteres.
 */
  const [showFull, setShowFull] = useState(false)

  /**
   * Formatea la descripción del producto para que sea segura para mostrar en HTML.
   * Reemplaza los saltos de línea por etiquetas <br /> y sanitiza el HTML para evitar XSS.
   * @param {*} text - Texto de la descripción del producto.
   * @returns Texto formateado y sanitizado para mostrar en HTML.
   */
  const formatDescription = (text) => {
    const formattedText = text.replace(/\n/g, '<br />')
    return DOMPurify.sanitize(formattedText, {
      ALLOWED_TAGS: ['br', 'strong', 'em', 'ul', 'li', 'p'],
      ALLOWED_ATTR: []
    })
  }

  /**
   * Trunca la descripción si es mayor a 1000 caracteres.
   * Si se está mostrando la descripción completa, no se trunca.
   */
  const truncatedDescription =
    description.length > 1000 && !showFull ? description.slice(0, 1000) + '...' : description

  return (
    <div>
      <h2 className='text-xl font-semibold mb-2 text-foreground'>Descripción del producto</h2>
      <div
        className='text-foreground'
        dangerouslySetInnerHTML={{ __html: formatDescription(truncatedDescription) }}
      />
      {description.length > 1000 && (
        <Button
          variant='link'
          className='p-0 ml-2 h-auto text-primary hover:text-primary-hover'
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? 'Ver menos' : 'Ver más'}
        </Button>
      )}
    </div>
  )
}
