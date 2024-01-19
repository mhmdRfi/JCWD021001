import {
  createProductCategoryService,
  getGenderServices,
  getProductCategoryService,
  updateProductCategoryService,
} from '../services/productCategory.services'

export const getProductCategoryController = async (req, res) => {
  try {
    const { gender } = req.query
    const result = await getProductCategoryService(gender)
    return res.status(200).json({
      message: 'Get Product Category Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const getGenderController = async (req, res) => {
  try {
    const result = await getGenderServices()
    return res.status(200).json({
      message: 'Get Gender Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const createProductCategoryController = async (req, res) => {
  try {
    const { name, parentId } = req.body
    const result = await createProductCategoryService(name, parentId)
    return res.status(200).json({
      title: 'Create Product Category Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const updateProductCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    const { name, parentId } = req.body
    const result = await updateProductCategoryService(name, parentId, id)
    return res.status(200).json({
      title: 'Update Product Category Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
