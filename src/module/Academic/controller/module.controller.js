import { ModuleService } from "../service/module.service.js";

export class ModuleController {
  /**
   * @param {ModuleService} moduleService
   */
  constructor(moduleService) {
    this.moduleService = moduleService;
  };

//get module by id
  getModule = async (req, res, next) => {
    try {
      const { moduleId } = req.params;

      const module = await this.moduleService.getModule(moduleId);

      return res.status(200).json({
        message: module.message,
        data: module.data
      });

    } catch (error) {
      next(error);
    }
  };

// Get modules by lesson
  getModulesByLesson = async (req, res, next) => {
    try {
      const { lessonId } = req.params;

      const modules = await this.moduleService.getModulesByLesson(lessonId);

      return res.status(200).json({
        message: modules.message,
        data: modules.data
      });

    } catch (error) {
      next(error);
    }
  };

  // Get module by sequence
  getModuleBySequence = async (req, res, next) => {
    try {
      const { lessonId, sequenceNumber } = req.query;

      const module = await this.moduleService.getModuleBySequence(
        lessonId,
        Number(sequenceNumber)
      );

      return res.status(200).json({
        message: module.message,
        data: module.data
      });

    } catch (error) {
      next(error);
    }
  };
};