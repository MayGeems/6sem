'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Oficinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      proposta: {
        type: Sequelize.STRING
      },
      ministranteId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Ministrantes',
          key: 'id'
        }
      },
      eventoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Eventos',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Oficinas');
  }
};