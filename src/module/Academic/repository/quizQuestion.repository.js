import QuizQuestion from "../models/quizQuestion.model.js";
import { handleSequelizeError } from "../../../common/error/sequeliseError.error.js";

export class QuizQuestionRepository {
  async getAllQuizQuestions() {
    try {
      const questions = await QuizQuestion.findAll();
      return questions.map(question => this.mapToQuizQuestionEntity(question));
    } catch (error) {
      handleSequelizeError(error);
    }
  };


  async getQuizQuestionsBySubmodule(submoduleId) {
    try {
      const questions = await QuizQuestion.findAll({
        where: { submoduleId },
        order: [["createdAt", "ASC"]],
      });
    return questions.map(q => this.mapToQuizQuestionEntity(q));
    } catch (error) {
      handleSequelizeError(error);
    }
  };
  
  mapToQuizQuestionEntity(question) {
    if (!question) return null;

    return {
      id: question.id,
      submoduleId: question.submoduleId,
      question: question.question,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}