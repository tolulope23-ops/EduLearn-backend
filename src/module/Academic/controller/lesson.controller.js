import { LessonService } from "../service/lesson.service.js";

export class LessonController {
  /**
   * @param {LessonService} lessonService
   */
  constructor(lessonService) {
    this.lessonService = lessonService;
  };

// Get lesson by ID
  getLesson = async (req, res, next) => {
    try {
      const { lessonId } = req.params;

      const lesson = await this.lessonService.getLesson(lessonId);

      return res.status(200).json({
        message: lesson.message,
        data: lesson.data
      });

    } catch (error) {
      next(error);
    };
  };

  // Get all lessons
  getAllLessons = async (req, res, next) => {
    try {
      
      const lessons = await this.lessonService.getAllLessons();

      return res.status(200).json({
        message: lessons.message,
        data: lessons.data
      });

    } catch (error) {
      next(error);
    }
  };

// Get lesson by sequence
  getLessonBySequence = async (req, res, next) => {
    try {
      const { courseName, classLevelName, sequenceNumber } = req.query;

      const lesson = await this.lessonService.getLessonBySequence(
        courseName,
        classLevelName,
        Number(sequenceNumber)
      );

      return res.status(200).json({
        message: lesson.message,
        data: lesson.data
      });

    } catch (error) {
      next(error);
    }
  };
};