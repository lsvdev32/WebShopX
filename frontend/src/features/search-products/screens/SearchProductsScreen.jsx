import AnimatedSection from '@/components/common/AnimatedSection'
import { MessageBox } from '@/components/common/MessageBox'
import { Helmet } from 'react-helmet-async'
import FilterSidebar from '../components/FilterSidebar'
import FilterSidebarSkeleton from '../components/FilterSidebarSkeleton'
import FilterTags from '../components/FilterTags'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import MobileSortDrawer from '../components/MobileSortDrawer'
import Pagination from '../components/Pagination'
import ProductList from '../components/ProductList'
import ProductListSkeleton from '../components/ProductListSkeleton'
import SortSelect from '../components/SortSelect'
import useProductSearch from '../hooks/useProductSearch'

/**
 * Pantalla de búsqueda de productos
 * @returns {JSX.Element} Componente de búsqueda de productos
 */
export default function SearchProductsScreen () {
  const {
    loading,
    error,
    products,
    pages,
    countProducts,
    category,
    query,
    price,
    rating,
    order,
    page,
    categories,
    getFilterUrl,
    navigate
  } = useProductSearch()

  return (
    <AnimatedSection>
      <Helmet>
        <title>Buscar Productos | WebShopX</title>
      </Helmet>
      <div className='flex gap-2 md:hidden mb-4'>
        <MobileFilterDrawer
          categories={categories}
          currentCategory={category}
          currentPrice={price}
          currentRating={rating}
          getFilterUrl={getFilterUrl}
        />
        <MobileSortDrawer currentOrder={order} getFilterUrl={getFilterUrl} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='hidden md:block md:col-span-1'>
          {loading
            ? (
              <FilterSidebarSkeleton />
              )
            : (
              <FilterSidebar
                categories={categories}
                currentCategory={category}
                currentPrice={price}
                currentRating={rating}
                getFilterUrl={getFilterUrl}
              />
              )}
        </div>
        <div className='md:col-span-3'>
          {loading
            ? (
              <ProductListSkeleton />
              )
            : error
              ? (
                <MessageBox variant='danger'>{error}</MessageBox>
                )
              : (
                <div className='space-y-6'>
                  <div className='flex p-4 rounded-sm flex-col md:flex-row md:justify-between md:items-center gap-4'>
                    <div className='flex flex-col gap-2 items-center'>
                      <span className='text-sm text-muted-foreground'>
                        {countProducts === 0 ? 'No' : countProducts} productos en total
                      </span>
                      <FilterTags
                        query={query}
                        category={category}
                        price={price}
                        rating={rating}
                        getFilterUrl={getFilterUrl}
                      />
                    </div>
                    <div className='hidden md:block'>
                      <SortSelect currentOrder={order} getFilterUrl={getFilterUrl} />
                    </div>
                  </div>
                  {products.length === 0
                    ? (
                      <MessageBox variant='warning'>No se encontraron productos</MessageBox>
                      )
                    : (
                      <ProductList products={products} />
                      )}
                  <Pagination pages={pages} currentPage={page} getFilterUrl={getFilterUrl} navigate={navigate} />
                </div>
                )}
        </div>
      </div>
    </AnimatedSection>
  )
}
