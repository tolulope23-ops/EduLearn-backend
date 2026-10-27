import express from "express";
import { authMiddleware } from "../../auth/container.js";
import { learningSessionControllerInstance } from "../container.js";

const router = express.Router();

router.use(authMiddleware.authenticate());

router.get('/start', learningSessionControllerInstance.startLearning);

export default router;