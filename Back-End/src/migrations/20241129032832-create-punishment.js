'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Punishments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      describe: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.FLOAT
      },
      add: {
        type: Sequelize.BOOLEAN
      },
      dueDate: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Punishments');
  }
};