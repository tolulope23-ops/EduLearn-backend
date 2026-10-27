import express from "express";
const router = express.Router();

import { LessonControllerInstance } from "../container.js";

router.get("/all", LessonControllerInstance.getAllLessons);  //Get all Lesson for a student

router.get("/:lessonId", LessonControllerInstance.getLesson);  //Get Lesson By Id

router.get("/sequence/find", LessonControllerInstance.getLessonBySequence);



export default router;