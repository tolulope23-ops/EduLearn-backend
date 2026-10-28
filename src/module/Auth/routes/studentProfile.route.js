import { Router } from 'express';
import { authMiddleware, studentProfileController } from '../container.js';
import validationMiddleware from '../../../common/middleware/validation.middleware.js';
import { updateStudentProfileSchema } from '../validation/studentProfile.validation.js';

const router = Router();

//Get current user profile
router.get('/me', authMiddleware.authenticate(), studentProfileController.getMyProfile);

//Update student profile
router.patch('/me', authMiddleware.authenticate(), validationMiddleware(updateStudentProfileSchema), studentProfileController.updateProfile);

export default router;