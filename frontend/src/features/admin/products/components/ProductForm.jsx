/**
 * Formulario para crear o editar productos en la sección de administración.
 * Utiliza un formulario controlado para manejar los datos del producto.
 */

/* eslint-disable react/jsx-handler-names */
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useProductForm from '../hooks/useProductForm'
import ProductImagesField from './ProductImagesField'

export default function ProductForm ({ product, setOpenModal, onSuccess }) {
  /**
   * Hook para manejar el estado del formulario del producto.
   * Incluye la lógica para subir imágenes, manejar categorías personalizadas,
   * y enviar el formulario.
   */
  const {
    form,
    uploading,
    categories,
    customCategory,
    setCustomCategory,
    previewImages,
    handleUploadImages,
    handleRemoveImage,
    handleSetPrimaryImage,
    handleCustomCategory,
    handleNameChange,
    handleSubmit
  } = useProductForm({ product, setOpenModal, onSuccess })

  /**
   * Formatea un número a formato de pesos colombianos (COP) con puntos de miles
   * @param {number|string} value - Valor numérico a formatear
   * @returns {string} Valor formateado con puntos (ej: "1.230.000")
   */
  const formatCOP = (value) => {
    if (!value) return ''
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8 bg-card'>
        <div className='grid grid-cols-2 gap-3'>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-foreground font-medium'>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nombre del producto...'
                    {...field}
                    onChange={handleNameChange}
                    aria-label='Nombre del producto'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='link'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-foreground font-medium'>Link</FormLabel>
                <FormControl>
                  <Input placeholder='URL del producto...' {...field} aria-label='URL del producto' readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <ProductImagesField
                field={field}
                previewImages={previewImages}
                handleUploadImages={handleUploadImages}
                handleRemoveImage={handleRemoveImage}
                handleSetPrimaryImage={handleSetPrimaryImage}
                uploading={uploading}
              />
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel className='text-foreground font-medium'>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder='Describe tu producto...' {...field} className='min-h-36 bg-background' aria-label='Descripción del producto' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-foreground font-medium'>Marca</FormLabel>
                <FormControl>
                  <Input placeholder='Marca del producto...' {...field} aria-label='Marca del producto' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-foreground font-medium'>Categoría</FormLabel>
                {field.value === 'Otra'
                  ? (
                    <FormControl>
                      <Input
                        placeholder='Escribe una nueva categoría...'
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        onBlur={() => handleCustomCategory(customCategory)}
                        aria-label='Categoría personalizada'
                      />
                    </FormControl>
                    )
                  : (
                    <Select onValueChange={field.onChange} defaultValue={field.value} modal={false}>
                      <FormControl>
                        <SelectTrigger className='bg-background border-border'>
                          <SelectValue placeholder='Selecciona una categoría' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent
                        className='max-h-[300px] overflow-y-auto'
                        position='popper'
                        sideOffset={5}
                        onWheel={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        {categories.map((group, index) => (
                          <div key={group.group}>
                            <SelectGroup>
                              <SelectLabel className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                                {group.group}
                              </SelectLabel>

                              {group.items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>

                            {index < categories.length - 1 && (
                              <SelectSeparator className='my-1 border' />
                            )}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>

                    )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-foreground font-medium'>Precio</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none'>
                      $
                    </span>
                    <Input
                      type='text'
                      placeholder='0'
                      value={formatCOP(field.value)}
                      onChange={(e) => {
                        // Remover todo excepto los números
                        const numericValue = e.target.value.replace(/[^\d]/g, '')
                        // Guardar como número en el formulario
                        field.onChange(numericValue ? parseInt(numericValue, 10) : 0)
                      }}
                      className='pl-7'
                      aria-label='Precio del producto'
                    />
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm z-10 pointer-events-none'>
                      COP
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-foreground font-medium'>Stock</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Cantidad disponible...'
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    aria-label='Stock del producto'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-full' aria-label={product?._id ? 'Actualizar producto' : 'Crear producto'}>
          {product?._id ? 'Actualizar producto' : 'Crear producto'}
        </Button>
      </form>
    </Form>
  )
}
