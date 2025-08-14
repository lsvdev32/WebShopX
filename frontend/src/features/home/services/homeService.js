import api from '@/api/api.js'
/**
 * Servicio para manejar operaciones relacionadas con la página de inicio
 * @module homeService
 */

/**
 * Obtiene los productos más vendidos
 * @returns {Promise} Lista de productos más vendidos
 */
export const fetchTopSellingProducts = async () => {
  const { data } = await api.get('/api/products/top-selling')
  return data
}

/**
 * Obtiene productos aleatorios
 * @returns {Promise} Lista de productos aleatorios
 */
export const fetchRandomProducts = async () => {
  const { data } = await api.get('/api/products/random')
  return data
}

/**
 * Obtiene productos recientes
 * @returns {Promise} Lista de productos recientes
 */
export const fetchRecentProducts = async () => {
  const { data } = await api.get('/api/products/recent')
  return data
}

/**
 * Obtiene promociones (estático por ahora, preparado para API)
 * @returns {Promise} Lista de promociones
 */
export const fetchPromos = async () => {
  // Simulación de llamada a la API
  return [
    {
      id: 1,
      tagline: 'CUMPLE TU PROPÓSITO',
      title: 'OFERTAS EN MUNDO DEPORTIVO',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_993923-MLA83157633377_032025-OO.jpg',
      imageAlt: 'Cyclist riding a red bicycle'
    },
    {
      id: 2,
      tagline: 'SOBRE RUEDAS',
      title: 'PARA VEHÍCULOS HASTA 40% OFF',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_647293-MLA74296781066_022024-OO.jpg',
      imageAlt: 'Vehicle dashboard interior'
    }
  ]
}

/**
 * Obtiene categorías (estático por ahora, preparado para API)
 * @returns {Promise} Lista de categorías
 */
export const fetchCategories = async () => {
  // Simulación de llamada a la API
  return [
    {
      id: 1,
      title: 'Carros, Motos y Otros',
      imageSrc: 'https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_car-front-new-category.webp',
      href: '/search?category=carros-motos-y-otros&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 2,
      title: 'Celulares y Teléfonos',
      imageSrc: 'https://http2.mlstatic.com/D_Q_NP_893557-MLU79115488779_092024-P.webp',
      href: '/search?category=celulares-telefonos&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 3,
      title: 'Electrodomésticos',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_NP_2X_605938-MLA79746499747_102024-V.webp',
      href: '/search?category=electrodomesticos&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 4,
      title: 'Herramientas',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_NP830493-MLA52702169033_122022-B.webp',
      href: '/search?category=herramientas&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 5,
      title: 'Accesorios para Vehículos',
      imageSrc: 'https://http2.mlstatic.com/D_Q_NP_661389-MLU76551582281_052024-P.webp',
      href: '/search?category=accesorios-vehiculos&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 6,
      title: 'Ropa y Accesorios',
      imageSrc: 'https://http2.mlstatic.com/D_Q_NP_722133-CBT72678089256_112023-P.webp',
      href: '/search?category=ropa-accesorios&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 7,
      title: 'Deportes y Fitness',
      imageSrc: 'https://http2.mlstatic.com/D_Q_NP_666886-MLU74624082685_022024-P.webp',
      href: '/search?category=deportes-fitness&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 8,
      title: 'Belleza y Cuidado Personal',
      imageSrc: 'https://http2.mlstatic.com/D_Q_NP_935622-MCO53901173750_022023-P.webp',
      href: '/search?category=belleza-cuidado-personal&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 9,
      title: 'Hogar y Muebles',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_NP_2X_846580-MCO70098105579_062023-F.webp',
      href: '/search?category=hogar-muebles&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 10,
      title: 'Computación',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_NP_2X_928870-MLU78937269592_092024-F.webp',
      href: '/search?category=computacion&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 11,
      title: 'Inmuebles',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_NP774089-MLA52768750642_122022-B.webp',
      href: '/search?category=inmuebles&query=all&price=all&rating=all&order=newest&page=1'
    },
    {
      id: 12,
      title: 'Electrónica, Audio y Video',
      imageSrc: 'https://http2.mlstatic.com/D_NQ_NP_2X_608560-MLA83731107275_042025-F.webp',
      href: '/search?category=electronica-audio-video&query=all&price=all&rating=all&order=newest&page=1'
    }
  ]
}
