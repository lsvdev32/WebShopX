import getError from '@/components/common/Error'
import { toast } from '@/hooks/use-toast'
import { useEffect, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { fetchCategories, searchProducts } from '../services/productService'

/**
 * Hook para buscar productos
 * @returns {Object} Objeto con el estado de la búsqueda y funciones para manejar filtros
 */
const PRODUCTS_PER_PAGE = 20

/**
 * Reducer para manejar el estado de la búsqueda de productos
 * @param {*} state - Estado actual
 * @param {*} action - Acción a realizar
 * @returns {Object} Nuevo estado
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false
      }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * Custom hook para buscar productos con filtros
 * @returns {Object} Objeto con el estado de la búsqueda y funciones para manejar filtros
 */
export default function useProductSearch () {
  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const category = sp.get('category') || 'all'
  const query = sp.get('query') || 'all'
  const price = sp.get('price') || 'all'
  const ratings = sp.get('ratings') || 'all' // CAMBIADO: rating → ratings
  const order = sp.get('order') || 'newest'
  const page = sp.get('page') || 1

  /**
   * Estado del hook que maneja la búsqueda de productos
   * @type {Array} Estado y dispatch del reducer
   */
  const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
    loading: true,
    error: null,
    products: [],
    pages: 0,
    countProducts: 0
  })
  const [categories, setCategories] = useState([])

  /**
   * Carga los productos al montar el componente o al cambiar los filtros
   * @returns {void}
   */
  useEffect(() => {
    const loadProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const data = await searchProducts({
          page,
          query,
          category,
          price,
          ratings, // CAMBIADO: rating → ratings
          order,
          limit: PRODUCTS_PER_PAGE
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
        toast({
          title: 'Error',
          description: getError(err),
          variant: 'destructive'
        })
      }
    }
    loadProducts()
  }, [category, order, page, price, query, ratings]) // CAMBIADO: rating → ratings

  /**
   * Carga las categorías al montar el componente
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        toast({
          title: 'Error',
          description: getError(err),
          variant: 'destructive'
        })
      }
    }
    loadCategories()
  }, [])

  /**
   * Genera la URL de filtro para la búsqueda de productos
   * @param {*} filter - Objeto con los filtros aplicados
   * @param {*} skipPathname - Si se debe omitir el pathname en la URL
   * @returns {string} URL de filtro
   */
  const getFilterUrl = (filter, skipPathname = false) => {
    const filterPage = filter.page || page
    const filterCategory = filter.category || category
    const filterQuery = filter.query || query
    const filterRatings = filter.ratings || ratings // CAMBIADO: filterRating/rating → filterRatings/ratings
    const filterPrice = filter.price || price
    const sortOrder = filter.order || order
    return `${skipPathname ? '' : '/search?'}category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&ratings=${filterRatings}&order=${sortOrder}&page=${filterPage}` // ✅ CAMBIADO: rating → ratings
  }

  return {
    loading,
    error,
    products,
    pages,
    countProducts,
    category,
    query,
    price,
    ratings, // CAMBIADO: rating → ratings (para que FilterSidebar reciba currentRating correcto)
    order,
    page,
    categories,
    getFilterUrl,
    navigate
  }
}
