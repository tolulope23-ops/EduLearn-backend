import QuizOption from "../models/quizOption.model.js";
import { handleSequelizeError } from "../../../common/error/sequeliseError.error.js";
import { Op } from "sequelize";

export class QuizOptionRepository {
  async getQuizOptionById(id) {
    try {
      const option = await QuizOption.findByPk(id);
      return option ? this.mapToQuizOptionEntity(option) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  async getAllQuizOptions() {
    try {
      const options = await QuizOption.findAll();
      return options.map(option => this.mapToQuizOptionEntity(option));
    } catch (error) {
      handleSequelizeError(error);
    }
  };

  async getOptionsByQuestionIds(questionIds) {
    try {
      
      if (!Array.isArray(questionIds)) questionIds = [questionIds];

      const options = await QuizOption.findAll({
        where: {
          questionId: {
            [Op.in]: questionIds
          }
        }
      });

      return options.map(opt => this.mapToQuizOptionEntity(opt));
    } catch (error) {
      handleSequelizeError(error);
    }
  };


  async getCorrectOptionsByQuestionIds(questionIds) {
    try {

      if (!Array.isArray(questionIds)) questionIds = [questionIds];

      const options = await QuizOption.findAll({
        where: {
          questionId: {
            [Op.in]: questionIds
          },
          isCorrect: true
        },
        attributes: ["id", "questionId", "option", "isCorrect"]
      });

      return options.map(opt => this.mapToQuizOptionEntity(opt));
    } catch (error) {
      handleSequelizeError(error)
    }  
}


  // HELPER
  mapToQuizOptionEntity(option) {
    if (!option) return null;

    return {
      id: option.id,
      questionId: option.questionId,
      option: option.option,
      isCorrect: option.isCorrect,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
    };
  }
}