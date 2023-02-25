'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('palestraministrante', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      palestraId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Palestra',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      ministranteId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Palestra',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt:{
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('palestramiinistrante');
  }
};
