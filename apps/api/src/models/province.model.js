import { Model, DataTypes } from 'sequelize';

export default class Province extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Province.hasMany(models.City, { foreignKey: 'provinceId' });
  }
}

export const init = (sequelize) => {
  Province.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Province',
    },
  );
};
