import AnimatedSection from '@/components/common/AnimatedSection'
import DataTable from '@/components/common/DataTable'
import { MessageBox } from '@/components/common/MessageBox'
import { Helmet } from 'react-helmet-async'
import ProductEditModal from '../components/ProductEditModal'
import ProductsSkeleton from '../components/ProductsSkeleton'
import { getProductTableColumns } from '../components/ProductTableColumns'
import useProducts from '../hooks/useProducts'

export default function ProductsScreen () {
  /**
   * Hook para manejar la lógica de productos
   */
  const {
    products,
    loading,
    error,
    loadingDelete,
    selectedProduct,
    openModal,
    handleDeleteProduct,
    handleEditProduct,
    handleCreateProduct,
    handleUpdateSuccess,
    handleToggleModal
  } = useProducts()

  /**
   * Genera las columnas de la tabla de productos
   * @param {Function} handleEditProduct - Función para manejar la edición de un producto
   * @param {Function} handleDeleteProduct - Función para manejar la eliminación de un producto
   * @returns {Array} - Array de columnas para la tabla
   */
  const columns = getProductTableColumns({ handleEditProduct, handleDeleteProduct })

  return (
    <AnimatedSection className='w-full py-6'>
      <Helmet>
        <title>Administrar Productos | WebShopX</title>
      </Helmet>
      <header className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-semibold'>Administrar productos disponibles</h1>
          <p className='text-sm text-muted-foreground'>
            Aquí puedes crear, actualizar y eliminar los productos de tu tienda.
          </p>
        </div>
        <ProductEditModal
          open={openModal}
          selectedProduct={selectedProduct}
          onOpenChange={handleToggleModal}
          onSuccess={handleUpdateSuccess}
          onCreate={handleCreateProduct}
        />
      </header>
      {loading || loadingDelete
        ? (
          <ProductsSkeleton />
          )
        : error
          ? (
            <MessageBox variant='danger'>{error}</MessageBox>
            )
          : (
            <DataTable columns={columns} data={products} filterColumn='name' placeholderInput='nombre' />
            )}
    </AnimatedSection>
  )
}
