'use strict';

const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //fetch the existing course
    const [courses] = await queryInterface.sequelize.query(
      `SELECT id FROM courses WHERE name = :name LIMIT 1`,
      { replacements: { name: "SCIENCE" },});

      if (!courses.length) {
        throw new Error('Course "SCIENCE" not found. Seed courses first.');
      };

      const courseId = courses[0].id;

    //fetch the existing class level
    const [classLevels] = await queryInterface.sequelize.query(
      `SELECT id FROM class_levels WHERE name = :name LIMIT 1`,
      { replacements: { name: "SENIOR" },});

      if (!classLevels.length) {
        throw new Error('Class level "SENIOR" not found. Seed class levels first.');
      };

      const classLevelId = classLevels[0].id;
      const now = new Date();

    await queryInterface.bulkInsert("lessons", [
      {
        id: uuidv4(),
        courseId: courseId,
        classLevelId: classLevelId,
        title: "Human Anatomy",
        description:"In this lesson, students will learn about human anatomy, including the structure of the human body, major organs, and how different body systems work together to maintain life.",
        sequenceNumber: 1,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};
