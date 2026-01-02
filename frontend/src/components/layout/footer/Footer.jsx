/* eslint-disable multiline-ternary */
// componente footer
import Container from '@/components/common/Container'
import { useMediaQuery } from '@/hooks/use-media-query'
import FooterAccordion from './FooterAccordion'
import { FooterColumn } from './FooterColumn'
import SocialLinks from './SocialLinks'

/**
 * datos del footer, incluyendo categorías, enlaces e información de servio al cliente.
 */
const footerData = {
  categories: {
    title: 'Categorias',
    links: [
      { text: 'Todas las categorias', href: '/categories' },
      { text: 'Carros-Motos-y-Otros', href: '/categories' },
      { text: 'Celulares-y-Teléfonos', href: '/categories' },
      { text: 'Electrodomésticos', href: '/categories' },
      { text: 'Herramientas', href: '/categories' },
      { text: 'Accesorios-para-Vehículos', href: '/categories' },
      { text: 'Ropa-y-Accesorios', href: '/categories' },
      { text: 'Mas...', href: '/categories' }
    ]
  },
  links: {
    title: 'Enlaces utiles',
    links: [
      { text: 'Contactame', href: '/home' },
      { text: 'Repositorio', href: '/home' }
    ]
  },
  info: {
    title: 'Información',
    links: [
      { text: 'Esta es una pagina creada para demostrar mis habilidades como desarrollador.', href: '/home' },
      { text: 'Tome como referencia la página de MercadoLibre, de dicha página provienen la mayoría de imágenes.', href: '/home' }
    ]
  },
  service: {
    title: 'Servicio al Cliente',
    links: [
      { text: 'atencionalcliente@webshopx.com', href: '/home' },
      { text: 'Dirección: Calle 22a # 4F-80, Bogotá - Colombia', href: '/home' },
      { text: 'Contactanos: 01 8000 33 47 ', href: '/home' }
    ]
  }
}

/**
 * componente de pie de página (Footer)
 * muestra información del sitio y enlaces útiles
 *
 * @component
 * @example
 * @returns <Footer />
 */
export default function Footer () {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-primary text-primary-foreground'>
      <div className='max-w-[1200px] mx-auto'>

        {isDesktop ? (
          // diseño para escritorio
          <Container className='py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
              <FooterColumn {...footerData.categories} />
              <FooterColumn {...footerData.info} />
              <FooterColumn {...footerData.links} />
              <div className='space-y-8'>
                <FooterColumn {...footerData.service} />
              </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-400'>
              <span className='text-sm text-gray-400'>&copy; 2024 - {currentYear} lsdev. Casi todos los derechos reservados.</span>
              <SocialLinks />
            </div>
          </Container>
        ) : (
          // diseño para móviles
          <div className='flex flex-col px-4'>
            <FooterAccordion sections={footerData} />

            <div className='p-4 space-y-6'>
              <div className='flex justify-center'>
                <SocialLinks />
              </div>
              <span className='text-sm text-gray-400'>&copy; 2024 - {currentYear} lsdev. Casi todos los derechos reservados.</span>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
