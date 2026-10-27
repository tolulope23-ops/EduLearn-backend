import { RecordNotFoundError } from "../../../common/error/domainError.error.js";
import { ModuleRepository } from "../repository/module.repository.js";
import { SubModuleRepository } from "../repository/subModule.repository.js";

export class SubModuleService {
    /**
     * @param {SubModuleRepository} subModuleRepo 
     * @param {ModuleRepository} moduleRepo
     */

    constructor(subModuleRepo, moduleRepo){
        this.subModuleRepo = subModuleRepo;
        this.moduleRepo = moduleRepo
    };


    async getSubmoduleById(subModuleId) {
        const subModule = await this.subModuleRepo.getSubmoduleById(subModuleId);

        if (!subModule) 
            throw new RecordNotFoundError("SubModule not found");

        return subModule;
    };


    async getSubmodulesByModule(moduleId) {
        const module = await this.moduleRepo.getModuleById(moduleId);

        if (!module) 
            throw new RecordNotFoundError("Module not found");

        return await this.subModuleRepo.getSubmodulesByModule(moduleId);
    };


    async getSubmoduleBySequence(moduleId, sequenceNumber) {
        const subModule = await this.subModuleRepo.getSubmoduleBySequence(moduleId, sequenceNumber);

        if (!subModule) 
            throw new RecordNotFoundError("SubModule not found");

        return subModule;
    };
};