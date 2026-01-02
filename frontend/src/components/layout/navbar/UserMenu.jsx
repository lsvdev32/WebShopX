/**
 * Componente utilizado para mostrar el menú de usuario en la Navbar.
 * Incluye enlaces a diferentes secciones como perfil, lista de deseos y órdenes.
 * Si el usuario no está logueado, muestra un enlace para iniciar sesión.
 */

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { LogOut, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'

export default function UserMenu ({ userInfo, signoutHandler }) {
  // si el usuario NO está logueado, se muestra un link para iniciar sesión
  if (!userInfo) {
    return (
      <Link to='/signin' className='text-sm font-medium'>
        Iniciar sesión
      </Link>
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='flex items-center space-x-2 text-foreground bg-background'>
            <span>{userInfo.name}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className='min-w-[200px] p-2 shadow-lg rounded-md'>
            <ul className='space-y-2'>
              {/* <MenuLink to='/user-profile' label='Mi perfil' icon={UserRound} />
              <MenuLink to='/wish-list' label='Lista de deseos' icon={Heart} /> */}
              <MenuLink to='/user-order-history' label='Mis ordenes' icon={ShoppingBag} />
              <Separator />
              <MenuLink to='#signout' label='Cerrar sesión' onClick={signoutHandler} icon={LogOut} />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/**
 * Función utilizado para crear un enlace dentro del menú de administración.
 * @param {Object} param0 - Objeto que contiene las propiedades del enlace
 * @returns MeniuLink component
 */
function MenuLink ({ to, label, onClick, icon: Icon }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className='block px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-900'
          to={to}
          onClick={onClick}
        >
          <div className='flex items-center'>
            {Icon && <Icon className='w-4 h-4 mr-2' />}
            {label}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
