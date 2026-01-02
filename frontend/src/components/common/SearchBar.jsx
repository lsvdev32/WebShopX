/**
 * Componente de barra de búsqueda
 * permite a los usuarios ingresar un término y redirige a la página de búsqueda
 *
 * @componet
 * @example
 * @returns <SearchBar />
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function SearchBar () {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  /**
   * maneja el envío del formulario de búsqueda.
   * @param {Event} e - Evento del formulario.
   */
  const submitHandler = (e) => {
    e.preventDefault()
    navigate(query ? `/search/?query=${query}` : '/search')
    setQuery('') // limpia el campo de búsqueda después de enviar
  }

  return (
    <form onSubmit={submitHandler} className='hidden md:flex flex-1 max-w-md mx-4 gap-1'>
      {/* campo de entrada de búsqueda */}
      <Input
        type='text'
        placeholder='Buscar productos...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full'
      />
      <Button
        type='submit'
        variant='ghost'
        size='icon'
        className='hover:bg-transparent hover:text-white dark:hover:bg-transparent'
      >
        <Search className='h-4 w-4' />
      </Button>
    </form>
  )
}
