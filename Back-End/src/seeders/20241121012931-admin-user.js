'use strict';
const bcrypt = require('bcrypt');
const passwordHash = bcrypt.hashSync('Adm1n15tr4d0r', 10);

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@admin.com',
      password: passwordHash,
      type: 'admin',
    }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};