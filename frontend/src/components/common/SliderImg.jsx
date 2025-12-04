/**
 * Componente de carrusel de imágenes
 * muestra una serie de imágenes con autoplay
 *
 * Lo mostramos en la página principal
 */

import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '../ui/carousel'

export default function SliderImg () {
  return (
    <Carousel
      opts={{ loop: true }} // Bucle infito activaso, para evitar que se el carrusel se regrese al inicio
      plugins={[
        Autoplay({
          delay: 5000, // Cada 5 segundos cambia la imagen
          stopOnInteractions: false // No se detiene al interactuar con el carrusel
        })
      ]}
      className='hidden md:block'
    >
      <CarouselContent className='-ml-2 md:-ml-4'>
        <CarouselItem className='pl-2 md:pl-4'>
          <img src='https://http2.mlstatic.com/D_NQ_819256-MLA82106271385_012025-OO.webp' alt='Imagen 1' />
        </CarouselItem>
        <CarouselItem className='pl-2 md:pl-4'>
          <img src='https://http2.mlstatic.com/D_NQ_672974-MLA82102504045_012025-OO.webp' alt='Imagen 2' />
        </CarouselItem>
        <CarouselItem className='pl-2 md:pl-4'>
          <img src='https://http2.mlstatic.com/D_NQ_638717-MLA81804579894_012025-OO.webp' alt='Imagen 3' />
        </CarouselItem>
        <CarouselItem className='pl-2 md:pl-4'>
          <img src='https://http2.mlstatic.com/D_NQ_700774-MLA83825321937_042025-OO.webp' alt='Imagen 4' />
        </CarouselItem>
        <CarouselItem className='pl-2 md:pl-4'>
          <img src='https://http2.mlstatic.com/D_NQ_992755-MLA83712559807_042025-OO.webp' alt='Imagen 5' />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
