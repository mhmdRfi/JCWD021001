import { Model, DataTypes } from 'sequelize'
import ProductCategory from './productCategory.model'
import ProductImage from './productImage.model'
import StockJournal from './stockJournal.model'
import ProductToColour from './productToColour.model'
import Colour from './colour.model'

export default class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Product.hasMany(models.Stock, { as: 'stocks', foreignKey: 'productId' })
    Product.belongsTo(ProductCategory, {
      foreignKey: 'productCategoryId',
      as: 'category',
    })
    Product.hasMany(ProductImage, { as: 'picture' })
    Product.hasMany(StockJournal, { as: 'history' })
    Product.hasMany(models.CartProducts, {
      as: 'cartProducts',
      foreignKey: 'productId',
      paranoid: true,
    })
    Product.belongsToMany(Colour, { through: ProductToColour, as: 'colour' })
  }
}

export const init = (sequelize) => {
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 0),
        validate: {
          notZero(value) {
            if (value === 0) {
              throw new Error('Price cannot be 0')
            }
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(Date.now()),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(Date.now()),
      },
      productCategoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'productCategories',
          },
          key: 'id',
        },
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      timestamps: true,
      paranoid: true,
    },
  )
}
