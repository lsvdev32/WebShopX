/**
 * Categorías predefinidas para productos
 * @module categories
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
 * Obtiene las categorías (values) de un grupo específico por su slug
 * @param {string} groupSlug - Slug del grupo (ej: 'tecnologia-electronica')
 * @returns {Array<string>} Array con los valores de categorías del grupo
 */
export const getCategoriesByGroupSlug = (groupSlug) => {
  const group = groupedCategories.find(g => g.slug === groupSlug)
  return group ? group.items.map(item => item.value) : []
}

/**
 * Verifica si un slug corresponde a un grupo de categorías
 * @param {string} slug - Slug a verificar
 * @returns {boolean} True si es un grupo válido
 */
export const isGroupSlug = (slug) => {
  return groupedCategories.some(g => g.slug === slug)
}
