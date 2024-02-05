import {
  calculationCheckStockService,
  createOrderService,
  getOrderManagementService,
  getOrderService,
  getWarehouseService,
  productToStockIdService,
  updateOrderService,
} from '../services/orders.services'

const sendResponse = (res, statusCode, result, errorMessage) => {
  if (statusCode === 200) {
    return res.status(statusCode).json({
      message: 'success',
      data: result,
    })
  } else if (statusCode === 500) {
    return res.status(statusCode).json({
      message: 'error',
      error: errorMessage,
    })
  }
}

export const createOrderController = async (req, res) => {
  try {
    const {
      userId,
      userAddressId,
      warehouseId,
      totalPrice,
      totalQuantity,
      shippingCost,
      orderStatusId,
      products,
    } = req.body
    console.log('products', products);
    const result = await createOrderService(
      userId,
      userAddressId,
      warehouseId,
      totalPrice,
      totalQuantity,
      shippingCost,
      orderStatusId,
      products,
    )
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

export const updateOrderController = async (req, res) => {
  try {
    const { orderId } = req.params
    const { orderStatusId } = req.body
    const result = await updateOrderService(orderId, orderStatusId)
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

export const getOrderController = async (req, res) => {
  try {
    const { userId } = req.params
    const { orderNumber, orderDate, orderStatusId, page, pageSize } = req.query
    const result = await getOrderService(
      userId,
      orderNumber,
      orderDate,
      orderStatusId,
      page,
      pageSize,
    )
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

export const getOrderManagementController = async (req, res) => {
  try {
    // const { userId } = req.params
    const { orderNumber, orderDate, warehouseId, orderStatusId, page, pageSize } = req.query
    const result = await getOrderManagementService(
      orderNumber,
      orderDate,
      warehouseId,
      orderStatusId,
      page,
      pageSize,
    )
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

export const getWarehouseController = async (req, res) => {
  try {
    const result = await getWarehouseService()
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

export const productToStockIdController = async (req, res) => {
  try {
    const { productId } = req.query
    const result = await productToStockIdService(productId)
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

// export const calculationCheckStockController = async () => {
//   try {
//     const { orderId } = req.params
//     const result = await calculationCheckStockService(orderId)
//     return sendResponse(res, 200, result, null)
//   } catch (err) {
//     console.log(err)
//     return sendResponse(res, 500, null, err.message)
//   }
// }
