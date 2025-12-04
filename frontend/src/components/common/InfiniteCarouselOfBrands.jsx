/**
 * Componente que muestra un carrusel infinito de logotipos de marcas
 */

import * as Logos from '@/assets/infinite-silider-svgs'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { useRef } from 'react'
import AnimatedSection from './AnimatedSection'
import Container from './Container'

export function InfiniteCarouselOfBrands () {
  const ref = useRef(null)

  return (
    <AnimatedSection>
      <section ref={ref}>
        <Container>
          <InfiniteSlider
            ref={ref}
            gap={32}
            speed={30}
            reverse
            className='w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl mx-auto'
          >
            {Object.entries(Logos).map(([name, src]) => (
              <div key={name} className='flex items-center justify-center h-8 w-20 sm:h-10 sm:w-24 md:h-12 md:w-32'>
                <img
                  src={src}
                  alt={`${name} logo`}
                  className='max-h-full max-w-full object-contain'
                />
              </div>
            ))}
          </InfiniteSlider>
        </Container>
      </section>
    </AnimatedSection>
  )
}
