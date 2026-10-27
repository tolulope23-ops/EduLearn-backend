import SubModule from "../models/subModule.model.js";
import { handleSequelizeError } from "../../../common/error/sequeliseError.error.js";

export class SubModuleRepository {
  async getSubmoduleById(id) {
    try {
      const submodule = await SubModule.findByPk(id);
      return submodule ? this.mapToSubModuleEntity(submodule) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  };


  async getAllSubmodules() {
    try {
      const submodules = await SubModule.findAll({
        order: [["sequenceNumber", "ASC"]],
      });

      return submodules.map((submodule) => this.mapToSubModuleEntity(submodule));
      
    } catch (error) {
      handleSequelizeError(error);
    }
  };


  async getSubmodulesByModule(moduleId) {
    try {
      const submodules = await SubModule.findAll({
        where: { moduleId },
        order: [["sequenceNumber", "ASC"]],
      });

      return submodules.map((submodule) => this.mapToSubModuleEntity(submodule));
    } catch (error) {
      handleSequelizeError(error);
    }
  };


  async getSubmoduleBySequence(moduleId, sequenceNumber) {
    try {
      const submodule = await SubModule.findOne({
        where: { moduleId, sequenceNumber },
      });

      return submodule ? this.mapToSubModuleEntity(submodule) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  };
  

// HELPER: Map to Domain Entity
  mapToSubModuleEntity(submodule) {
    if (!submodule) return null;

    return {
      id: submodule.id,
      moduleId: submodule.moduleId,
      title: submodule.title,
      type: submodule.type,
      contentText: submodule.contentText ?? undefined,
      contentUrl: submodule.contentUrl ?? undefined,
      downloadable: submodule.downloadable,
      contentSize: submodule.contentSize ?? undefined,
      contentVersion: submodule.contentVersion,
      sequenceNumber: submodule.sequenceNumber,
      createdAt: submodule.createdAt,
      updatedAt: submodule.updatedAt,
    };
  }
}