'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },

      accountStatus: {
        type: Sequelize.ENUM('ACTIVE', 'PENDING', 'SUSPENDED', 'DELETED'),
        defaultValue: 'ACTIVE'
      },

      accountType: {
        type: Sequelize.STRING,
        defaultValue: "Student"
      },

      enrolled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
