import axios from 'axios'

const API_KEY = import.meta.env.VITE_FXDEED_API_KEY //  Api key de fxfeed.io
const BASE_URL = 'https://api.fxfeed.io/v1' // URL base de la API de fxfeed.io

/**
 * ConvertCOPtoUSD convierte una cantidad de dinero en COP a USD
 * @param {*} amountCOP - Cantidad de dinero en COP
 * @returns {Promise<number>} - Cantidad de dinero en USD
 */
export async function convertCOPtoUSD (amountCOP) {
  try {
    const response = await axios.get(`${BASE_URL}/convert`, {
      params: {
        api_key: API_KEY,
        from: 'COP',
        to: 'USD',
        amount: amountCOP
      }
    })
    return response.data.result
  } catch (error) {
    console.error('Error al hacer la conversion de dinero:', error)
    throw error
  }
}
