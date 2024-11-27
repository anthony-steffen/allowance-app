'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Tasks', [
    {
      title: 'Arrumar a cama - Desarmar a rede',
      description: 'Arrumar a cama todos os dias ou desarmar a rede ao acordar',
      dueDate: new Date(),
      value: 1.06,
      status: 'pending',

    }, {
      title: 'Escovar os dentes',
      description: ' Escovar os dentes pelo menos 2 vezes ao dia',
      dueDate: new Date(),
      value: 1,
      status: 'pending',

    }, {
      title: 'Lavar a louça',
      description: 'Lavar a louça após as refeições e as que por ventura sujar',
      dueDate: new Date(),
      value: 1,
      status: 'pending',

    }, {
      title: 'Ler 1 Capítulo da Bíblia',
      description: 'Ler ao menos 1 capítulo da Bíblia em ordem cronológica',
      dueDate: new Date(),
      value: 1,
      status: 'pending',

    }, {
      title: 'Tomar Banho',
      description: 'Tomar pelo menos 2 banhos',
      dueDate: new Date(),
      value: 0.5,
      status: 'pending',

    }, {
      title: 'Comer frutas',
      description: 'Comer pelo menos uma fruta',
      dueDate: new Date(),
      value: 0.5,
      status: 'pending',
    }
  ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};