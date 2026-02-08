/**
 * ===================================
 * CONFIGURACIÓN DE CATEGORÍAS
 * ===================================
 * Define la estructura de categorías agrupadas para productos
 * Utilizado tanto para formularios de creación como para navegación
 */

/**
 * Categorías organizadas por grupos
 * Cada grupo contiene múltiples categorías relacionadas
 */
export const groupedCategories = [
  {
    group: 'Moda & Accesorios',
    slug: 'moda-accesorios',
    items: [
      { value: 'ropa-hombre', label: 'Ropa para Hombre' },
      { value: 'ropa-mujer', label: 'Ropa para Mujer' },
      { value: 'calzado', label: 'Calzado' },
      { value: 'accesorios-moda', label: 'Accesorios (relojes, gafas, cinturones)' },
      { value: 'bolsos-mochila', label: 'Bolsos y mochilas' }
    ]
  },
  {
    group: 'Tecnología & Electrónica',
    slug: 'tecnologia-electronica',
    items: [
      { value: 'celulares-accesorios', label: 'Celulares y Accesorios' },
      { value: 'computadores-laptops', label: 'Computadores y Laptops' },
      { value: 'audio', label: 'Audio (audífonos, parlantes)' },
      { value: 'gadgets', label: 'Gadgets' },
      { value: 'videojuegos', label: 'Videojuegos' }
    ]
  },
  {
    group: 'Hogar & Decoración',
    slug: 'hogar-decoracion',
    items: [
      { value: 'decoracion', label: 'Decoración' },
      { value: 'muebles', label: 'Muebles' },
      { value: 'iluminacion', label: 'Iluminación' },
      { value: 'cocina-comedor', label: 'Cocina y Comedor' },
      { value: 'organizacion-hogar', label: 'Organización del hogar' }
    ]
  },
  {
    group: 'Belleza & Cuidado Personal',
    slug: 'belleza-cuidado-personal',
    items: [
      { value: 'cuidado-piel', label: 'Cuidado de la Piel' },
      { value: 'maquillaje', label: 'Maquillaje' },
      { value: 'perfumes', label: 'Perfumes' },
      { value: 'cuidado-cabello', label: 'Cuidado del Cabello' },
      { value: 'afeitado-grooming', label: 'Afeitado y Grooming' }
    ]
  },
  {
    group: 'Ferretería & Herramientas',
    slug: 'ferreteria-herramientas',
    items: [
      { value: 'herramientas-manuales', label: 'Herramientas Manuales' },
      { value: 'herramientas-electricas', label: 'Herramientas Eléctricas' },
      { value: 'seguridad-industrial', label: 'Seguridad Industrial' },
      { value: 'jardineria', label: 'Jardinería' }
    ]
  },
  {
    group: 'Juguetes & Niños',
    slug: 'juguetes-ninos',
    items: [
      { value: 'juguetes', label: 'Juguetes' },
      { value: 'bebes', label: 'Bebés' },
      { value: 'ropa-infatil', label: 'Ropa Infantíl' },
      { value: 'juegos-educativos', label: 'Juegos Educativos' }
    ]
  },
  {
    group: 'Deportes & Fitness',
    slug: 'deportes-fitness',
    items: [
      { value: 'equipos-entrenamientos', label: 'Equipos de Entrenamiento' },
      { value: 'ropa-deportiva', label: 'Ropa Deportiva' },
      { value: 'suplementos', label: 'Suplementos' },
      { value: 'deportes-aire-libre', label: 'Deportes al Aire Libre' }
    ]
  },
  {
    group: 'Mascotas',
    slug: 'mascotas',
    items: [
      { value: 'alimentos-mascotas', label: 'Alimentos para Mascotas' },
      { value: 'accesorios', label: 'Accesorios' },
      { value: 'juguetes-mascotas', label: 'Juguetes para Mascotas' },
      { value: 'higiene-salud', label: 'Higiene y Salud' }
    ]
  }
]

/**
 * Obtiene todos los valores de categorías (sin grupos)
 * Útil para validaciones y búsquedas
 * @returns {Array<string>} Array con todos los valores de categorías
 */
export const getAllCategoryValues = () => {
  return groupedCategories.flatMap(group => group.items.map(item => item.value))
}

/**
 * Obtiene las categorías de un grupo específico por slug
 * @param {string} slug - Slug del grupo (ej: 'tecnologia-electronica')
 * @returns {Array<string>} Array con los valores de categorías del grupo
 */
export const getCategoriesByGroupSlug = (slug) => {
  const group = groupedCategories.find(g => g.slug === slug)
  return group ? group.items.map(item => item.value) : []
}

/**
 * Mapeo de imágenes para cada grupo de categorías
 * Estas URLs se pueden actualizar fácilmente
 */
export const categoryGroupImages = {
  'moda-accesorios': 'https://http2.mlstatic.com/D_Q_NP_722133-CBT72678089256_112023-P.webp',
  'tecnologia-electronica': 'https://http2.mlstatic.com/D_NQ_NP_2X_608560-MLA83731107275_042025-F.webp',
  'hogar-decoracion': 'https://http2.mlstatic.com/D_NQ_NP_2X_846580-MCO70098105579_062023-F.webp',
  'belleza-cuidado-personal': 'https://http2.mlstatic.com/D_Q_NP_935622-MCO53901173750_022023-P.webp',
  'ferreteria-herramientas': 'https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_settings-tool-67-category.webp',
  'juguetes-ninos': 'https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_bear-2-category.webp',
  'deportes-fitness': 'https://http2.mlstatic.com/D_Q_NP_666886-MLU74624082685_022024-P.webp',
  mascotas: 'https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_mascota-category.webp'
}
