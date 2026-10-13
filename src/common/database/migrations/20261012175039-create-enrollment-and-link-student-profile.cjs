'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("enrollments", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,

        // Reference the existing student_profiles table.
        references: {
          model: "student_profiles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      dailyGoal: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      classLevelId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "class_levels",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      courseIds: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("enrollments");
  }
};
