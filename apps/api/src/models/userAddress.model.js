import { Model, DataTypes } from 'sequelize';

export default class UserAddress extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.City, { foreignKey: 'cityId' });
    this.hasMany(models.Orders, { foreignKey: 'userAddressId' });
  }
}

export const init = (sequelize) => {
  UserAddress.init(
    {
      specificAddress: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      isMainAddress: DataTypes.BOOLEAN,
      postalCode: DataTypes.INTEGER,
      latitude: DataTypes.DECIMAL(10, 8),
      longitude: DataTypes.DECIMAL(11, 8),
    },
    {
      sequelize,
      modelName: 'UserAddress',
      timestamps: true, 
      paranoid: true,   
    },
  );
};
