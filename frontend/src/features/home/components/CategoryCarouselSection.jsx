import AnimatedSection from '@/components/common/AnimatedSection'
import CardWrapper from '@/components/common/CardWrapper'
import Container from '@/components/common/Container'
import { MessageBox } from '@/components/common/MessageBox'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CategoryCard } from './CategoryCards'
import CategoryCarouselSkeleton from './CategoryCarouselSkeleton'

/**
 * Seccion de carrusel de categorías
 * @param {*} param0 - objeto con las propiedades de la sección
 * @returns {JSX.Element} - Componente de sección de carrusel de categorías
 */

export default function CategoryCarouselSection ({ categories, loading, error }) {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [showAll, setShowAll] = useState(false)

  /**
   * Divide las categorías en páginas para el carrusel
   * @type {number} categoriesPerPage - Número de categorías por página
   */
  const categoriesPerPage = 12
  const categoryPages = []
  for (let i = 0; i < categories.length; i += categoriesPerPage) {
    categoryPages.push(categories.slice(i, i + categoriesPerPage))
  }

  /**
   * Efecto para inicializar el carrusel y manejar la selección de elementos
   */
  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Limitar categorías en móvil (3 filas = 3 categorías)
  const categoriesToShow = showAll ? categories : categories.slice(0, 3)
  const hasMoreCategories = categories.length > 3

  return (
    <AnimatedSection>
      <Container>
        <CardWrapper className='p-6'>
          {loading
            ? (
              <CategoryCarouselSkeleton />
              )
            : error
              ? (
                <MessageBox variant='danger'>{error}</MessageBox>
                )
              : (
                <>
                  <div className='mb-6 flex items-center justify-between'>
                    <h2 className='text-start text-2xl font-light text-card-foreground'>Buscar por categorías</h2>
                    <div className='hidden md:flex items-center'>
                      <a href='#' className='text-card-foreground hover:text-primary-hover transition-colors hover:underline' aria-label='Mostrar todas las categorías'>
                        Mostrar todas las categorías
                      </a>
                      <div className='ml-4 flex'>
                        {Array.from({ length: count }).map((_, index) => (
                          <span
                            key={index}
                            className={`mx-0.5 h-2 w-2 rounded-full cursor-pointer transition-colors ${current === index ? 'bg-primary' : 'bg-muted'}`}
                            onClick={() => api?.scrollTo(index)}
                            role='button'
                            tabIndex={0}
                            aria-label={`Ir a la página ${index + 1} de categorías`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vista móvil (< md) */}
                  <div className='md:hidden'>
                    <div className='grid grid-cols-1 gap-4'>
                      {categoriesToShow.map((category) => (
                        <CategoryCard
                          key={category.id}
                          title={category.title}
                          imageSrc={category.imageSrc}
                          imageAlt={category.imageAlt}
                          href={category.href}
                        />
                      ))}
                    </div>

                    {hasMoreCategories && (
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className='mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-transparent font-light text-foreground hover:text-primary transition-colors'
                        aria-expanded={showAll}
                      >
                        {showAll
                          ? (
                            <>
                              Ver menos categorías
                              <ChevronUp className='w-5 h-5' />
                            </>
                            )
                          : (
                            <>
                              Ver más categorías
                              <ChevronDown className='w-5 h-5' />
                            </>
                            )}
                      </button>
                    )}
                  </div>

                  {/* Vista desktop (≥ md) - Carrusel original */}
                  <div className='hidden md:block'>
                    <Carousel setApi={setApi} className='w-full' opts={{ align: 'start' }}>
                      <CarouselContent>
                        {categoryPages.map((page, pageIndex) => (
                          <CarouselItem key={pageIndex} className='p-6'>
                            <div className='grid grid-cols-1 sm:grid-rows-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                              {page.map((category) => (
                                <CategoryCard
                                  key={category.id}
                                  title={category.title}
                                  imageSrc={category.imageSrc}
                                  imageAlt={category.imageAlt}
                                  href={category.href}
                                />
                              ))}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </>
                )}
        </CardWrapper>
      </Container>
    </AnimatedSection>
  )
}
