import express from "express";
import { quizControllerInstance } from "../container.js";
import validateRequest from "../../../common/middleware/validation.middleware.js";
import { authMiddleware } from "../../auth/container.js";
import { retakeQuizSchema, submitQuizSchema } from "../validation/quiz.validation.js";

const router = express.Router();


// Student-facing Routes
router.get("/module-all", quizControllerInstance.getQuizBySubmodule); // fetch all questions with options

router.get("/:submoduleId/quiz", quizControllerInstance.getQuizQuestionForSubmodule); // fetch question submodule with doc/video content

router.post("/submit", authMiddleware.authenticate(), validateRequest(submitQuizSchema), quizControllerInstance.submitQuiz); // submit quiz answers

router.post("/retake", authMiddleware.authenticate(), validateRequest(retakeQuizSchema), quizControllerInstance.retakeQuiz); // retake quiz 



export default router;