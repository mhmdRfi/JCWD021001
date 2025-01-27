import { DataTypes, Model } from 'sequelize'
import Warehouse from './warehouse.model'
import Mutation from './mutation.model'

export default class Stock extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Stock.belongsTo(models.Product, { as: 'product', foreignKey: 'productId', paranoid: true })
    Stock.belongsTo(models.Warehouse, {
      as: 'warehouse',
      foreignKey: 'warehouseId',
      paranoid: 'true',
    })
    Stock.belongsTo(models.Size, { as: 'size', foreignKey: 'sizeId' })
    Stock.belongsTo(models.Colour, { as: 'colour', foreignKey: 'colourId' })
    // Stock.hasMany(models.CartProducts, { as: 'cartProducts', foreignKey: 'stockId' })
    Stock.hasMany(models.OrderProducts, { as: 'orderProducts', foreignKey: 'stockId' })
    Stock.hasMany(Mutation, { foreignKey: 'stockId' })
  }
}
export const init = (sequelize) => {
  Stock.init(
    {
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id',
        },
      },
      warehouseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'warehouses',
          },
          key: 'id',
        },
      },
      sizeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'sizes',
          },
          key: 'id',
        },
      },
      colourId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'colours',
          },
          key: 'id',
        },
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      timestamps: true,
      paranoid: false,
    },
  )
}
