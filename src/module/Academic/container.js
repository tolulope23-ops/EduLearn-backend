import { StudentProfileRepository } from "../auth/repository/studentProfile.repository.js";
import { EnrollmentController } from "./controller/enrollment.controller.js";
import { LearningProgressController } from "./controller/learningProgress.controller.js";
import { LearningSessionController } from "./controller/learningSession.controller.js";
import { LearningSyncController } from "./controller/learningSync.controller.js";
import { LessonController } from "./controller/lesson.controller.js";
import { ModuleController } from "./controller/module.controller.js";
import { QuizController } from "./controller/quiz.controller.js";
import { SubModuleController } from "./controller/submodules.controller.js";
import { ClassLevelRepository } from "./repository/classLevel.repository.js";


import { CourseRepository } from "./repository/course.repository.js";
import { EnrollmentRepository } from "./repository/enrollemt.repository.js";
import { LessonRepository } from "./repository/lesson.repository.js";
import { ModuleRepository } from "./repository/module.repository.js";

import { ModuleProgressRepository } from "./repository/moduleProgress.repository.js";
import { QuizOptionRepository } from "./repository/quizOption.repository.js";
import { QuizQuestionRepository } from "./repository/quizQuestion.repository.js";
import { SubModuleRepository } from "./repository/subModule.repository.js";
import { SubmoduleProgressRepository } from "./repository/subModuleProgress.repository.js";

import { EnrollmentService } from "./service/enrollment.service.js";
import { LearningService } from "./service/learning.service.js";
import { LearningNavigation } from "./service/learningNavigation.service.js";
import { LearningProgress } from "./service/learningProgress.service.js";
import { LearningSession } from "./service/learningSession.service.js";
import { LearningSyncService } from "./service/learningSync.service.js";

import { LessonService } from "./service/lesson.service.js";
import { ModuleService } from "./service/module.service.js";
import { ModuleProgressService } from "./service/moduleProgress.service.js";

import { QuizService } from "./service/quiz.service.js";
import { SubModuleService } from "./service/subModule.service.js";
import { SubmoduleProgressService } from "./service/subModuleProgress.service.js";

const courseRepoInstance = new CourseRepository();

const studentEnrollmentRepoInstance =  new EnrollmentRepository();

const lessonRepoInstance = new LessonRepository();
const classLevelRepoInstance =  new ClassLevelRepository();

const moduleRepoInstance =  new ModuleRepository();
const moduleProgressRepoInstance = new ModuleProgressRepository();

const subModuleRepoInstance = new SubModuleRepository();
const subModuleProgressRepoInstance = new SubmoduleProgressRepository();
const quizQuestionRepo = new QuizQuestionRepository();

const quizOptionRepo = new QuizOptionRepository(); 
const studentProfileRepoInstance =  new StudentProfileRepository();


//Services
export const studentEnrollmentServiceInstance =  new EnrollmentService(studentProfileRepoInstance, courseRepoInstance, classLevelRepoInstance, studentEnrollmentRepoInstance)
export const lessonServiceInstance = new LessonService(lessonRepoInstance, courseRepoInstance, classLevelRepoInstance, studentEnrollmentServiceInstance);

export const moduleServiceInstance =  new ModuleService(lessonRepoInstance, moduleRepoInstance);
export const subModuleServiceInstance = new SubModuleService(subModuleRepoInstance, moduleRepoInstance);

export const subModuleProgressServiceInstance = new SubmoduleProgressService(subModuleProgressRepoInstance);

export const moduleProgressServiceInstance = new ModuleProgressService(moduleProgressRepoInstance,subModuleServiceInstance, subModuleProgressServiceInstance);

export const learningProgressServiceInstance = new LearningProgress(
    moduleProgressServiceInstance, 
    subModuleProgressServiceInstance, 
    subModuleServiceInstance
);

export const quizServiceInstance = new QuizService(
    quizQuestionRepo, 
    quizOptionRepo,
    subModuleRepoInstance,
    subModuleServiceInstance,
    moduleProgressServiceInstance,
    subModuleProgressServiceInstance,
    learningProgressServiceInstance,
    studentProfileRepoInstance
);

export const learningServiceInstance =  new LearningService(
    moduleServiceInstance, 
    subModuleServiceInstance, 
    studentEnrollmentServiceInstance, 
    courseRepoInstance
);

export const learningSyncServiceInstance = new LearningSyncService(subModuleProgressServiceInstance, studentProfileRepoInstance, moduleProgressServiceInstance, subModuleServiceInstance);
export const learningSessionServiceInstance =  new LearningSession(
    studentEnrollmentServiceInstance, 
    courseRepoInstance, 
    lessonRepoInstance,
    moduleServiceInstance, 
    subModuleServiceInstance, 
    subModuleProgressServiceInstance,
    studentProfileRepoInstance
);

export const learningNavigationServiceInstance = new LearningNavigation(
    lessonServiceInstance,
    moduleServiceInstance, 
    subModuleServiceInstance, 
    subModuleProgressServiceInstance
);



//Controller
export const studentEnrollControllerInstance = new EnrollmentController(studentEnrollmentServiceInstance);
export const LessonControllerInstance = new LessonController(lessonServiceInstance);
export const moduleControllerInstance = new ModuleController(moduleServiceInstance);
export const submoduleControllerInstance = new SubModuleController(subModuleServiceInstance);

export const quizControllerInstance = new QuizController(quizServiceInstance);
export const learningSessionControllerInstance = new LearningSessionController(learningSessionServiceInstance);
export const learningProgressControllerInstance = new LearningProgressController(learningProgressServiceInstance, studentProfileRepoInstance, subModuleServiceInstance, subModuleProgressServiceInstance);
export const learningSyncControllerInstance = new LearningSyncController(learningSyncServiceInstance);