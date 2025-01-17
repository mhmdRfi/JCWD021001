import {
  createStockQuery,
  deleteStockQuery,
  getStockByIdQuery,
  getStockByProductIdQuery,
  getStockQuery,
  getStockReportQuery,
} from '../queries/stock.queries'

export const getStockService = async (warehouseId, name, page, pageSize) => {
  try {
    const res = await getStockQuery(warehouseId, name, page, pageSize)
    return res
  } catch (err) {
    throw err
  }
}

export const createStockService = async (productId, warehouseId, qty, sizeId, colourId) => {
  try {
    const res = await createStockQuery(productId, warehouseId, qty, sizeId, colourId)
    return res
  } catch (err) {
    throw err
  }
}

export const getStockByIdService = async (id) => {
  try {
    const res = await getStockByIdQuery(id)
    return res
  } catch (err) {
    throw err
  }
}

export const getStockByProductIdService = async (productId, sizeId, colourId) => {
  try {
    const res = await getStockByProductIdQuery(productId, sizeId, colourId)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteStockService = async (id) => {
  try {
    const res = await deleteStockQuery(id)
    return res
  } catch (err) {
    throw err
  }
}

export const getStockReportService = async (warehouseId, page, pageSize, startDate, endDate) => {
  try {
    const res = await getStockReportQuery(warehouseId, page, pageSize, startDate, endDate)
    return res
  } catch (err) {
    throw err
  }
}
