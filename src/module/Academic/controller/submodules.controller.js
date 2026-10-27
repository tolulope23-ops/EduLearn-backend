import { SubModuleService } from "../service/subModule.service.js";

export class SubModuleController {
  /**
   * @param {SubModuleService} subModuleService
   */

  constructor(subModuleService) {
    this.subModuleService = subModuleService;
  };

// Get submodule by ID
    getSubModule = async (req, res, next) => {
        try {
            const { subModuleId } = req.params;

            const subModule = await this.subModuleService.getSubmoduleById(subModuleId);

            return res.status(200).json({
                data: subModule
            });

        } catch (error) {
            next(error);
        };
    };

// Get submodules in a module
    getSubModulesByModule = async (req, res, next) => {
        try {
            const { moduleId } = req.params;

            const subModules = await this.subModuleService.getSubmodulesByModule(moduleId);

            return res.status(200).json({
                data: subModules
            });

        } catch (error) {
            next(error);
        };
    };

// Get submodule by sequence
    getSubModuleBySequence = async (req, res, next) => {
        try {
            const { moduleId, sequenceNumber } = req.query;

            const subModule = await this.subModuleService.getSubmoduleBySequence(
                moduleId,
                Number(sequenceNumber)
            );

            return res.status(200).json({
                data: subModule
            });

        } catch (error) {
            next(error);
        };
    };
};