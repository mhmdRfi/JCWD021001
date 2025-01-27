'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('productGroups', [
    {
      name: 'Men',
    },
    {
      name: 'Women',
    },
    {
      name: 'Kids',
    },
    {
      name: 'Baby',
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('productGroups', null, {});
}
