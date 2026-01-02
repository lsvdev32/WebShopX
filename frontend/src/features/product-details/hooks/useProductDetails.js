import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import {
  useContext,
  useEffect,
  useReducer,
  useRef
} from 'react'
import {
  deleteProductReview,
  fetchProductByLink,
  postProductReview,
  updateProductReview
} from '../services/productService'

// Estado inicial del reducer
const initialState = {
  product: null,
  loading: true,
  error: null,
  loadingCreateReview: false,
  userReview: null,
  showReviewForm: false
}

// Reducer para manejar el estado del componente
function reducer (state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload }
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true }
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false }
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false }
    case 'SET_USER_REVIEW':
      return { ...state, userReview: action.payload }
    case 'TOGGLE_REVIEW_FORM':
      return { ...state, showReviewForm: action.payload }
    default:
      return state
  }
}

export default function useProductDetails (link) {
  // Dispatch para el estado local del componente (maneja loading, product, reviews, etc.)
  const [{
    loading,
    error,
    product,
    loadingCreateReview,
    userReview,
    showReviewForm
  }, dispatch] = useReducer(reducer, initialState)
  // Dispatch para el estado global del contexto Store (maneja cart, userInfo, etc.)
  const { state: authState, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = authState
  const reviewsRef = useRef()

  /**
    * useEffect encargado de cargar el producto y la información del usuario(reseñas)
  */
  useEffect(() => {
    const loadProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const data = await fetchProductByLink(link)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
        if (userInfo && data.reviews) {
          const userReview = data.reviews.find((review) => review.name === userInfo.name)
          if (userReview) {
            dispatch({ type: 'SET_USER_REVIEW', payload: { ...userReview, productId: data._id } })
          } else {
            dispatch({ type: 'SET_USER_REVIEW', payload: null })
          }
        }
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    }
    loadProduct()
  }, [link, userInfo])

  /**
    * Función para agregar un producto al carrito
    * @returns {function} addProductToCart - Función para agregar el producto al carrito
    * @description Esta función verifica si el producto está en stock y lo agrega al carrito.
  */
  const addProductToCart = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.stock < quantity) {
      toast({
        title: 'Producto agotado',
        description: 'Lo sentimos, el producto no está disponible.',
        variant: 'destructive'
      })
      return
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity }
    })

    toast({
      description: `${product.name} ha sido añadido al carrito.`
    })
  }

  /**
   * Validacion de datos de la reseña
   * @param {*} ratings Estrellas
   * @param {*} comment Comentario
   * @param {*} deleted Si se eliminó la reseña
   * @returns {boolean} True si los datos son válidos, false si no lo son
   * @description Esta función valida los datos de la reseña. Si no se han proporcionado calificaciones o comentarios, muestra un mensaje de error.
   */
  const validateReviewData = ({ ratings, comment, deleted }) => {
    if (!deleted && (!ratings || !comment)) {
      toast({
        title: 'Faltan datos',
        description: 'Por favor, selecciona una calificación y escribe un comentario.',
        variant: 'destructive'
      })
      return false
    }
    return true
  }

  /**
   * Función para crear una reseña
   * @param {*} ratings Estrellas
   * @param {*} comment Comentario
   * @returns Devuelve el producto actualizado, con la reseña añadida
   * @description Esta función crea una reseña para el producto. Si la reseña se crea con éxito, actualiza el estado del producto y muestra un mensaje de éxito.
   */
  const createReview = async ({ ratings, comment }) => {
    const data = await postProductReview(
      product._id,
      { ratings, comment, name: userInfo.name },
      userInfo.token
    )
    // Actualizamos el prosucto con la nueva reseña
    const refreshedProduct = await fetchProductByLink(link)
    dispatch({
      type: 'SET_USER_REVIEW',
      payload: { ...data.review, productId: product._id }
    })
    toast({
      title: 'Reseña publicada',
      description: '¡Tu comentario ha sido añadida con éxito!'
    })
    return refreshedProduct
  }

  /**
   * Funcion para actualizar una reseña
   * @param {*} recibe Los datos de la reseña (calificación, comentario y id de la reseña)
   * @returns Actualiza la reseña en el producto y devuelve el producto actualizado
   * @description Esta función actualiza la reseña del producto. Si la reseña no existe, muestra un mensaje de error.
   */
  const updateReview = async ({ ratings, comment, reviewId }) => {
    await updateProductReview(
      userReview.productId,
      userReview._id,
      { ratings, comment },
      userInfo.token
    )
    const updatedReviews = product.reviews.map((review) =>
      review._id === reviewId ? { ...review, ratings: Number(ratings), comment } : review
    )
    const updatedProduct = {
      ...product,
      reviews: updatedReviews,
      ratings: updatedReviews.reduce((a, c) => c.ratings + a, 0) / updatedReviews.length
    }
    dispatch({
      type: 'SET_USER_REVIEW',
      payload: { ...userReview, ratings: Number(ratings), comment }
    })
    return updatedProduct
  }

  /**
   * Funcion para eliminar una reseña
   * @param {*} reviewId Id de la reseña a eliminar
   * @returns Elimina la reseña del producto y devuelve el producto actualizado
   * @description Esta función elimina la reseña del producto. Si la reseña no existe, muestra un mensaje de error.
   */
  const deleteReview = async ({ reviewId }) => {
    await deleteProductReview(userReview.productId, userReview._id, userInfo.token)
    const updatedReviews = product.reviews.filter((r) => r._id !== reviewId)
    const updatedProduct = {
      ...product,
      reviews: updatedReviews,
      numReviews: product.numReviews - 1,
      ratings:
        updatedReviews.length > 0
          ? updatedReviews.reduce((a, c) => c.ratings + a, 0) / updatedReviews.length
          : 0
    }
    dispatch({ type: 'SET_USER_REVIEW', payload: null })
    return updatedProduct
  }

  /**
   * Función para manejar el éxito de la operación de reseña
   * @param {*} updatedProduct Producto actualizado
  */
  const handleSuccess = (updatedProduct) => {
    dispatch({ type: 'REFRESH_PRODUCT', payload: updatedProduct })
    dispatch({ type: 'CREATE_SUCCESS' })
    dispatch({ type: 'TOGGLE_REVIEW_FORM', payload: false })
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Manejador de errores
   * @param {*} error Error de la operación
   * @description Esta función maneja los errores de la operación de reseña. Si hay un error, muestra un mensaje de error.
   */
  const handleError = (error) => {
    console.error('Error in review operation:', error.response?.data?.message || error.message)
    toast({
      title: 'Error',
      description: error.response?.data?.message || 'No se pudo completar la operación',
      variant: 'destructive'
    })
    dispatch({ type: 'CREATE_FAIL' })
  }

  /**
   * Esta función maneja el envío de la reseña
   * @param {Object} param0 Objeto con los datos de la reseña (calificación, comentario, id de la reseña y si se eliminó)
   * @returns {function} handleReviewSubmit - Función para manejar el envío de la reseña
   * @description Esta función maneja el envío de la reseña. Si la reseña se crea, actualiza el estado del producto y muestra un mensaje de éxito. Si la reseña se elimina, actualiza el estado del producto y muestra un mensaje de éxito.
   */
  const handleReviewSubmit = async ({ ratings, comment, reviewId, deleted }) => {
    if (!validateReviewData({ ratings, comment, deleted })) {
      return
    }

    dispatch({ type: 'CREATE_REQUEST' })
    try {
      let updatedProduct
      if (deleted) {
        updatedProduct = await deleteReview({ reviewId })
      } else if (reviewId) {
        updatedProduct = await updateReview({ ratings, comment, reviewId })
      } else {
        updatedProduct = await createReview({ ratings, comment })
      }
      handleSuccess(updatedProduct)
    } catch (error) {
      handleError(error)
    }
  }

  /**
   * Función para alternar el formulario de reseña
   * @returns {function} toggleReviewForm - Función para alternar el formulario de reseña
   * @description Esta función alterna el formulario de reseña. Si el usuario no está autenticado, muestra un mensaje de error.
   */
  const toggleReviewForm = () => {
    if (userInfo) {
      dispatch({ type: 'TOGGLE_REVIEW_FORM', payload: !showReviewForm })
    } else {
      toast({
        title: 'Acceso denegado',
        description: 'Por favor, inicia sesión para opinar.',
        variant: 'destructive'
      })
    }
  }

  // Retornamos el estado y las funciones necesarias para el componente
  return {
    loading,
    error,
    product,
    userInfo,
    addProductToCart,
    loadingCreateReview,
    userReview,
    showReviewForm,
    handleReviewSubmit,
    toggleReviewForm,
    reviewsRef
  }
}
