/**
 * Componente de navegación principal del sitio web
 * Incluye enlaces a la página de inicio, carrito de compras, búsqueda y menú de usuario
 */

/* eslint-disable no-undef */
import SearchBar from '@/components/common/SearchBar'
import { Store } from '@/context/Store'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ModeToggle } from '../../common/ModleToggle'
import AdminMenu from './AdminMenu'
import CartIcon from './CartIcon'
import MobileMenu from './MobileMenu'
import UserMenu from './UserMenu'

export default function Navbar () {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  /**
   * Maneja el cierre de sesión del usuario
   * Limpia la información del usuario y redirige a la página de inicio de sesión
   */
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('cartItems')
    window.location.href = '/signin'
  }

  /**
   * Maneja el envío del formulario de búsqueda
   * Navega a la página de búsqueda con la consulta ingresada
   */
  const submitHandler = (e) => {
    e.preventDefault()
    navigate(query ? `/search/?query=${query}` : '/search')
    setQuery('')
  }

  return (
    <nav className='w-full bg-primary text-primary-foreground shadow-sm'>
      <div className='flex justify-between items-center sm:container sm:max-w-7xl sm:mx-auto py-2'>
        <Link to='/' className='flex items-center hover:opacity-80 transition-opacity'>
          <span className='text-xl font-bold'>WebShopX</span>
        </Link>

        <SearchBar />

        <div className='hidden md:flex items-center space-x-4'>
          <ModeToggle />
          <UserMenu userInfo={userInfo} signoutHandler={signoutHandler} />
          {userInfo && userInfo.isAdmin && <AdminMenu />}
          <CartIcon cart={cart} />
        </div>

        <div className='md:hidden flex items-center space-x-4'>
          <CartIcon cart={cart} />
          <MobileMenu
            userInfo={userInfo}
            signoutHandler={signoutHandler}
            cart={cart}
            query={query}
            setQuery={setQuery}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </nav>
  )
}
