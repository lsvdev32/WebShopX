/**
 * En este archivo se define un hook personalizado para manejar el formulario de productos en la sección de administración.
 * Este hook se encarga de la lógica de creación y actualización de productos, así como de la gestión de imágenes y categorías.
 */

import { Store } from '@/context/Store'
import { CreateProductSchema } from '@/features/admin/products/validations/create-product'
import { toast } from '@/hooks/use-toast'
import { generateLinkFromName } from '@/utils/generate-link-from-name'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { groupedCategories } from '../constants/categories'
import { createProduct, updateProduct, uploadProductImages } from '../services/productService'

export default function useProductForm ({ product, setOpenModal, onSuccess }) {
  const { state } = useContext(Store)
  const { userInfo } = state
  const [uploading, setUploading] = useState(false)
  const [categories] = useState(groupedCategories)
  const [customCategory, setCustomCategory] = useState('')
  const [previewImages, setPreviewImages] = useState(product?.images || [])

  /**
   * Hook para manejar el formulario de productos.
   * Permite crear o actualizar productos, gestionar imágenes y categorías.
   */
  const form = useForm({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: product?.name || '',
      link: product?.link || '',
      images: product?.images || [],
      brand: product?.brand || '',
      category: product?.category || '',
      description: product?.description || '',
      price: product?.price || 0,
      stock: product?.stock || 0
    }
  })

  /**
   * Efecto para inicializar el formulario con los valores del producto.
   * Se ejecuta al cargar el componente o cuando cambia el producto.
   */
  useEffect(() => {
    form.reset({
      name: product?.name || '',
      link: product?.link || '',
      images: product?.images || [],
      brand: product?.brand || '',
      category: product?.category || '',
      description: product?.description || '',
      price: product?.price || 0,
      stock: product?.stock || 0
    })
    setPreviewImages(product?.images || [])
  }, [product, form])

  /**
   * Maneja la subida de imágenes al formulario.
   * Permite seleccionar múltiples imágenes y las sube al servidor.
   * @param {*} event - Evento de cambio del input de archivos.
   * Se espera que el input tenga el atributo `multiple`.
   * @returns {Promise<void>}
   */
  const handleUploadImages = async (event) => {
    const files = event.target.files
    if (!files.length) return

    try {
      setUploading(true)
      const newImages = await uploadProductImages(files, userInfo.token)
      const updatedImages = [...form.getValues('images'), ...newImages]
      form.setValue('images', updatedImages)
      setPreviewImages(updatedImages)
      toast({
        description: `${newImages.length} imagen(es) subidas correctamente.`
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Ocurrió un error al subir las imágenes.',
        variant: 'destructive'
      })
    } finally {
      setUploading(false)
    }
  }

  /**
   * Maneja la eliminación de una imagen del formulario.
   * Actualiza el estado de las imágenes y el formulario.
   * @param {*} index - Índice de la imagen a eliminar.
   */
  const handleRemoveImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(updatedImages)
    form.setValue('images', updatedImages)
  }

  /**
   * Maneja la selección de una imagen como imagen principal.
   * Actualiza el orden de las imágenes en el formulario.
   *
   * La imagen selecciona como promaria se mueve al inicio del array de imágenes.
   * y es la que se mostrara como imagen principal del producto, en las vistas de productos, cards, etc.
   * @param {*} index - Índice de la imagen a establecer como principal.
   * Se espera que el índice sea válido dentro del array de imágenes.
   */
  const handleSetPrimaryImage = (index) => {
    const selectedImage = previewImages[index]
    const updatedImages = [selectedImage, ...previewImages.filter((_, i) => i !== index)]
    setPreviewImages(updatedImages)
    form.setValue('images', updatedImages)
  }

  /**
   * Maneja la creación de una nueva categoría personalizada.
   * Si la categoría no está vacía, se agrega al estado de categorías.
   * @param {*} value - Valor de la nueva categoría.
   * Se espera que el valor sea una cadena de texto.
   */
  // const handleCustomCategory = (value) => {
  //   if (value.trim() !== '') {
  //     const newCategory = { value, label: value }
  //     setCategories([...categories.filter(c => c.value !== 'Otra'), newCategory, { value: 'Otra', label: 'Otra...' }])
  //     form.setValue('category', value)
  //   }
  // }

  /**
   * Maneja el envío del formulario.
   * Valida que se hayan subido al menos 3 imágenes antes de proceder.
   * @param {*} data - Datos del formulario.
   * Se espera que los datos contengan las propiedades definidas en el esquema de validación
   * @returns {Promise<void>}
   * Si el producto ya existe, se actualiza; si no, se crea uno nuevo
   */
  const handleSubmit = async (data) => {
    if (data.images.length < 3) {
      toast({
        title: 'Error',
        description: 'Debes subir al menos 3 imágenes.',
        variant: 'destructive'
      })
      return
    }

    try {
      if (product?._id) {
        await updateProduct(product._id, data, userInfo.token)
        toast({
          description: 'Producto actualizado correctamente.'
        })
      } else {
        await createProduct(data, userInfo.token)
        toast({
          description: 'Producto creado correctamente.'
        })
      }
      setOpenModal(false)
      if (onSuccess) onSuccess()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message,
        variant: 'destructive'
      })
    }
  }
  /**
   * Hook para manejar el formulario de productos.
   * Permite crear o actualizar productos, gestionar imágenes y categorías.
   * @returns {Object} - Contiene el formulario, estados y funciones para manejar el formulario.
   */
  return {
    form,
    uploading,
    categories,
    customCategory,
    setCustomCategory,
    previewImages,
    handleUploadImages,
    handleRemoveImage,
    handleSetPrimaryImage,
    // handleCustomCategory,
    handleNameChange: (e) => {
      form.setValue('name', e.target.value)
      form.setValue('link', generateLinkFromName(e.target.value))
    },
    handleSubmit: form.handleSubmit(handleSubmit)
  }
}
