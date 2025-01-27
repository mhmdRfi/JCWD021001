'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint('products', 'products_productGroupId_foreign_idx', {
          transaction: t,
        }),
        queryInterface.removeConstraint('products', 'products_productTypeId_foreign_idx', {
          transaction: t,
        }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
