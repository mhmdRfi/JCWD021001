import { createStockQuery, getSpesificStockQuery } from '../queries/stock.queries'
import { createStockJournalQuery, getStockJournalQuery } from '../queries/stockJournal.queries'

export const createStockJournalService = async (
  productId,
  warehouseId,
  sizeId,
  colourId,
  isAdding,
  qty,
  qtyBefore,
  qtyAfter,
  stockId,
  isUpdate,
) => {
  try {
    // Check if the stock is exist
    const check = await getSpesificStockQuery(productId, warehouseId, sizeId, colourId)

    if (check) {
      // If exist, check if isUpdate is true(edit stock from stock-management table)
      if (isAdding) {
        await check.increment('qty', { by: qty })
        const res = await createStockJournalQuery(
          productId,
          warehouseId,
          sizeId,
          colourId,
          1,
          qty,
          check.dataValues.qty,
          check.dataValues.qty + qty,
          check.dataValues.id,
        )
        return res
      }
      if (isUpdate) {
        // Check if qty wants to be update is < from the qty exist
        if (qty < check.dataValues.qty) {
          const newQty = check.dataValues.qty - qty
          await check.increment('qty', { by: -1 * newQty })
          const res = await createStockJournalQuery(
            productId,
            warehouseId,
            sizeId,
            colourId,
            0,
            newQty,
            check.dataValues.qty,
            check.dataValues.qty - newQty,
            check.dataValues.id,
          )
          return res
        }
        // If > than qty exist, just add it
        const newQty = qty - check.dataValues.qty
        await check.increment('qty', { by: newQty })
        const res = await createStockJournalQuery(
          productId,
          warehouseId,
          sizeId,
          colourId,
          1,
          newQty,
          check.dataValues.qty,
          check.dataValues.qty + newQty,
          check.dataValues.id,
        )
        return res
      }
      // This was an condition where decrement stock from cart
      await check.increment('qty', { by: -1 * qty })
      const res = await createStockJournalQuery(
        productId,
        warehouseId,
        sizeId,
        colourId,
        0,
        qty,
        check.dataValues.qty,
        check.dataValues.qty + -1 * qty,
        check.dataValues.id,
      )
      return res
    } else if (!check) {
      // Condition when stock is not exist, so we make new stock and then create the stockJournal
      if (qty < 0) throw new Error('Cant make stock if qty is 0')
      const createStocks = await createStockQuery(productId, warehouseId, 0, sizeId, colourId)
      await createStocks.increment('qty', { by: qty })
      const res = await createStockJournalQuery(
        productId,
        warehouseId,
        sizeId,
        colourId,
        qty > 0 ? 1 : 0,
        qty,
        createStocks.qty,
        createStocks.dataValues.qty + qty,
        createStocks.dataValues.id,
      )
      return res
    }
  } catch (err) {
    throw err
  }
}

export const getStockJournalService = async (
  warehouseId,
  stockId,
  startDate,
  endDate,
  page,
  pageSize,
) => {
  try {
    const res = await getStockJournalQuery(warehouseId, stockId, startDate, endDate, page, pageSize)
    return res
  } catch (err) {
    throw err
  }
}
