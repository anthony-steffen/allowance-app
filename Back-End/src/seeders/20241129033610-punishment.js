'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Punishments', [
     {
       describe: 'Comer no computador/Tv/Celular',
       value: 1,
       add: false,
       dueDate: new Date()
     },
     {
       describe: 'Falar palavrão',
       value: 1,
       add: false,
       dueDate: new Date()
     },
     {
      describe: 'Dormir fora do horário combinado',
      value: 1,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Não desarmar a rede ao acordar',
      value: 0.5,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Faltar a aula',
      value: 2,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Sair sem avisar',
      value: 2,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Não contribuir para a limpeza da casa',
      value: 1,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Tempo máximo de tela diário 3h',
      value: 1.5,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Não fazer as tarefas escolares',
      value: 1.5,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Responder pais e avós',
      value: 5,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Ser desorganizado e não arrumar suas coisas',
      value: 1,
      add: false,
      dueDate: new Date()
    },
    {
      describe: 'Acordar após as 11h',
      value: 1,
      add: false,
      dueDate: new Date()
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Punishments', null, {});
  }
};
