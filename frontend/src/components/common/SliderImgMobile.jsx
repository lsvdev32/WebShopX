/**
 * Componente de carrusel de imágenes para móviles
 * Diseño optimizado para pantallas pequeñas con indicadores de puntos
 *
 * Se muestra solo en dispositivos móviles (< md)
 */

import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '../ui/carousel'

const images = [
  { src: 'https://http2.mlstatic.com/D_NQ_819256-MLA82106271385_012025-OO.webp', alt: 'Imagen 1' },
  { src: 'https://http2.mlstatic.com/D_NQ_672974-MLA82102504045_012025-OO.webp', alt: 'Imagen 2' },
  { src: 'https://http2.mlstatic.com/D_NQ_638717-MLA81804579894_012025-OO.webp', alt: 'Imagen 3' },
  { src: 'https://http2.mlstatic.com/D_NQ_700774-MLA83825321937_042025-OO.webp', alt: 'Imagen 4' },
  { src: 'https://http2.mlstatic.com/D_NQ_992755-MLA83712559807_042025-OO.webp', alt: 'Imagen 5' }
]

export default function SliderImgMobile () {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    // Actualizar el índice actual cuando cambia el slide
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollTo = useCallback((index) => {
    if (api) api.scrollTo(index)
  }, [api])

  return (
    <div className='md:hidden w-full px-3 py-2'>
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false
          })
        ]}
        className='w-full'
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className='relative'>
              <div className='relative overflow-hidden rounded-lg h-[220px]'>
                <img
                  src={image.src}
                  alt={image.alt}
                  className='w-full h-full object-cover'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicadores de puntos debajo del slider */}
      <div className='flex justify-center gap-2 mt-3'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? 'w-8 bg-[#1a2238]'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
