import express from "express";
import { authMiddleware } from "../../auth/container.js";
import {studentEnrollControllerInstance  } from "../container.js";
import validateRequest from "../../../common/middleware/validation.middleware.js";
import { enrollmentSchema } from "../validation/enrollment.validation.js";

const router = express.Router();

router.use(authMiddleware.authenticate());

router.post("/onboarding", validateRequest(enrollmentSchema), studentEnrollControllerInstance.enrollStudent);
router.get("/all-courses", studentEnrollControllerInstance.getAllStudentCourses);

export default router;