'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      dueDate: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.FLOAT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};