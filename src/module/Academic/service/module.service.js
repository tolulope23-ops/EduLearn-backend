import { RecordNotFoundError } from "../../../common/error/domainError.error.js";
import { LessonRepository } from "../repository/lesson.repository.js";
import { ModuleRepository } from "../repository/module.repository.js";

export class ModuleService{
    /**
     * @param {LessonRepository} lessonRepo
     * @param {ModuleRepository} moduleRepo
     */

    constructor(lessonRepo, moduleRepo){
        this.lessonRepo = lessonRepo;
        this.moduleRepo = moduleRepo;
    };

    async getModule(moduleId) {

        const module = await this.moduleRepo.getModuleById(moduleId);

        if (!module)
            throw new RecordNotFoundError("Module not found");

        return {message: 'Module Retrieved successfully', data: module};
    };


    async getModulesByLesson(lessonId) {

        const lesson = await this.lessonRepo.getLessonById(lessonId);

        if (!lesson)
            throw new RecordNotFoundError("Lesson not found");

        const modules = await this.moduleRepo.getModulesByLesson(lessonId);

        return {message:'Modules for Lesson', data: modules};
    };


    async getModuleBySequence(lessonId, sequenceNumber) {

        const module = await this.moduleRepo.getModuleBySequence(
            lessonId,
            sequenceNumber
        );

        if (!module)
            throw new RecordNotFoundError("Module not found");

        return { message: 'Module by sequence', data: module};
    };
};