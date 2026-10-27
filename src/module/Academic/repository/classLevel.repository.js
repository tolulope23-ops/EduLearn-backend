import ClassLevel from "../models/classLevel.model.js";
import { handleSequelizeError } from "../../../common/error/sequeliseError.error.js";

export class ClassLevelRepository {

  // READ QUERY OPERATIONS
  async getClassLevelById(id) {
    try {
      const classLevel = await ClassLevel.findByPk(id);
      return classLevel ? this.mapToClassLevelEntity(classLevel) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  async getClassLevelByName(name) {
    try {
      const classLevel = await ClassLevel.findOne({ 
        where: {name}
      });
      return classLevel ? this.mapToClassLevelEntity(classLevel) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  };

  async getAllClassLevels() {
    try {
      const classLevels = await ClassLevel.findAll();
      return classLevels.map(cl => this.mapToClassLevelEntity(cl));
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  // HELPER: Map Sequelize instance to domain entity
  mapToClassLevelEntity(classLevel) {
    if (!classLevel) return null;

    return {
      id: classLevel.id,
      name: classLevel.name,
      description: classLevel.description ?? undefined,
      createdAt: classLevel.createdAt,
      updatedAt: classLevel.updatedAt,
    };
  }
}