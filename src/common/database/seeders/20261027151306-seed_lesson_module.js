'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //find the existing lesson by its title
    const [lessons] = await queryInterface.sequelize.query(
      `SELECT id FROM lessons WHERE title = :title LIMIT 1`,
      { replacements: { title: "Human Anatomy"}}
    );

    if (lessons.length === 0) {
      throw new Error('Lesson "Human Anatomy" not found. Seed the lesson first.');
    }

    const lessonId = lessons[0].id;

    //insert lesson module 1 using the retrieved lesson ID
    await queryInterface.bulkInsert("modules", [
      {
        lessonId,
        title: "Foundations Of Anatomy",
        description: "",
        sequenceNumber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null, {});
  }
};
