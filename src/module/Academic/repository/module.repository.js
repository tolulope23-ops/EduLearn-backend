import Module from "../models/module.model.js";
import { handleSequelizeError } from "../../../common/error/sequeliseError.error.js";

export class ModuleRepository {
  async getModuleById(id) {
    try {
      const module = await Module.findByPk(id);
      return module ? this.mapToModuleEntity(module) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  };


  async getAllModules() {
    const modules = await Module.findAll({
      order: [["sequenceNumber", "ASC"]],
    });

    return modules.map(module => this.mapToModuleEntity(module));
  };
  

  // GET MODULES BY LESSON
  async getModulesByLesson(lessonId) {
    try {
      const modules = await Module.findAll({
        where: { lessonId },
        order: [["sequenceNumber", "ASC"]],
      });

      return modules.map(module => this.mapToModuleEntity(module));
    } catch (error) {
      handleSequelizeError(error);
    }
  };

  // GET MODULE BY SEQUENCE
  async getModuleBySequence(lessonId, sequenceNumber) {
    try {
      const module = await Module.findOne({
        where: { lessonId, sequenceNumber },
      });

      return module ? this.mapToModuleEntity(module) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  };


  mapToModuleEntity(module) {
    if (!module) return null;

    const data = module.toJSON ? module.toJSON() : module;

    return {
      id: data.id,
      lessonId: data.lessonId,
      title: data.title,
      description: data.description,
      sequenceNumber: data.sequenceNumber,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  };
};