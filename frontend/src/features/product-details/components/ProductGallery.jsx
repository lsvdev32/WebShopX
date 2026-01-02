import { useState } from 'react'

/**
 * Componente para mostrar la galería de imágenes de un producto.
 * Permite seleccionar una imagen principal y ver miniaturas de otras imágenes.
 * @param {*} param0 - Objeto que contiene las imágenes del producto.
 * @returns {JSX.Element} - Componente de galería de imágenes del producto.
 */
export default function ProductGallery ({ images = [] }) {
  // Estado para manejar la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(0)

  // Si no hay imágenes, se muestra una imagen de marcador de posición
  // Se asegura de que siempre haya al menos una imagen para mostrar
  const displayImages = images.length > 0 ? images : ['/placeholder.svg']

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <div className='w-full order-1 md:order-2 md:flex-1'>
        <img
          src={displayImages[selectedImage] || '/placeholder.svg'}
          alt='Product main image'
          className='w-full h-auto max-h-96 object-contain bg-white m-2 rounded-lg p-0'
        />
      </div>
      <div className='flex flex-row md:flex-col gap-2 overflow-x-auto order-2 md:order-1 mt-4 md:mt-0'>
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`min-w-[80px] w-20 h-20 p-2 border cursor-pointer flex-shrink-0 bg-white rounded-lg ${
              selectedImage === index ? 'border-2 border-primary' : 'border-foreground'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image || '/placeholder.svg'}
              alt={`Product thumbnail ${index + 1}`}
              className='w-full h-full object-contain'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
