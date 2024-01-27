import {
  createStockJournalService,
  getStockJournalService,
} from '../services/stockJournal.services'

export const createStockJournalController = async (req, res) => {
  try {
    const {
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
    } = req.body
    const result = await createStockJournalService(
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
    )

    return res.status(200).json({
      title: 'Create Stock Journal Service Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      title: err.message,
    })
  }
}

export const getStockJournalController = async (req, res) => {
  try {
    const { warehouseId, stockId } = req.params
    const { page, pageSize } = req.query
    const result = await getStockJournalService(warehouseId, stockId, page, pageSize)
    return res.status(200).json({
      message: 'Get Stock Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}