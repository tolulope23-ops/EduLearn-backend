'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //find the parent module of the submodule by its title
    const [modules] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE title = :title LIMIT 1`,
      { replacements: {
          title: "Foundations Of Anatomy",
        },
      }
    );

    if (modules.length === 0) {
      throw new Error('Module "Foundations Of Anatomy" not found. Seed modules first.');
    };

    const moduleId = modules[0].id;
    const now = new Date();

    //insert the submodule using the retrieved module ID
    await queryInterface.bulkInsert("submodules", [
      {
        id: uuidv4(),
        moduleId,
        title: "Introduction to Anatomical Terms",
        type: "document",
        contentUrl: "",
        contentText:
        `In this lesson, we learn that anatomical terminology provides standardized words used by healthcare professionals to describe the location, position, and relationship of body structures clearly and accurately. 
        All descriptions are based on the anatomical position, where the body stands upright, faces forward, arms are at the sides, palms face forward, and feet are slightly apart. 
        Common directional terms help describe where one body part is relative to another: Superior: toward the head; Inferior: toward the feet; Anterior: front of the body; Posterior: back of the body; Medial: closer to the body's midline;
        Lateral: farther from the midline; Proximal: closer to the point of attachment; Distal: farther from the point of attachment.`,
        downloadable: true,
        contentSize: "1mb",
        sequenceNumber: 1,
        createdAt: now,
        updatedAt: now,
      },

      {
        id: uuidv4(),
        moduleId,
        title: "Body Planes and Cavities",
        type: "video",
        contentUrl:"https://res.cloudinary.com/dsgd1rh51/video/upload/v1773668224/Body_Planes_Cavities_1_en3ub1.mp4",
        contentText:
          "In this video, students will learn about anatomical body planes and the major body cavities that house and protect vital organs.",
        downloadable: true,
        contentSize: "7.63mb",
        sequenceNumber: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        moduleId,
        title: "Module 1 Assessment",
        type: "quiz",
        contentUrl: "",
        contentText:"Below are Assessment questions based on what we have discussed in this module",
        downloadable: true,
        contentSize: "1mb",
        sequenceNumber: 3,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('submodules', null, {});
  }
};
