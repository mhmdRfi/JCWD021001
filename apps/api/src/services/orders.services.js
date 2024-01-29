import {
  createOrderQuery,
  findOrderIdQuery,
  getAllOrderQuery,
  getOrderQuery,
} from '../queries/orders.queries'

const calcTotalPrice = (products) => {
  return products.reduce((total, product) => {
    return total + product.priceProduct * product.quantity
  }, 0)
}

export const createOrderService = async (
  userId,
  userAddressId,
  warehouseId,
  totalPrice,
  totalQuantity,
  shippingCost,
  orderStatusId,
  products,
) => {
  try {
    const orderNumber = `ORD-${Date.now()}`
    const newTotalPrice = calcTotalPrice(products)
    console.log('ssad', newTotalPrice)
    if (newTotalPrice != totalPrice) throw new Error('Total Price is wrong')
    const res = await createOrderQuery(
      userId,
      userAddressId,
      warehouseId,
      newTotalPrice,
      totalQuantity,
      shippingCost,
      orderStatusId,
      orderNumber,
      products,
    )
    return res
  } catch (err) {
    throw err
  }
}

// export const getOrderService = async (orderId) => {
//     try {
//         console.log("orderId",orderId);
//         const check = await findOrderIdQuery(orderId);
//         if (!check) throw new Error("Data doesnt exist");
//         const res = await getOrderQuery(orderId)
//         return res
//     } catch (err) {
//         throw err
//     }
// }

export const getOrderService = async (userId) => {
  try {
    // console.log("orderId",orderId);
    // const check = await findOrderIdQuery(orderId);
    // if (!check) throw new Error("Data doesnt exist");
    const res = await getOrderQuery(userId)
    return res
  } catch (err) {
    throw err
  }
}

export const getAllOrderService = async () => {
  try {
    const res = await getAllOrderQuery()
    return res
  } catch (err) {
    throw err
  }
}
