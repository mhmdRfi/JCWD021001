import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const createSize = async (name, productCategoryId, toast) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post(
      `${API_ROUTE}/size`,
      {
        name,
        productCategoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
    })
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast({
      title: `${errorMessage}`,
      status: 'error',
    })
  }
}
