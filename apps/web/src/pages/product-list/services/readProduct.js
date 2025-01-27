import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const getProduct = async (
  name = '',
  gender = '',
  group = '',
  category = '',
  setProducts,
  sortBy = 'name',
  orderBy = 'ASC',
  page = 1,
  pageSize = 10,
) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `${API_ROUTE}product?name=${name}&gender=${gender}&group=${group}&category=${category}&sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setProducts(res?.data?.data)
  } catch (err) {
    throw err
  }
}
