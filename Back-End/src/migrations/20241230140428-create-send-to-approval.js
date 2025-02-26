'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SendToApprovals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      tasks: {
        type: Sequelize.JSON
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SendToApprovals');
  }
};