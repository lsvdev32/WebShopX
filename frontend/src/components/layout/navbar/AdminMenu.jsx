/**
 * Componente utilizado para mostrar el menú de administración en la Navbar.
 * Incluye enlaces a diferentes secciones administrativas como el panel de información, administración de productos, usuarios y órdenes.
 */

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  Users
} from 'lucide-react'
import { Link } from 'react-router'

export default function AdminMenu () {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='flex items-center space-x-2 text-foreground bg-background'>
            <span>Administrador</span>
            <Settings className='w-4 h-4' />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='min-w-[215px] p-2 shadow-lg rounded-md'>
            <ul className='space-y-2'>
              <MenuLink to='admin/dashboard' label='Panel de información' icon={LayoutDashboard} />
              <MenuLink to='admin/products' label='Administrar productos' icon={Package} />
              <MenuLink to='/admin/users' label='Administrar usuarios' icon={Users} />
              <MenuLink to='admin/orders' label='Administrar ordenes' icon={ClipboardList} />
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
function MenuLink ({ to, label, icon: Icon }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className='block px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-900'
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
