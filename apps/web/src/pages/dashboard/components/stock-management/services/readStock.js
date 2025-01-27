import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'
export const getStock = async (warehouseId, name = '', page = 1, pageSize = 10) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `${API_ROUTE}/stock?warehouseId=${warehouseId}&name=${name}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const stock = res?.data?.data
    return stock
  } catch (err) {
    throw err
  }
}

export const getStockReports = async (page = 1, pageSize = 10, warehouseId, startDate, endDate) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `${API_ROUTE}/stock/stock/report/month?page=${page}&pageSize=${pageSize}&warehouseId=${warehouseId}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const storkReports = res?.data?.data
    return storkReports
  } catch (err) {
    throw err
  }
}
