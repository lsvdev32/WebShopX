import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { calculateSavings, calculateShipping } from '@/utils/pricing'
import { useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router'
import { fetchRelatedProducts } from '../services/cartService'

/**
 * Hook para manejar el carrito de compras.
 * Proporciona funcionalidades para actualizar, eliminar productos y calcular totales.
 */
const initialState = {
  products: [],
  loading: true,
  error: null
}

/**
 * Reducer para manejar el estado del carrito de compras.
 * Maneja acciones de solicitud, éxito y fallo al obtener productos relacionados.
 * @param {*} state - Estado actual del carrito
 * @param {*} action - Acción a procesar
 * @returns {Object} Nuevo estado del carrito
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

/**
 * Hook para manejar el carrito de compras.
 * Proporciona acceso a los productos del carrito, totales y funciones para actualizar y eliminar productos.
 * @returns {Object} Objeto con el estado del carrito y funciones para interactuar con él.
 */
export default function useShoppingCart () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { state: cartState, dispatch: ctxDispatch } = useContext(Store)
  const { cart: { cartItems }, userInfo } = cartState
  const navigate = useNavigate()

  /**
   * Calcula el subtotal, cantidad de productos, costo de envío, ahorros y total del carrito.
   * Utiliza los productos del carrito para calcular estos valores.
   */
  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  const quantityOfProducts = cartItems.reduce((a, c) => a + c.quantity, 0)
  const shippingCost = cartItems.length === 0 ? 0 : calculateShipping(subtotal)
  const savings = cartItems.length === 0 ? 0 : calculateSavings(subtotal, shippingCost)
  const total = subtotal + shippingCost - savings

  /**
   * Carga productos relacionados basados en las categorías de los productos del carrito.
   * Excluye los productos ya presentes en el carrito para evitar duplicados.
   */
  useEffect(() => {
    const loadRelatedProducts = async () => {
      if (cartItems.length > 0) {
        dispatch({ type: 'FETCH_REQUEST' })
        try {
          const categories = [...new Set(cartItems.map(item => item.category))]
          const excludeIds = cartItems.map(item => item._id)
          const data = await fetchRelatedProducts(categories, excludeIds)
          dispatch({ type: 'FETCH_SUCCESS', payload: data })
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: err.message })
          toast({
            title: 'Error',
            description: 'No se pudieron cargar los productos relacionados.',
            variant: 'destructive'
          })
        }
      } else {
        dispatch({ type: 'FETCH_SUCCESS', payload: [] })
      }
    }
    loadRelatedProducts()
  }, [cartItems])

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * Verifica la disponibilidad del producto antes de actualizar.
   * @param {*} item - Producto a actualizar
   * @param {*} quantity - Nueva cantidad del producto
   * @returns {Promise<void>}
   */
  const updateCartHandler = async (item, quantity) => {
    try {
      if (item.stock < quantity) {
        toast({
          title: 'Producto agotado',
          description: 'Lo sentimos, el producto no está disponible.',
          variant: 'destructive'
        })
        return
      }
      ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
      toast({
        description: `Cantidad actualizada para ${item.name}.`
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el carrito.',
        variant: 'destructive'
      })
    }
  }

  /**
   * Elimina un producto del carrito.
   * Despacha una acción para eliminar el producto y muestra un mensaje de confirmación.
   * @param {*} item - Producto a eliminar del carrito
   */
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    toast({
      description: `${item.name} ha sido eliminado del carrito.`
    })
  }

  /**
   * Maneja el proceso de checkout.
   * Redirige al usuario a la página de envío si está autenticado,
   */
  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping')
    } else {
      navigate('/signin?redirect=/shipping')
    }
  }

  return {
    loading: state.loading,
    error: state.error,
    relatedProducts: state.products,
    cartItems,
    subtotal,
    shippingCost,
    savings,
    total,
    quantityOfProducts,
    userInfo,
    updateCartHandler,
    removeItemHandler,
    checkoutHandler
  }
}
