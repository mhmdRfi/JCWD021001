'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('carts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    priceTotal: {
      type: Sequelize.DECIMAL(10,0),
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('carts');
}