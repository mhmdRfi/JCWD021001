import { API_ROUTE } from '../../../services/route'
import axios from 'axios'

export const getProductDetails = async (id) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`${API_ROUTE}/product/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const product = res?.data?.data
    return product
  } catch (err) {
    throw err
  }
}
