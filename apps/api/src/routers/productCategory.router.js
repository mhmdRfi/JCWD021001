import {
  createProductCategoryController,
  deleteProductCategoryController,
  getGenderController,
  getProductCategoryController,
  updateProductCategoryController,
} from '../controllers/productCategory.controller'
import { Router } from 'express'
import {
  checkRoleAdmin,
  checkRoleSuperAdminAdmin,
  checkRoleSuperadmin,
  verifyToken,
} from '../middleware/auth.middleware'
const productCategoryRouter = Router()

productCategoryRouter.get('/', getProductCategoryController)
productCategoryRouter.get('/gender', getGenderController)
productCategoryRouter.post('/', createProductCategoryController)
productCategoryRouter.patch(
  '/:id',

  updateProductCategoryController,
)
productCategoryRouter.delete(
  '/:id',

  deleteProductCategoryController,
)

export { productCategoryRouter }
