'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('producttypetoproductgroups', { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
