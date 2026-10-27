'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //find the assessment submodule, which is submodule 3
    const [submodules] = await queryInterface.sequelize.query(
      `SELECT id FROM submodules WHERE title = :title LIMIT 2`,
      {
        replacements: { title: "Module 1 Assessment"},
      }
    );

    if (submodules.length === 0) {
      throw new Error('Submodule "Module 1 Assessment" not found. Seed submodules first.');
    };

    const submoduleId = submodules[0].id;
    const now = new Date();

    //map out and define the assessment questions
    const questions = [
      { questionText: "What is the purpose of anatomical terminology?"},
      { questionText: "Which body plane divides the body into left and right halves?"},
      { questionText: "In the anatomical position, how are the palms oriented?"},
      { questionText: "Which directional term means toward the head?"},
      { questionText: "Which directional term refers to the back of the body?"},
      { questionText: "What does the term medial mean?"},
      { questionText: "Which directional term means farther from the point of attachment?"},
      { questionText: "What is the anatomical position?"},
      { questionText: "Which plane divides the body into front and back sections?"},
      { questionText: "Which body cavity contains the brain?"},
    ];

    //insert all questions with the resolved submodule id
    await queryInterface.bulkInsert("quiz_questions",
      questions.map((question) => ({
        submoduleId,
        questionText: question.questionText,
        createdAt: now,
        updatedAt: now,
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quiz_questions', null, {});
  }
};
