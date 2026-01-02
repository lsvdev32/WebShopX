import { InfiniteCarouselOfBrands } from '@/components/common/InfiniteCarouselOfBrands'
import { ShippingInfo } from '@/components/common/ShippingInfo'
import SliderImg from '@/components/common/SliderImg'
import SliderImgMobile from '@/components/common/SliderImgMobile'
import BackToTop from '@/features/home/components/ButtonBackToTop'
import { Helmet } from 'react-helmet-async'
import BestSellingProductsSection from '../components/BestSellingProductsSection'
import CategoryCarouselSection from '../components/CategoryCarouselSection'
import FashionPromoSection from '../components/FashionPromoSection'
import ProductsSection from '../components/ProductsSection'
import PromoSection from '../components/PromoSection'
import RecentProductsSection from '../components/RecentProductsSection'
import useHomeData from '../hooks/useHomeData'

/**
 * Componente principal de la pantalla de inicio
 * Utiliza el hook useHomeData para obtener los datos necesarios y renderizar las secciones
 * @returns {JSX.Element} Componente principal de la pantalla de inicio
 */

export default function HomeScreen () {
  const { loading, error, topSellingProducts, randomProducts, recentProducts, promos, categories } = useHomeData()

  return (
    <>
      <Helmet>
        <title>Inicio | WebShopX</title>
      </Helmet>
      <SliderImg />
      <SliderImgMobile />
      <BackToTop />
      <div className='relative hidden md:block'>
        <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#ebebeb] to-transparent dark:from-[#111111] dark:to-transparent' />
      </div>
      <ProductsSection products={randomProducts} loading={loading} error={error} />
      <InfiniteCarouselOfBrands />
      <FashionPromoSection promos={promos} loading={loading} error={error} />
      <RecentProductsSection products={recentProducts} loading={loading} error={error} />
      <BestSellingProductsSection products={topSellingProducts} loading={loading} error={error} />
      <PromoSection promos={promos} loading={loading} error={error} />
      <ShippingInfo />
      <CategoryCarouselSection categories={categories} loading={loading} error={error} />
    </>
  )
}
