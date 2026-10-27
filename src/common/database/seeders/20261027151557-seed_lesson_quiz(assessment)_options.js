'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const questionsWithOptions = [
      { questionText: "What is the purpose of anatomical terminology?",
        options: [
          { optionText:"To provide standardized terms for describing body structures", isCorrect: true},
          { optionText: "To make medical language more complicated", isCorrect: false},
          { optionText: "To replace scientific research", isCorrect: false},
          {optionText: "To describe diseases only", isCorrect: false},
        ],
      },
      { questionText: "Which body plane divides the body into left and right halves?",
        options: [
          { optionText: "Sagittal plane", isCorrect: true },
          { optionText: "Transverse plane", isCorrect: false },
          { optionText: "Coronal plane", isCorrect: false },
          { optionText: "Diagonal plane", isCorrect: false },
        ],
      },
      { questionText: "In the anatomical position, how are the palms oriented?",
        options: [
          { optionText: "Palms face forward", isCorrect: true },
          { optionText: "Palms face backward", isCorrect: false },
          { optionText: "Palms face downward", isCorrect: false },
          { optionText: "Palms face inward", isCorrect: false },
        ],
      },
      { questionText: "Which directional term means toward the head?",
        options: [
          { optionText: "Superior", isCorrect: true },
          { optionText: "Inferior", isCorrect: false },
          { optionText: "Lateral", isCorrect: false },
          { optionText: "Distal", isCorrect: false },
        ],
      },
      {
        questionText: "Which directional term refers to the back of the body?",
        options: [
          { optionText: "Anterior", isCorrect: false },
          { optionText: "Posterior", isCorrect: true },
          { optionText: "Medial", isCorrect: false },
          { optionText: "Proximal", isCorrect: false },
        ],
      },
      { questionText: "What does the term medial mean?",
        options: [
          { optionText: "Farther from the body's midline", isCorrect: false },
          { optionText: "Toward the feet", isCorrect: false },
          { optionText: "Closer to the body's midline", isCorrect: true },
          { optionText: "Toward the back of the body", isCorrect: false },
        ],
      },
      { questionText: "Which directional term means farther from the point of attachment?",
        options: [
          { optionText: "Proximal", isCorrect: false },
          { optionText: "Superior", isCorrect: false },
          { optionText: "Medial", isCorrect: false },
          { optionText: "Distal", isCorrect: true },
        ],
      },
      { questionText: "What is the anatomical position?",
        options: [
          { optionText: "Standing upright, facing forward, arms at the sides, palms facing forward", isCorrect: true},
          { optionText: "Standing upright with palms facing backward", isCorrect: false},
          { optionText: "Sitting with arms crossed over the chest", isCorrect: false},
          { optionText: "Lying down with arms above the head", isCorrect: false},
        ],
      },
      { questionText: "Which plane divides the body into front and back sections?",
        options: [
          { optionText: "Sagittal plane", isCorrect: false },
          { optionText: "Transverse plane", isCorrect: false },
          { optionText: "Frontal (coronal) plane", isCorrect: true },
          { optionText: "Oblique plane", isCorrect: false },
        ],
      },
      { questionText: "Which body cavity contains the brain?",
        options: [
          { optionText: "Thoracic cavity", isCorrect: false },
          { optionText: "Abdominal cavity", isCorrect: false },
          { optionText: "Pelvic cavity", isCorrect: false },
          { optionText: "Cranial cavity", isCorrect: true },
        ],
      },
    ];

    const now = new Date();
    const optionsToInsert = [];

    for (const item of questionsWithOptions) {
      // Find the question using its text
      const [questions] = await queryInterface.sequelize.query(
        `SELECT id FROM quiz_questions WHERE questionText = :questionText LIMIT 2`,
        {
          replacements: {
            questionText: item.questionText,
          },
        }
      );

      if (questions.length === 0) {
        throw new Error(`Question not found: "${item.questionText}"`
        );
      };

      const questionId = questions[0].id;

      //associate each option with its question
      for (const option of item.options) {
        optionsToInsert.push({
          questionId,
          optionText: option.optionText,
          isCorrect: option.isCorrect,
          createdAt: now,
          updatedAt: now,
        });
      }
    };

    //insert all options in one operation
    await queryInterface.bulkInsert("quiz_options", optionsToInsert);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quiz_options', null, {});
  }
};
