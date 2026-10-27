import { RecordNotFoundError } from "../../../common/error/domainError.error.js";
import { ClassLevelRepository } from "../repository/classLevel.repository.js";
import { CourseRepository } from "../repository/course.repository.js";
import { LessonRepository } from "../repository/lesson.repository.js";
import { EnrollmentService } from "./enrollment.service.js";

export class LessonService{
    /**
     * @param {LessonRepository} lessonRepo
     * @param {CourseRepository} courseRepo
     * @param {ClassLevelRepository} classLevelRepo
     * @param { EnrollmentService} enrollmentService
     */

    constructor(lessonRepo, courseRepo, classLevelRepo, enrollmentService){
        this.lessonRepo = lessonRepo;
        this.courseRepo = courseRepo;
        this.classLevelRepo = classLevelRepo;
        this.enrollmentService = enrollmentService;
    };

    async getLesson(lessonId){
        const lesson = await this.lessonRepo.getLessonById(lessonId);

        if (!lesson) 
            throw new RecordNotFoundError(`Lesson not found`);

        return {message: 'Retrieved successfully', data: lesson};
    };

    // Get all lessons
    async getAllLessons() {
        const lessons = await this.lessonRepo.getAllLessons();

        if (!lessons || lessons.length === 0) {
            throw new RecordNotFoundError("No lessons found");
        }

        return {
            message: "All lessons retrieved successfully",
            data: lessons
        };
    };

    async getLessonBySequence(courseName, classLevelName, sequenceNumber) {
        const course = await this.courseRepo.getCourseByName(courseName);

        if (!course) 
            throw new RecordNotFoundError(`Course "${courseName}" not found`);

        const classLevel = await this.classLevelRepo.getClassLevelByName(classLevelName);

        if (!classLevel) 
            throw new RecordNotFoundError(`Class level "${classLevelName}" not found`);

        const lesson = await this.lessonRepo.getLessonBySequence(
            course.id,
            classLevel.id,
            sequenceNumber
        );

        if (!lesson) throw new RecordNotFoundError("Lesson not found");

        return {message: 'Lesson by CourseName, classLevel, Sequence', data: lesson};
    };
};